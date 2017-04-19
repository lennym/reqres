'use strict';

require('../test/helpers');

const router = require('express').Router();
router.route('/foo')
  .get(function (req, res, next) {
    req.user = req.session.username;
    next();
  })
  .post(function (req, res, next) {
    req.session.username = req.body.user;
    next();
  });

const reqres = require('../');

describe('my router', function () {

  let req;
  let res;

  beforeEach(function () {
    req = reqres.req({ url: '/foo', session: { username: 'lennym' } });
    res = reqres.res();
  });

  it('sets username from session to req.user', function (done) {
    router(req, res, function () {
      req.user.should.equal('lennym');
      done();
    });
  });

  it('sets POST-ed username to session', function (done) {
    req.method = 'POST';
    req.body = {
      user: 'user'
    };
    router(req, res, function () {
      req.session.username.should.equal('user');
      done();
    });
  });

});
