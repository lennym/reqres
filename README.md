# reqres
Stub request and response objects for testing express applications and middleware

Creates default request and response object with configurable values, and methods stubbed with [sinon.stub](http://sinonjs.org/docs/#stubs).

## Usage

```javascript
var middleware = require('./my-middleware');
var reqres = require('reqres');

describe('my middleware', function () {

    var req, res;

    beforeEach(function () {
        req = reqres.req({
            session: { username: 'lennym' }
        }),
        res = reqres.res()
    });

    it('calls res.json with username', function () {
        middleware(req, res, function (err) {
            res.status.should.have.been.calledWith(200);
            res.status.should.have.been.calledBefore(res.json);
            res.json.should.have.been.calledWith({ username: 'lennym' });
            done(err);
        });
    });

});
```
