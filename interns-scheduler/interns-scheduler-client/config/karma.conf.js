module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
      'components/lib/angular/angular.js',
      'components/lib/angular/angular-*.js',
      'test/lib/angular/angular-mocks.js',
      'components/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'       
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

})}
