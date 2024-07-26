import axios from 'axios';

export const fetchUserDetail = async (id: number | string) => {
    const response = await axios.get(`/api/users/${id}`);
    if (!id) return;

    return response.data;
};
