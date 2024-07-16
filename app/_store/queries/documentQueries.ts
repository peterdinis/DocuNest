import axios from "axios"

export const fetchAllDocuments = async () => {
    return await axios.get("/api/docs");
}