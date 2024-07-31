import { Folder } from '@prisma/client';
import { ReactNode } from 'react';

export interface IGlobalErrorProps {
    statusCode: string;
    message: string;
    linkHref: string;
    linkText: string;
}

export interface DisplayFolder extends Folder {}

export interface IAppPaginationProps {
    total: number;
    initialPage: number;
    onPageChange: (page: number) => void;
}

export interface IServiceCardProps {
    icon: ReactNode;
    iconHeaderText: string;
    iconHeaderDesc: string;
}
