import http from 'http';
import expressApp from './app';
import {logger} from './utils/logger';

const PORT = process.env.PORT || 5000;

const server = http.createServer(expressApp());

server.listen(PORT, () => logger.serverLogger.info(`Server listen port ${PORT}`));
