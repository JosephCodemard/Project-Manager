const fs = require('fs');
const { languages } = require('../LanguageFolderTrees.js')

const ConstructFolderTree = (projectname, language, path="./", excludes=[]) => {

    const dirs = languages[language]

    if (!fs.existsSync(projectname)){
        fs.mkdirSync(path + projectname);
    }

    if(dirs !== undefined){

        for (let i = 0; i < dirs.length; i++) {

            var _break = false;

            for (let k = 0; k < excludes.length; k++) {
                if(excludes[k] === dirs[i].path){
                    _break = true;
                    break;
                }
            }

            if (!fs.existsSync(dirs[i].path) && !_break){
                if(dirs[i].type === "folder"){ fs.mkdirSync(path + projectname + dirs[i].path); }
                else if(dirs[i].type === "file"){ fs.writeFile(path + projectname + dirs[i].path, "", function (err, data){ }); }
            }                                       
        }
    }
}


module.exports = { ConstructFolderTree }