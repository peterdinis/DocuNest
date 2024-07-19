'use client';

import { FC } from 'react';
import { Pagination } from '@nextui-org/react';

interface IAppPaginationProps {
    total: number;
    initialPage: number;
    onPageChange: (page: number) => void;
}

const AppPagination: FC<IAppPaginationProps> = ({
    total,
    initialPage,
    onPageChange,
}: IAppPaginationProps) => {
    return (
        <Pagination
            loop
            showControls
            total={total}
            initialPage={initialPage}
            onChange={(page) => onPageChange(page)}
        />
    );
};

export default AppPagination;
