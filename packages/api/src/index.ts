// Require the framework and instantiate it
import fastify from 'fastify';
import { getLogger, configure } from 'log4js';
import cors from '@fastify/cors';

import { checkConfig } from './middleware/configChecker';
import { registerRoutes } from './routes';

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

const LOG = getLogger('Server');

checkConfig();

const app = fastify();

registerRoutes(app);

const start = async () => {
  try {
    await app.register(cors, {
      origin: '*',
    });
    await app.listen({ port: 5000, host: '0.0.0.0' });
  } catch (err) {
    console.log(err);
    LOG.error(err);
    process.exit(1);
  }
  LOG.debug(`API server started on port 5000`);
};

start();
