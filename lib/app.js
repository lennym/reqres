var sinon = require('sinon');

module.exports = function () {
    var app = {
        get: sinon.stub(),
        set: sinon.spy(function (prop, val) {
            app.get.withArgs(prop).returns(val);
        })
    };
    return app;
};
