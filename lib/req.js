var _ = require('lodash'),
    sinon = require('sinon');

var defaults = {

    baseUrl: '/',
    url: '/',
    path: '/',
    originalUrl: '/',
    body: {},
    cookies: {},
    fresh: true,
    hostname: 'example.com',
    ip: '127.0.0.1',
    ips: ['127.0.0.1'],
    params: {},
    query: {},
    protocol: 'http',
    subdomains: [],
    xhr: false,

    accepts: sinon.stub(),
    acceptsCharsets: sinon.stub(),
    acceptsEncodings: sinon.stub(),
    acceptsLanguages: sinon.stub(),

    is: sinon.stub(),
    get: sinon.stub()

};

module.exports = function (settings) {
    // secure
    //signedCookies
    //stale
    var req = _.extend({}, defaults, settings);
    req.secure = typeof req.secure === 'undefined' ? (req.protocol === 'https') : req.secure;
    req.signedCookies = typeof req.signedCookies === 'undefined' ? req.cookies : req.signedCookies;
    req.stale = typeof req.stale === 'undefined' ? !req.fresh : req.stale;

    return req;
};
