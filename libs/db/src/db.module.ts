import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { Pool } from 'pg';

@Module({
  providers: [
    {
      provide: 'DB_POOL',
      useFactory: () => {
        return new Pool({
          user: process.env.DB_USER || 'user',
          host: process.env.DB_HOST || 'localhost',
          database: process.env.DB_NAME || 'users',
          password: process.env.DB_PASSWORD || 'password',
          port: parseInt(process.env.DB_PORT, 10) || 5432,
        });
      },
    },
    DbService,
  ],
  exports: ['DB_POOL', DbService],
})
export class DbModule {}
