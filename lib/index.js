const raml = require('raml-1-parser');
const path =require('path');
const async = require('async');
const request = require('request');
const util = require('./util');
const coverage = require('./report');

class Rat {
    constructor(file, options){
        options = options || {};
        console.log('loading raml file, pleas wait...');
        this.api = raml.loadSync(path.resolve(file));
        console.log('raml file loaded, starting tests...');

        // verify that the api spec loaded
        if(!this.api.specification){
            throw new Error("Raml Specification is missing or did not parse correctly");
        }
        this.results = {};
        this.baseUri = options.baseUri || this.api.specification.baseUri;

        //global headers
        if(options.headers){
            // set global headers
            this.headers = options.headers;
        }

        // output test results to console when using cli
        if(options.cli) {
            this.test(this.api.specification.resources, this.results, function(err, responses){
                //TODO: should options.callback only be possible from outside of cli?
                if(options.callback){
                    if(err) {
                        return callback(err);
                    }
                    return callback(null, responses);
                } else {
                    if(err){
                        throw new Error(err.message);
                    }
                    coverage(responses);
                }
            });
        }
    }

    test(resources, responses, callback){
        const that = this;
        if(resources.length === 0){
            return(callback(null, responses));
        }
        //iterate over each resource
        async.each(resources, function(resource, callback){
            if(!responses.hasOwnProperty('displayName')){
                responses[resource.relativeUri] = {};
            }
            //test each method in the resource
            if(resource.hasOwnProperty('methods') && Array.isArray(resource.methods)){
                async.each(resource.methods, function(method, callback){
                    //TODO: need a header preparer
                    request({
                        url: that.baseUri + util.preparers.prepareUri(resource.completeRelativeUri, method.uriParameters) + util.preparers.prepareQueryString(method.queryParameters),
                        method: method.method,
                        headers: that.headers,
                        body: util.preparers.prepareBody(method)? JSON.stringify(util.preparers.prepareBody(method)): undefined
                    }, function(err, response, body){
                        if(err){
                            console.log("The test has failed:\nURI:\n", method.method.toUpperCase(), ":", util.preparers.prepareUri(resource.completeRelativeUri, method.uriParameters), "\n body:\n", util.preparers.prepareBody(method)?  JSON.stringify(util.preparers.prepareBody(method)): "N/A", "err:\n", JSON.stringify(err));
                        }
                        responses[resource.relativeUri][method.method] = {
                            err,
                            response: {
                                statusCode: err? undefined: response.statusCode,
                                body: err? undefined: response.body, //Array.isArray(response.body) || typeof response.body === 'object'? JSON.parse(response.body) : response.body,
                                headers: err? undefined: response.headers
                            },
                            request:{
                                uri: err? undefined: response.request.uri,
                                method: err? undefined: response.request.method,
                                headers: err? undefined: response.request.headers,
                                body: err? undefined: response.request.body //Array.isArray(response.request.body) || typeof response.request.body === 'object'? JSON.parse(response.request.body) : response.request.body
                            },
                            parent: resource.parentUri
                        };
                        return callback();
                    });
                }, function(err){
                    if(err){
                        return callback(err);
                    }
                    if(resource.hasOwnProperty('resources') && Array.isArray(resource.resources)){
                        that.test(resource.resources, responses[resource.relativeUri], function(err){
                            if(err){
                                return callback(err);
                            }
                            return callback();
                        });
                    } else {
                        return callback();
                    }
                });
            } else if(resource.hasOwnProperty('resources') && Array.isArray(resource.resources)){
                that.test(resource.resources, responses[resource.relativeUri], function(err){
                    if(err){
                        return callback(err);
                    }
                    return callback();
                });
            } else {
                return callback();
            }
        }, function(err){
            if(err){
                return callback(err);
            }
            if(callback){
                return callback(null, that.results);
            }
        });
    }
}

module.exports = Rat;