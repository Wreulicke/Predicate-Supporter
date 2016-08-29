var Jasmine = require('jasmine');
var reporters=require('jasmine-reporters')

var jasmine = new Jasmine();
jasmine.addReporter(new reporters.TerminalReporter({
  verbosity: 3,
  color: true,
}))
jasmine.loadConfigFile();
jasmine.execute();