import { Folder } from '@prisma/client';

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