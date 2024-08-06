import axios from "axios";

export const removeFile = async (fileId: string) => {
    return await axios.delete(`/api/files/${fileId}/remove`);
};

export const cleanAllFiles = async() => {
    return await axios.delete("/api/files/clean");
}