import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { MercadoPagoService } from './strategies/mercadopago.strategy';
import { StripeService } from './strategies/stripe.strategy';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, MercadoPagoService, StripeService],
})
export class PaymentModule {}
