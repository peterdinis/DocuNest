import {FC, ReactNode} from "react";
import {NextUIProvider} from "@nextui-org/react";

interface INextUiProviderProps {
    children?: ReactNode;
}

const NextUiProvider: FC<INextUiProviderProps> = ({children}: INextUiProviderProps) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}

export default NextUiProvider;