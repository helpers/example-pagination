/*
 * pagination-example
 * https://github.com/assemble/pagination-example
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, Contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({

    assemble: {
      options: {
        flatten: true,
        assets: '_gh_pages/assets',
        // plugins: ['permalinks'],
        helpers: ['templates/helpers/*.js', 'helper-prettify', 'helper-compose'],
        partials: ['templates/includes/*.hbs'],
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',
      },
      example000: {
        files: {'_gh_pages/example-000/': ['example-000/index.hbs']},
        options: {
          partials: 'example-000/pagination.hbs',
          styles: 'example-000/styles.css',
          data: 'example-000/*.json'
        }
      },
      example010: {
        files: {'_gh_pages/example-010/': ['example-010/index.hbs']},
        options: {
          partials: 'example-010/pagination.hbs',
          styles: 'example-010/styles.css',
          data: 'example-010/*.json'
        }
      },
      example020: {
        files: {'_gh_pages/example-020/': ['example-020/index.hbs']},
        options: {
          partials: 'example-020/pagination.hbs',
          styles: 'example-020/styles.css',
          data: 'example-020/*.json'
        }
      },
      example030: {
        files: {'_gh_pages/example-030/': ['example-030/index.hbs']},
        options: {
          partials: 'example-030/pagination.hbs',
          styles: 'example-030/styles.css',
          data: 'example-030/*.json'
        }
      },
      example040: {
        files: {'_gh_pages/example-040/': ['example-040/index.hbs']},
        options: {
          partials: 'example-040/pagination.hbs',
          styles: 'example-040/styles.css',
          data: 'example-040/*.json'
        }
      },
      example050: {
        files: {'_gh_pages/example-050/': ['example-050/index.hbs']},
        options: {
          partials: 'example-050/pagination.hbs',
          styles: 'example-050/styles.css',
          data: 'example-050/*.json'
        }
      },
      example060: {
        files: {'_gh_pages/example-060/': ['example-060/index.hbs']},
        options: {
          partials: 'example-060/pagination.hbs',
          styles: 'example-060/styles.css',
          data: 'example-060/*.json'
        }
      },

      // Pages collection, array format.
      // pagination070: {
      //   files: {'_gh_pages/example-070/': ['example-070/index.hbs']},
      //   options: {
      //     layout: 'component.hbs',
      //     pages: '<%= pagination.pages.one %>',
      //     partials: 'example-070/pagination.hbs',
      //     data: ['example-070/pagination.json', 'pagination.json'],
      //   }
      // },
      // // Pages collection, array format.
      // pagination080: {
      //   files: {'_gh_pages/example-080/': ['example-080/index.hbs']},
      //   options: {
      //     layout: 'component.hbs',
      //     pages: '<%= pagination.pages.two %>',
      //     partials: 'example-080/pagination.hbs',
      //     data: 'example-080/*.json',
      //   }
      // },
      // // Pages collection, object format.
      // pagination081: {
      //   files: {'_gh_pages/example-081/': ['example-080/index.hbs']},
      //   options: {
      //     layout: 'component.hbs',
      //     pages: '<%= pagination.pages.three %>',
      //     partials: 'example-080/pagination.hbs',
      //     data: 'example-080/*.json',
      //   }
      // },
      // example090: {
      //   files: {'_gh_pages/example-090/': ['example-090/index.hbs']},
      //   options: {
      //     layout: 'component.hbs',
      //     pages: '<%= pagination.pages.four %>',
      //     partials: 'example-090/pagination.hbs',
      //     data: 'example-090/*.json',
      //   }
      // }
    },
    // Before creating new files, remove files from previous build.
    clean: ['_gh_pages/**/*.html']

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
