import { RedisClient, createClient } from 'redis';
import dotenv from 'dotenv';
import { UserAddToChat } from '../types/types';

export default class RedisUser {
  private client: RedisClient;
  private REDIS_URL: string;

  constructor() {
    dotenv.config();
    this.REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
    // this.REDIS_URL = 'redis://127.0.0.1:6379';
    console.log('REDIS_URL: ', this.REDIS_URL);
    this.client = createClient(this.REDIS_URL);
  }
  public testConnection(test: string) {
    this.client.get('name', function (err, res) {
      if (err) {
        throw err;
      }
      if (res === 'brad') {
        console.log('Redis connected ', test);
      }
    });
  }
  public setUser(user: UserAddToChat): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.setex(user.telegramId, 86400, JSON.stringify(user), (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
  public getUser(telegramId: number | string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.get(telegramId as string, (err, data) => {
        if (err) {
          reject(err);
        }

        if (data !== null) {
          resolve(JSON.parse(data));
        } else {
          resolve(data);
        }
      });
    });
  }
}
