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
  var pages    = assemble.options;
  var _        = require('lodash');

  var configData = grunt.config.process(grunt.config.data);
  var data = grunt.file.expand(configData.assemble.options.data);

  var localContext = data.map(function(src) {
    return _.extend({}, configData, src);
  });

  // console.log(localContext);

  /**
   * {{include}}
   */
  exports.include = function(context) {
    console.log(pages);
    var template = Handlebars.compile(context);
    context = _.extend({}, this, localContext, opts);
    return new Handlebars.SafeString(template(context));
  };


  for (var helper in exports) {
    if (exports.hasOwnProperty(helper)) {
      Handlebars.registerHelper(helper, exports[helper]);
    }
  }
};



