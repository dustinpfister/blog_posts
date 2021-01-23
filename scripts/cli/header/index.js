
// paths
let path = require('path');
let dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);

// header lib
let header = require( path.join(dirs.this_script), 'header.js' );


let fs = require('fs'),
postName = process.argv[2] || 'canvas-example-animation-basics',
fileName = postName + '.md';

let uri_post = path.join(dirs.posts, fileName);
fs.readFile(uri_post, 'utf8', (e, data) => {

    if(e){
        console.log(e);
    }else{
        console.log(data);
    }

});