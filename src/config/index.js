// @flow

type Config = {
  PORT: number,
  HOSTNAME: string
}

const { PORT, HOSTNAME } = process.env;

const config: Config = {
  PORT: parseInt(PORT) || 3000,
  HOSTNAME: HOSTNAME || '127.0.0.1'
};

export default config;