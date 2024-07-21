"use client"

import { FC, useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import useOpenAI from '@/app/_hooks/useAI';

interface AIDocProps {
    onContentGenerated: (content: string) => void;
}

const AIDoc: React.FC<AIDocProps> = ({ onContentGenerated }) => {
    const [prompt, setPrompt] = useState('');
    const { generateContent, isLoading, error } = useOpenAI();

    const handleGenerate = async () => {
        if (!prompt) return;

        const content = await generateContent(prompt);

        console.log("C", content);
        onContentGenerated(content);
    };

    return (
        <div>
            <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt"
                fullWidth
            />
            <Button onClick={handleGenerate} disabled={isLoading}>
                {isLoading ? 'Generating...' : 'Generate Content'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default AIDoc;