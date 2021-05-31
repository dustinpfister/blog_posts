let express = require('express'),
path = require('path'),
app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.set('port', process.env.PORT || process.argv[2] || 8000);

app.set('days_back', process.argv[3] || 1500);

let dir_cli = path.join(__dirname, '../../cli'),
klawAll = require(path.join(dir_cli, 'klaw-readall', 'index.js')).klawAll;

app.use('/css', express.static( path.join( __dirname, './public/css') ) );

app.get('*', (req, res, next) => {
    console.log(req.query);
    app.set('days_back', req.query.d || app.get('days_back'));
    next();
});

app.get('/', [
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
                title: 'fresh by cat',
                layout: 'report',
                report: res.report,
                daysBack: app.get('days_back'),
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
                    cn = wc >= 2400 ? 'wordcount_2400' : cn;
                    return cn;
                }
            });
        }

    ]);

app.listen(app.get('port'), () => console.log('Fresh by Cat is up on Port: ' + app.get('port')));
