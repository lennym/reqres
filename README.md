# reqres
Stub request and response objects for testing express applications and middleware

Creates default request and response object with configurable values, and methods stubbed with [sinon.stub](http://sinonjs.org/docs/#stubs).

## Usage

[Using default request properties](./examples/simple.js):

```javascript
const middleware = function (req, res, next) {
    req.session.path = req.path;
};
const reqres = require('reqres');

describe('my middleware', function () {

    let req;
    let res;

    beforeEach(function () {
        req = reqres.req(),
        res = reqres.res()
    });

    it('request has properties', function () {
        middleware(req, res, function (err) {
            req.session.path.should.equal('/');
            done(err);
        });
    });

});
```

[Testing a router](./examples/router.js):

```javascript
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
const reqres = require('reqres');

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
        req.body = { user: 'user' };
        router(req, res, function () {
            req.session.username.should.equal('user');
            done();
        });
    });

});
```

[Testing response methods](./examples/response.js):

All methods which would normally send a response (and so end the middleware chain) e.g. `json`, `send` will emit an "end" event, so this can be bound onto for running assertions.

```javascript
const router = require('express').Router();
router.route('/foo')
    .get(function (req, res) {
        res.json({ user: req.session.username });
    });
const reqres = require('reqres');

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
```

## Customisation

If you want to use a different version of sinon to that which is included in reqres - or indeed a completely different stub/spy library - then you can set the sinon property to your own local version.

```javascript
const reqres = require('reqres');
reqres.sinon = require('sinon');
```
