let express = require('express'),
path = require('path'),
app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);

app.set('days_back', 90);

let dir_cli = path.resolve('../../cli'),
dir_posts = path.resolve('../../../_posts'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

app.get('/', (req, res) => {

    let report = {},
    now = new Date(),
    days_back = app.get('days_back');

    klawAll({
        forPost: (item, next) => {
            console.log(item.header.date, item.wc);

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

            let days = (now - update) / 1000 / 60 / 60 / 24,
            fresh = (days_back - days) / days_back;
            if (fresh < 0) {
                fresh = 0;
            }

            // month fresh
            month.fresh += fresh;
            // post count
            month.pc += 1;

            next();
        },
        onDone: () => {
            let arr = [];
            Object.keys(report).forEach((key) => {

                let month = report[key];
                month.freshPer = month.fresh / month.pc;

                arr.push(month);
            });
            arr.sort((a, b) => {
                if (a.freshPer > b.freshPer) {
                    return -1;
                }
                if (a.freshPer < b.freshPer) {
                    return 1;
                }
                return 0;
            });
            res.json(arr);
        }
    });

});

app.listen(app.get('port'), () => console.log('Fresh by month is up on Port: ' + app.get('port')));
