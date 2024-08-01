'use client';

import { FC, Key, useState, FormEvent } from 'react';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    useDisclosure,
} from '@nextui-org/react';
import { Search } from 'lucide-react';
import { useSearch } from '@/app/_hooks/shared/useSearch';
import Loading from './Loading';

interface IGlobalSearchProps {
    btnName?: string;
}

const GlobalSearch: FC<IGlobalSearchProps> = ({ btnName }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const { data, error, isLoading, refetch } = useSearch(searchQuery);
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() === '') return;
        refetch();
    };

    return (
        <>
            <button
                onClick={onOpen}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
                <Search /> {btnName}
            </button>

            <Modal
                size='3xl'
                backdrop='blur'
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent>
                    <>
                        <ModalHeader className='flex flex-col gap-1'>
                            {btnName || 'Search'}
                        </ModalHeader>
                        <hr />
                        <p className='mt-5 p-3 prose prose-p: dark:text-white'>
                            Search for document or folder here
                        </p>
                        <ModalBody>
                            <form onSubmit={handleSearch}>
                                <Input
                                    type='text'
                                    value={searchQuery}
                                    startContent={<Search />}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                    placeholder='Search...'
                                    className='w-full rounded p-2'
                                />
                            </form>
                            {isLoading && <Loading />}
                            {error && (
                                <div className='text-xl font-bold text-red-800'>
                                    Error: {error.message}
                                </div>
                            )}
                            {data && (
                                <div className='flex flex-col gap-4 mt-4'>
                                    <div>
                                        <h3 className='text-lg font-semibold'>Documents</h3>
                                        {data.documents.map(
                                            (doc: {
                                                id: Key;
                                                title: string;
                                            }) => (
                                                <div key={doc.id} className='flex justify-between items-center p-2 border-b'>
                                                    <h4 className='text-md'>{doc.title}</h4>
                                                    <Button
                                                        color='primary'
                                                        size='sm'
                                                    >
                                                        Detail
                                                    </Button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                    <div>
                                        <h3 className='text-lg font-semibold'>Folders</h3>
                                        {data.folders.map(
                                            (folder: {
                                                id: Key;
                                                name: string;
                                            }) => (
                                                <div key={folder.id} className='flex justify-between items-center p-2 border-b'>
                                                    <h4 className='text-md'>{folder.name}</h4>
                                                    <Button
                                                        color='primary'
                                                        size='sm'
                                                    >
                                                        Detail
                                                    </Button>
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='danger'
                                variant='light'
                                onPress={onClose}
                            >
                                Close
                            </Button>
                        </ModalFooter>
                    </>
                </ModalContent>
            </Modal>
        </>
    );
};

export default GlobalSearch;