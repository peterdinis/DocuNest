import { FC } from 'react';
import { Check } from 'lucide-react';

const HeroPricing: FC = () => {
    return (
        <>
            <div
                id='pricing'
                className='m-auto px-6 py-20 xl:container md:px-12 lg:px-20'
            >
                <div className='m-auto text-center lg:w-7/12'>
                    <h2 className='text-2xl font-bold text-gray-800 dark:text-white md:text-4xl'>
                        Choose the Right Plan for Your Note-Taking Needs
                    </h2>
                </div>
                <div className='mt-12 grid items-center gap-6 md:grid-cols-2 lg:flex lg:space-x-8'>
                    <div className='group relative md:col-span-1 lg:w-[32%]'>
                        <div
                            aria-hidden='true'
                            className='absolute top-0 h-full w-full rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 transition duration-500 group-hover:scale-105 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:group-hover:scale-110'
                        ></div>
                        <div className='relative space-y-8 p-8'>
                            <h3 className='text-center text-3xl font-semibold text-gray-700 dark:text-white'>
                                Free
                            </h3>
                            <div className='relative flex justify-around'>
                                <div className='flex'>
                                    <span className='-ml-2 mt-2 text-3xl font-bold text-primary'>
                                        $
                                    </span>
                                    <span className='leading-0 text-8xl font-bold text-gray-800 dark:text-white'>
                                        0
                                    </span>
                                </div>
                            </div>
                            <ul
                                role='list'
                                className='m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300'
                            >
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Basic note-taking</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Basic AI summarization</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Limited cloud storage</span>
                                </li>
                            </ul>
                            <button className='relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-sky-500 before:bg-sky-50 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-600 dark:before:bg-gray-700'>
                                <span className='relative text-base font-semibold text-sky-600 dark:text-white'>
                                    Get Started
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className='group relative row-start-1 md:col-span-2 lg:w-[36%]'>
                        <div
                            aria-hidden='true'
                            className='absolute top-0 h-full w-full rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 transition duration-500 group-hover:scale-105 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:group-hover:scale-110'
                        ></div>
                        <div className='relative space-y-8 p-8'>
                            <h3 className='text-center text-3xl font-semibold text-gray-700 dark:text-white'>
                                Annual
                            </h3>
                            <div className='overflow-hidden'>
                                <div className='-mr-20 flex items-end justify-center'>
                                    <div className='flex'>
                                        <span className='-ml-6 mt-2 text-3xl font-bold text-primary'>
                                            $
                                        </span>
                                        <span className='leading-0 text-8xl font-bold text-gray-800 dark:text-white'>
                                            15
                                        </span>
                                    </div>
                                    <div className='mb-2'>
                                        <span className='block text-xl font-bold text-gray-500 dark:text-gray-400'>
                                            .56
                                        </span>
                                        <span className='block text-xl font-bold text-primary'>
                                            / Month
                                        </span>
                                    </div>
                                </div>
                                <div className='text-center text-2xl font-medium'>
                                    <span className='text-gray-400 line-through'>
                                        $234
                                    </span>
                                    <span className='font-semibold text-gray-700 dark:text-white'>
                                        $190
                                    </span>
                                </div>
                                <span className='block text-center text-xs uppercase text-primary'>
                                    BILLED YEARLY
                                </span>
                                <span className='m-auto mt-4 block w-max rounded-full bg-gradient-to-r from-yellow-300 to-pink-300 px-4 py-1 text-sm font-medium text-yellow-900'>
                                    1 Discount applied
                                </span>
                            </div>
                            <ul
                                role='list'
                                className='m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300'
                            >
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>All free features</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Advanced AI summarization</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Increased cloud storage</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Priority support</span>
                                </li>
                            </ul>
                            <button className='relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95'>
                                <span className='dark:text-dark relative text-base font-semibold text-white'>
                                    Start plan
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className='group relative md:col-span-1 lg:w-[32%]'>
                        <div
                            aria-hidden='true'
                            className='absolute top-0 h-full w-full rounded-3xl border border-gray-100 bg-white shadow-2xl shadow-gray-600/10 transition duration-500 group-hover:scale-105 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none lg:group-hover:scale-110'
                        ></div>
                        <div className='relative space-y-8 p-8'>
                            <h3 className='text-center text-3xl font-semibold text-gray-700 dark:text-white'>
                                Monthly
                            </h3>
                            <div className='relative flex justify-around'>
                                <div className='flex'>
                                    <span className='-ml-6 mt-2 text-3xl font-bold text-primary'>
                                        $
                                    </span>
                                    <span className='leading-0 text-8xl font-bold text-gray-800 dark:text-white'>
                                        19
                                    </span>
                                </div>
                                <span className='absolute bottom-2 right-9 text-xl font-bold text-primary'>
                                    / Month
                                </span>
                            </div>
                            <ul
                                role='list'
                                className='m-auto w-max space-y-4 pb-6 text-gray-600 dark:text-gray-300'
                            >
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>All free features</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Advanced AI summarization</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Increased cloud storage</span>
                                </li>
                                <li className='flex items-center space-x-2'>
                                    <Check className='h-4 w-4 text-primary' />
                                    <span>Priority support</span>
                                </li>
                            </ul>
                            <button className='relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95'>
                                <span className='dark:text-dark relative text-base font-semibold text-white'>
                                    Start plan
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroPricing;
