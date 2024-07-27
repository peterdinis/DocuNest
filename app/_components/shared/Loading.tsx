import { Loader2 } from 'lucide-react';
import { FC } from 'react';

const Loading: FC = () => {
    return <Loader2 className='h-8 w-8 animate-spin dark:text-white' />;
};

export default Loading;
