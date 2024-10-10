module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-htmlfile-reporter"),
      require("karma-jasmine-html-reporter"),
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-jasmine"),
      require("@chiragrupani/karma-chromium-edge-launcher"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    singleRun: true,
    browsers: ["Edge"],
    reporters: ["kjhtml", "html"],
    coverageReporter: {
      type: "html",
      dir: "../data/tests/frontend/coverage",
    },
    htmlReporter: {
      outputFile: "../data/tests/frontend/result.html",

      // Optional
      pageTitle: "LitGO Frontend Unit Tests",
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true,
      showOnlyFailed: false,
    },
  });
};
