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
    posts: grunt.file.readJSON('01/posts.json'),


    /**
     * Generate HTML from templates
     */
    assemble: {
      options: {
        site: '<%= site %>',
        flatten: true,
        assets: '_gh_pages/assets',
        helpers: ['templates/helpers/*.js', 'handlebars-helper-lorem'],
        partials: ['templates/includes/*.hbs'],
        layoutdir: 'templates/layouts',
        layoutext: '.hbs',
        layout: 'component',
        data: ['data/**/*.json'],
        postprocess: pretty
      },
      blog01: {
        files: {'_gh_pages/01/': ['01/index.hbs']},
        options: {
          pages: '<%= posts.archives %>',
          data: '01/*.json',
          layout: 'blog',
        }
      },
      blog02: {
        files: {'_gh_pages/02/': ['02/index.hbs']},
        options: {
          pages: '<%= posts.archives %>',
          data: '02/*.json',
          layout: 'blog'
        }
      },
      components03: {
        files: {'_gh_pages/03/': ['03/index.hbs', '03/alert-*.hbs']},
        options: {
          data: ['03/*.json']
        }
      },
      index: {
        files: {'_gh_pages/': ['templates/*.hbs']}
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
      },
      examples: {
        options: {
          imports: {reference: ['theme/theme.less']}
        },
        files: [
          {expand: true, src: ['0*/*.less'], dest: '_gh_pages/', ext: '.css'}
        ]
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
  grunt.loadNpmTasks('grunt-sync-pkg');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'assemble', 'sync']);

};
