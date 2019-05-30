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
            req.data = [];
            console.log('klawing posts:');
            klawAll({
                forPost: (item, nextPost) => {
                    req.data.push({
                        wc: item.wc,
                        fn: item.fn,
                        header: item.header
                    });
                    nextPost();
                },
                onDone: () => {
                    next();
                }
            });
        },

        // sort by wc
        (req, res, next) => {
            req.data.sort((a, b) => {
                if (a.wc > b.wc) {
                    return -1;
                }
                if (a.wc < b.wc) {
                    return 1;
                }
                return 0;
            })
            next();
        },

        // send report
        (req, res) => {
            let html = '<table>';

            req.data.forEach((post, i) => {
                let color = 'red';

                color = post.wc >= 500 ? 'orange' : color;
                color = post.wc >= 1000 ? 'green' : color;

                html += '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td style="color:' + color + ';">' + post.wc + '</td>' +
                '<td>' + post.fn + '</td></tr>';

            });
            res.send(html + '</table>');
        }

    ]);

app.listen(app.get('port'), () => console.log('Word Count list is up on Port: ' + app.get('port')));
