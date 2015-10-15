module.exports = function(grunt) {
  grunt.config.set('svgzr', {
    dist: {
      options: {
        templateFileSvg: './tasks/templates/svg_to_sass_sass.mst',
        files: {
          cwdSvg: 'source/svgs/'
        },
        prefix: '',
        encodeType: 'base64',
        svg: {
          destFile: 'source/sass/_icons.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-svgzr');
};
