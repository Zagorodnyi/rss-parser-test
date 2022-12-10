import axios from 'axios';
import { AuthInput } from './types';

const base_url = 'http://localhost:5000';

const getHeaders = () => ({
  Authorization: localStorage.getItem('auth'),
});

export class AuthService {
  static async login(data: AuthInput) {
    const hash = this.createHash(data.password, data.email);

    const res = await axios.post(`${base_url}/auth/login`, {
      email: data.email,
      passwordHash: hash,
    });

    if (res.data?.token) {
      localStorage.setItem('auth', res.data.token);
    }

    return res;
  }

  static async logout() {
    const res = await axios.post(
      `${base_url}/auth/logout`,
      {},
      {
        headers: getHeaders(),
      }
    );

    return res;
  }

  static async register(data: AuthInput) {
    const hash = this.createHash(data.password, data.email);

    const res = await axios.post(`${base_url}/auth/register`, {
      email: data.email,
      passwordHash: hash,
    });

    return res;
  }

  static async validateSession() {
    const res = await axios.post(
      `${base_url}/auth/check`,
      {},
      {
        headers: getHeaders(),
      }
    );

    return res;
  }

  protected static createHash(password: string, salt: string) {
    // Password has to be hashed here. Using pseudo for now
    return password + salt;
  }
}
