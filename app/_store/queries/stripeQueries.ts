import axios from 'axios';

export const fetchAllPricingPlans = async () => {
    const response = await axios.get('/api/stripe/pricing');
    return response.data;
};
