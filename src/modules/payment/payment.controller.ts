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
    return this.paymentService.createStripeSession(createPaymentDto);
  }

  @Post('stripe/notification')
  async handleStripePayment(@Body() body: { sessionId: string }) {
    return this.paymentService.handleStripePayment(body.sessionId);
  }

  @Post('subscription/cancel')
  cancelSubscription(
    @Body('userId') userId: string,
    @Body('subscriptionId') subscriptionId: string,
  ) {
    return this.paymentService.cancelSubscription(userId, subscriptionId);
  }
}
