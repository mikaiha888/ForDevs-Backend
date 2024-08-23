import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class StripeService {
  private stripeClient: Stripe;

  constructor() {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createSession(title: string, quantity: number, unit_price: number) {
    const session = await this.stripeClient.checkout.sessions.create({
      line_items: [{
        price_data: {
          product_data: { name: title },
          currency: 'ARS',
          unit_amount: unit_price * 100,
        },
        quantity,
      }],
      mode: 'payment',
      success_url:'https://github.com/',
      cancel_url:'https://github.com/',
    });

    return session.url;
  }

  async paymentNotification(sessionId: string, user: any, email: string) {
    const session = await this.stripeClient.checkout.sessions.retrieve(sessionId);
  
  }
}
