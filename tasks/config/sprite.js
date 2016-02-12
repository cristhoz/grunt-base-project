var fs = require('fs');
var path = require('path');
var handlebars = require('handlebars');

var config = {};
var template;

/**
 * Get all folders names
 * @param   {string} srcpath Path name for loaded
 * @returns {Array}
 */
var directories = function(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}('./source/sprites/');

/**
 * Get and compile template
 * @param {string} src Source path template
 */
var loadTemplate = function(src) {
  fs.readFile(src, 'utf-8', function(error, source) {
    template = handlebars.compile(source);
  });
}('./tasks/templates/sprite_sass.handlebars');

directories.forEach(function(el) {
  config[el] = {
    src: 'source/sprites/' + el + '/*.png',
    dest: 'assets/images/s_' + el + '.png',
    destCss: 'source/sass/sprites/_sprites_' + el + '.scss',
    algorithm: 'binary-tree',
    cssTemplate: function (data) {
      var view = {
        title: el,
        image_name: data.items[0].escaped_image.substring(data.items[0].escaped_image.indexOf(el) - 2),
        sprites: data.items
      };

      return template(view);
    },
    padding: 0
  };
});

module.exports = function(grunt) {
  grunt.config.set('sprite', config);

  grunt.loadNpmTasks('grunt-spritesmith');
};
