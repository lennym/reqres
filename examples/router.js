var router = require('express').Router();
router.route('/foo')
    .get(function (req, res, next) {
        req.user = req.session.username;
        next();
    });
var reqres = require('../');

describe('my router', function () {

    var req, res;

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

});