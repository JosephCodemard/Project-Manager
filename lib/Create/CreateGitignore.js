const https = require('https');
const fs = require('fs');


const CreateFile = (filename, path, content) => {
    if (!fs.existsSync(path + filename)){
        fs.writeFile(path + filename, content , function (err, data){ });
    }
}

// Download Gitignore command
const DownloadGitignore = (language, dir="./") => {
    
    if(language.split(" ")[0] == "node"){
        language = "node"
    }

    language = language.charAt(0).toUpperCase() + language.slice(1);

    https.get('https://raw.githubusercontent.com/github/gitignore/master/' + language + '.gitignore', (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            CreateFile(".gitignore", dir, data);
        });
        }).on("error", (err) => {
            console.log("[ERROR] " + err.message);
    });
}

module.exports = { DownloadGitignore }