import { FC } from "react";
import Sidebar from "../shared/Sidebar";
import DashboardContent from "./DashboardContent";

const DashboardWrapper: FC = () => {
    return (
        <>
            <Sidebar />
            <DashboardContent />
        </>
    )
}

export default DashboardWrapper;