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
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Plan)
        private readonly planRepository: Repository<Plan>,
    ) {}
        
    async createPreference(productData): Promise<string> {
        const client = new mercadopago.MercadoPagoConfig({
            accessToken: process.env.MP_TEST_ACCESS_TOKEN,
        });
    
        try {
            if (!productData.user || !productData.user.id) {
                throw new BadRequestException('User not found');
            }
    
            const body = {
                items: [productData],
                back_urls: {
                    success: process.env.FRONT_DEPLOY_SUCCESS,
                    failure: process.env.FRONT_DEPLOY_FAILURE,
                    pending: process.env.FRONT_DEPLOY_PENDING,
                },
                external_reference: productData.user.id,
            };
    
            const preference = new mercadopago.Preference(client);
            const result = await preference.create({ body });
            console.log(result.sandbox_init_point);
            return result.sandbox_init_point;
        } catch (error) {
            console.error('Error creating preference:', error);
            throw error;
        }
    }

    async paymentNotification(payment: any): Promise<string> {
        try {
            if (payment.type === 'payment' && payment.data.status === 'approved') {
                const userId = payment.data.external_reference;
                const user = await this.userRepository.findOneBy({ id: userId });
    
                if (!user) {
                    throw new NotFoundException('User not found');
                }
    
                const premiumPlan = await this.planRepository.findOneBy({ planName: 'Premium' });

    
                if (!premiumPlan) {
                    throw new NotFoundException('Premium plan not found');
                }
    
                user.plan = premiumPlan;  
                await this.userRepository.save(user); 
    
                return 'User updated to premium';
            } else {
                throw new BadRequestException('Payment not approved or not a payment type');
            }
        } catch (error) {
            console.error('Error processing payment notification:', error);
            throw error;
        }
    }
    
}
