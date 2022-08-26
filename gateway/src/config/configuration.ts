import 'dotenv/config';

export default {
  redis: {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string, 10),
  },
  services: {
    msNotify: process.env.MS_NOTIFY_SERVICE_NAME as string,
  },
};
