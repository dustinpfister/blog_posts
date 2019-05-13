let express = require('express'),
path = require('path'),
app = express();

//app.set('dir', path.join(process.cwd(), '_posts'));
app.set('dir', path.join('../../../', '_posts'));
app.set('fn', null);

app.set('encode', 'utf8');
app.set('port', process.argv[2] || process.env.PORT || 8080);
app.set('dir_mw', path.resolve('./middleware'))

// hosting static assets for the client system
app.use('/js', express.static('public/js'));
app.use('/', express.static('public/html'));

// html of current md file
app.use('/html', require(path.join(app.get('dir_mw'), 'md_html.js')));

// body parser
app.use(require('body-parser').json());

// actions
app.post('/action',
    [
        // check body
        require(path.join(app.get('dir_mw'), 'body_check.js')),
        // preform action
        require(path.join(app.get('dir_mw'), 'action.js')),
        // something went wrong
        (req, res, next) => {
            res.reply.mess = 'YIKES something went wrong';
            res.status(400).json(res.reply);
        }
    ]);

app.listen(app.get('port'), () => console.log('editor is up on port: ' + app.get('port')));
