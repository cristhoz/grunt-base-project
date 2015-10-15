module.exports = function(grunt) {
  var config = grunt.file.readJSON('./tasks/config.json');

  var files = {};
  files[config.dist_folder + '/css/style.css'] = config.src_folder + '/sass/style.scss';

  //require('../routes.js')('sass', 'object');

  grunt.config.set('sass', {
    dev: {
      options: {
        sourcemap: 'none',
        style: 'compressed'
      },
      files: files
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
};
