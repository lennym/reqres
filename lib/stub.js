'use strict';

const sinon = require('sinon');
let _stub;
const stub = lib => {
  if (lib) {
    if (typeof lib.stub !== 'function') {
      throw new Error(`Could not set stub lib. Expected a "stub" method, found: ${typeof lib.stub}`);
    }
    if (typeof lib.spy !== 'function') {
      throw new Error(`Could not set stub lib. Expected a "spy" method, found: ${typeof lib.spy}`);
    }
    _stub = lib;
  }
  return _stub;
};

stub(sinon);

module.exports = stub;
