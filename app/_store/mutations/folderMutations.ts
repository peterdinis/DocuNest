import axios from 'axios';

export interface ICreateFolder {
    id?: string;
    name: string;
}

export type UpdateFolderData = Partial<ICreateFolder>;

export interface IMoveToTrash {
    documentId?: string;
    inTrash: boolean;
}

export const createNewFolder = async (data: ICreateFolder) => {
    return await axios.post('/api/folders/new', data);
};

export const updateFolder = async (
    folderId: string,
    data: UpdateFolderData,
) => {
    return await axios.put(`/api/folders/${folderId}`, data);
};

export const moveToTrashFolder = async (
    folderId: string,
    data: IMoveToTrash,
) => {
    return await axios.put(`/api/folders/${folderId}/trash`, data);
};

export const removeFromTrashFolder = async (
    folderId: string,
    data: IMoveToTrash,
) => {
    return await axios.put(`/api/folders/${folderId}/trash/remove`, data);
};
