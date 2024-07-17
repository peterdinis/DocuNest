import axios from "axios";

export const fetchAllDocuments = async ({ query = '', page = 1 }) => {
    const response = await axios.get("/api/folders", {
        params: {
            query,
            page
        }
    });
    return response.data;
}