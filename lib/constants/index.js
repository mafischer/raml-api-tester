'use strict';
module.exports = {
    usage: {
        rat:
        "NAME:              rat\n" +
        "SYNOPSIS:          Rat [--baseURI https://example.com] [--raml /user/ubuntu/files/api.raml]\n" +
        "DESCRIPTION:       Automatically test api's that implement a RAML spec\n" +
        "OPTIONS:\n" +
        "                   -h\n" +
        "                       display this screen\n" +
        "                   --baseURI\n" +
        "                       provide the base uri for conducting the tests\n" +
        "                   --methodName\n" +
        "                       select a specific method to test by name\n" +
        "                   --raml\n" +
        "                       the absolute file path of the raml file being tested. (required)\n" +
        "                   --optionsFile\n" +
        "                       the absolute file path to a json file containing options for rat"
    }
};
