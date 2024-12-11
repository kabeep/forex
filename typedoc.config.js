module.exports = {
    $schema: 'https://typedoc.org/schema.json',
    entryPoints: ['./src/index.ts'],
    sort: ['source-order'],
    projectDocuments: ['./README.*.md', 'LICENSE'],
    navigationLinks: {
        Docs: 'https://kabeep.github.io/zodiac-animals/',
        GitHub: 'https://github.com/kabeep/zodiac-animals',
        NPM: 'https://www.npmjs.com/package/@kabeep/zodiac-animals',
    },
    plugin: [
        'typedoc-material-theme',
        'typedoc-plugin-mdn-links',
        'typedoc-plugin-missing-exports',
        'typedoc-plugin-include-example',
        'typedoc-plugin-inline-sources',
        'typedoc-plugin-replace-text',
        'typedoc-plugin-rename-documents',
        'typedoc-plugin-version-header',
    ],
    themeColor: '#a2cf6e',
    renameDocuments: {
        './README.zh-CN.md': '简体中文',
    },
    replaceText: {
        inCodeCommentText: false,
        inCodeCommentTags: false,
        inMarkdown: true,
        replacements: [
            {
                pattern: 'README.md',
                replace: () => {
                    return '../index.html';
                },
            },
            {
                pattern: 'README.zh-CN.md',
                replace: () => {
                    return 'documents/____.html';
                },
            },
        ],
    },
};
