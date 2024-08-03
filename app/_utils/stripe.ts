import Stripe from 'stripe';
import { db } from './database';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export const createStripeCustomer = async (userId: string, email: string) => {
    const customer = await stripe.customers.create({
        email,
    });

    await db.user.update({
        where: { id: userId },
        data: { stripeCustomerId: customer.id },
    });

    return customer;
};

export const createStripeSubscription = async (customerId: string, priceId: string) => {
    const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete',
        expand: ['latest_invoice.payment_intent'],
    });

    return subscription;
}