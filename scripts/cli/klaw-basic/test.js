let klawPosts = require('./index').klawPosts;

klawPosts({
    forPost: function (item, next) {
        console.log(require('path').basename(item.path,'.md'));
        next();
    }
});
