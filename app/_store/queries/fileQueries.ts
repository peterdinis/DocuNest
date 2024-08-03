import axios from 'axios';

export const fetchAllPaginatedFiles = async ({ query = '', page = 1 }) => {
    const response = await axios.get('/api/files/paginated', {
        params: {
            query,
            page,
        },
    });
    return response.data;
};