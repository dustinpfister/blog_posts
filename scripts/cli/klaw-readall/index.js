let getId = require('../next-id').getId,
fs = require('fs-extra'),
path = require('path'),
klawPosts = require('../klaw-basic').klawPosts;

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

                    opt.forPost(item, () => {

                        // if ct === nextId then we are done for real
                        if (ct === nextId) {

                            opt.onDone();

                        } else {
                            next();
                        }

                    })

                });

            }

        })

    });

};

klawAll({

    forPost: (item, next) => {

        console.log(path.basename(item.path))

        next();

    },

    onDone: () => {
        console.log('done');
    }

});
