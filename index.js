const stub = require('./lib/stub');
const reqres = {
    req: require('./lib/req'),
    res: require('./lib/res'),
    app: require('./lib/app')
};

Object.defineProperty(reqres, 'sinon', {
  get: () => stub(),
  set: val => stub(val)
});

module.exports = reqres;
