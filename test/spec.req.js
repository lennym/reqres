var reqres = require('../');

describe('res', function () {

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

});