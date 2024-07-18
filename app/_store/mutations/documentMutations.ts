import axios from "axios";

export interface ICreateDocumentData {
    title: string;
    description: string;
}

export const createNewDocument = async (data: ICreateDocumentData) => {
    return await axios.post("/api/docs/new", data);
}