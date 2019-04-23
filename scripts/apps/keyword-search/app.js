let express = require('express'),
app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);

app.get('/', (req, res) => {
    res.render('index', {});
});

app.listen(app.get('port'), () => console.log('Keyword viewer is up on Port: ' + app.get('port')));
