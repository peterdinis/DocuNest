'use client';

import { useMutation } from "@tanstack/react-query";
import {toast} from "react-toastify";
import { queryClient } from "@/app/_store/queryClient";
import { deleteFile } from "@/app/_store/mutations/fileMutations";

export const useDeleleteFile = (fileId: string) =>{
    return useMutation({
        mutationKey: ["deleteFile", fileId],
        mutationFn: () => deleteFile(fileId),
        onSuccess: () => {
            toast.success("File was deleted"),
            queryClient.invalidateQueries({
                queryKey: ["myPaginatedFiles"]
            })
        },
        onError: () =>{
            toast.error("File was not deleted");
        }  
    })
}