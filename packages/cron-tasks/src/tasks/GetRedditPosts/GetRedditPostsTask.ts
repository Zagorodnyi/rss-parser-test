import { getLogger } from 'log4js';
import { DEFAULT_CONFIG } from '../../common';
import { fetchNewPosts } from './fetchPosts';

const TASK_NAME = 'GetRedditPostsTask';

process.title = `node-${TASK_NAME}`;

const LOG = getLogger(TASK_NAME);

class GetRedditPostsTask {
  async start() {
    LOG.info(`${TASK_NAME}: enabled. Trying to start...`);

    setImmediate(() => this.task());
  }

  async task() {
    const start = Date.now();

    try {
      await fetchNewPosts();
    } catch (err) {
      LOG.error(`Task failed. Error: ${JSON.stringify(err)} `);
    }

    // schedule new task
    const nextExecutionLog = `, next execution ~ in ${DEFAULT_CONFIG.intervalInSec} sec`;

    setTimeout(() => this.task(), DEFAULT_CONFIG.intervalInSec * 1000);

    LOG.info(
      `${TASK_NAME} finished in ${
        (Date.now() - start) / 1000
      } sec${nextExecutionLog}`
    );
  }
}

export default new GetRedditPostsTask();
