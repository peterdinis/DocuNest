'use client';

import { FC } from 'react';
import { Pagination } from '@nextui-org/react';
import { IAppPaginationProps } from '@/app/_types/globalTypes';

const AppPagination: FC<IAppPaginationProps> = ({
    total,
    initialPage,
    onPageChange,
}: IAppPaginationProps) => {
    return (
        <Pagination
            loop
            showControls
            isCompact
            total={total}
            initialPage={initialPage}
            onChange={(page) => onPageChange(page)}
        />
    );
};

export default AppPagination;
