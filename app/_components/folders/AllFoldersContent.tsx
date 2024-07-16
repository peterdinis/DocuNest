import { FC } from "react";
import Sidebar from "../shared/Sidebar";
import AllFoldersWrapper from "./AllFoldersWrapper";

const AllFoldersContent: FC = () => {
    return (
        <div className='dark:bg-dark dark:text-light flex bg-gray-100 text-gray-900'>
        <Sidebar />
        <AllFoldersWrapper />
    </div>
    )
}

export default AllFoldersContent;