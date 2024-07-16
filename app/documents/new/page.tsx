import CreateDocumentForm from '@/app/_components/docs/CreateDocumentForm';
import { NextPage } from 'next';
/* TODO: Update later */
const NewDocumentPage: NextPage = () => {
    return <CreateDocumentForm onChange={function (value: string): void {
        throw new Error('Function not implemented.');
    } } value={''} />;
};

export default NewDocumentPage;
