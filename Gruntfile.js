var fs = require('fs');

module.exports = function(grunt) {

  /**
   * Get files name in a directory
   * @param  {String} dir location of files
   * @return {Object}     name files of obtained
   */
  function getFiles(dir) {
    var files = fs.readdirSync(dir)
    var res = {};

    files.forEach(function(el) {
      if(/(\w)\.js$/.test(el)) {
        res[el.substring(el.length - 3, 0)] = dir + el;
      }
    });

    return res;
  };

  /**
   * Requiere files
   * @param  {Object} files names files for invoke
   */
  function invokeFiles(files) {
    for(var file in files) {
      if(files.hasOwnProperty(file)) {
        require(files[file])(grunt);
      }
    }
  };

  var getConfigs = getFiles('./tasks/config/');
  var getRegisters = getFiles('./tasks/register/');

  invokeFiles(getConfigs);
  //invokeFiles(getRegisters);

  grunt.registerTask('default', ['watch']);
};
