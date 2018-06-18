const Mocha = require('mocha');
const expect = require('chai').expect;

module.exports = function(results){
    const mocha = new Mocha({
        reporter: 'spec'
    });
    const rat = {
        root: Mocha.Suite.create(mocha.suite, 'RAML API Tester')
    };

    report(rat, results);

    mocha.run();

    console.log("Testing is now complete!");

};

const report = (rat, results) => {
    let message;
    Object.keys(results).forEach(function(resource){
        if(!results[resource].hasOwnProperty('err')){
            report(rat, results[resource]);
        } else {
            if(results[resource].request && results[resource].request.uri.path) {
                if (!rat.hasOwnProperty(results[resource].request.path)) {
                    rat[results[resource].request.uri.path] = Mocha.Suite.create(rat[resource.parent] || rat.root, results[resource].request.uri.path);
                }
                rat[results[resource].request.uri.path].addTest(new Mocha.Test(results[resource].request.method + " should return 2xx", function () {
                    message = JSON.stringify(results[resource], null, 2);
                    expect(results[resource].response.statusCode, message).to.be.within(200, 299);
                }));
            } else {
                console.error("Missing response data for: " + JSON.stringify(results[resource]));
            }
        }
    });
};
