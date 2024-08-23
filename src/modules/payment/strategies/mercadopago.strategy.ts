import { Injectable, BadRequestException } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class MercadoPagoService {
    constructor() {
    }
        
    async createPreference(title: string, quantity: number, unit_price: number, user: any): Promise<string> {
        const client = new mercadopago.MercadoPagoConfig({
            accessToken: process.env.MP_TEST_ACCESS_TOKEN,
        });
    
        try {
            if (!user || !user.id) {
                throw new BadRequestException('User not found');
            }
    
            const body = {
                items: [
                    {
                        id: 'item-id-123',
                        title,
                        quantity: Number(quantity),
                        unit_price: Number(unit_price),
                        currency_id: 'ARS',
                    },
                ],
                back_urls: {
                    success: process.env.FRONT_DEPLOY_SUCCESS,
                    failure: process.env.FRONT_DEPLOY_FAILURE,
                    pending: process.env.FRONT_DEPLOY_PENDING,
                },
                external_reference: user.id,
            };
    
            const preference = new mercadopago.Preference(client);
            const result = await preference.create({ body });
            console.log(result.sandbox_init_point);
            return result.id;
        } catch (error) {
            console.error('Error creating preference:', error);
            throw error;
        }
    }
        
        async paymentNotification(payment: any): Promise<void> {
        }
    }
    