var reqres = require('../');

describe('req', function () {

    var req;

    beforeEach(function () {
        req = reqres.req();
    });

    describe('originalUrl', function () {

        it('is constructed from url and baseUrl properties', function () {
            reqres.req({ url: '/foo' }).originalUrl.should.equal('/foo');
            reqres.req({ url: '/foo', baseUrl: '/base' }).originalUrl.should.equal('/base/foo');
        });

    });

    describe('object properties are reset', function () {

        it('params', function () {
            req.params.foo = 'bar';
            reqres.req({}).params.should.eql({});
        });

        it('body', function () {
            req.body.foo = 'bar';
            reqres.req({}).body.should.eql({});
        });

        it('session', function () {
            req.session.foo = 'bar';
            reqres.req({}).session.should.eql({});
        });

        it('cookies', function () {
            req.cookies.foo = 'bar';
            reqres.req({}).cookies.should.eql({});
        });

        it('query', function () {
            req.query.foo = 'bar';
            reqres.req({}).query.should.eql({});
        });

    });

});