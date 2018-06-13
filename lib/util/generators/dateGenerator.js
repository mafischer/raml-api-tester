const moment = require('moment');

exports.Date = (type) => {
    //TODO: create date based on constraints
    let value;
    let date = moment();
    switch(type.type[0]) {
        case "date-only":
            value = date.format('YYYY-MM-DD');
            break;
        case "time-only":
            value = date.format('hh:mm:ss');
            break;
        case "datetime-only":
            value = date.format('yyyy-mm-ddThh:mm:ss');
            break;
        case "datetime":
        default:
            //TODO: generate complex data
            value = date.toISOString();
    }
    return value;
};