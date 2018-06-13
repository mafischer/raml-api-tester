const randNum = require('./randomNumberGenerator');
const randString = require('./randomStringGenerator');
const dateGen = require('./dateGenerator');

const simple = new RegExp('\b(integer|number|string|date-only|time-only|datetime)\b');

exports.generateComplexData = (types) => {
    let data;
    //TODO: taking first type for now
    if(Array.isArray(types) && Array.isArray(types[0].type) && types[0].type.length > 0){
        switch(types[0].type[0]) {
            case "array":
                data = [];
                let type = types[0].items;
                // this happens if items is not specified in the raml spec
                if(type === undefined) {
                    break;
                }
                if(types[0].items[0].type === undefined){
                    type = [{
                        ...types[0],
                        items: undefined,
                        type: types[0].items
                    }];
                }
                for(let i = 0; i < randNum.Integer(types[0].minimum || 0, types[0].maximum || 10); i++) {
                    //TODO: Take the type of items for now
                    data.push(exports.generateData(type))
                }
                break;
            case "object":
                data = {};
                types[0].properties.forEach(function(property){
                    data[property.name] = exports.generateData([property])
                });
                break;
            default:
                //Fallback to empty object
                data = {};
        }
        return data;
    } else {
        throw new Error("type is not valid: " + types[0].displayName);
    }
};

exports.generateData = (types) => {
    let data;
    //TODO: taking first type for now
    if(Array.isArray(types) && Array.isArray(types[0].type) && types[0].type.length > 0){
        switch(types[0].type[0]) {
            case "integer":
                data = randNum.Integer(types[0].minimum || null, types[0].maximum);
                break;
            case "number":
                data = randNum.Number(types[0].minimum || null, types[0].maximum);
                break;
            case "string":
                data = randString.String(types[0]);
                break;
            case "date-only":
            case "time-only":
            case "datetime-only":
            case "datetime":
                //TODO: use constraints
                data = dateGen.Date(types[0]);
                break;
            case "object":
            default:
                //TODO: generate complex data
                data = exports.generateComplexData(types);
        }
        return data;
    } else {
        throw new Error("type is not valid: " + types[0].displayName);
    }


};

exports.generateUriParam = (param) => {
    if(Array.isArray(param.examples) && param.examples.length > 0){
        //TODO: Taking first example for now
        return param.examples[0].value;
    } else if(Array.isArray(param.type) && param.type.length > 0) {
        //TODO: Taking first type for now
        const type = param.type[0];
        return exports.generateData([param]);
    } else {
        throw new Error("Unable to generate uri param for " + param.displayName);
    }

};
