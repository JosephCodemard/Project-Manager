const inquirer = require('inquirer')
const lodash = require('lodash')
const fs = require('fs');


const { DownloadGitignore } = require('./Create/CreateGitignore.js')
const { CreateLicense } = require('./Create/CreateLicense.js')
const { CreatePackage, GeneratePackage } = require('./Create/CreatePackage.js')
const { ConstructFolderTree } = require('./Create/CreateFolderTree.js')
const { GitInit } = require('./GitInit.js')
const { CreateReadme } = require('./Create/CreateReadme.js')

const licenses = [
    "mit",
    "lgpl-3.0",
    "mpl-2.0",
    "agpl-3.0",
    "unlicense",
    "apache-2.0",
    "gpl-3.0",
    "None"
]

const searchitems = (ans, input, array) => {
    input = input || '';
    return new Promise(function(resolve) {
        setTimeout(function() {
        res = array.filter(_ => _.toLowerCase().includes(input.toLowerCase()));
        resolve(
            res.map(function(el) {
                return el;
            })
        );
        }, lodash.random(30, 500));
    });
}

const searchlicenses = (ans, input) => {
    return searchitems(ans, input, licenses)
}


const prompt = (_default=false) => {


    if(!_default){
        inquirer.registerPrompt('autocomplete', require('inquirer-autocomplete-prompt'));
        inquirer
        .prompt([
            // info
            { type: 'input', name: 'projectname', message: 'Project Name', default: "project"},
            { type: 'list', name: 'languagename', message: 'Language Name', choices:["node"], default: "node"},
            { type: 'input', name: 'projectpath', message: 'Project Path', default: "./"},
            { type: 'input', name: 'name', message: 'Author'},

            // actions
            { type: 'confirm', name: 'initgit', message: 'Initalise Git', default: true},
            { type: 'confirm', name: 'gitignore', message: 'Create .gitignore', default: true},
            { type: 'confirm', name: 'initnpm', message: 'Initalise npm', default: true},
            { type: 'confirm', name: 'foldertree', message: 'Create Project Directory', default: true},
            { type: 'autocomplete', name: 'license', suggestOnly: true, message: 'Choose a license', source: searchlicenses, default: "None", pageSize: 8, validate: function(val) { return val ? true : 'Type something!'; }},
            { type: 'confirm', name: 'readme', message: 'Create README.md', default: true},

            //package.json
            { type: 'input', name: 'version', message: 'Version', default: "1.0.0"},
            { type: 'input', name: 'desc', message: 'Description', default: "A short description about the project"},
            { type: 'input', name: 'keywords', message: 'Keywords'},
            { type: 'input', name: 'remoterepo', message: 'Remote Repository', default: "None"},
        ])
        .then(answers => {

            const projectName = answers.projectname;
            const languageName = answers.languagename;

            const path = answers.projectpath + "/";
            const fullpath = path + projectName + "/";

            const fullname = answers.name;

            if (!fs.existsSync(path)){
                fs.mkdir(path, function (err, data){ });
            }

            if(answers['foldertree'] === true){ ConstructFolderTree( projectName, languageName, path) }

            if(answers['initgit'] === true){ GitInit(fullpath) }

            if(answers['gitignore'] === true){ DownloadGitignore(languageName, fullpath) }

            if(answers['license'] !== "None"){ CreateLicense(answers['license'], fullpath, fullname); }


            if(answers['readme'] === true){ 
                CreateReadme(fullpath, projectName, answers.version, answers.desc, answers.name, answers.remoterepo, answers.license);
            }

            if(answers['initnpm'] === true){ 
                const pkg = GeneratePackage(projectName, answers.version, answers.desc, answers.keywords.split(","), answers.name, answers.license)
                CreatePackage(pkg, fullpath) 
            }

        })
        .catch(error => {
            console.log("[ERROR] ", error)
        });
    }else{
        console.log(" [ choosing default options ] ")

        const projectName = "project";
        const languageName = "node";
        const path = "./";
        const fullpath = path + projectName + "/";
        const fullname = "";
        const license = "mit"
        const version = "1.0.0"
        const desc = "A sample description"

        if (!fs.existsSync(path)){
            fs.mkdir(path, function (err, data){ });
        }

        ConstructFolderTree( projectName, languageName, path)
        GitInit(fullpath) 
        DownloadGitignore(languageName, fullpath) 
        CreateLicense(license, fullpath, fullname); 
        CreateReadme(fullpath, projectName, version, desc, fullname, "None", license);
        CreatePackage(GeneratePackage(projectName, version, desc, [], fullname, license), fullpath) 
    }
}

module.exports = {
    prompt
}