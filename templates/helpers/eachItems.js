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


  /**
   * {{each}}
   * @param  {Object} context
   * @param  {Object} options
   */
  Handlebars.registerHelper('eachItems', function(context, options) {
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
  });
};
