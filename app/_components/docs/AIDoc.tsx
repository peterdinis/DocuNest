"use client"

import { FC, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import useOpenAI from '@/app/_hooks/shared/useAI';
import Header from '../shared/Header';
import { AIDocProps } from '@/app/_types/documentTypes';
import { Loader2 } from 'lucide-react';

const AIDoc: FC<AIDocProps> = ({ onContentGenerated }) => {
    const [prompt, setPrompt] = useState('');
    const { generateContent, isLoading, error } = useOpenAI();

    const handleGenerate = async () => {
        if (!prompt) return;

        try {
            const content = await generateContent(prompt);
            onContentGenerated(content);
        } catch (error) {
            console.error('Error generating content:', error);
        }
    };

    return (
        <div>
            <Header text='Create prompt here' />
            <Input
                className='ml-3 mr-3 mt-5'
                type='text'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder='Enter your prompt'
                fullWidth
            />
            <Button
                className='ml-3 mr-3 mt-5'
                color='primary'
                onClick={handleGenerate}
                disabled={isLoading}
            >
                {isLoading ? <Loader2 className='animate-spin w-8 h-8' /> : 'Generate Content'}
            </Button>
            {error && <p className='text-red-500'>{error}</p>}
        </div>
    );
};

export default AIDoc;