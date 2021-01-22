let klaw = require('klaw'),
through2 = require('through2'),
path = require('path'),

opt_defaults = {
    dir_posts: '../../../_posts',
    dir_posts: path.join(__dirname, '../../../_posts'),
    forPost: function (item, next) {
        console.log(item.path);
        next();
    },
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
    // call klaw files
    klawPosts();
} else {
    // else export
    exports.klawPosts = klawPosts;
}
