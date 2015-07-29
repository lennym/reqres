var _ = require('lodash'),
    sinon = require('sinon'),
    EventEmitter = require('events').EventEmitter;

function complete() {
    setImmediate(function () {
        this.emit('end');
    }.bind(this));
}

module.exports = function (settings) {

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
        json: sinon.spy(complete),
        jsonp: sinon.spy(complete),
        links: sinon.stub(),
        location: sinon.stub(),
        redirect: sinon.spy(complete),
        render: sinon.spy(complete),
        send: sinon.spy(complete),
        sendFile: sinon.spy(complete),
        sendStatus: sinon.spy(complete),
        set: sinon.stub(),
        status: sinon.stub(),
        type: sinon.stub(),
        vary: sinon.stub()
    };

    var res = _.assign(new EventEmitter, defaults, settings);

    // implement chaining in methods that do not return values
    _.each(res, function (method) {
        if (typeof method === 'function' && typeof method.returns === 'function' && (method.defaultBehavior === null || method.defaultBehavior.returnValue === undefined)) {
            method.returns(res);
        }
    });

    res.app = require('./app')();

    return res;
};
