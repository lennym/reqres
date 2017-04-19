'use strict';

require('../test/helpers');

const router = require('express').Router();
router.route('/foo')
  .get(function (req, res) {
    res.json({ user: req.session.username });
  });

const reqres = require('../');

describe('my router', function () {

  let req;
  let res;

  beforeEach(function () {
    req = reqres.req({ url: '/foo', session: { username: 'lennym' } });
    res = reqres.res();
  });

  it('responds with json showing user from session', function (done) {
    router.handle(req, res);
    res.on('end', function () {
      res.json.should.have.been.calledWithExactly({ user: 'lennym' });
      done();
    });
  });

});
