/**
 * Grunt task for convert SVGs to Webfont
 * @author Cristian De la Hoz - me@yocristian.com
 */

module.exports = function(grunt) {
  grunt.config.set('webfont', {
    icons: {
      src: 'source/icons/*.svg',
      dest: 'assets/fonts',
      destCss: 'source/sass',
      options: {
        font: 'iconsfont',
        fontFilename: 'iconsfont',
        stylesheet: 'scss',
        types: 'woff,ttf',
        relativeFontPath: '../fonts',
        htmlDemoFilename: 'icons_demo',
        destHtml: 'source/icons'
      }
    }
  });

  grunt.loadNpmTasks('grunt-webfont');
};
