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
                        fresh: fresh
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
        (req, res, next) => {

            console.log('sorting');
            // to array
            let arr = [];
            Object.keys(res.report).forEach((key) => {
                let month = res.report[key];
                month.freshPer = month.fresh / month.pc;

                // sort posts
                month.posts.sort((a, b) => {
                    if (a.fresh > b.fresh) {
                        return -1;
                    }
                    if (a.fresh < b.fresh) {
                        return 1;
                    }
                    return 0;

                });

                arr.push(month);
            });

            // sort by fresh percent
            arr.sort((a, b) => {
                if (a.freshPer > b.freshPer) {
                    return -1;
                }
                if (a.freshPer < b.freshPer) {
                    return 1;
                }
                return 0;
            });

            res.report = arr;
            next();

        },

        // send report
        (req, res) => {

            let html = '';

            res.report.forEach((month, i) => {

                html += '<ul>';
                html += '<li><h2>' + (i + 1) + ') ' + month.key + '</h2><\/li>';
                html += '<li><h3>Fresh Per: ' + Math.round(month.freshPer * 100) + '%<\/h3><\/li>';
                html += '<li> Fresh / Post Count: ' + month.fresh.toFixed(2) + '/' + month.pc + '<\/li>';
                html += '<li> Word Count: ' + month.wc + '<\/li>';
                html += '<\/ul>';

                html += '<ul>';
                month.posts.forEach((post) => {
                    html += '<li>' + post.fn + ':' + Math.round(post.fresh * 100) + '; <\/li>'
                });
                html += '<\/ul><hr>';

            });

            res.send(html);
            console.log('sent html');
        }

    ]);

app.listen(app.get('port'), () => console.log('Fresh by month is up on Port: ' + app.get('port')));
