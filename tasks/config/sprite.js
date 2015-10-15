module.exports = function(grunt) {
  grunt.config.set('sprite', {
    all: {
      src: 'source/sprites/**/*.png',
      dest: 'assets/images/sp_all_site.png',
      destCss: 'source/sass/_sprites.scss',
      cssTemplate: './tasks/templates/sprite_sass.handlebars',
      algorithm: 'binary-tree',
      padding: 10
    }
  });

  grunt.loadNpmTasks('grunt-spritesmith');
};
