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
  exports.pager = function(context, opts) {
    context = _.extend({modifier:''}, context, opts.hash, this);
    grunt.file.write('pager.json', JSON.stringify(context, null, 2));

    var template = [
      '<ul class="pager {{modifier}}">',
      '  {{#is pagination.currentPage 1}}',
      '    <li class="pager-heading">POPULAR</li>',
      '  {{/is}}',
      '  {{#isnt pagination.currentPage 1}}',
      '    <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
      '  {{/isnt}}',
      '  {{#isnt pagination.currentPage pagination.totalPages}}',
      '    <li class="next"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
      '  {{/isnt}}',
      '  {{#is pagination.currentPage pagination.totalPages}}',
      '    <li class="next disabled"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
      '  {{/is}}',
      '</ul>'
    ].join('\n');

    return new Handlebars.SafeString(Handlebars.compile(template)(context));
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
