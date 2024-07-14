import { FC } from "react";

interface IHeaderProps {
    text: string;
}

const Header: FC<IHeaderProps> = ({text}: IHeaderProps) => {
    return (
        <h1 className="flex justify-center align-top mt-5 text-4xl font-bold">
            {text}
        </h1>
    )
}

export default Header;