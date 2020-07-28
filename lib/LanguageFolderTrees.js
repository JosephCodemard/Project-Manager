const nodesource = [
    {type: 'folder', path: '/Assets'},
    {type: 'folder', path: '/src'},
    {type: 'folder', path: '/src/data'},
    {type: 'folder', path: '/src/utils'},
    {type: 'file', path: '/src/utils/utils.js'},
    {type: 'file', path: '/src/index.js'}
]

const nodepackage = [
    {type: 'folder', path: '/Assets'},
    {type: 'folder', path: '/.bin'},
    {type: 'file', path: '/.bin/index.js'},
    {type: 'folder', path: '/lib'},
    {type: 'folder', path: '/lib/data'},
    {type: 'folder', path: '/lib/utils'},
    {type: 'file', path: '/lib/utils/utils.js'}
]

const languages = {nodesource, nodepackage}

module.exports = {
    languages
}