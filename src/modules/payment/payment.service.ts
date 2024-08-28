import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

  async createMercadoPagoPreference(productData: any): Promise<string> {
    return this.mercadoPagoService.createPreference(productData);
  }

  async handleMercadoPagoNotification(payment: any): Promise<string> {
    return this.mercadoPagoService.paymentNotification(payment);
  }

  async createStripeSession(productData: any) {
    return this.stripeService.createSession(productData);
  }

  async handleStripePayment(sessionId: string) {
    return this.stripeService.paymentNotification(sessionId);
  }

  async cancelSubscription(userId: string, subscriptionId: string): Promise<string> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
  
      if (!user) {
        throw new NotFoundException('User not found');
      }
  
      const freePlan = await this.planRepository.findOneBy({ name: 'Free' });
      if (!freePlan) {
        throw new NotFoundException('Free plan not found');
      }
  
      await this.mercadoPagoService.cancelSubscription(subscriptionId);
    
      return 'User plan updated to Free and subscription cancelled';
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw new BadRequestException('Failed to cancel subscription');
    }
  }
  
}
