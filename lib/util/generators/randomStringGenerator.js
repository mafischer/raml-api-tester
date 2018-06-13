const RandExp = require('randexp');
const crypto = require('crypto');
const randNbr = require('./randomNumberGenerator');

exports.String = (type) => {
    if(type.pattern) {
        return new RandExp(type.pattern).gen();
    } else if(Array.isArray(type.enum)){
        return type.enum[randNbr.Integer(0,type.enum.length - 1)];
    }
    return crypto.createHash('sha1').update((new Date()).valueOf().toString() + Math.random().toString()).digest('hex');
};