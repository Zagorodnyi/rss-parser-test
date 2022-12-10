import { User } from '@prisma/client';

export interface UserPayload {
  email: string;
  passwordHash: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
