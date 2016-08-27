var fold = require('travis-fold');

var TravisFoldReporter = function(baseReporterDecorator, config) {
  var travisFoldConfig = config.travisFoldReporter || {};

  baseReporterDecorator(this);

  this.onRunStart = function(browsers) {
    if(process.env.TRAVIS === "true")
    {
      process.stdout.write(fold.start(travisFoldConfig.foldName)+'\n');
    }
  };

  this.onBrowserStart = function() {};
  this.onBrowserRegister = function() {};
  this.onBrowserChange = function() {};
  this.onSpecComplete = function() {};
  this.specSuccess = function() {};
  this.specSkipped = function() {};
  this.specFailure = function() {};
  this.onBrowserComplete = function() {};
  this.onBrowserError = function() {};
  this.onBrowserLog = function() {};
  this.onExit = function(done) {done();};

  this.onRunComplete = function(browsers) {
    if(process.env.TRAVIS === "true")
    {
      process.stdout.write(fold.end(travisFoldConfig.foldName)+'\n');
    }
  };
};

TravisFoldReporter.$inject = ['baseReporterDecorator', 'config'];

// PUBLISH DI MODULE
module.exports = {
  'reporter:travis-fold': [
    'type',
    TravisFoldReporter
  ]
};
