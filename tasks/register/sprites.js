/**
 * Register for run sprite task
 * @author Cristian De la Hoz - me@yocristian.com
 */

module.exports = function(grunt) {
  grunt.registerTask('sprites', ['sprite', 'sass_globbing:dev', 'notify:sprites']);
};
