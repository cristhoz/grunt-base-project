/**
 * Run all task by default include:
 *   _ JavaScript's (Core.js - App.js - Others).
 *   _ ES6 - Babel
 *   _ Sass
 *   _ Handlebars
 * @author Cristian De la Hoz - me@yocristian.com
 */

module.exports = function(grunt) {
  grunt.registerTask('default', ['watch']);
};
