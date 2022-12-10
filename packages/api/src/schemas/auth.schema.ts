import { Type } from '@sinclair/typebox';
import { ErrorResponsesSchema, JWSTokenSchema } from './common.schema';

export const LoginPayload = Type.Strict(
  Type.Object({
    email: Type.String(),
    passwordHash: Type.String(),
  })
);

export const RegisterPayload = Type.Strict(
  Type.Object({
    email: Type.String(),
    passwordHash: Type.String(),
  })
);

export const UserSchema = Type.Strict(
  Type.Object({
    id: Type.Number(),
    email: Type.String(),
  })
);

export const LoginSchema = {
  params: {
    post_id: Type.Strict(Type.String()),
  },
  body: LoginPayload,
  response: {
    200: Type.Strict(
      Type.Object({
        token: Type.String(),
        user: UserSchema,
      })
    ),
    ...ErrorResponsesSchema,
  },
};

export const LogoutSchema = {
  headers: {
    Authorization: JWSTokenSchema,
  },
  response: {
    200: Type.Strict(
      Type.Object({
        status: Type.Literal('ok'),
      })
    ),
    ...ErrorResponsesSchema,
  },
};

export const RegisterSchema = {
  body: RegisterPayload,
  response: {
    200: Type.Strict(
      Type.Object({
        user: UserSchema,
        token: Type.String(),
      })
    ),
    ...ErrorResponsesSchema,
  },
};
