let express = require('express'),
path = require('path'),
app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.set('port', process.env.PORT || process.argv[2] || 8080);

app.set('days_back', process.argv[3] || 365 * 2);
app.set('year_start', 1983);
app.set('year_end', 2053);

let dir_cli = path.resolve('../../cli'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

app.use('/css', express.static('./public/css'));

app.get('*', (req, res, next) => {

    console.log(req.query);

    app.set('days_back', req.query.d || app.get('days_back'));
    app.set('year_start', req.query.ys || app.get('year_start'));
    app.set('year_end', req.query.ye || app.get('year_end'));

    next();

});

app.get('/', (req, res) => {
    res.render('index', {
        title: 'fresh by month',
        layout: 'home',
        report: []
    });
});

app.get('/all', [
        // get posts
        require('./middleware/get_posts.js')({
            dir_cli: dir_cli,
            app: app
        }),
        // create an array, and sort by fresh percent
        //require('./middleware/sort_by_fresh.js'),
        // send html
        (req, res) => {
            res.render('index', {
                title: 'fresh by month',
                layout: 'report',
                report: res.report,
                getFreshClassName: (fresh) => {
                    let cn = 'fresh_0';
                    cn = fresh >= 0.25 ? 'fresh_25' : cn;
                    cn = fresh >= 0.50 ? 'fresh_50' : cn;
                    cn = fresh >= 0.75 ? 'fresh_75' : cn;
                    return cn;
                },
                getWcClassName: (wc) => {
                    let cn = 'wordcount_0';
                    cn = wc >= 500 ? 'wordcount_500' : cn;
                    cn = wc >= 1000 ? 'wordcount_1000' : cn;
                    cn = wc >= 1800 ? 'wordcount_1800' : cn;
                    return cn;
                }
            });
        }

    ]);

app.listen(app.get('port'), () => console.log('Fresh by Cat is up on Port: ' + app.get('port')));
