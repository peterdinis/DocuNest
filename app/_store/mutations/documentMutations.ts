import axios from 'axios';

export interface ICreateDocumentData {
    title: string;
    description: string;
}

export type UpdateDocumentData = Partial<ICreateDocumentData>;

export const createNewDocument = async (data: ICreateDocumentData) => {
    return await axios.post('/api/docs/new', data);
};

export const updateDocument = async (
    documentId: string,
    data: UpdateDocumentData,
) => {
    const response = await axios.put(`/api/docs/${documentId}`, data);
    return response.data;
};

export const updateDocumentFolder = async (
    documentId: string,
    folderId: string,
) => {
    const response = await axios.put(
        `/api/docs/add-to-folder/${documentId}`,
        folderId,
    );
    return response.data;
};
