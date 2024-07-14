"use client"

import { FC } from "react";
import {Pagination} from "@nextui-org/react";

const DocumentsPagination: FC = () => {
    return <Pagination showControls total={10} initialPage={1} />
}

export default DocumentsPagination;