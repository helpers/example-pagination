/**
 * Handlebars Helpers: {{hyphenate}}
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
   * {{hyphenate}}
   * Replace spaces in string with hyphens.
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  exports.hyphenate = function (str) {
    if(str && typeof str === "string") {
      return str.split(" ").join("-").toLowerCase();
    }
  };

  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};
