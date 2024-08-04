'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

const handleSubscriptMut = async (priceId: string) => {
    const stripe = await stripePromise;
    const response = await fetch('/api/stripe/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
    });

    if (!response.ok) {
        throw new Error('Failed to create subscription');
    }

    const subscription = await response.json();
    const { error } = await stripe!.redirectToCheckout({
        sessionId: subscription.latest_invoice.payment_intent.client_secret,
    });

    if (error) {
        throw new Error(error.message);
    }
};

const useCreateSubscription = () => {
    return useMutation({
        mutationKey: ['createSubscription'],
        mutationFn: handleSubscriptMut,
        onSuccess: () => {
            toast.success('New subscription was created');
        },
        onError: (error) => {
            toast.error(`New subscription was not created: ${error.message}`);
        },
    });
};

export default useCreateSubscription;