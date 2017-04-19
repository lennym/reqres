var sinon = require('sinon');
var View = require('express/lib/view');

module.exports = function () {
    var app = {
        get: sinon.stub(),
        set: sinon.spy(function (prop, val) {
            app.get.withArgs(prop).returns(val);
        })
    };
    app.set('view', View);
    app.set('views', []);
    return app;
};
