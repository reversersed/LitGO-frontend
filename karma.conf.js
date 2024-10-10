module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-chrome-launcher"),
      require("karma-coverage"),
      require("karma-jasmine"),
      require("@chiragrupani/karma-chromium-edge-launcher"),
      require("@angular-devkit/build-angular/plugins/karma"),
    ],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["EdgeHeadless"],
    singleRun: true,
    restartOnFileChange: true,
    coverageReporter: {
      type: "html",
      dir: "../data/tests/frontend",
    },
  });
};
