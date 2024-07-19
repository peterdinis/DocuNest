'use client';

import { FC } from 'react';
import Header from '../shared/Header';
import { Button } from '@nextui-org/react';

const AIDoc: FC = () => {
    return (
        <>
            <Header text='Ask AI' />
            <div className='ml-5 mt-5'>
                OWEOREOEOEOEOWPQ
                <br />
                <Button className='mt-10' variant='solid' color='success'>
                    Generate
                </Button>
            </div>
        </>
    );
};

export default AIDoc;
