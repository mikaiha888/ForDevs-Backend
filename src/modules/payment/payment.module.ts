import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MercadoPagoService } from './strategies/mercadopago.strategy';
import { StripeService } from './strategies/stripe.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Plan } from '../plan/entities/plan.entity';

@Module({
  imports: [
  TypeOrmModule.forFeature([User, Plan]), 
  ],
  controllers: [PaymentController],
  providers: [PaymentService, MercadoPagoService, StripeService],
})
export class PaymentModule {}
