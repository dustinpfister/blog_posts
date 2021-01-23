let path = require('path');
let dirs = require( path.join(__dirname, '../../paths/index.js') ).createDirObject(__dirname);
let header = require( path.join(dirs.cli_folder, 'header/header.js') ),
fs = require('fs');

module.exports = {
  forPost: function(item, next){
    fs.readFile(item.path, 'utf8', (e, text) => {
      item.text='';
      item.header={};
      if(text){
        item.text = text;
        item.header = header.get(text);
      }
      console.log(item);
      next();
    });
  }
};