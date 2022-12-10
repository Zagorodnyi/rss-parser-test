import createError from '@fastify/error';
import { ErrorCodes } from '../../types';

export const FastifyError = (
  code: string,
  message: string,
  statusCode?: number
) => {
  const CustomError = createError(code, message, statusCode);

  return new CustomError();
};

export const NotFoundError = (message: string) => {
  const CustomError = createError(ErrorCodes.NOT_FOUND, message, 404);

  return new CustomError();
};

export const ValidationError = (message: string) => {
  const CustomError = createError(ErrorCodes.VALIDATION_ERROR, message, 400);

  return new CustomError();
};

export const NotAuthorizedError = (message = 'Not authorized') => {
  const CustomError = createError(ErrorCodes.NOT_AUTHORIZED, message, 401);

  return new CustomError();
};
