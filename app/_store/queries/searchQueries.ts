import axios from "axios";

export const fetchSearchResults = async (query: string, page: number, limit: number) => {
    const response = await axios.get(`/api/search?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`);
    return response.data;
};
