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

    it('emits "end" event when methods that send responses are called', function () {
        var methods = [
            'json',
            'jsonp',
            'redirect',
            'render',
            'send',
            'sendFile',
            'sendStatus'
        ];
        var end = sinon.stub();
        res.on('end', end);

        methods.forEach(function (method) {
            res[method]();
            end.should.have.been.calledOnce;
            end.reset();
        });

    });

});