/**
 * Run all task for convert SVGs icons to Webfonts
 * @author Cristian De la Hoz - me@yocristian.com
 */

module.exports = function(grunt) {
  grunt.registerTask('svg2iconFont', ['webfont', 'notify:webfont']);
};
