'use client';

import { useMutation } from "@tanstack/react-query";
import {toast} from "react-toastify";
import { queryClient } from "@/app/_store/queryClient";
import axios from "axios";

const deleteFile = async(fileId: string) => {
    if(!fileId) return;
    return await axios.delete(`/api/files/${fileId}/remove`)
}


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