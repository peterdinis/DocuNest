'use client';

import { useMutation } from "@tanstack/react-query";
import {toast} from "react-toastify";
import { queryClient } from "@/app/_store/queryClient";
import { removeFile } from "@/app/_store/mutations/fileMutations";

export const useDeleleteFile = (fileId: string) =>{
    return useMutation({
        mutationKey: ["deleteFile", fileId],
        mutationFn: () => removeFile(fileId),
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