module.exports = function(grunt) {
  grunt.config.set('postcss', {
    options: {
      map: false,
      processors: [
        //require('pixrem')(), // add fallbacks for rem units
        require('autoprefixer')({browsers: 'last 5 versions'}), // add vendor prefixes
        require('cssnano')() // minify the result
      ]
    },
    dist: {
      src: 'assets/css/style.css'
    }
  });

  grunt.loadNpmTasks('grunt-postcss');
};
