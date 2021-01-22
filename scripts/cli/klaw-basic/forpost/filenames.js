let path = require('path');

module.exports = {
  forPost: function(item, next){
    console.log('**********');
    console.log(path.basename(item.path));
    next();
  }
};