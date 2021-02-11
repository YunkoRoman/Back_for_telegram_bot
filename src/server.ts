import http from 'http';
// import RedisUser from './cache/redisUser';
import expressApp from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5000;
console.log('PORT: ', PORT);
const server = http.createServer(expressApp());
server.listen(PORT, () => logger.info('running'));

// const redis: RedisUser = new RedisUser();
