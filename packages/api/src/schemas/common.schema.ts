import { Type } from '@sinclair/typebox';
import { ErrorCodes } from '../types';

export const ErrorSchema = (code?: string, statusCode?: number) =>
  Type.Strict(
    Type.Object({
      message: Type.String(),
      error: Type.String(),
      code: Type.Optional(code ? Type.Literal(code) : Type.String()),
      statusCode: Type.Optional(
        statusCode ? Type.Literal(statusCode) : Type.Number()
      ),
    })
  );

const ValidationErrorSchema = Type.Strict(
  Type.Object({
    message: Type.String(),
    error: Type.String(),
    code: Type.Optional(Type.Literal(ErrorCodes.VALIDATION_ERROR)),
    statusCode: Type.Optional(Type.Literal(400)),
  })
);

const NotFoundErrorSchema = ErrorSchema(ErrorCodes.NOT_FOUND, 404);
const NotAuthorizedErrorSchema = ErrorSchema(ErrorCodes.NOT_AUTHORIZED, 401);
const InternalServerErrorSchema = ErrorSchema(undefined, 500);

export const ErrorResponsesSchema = {
  400: ValidationErrorSchema,
  401: NotAuthorizedErrorSchema,
  404: NotFoundErrorSchema,
  500: InternalServerErrorSchema,
};

export const JWSTokenSchema = Type.Strict(Type.String());
