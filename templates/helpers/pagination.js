/**
 * Handlebars Helpers: {{pager}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

// Node.js
var path   = require('path');
var fs     = require('fs');

// node_modules
var grunt = require('grunt');
var _ = grunt.util._;


// Export helpers
module.exports.register = function (Handlebars, options) {

  'use strict';

  /**
   * {{pager}}
   * Adds a pager to enable navigating to prev and next page/post.
   * @param  {Object} context Context to pass to the helper, most likely `pagination`.
   * @param  {Object} opts    Pass a modifier class to the helper.
   * @return {String}         The pager, HTML.
   */
  exports.pagination = function (currentPage, pageCount, limit, options) {

    // grunt.file.write('pagination.json', JSON.stringify(context, null, 2));
    if (arguments.length === 3) {
      options = limit;
      limit = 5;
    }
    console.log(limit);

    var startPage = currentPage - Math.floor(limit / 2);
    var endPage = currentPage + Math.floor(limit / 2);

    if (startPage <= 0) {
      endPage -= (startPage - 1);
      startPage = 1;
    }

    if (endPage > pageCount) {
      endPage = pageCount;
      if (endPage - limit + 1 > 0) {
        startPage = endPage - limit + 1;
      } else {
        startPage = 1;
      }
    }

    var context = {
      firstPage: false,
      pages: [],
      lastPage: false,
    };
    if (startPage === 1) {
      context.firstPage = true;
    }
    for (var i = startPage; i <= endPage; i++) {
      context.pages.push({
        page: i,
        isCurrent: i === currentPage,
      });
    }
    if (endPage === pageCount) {
      context.lastPage = true;
    }
    return new Handlebars.SafeString(options.fn(context));
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
