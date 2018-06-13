
exports.Integer = (minimum, maximum) => {
    let min, max;
    if(maximum || minimum === 0) {
        max = Math.floor(maximum);
    } else {
        max = Math.floor(Number.MAX_SAFE_INTEGER/2);
    }
    if(minimum || minimum === 0) {
        min = Math.ceil(minimum);
    } else {
        min = -1 * Math.ceil(Number.MAX_SAFE_INTEGER/2);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

exports.Number = (minimum, maximum, precision) => {
    let min, max;
    if(maximum) {
        max = maximum
    } else {
        max = Number.MAX_SAFE_INTEGER/2
    }
    if(minimum) {
        min = minimum;
    } else {
        min = -1 * Number.MAX_SAFE_INTEGER/2;
    }
    if(precision) {
        return (Math.random() * (max - min) + min).toFixed(precision);
    }
    return Math.random() * (max - min) + min;
};
