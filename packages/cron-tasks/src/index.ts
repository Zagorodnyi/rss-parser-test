import cluster, { Worker } from 'cluster';
import { configure, getLogger } from 'log4js';

const LOG = getLogger('CronTasks');

export interface WorkersMapInterface {
  [key: string]: {
    name: string;
    fileName: string;
    worker: Worker;
  };
}

configure({
  appenders: {
    out: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyy-MM-dd hh:mm:ss}] [%p] %c - %]%m',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: 'debug',
    },
  },
});

const workersMap: WorkersMapInterface = {};

const respawnTime = 30000;

const start = async () => {
  if (cluster.isPrimary) {
    const start = Date.now();
    LOG.info(
      `Env: ${process.env.NODE_ENV}, master PID: ${process.pid}. Initialization started...`
    );

    [require.resolve('./tasks/GetRedditPosts/GetRedditPostsTask')].forEach(
      spawnWorker
    );

    // Respawn
    cluster.on('exit', (worker, code) => {
      if (worker.process.pid) {
        const { pid } = worker.process;
        const { name, fileName } = workersMap[pid];
        delete workersMap[pid];

        LOG.error(
          `${name} (pid ${pid}) died with code ${code}. Respawn in ${
            respawnTime / 1000
          } sec...`
        );

        setTimeout(() => spawnWorker(fileName), respawnTime);
      }
    });

    LOG.info(`Initialization finished in ${(Date.now() - start) / 1000} sec`);
  } else {
    const TASK_NAME = process.env.name;
    const LOG = getLogger(TASK_NAME);

    process.on('unhandledRejection', (reason: Error) => {
      LOG.error(
        `${TASK_NAME} unhandled rejection, reason: ${reason.stack}. Exiting...`
      );
      process.exit(1);
    });

    LOG.info(`Starting task: ${TASK_NAME}`);

    const task = require(process.env.script!).default;
    task.start();
  }
};

const spawnWorker = (fileName: string) => {
  const name = fileName.match(/[-_\w]+[.][\w]+$/i)?.[0];

  if (!name) {
    LOG.error(`Unable to parse name from filename: ${fileName}`);

    throw new Error('Invalid fileName');
  }

  const worker = cluster.fork({
    fileName,
    name,
    script: fileName,
  });

  if (worker.process.pid) {
    LOG.info(`Spawning task: ${name}. Pid: ${worker.process.pid}`);

    workersMap[worker.process.pid] = { worker, name, fileName };
  }
};

const handleTermination = () => {
  Object.keys(workersMap).forEach((pid) => {
    const workerEntry = workersMap[pid];

    workerEntry.worker.destroy('SIGTERM');
    LOG.debug(`Worker ${workerEntry.name} with PID: ${pid} has been destroyed`);
  });

  process.exit(0);
};

process.on('SIGTERM', handleTermination);
process.on('SIGINT', handleTermination);

start();
