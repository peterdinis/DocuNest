"use client"

import { FC, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import useOpenAI from '@/app/_hooks/useAI';
import Header from '../shared/Header';

interface AIDocProps {
    onContentGenerated: (content: string) => void;
}

const AIDoc: FC<AIDocProps> = ({ onContentGenerated }) => {
    const [prompt, setPrompt] = useState('');
    const { generateContent, isLoading, error } = useOpenAI();

    const handleGenerate = async () => {
        if (!prompt) return;

        const content = await generateContent(prompt);
        onContentGenerated(content);
    };

    return (
        <div>
            <Header text='Create prompt here' />
            <Input
                className='mt-5 ml-3 mr-3'
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
                fullWidth
            />
            <Button className='mt-5 ml-3 mr-3' color='primary' onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Content'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default AIDoc;