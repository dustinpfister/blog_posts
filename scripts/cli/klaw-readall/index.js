
let fs = require('fs-extra'),
path = require('path'),
klawPosts = require('../klaw-basic').klawPosts,
getId = require('../next-id').getId,

header = require('./header'),
wc = require('./wc'),

opt_defaults = {
    dir_posts: process.argv[2] || '../../../_posts',
    forPost: function (item, next) {
        console.log(item.path);
        next();
    },
    onDone: function () {}
};

let klawAll = (opt) => {

    opt = Object.assign({}, opt_defaults, opt || {});

    getId().then((nextId) => {

        let ct = 0;

        // using klaw-basic
        klawPosts({
            dir_posts: opt.dir_posts,
            forPost: (item, next) => {

                ct += 1;

                fs.readFile(item.path)

                .then((data) => {

                    let md = data.toString();

                    item.md = header.remove(md);
                    item.header = header.get(md);
                    item.wc = wc.getWC(item.md);

                    opt.forPost(item, () => {

                        // if ct === nextId then we are done for real
                        if (ct === nextId) {

                            opt.onDone();

                        } else {
                            next();
                        }

                    })

                })

                .catch ((e) => {

                    console.log(e.message);
                    next();
                })

            }

        })

    });

};

klawAll({

    forPost: (item, next) => {

        console.log(item.header.title, item.wc);

        next();

    },

    onDone: () => {
        console.log('done');
    }

});
