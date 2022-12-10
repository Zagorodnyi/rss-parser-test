import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { getLogger } from 'log4js';
import { PrismaClient } from '@prisma/client';

import {
  NotAuthorizedError,
  ValidationError,
} from '../../middleware/errors/customErrors';
import { LoginResponse, UserPayload } from './types';

const LOG = getLogger('AuthService');

class AuthServiceImpl {
  protected db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async login(payload: UserPayload): Promise<LoginResponse> {
    const user = await this.db.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      LOG.error(
        `Failed login attempt. User not found. Email: ${payload.email}`
      );
      throw ValidationError('Invalid email or password');
    }

    const isValidPassword = this.validatePassword(
      payload.passwordHash,
      user.salt,
      user.passwordHash
    );

    if (!isValidPassword) {
      LOG.error(
        `Failed login attempt. Invalid password. UserId: ${user.id}, email: ${user.email}`
      );
      throw ValidationError('Invalid email or password');
    }

    const token = await this.createSession(user.id);

    LOG.info(`UserId: ${user.id} logged in.`);

    return {
      user,
      token,
    };
  }

  async logout(userId: number, sid: string) {
    try {
      await this.db.session.delete({
        where: {
          id: sid,
        },
      });
    } catch (err) {
      LOG.warn(`Logout attempt failed. Session not found. SID: ${sid}`);
    }

    LOG.info(`UserId: ${userId} has been logged out.`);
  }

  async register(user: UserPayload): Promise<LoginResponse> {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = this.createHash(user.passwordHash, salt);

    const newUser = await this.db.user.create({
      data: {
        email: user.email,
        passwordHash: hash,
        salt,
      },
    });

    const token = await this.createSession(newUser.id);

    LOG.info(
      `Registered new user with email ${user.email}. UserId: ${newUser.id}`
    );

    return {
      user: newUser,
      token,
    };
  }

  protected async validatePassword(
    passwordHash: string,
    salt: string,
    existingHash: string
  ) {
    const hash = this.createHash(passwordHash, salt);

    return hash === existingHash;
  }

  protected createHash(passwordHash: string, salt: string) {
    return crypto
      .pbkdf2Sync(passwordHash, salt, 1000, 64, `sha512`)
      .toString(`hex`);
  }

  protected async createSession(userId: number): Promise<string> {
    const session = await this.db.session.create({
      data: {
        userId,
      },
    });

    const token = jwt.sign(
      {
        sid: session.id,
        userId,
      },
      process.env.JWT_SECRET
    );

    return token;
  }

  async validateSession(sid: string): Promise<boolean> {
    const session = await this.db.session.findUnique({
      where: {
        id: sid,
      },
    });

    if (!session) {
      throw NotAuthorizedError('Session is invalid');
    }

    return true;
  }
}

export const AuthService = new AuthServiceImpl(new PrismaClient());
