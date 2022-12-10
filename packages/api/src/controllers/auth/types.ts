export interface LoginPayload {
  email: string;
  passwordHash: string;
}

export type RegisterPayload = LoginPayload;
