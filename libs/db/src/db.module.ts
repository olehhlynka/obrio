import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [
    {
      provide: 'DB_POOL',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return new Pool({
          user: configService.get<string>('DB_USER'),
          host: configService.get<string>('DB_HOST'),
          database: configService.get<string>('DB_NAME'),
          password: configService.get<string>('DB_PASSWORD'),
          port: configService.get<number>('DB_PORT') || 5432,
        });
      },
    },
    DbService,
  ],
  exports: ['DB_POOL', DbService],
})
export class DbModule {}
