import dynamic from 'next/dynamic';
import { FC, useMemo } from 'react';
import { Quill } from 'react-quill';
import MagicUrl from 'quill-magic-url';
import 'react-quill/dist/quill.snow.css';
import 'quill-paste-smart';
import Loading from '../../shared/Loading';
import { modules, formats } from './quill-config';

// Register MagicUrl module with Quill
Quill.register('modules/magicUrl', MagicUrl);

const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { ssr: false, loading: () => <Loading /> }), []);

interface QuillEditorProps {
    value: string;
    readOnly: boolean;
    onChange: (content: string) => void;
}

const QuillEditor: FC<QuillEditorProps> = ({ value, readOnly, onChange }) => {
    return (
        <ReactQuill
            theme="snow"
            className={`mb-6 mt-10 h-[100vh] whitespace-pre-wrap ${readOnly ? 'ql-disabled' : ''}`}
            modules={modules}
            formats={formats}
            value={value}
            readOnly={readOnly}
            onChange={onChange}
        />
    );
};

export default QuillEditor;