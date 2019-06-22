let path = require('path'),
genMap = require('./lib/genmap.js'),
dir_posts = path.resolve('../../../_posts');

genMap.fromPosts({
    dir_posts: dir_posts
})

.then(() => {

    console.log('done');

})
