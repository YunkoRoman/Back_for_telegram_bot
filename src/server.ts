import http from 'http';
import expressApp from './app';
import logger from './utils/logger';
import RedisUser from './cache/redisUser';

const PORT = process.env.PORT || 5000;
console.log('PORT: ', PORT);
const server = http.createServer(expressApp());
server.listen(PORT, () => logger.info('running'));

const checkRedisCon: RedisUser = new RedisUser();
