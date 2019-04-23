let express = require('express'),
klaw = require('klaw'),
through2 = require('through2'),
fs = require('fs-extra'),
path = require('path'),

dir_posts = '../../../_posts';

let router = module.exports = express.Router();

router.post('*', (req, res) => {

    res.json({
        foo: 'bar'
    });

});

/*
opt_defaults = {
dir_posts: '../../../_posts',
forPost: function (item, next) {
console.log(item.path);
next();
},
onDone: function () {}
};

let klawPosts = (opt) => {
opt = Object.assign({}, opt_defaults, opt || {});
klaw(opt.dir_posts)
.on('end', () => {
opt.onDone();
})
.pipe(through2.obj((item, enc, next) => {
if (item.stats.isFile() && path.extname(item.path).toLowerCase() === '.md') {
this.push(item);
}
next();
}))
.pipe(through2.obj((item, enc, next) => {
opt.forPost(item, next)
}));
};

exports.search = (keyword, cb) => {
klawPosts({
onDone: () => {
cb();
},
forPost: (item, next) => {
console.log(item);
next();
}
});
};
*/
