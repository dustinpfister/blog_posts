# paths

A simple script to get all paths relavent to the blog_posts repo.

## To gets paths.js I still need to make sure I can do that to begin with

In order to get this file that helps create and return a standard object of all paths that I will want, I still need to be able to do that the right way. The path.join method of the path built in module must be used with \_\_dirname, and the proper relative path to get this script from another script.

```js
let path = require('path'),

// from a script at blog_posts/scripts/cli/footool/index.js
console.log('cwd: ', dirs.cwd );                      // current working dir
console.log('blog_root: ', dirs.blog_root );          // the root of the blog_root project folder
console.log('this_script: ', dirs.this_script );      // path to this script
console.log('script_folder: ', dirs.script_folder );  // path to this script
console.log('app_folder: ', dirs.app_folder );        // path to this script
console.log('cli_folder: ', dirs.cli_folder );        // path to this script
console.log('dirs.posts: ', dirs.posts );             // path to this script
```