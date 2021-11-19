let express = require('express'),
path = require('path'),
app = express();

app.set('port', process.argv[2] || process.env.PORT || 8070);


// hosting static assets for the client system
//app.use('/js', express.static('public/js'));
//app.use('/', express.static('public/html'));

app.get('*', (req, res) => {
   res.end('okay');
});

app.listen(app.get('port'), () => {
 console.log('editor is up on port: ' + app.get('port'));
});
