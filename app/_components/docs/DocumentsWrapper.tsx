import { FC } from "react";
import Header from "../shared/Header";

const DocumentsWrapper: FC = () => {
    return (
        <div className="flex justify-center align-top">
            <Header text="My Documents" />
        </div>
    )
}

export default DocumentsWrapper;