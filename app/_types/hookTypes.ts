export type CopiedValue = string | null;

export type CopyFn = (text: string) => Promise<boolean>;

export interface UseCreateFolderOptions {
    reset: () => void;
    onClose: () => void;
}

export interface DetailOptions {
    id: string;
    isEditMode: boolean;
}

export interface IPagination {
    query: string;
    page: number;
}

export type UserDetailProps = Pick<DetailOptions, 'id'>;

export interface UseUpdateFolderOptions {
    id: string;
    setIsEditMode: (isEditMode: boolean) => void;
    setName: (name: string) => void;
}