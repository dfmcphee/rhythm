var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'node'
    },
    port: 3000,
    db: 'mongodb://localhost/node-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'node'
    },
    port: 3000,
    db: 'mongodb://localhost/node-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'node'
    },
    port: 3000,
    db: 'mongodb://localhost/node-production'
  }
};

module.exports = config[env];
