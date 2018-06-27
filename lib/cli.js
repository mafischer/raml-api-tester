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
const opts = argv.optionsFile? fs.existsSync(argv.optionsFile) && argv.optionsFile.indexOf('.json') === argv.optionsFile.length - 5 : false;

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

if(opts){
    options = {
        ...require(path.resolve(argv.optionsFile)),
        ...options
    }
} else {
    console.log("The optionsFile path must point to a valid \".json\" file.");
    console.log(constants.usage.rat);
    process.exit(1);
}

rat = new Rat(path.resolve(file), options);
