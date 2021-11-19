let express = require('express'),
path = require('path'),
app = express();

let trimEmpty = (arr) => {
    return arr.reduce((acc, el)=>{
        if(el != ''){
           acc.push(el);
        }
        return acc;
    }, []);
};

app.set('port', process.argv[2] || process.env.PORT || 8070);


// hosting static assets for the client system
//app.use('/js', express.static('public/js'));
//app.use('/', express.static('public/html'));

app.get(/\d{4}\/\d{2}\/\d{2}/, (req, res) => {

   console.log(trimEmpty( req.url.split('/') ));

   res.end('okay');
});

app.listen(app.get('port'), () => {
 console.log('editor is up on port: ' + app.get('port'));
});
