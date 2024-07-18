import axios from "axios";

export const fetchAllFolders = async ({ query = '', page = 1 }) => {
    const response = await axios.get("/api/folders", {
        params: {
            query,
            page
        }
    });
    return response.data;
}


export const fetchFolderDetail = async(id: number | string) => {
    const response = await axios.get(`/api/folders/${id}`);
    if(!id) return;

    return response.data;
}