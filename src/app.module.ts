import * as dotenv from 'dotenv';
import { join } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseService } from './app.service';

import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { ReviewModule } from './review/review.module';
import { ProjectModule } from './project/project.module';
import { ContractModule } from './contract/contract.module';
import { TechnologyModule } from './technology/technology.module';
import { TagModule } from './tag/tag.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrations: [join(__dirname, 'src/migrations/*.ts')],
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: false,
    }),
    UserModule,
    LikeModule,
    ReviewModule,
    ProjectModule,
    ContractModule,
    TechnologyModule,
    TagModule,
  ],
  providers: [DatabaseService]
})
export class AppModule {}
