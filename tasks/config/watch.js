module.exports = function(grunt) {
  grunt.config.set('watch', {
    //js_core: {
    //  files: ['source/js/core/**/*.js'],
    //  tasks: ['concat:extend', 'concat:core_extend', 'uglify:core', 'notify:js_core']
    //},
    //js_app: {
    //  files: ['source/js/app/**/*.js'],
    //  tasks: ['uglify:app', 'notify:js_app']
    //},
    handlebars: {
      files: ['source/handlebars/**/*.handlebars'],
      tasks: ['handlebars:compile', 'uglify:templates', 'notify:handlebars']
    },
    sass: {
      files: ['source/sass/**/*.scss'],
      tasks: ['sass', 'notify:sass']
    },
    sprites: {
      files: ['source/sprites/*.png'],
      tasks: ['sprite:all', 'notify:sprites']
    },
    svgs: {
      files: ['source/svgs/*.svg'],
      tasks: ['svgzr:dist', 'notify:svgs']
    },
    babel: {
      files: ['source/js/**/*'],
      tasks: ['babel']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
};
