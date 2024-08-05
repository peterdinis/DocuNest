import axios from "axios";

export const removeFile = async (fileId: string) => {
    return await axios.delete(`/api/files/${fileId}/remove`);
};