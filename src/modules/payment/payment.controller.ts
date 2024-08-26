import { Controller, Post, Body,} from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('mercadopago/create')
  createMercadoPagoPreference(@Body() createPaymentDto: any) {
    return this.paymentService.createMercadoPagoPreference(createPaymentDto);
  }

  @Post('mercadopago/notification')
    handleMercadoPagoNotification(@Body() paymentData: any) {
    return this.paymentService.handleMercadoPagoNotification(paymentData);
  }

  @Post('stripe/create')
  createStripeSession(@Body() createPaymentDto: any) {
    return this.paymentService.createStripeSession(createPaymentDto.title, createPaymentDto.quantity, createPaymentDto.unit_price);
  }

  @Post('stripe/notification')
  async handleStripePayment(@Body() body: { sessionId: string; user: string; email: string }) {
    const { sessionId, user, email } = body;
    return this.paymentService.handleStripePayment(sessionId, user, email);
  }

  @Post('subscription/cancel')
  cancelSubscription(@Body('userId') userId: string) { 
    return this.paymentService.cancelSubscription(userId);
  }
}
