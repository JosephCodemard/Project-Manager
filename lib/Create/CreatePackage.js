const fs = require('fs');

const CreatePackage = ( packagejsonobj, path="./") => {

    const pkgstr = JSON.stringify(packagejsonobj, null, "\t");
  
    if (!fs.existsSync(path + "package.json")){
        fs.writeFile(path +"package.json", pkgstr, function (err, data){ });
    }     
}


const GeneratePackage = (projname, version, desc, keywords, author, license, remoterepo) => {

    var r = {}
    if(remoterepo !== "None"){
        r = {
            type: "git",
            url: remoterepo
        }
    }

    return {
        name: projname,
        version: version,
        description: desc,
        main: "index.js",
        scripts: {
          "test": "echo \"Error: no test specified\" && exit 1",
          "start": "node ./src/index.js"
        },
        keywords: keywords,
        author: author,
        license: license,
        dependencies: {},
        repository: r,
    }
}
module.exports = { CreatePackage, GeneratePackage }