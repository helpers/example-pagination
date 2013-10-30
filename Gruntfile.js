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
    posts: grunt.file.readJSON('example-blog/posts.json'),


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
      blog: {
        files: {'_gh_pages/example-blog/': ['example-blog/index.hbs']},
        options: {
          layout: 'blog',
          pages: '<%= posts.archives %>',
          data: 'example-blog/*.json'
        }
      },
      blog2: {
        files: {'_gh_pages/example-blog-2/': ['example-blog-2/index.hbs']},
        options: {
          layout: 'blog',
          pages: '<%= posts.archives %>',
          data: 'example-blog-2/*.json'
        }
      },
      components: {
        files: {'_gh_pages/example-components/': ['example-components/index.hbs', 'example-components/alert-*.hbs']},
        options: {
          data: ['example-components/*.json']
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
      },
      examples: {
        options: {
          imports: {reference: ['theme/theme.less']}
        },
        files: [
          {expand: true, src: ['example-*/*.less'], dest: '_gh_pages/', ext: '.css'}
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

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'assemble']);

};
