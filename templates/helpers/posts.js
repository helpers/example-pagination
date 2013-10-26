/**
 * Handlebars Helpers: {{pager}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

// Node.js
var path = require('path');
var fs   = require('fs');

// node_modules
var grunt   = require('grunt');
var _       = grunt.util._;


// Export helpers
module.exports.register = function (Handlebars, options) {

  'use strict';

  var opts = options;

  /**
   * {{posts}}
   * Render a list of posts
   */
  exports.include = function(options) {
    var source = options.fn(this);
    var template = Handlebars.compile(source);
    var context = _.extend({}, this, opts, options.hash);
    return new Handlebars.SafeString(template(context));
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};



