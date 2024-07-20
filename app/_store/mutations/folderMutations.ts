import axios from 'axios';

export interface ICreateFolder {
    name: string;
}

export type UpdateFolderData = Partial<ICreateFolder>;

export const createNewFolder = async (data: ICreateFolder) => {
    return await axios.post('/api/folders/new', data);
};

export const updateFolder = async (
    folderId: string,
    data: UpdateFolderData,
) => {
    return await axios.put(`/api/folders/${folderId}`, data);
};
