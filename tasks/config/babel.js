module.exports = function(grunt) {
  grunt.config.set('babel', {
    options: {
      sourceMap: true
    },
    dist: {
      files: {
        'dist/app.js': 'source/js/**/*.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-babel');
};
