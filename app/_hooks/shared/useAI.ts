'use client';

import { useState } from 'react';
import axios from 'axios';

const useOpenAI = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generateContent = async (prompt: string): Promise<string> => {
        setIsLoading(true);
        setError(null);

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
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
                    },
                },
            );

            setIsLoading(false);
            return response.data.choices[0].text;
        } catch (error) {
            setIsLoading(false);
            setError('Failed to generate content');
            return '';
        }
    };

    return { generateContent, isLoading, error };
};

export default useOpenAI;
