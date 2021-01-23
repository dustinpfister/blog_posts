// paths
let path = require('path');
let dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);

// header lib
let header = require( path.join(dirs.this_script, 'header.js') );

// file system, and options
let fs = require('fs'),
postName = process.argv[2] || 'canvas-example-animation-basics',
fileName = postName + '.md';

// read the post, and spit out the header in the standard output
let uri_post = path.join(dirs.posts, fileName);
fs.readFile(uri_post, 'utf8', (e, text) => {
    if(e){
        console.log(e);
    }else{
        //var headerObj = header.get(text)
        console.log(JSON.stringify(header.get(text)));
    }
});
