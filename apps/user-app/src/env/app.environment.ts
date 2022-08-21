import { registerAs } from '@nestjs/config';

export const appEnvironment = registerAs('appEnvironment', () => ({
  PORT: parseInt(process.env.PORT, 10) || 3000,
  mongodb: {
    HOST: process.env.MONGO_HOST_URL || 'mongodb://localhost:27017',
    DBNAME: process.env.MONGO_DB_NAME || 'nest-dev',
  },
}));
