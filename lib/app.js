'use strict';

const sinon = require('sinon');
const View = require('express/lib/view');

module.exports = () => {
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
