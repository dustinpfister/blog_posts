let path = require('path');

module.exports = function (opt) {

    opt = opt || {};
    opt.dir_posts = opt.dir_posts || path.resolve('../../../_posts');

    console.log('building from posts at : ' + opt.dir_posts);

};
