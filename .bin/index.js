#!/usr/bin/env node

const { prompt } = require('../lib/prompt.js')
const { logo } = require('../lib/graphics.js')


console.log(logo)
console.log("=============================== [ PROJECT SETUP ] ===============================\n")

const help = () => {
    console.log(" [ HELP ] ")
    console.log("This is a program that allows you to setup projects with some boilerplate files.")

    console.log(" `projectmanager`")
    console.log("flags: ")
    console.log("   --default | -d   ->  run with default configurations")
    console.log("   --help | -h      -> open help ")

    console.log("see https://github.com/JosephCodemard/Project-Manager")
}

if(process.argv[2] !== undefined){
    if(process.argv[2].toLowerCase() === "--help" || process.argv[2].toLowerCase() === "-h"){
        help();
    }
    else if(process.argv[2].toLowerCase() === "--default" || process.argv[2].toLowerCase() === "-d"){
        prompt(true);
    }
    else{
        prompt();
    }
}else{
    prompt();
}