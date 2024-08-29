import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './db/data-source';

import { TagModule } from './modules/utility/tag/tag.module';
import { UserModule } from './modules/core/user/user.module';
import { LikeModule } from './modules/utility/like/like.module';
import { LinkModule } from './modules/utility/link/link.module';
import { PlanModule } from './modules/core/plan/plan.module';
import { RoleModule } from './modules/auxiliary/role/role.module';
import { AuthModule } from './modules/utility/auth/auth.module';
import { ReviewModule } from './modules/auxiliary/review/review.module';
import { ProjectModule } from './modules/auxiliary/project/project.module';
import { ProductModule } from './modules/core/product/product.module';
import { ContractModule } from './modules/utility/contract/contract.module';
import { TechnologyModule } from './modules/auxiliary/technology/technology.module';
import { PaymentModule } from './modules/core/payment/payment.module';
import { SubscriptionModule } from './modules/core/subscription/subscription.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    TagModule,
    UserModule,
    PlanModule,
    RoleModule,
    LinkModule,
    LikeModule,
    AuthModule,
    ReviewModule,
    ProductModule,
    ProjectModule,
    ContractModule,
    TechnologyModule,
    PaymentModule,
    SubscriptionModule
  ],
})
export class AppModule {}
