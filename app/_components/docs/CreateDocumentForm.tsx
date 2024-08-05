'use client';

import dynamic from 'next/dynamic';
import { FC, ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-quill/dist/quill.snow.css';
import CustomDrawer from '../shared/Drawer';
import { Button } from '@nextui-org/react';
import AIDoc from './AIDoc';
import { useForm } from 'react-hook-form';
import useCreateDocument from '@/app/_hooks/documents/useCreateDocument';
import QuillEditor from './editor/QuillEditor';

const CreateDocumentForm: FC = () => {
    const [description, setDescription] = useState('');
    const [drawerInputText, setDrawerInputText] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty },
        reset,
        setValue,
        watch,
    } = useForm();

    const { mutate: createDocumentMut, isPending } = useCreateDocument();

    const handleDescriptionChange = (content: string) => {
        setDescription(content);
        setValue('description', content, { shouldDirty: true });
    };

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setIsDrawerOpen(true);
    };

    const handleContentGenerated = (content: string) => {
        setDrawerInputText(content);
    };

    const router = useRouter();

    const onSubmit = (formData: any) => {
        formData.description = description;
        createDocumentMut(formData);
        reset();
        router.push('/dashboard');
    };

    useEffect(() => {
        if (drawerInputText) {
            setDescription(prevDescription => `${prevDescription}\n${drawerInputText}`);
            setValue('description', `${description ?? ''}\n${drawerInputText}`, { shouldDirty: true });
            setDrawerInputText('');  // Clear the drawer input text after updating
        }
    }, [drawerInputText, setValue, description]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const title = watch('title');
            const description = watch('description');
            if (isDirty || description || title) {
                event.preventDefault();
                event.returnValue = ''; // Show confirmation dialog
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [isDirty, description, watch]);

    const handleGoBack = () => {
        const title = watch('title');
        const description = watch('description');
        if ((!isDirty && description) || !title) {
            router.push('/dashboard');
        } else if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
            router.push('/dashboard');
        }
    };

    return (
        <div>
            <h2 className='mt-5 flex justify-center align-top text-4xl'>
                New document
            </h2>

            <div className='mt-5 flex justify-center'>
                <Button
                    variant='flat'
                    color='secondary'
                    onClick={handleDrawerOpen}
                >
                    Use AI
                </Button>
                <Button
                    variant='flat'
                    color='primary'
                    className='ml-5'
                    onClick={handleGoBack}
                >
                    Go back
                </Button>
            </div>

            <CustomDrawer
                isOpen={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                inputText={drawerInputText}
                onInputChange={setDrawerInputText}
            >
                <AIDoc onContentGenerated={handleContentGenerated} />
            </CustomDrawer>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-5 flex flex-col items-center'
            >
                <input
                    type='text'
                    {...register('title', { required: 'Title is required' })}
                    placeholder='Title'
                    className='mb-2 border border-gray-300 p-2'
                />
                {errors.title && (
                    <span className='text-red-500'>
                        {errors.title.message as unknown as ReactNode}
                    </span>
                )}
                <Button
                    type='submit'
                    variant='flat'
                    color='success'
                    className='mt-6'
                    disabled={isPending}
                >
                    {isPending ? 'Creating...' : 'Create Document'}
                </Button>
                <QuillEditor
                    value={description}
                    readOnly={false}
                    onChange={handleDescriptionChange}
                />
                {errors.description && (
                    <span className='text-red-500'>
                        {errors.description.message as unknown as ReactNode}
                    </span>
                )}
            </form>
        </div>
    );
};

export default CreateDocumentForm;