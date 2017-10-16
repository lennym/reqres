'use strict';

const reqres = require('../');

describe('app', function () {

  let app;

  before(() => {
    reqres.sinon = require('sinon');
  });

  beforeEach(function () {
    app = reqres.app();
  });

  it('has get and set methods', function () {
    app.get.should.be.a('function');
    app.set.should.be.a('function');
  });

  it('calling set with a property and value means subsequent calls to get return that value', function () {
    expect(app.get('foo')).to.be.undefined;
    app.set('foo', 'bar');
    app.get('foo').should.equal('bar');
  });

});
