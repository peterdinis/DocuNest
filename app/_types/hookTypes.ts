export type CopiedValue = string | null;

export type CopyFn = (text: string) => Promise<boolean>;

export interface UseCreateFolderOptions {
    reset: () => void;
    onClose: () => void;
}

export interface UseDocumentDetailOptions {
    id: string;
    isEditMode: boolean;
}

export interface UseFolderDetailOptions {
    id: string;
    isEditMode: boolean;
}

export interface UsePaginatedDocumentsOptions {
    query: string;
    page: number;
}