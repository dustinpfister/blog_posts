let express = require('express'),
path = require('path'),
app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);

app.set('days_back', 365 * 2);

let dir_cli = path.resolve('../../cli'),
dir_posts = path.resolve('../../../_posts'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

app.get('/', [

        // get data for all files
        (req, res, next) => {

            let report = res.report = {},
            now = new Date(),
            days_back = app.get('days_back');

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

        },

        // create an array, and sort by fresh percent
        require('./middleware/sort_by_fresh.js'),
        // send html
        require('./middleware/send_html.js')

    ]);

app.listen(app.get('port'), () => console.log('Fresh by month is up on Port: ' + app.get('port')));
