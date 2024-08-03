import axios from "axios";

export const handleSubscriptMut = async(priceId: string) => {
    const response = await axios.post("/api/stripe/subscription", priceId);
    return response.data;
}