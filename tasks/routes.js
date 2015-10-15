var config = require(__dirname + '/config.json');

module.exports = function(req, type) {
  console.log(config[req]);
  console.log(req, type);

  //sassFiles: mappingFiles(files.sass)
};
