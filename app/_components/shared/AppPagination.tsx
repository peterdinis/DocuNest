'use client';

import { FC } from 'react';
import { Pagination } from '@nextui-org/react';

interface IAppPaginationProps {
    total: number;
    initialPage: number;
}

const AppPagination: FC<IAppPaginationProps> = ({
    total,
    initialPage,
}: IAppPaginationProps) => {
    return (
        <Pagination
            showShadow
            loop
            showControls
            total={total}
            initialPage={initialPage}
        />
    );
};

export default AppPagination;
