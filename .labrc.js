const argv = require('yargs').argv;
const path = require('path');
let output = argv.output || process.cwd();
output += path.sep + 'coverage.html';

module.exports = {
    coverage: true,
    threshold: 100,
    reporter: 'html',
    output
};