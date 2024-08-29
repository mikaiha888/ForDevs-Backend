import { Controller, Post, Body,} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('Payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('mercadopago/create')
  @ApiOperation({summary: 'create mercadopago link'})
  createMercadoPagoPreference(@Body() createPaymentDto: any) {
    return this.paymentService.createMercadoPagoPreference(createPaymentDto);
  }

  @Post('mercadopago/notification')
  @ApiOperation({summary: 'update user to premium'})
    handleMercadoPagoNotification(@Body() paymentData: any) {
    return this.paymentService.handleMercadoPagoNotification(paymentData);
  }

  @Post('stripe/create')
  @ApiOperation({summary: 'create stripe link'})
  createStripeSession(@Body() createPaymentDto: any) {
    return this.paymentService.createStripeSession(createPaymentDto);
  }

  @Post('stripe/notification')
  @ApiOperation({summary: 'update user to premium'})
  async handleStripePayment(@Body() body: { sessionId: string }) {
    return this.paymentService.handleStripePayment(body.sessionId);
  }

  @Post('subscription/cancel')
  @ApiOperation({summary: 'cancel subscription'})
  cancelSubscription(
    @Body('userId') userId: string,
    @Body('subscriptionId') subscriptionId: string,
  ) {
    return this.paymentService.cancelSubscription(userId, subscriptionId);
  }
}
