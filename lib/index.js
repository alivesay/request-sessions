var util = require('util');
var sessions = require('./sessions');
var request = require('request');

var internals = {};

internals.defaults = {
  cacheOptions: {
    engine: 'catbox-memory'
  }
};

function RequestSession (options, callback) {

  if (options && !options.sessionID) {
    request(options, callback);
    return;
  }

  sessions.load({sessionID: options.sessionID, cookieURL: options.cookieURL}, function (err, session) {
    session = session || {};
    options.jar = session.jar = session.jar || request.jar();

    request(options, function (error, response, body) {
        sessions.save(options, session, function (err) {
            response.session = err ? null : session;
            callback(error, response, body);
        });
    });
  });
}

exports = module.exports = RequestSession;

