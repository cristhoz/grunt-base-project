module.exports = function(grunt) {
  grunt.config.set('concat', {
    extend: {
      options: {
        banner: '(function(Core) {\r\'use strict\';\r',
        separator: '\r',
        footer: '})(Core);'
      },
      src: [ 'source/js/core/extend/**/*.js' ],
      dest: '.js-cache/core.extend.js'
    },
    core_extend:  {
      src: [ 'source/js/core/core.js', '.js-cache/core.extend.js' ],
      dest: '.js-cache/core_and_extend.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
};
