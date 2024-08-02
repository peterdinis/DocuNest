import axios from 'axios';
import { IMoveToTrash } from './folderMutations';

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
    const response = await axios.put(`/api/docs/add-to-folder/${documentId}`, {
        folderId,
    });
    return response.data;
};

export const moveDocumentToTrash = async (
    data: IMoveToTrash,
) => {
    return await axios.put(`/api/docs/${data.documentId}/trash`, data);
};

export const removeDocumentFromTrash = async (
    documentId: string,
    data: IMoveToTrash,
) => {
    return await axios.put(`/api/docs/${documentId}/trash/remove`, data);
};
