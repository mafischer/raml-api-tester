# RAML API Tester

The [RAML](https://raml.org/) API Tester (RAT) is a simple library and cli that can be used to test an enpoint serving the api implemenation of a RAML spec.

## Status

[![Build Status](https://travis-ci.org/mafischer/raml-api-tester.svg?branch=master)](https://travis-ci.org/mafischer/raml-api-tester)
[![npm version](https://badge.fury.io/js/raml-api-tester.svg)](https://badge.fury.io/js/raml-api-tester)

### Known Limitations & Bugs
- RAT is in an alpha release state, it's working for my use case but still needs a lot of work.
- The "methodName" option is not yet available via the cli
- See or add to the complete list of [issues](https://github.com/mafischer/raml-api-tester/issues)

## Usage

### Javascript Library
- more to come on this

### CLI

#### Installaiton
`npm install -g raml-api-tester`

#### Help
Output of `rat -h`:
```
NAME:              rat
SYNOPSIS:          rat [--baseURI https://example.com] [--raml /user/ubuntu/files/api.raml]
DESCRIPTION:       Automatically test api's that implement a RAML spec
OPTIONS:
                   -h
                       display this screen
                   --baseURI
                       provide the base uri for conducting the tests
                   --methodName
                       select a specific method to test by name
                   --raml
                       the absolute file path of the raml file being tested. (required)"
                   --optionsFile
                       the absolute file path to a json file containing options for rat
```

#### Examples
- example1
    * `run.sh` example requires the [`jq`](https://stedolan.github.io/jq/download/) cli to be installed and in your **$PATH**
    * This test runs against the [OMDB api](http://www.omdbapi.com/) and requires you to [obtain a free api key](http://www.omdbapi.com/apikey.aspx) to run the example
    * macos & linux:
        ```
        cd examples/example1/
        ./run.sh
        ```
    * windows:
        ```
        coming soon
        ```


## Contributing

### Dev environment setup

#### Prerequisites
- Nodejs (lts or newer)

### Coding standards
- more to come on this