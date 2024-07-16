'use client';

import { Spacer } from '@nextui-org/react';
import { FC } from 'react';
import DocumentCard from './DocumentCard';
import {
    useQuery,
  } from '@tanstack/react-query'
import { fetchAllDocuments } from '@/app/_store/queries/documentQueries';
import { Loader2 } from 'lucide-react';

const DocumentsLists: FC = () => {
    const {data, isLoading, isError} = useQuery({
        queryKey: ["myDocuments"],
        queryFn: () => fetchAllDocuments(),
        staleTime: Infinity
    })

    if(isLoading) {
        return <Loader2 className="animate-spin w-8 h-8" />
    }

    if(isError) {
        return <p className='font-bold text-red-700 text-xl'>Something went wrong</p>
    }

    console.log("D", data);

    return (
        <div className='mt-5'>
            <div className='flex'>
                <DocumentCard />
                <Spacer x={4} />
                <DocumentCard />
                <Spacer x={4} />
                <DocumentCard />
            </div>
        </div>
    );
};

export default DocumentsLists;
