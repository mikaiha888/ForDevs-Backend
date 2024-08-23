import { Injectable } from '@nestjs/common';
import { MercadoPagoService } from './strategies/mercadopago.strategy';
import { StripeService } from './strategies/stripe.strategy';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../plan/entities/plan.entity';

@Injectable()
export class PaymentService {
  constructor(
    private readonly mercadoPagoService: MercadoPagoService,
    private readonly stripeService: StripeService,
    @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    @InjectRepository(Plan)
        private readonly planRepository: Repository<Plan>,
  ) {}

  async createMercadoPagoPreference(productData: any){
    return this.mercadoPagoService.createPreference(productData);
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

  async cancelSubscription(userId: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['plan'],
      });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const freePlan = await this.planRepository.findOneBy({ planName: 'Free' });
      if (!freePlan) {
        throw new Error('Free plan not found');
      }

      user.plan = freePlan;
      await this.userRepository.save(user);
  
      return 'User plan updated to Free';
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw new Error('Failed to cancel subscription');
    }
  }
  
}
