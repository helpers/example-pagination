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

  var grunt = params.grunt;
  var files = params.assemble.files;

  console.log(files.dest);


  var configData = grunt.config.process(grunt.config.data);
  var data = grunt.file.expand(configData.assemble.options.data);

  var localContext = data.map(function(src) {
    return _.extend({}, configData, src);
  });


  /**
   * {{each}}
   * @param  {Object} context
   * @param  {Object} options
   */
  exports.eachItems = function(context, options) {
    var fn = options.fn;
    var inverse = options.inverse;
    var i = 0;
    var ret = "";
    var data;

    if (_.isFunction(context)) {
      context = context.call(this);
    }

    if (options.data) {
      data = Handlebars.createFrame(options.data);
    }

    if(context && typeof context === 'object') {
      if (_.isArray(context)) {
        for(var j = context.length; i<j; i++) {
          if (data) {
            data.index  = i;
            data.number = i + 1;
            data.first  = (i === 0);
            data.prev   = i - 1;
            data.next   = i + 1;
            data.last   = (i === (context.length - 1));
          }
          ret = ret + fn(context[i], {
            data: data
          });
        }
      } else {
        for(var key in context) {
          if(context.hasOwnProperty(key)) {
            if(data) { data.key = key; }
            ret = ret + fn(context[key], {
              data: data
            });
            i++;
          }
        }
      }
    }

    if(i === 0){
      ret = inverse(this);
    }

    return ret;
  };

  /**
   * {{pager}}
   * Adds a pager to enable navigating to prev and next page/post.
   * @param  {Object} context Context to pass to the helper, most likely `pagination`.
   * @param  {Object} opts    Pass a modifier class to the helper.
   * @return {String}         The pager, HTML.
   */
  exports.paginate = function(context, options) {
    context = _.extend({modifier: ''}, context, this, options.hash);

    var template = [
      '<ul class="pager pager-rounded {{modifier}}">',
      '  {{#is pagination.currentPage 1}}',
      '    <li class="pager-heading">POPULAR</li>',
      '  {{/is}}',
      '  {{#isnt pagination.currentPage 1}}',
      '    <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
      '  {{/isnt}}',
      '',
      '  {{#eachItems pages}}',
      '    <li{{#is ../page.dest this.dest}} class="active"{{/is}}>',
      '      <a href="{{relative ../page.dest this.dest}}">{{@number}}</a>',
      '    </li>',
      '  {{/eachItems}}',
      '',
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
