/**
 * Handlebars Helpers: {{pager}}
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT License (MIT).
 */

'use strict';


// Node.js
var path = require('path');
var fs   = require('fs');



// Export helpers
module.exports.register = function (Handlebars, options, params) {

  var opts     = options;
  var grunt    = params.grunt;
  var assemble = params.assemble;
  var _        = require('lodash');

  /**
   * {{include}}
   */
  exports.include = function(options) {
    var source = options.fn(this);
    var template = Handlebars.compile(source);
    var context = _.extend({}, this, opts.data, options.hash);
    return new Handlebars.SafeString(template(context));
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};



