var jsFiles = [
  'src/bootstrap-tags.js'
];

var coffeeFiles = 'src/**/*.coffee'

var specCoffeeFiles = [
  'spec/*.coffee'
];

module.exports = function(grunt) {
  grunt.initConfig({
    version: grunt.file.readJSON('component.json').version,

    uglify: {
      options: {
        banner: [
          '/*!',
          ' * bootstrap-tags 1.1.0',
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
        dest: 'dist/js/bootstrap-tags.js'
      },
      jsmin: {
        options: {
          mangle: true,
          compress: true
        },
        src: jsFiles,
        dest: 'dist/js/bootstrap-tags.min.js'
      }
    },

    sed: {
      version: {
        pattern: '%VERSION%',
        replacement: '<%= version %>',
        path: ['<%= uglify.js.dest %>', '<%= uglify.jsmin.dest %>']
      }
    },

    watch: {
      buildCoffee: {
        files: coffeeFiles,
        tasks: ['build', 'jasmine:test']
      },
      buildSpec: {
        files: specCoffeeFiles,
        tasks: ['build', 'jasmine:test']
      },
      buildCss: {
        files: ['sass/bootstrap-tags.scss'],
        tasks: ['sass']
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
          'spec/bootstrap-tags-spec.js': specCoffeeFiles
        }
      }
    },

    clean: {
      dist: 'dist'
    },

    jasmine: {
      test: {
        src: './dist/js/bootstrap-tags.js',
        options: {
          specs: 'spec/*spec.js',
          keepRunner: false,
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              paths: {
                "jquery": "./bower_components/jquery/dist/jquery",
              },
              deps: ['jquery']
            }
          }
        }
      }
    },

    sass: {
      dist: {
        files: {
          'dist/css/bootstrap-tags.css': 'sass/bootstrap-tags.scss'
        }
      }
    }

  });

  grunt.registerTask('default', 'build');
  grunt.registerTask('build', ['coffee', 'uglify']);
  grunt.registerTask('server', 'connect:server');
  grunt.registerTask('lint', 'jshint');
  grunt.registerTask('test', ['coffee:compile', 'coffee:spec', 'uglify:js', 'jasmine:test']);
  grunt.registerTask('dev', 'parallel:dev');

  // load tasks
  // ----------
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-sass');
}