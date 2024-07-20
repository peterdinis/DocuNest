export const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['clean'],
        [{ align: [] }],
        [{ 'color': [] }, { 'background': [] }],
    ],

    history: {
        delay: 2000,
    },

    clipboard: {
        matchVisual: true,
    },
};

export const formats = [
    'header',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
];