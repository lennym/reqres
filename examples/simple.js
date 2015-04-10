require('../test/helpers');

var middleware = function (req, res, next) {
    req.session.path = req.path;
};

var reqres = require('../');

describe('my middleware', function () {

    var req, res;

    beforeEach(function () {
        req = reqres.req(),
        res = reqres.res()
    });

    it('request has properties', function () {
        middleware(req, res, function () {
            req.session.path.should.equal('/');
        });
    });

});