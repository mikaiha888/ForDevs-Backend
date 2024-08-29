import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import * as dotenv from 'dotenv';
import { SubscriptionService } from 'src/modules/core/subscription/subscription.service';
import { PlanService } from 'src/modules/core/plan/plan.service';
import { UserService } from 'src/modules/core/user/user.service';
import { Plan } from 'src/modules/core/plan/entities/plan.entity';
import { promises } from 'dns';
import { Subscription } from 'src/modules/core/subscription/entities/subscription.entity';

dotenv.config();

@Injectable()
export class MercadoPagoService {
  private readonly client: mercadopago.MercadoPagoConfig;

  constructor(
    private readonly userRepository: UserService,
    private readonly planRepository: PlanService,
    private subscriptionService: SubscriptionService,
  ) {
    this.client = new mercadopago.MercadoPagoConfig({
      accessToken: process.env.MP_TEST_ACCESS_TOKEN,
    });
  }

  public async createPreference(productData: any): Promise<string> {
    try {
      if (!productData.product)
        return `${process.env.MP_SUBSCRIPTION_URL}&external_reference=${productData.user.id}`;
      else {
        const preferenceData: any = {
          items: [
            {
              title: productData.product.title,
              quantity: productData.product.quantity || 1,
              currency_id: productData.product.currency || 'ARS',
              unit_price: productData.product.amount,
            },
          ],
          back_urls: {
            success: 'https://pf-fordevs.vercel.app/',
            failure: 'https://pf-fordevs.vercel.app/',
            pending: 'https://pf-fordevs.vercel.app/',
          },
          external_reference: productData.user.id,
          auto_return: 'approved',
          operation_type: 'regular_payment',
        };

        const preference = new mercadopago.Preference(this.client);
        const result = await preference.create({ body: preferenceData });

        console.log('Preference created:', result);

        return result.init_point;
      }
    } catch (error) {
      console.error('Error creating preference:', error);
      throw new BadRequestException('Failed to create MercadoPago preference');
    }
  }

  public async paymentNotification(payment: any): Promise<Subscription | string> {
    try {
      let subscription:Subscription;
      if (payment.type === 'payment' && payment.data.status === 'approved') {
        const user = await this.userRepository.findOne(
          payment.data.external_reference,
        );

        if (!user) {
          throw new NotFoundException('User not found');
        }

        if (payment.data.metadata?.isSubscription) {
          subscription = await this.subscriptionService.create({
            id: payment.data.id,
            user,
            status: payment.data.status,
          });

          return subscription;
        } else {
          return 'Payment successful';
        }
      } else {
        throw new BadRequestException(
          'Payment not approved or not a payment type',
        );
      }
    } catch (error) {
      console.error('Error processing payment notification:', error);
      throw error;
    }
  }

  public async cancelSubscription(subscriptionId: string): Promise<string> {
    try {
      const preapproval = new mercadopago.PreApproval(this.client);
      await preapproval.update({
        id: subscriptionId,
        body: {
          status: 'cancelled',
        },
      });
      return 'Subscription cancelled successfully';
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw new BadRequestException('Failed to cancel subscription');
    }
  }
}
