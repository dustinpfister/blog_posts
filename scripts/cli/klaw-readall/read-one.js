// read single file
let fs = require('fs-extra'),
path = require('path');

let dir_posts = '../../../_posts';

let filename = 'express-middleware-example-keyword-viewer.md'; // 'lodash-find.md';

fs.readFile(path.join(dir_posts, filename), 'utf8')

.then((text) => {

   // this pattern should work well
   console.log(text.match(/---[\s|\S]*?---/)[0])

})
