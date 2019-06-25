let path = require('path');

module.exports = (opt) => {

    opt = opt || {};
    opt.dir_cli = opt.dir_cli || './';
    opt.app = opt.app || {};

    klawAll = require(path.join(opt.dir_cli, 'klaw-readall', 'index.js')).klawAll;

    return (req, res, next) => {

        let report = res.report = {},
        now = new Date(),
        days_back = opt.app.get('days_back');

        console.log('klawing posts:');
        klawAll({
            forPost: (item, nextPost) => {
                console.log(item.header.title.substr(0, 30).padEnd(30, '.'), item.header.date);

                // the publish date
                let date = new Date(item.header.date),
                update = new Date(item.header.updated),
                y = date.getFullYear(),
                m = date.getMonth();

                let key = y + '-' + (m + 1);
                let month = report[key] = report[key] ? report[key] : {};
                month.key = key;
                month.wc = month.wc ? month.wc += item.wc : item.wc;
                month.pc = month.pc === undefined ? 0 : month.pc;
                month.fresh = month.fresh === undefined ? 0 : month.fresh;
                month.posts = month.posts === undefined ? [] : month.posts;

                let days = (now - update) / 1000 / 60 / 60 / 24,
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

                nextPost();
            },
            onDone: () => {

                console.log('done klawing posts:');
                console.log('months: ' + Object.keys(res.report).length);
                // next middleware
                next();
            }
        });

    };

};
