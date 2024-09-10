
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: Request) {
    const { prompt } = await request.json();

    if (!prompt) {
        return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                prompt,
                model: 'gpt-3.5-turbo-instruct',
                max_tokens: 100,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
                },
            },
        );

        return NextResponse.json({ text: response.data.choices[0].text });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
}