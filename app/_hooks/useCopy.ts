'use client';

import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { CopiedValue, CopyFn } from '../_types/hookTypes';


export function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null);
    const copy: CopyFn = useCallback(
        async (text) => {
            if (!navigator?.clipboard) {
                console.warn('Clipboard not supported');
                return false;
            }

            try {
                await navigator.clipboard.writeText(text);
                setCopiedText(text);
                toast.success('Copied');
                return true;
            } catch (error) {
                toast.error('Failed to copy value');
                setCopiedText(null);
                return false;
            }
        },
        [toast],
    );

    return [copiedText, copy];
}
