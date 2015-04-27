var reqres = require('../'),
    EventEmitter = require('events').EventEmitter;

describe('res', function () {

    var res;

    beforeEach(function () {
        res = reqres.res();
    });

    it('implements EventEmitter', function () {
        res.should.be.an.instanceOf(EventEmitter);
    });

    describe('emits "end" event when methods that send responses are called', function () {
        var methods = [
            'json',
            'jsonp',
            'redirect',
            'render',
            'send',
            'sendFile',
            'sendStatus'
        ];

        methods.forEach(function (method) {
            it(method, function (done) {
                res[method]();
                res.on('end', done);
            })
        });

    });

    describe('app', function () {

        it('has get and set methods', function () {
            res.app.get.should.be.a('function');
            res.app.set.should.be.a('function');
        });

    });

});