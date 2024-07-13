import { FC } from 'react';

const HeroWrapper: FC = () => {
    return (
        <div className='relative pb-20 pt-40 lg:pt-44'>
            <div className='relative m-auto px-6 xl:container md:px-12 lg:px-6'>
                <h1 className='text-center text-4xl font-black text-blue-900 dark:text-white sm:mx-auto sm:w-10/12 sm:text-5xl md:w-2/3 md:text-6xl lg:w-auto lg:text-left xl:text-7xl'>
                    Run successful remote and <br className='hidden lg:block' />{' '}
                    <span className='dark:from-primaryLight dark:to-secondaryLight relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'>
                        Hybrid teams
                    </span>
                    .
                </h1>
                <div className='lg:flex'>
                    <div className='relative mt-8 space-y-8 text-center sm:mx-auto sm:w-10/12 md:mt-16 md:w-2/3 lg:ml-0 lg:mr-auto lg:w-7/12 lg:text-left'>
                        <p className='text-gray-700 dark:text-gray-300 sm:text-lg lg:w-11/12'>
                            DailyBot takes chat and collaboration to the next
                            level: daily standups, team check-ins, surveys,
                            kudos, best companion bot for your virtual
                            watercooler, 1:1 intros, motivation tracking and
                            more.
                        </p>
                        <span className='block font-semibold text-gray-500 dark:text-gray-400'>
                            The best companion bot for your chat app.
                        </span>
                        <div className='grid grid-cols-3 space-x-4 md:flex md:justify-center md:space-x-6 lg:justify-start'>
                            <a
                                aria-label='add to slack'
                                href='#'
                                className='rounded-full border border-gray-200 p-4 duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-600/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-cyan-300/30'
                            >
                                <div className='flex justify-center space-x-4'>
                                    <img
                                        className='h-6 w-6'
                                        src='images/slack.png'
                                        alt='slack logo'
                                        loading='lazy'
                                        width='128'
                                        height='128'
                                    />
                                    <span className='hidden font-medium dark:text-white md:block'>
                                        Slack
                                    </span>
                                </div>
                            </a>
                            <a
                                aria-label='add to chat'
                                href='#'
                                className='rounded-full border border-gray-200 p-4 duration-300 hover:border-green-400 hover:shadow-lg hover:shadow-lime-600/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-300/30'
                            >
                                <div className='flex justify-center space-x-4'>
                                    <img
                                        className='h-6 w-6'
                                        src='images/chat.png'
                                        alt='chat logo'
                                        loading='lazy'
                                        width='128'
                                        height='128'
                                    />
                                    <span className='hidden font-medium dark:text-white md:block'>
                                        Google Chat
                                    </span>
                                </div>
                            </a>
                            <a
                                aria-label='add to zoom'
                                href='#'
                                className='rounded-full border border-gray-200 p-4 duration-300 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-600/20 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-300/30'
                            >
                                <div className='flex justify-center space-x-4'>
                                    <img
                                        className='h-6 w-6'
                                        src='images/zoom.png'
                                        alt='chat logo'
                                        loading='lazy'
                                        width='128'
                                        height='128'
                                    />
                                    <span className='hidden font-medium dark:text-white md:block'>
                                        Zoom
                                    </span>
                                </div>
                            </a>
                        </div>

                        <div className='dark:text-gray-300'>
                            🔥🌟
                            <span>Other integrations :</span>
                            <a
                                href='#'
                                className='font-semibold text-gray-700 dark:text-gray-200'
                            >
                                Discord,
                            </a>
                            <a
                                href='#'
                                className='font-semibold text-gray-700 dark:text-gray-200'
                            >
                                Telegram
                            </a>
                        </div>

                        <div className='flex justify-between gap-6 pt-12 grayscale lg:w-2/3 lg:gap-12'>
                            <img
                                src='./images/clients/airbnb.svg'
                                className='h-8 w-auto sm:h-10 lg:h-12'
                                alt=''
                            />
                            <img
                                src='./images/clients/ge.svg'
                                className='h-8 w-auto sm:h-10 lg:h-12'
                                alt=''
                            />
                            <img
                                src='./images/clients/coty.svg'
                                className='h-8 w-auto sm:h-10 lg:h-12'
                                alt=''
                            />
                            <img
                                src='./images/clients/microsoft.svg'
                                className='h-8 w-auto sm:h-10 lg:h-12'
                                alt=''
                            />
                        </div>
                    </div>
                    <div className='-right-10 mt-12 md:mt-0 lg:absolute lg:w-7/12'>
                        <div className='relative w-full'>
                            <div
                                aria-hidden='true'
                                className='from-primaryLight to-secondaryLight absolute inset-0 m-auto h-full w-full rotate-45 scale-75 rounded-full bg-gradient-to-r blur-3xl md:h-96 md:w-96 md:scale-110'
                            ></div>
                            <img
                                src='images/globalization-cuate.svg'
                                className='relative w-full'
                                alt='wath illustration'
                                loading='lazy'
                                width='320'
                                height='280'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroWrapper;
