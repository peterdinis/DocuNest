import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/_utils/database';
import { createStripeCustomer, createStripeSubscription } from '@/app/_utils/stripe';
import authOptions from '../../auth/authOptions';
import { getServerSession } from 'next-auth';

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await db.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user!.stripeCustomerId) {
        await createStripeCustomer(user!.id, user!.email);
    }

    const { priceId } = await req.json();
    const subscription = await createStripeSubscription(user!.stripeCustomerId as unknown as string, priceId);

    await db.user.update({
        where: { id: user!.id },
        data: {
            stripeSubscriptionId: subscription.id,
            hasSubscription: true,
        },
    });

    return NextResponse.json(subscription);
}