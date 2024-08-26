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
  private readonly planRepository: Repository<Plan>,) {
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

    return { url: session.url, sessionId: session.id };
  }

  async paymentNotification(sessionId: string, userId: string, email: string) {
    try {
      const session = await this.stripeClient.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
          throw new Error('User not found');
        }

        const premiumPlan = await this.planRepository.findOneBy({ name: 'Premium' });
        if (!premiumPlan) {
          throw new Error('Premium plan not found');
        }

        user.plan = premiumPlan;
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
