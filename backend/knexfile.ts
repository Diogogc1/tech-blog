/* eslint-disable @typescript-eslint/no-require-imports */
// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
require('dotenv').config();
require('ts-node/register');
require('tsconfig-paths/register');

// Update with your config settings.

const config: { [key: string]: unknown } = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: false,
  },
  migrations: {
    directory: ['src/migrations'],
  },
};

module.exports = config;
