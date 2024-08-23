import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('mercadopago/create')
  createMercadoPagoPreference(@Body() createPaymentDto: any) {
    return this.paymentService.createMercadoPagoPreference(createPaymentDto.title, createPaymentDto.quantity, createPaymentDto.unit_price, createPaymentDto.user);
  }

  @Post('mercadopago/notification')
  handleMercadoPagoNotification(@Body() payment: any) {
    return this.paymentService.handleMercadoPagoNotification(payment);
  }

  @Post('stripe/create')
  createStripeSession(@Body() createPaymentDto: any) {
    return this.paymentService.createStripeSession(createPaymentDto.title, createPaymentDto.quantity, createPaymentDto.unit_price);
  }

  @Post('stripe/notification')
  handleStripePayment(@Body() { sessionId, user, email }: any) {
    return this.paymentService.handleStripePayment(sessionId, user, email);
  }

  // @Post('subscription/cancel')
  // cancelSubscription(@Body() user: any) {
  //   return this.paymentService.cancelSubscription(user);
  // }
}
