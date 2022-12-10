declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      API_SECRET: string;
    }
  }
}

export {};
