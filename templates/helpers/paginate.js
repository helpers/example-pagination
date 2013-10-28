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
    console.log(context);
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
  exports.paginate = function(context, opts) {
    context = _.extend({}, context, this, opts.hash);

    // _(context.pagination).forEach(function(p) {
    //   // console.log(p.index);
    // });

    var template = [
      '<ul class="pager {{modifier}}">',
      '  {{#is pagination.currentPage 1}}',
      '    <li class="pager-heading">POPULAR</li>',
      '  {{/is}}',
      '  {{#isnt pagination.currentPage 1}}',
      '    <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
      '  {{/isnt}}',
      '',
      '  {{#isnt pagination.currentPage 1}}',
      '    {{#isnt pagination.currentPage pagination.totalPages}}',
      '      {{#eachItems pages}}',
      // '        <li>first: {{@first}}</li>',
      // '        <li>prev:  {{@prev}}</li>',
      // '        <li>index: {{@index}}</li>',
      // '        <li>next:  {{@next}}</li>',
      // '        <li>last:  {{@last}}</li>',
      '        <li><a href="{{relative page.dest prev.dest}}">{{@number}}</a></li>',
      '      {{/eachItems}}',
      '    {{/isnt}}',
      '  {{/isnt}}',
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


// var template = [
//   '{{#is page.index 1}}',
//   '  <ul class="pager {{modifier}}">',
//   // '    <li class="pager-heading">POPULAR</li>',
//   '    <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
//   '    <li class="next"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
//   '  </ul>',
//   '{{/is}}',
//   '{{#unless pagination.currentPage pagination.totalPages}}',
//   '  <ul class="pager {{modifier}}">',
//   '    <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
//   '    <li class="next disabled"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
//   '  </ul>',
//   '{{else}}',
//   '  <ul class="pager {{modifier}}">',
//   '    <li class="previous"><a href="{{relative page.dest prev.dest}}">&larr; Previous</a></li>',
//   '    <li class="next"><a href="{{relative page.dest next.dest}}">Next &rarr;</a></li>',
//   '  </ul>',
//   '{{/unless}}',
// ].join('\n');

// '  {{#each pages}}',
// '    {{#is pagination.currentPage page.index}}',
// '      <a href="{{relative page.dest prev.dest}}">{{page.basename}}</a>',
// '    {{/is}}',
// '    {{#isnt pagination.currentPage page.index}}',
// '      <a href="#">{{page.basename}}</a>',
// '    {{/isnt}}',
// '  {{/each}}',

// [
//   '{{#pagination pagination.currentPage pagination.totalPages 4}}',
//   '<div class="pagination">',
//   '  {{#unless firstPage}}',
//   '    <a href="#">&larr; Previous</a>',
//   '  {{/unless}}',
//   '',
//   '  {{#each pages}}',
//   '    {{#if isCurrent}}',
//   '      <a href="{{relative page.dest prev.dest}}">{{page.basename}}</a>',
//   '    {{/if}}',
//   '    {{#unless isCurrent}}',
//   '      <a href="#">{{page.basename}}</a>',
//   '    {{/unless}}',
//   '  {{/each}}',
//   '',
//   '  {{#unless lastPage}}',
//   '    <a href="{{relative page.dest next.dest}}">Next &rarr;</a>',
//   '  {{/unless}}',
//   '</div>',
//   '{{/pagination}}'
// ].join('\n')


  /**
   * {{paginate}}
   * @credit: http://syskall.com/pagination-with-handlebars/
   * Adds a pager to enable navigating to prev and next page/post.
   * @param  {Object} context Context to pass to the helper, most likely `pagination`.
   * @param  {Object} opts    Pass a modifier class to the helper.
   * @return {String}         The pager, HTML.
   */
  // exports.paginate = function (context, options) {
  //   context = _.extend({}, context, this, options.hash);
  //   // grunt.file.write('paginate.json', JSON.stringify(context, null, 2));

  //   // console.log(context.page.dest);
  //   var type = options.hash.type || 'middle';
  //   var totalPages = context.totalPages;
  //   var currentPage = context.currentPage;
  //   var ret = '';
  //   var limit;

  //   if (options.hash.limit) {
  //     limit += options.hash.limit;
  //   }

  //   //page totalPages
  //   var newContext = {};

  //   switch (type) {
  //   case 'middle':
  //     if (typeof limit === 'number') {

  //       var i = 0;
  //       var leftCount = Math.ceil(limit / 2) - 1;
  //       var rightCount = limit - leftCount - 1;

  //       if (currentPage + rightCount > totalPages) {
  //         leftCount = limit - (totalPages - currentPage) - 1;
  //       }
  //       if (currentPage - leftCount < 1) {
  //         leftCount = currentPage - 1;
  //       }
  //       var start = currentPage - leftCount;

  //       while (i < limit && i < totalPages) {
  //         newContext = {
  //           n: start
  //         };
  //         if (start === currentPage) {
  //           newContext.active = true;
  //         }
  //         ret = ret + options.fn(newContext);
  //         start++;
  //         i++;
  //       }
  //     } else {
  //       for (var ii = 1; ii <= totalPages; ii++) {
  //         newContext = {
  //           n: ii
  //         };
  //         if (ii === currentPage) {
  //           newContext.active = true;
  //         }
  //         ret = ret + options.fn(newContext);
  //       }
  //     }
  //     break;
  //   case 'previous':
  //     if (currentPage === 1) {
  //       newContext = {
  //         disabled: true,
  //         n: 1
  //       };
  //     } else {
  //       newContext = {
  //         n: currentPage - 1
  //       };
  //     }
  //     ret = ret + options.fn(newContext);
  //     break;
  //   case 'next':
  //     newContext = {};
  //     if (currentPage === totalPages) {
  //       newContext = {
  //         disabled: true,
  //         n: totalPages
  //       };
  //     } else {
  //       newContext = {
  //         n: currentPage + 1
  //       };
  //     }
  //     ret = ret + options.fn(newContext);
  //     break;
  //   }

  //   return ret;
  // };
