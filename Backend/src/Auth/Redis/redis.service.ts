import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly client: Redis,
  ) {}

  async blacklistToken(token: string, expiry: number): Promise<void> {
    try {
      expiry = Number(expiry);
      await this.client.set(token, 'blacklisted', 'EX', expiry);
    } catch (error) {
      console.error('Error blacklisting token:', error);
      throw error;
    }
  }

  async isBlacklisted(token: string): Promise<boolean> {
    try {
      const result = await this.client.get(token);
      return result === 'blacklisted';
    } catch (error) {
      console.error('Error checking blacklist:', error);
      throw error;
    }
  }

  async storeOtp(email: string, otp: string, expiry: number): Promise<void> {
    try {
      expiry = Number(expiry);
      await this.client.set(email, otp, 'EX', expiry);
    } catch (error) {
      console.error('Error storing OTP:', error);
      throw error;
    }
  }

  async getOtp(email: string): Promise<string | null> {
    try {
      return await this.client.get(email);
    } catch (error) {
      console.error('Error retrieving OTP:', error);
      throw error;
    }
  }

  async deleteOtp(email: string): Promise<void> {
    try {
      await this.client.del(email);
    } catch (error) {
      console.error('Error deleting OTP:', error);
      throw error;
    }
  }
  async storeUserDetails(email: string, userDetails: any, otp: string, expiry: number): Promise<any> {
    try {
      const dataToStore = {
        ...userDetails,
        otp: otp,
      };
      const dataString = JSON.stringify(dataToStore);
      await this.client.set(email, dataString, 'EX', expiry); 
      return { message: 'User details and OTP stored' };
    } catch (error) {
      console.error('Error storing user details and OTP:', error);
      throw error;
    }
  }

  async getUserDetails(email: string): Promise<any> {
    try {
      const userDetailsString = await this.client.get(email);
      return JSON.parse(userDetailsString); 
    } catch (error) {
      console.error('Error retrieving user details:', error);
      throw error;
    }
  }
}
