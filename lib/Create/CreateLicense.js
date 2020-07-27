const https = require('https');
const fs = require('fs');


const URL = "https://api.github.com"
const licenses = {
    "mit": "/licenses/mit",
    "lgpl-3.0": "/licenses/lgpl-3.0",
    "mpl-2.0":"/licenses/mpl-2.0",
    "agpl-3.0":"/licenses/agpl-3.0",
    "unlicense":"/licenses/unlicense",
    "apache-2.0":"/licenses/apache-2.0",
    "gpl-3.0":"/licenses/gpl-3.0"
}

const CreateFile = (filename, path, license) => {
    if (!fs.existsSync(path + filename)){
        fs.writeFile(path + filename, license , function (err, data){ });
    }
}

const CreateLicense = (licensename, path="./", fullname="[FULLNAME]") => {
    if(licenses[licensename] !== undefined){

        https.get("https://api.github.com" + licenses[licensename],{headers: {'user-agent': 'node.js'}}, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            var licenseText = (JSON.parse(data).body).toString();
            licenseText = licenseText.replace("[year]",  new Date().getFullYear().toString());
            licenseText = licenseText.replace("[fullname]", fullname)

            CreateFile("license", path, licenseText);

        });
        }).on("error", (err) => {
            console.log("[ERROR] " + err.message);
        });
    }
}
module.exports = { CreateLicense }