import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from '../ormconfig';

import { UserModule } from './modules/user/user.module';
import { LikeModule } from './modules/like/like.module';
import { ReviewModule } from './modules/review/review.module';
import { ProjectModule } from './modules/project/project.module';
import { ContractModule } from './modules/contract/contract.module';
import { TechnologyModule } from './modules/technology/technology.module';
import { TagModule } from './modules/tag/tag.module';
import { CommissionModule } from './modules/commission/commission.module';
import { LinkModule } from './modules/link/link.module';
import { PlanModule } from './modules/plan/plan.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSource),
    TagModule,
    UserModule,
    LikeModule,
    ReviewModule,
    ProjectModule,
    ContractModule,
    TechnologyModule,
    CommissionModule,
    LinkModule,
    PlanModule,
    AuthModule,
  ],
})
export class AppModule {}
