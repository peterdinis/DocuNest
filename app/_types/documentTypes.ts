export type DocumentTableType = {
    id: string;
    title: string;
    description: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    userId: string;
};

export type TrashDocument = Partial<DocumentTableType>;

export type AIDocProps = {
    onContentGenerated: (content: string) => void;
}