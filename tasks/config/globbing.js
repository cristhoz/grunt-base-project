module.exports = function(grunt) {
  grunt.config.set('sass_globbing', {
    dev: {
      files: {
        'source/sass/partials/_sprites.scss': 'source/sass/partials/sprites/**/*.scss'
      },
      options: {
        useSingleQuotes: false,
        signature: false
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass-globbing');
};
