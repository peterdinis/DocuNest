import { NextResponse } from 'next/server';
import { db } from '@/app/_utils/database';

export async function GET() {
    const allPricingPlans = await db.pricingPlan.findMany({});
    if(!allPricingPlans) {
        throw new Error("No Pricing plans");
    }

    return NextResponse.json(allPricingPlans);
}