import path from 'path';

export default {
  client: 'pg',
  connection: {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'docker',
    database: process.env.DB_DATABASE || 'no_cap',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
  },
  migrations: {
    directory: path.resolve(__dirname, 'migrations'),
  },
};
