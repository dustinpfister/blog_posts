let express = require('express'),
path = require('path'),
app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);

//app.set('dir_cli', path.resolve('../../cli'));

let dir_cli = path.resolve('../../cli'),
dir_posts = path.resolve('../../../_posts'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

app.get('/', (req, res) => {

    let report = {},
    now = new Date();

    klawAll({
        forPost: (item, next) => {
            console.log(item.header.date, item.wc);

            // the publish date
            let date = new Date(item.header.date),
            y = date.getFullYear(),
            m = date.getMonth();

            let key = y + '-' + (m + 1);
            let month = report[key] = report[key] ? report[key] : {};
            month.wc = month.wc ? month.wc += item.wc : item.wc;

            next();
        },
        onDone: () => {
            res.json(report);
        }
    });

});

app.listen(app.get('port'), () => console.log('Fresh by month is up on Port: ' + app.get('port')));
