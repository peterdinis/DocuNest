'use client';

import { fetchDocumentDetail } from '@/app/_store/queries/documentQueries';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useMemo } from 'react';
import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { formats, modules } from './quill-config';

const DocInfo: FC = () => {
    const ReactQuill = useMemo(
        () => dynamic(() => import('react-quill'), { ssr: false }),
        [],
    );
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['docDetail', id],
        queryFn: async () => {
            return await fetchDocumentDetail(id);
        },
    });

    if (isLoading) {
        return <Loader2 className='h-8 w-8 animate-spin' />;
    }

    if (isError) {
        return (
            <p className='text-xl font-bold text-red-700'>
                Something went wrong
            </p>
        );
    }

    console.log('D', data);

    return (
        <div>
            <h2 className='prose-h2: prose mt-5 flex justify-center align-top text-3xl'>
                Document Info
            </h2>
            <Button variant='solid' color='primary'>
                <Link href='/dashboard'>Go Back</Link>
            </Button>

            <div className='mt-6'>
                <form>
                    <Input value={data.title} />
                    <ReactQuill
                        theme='snow'
                        className='mb-6 mt-10 h-[100vh] whitespace-pre-wrap'
                        modules={modules}
                        formats={formats}
                        value={data.description}
                    />
                </form>
            </div>
        </div>
    );
};

export default DocInfo;
