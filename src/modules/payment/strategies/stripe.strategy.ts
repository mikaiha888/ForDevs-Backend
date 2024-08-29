import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import * as dotenv from 'dotenv';
import { User } from 'src/modules/user/entities/user.entity';
import { Plan } from 'src/modules/plan/entities/plan.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

dotenv.config();

@Injectable()
export class StripeService {
  private stripeClient: Stripe;

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {
    this.stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createSession(productData: any) {
    const session = await this.stripeClient.checkout.sessions.create({
      line_items: [{
        price_data: {
          product_data: { name: productData.title },
          currency: 'ARS',
          unit_amount: productData.unit_price * 100,
        },
        quantity: productData.quantity || 1,
      }],
      mode: 'payment',
      success_url: 'https://github.com/',
      cancel_url: 'https://github.com/',
    });

    return { url: session.url, sessionId: session.id };
  }

  async createSubscription(customerId: string, priceId: string) {
    const subscription = await this.stripeClient.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
    });

    return subscription;
  }

  async cancelSubscription(subscriptionId: string) {
    try {
      const subscription = await this.stripeClient.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });

      return subscription;
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw new Error('Failed to cancel subscription');
    }
  }

  async paymentNotification(sessionId: string) {
    try {
      const session = await this.stripeClient.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        const userId = session.client_reference_id; // Assuming client_reference_id is used to identify user
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
          throw new Error('User not found');
        }

        const premiumPlan = await this.planRepository.findOneBy({ name: 'Premium' });
        if (!premiumPlan) {
          throw new Error('Premium plan not found');
        }

        await this.userRepository.save(user);

        return 'User plan updated to Premium';
      } else {
        throw new Error('Payment not completed');
      }
    } catch (error) {
      console.error('Error handling payment notification:', error);
      throw new Error('Failed to handle payment notification');
    }
  }
}
