/**
 * Run All task for convert SVG's to Base64 append in file for SASS
 * @author Cristian De la Hoz - me@yocristian.com
 */

module.exports = function(grunt) {
  grunt.registerTask('svg2sass', ['svgzr:dist', 'notify:svgs']);
};
