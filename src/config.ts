/* eslint-disable no-var */
let dotenv = require('dotenv');

dotenv.config();

// required environment variables
[
  'NODE_ENV', 'PORT', 'API_PREFIX', 'API_KEY',
].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

const config = {
  env: process.env.NODE_ENV,
  hostname: process.env.HOSTNAME,
  port: process.env.PORT,
  radius: process.env.SEARCH_RADIUS,
  yelpClient: {
    base_url: process.env.BASE_URL,
    api_key: process.env.API_KEY,
  },
  geocoder:{
    provider: process.env.GEOCODER_PROVIDER,
    api_key: process.env.GOOGLE_API_KEY,
  },
  logs: {
    label: process.env.LOG_LABEL,
    level: process.env.LOG_LEVEL,
    filename: process.env.LOG_FILE,
  },
  api: {
    prefix: process.env.API_PREFIX,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    user: process.env.REDIS_USER,
  },
};

export default config;
