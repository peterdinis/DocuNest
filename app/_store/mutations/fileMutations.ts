import axios from "axios";

export const deleteFile = async(fileId: string) => {
    if(!fileId) return;
    return await axios.delete(`/api/files/${fileId}`)
}
