import { getLogger } from 'log4js';
import { z } from 'zod';

const LOG = getLogger('ConfigChecker');

export const checkConfig = () => {
  const schema = z.object({
    JWT_SECRET: z.string(),
  });

  try {
    schema.parse(process.env);
  } catch (err) {
    LOG.error(err);
    throw err;
  }
};
