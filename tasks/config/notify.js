module.exports = function(grunt) {
  grunt.config.set('notify', {
    js_core: {
      options: {
        title: 'JS files built',
        message: 'Core.js task completed'
      }
    },
    js_app: {
      options: {
        title: 'JS files built',
        message: 'App.js task completed'
      }
    },
    handlebars: {
      options: {
        title: 'HTML files built',
        message: 'Handlebars task completed'
      }
    },
    sass: {
      options: {
        title: 'CSS files built',
        message: 'SASS task completed'
      }
    },
    sprites: {
      options: {
        title: 'CSS files built',
        message: 'Sprites task completed'
      }
    },
    svgs: {
      options: {
        title: 'CSS files built',
        message: 'SVGs task completed'
      }
    },
    webfont: {
      options: {
        title: 'CSS files built',
        message: 'Icons webfont task completed'
      }
    }
  });

  grunt.loadNpmTasks('grunt-notify');
};
