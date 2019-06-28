let express = require('express'),
path = require('path'),
app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('port', process.env.PORT || process.argv[2] || 8080);

app.set('days_back', 365 * 2);

let dir_cli = path.resolve('../../cli'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

app.use('/css', express.static('./public/css'));

app.get('/', [
        // get posts
        require('./middleware/get_posts.js')({
            dir_cli: dir_cli,
            app: app
        }),
        // create an array, and sort by fresh percent
        require('./middleware/sort_by_fresh.js'),
        // send html
        require('./middleware/send_html.js')

    ]);

app.get('/beta', (req, res) => {
    res.render('index', {
        title: 'fresh by month',
        layout: 'home',
        report: []
    });
});

app.get('/beta/all', [
        // get posts
        require('./middleware/get_posts.js')({
            dir_cli: dir_cli,
            app: app
        }),
        // create an array, and sort by fresh percent
        require('./middleware/sort_by_fresh.js'),
        // send html
        (req, res) => {
            res.render('index', {
                title: 'fresh by month',
                layout: 'report',
                report: res.report
            });
        }

    ]);

app.listen(app.get('port'), () => console.log('Fresh by month is up on Port: ' + app.get('port')));
