import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Inject,
} from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject('DB_POOL') private readonly pool: Pool) {}

  async onModuleInit() {
    console.log('Connected to the database');
  }

  async onModuleDestroy() {
    await this.pool.end();
    console.log('Disconnected from the database');
  }

  async query<T>(queryText: string, params: unknown[]) {
    return this.pool.query<T>(queryText, params);
  }

  async insertUser(name: string) {
    const { rows } = await this.pool.query<{
      id: string;
      name: string;
    }>(
      `INSERT INTO users (name, created_at) VALUES ($1, NOW()) RETURNING id, name`,
      [name],
    );

    return rows[0];
  }
}
