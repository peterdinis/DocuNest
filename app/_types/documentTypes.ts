import { ReactNode } from "react";

export type DocumentTableType = {
    id: string;
    title: string;
    description: string;
    createAt: ReactNode;
    updateAt: ReactNode;
    userId: string;
}