let express = require('express'),
path = require('path'),
fs = require('fs'),
app = express();


app.set('port', process.argv[2] || process.env.PORT || 8070);

app.set('dir_posts', path.join(__dirname, '../../../_posts'));


// hosting static assets for the client system
//app.use('/js', express.static('public/js'));
//app.use('/', express.static('public/html'));

let trimEmpty = (arr) => {
    return arr.reduce((acc, el)=>{
        if(el != ''){
           acc.push(el);
        }
        return acc;
    }, []);
};
// get for a path like /2021/10/11/foo-post/index.html
app.get(/\d{4}\/\d{2}\/\d{2}/, (req, res) => {
   // gat an array like ['2021', '10', '11', 'foo-post', 'index.html']
   let folderNames = trimEmpty(req.url.split('/'));
   let fileName = folderNames[3] || null;
   // if we have a file name
   if(fileName){
       let uri = path.join(app.get('dir_posts'), fileName + '.md');
       // read the fileName at the _posts folder
       fs.readFile(uri, 'utf8', (e, text_md) => {
           if(e){
               res.end(e.message);
           }else{
               res.end( text_md );
           }
       });
   }else{
       res.end('Must give a file name');
   }

});

app.listen(app.get('port'), () => {
 console.log('editor is up on port: ' + app.get('port'));
});
