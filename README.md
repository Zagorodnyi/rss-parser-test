# RSS parser monorepo

## How to start

#### Without Docker

1. Use command `nvm i` to install correct node version;
2. Run `npm run bootstrap:project`;
3. Run in separate terminals `npm run start:backend` and `npm run start:admin`;

#### Docker
1. Use `npm run docker:up` to bootstrap all services;


Go to localhost:3000 and log in with default credentials:
  email: user@mail.com
  password: user

REST API will be available on localhost:5000;
Cron task runs every 30sec.


### Packages:
- **admin** - Admin dashboard (CRA);
- **api** - REST API for admin on fastify.
- **cron-tasks** - Cron tasks (cluster per task).
