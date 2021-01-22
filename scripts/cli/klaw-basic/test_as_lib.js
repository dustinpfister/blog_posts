let klawPosts = require('./index').klawPosts;

klawPosts({
    forPost: (item, next) => {
        console.log(require('path').basename(item.path, '.md'));
        next();
    },
    onDone: () => {
        console.log('walk is done');
    }
});
