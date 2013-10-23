/**
 * Handlebars Helpers: {{pager}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

// Node.js
var path = require('path');
var fs = require('fs');

// node_modules
var grunt = require('grunt');
var _ = grunt.util._;

// Export helpers
module.exports.register = function (Handlebars, options) {

  'use strict';

  /**
   * {{paginate}}
   * @credit: http://syskall.com/pagination-with-handlebars/
   * Adds a pager to enable navigating to prev and next page/post.
   * @param  {Object} context Context to pass to the helper, most likely `pagination`.
   * @param  {Object} opts    Pass a modifier class to the helper.
   * @return {String}         The pager, HTML.
   */
  exports.paginate = function (context, options) {
    grunt.file.write('paginate.json', JSON.stringify(context, null, 2));
    // console.log(context);
    context = _.extend({}, context, options);
    var type = options.hash.type || 'middle';
    var ret = '';
    var totalPages = context.totalPages;
    var page = context.currentPage;
    var limit;

    if (options.hash.limit) {
      limit += options.hash.limit;
    }

    //page totalPages
    var newContext = {};

    switch (type) {
    case 'middle':
      if (typeof limit === 'number') {

        var i = 0;
        var leftCount = Math.ceil(limit / 2) - 1;
        var rightCount = limit - leftCount - 1;

        if (page + rightCount > totalPages) {
          leftCount = limit - (totalPages - page) - 1;
        }
        if (page - leftCount < 1) {
          leftCount = page - 1;
        }
        var start = page - leftCount;

        while (i < limit && i < totalPages) {
          newContext = {
            n: start
          };
          if (start === page) {
            newContext.active = true;
          }
          ret = ret + options.fn(newContext);
          start++;
          i++;
        }
      } else {
        for (var ii = 1; ii <= totalPages; ii++) {
          newContext = {
            n: ii
          };
          if (ii === page) {
            newContext.active = true;
          }
          ret = ret + options.fn(newContext);
        }
      }
      break;
    case 'previous':
      if (page === 1) {
        newContext = {
          disabled: true,
          n: 1
        };
      } else {
        newContext = {
          n: page - 1
        };
      }
      ret = ret + options.fn(newContext);
      break;
    case 'next':
      newContext = {};
      if (page === totalPages) {
        newContext = {
          disabled: true,
          n: totalPages
        };
      } else {
        newContext = {
          n: page + 1
        };
      }
      ret = ret + options.fn(newContext);
      break;
    }

    return ret;
  };

  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};