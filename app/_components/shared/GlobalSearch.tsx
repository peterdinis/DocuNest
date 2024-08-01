"use client";

import { FC, Key, useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from '@nextui-org/react';
import { Search } from 'lucide-react';
import { useSearch } from '@/app/_hooks/shared/useSearch';
import Loading from './Loading';

interface IGlobalSearchProps {
  btnName?: string;
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: FC<IGlobalSearchProps> = ({ btnName, isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, isLoading, refetch } = useSearch(searchQuery);

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    refetch();
  };

  return (
    <Modal backdrop={'blur'} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <>
          <ModalHeader className='flex flex-col gap-1'>
            <Search /> {btnName}
          </ModalHeader>
          <ModalBody>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full p-2 border rounded"
            />
            <Button onPress={handleSearch}>Search</Button>
            {isLoading && <Loading />}
            {error && <div className='font-bold text-red-800 text-xl'>Error: {error.message}</div>}
            {data && (
              <>
                <div>
                  <h3>Documents</h3>
                  {data.documents.map((doc: {id: Key, title: string, description: string}) => (
                    <div key={doc.id}>
                      <h4>{doc.title}</h4>
                      <p>{doc.description}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <h3>Folders</h3>
                  {data.folders.map((folder: {id: Key, name: string}) => (
                    <div key={folder.id}>
                      <h4>{folder.name}</h4>
                    </div>
                  ))}
                </div>
              </>
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
  );
};

export default GlobalSearch;