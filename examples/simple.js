'use strict';

require('../test/helpers');

const middleware = function (req, res, next) {
  req.session.path = req.path;
};

const reqres = require('../');

describe('my middleware', function () {

  let req;
  let res;

  beforeEach(function () {
    req = reqres.req();
    res = reqres.res();
  });

  it('request has properties', function () {
    middleware(req, res, function () {
      req.session.path.should.equal('/');
    });
  });

});
