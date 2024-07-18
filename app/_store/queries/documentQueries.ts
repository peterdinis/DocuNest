import axios from "axios";

export const fetchAllDocuments = async ({ query = '', page = 1 }) => {
    const response = await axios.get("/api/docs", {
        params: {
            query,
            page
        }
    });
    return response.data;
}

export const fetchDocumentDetail = async(id: number | string) => {
    const response = await axios.get(`/api/docs/${id}`);
    if(!id) return;

    return response.data;
}