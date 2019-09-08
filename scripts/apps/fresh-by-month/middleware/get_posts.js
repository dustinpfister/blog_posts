let path = require('path');

module.exports = (opt) => {

    opt = opt || {};
    opt.dir_cli = opt.dir_cli || './';
    opt.app = opt.app || {};

    klawAll = require(path.join(opt.dir_cli, 'klaw-readall', 'index.js')).klawAll;

    return [

        // walk file system
        (req, res, next) => {

            let report = res.report = {},
            now = new Date(new Date() - new Date().getTimezoneOffset() * 60 * 1000),
            days_back = opt.app.get('days_back'),
            sy = opt.app.get('year_start') || 2017,
            ey = opt.app.get('year_end') || 2017;

            console.log('klawing posts:');
            klawAll({
                forPost: (item, nextPost) => {

                    // the publish date
                    let date = new Date(item.header.date),
                    update = new Date(item.header.updated),
                    y = date.getFullYear(),
                    m = date.getMonth(),
                    t = now - update;

                    console.log(item.header.title.substr(0, 30).padEnd(30, '.'), item.header.updated, t);

                    if (y >= sy && y <= ey) {

                        let key = y + '-' + (m + 1);
                        let month = report[key] = report[key] ? report[key] : {};
                        month.key = key;
                        month.wc = month.wc ? month.wc += item.wc : item.wc;
                        month.pc = month.pc === undefined ? 0 : month.pc;
                        month.fresh = month.fresh === undefined ? 0 : month.fresh;
                        month.posts = month.posts === undefined ? [] : month.posts;

                        let days = t / 1000 / 60 / 60 / 24,
                        fresh = (days_back - days) / days_back;
                        if (fresh < 0) {
                            fresh = 0;
                        }

                        month.posts.push({
                            fn: item.fn,
                            header: item.header,
                            fresh: fresh,
                            wc: item.wc
                        });

                        // month fresh
                        month.fresh += fresh;
                        // post count
                        month.pc += 1;

                    }

                    nextPost();
                },
                onDone: () => {

                    console.log('done klawing posts:');
                    console.log('months: ' + Object.keys(res.report).length);
                    // next middleware
                    next();
                }
            });

        },

        // built cat object
        (req, res, next) => {
            Object.keys(res.report).forEach((key) => {
                let month = res.report[key];
                month.cats = {};
                month.posts.forEach((post) => {
                    let catName = post.header.categories;
                    if (typeof catName === 'string') {
                        month.cats[catName] = month.cats[catName] == undefined ? 1 : month.cats[catName] += 1;
                    }
                });
            });
            next();
        }

    ];

};
