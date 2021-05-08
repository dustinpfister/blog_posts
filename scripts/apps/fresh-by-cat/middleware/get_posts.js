let path = require('path');

module.exports = (opt) => {

    opt = opt || {};
    opt.dir_cli = opt.dir_cli || './';
    opt.app = opt.app || {};

    klawAll = require(path.join(opt.dir_cli, 'klaw-readall', 'index.js')).klawAll;

    return [

        // walk file system and get post data
        (req, res, next) => {

            let report = res.report = {
                cats: []
            },
            cats = report.cats,
            now = new Date(new Date() - new Date().getTimezoneOffset() * 60 * 1000),
            days_back = opt.app.get('days_back');

            klawAll({
                forPost: (item, nextPost) => {

                    // the publish date
                    let date = new Date(item.header.date),
                    update = new Date(item.header.updated),
                    catName = item.header.categories,
                    y = date.getFullYear(),
                    m = date.getMonth(),
                    t = now - update;

                    console.log(item.header.title.substr(0, 30).padEnd(30, '.'), item.header.updated, t);

                    let cat = cats.find((c) => {

                            return c.catName === catName;

                        });

                    if (!cat) {
                        cat = {
                            catName: catName,
                            posts: [],
                            wc: 0
                        };
                        cats.push(cat);
                    }

                    let days = t / 1000 / 60 / 60 / 24,
                    fresh = (days_back - days) / days_back;
                    if (fresh < 0) {
                        fresh = 0;
                    }

                    cat.posts.push({
                        fn: item.fn,
                        title: item.header.title,
                        fresh: fresh,
                        linkCount: item.linkObjects.length,
                        wc: item.wc
                    });
                    cat.wc += item.wc;

                    nextPost();
                },
                onDone: () => {

                    console.log('done klawing posts:');
                    // next middleware
                    next();
                }
            });

        },

        // tabulate cat.fresh
        (req, res, next) => {
            res.report.cats.forEach((cat) => {
                cat.fresh = 0;
                cat.posts.forEach((post) => {
                    cat.fresh += post.fresh;
                });
                cat.fresh /= cat.posts.length;
            })
            next();
        }

    ];

};
