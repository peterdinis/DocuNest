import { FC } from 'react';
import { Edit3, FolderOpen, Upload } from 'lucide-react';
import ServiceCard from './ServiceCard';

const HeroServices: FC = () => {
    return (
        <div id='services' className='py-16'>
            <div className='m-auto space-y-16 px-6 text-gray-500 xl:container md:px-12'>
                <div>
                    <h2 className='mt-4 text-2xl font-bold text-gray-800 dark:text-white md:text-4xl'>
                        Enhance Your Note-Taking Experience{' '}
                        <br className='sm:block' hidden />
                        with AI-Powered Tools
                    </h2>
                </div>
                <div className='mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    <ServiceCard
                        icon={<Edit3 />}
                        iconHeaderText={'Intelligent Summarization'}
                        iconHeaderDesc={
                            'Automatically generate concise summaries of your notes using advanced AI algorithms.'
                        }
                    />
                    <ServiceCard
                        icon={<FolderOpen />}
                        iconHeaderText='Smart Organization'
                        iconHeaderDesc='Organize your notes intelligently based on context and relevance using AI categorization'
                    />
                    <ServiceCard
                        icon={<Upload />}
                        iconHeaderText='Upload custom documents'
                        iconHeaderDesc='Seamlessly upload and integrate your documents for enhanced accessibility and analysis.'
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroServices;
