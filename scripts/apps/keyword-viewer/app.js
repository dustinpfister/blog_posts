let express = require('express'),
app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);

app.get('/', [
        require('./middleware/list_all.js'),
        (req, res) => {
            res.render('index', {
                filenames: req.filenames
            });
        }
    ]);

app.get('/blog_post/:postname', [
        require('./middleware/process_post.js'),
        (req, res) => {
            res.render('blog_post', req.data);
        }
    ]);

app.listen(app.get('port'), () => console.log('Keyword viewer is up on Port: ' + app.get('port')));
