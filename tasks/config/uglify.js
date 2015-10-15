module.exports = function(grunt) {
  grunt.config.set('uglify', {
    templates: {
      options: { sourceMap: false },
      src: '.js-cache/app.templates.js',
      dest: 'assets/js/app/app.templates-min.js'
    },
    core: {
      options: {
        sourceMap: true,
        drop_console: false
      },
      files: {
        'assets/js/app/app.core-min.js': ['.js-cache/core_and_extend.js'],
        'assets/js/app/app.app-min.js': ['source/js/**/*.js']
      }
    },
    app: {
      options: {
        sourceMap: true,
        drop_console: false
      },
      files: {
        'assets/js/app/app.app-min.js': ['source/js/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};