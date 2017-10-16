'use strict';

const stub = require('./stub');
const EventEmitter = require('events').EventEmitter;

module.exports = settings => {
  const sinon = stub();
  const defaults = {

    baseUrl: '/',
    url: '/',
    path: '/',
    method: 'GET',
    body: {},
    session: {},
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

  ['headers', 'body', 'session', 'cookies', 'params', 'query'].forEach(prop => {
    defaults[prop] = {};
  });

  const req = Object.assign({}, new EventEmitter(), defaults, settings);
  req.secure = typeof req.secure === 'undefined' ? (req.protocol === 'https') : req.secure;
  req.signedCookies = typeof req.signedCookies === 'undefined' ? req.cookies : req.signedCookies;
  req.stale = typeof req.stale === 'undefined' ? !req.fresh : req.stale;

  if (!req.originalUrl) {
    if (req.baseUrl !== '/') {
      req.originalUrl = req.baseUrl + req.url;
    } else {
      req.originalUrl = req.url;
    }
  }

  req.app = require('./app')();

  return req;
};
