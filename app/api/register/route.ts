import { db } from '@/app/_utils/database';
import { createStripeCustomer, createStripeSubscription } from '@/app/_utils/stripe';
import * as bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, password } = body;

        if (!email || !password) {
            return new NextResponse('Missing Fields', { status: 400 });
        }

        const exist = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (exist) {
            return new NextResponse('Email already exists', { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const customer = await createStripeCustomer(user.id, email);

        // Subscribe to free plan
        const subscription = await createStripeSubscription(customer.id, 'price_free_id');

        return NextResponse.json({
            user,
            subscription
        });
    } catch (error) {
        console.error('Error during registration:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
