const { exec } = require("child_process");

// Git init command
const GitInit = (dir='./') => {
    exec('git init', {
        cwd: dir
    });
}

module.exports = { GitInit }
