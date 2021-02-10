import { RedisClient, createClient } from 'redis';
import dotenv from 'dotenv';
import { UserAddToChat } from '../types/types';
import { stringify } from 'querystring';

export default class RedisUser {
  private client: RedisClient;
  private REDIS_URL: string;

  constructor() {
    dotenv.config();
    // this.REDIS_URL = process.env.REDIS_URL || '';
    this.REDIS_URL = 'redis://127.0.0.1:6379';
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
  public setUser(user: UserAddToChat) {
    //   public setUser() {
    console.log('DATA FOR REDIS: ', user);
    console.log('DATA FOR REDIS: ', user.telegramId);
    this.client.setex(user.telegramId, 86400, JSON.stringify(user), (err, data) => {
      // this.client.setex(`${user.telegramId}`, 86400, 'test data for set', (err, data) => {
      if (err) throw err;

      if (data !== null) {
        return data;
      }
    });
  }
  //   public getUser(telegramId: number | string) {
  public getUser(telegramId: number | string): Promise<any> {
    // this.client.get(telegramId as string, (err, data) => {
    //   console.log('telegramId: ', telegramId);
    //   console.log('errGET-USER', err);
    //   console.log('dataGet-user', data);
    //   if (err) {
    //     return err;
    //   }

    //   if (data !== null) {
    //     console.log('data-getuser', data);
    //     return data;
    //   }
    // });
    return new Promise((resolve, reject) => {
      this.client.get(telegramId as string, (err, data) => {
        console.log('telegramId: ', telegramId);
        console.log('errGET-USER', err);
        console.log('dataGet-user', data);
        if (err) {
          return reject(err);
        }

        if (data !== null) {
          console.log('data-getuser', data);
          resolve(data);
        }
      });
    });
  }
}
