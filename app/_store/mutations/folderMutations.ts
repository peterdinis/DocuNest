import axios from "axios";

export interface ICreateFolder {
    name: string;
}

export const createNewFolder = async (data: ICreateFolder) => {
    return await axios.post("/api/folders/new", data);
}