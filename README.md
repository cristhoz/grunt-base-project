#Base for projects
It is a base structure for projects, as GruntJS in task management.

##For Install
__SASS:__ required to be installed before use with GruntJS, here are the instructions to install: [http://sass-lang.com/install](https://github.com/sapegin/grunt-webfont#installation).

__COMPASS:__ for work sass-compass is required install Compass, here are the instructions to install: [http://compass-style.org/install/](http://compass-style.org/install/).

__FONTFORGE:__ required to be installed before use with grunt-webfont, require in svg2iconFont. here are the instructions to install: [https://github.com/sapegin/grunt-webfont#installation](https://github.com/sapegin/grunt-webfont#installation).

##Run register taks

##Changelog
###2.0.0
February 23, 2016

* Multiple sprites images create.
* SVG icons convert in Webfont.
* Compass is supported.
* New folder structures in SCSS files
* Autoprefixer is supported.
* Is modify Grunt.js:
  * Files and folders are organized for this version.
  * The automatic loading for tasks and registers is developed.
  * Config.json is added.

###1.1.2
July 14, 2015

* Change handlebars, concat and uglify for .js-cache
* Task watch.js is optimized.
* `App.models` in `this.send()` is changed
* Editor config is added, more info [editorconfig.org](http://editorconfig.org/)
* Table contents is added in style.scss

###1.1.1
April 27, 2015

* `App.middleware` id added.
* `App.controller` is added.
* `_setTemplate()` is added in `App.views`.
* Task watch.js is optimized.

###1.1.0
April 14, 2015

* Tasks for images sprites is added.
* Task for  convert svg to base64 adding to SASS is supported.
* `debugInfo` is removed in task sass.

###1.0.0
April 6, 2015

* Watching GruntJS is added.
* Is added support to SASS, Handlebars and JavaScript.
* GruntJS configured and structure of the folders.

##Dependecies
* __[Handlebars.js](https://github.com/wycats/handlebars.js/)__ v4.0.2
* __[editorconfig.org](http://editorconfig.org/)__
