import axios from "axios";

export const fetchSearchResults = async (query: string) => {
    const response = await axios.get(
        `/api/search?query=${encodeURIComponent(query)}`,
    );
    return response.data;
};
