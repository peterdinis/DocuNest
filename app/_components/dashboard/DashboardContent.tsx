import { Plus } from 'lucide-react';
import { FC } from 'react';

const DashboardContent: FC = () => {
    return (
        <main className='main -ml-48 flex flex-grow flex-col p-4 transition-all duration-150 ease-in md:ml-0'>
            <div className='flex h-full items-center justify-center bg-white text-center text-5xl font-bold shadow-md'>
                <Plus size={70} /> Add new Document
            </div>
        </main>
    );
};

export default DashboardContent;
