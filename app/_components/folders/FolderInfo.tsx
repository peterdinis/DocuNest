'use client';

import { fetchFolderDetail } from '@/app/_store/queries/folderQueries';
import { Button, ButtonGroup } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC } from 'react';
import Link from 'next/link';
import Header from '../shared/Header';
import { Accordion, AccordionItem } from '@nextui-org/react';

const FolderInfo: FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['folderDetail', id],
        queryFn: async () => {
            return await fetchFolderDetail(id);
        },
    });

    const defaultContent =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

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
    
    return (
        <div>
            <h2 className='prose-h2: prose mt-5 flex justify-center align-top text-3xl'>
                Folder Info
            </h2>

            <ButtonGroup className='ml-4 mt-6'>
                <Button variant='solid' color='primary'>
                    <Link href='/folders'>Go Back</Link>
                </Button>
            </ButtonGroup>

            <hr className='mt-3' />
            <div className='ml-5 mt-5'>
                <Header text={data.name} />
            </div>

            {/* Later add documents */}
            <Accordion selectionMode='multiple'>
                <AccordionItem
                    key='1'
                    aria-label='Accordion 1'
                    title='Accordion 1'
                >
                    {defaultContent}
                </AccordionItem>
                <AccordionItem
                    key='2'
                    aria-label='Accordion 2'
                    title='Accordion 2'
                >
                    {defaultContent}
                </AccordionItem>
                <AccordionItem
                    key='3'
                    aria-label='Accordion 3'
                    title='Accordion 3'
                >
                    {defaultContent}
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FolderInfo;