'use client';

import dynamic from 'next/dynamic';
import { FC, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import MagicUrl from 'quill-magic-url';
import QuillCursors from 'quill-cursors';
import 'react-quill/dist/quill.snow.css';
import 'quill-paste-smart';
import Loading from '../../shared/Loading';
import { modules, formats } from './quill-config';

Quill.register('modules/magicUrl', MagicUrl);
Quill.register('modules/cursors', QuillCursors);

interface QuillEditorProps {
    value: string;
    readOnly: boolean;
    onChange: (content: string) => void;
}

const QuillEditor: FC<QuillEditorProps> = ({ value, readOnly, onChange}) => {
    const ReactQuill = useMemo(
        () =>
            dynamic(() => import('react-quill'), {
                ssr: false,
                loading: () => <Loading />,
            }),
        [],
    );

    return (
        <ReactQuill

            theme='snow'
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
