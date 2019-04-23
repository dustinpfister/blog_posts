let express = require('express'),
//klaw = require('klaw'),
//through2 = require('through2'),
//fs = require('fs-extra'),
path = require('path');

let klawAll = require('../../../cli/klaw-readall/index.js').klawAll;

//dir_posts = '../../../_posts';

let router = module.exports = express.Router();

router.use(require('body-parser').json());

router.post('*', (req, res) => {

    let ct = 0,
    total = 0,
    posts = [];
    klawAll({

        forPost: (item, next) => {

            let match = item.md.match(new RegExp(req.body.keyword, 'gi'));

            if (match) {
                console.log(item.fn, match.length);
                posts.push({
                    fn: item.fn,
                    count: match.length
                });
            }
            ct += 1;
            next();
        },

        onDone: () => {
            console.log('done with request for posts');
            res.json({
                foo: 'bar',
                body: req.body,
                posts: posts.sort((a, b) => {
                    if (a.count < b.count) {
                        return 1;
                    }
                    if (a.count > b.count) {
                        return -1;
                    }
                    return 0;
                })
            });
        }

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
