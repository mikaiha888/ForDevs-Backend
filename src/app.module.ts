import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ContractModule } from './contract/contract.module';
import * as dotenv from 'dotenv';
import { Contract } from './contract/entities/contract.entity';
import { Commission } from './commission/entities/commission.entity';
import { LikeModule } from './like/like.module';
import { Like } from './like/entities/like.entity';
import { ProjectModule } from './project/project.module';
import { ReviewModule } from './review/review.module';
import { Project } from './project/entities/project.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Contract, Commission, Like, Project ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    ContractModule,
    LikeModule,
    ProjectModule,
    ReviewModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
