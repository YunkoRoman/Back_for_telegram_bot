import { RedisClient, createClient } from 'redis';
import dotenv from 'dotenv';

export default class RedisUser {
  private client: RedisClient;

  private REDIS_URL: string;

  constructor() {
    dotenv.config();
    this.REDIS_URL = process.env.REDIS_URL || '';
    // this.REDIS_URL = 'redis://127.0.0.1:6379';
    this.client = createClient(this.REDIS_URL);
    this.testConnection();
  }

  private testConnection() {
    this.client.get('name', (err, res) => {
      if (err) throw err;

      if (res === 'brad') {
        console.log('Res: ', res);
        console.log('Redis connected');
      }
    });
  }
}
