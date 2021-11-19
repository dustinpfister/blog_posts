let express = require('express'),
path = require('path'),
fs = require('fs'),
marked = require('marked'),
app = express(),
header = require( path.join(__dirname, '../../lib/header/index.js') );


app.set('port', process.argv[2] || process.env.PORT || 8070);

app.set('dir_posts', path.join(__dirname, '../../../_posts'));


// hosting static assets for the client system
app.use('/js', express.static( path.join(__dirname, 'public/js') ));
//app.use('/', express.static('public/html'));

let trimEmpty = (arr) => {
    return arr.reduce((acc, el)=>{
        if(el != ''){
           acc.push(el);
        }
        return acc;
    }, []);
};
// get for a path like /2018/12/10/js-array/index.html
app.get(/\d{4}\/\d{2}\/\d{2}/, (req, res) => {
   // gat an array like ['2018', '12', '10', 'js-array', 'index.html']
   let folderNames = trimEmpty(req.url.split('/'));
   let fileName = folderNames[3] || null;
   // if we have a file name
   if(fileName){
       let uri = path.join(app.get('dir_posts'), fileName + '.md');
       // read the fileName at the _posts folder
       fs.readFile(uri, 'utf8', (e, text_md) => {
           if(e){
               // if error set 500 status and send message
               res.status(500);
               res.end(e.message);
           }else{
               // get header and preform a check with the dates in url compared to header
               let headerObj = header.get(text_md)
               yTest = headerObj.date.getFullYear() === parseInt(folderNames[0]),
               mTest = (headerObj.date.getMonth() + 1) === parseInt(folderNames[1]),
               dTest = headerObj.date.getDate() === parseInt(folderNames[2]);
               // if all goes well send the file with a 200 status
               if(yTest && mTest && dTest){
                   res.status(200);
                   let text_md_clean = header.remove(text_md),
                   html = '<h1>' + headerObj.title + '</h1>';
                   html += marked(text_md_clean);
                   html += '<script src=\"/js/foo.js\"></script>';
                   res.end(html);
               }else{
                   // else we have a 404 event though we have a file becuase the dates in the url
                   // do not match the ones in the header
                   res.status(404);
                   res.end('404: dates in url do not match what is in the file: yyyy: ' + yTest + ' mm: ' + mTest + ' dd: ' + dTest );
               }
           }
       });
   }else{
       // send a 404 if there is no file name folder in the url
       res.status(404);
       res.end('404: No file name given in path');
   }
});

app.listen(app.get('port'), () => {
 console.log('editor is up on port: ' + app.get('port'));
});
