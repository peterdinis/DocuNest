import { FC } from "react";
import Sidebar from "../shared/Sidebar";
import SettingsContent from "./SettingsContent";

const SettingsWrapper: FC = () => {
    return (
        <div className='dark:bg-dark dark:text-light flex bg-gray-100 dark:bg-background text-gray-900'>
            <Sidebar />
            <SettingsContent />
        </div>
    )
}

export default SettingsWrapper;