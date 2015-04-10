var _ = require('lodash'),
    sinon = require('sinon');

var defaults = {
    headersSent: false,
    locals: {},

    append: sinon.stub(),
    attachment: sinon.stub(),
    cookie: sinon.stub(),
    clearCookie: sinon.stub(),
    download: sinon.stub(),
    end: sinon.stub(),
    format: sinon.stub(),
    get: sinon.stub().returns('true'),
    json: sinon.stub(),
    jsonp: sinon.stub(),
    links: sinon.stub(),
    location: sinon.stub(),
    redirect: sinon.stub(),
    render: sinon.stub(),
    send: sinon.stub(),
    sendFile: sinon.stub(),
    sendStatus: sinon.stub(),
    set: sinon.stub(),
    status: sinon.stub(),
    type: sinon.stub(),
    vary: sinon.stub()
};

module.exports = function (settings) {
    var res = _.assign({}, defaults, settings);

    // implement chaining in methods that do not return values
    _.each(res, function (method) {
        if (typeof method === 'function' && typeof method.returns === 'function' && (method.defaultBehavior === null || method.defaultBehavior.returnValue === undefined)) {
            method.returns(res);
        }
    });

    return res;
};
