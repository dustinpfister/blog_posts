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
            days_back = opt.app.get('days_back');

            klawAll({
                forPost: (item, nextPost) => {

                    // the publish date
                    let date = new Date(item.header.date),
                    update = new Date(item.header.updated),
                    cat = item.header.categories,
                    y = date.getFullYear(),
                    m = date.getMonth(),
                    t = now - update;

                    //console.log(item.header.title.substr(0, 30).padEnd(30, '.'), item.header.updated, t);

                    let catPosts = report[cat] = report[cat] || [];

                    catPosts.push({

                        title: item.header.title

                    })

                    let days = t / 1000 / 60 / 60 / 24,
                    fresh = (days_back - days) / days_back;
                    if (fresh < 0) {
                        fresh = 0;
                    }
					
					//console.log(catPosts);

                    nextPost();
                },
                onDone: () => {

                    console.log('done klawing posts:');
                    // next middleware
                    next();
                }
            });

        }

    ];

};
