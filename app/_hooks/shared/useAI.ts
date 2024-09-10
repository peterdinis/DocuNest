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
            const response = await axios.post('/api/openai', { prompt });
            setIsLoading(false);
            return response.data.text;
        } catch (error) {
            setIsLoading(false);
            setError('Failed to generate content');
            return '';
        }
    };

    return { generateContent, isLoading, error };
};

export default useOpenAI;