let express = require('express'),
app = express();

app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);

// use a static /js folder in public for client code
app.use('/js', express.static('public/js'));

app.use('/search', require('./middleware/search.js'));

// The / Path GET requests
app.get('/', (req, res) => {
    res.render('index', {});
});

// listen on the set value for port
app.listen(app.get('port'), () => console.log('Keyword search is up on Port: ' + app.get('port')));
