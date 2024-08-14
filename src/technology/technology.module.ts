import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TechnologyService } from './technology.service';
import { TechnologyController } from './technology.controller';
import { Technology } from './entities/technology.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Technology])],
  controllers: [TechnologyController],
  providers: [TechnologyService],
})
export class TechnologyModule {}
