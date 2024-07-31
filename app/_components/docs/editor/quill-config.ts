export const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        ['clean'],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
    ],

    history: {
        delay: 2000,
    },

    magicUrl: {
        // Regex used to check URLs during typing
        urlRegularExpression: /(https?:\/\/[\S]+)|(www.[\S]+)|(tel:[\S]+)/g,
        // Regex used to check URLs on paste
        globalRegularExpression: /(https?:\/\/|www\.|tel:)[\S]+/g,
      },

    clipboard: {
        matchVisual: true,
        allowed: {
            tags: ['a', 'b', 'strong', 'u', 's', 'i', 'p', 'br', 'ul', 'ol', 'li', 'span'],
            attributes: ['href', 'rel', 'target', 'class']
        },
        customButtons: [
            {
                module: 'quillEmbeds',
                allowedTags: ['embed'],
                allowedAttr: ['width', 'height'],
            }
        ],
        keepSelection: true,
        substituteBlockElements: true,
        magicPasteLinks: true,
        removeConsecutiveSubstitutionTags: true,
        cursors: true,
        table: true,
        tableUI: true,
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
    'video',
    'background',
];
