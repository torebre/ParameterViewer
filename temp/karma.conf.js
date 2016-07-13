// Karma configuration
// Generated on Mon Jul 11 2016 17:57:56 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../build/ts_out',

      frameworks: ['systemjs', 'jasmine'],

      plugins: ['karma-systemjs', 'karma-chrome-launcher', 'karma-jasmine'],


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    // frameworks: ['systemjs', 'karma-systemjs', 'jasmine'],

      // frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        // Polyfills.
        '../node_modules/es6-shim/es6-shim.js',


        // '../../node_modules/reflect-metadata/Reflect.js',


        // System.js for module loading
        // '../../node_modules/systemjs/dist/system-polyfills.js',
        // '../../node_modules/systemjs/dist/system.src.js',

        // {pattern: 'karma-test-shim.js', included: true, watched: true},

      // 'test/viewer/**.js',
        {pattern: '../../node_modules/angular2/**/*.js', included: false, watched: true},
        // {pattern: '../../node_modules/angular2/**/*.js.map', included: false, watched: true},

      '**.js',


    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,


        systemjs: {
          // Path to your SystemJS configuration file
          configFile: '../../system.conf.js',

          // Patterns for files that you want Karma to make available, but not loaded until a module requests them. eg. Third-party libraries.
          serveFiles: [
            // 'lib/**/*.js',
            '../../node_modules/angular2/core.js',
              // '../../node_modules/traceur/**.js'
          ],

          // SystemJS configuration specifically for tests, added after your config file.
          // Good for adding test libraries and mock modules
          // config: {
          //   paths: {
          //     'angular-mocks': 'bower_components/angular-mocks/angular-mocks.js'
          //   }
          // }
        }


      }



  )}
