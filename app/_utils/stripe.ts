import Stripe from 'stripe';
import { db } from './database';

const stripe = new Stripe("sk_test_SPFSnPOZyj78o5i5xoyvUDGS00Bp93hTF4", { apiVersion: '2024-06-20' });

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
};