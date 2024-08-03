import axios from 'axios';

export const fetchAllPaginatedDocuments = async ({ query = '', page = 1 }) => {
    const response = await axios.get('/api/docs/paginated', {
        params: {
            query,
            page,
        },
    });
    return response.data;
};

export const fetchAllTrashDocuments = async (page: number, limit: number) => {
    const response = await axios.get('/api/docs/trash', {
        params: { page, limit }
    });
    return response.data;
};
export const fetchAllDocuments = async () => {
    const response = await axios.get('/api/docs');
    return response.data;
};

export const fetchDocumentDetail = async (id: number | string) => {
    const response = await axios.get(`/api/docs/${id}`);
    if (!id) return;

    return response.data;
};
