var jsFiles = [
  'src/templates.js',
  'src/bootstrap-tags.js'
  ]
var coffeeFiles = [
      'src/events.js.coffee',
      'src/models/*.js.coffee',
      'src/views/*.js.coffee',
      'src/bootstrap-tags.js.coffee'
    ];
var templateFiles = 'src/templates/*.jst'

var specJs = 'spec/*.js'
var specCoffeeFiles = ['spec/*.coffee']

module.exports = function(grunt) {
  grunt.initConfig({
    version: grunt.file.readJSON('package.json').version,

    uglify: {
      options: {
        banner: [
          '/*!',
          ' * bootstrap-tags 0.1.1',
          ' * https://github.com/maxwells/bootstrap-tags',
          ' * Copyright 2013 Max Lahey; Licensed MIT',
          ' */\n\n'
        ].join('\n'),
        enclose: { 'window.jQuery': '$' }
      },
      js : {
        options: {
          mangle: false,
          beautify: true,
          compress: false
        },
        src: jsFiles,
        dest: 'dist/bootstrap-tags.js'
      },
      jsmin: {
        options: {
          mangle: true,
          compress: true
        },
        src: jsFiles,
        dest: 'dist/bootstrap-tags.min.js'
      }
    },

    sed: {
      version: {
        pattern: '%VERSION%',
        replacement: '<%= version %>',
        path: ['<%= uglify.js.dest %>', '<%= uglify.jsmin.dest %>']
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: jsFiles,
      tests: ['test/*.js'],
      gruntfile: ['Gruntfile.js']
    },

    watch: {
      buildCoffee: {
        files: coffeeFiles,
        tasks: 'build'
      },
      spec: {
        files: specCoffeeFiles.concat(['dist/bootstrap-tags.js']),
        tasks: 'test'
      },
      buildTemplates: {
        files: templateFiles,
        tasks: 'build'
      }
    },

    coffee: {
      compile: {
        files: {
          'src/bootstrap-tags.js': coffeeFiles
        }
      },
      spec: {
        files: {
          specJs: specCoffeeFiles
        }
      }
    },

    jst: {
      compile: {
        options: {
            //namespace: "anotherNameThanJST",      //Default: 'JST'
            prettify: false,                        //Default: false|true
            amdWrapper: false,                      //Default: false|true
            templateSettings: {
            },
            processName: function(filename) {
                //Shortens the file path for the template.
                grunt.log.write(filename.match(/(.*)\./)[1]);
                return filename.slice(filename.indexOf("template"), filename.length).match(/(.*)\./)[1];
            }
        },
        files: {
            "src/templates.js": templateFiles
        }
      }
    },

    clean: {
      dist: 'dist'
    },

    jasmine: {
      test: {
        src: 'dist/bootstrap-tags',
        options: {
          specs: 'spec/*spec.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            // baseUrl: 'components/',
            requireConfig: {
              baseUrl: './components',
              paths: {
                "jquery": "jquery/jquery",
                "backbone": "backbone"
              },
              deps: ['jquery']
            }
          }
        }
      }
    }

  });

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['jst', 'coffee', 'uglify']);
  grunt.registerTask('server', 'connect:server');
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('test', ['coffee:spec', 'jasmine:test']);
  grunt.registerTask('dev', 'parallel:dev');

  // load tasks
  // ----------
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jst');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
}