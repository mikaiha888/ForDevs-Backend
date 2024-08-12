import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommissionService } from './commission.service';
import { CommissionController } from './commission.controller';
import { Commission } from './entities/commission.entity';
import { Contract } from '../contract/entities/contract.entity'; 

@Module({
  imports: [TypeOrmModule.forFeature([Commission, Contract])],
  controllers: [CommissionController],
  providers: [CommissionService],
})
export class CommissionModule {}
