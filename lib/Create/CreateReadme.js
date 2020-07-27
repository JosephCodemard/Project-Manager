const fs = require('fs');

const CreateTitle = (path, projname, version, desc, author, remoterepo, license) => {
    return (`
# ${projname}
> ${version}
> ${desc}
            `);
}

const CreateTableContent = () => {
    return (`
## Table of Contents    
- [Installation](#installation)
- [Features](#features)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)
        `);
}


const CreateInstallation = (path, projname, version, desc, author, remoterepo, license) => {
    return (`
---
### Clone
    
- Clone this repo to your local machine using \`${remoterepo}\`
    
### Setup
    
> Install npm and bower packages
    
\`\`\`shell
$ npm install
$ bower install
\`\`\`
    `);
}

const CreateLicense = (path, projname, version, desc, author, remoterepo, license) => {
    return (`
## License

[![License](http://img.shields.io/:license-${license}-blue.svg?style=flat-square)](http://badges.${license}-license.org)
    
- **[MIT license](http://opensource.org/licenses/${license})**
- Copyright ${new Date().getFullYear().toString()} © ${author}.
`);
}

const CreateContributing = (path, projname, version, desc, author, remoterepo, license) => {
    return (`
## Contributing

> To get started...
    
### Step 1
    
- **Option 1**
    - 🍴 Fork this repo!

- **Option 2**
    - 👯 Clone this repo to your local machine using \`${remoterepo}\`
    
### Step 2
    
    - **Make your changes** 🔨🔨🔨
    
### Step 3
    - 🔃 Create a new pull request using <a href="${remoterepo}/compare/" target="_blank">\`${remoterepo}/compare/\`</a>.
    `);
}

const CreateReadme = (path, projname, version, desc, author, remoterepo, license) => {
    const sections = [CreateTitle, CreateTableContent, CreateInstallation, CreateContributing, CreateLicense]

    if(remoterepo === "None"){
        remoterepo = "https://github.com/username/remote-repo";
    }

    out = "";

    for (let i = 0; i < sections.length; i++) {
        out += sections[i](path, projname, version, desc, author, remoterepo, license);
    }

    if (!fs.existsSync(path + "README.md")){
        fs.writeFile(path + "README.md", out, function (err, data){ });
    }

}

module.exports = { CreateReadme }