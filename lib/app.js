'use strict';

const stub = require('./stub');
const View = require('express/lib/view');

module.exports = () => {
  const sinon = stub();
  const app = {
    get: sinon.stub(),
    set: sinon.spy((prop, val) => {
      app.get.withArgs(prop).returns(val);
    })
  };
  app.set('view', View);
  app.set('views', []);
  return app;
};
