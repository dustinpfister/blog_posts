let klaw = require('klaw'),
through2 = require('through2'),
path = require('path');

let dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);

let opt_defaults = {
    dir_posts: dirs.posts,
    forPost: require( path.join(__dirname, 'forpost/header.js') ).forPost,
    onDone: function () {}
};

let klawPosts = (opt) => {
    opt = Object.assign({}, opt_defaults, opt || {});
    klaw(opt.dir_posts)
    // when done
    .on('end', function () {
        opt.onDone();
    })
    // if item is a file and is markdown
    .pipe(through2.obj(function (item, enc, next) {
            if (item.stats.isFile() && path.extname(item.path).toLowerCase() === '.md') {
                this.push(item);
            }
            next();
        }))
    .pipe(through2.obj(function (item, enc, next) {
            opt.forPost(item, next)
        }));
};

// if called from CLI
if (require.main === module) {
    var useScript = process.argv[2],
    opt = {};
    if(useScript){
        try{
            opt = require( path.resolve(useScript) );
        }catch(e){
            console.log(e)
            opt = {};
        }
    }

    // call klaw posts
    klawPosts(opt);
} else {
    // else export
    exports.klawPosts = klawPosts;
}
