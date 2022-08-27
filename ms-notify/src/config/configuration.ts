import 'dotenv/config';

const configs = {
  redis: {
    host: process.env.REDIS_HOST as string,
    port: parseInt(process.env.REDIS_PORT as string, 10),
    url: process.env.REDIS_URL as string,
  },
  services: {
    msNotify: process.env.MS_NOTIFY_SERVICE_NAME as string,
  },
  redisOptions: {},
};

const redisOptions = () => {
  if (configs.redis.url) {
    return { url: configs.redis.url };
  } else {
    return {
      host: configs.redis.host,
      port: configs.redis.port,
    };
  }
};

configs.redisOptions = redisOptions();

export default configs;
