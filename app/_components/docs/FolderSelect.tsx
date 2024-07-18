'use client';

import { Select, SelectItem } from '@nextui-org/react';
import { FC } from 'react';

const FolderSelect: FC = () => {
    return (
        <Select
            items={[]}
            label='Favorite Animal'
            placeholder='Select an animal'
            className='max-w-xs'
        >
            <SelectItem key={'Folders'}>SKUSKA</SelectItem>
        </Select>
    );
};

export default FolderSelect;
