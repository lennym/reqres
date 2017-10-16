'use strict';

const stub = require('./stub');
const EventEmitter = require('events').EventEmitter;

function complete() {
  setImmediate(() => {
    this.emit('end');
  });
}

module.exports = settings => {
  const sinon = stub();
  const defaults = {
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

  const res = Object.assign(new EventEmitter(), defaults, settings);

  // implement chaining in methods that do not return values
  Object.keys(res).forEach(key => {
    const method = res[key];
    if (typeof method === 'function' && typeof method.returns === 'function'
     && (method.defaultBehavior === null || method.defaultBehavior.returnValue === undefined)) {
      method.returns(res);
    }
  });

  res.app = require('./app')();

  return res;
};
