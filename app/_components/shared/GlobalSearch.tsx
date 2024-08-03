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
    const [page, setPage] = useState(1); // Track the current page
    const limit = 10; // Number of results per page
    const { data, error, isLoading, refetch } = useSearch(
        searchQuery,
        page,
        limit,
    );
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() === '') return;
        setPage(1); // Reset to page 1 when performing a new search
        refetch();
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
        refetch();
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
            refetch();
        }
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
                        <p className='prose-p: prose mt-5 ml-4 p-3 dark:text-white font-bold'>
                            Search for document or folder here, that are not{' '}
                            <span className='prose-p: prose ml-1 font-bold text-red-800'>
                                in trash
                            </span>
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
                                <div className='mt-4 flex flex-col gap-4'>
                                    <div>
                                        <h3 className='text-lg font-semibold'>
                                            Documents
                                        </h3>
                                        {data.documents.map(
                                            (doc: {
                                                id: Key;
                                                title: string;
                                            }) => (
                                                <div
                                                    key={doc.id}
                                                    className='flex items-center justify-between border-b p-2'
                                                >
                                                    <h4 className='text-md'>
                                                        {doc.title}
                                                    </h4>
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
                                        <h3 className='text-lg font-semibold'>
                                            Folders
                                        </h3>
                                        {data.folders.map(
                                            (folder: {
                                                id: Key;
                                                name: string;
                                            }) => (
                                                <div
                                                    key={folder.id}
                                                    className='flex items-center justify-between border-b p-2'
                                                >
                                                    <h4 className='text-md'>
                                                        {folder.name}
                                                    </h4>
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
                                    <div className='mt-4 flex justify-between'>
                                        <Button
                                            disabled={page <= 1}
                                            onClick={handlePreviousPage}
                                        >
                                            Previous
                                        </Button>
                                        <Button onClick={handleNextPage}>
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color='danger'
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
