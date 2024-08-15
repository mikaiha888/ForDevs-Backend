import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';

import { UserModule } from './user/user.module';
import { LikeModule } from './like/like.module';
import { ReviewModule } from './review/review.module';
import { ProjectModule } from './project/project.module';
import { ContractModule } from './contract/contract.module';
import { TechnologyModule } from './technology/technology.module';
import { TagModule } from './tag/tag.module';
import { CommissionModule } from './commission/commission.module';
import { LinkModule } from './link/link.module';
import { PlanModule } from './plan/plan.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
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
  ],
})
export class AppModule {}
