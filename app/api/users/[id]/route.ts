import { db } from "@/app/_utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (!id) {
        return NextResponse.json(
            { error: 'Missing id parameter' },
            { status: 400 },
        );
    }

    try {
        const userDetailInfo = await db.user.findFirst({
            where: { id },
            include: {
                documents: true,
                folders: true
            },
        });

        if (!userDetailInfo) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 },
            );
        }

        return NextResponse.json(userDetailInfo);
    } catch (error) {
        console.error('Error fetching user:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 },
        );
    }
}