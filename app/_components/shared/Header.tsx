import { FC } from 'react';

interface IHeaderProps {
    text: string;
}

const Header: FC<IHeaderProps> = ({ text }: IHeaderProps) => {
    return (
        <h1 className='ml-3 mt-5 text-4xl font-bold dark:text-white'>{text}</h1>
    );
};

export default Header;
