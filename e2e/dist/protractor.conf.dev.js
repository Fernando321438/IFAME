"use strict";

// https://github.com/angular/protractor/blob/master/lib/config.ts
var _require = require("jasmine-spec-reporter"),
    SpecReporter = _require.SpecReporter;

exports.config = {
  allScriptsTimeout: 11000,
  specs: ["./src/**/*.e2e-spec.ts"],
  capabilities: {
    browserName: "chrome",
    chromeOptions: {
      args: ["--headless", "--no-sandbox"]
    }
  },
  directConnect: true,
  baseUrl: "http://localhost:4200/",
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function print() {}
  },
  onPrepare: function onPrepare() {
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.json")
    });

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
};