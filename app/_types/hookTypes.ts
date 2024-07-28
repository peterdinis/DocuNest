export type CopiedValue = string | null;

export type CopyFn = (text: string) => Promise<boolean>;

export interface UseCreateFolderOptions {
    reset: () => void;
    onClose: () => void;
}