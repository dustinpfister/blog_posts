let path = require('path'),
genMap = require('./lib/genmap.js'),
dir_posts = path.resolve('../../../_posts');

//genMap.fromPosts({
//    dir_posts: dir_posts
//});

let opt = {
    figWorth: function (w) {
        this.worth += 1;
    }
}
let section = genMap.sectionFromArray(['foo', 'bar', 'baz'], opt);

console.log(section);
