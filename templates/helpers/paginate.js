/**
 * Handlebars Helpers: {{pager}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';

// Node.js
var path = require('path');
var fs = require('fs');

// node_modules
var _     = require('lodash');

// Export helpers
module.exports.register = function (Handlebars, options, params) {

  var opts = options || {};

  /**
   * {{paginate}}
   * Adds a pager to enable navigating to prev and next page/post.
   * @param  {Object} context Context to pass to the helper, most likely `pagination`.
   * @param  {Object} options Pass a modifier class to the helper.
   * @return {String}         The pager, HTML.
   */
  Handlebars.registerHelper('paginate', function(context, modifier, options) {

    options = options || {};
    options.hash = options.hash || {};
    context = _.extend({modifier: ''}, context, opts, this, options.hash);

    var template = [
      '<ul class="pager {{modifier}}">',
      // '  {{#is pagination.currentPage 1}}',
      // '    <li class="pager-heading">POPULAR</li>',
      // '  {{/is}}',
      '  {{#is pagination.currentPage 1}}',
      '    <li class="previous">',
      '      <a href="{{relative page.dest "./_gh_pages/index.html"}}">&larr; Home</a>',
      '    </li>',
      '  {{/is}}',
      '  {{#isnt pagination.currentPage 1}}',
      '    <li class="previous">',
      '      <a href="{{relative page.dest prev.dest}}">&larr; Previous</a>',
      '    </li>',
      '  {{/isnt}}',
      '',
      '  {{#eachItems pages}}',
      '    <li{{#is ../page.dest this.dest}} class="active"{{/is}}>',
      '      <a href="{{relative ../page.dest this.dest}}">{{@number}}</a>',
      '    </li>',
      '  {{/eachItems}}',
      '',
      '  {{#isnt pagination.currentPage pagination.totalPages}}',
      '    <li class="next">',
      '      <a href="{{relative page.dest next.dest}}">Next &rarr;</a>',
      '    </li>',
      '  {{/isnt}}',
      '  {{#is pagination.currentPage pagination.totalPages}}',
      '    <li class="next disabled">',
      '      <a href="{{relative page.dest next.dest}}">Next &rarr;</a>',
      '    </li>',
      '  {{/is}}',
      '</ul>'
    ].join('\n');

    return new Handlebars.SafeString(Handlebars.compile(template)(context));
  });

};
