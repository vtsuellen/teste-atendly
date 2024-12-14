interface Config {
  JWT_SECRET: string;
  DB_USER: string;
  DB_PASS: string;
  DB_NAME: string;
  DB_HOST: string;
  PORT: number;
  NODE_ENV: string;
}

const config: Config = {
  JWT_SECRET: 'SECRET',
  DB_USER: 'root',
  DB_PASS: 'root',
  DB_NAME: 'teste-atendly',
  DB_HOST: 'localhost',
  PORT: 5000,
  NODE_ENV: 'development',
};

export default config;
