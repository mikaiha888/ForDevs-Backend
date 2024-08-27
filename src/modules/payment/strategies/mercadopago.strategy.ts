import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import * as dotenv from 'dotenv';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { Plan } from '../../plan/entities/plan.entity'; 
import { Repository } from 'typeorm';

dotenv.config();

@Injectable()
export class MercadoPagoService {
    private readonly client: mercadopago.MercadoPagoConfig;

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Plan)
        private readonly planRepository: Repository<Plan>,
    ) {
        this.client = new mercadopago.MercadoPagoConfig({
            accessToken: process.env.MP_TEST_ACCESS_TOKEN,
        });
    }

    public async createPreference(productData: any): Promise<string> {
        try {
            if (!productData.product) return `${process.env.MP_SUBSCRIPTION_URL}&external_reference=${productData.user.id}`        
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

    public async paymentNotification(payment: any): Promise<string> {
        try {
            if (payment.type === 'payment' && payment.data.status === 'approved') {
                const userId = payment.data.external_reference;
                const user = await this.userRepository.findOneBy({ id: userId });

                if (!user) {
                    throw new NotFoundException('User not found');
                }

                if (payment.data.metadata?.isSubscription) {
                    user.subscriptionId = payment.data.id; 

                    const premiumPlan = await this.planRepository.findOneBy({ name: 'Premium' });

                    if (!premiumPlan) {
                        throw new NotFoundException('Premium plan not found');
                    }

                    user.plan = premiumPlan;

                    await this.userRepository.save(user);

                    return 'User updated to Premium with subscription';
                } else {
                    return 'Payment successful';
                }
            } else {
                throw new BadRequestException('Payment not approved or not a payment type');
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
