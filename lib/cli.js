#! /usr/bin/env node
const path = require('path');
const fs = require('fs');
const argv = require('yargs').argv;
const Rat = require('./index');
const constants = require('./constants');

if(process.argv.indexOf('-h') >= 0){
    console.log(constants.usage.rat);
    process.exit(0);
}

let command = path.basename(process.argv[1]);
const file = argv.raml;
const opts = argv.optionsFile;

if(opts && !path.isAbsolute(opts)){
    console.log("optionsFile must be an absolute path");
    console.log(constants.usage.rat);
    process.exit(1);
} else if(opts && opts.indexOf('.json') < 0){
    console.log("optionsFile must use the \".json\" extension");
    console.log(constants.usage.rat);
    process.exit(1);
}

if(argv.debug){
    command = argv.debug;
    console.log("We are in debug mode");
}

if(file === undefined || file === null){
    console.log("The raml param is required!");
    console.log(constants.usage[command]);
    process.exit(1);
}

let options = {cli: true, baseUri: argv.baseURI};

if(opts  && path.isAbsolute(opts) && fs.existsSync(opts)){
    options = {
        ...require(path.resolve(opts)),
        ...options
    }
}

rat = new Rat(path.resolve(file), options);
