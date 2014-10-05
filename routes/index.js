
/*
 * GET home page.
 */
var crypto = require('crypto');
var server = require('../server.js');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.generateId = function(req, res){
  var id;
  while(!id || server.instances.hasOwnProperty(id)){
    id = randomAsciiString(10);
  }
  res.json({ id : id });
}

/** Sync */
var randomAsciiString = function(length) {
  var chars = 'abcdefghijklmnopqrstuwxyzABCDEFGHIJKLMNOPQRSTUWXYZ0123456789';
  if(!chars) {
      throw new Error('Argument \'chars\' is undefined');
  }

  var charsLength = chars.length;
  if(charsLength > 256) {
      throw new Error('Argument \'chars\' should not have more than 256 characters'
          + ', otherwise unpredictability will be broken');
  }

  var randomBytes = crypto.randomBytes(length)
  var result = new Array(length);

  var cursor = 0;
  for (var i = 0; i < length; i++) {
      cursor += randomBytes[i];
      result[i] = chars[cursor % charsLength]
  };

  return result.join('');
}