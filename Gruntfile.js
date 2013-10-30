/*
 * pagination-example
 * https://github.com/assemble/pagination-example
 * Copyright (c) 2013 Jon Schlinkert, Brian Woodward, Contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var pretty = require('pretty');

  // Project configuration.
  grunt.initConfig({

    site : grunt.file.readYAML('_config.yml'),
    components: grunt.file.readJSON('data/components.json'),
    posts: grunt.file.readJSON('data/posts.json'),

    assemble: {
      options: {
        site: '<%= site %>',
        // plugins: ['assemble-contrib-contextual'],
        contextual: {dest: 'tmp/'},

        flatten: true,
        assets: '_gh_pages/assets',
        // plugins: ['permalinks'],
        helpers: ['templates/helpers/*.js', 'handlebars-helper-lorem', 'handlebars-helper-post'],
        partials: ['templates/includes/*.hbs'],
        layout: 'templates/layouts/default.hbs',
        data: ['data/**/*.json'],
        postprocess: pretty
      },
      // index: {
      //   files: {'_gh_pages/foo/': ['example-*/index.hbs', 'example-*/alert-*.hbs', 'templates/index.hbs']},
      //   options: {
      //     flatten: true,
      //     layout: 'example-000/component.hbs',
      //     data: ['example-*/*.json']
      //   }
      // },
      example000: {
        files: {'_gh_pages/example-000/': ['example-000/index.hbs', 'example-000/alert-*.hbs']},
        options: {
          layout: 'example-000/component.hbs',
          styles: 'example-000/styles.css',
          data: ['example-000/*.json']
        }
      },
      example010: {
        files: {'_gh_pages/example-010/': ['example-010/index.hbs']},
        options: {
          styles: 'example-010/styles.css',
          pages: '<%= posts.archives %>',
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
        files: {'_gh_pages/example-050/': ['example-050/index.hbs', 'example-050/alert-*.hbs']},
        options: {
          example: 'example-050',
          partials: 'example-050/pagination.hbs',
          styles: 'example-050/styles.css',
          data: 'example-050/*.json'
        }
      },
      example060: {
        files: {'_gh_pages/example-060/': ['example-060/index.hbs', 'example-060/alert-*.hbs']},
        options: {
          example: 'example-060',
          partials: 'example-060/pagination.hbs',
          styles: 'example-060/styles.css',
          data: 'example-060/*.json'
        }
      }
    },


    /**
     * Compile LESS to CSS
     */
    less: {
      options: {
        paths: ['theme/bootstrap', 'theme/components', 'theme']
      },
      docs: {
        src: ['theme/theme.less'],
        dest: '<%= assemble.options.assets %>/css/docs.css'
      }
    },


    jshint: {
      options: {jshintrc: '.jshintrc', },
      allFiles: ['Gruntfile.js', 'templates/helpers/*.js']
    },

    // Before creating new files, remove files from previous build.
    clean: ['_gh_pages/**/*.html']

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('assemble-less');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'assemble']);

};
