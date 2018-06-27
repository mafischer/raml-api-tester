const generators = require('./generators/index');

exports.prepareUri = (uri, params) => {
    if(params === undefined){
        return uri;
    }
    let preparedUri = "";
    let uriOffset = 0;
    params.forEach(function(param) {
        const key = "{" + param.name + "}";
        const length = key.length;
        preparedUri += uri.substring(uriOffset,uri.indexOf(key,uriOffset));
        preparedUri += generators.generateUriParam(param);
        uriOffset = uri.indexOf(key, uriOffset) + length;
    });
    if(uri.length >= uriOffset){
        preparedUri += uri.substr(uriOffset);
    }
    return preparedUri;
};

exports.prepareBody = (method) => {
    if(method.body && Array.isArray(method.body)){
        return generators.generateComplexData(method.body)
    }
};

exports.prepareQueryString = (params, overrides) => {
    let qs = '';
    if(params === undefined || params.length === 0){
        return qs;
    }
    params.forEach(function(param){
        if(overrides.hasOwnProperty(param.displayName)){
            qs += '&' + param.displayName + '=' + (overrides[param.displayName]);
            return;
        }
        const temp = generators.generateData([param]);
        const complex = Array.isArray(temp) || typeof temp === 'object';
        qs += '&' + param.displayName + '=' + (complex? JSON.stringify(temp): temp);
    });
    return '?' + qs.substr(1);
};