import { Injectable } from '@nestjs/common';
import { MercadoPagoService } from './strategies/mercadopago.strategy';
import { StripeService } from './strategies/stripe.strategy';

@Injectable()
export class PaymentService {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly stripeService: StripeService,
  ) {}

  async createMercadoPagoPreference(title: string, quantity: number, unit_price: number, user: any){
    return this.mercadoPagoService.createPreference(title, quantity, unit_price, user);
  }

  async handleMercadoPagoNotification(payment: any) {
    return this.mercadoPagoService.paymentNotification(payment);
  }

  async createStripeSession(title: string, quantity: number, unit_price: number) {
    return this.stripeService.createSession(title, quantity, unit_price);
  }

  async handleStripePayment(sessionId: string, user: any, email: string) {
    return this.stripeService.paymentNotification(sessionId, user, email);
  }

  // async cancelSubscription(user: any) {
  //   return this.stripeService.cancelSubscription(user);
  // }
}
