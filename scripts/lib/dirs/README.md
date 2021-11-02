# paths

A simple script to get all paths relevant to the blog_posts repo.

## To get paths.js I still need to make sure I require it into a script the right way

The first and for most thing about this is that I still need to require in the script the right way. To do so I need to use the path join method with the path to the local script along with a relative path to the index file of this paths module. After that I will want to call the createDirObject method and when doing so make sure to pass the local \_\_dirname value for the local script, else the paths module will default to the value for the paths module rather than the local script which would be wrong.

```js
let path = require('path'),
dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);
```

In order to get this file that helps create and return a standard object of all paths that I will want, I still need to be able to do that the right way. The path.join method of the path built in module must be used with \_\_dirname, and the proper relative path to get this script from another script.

```js
let path = require('path'),
dirs = require( path.join(__dirname, '../paths/index.js') ).createDirObject(__dirname);
 
console.log('cwd: ', dirs.cwd );                      // current working dir
console.log('blog_root: ', dirs.blog_root );          // the root of the blog_root project folder
console.log('this_script: ', dirs.this_script );      // path to this script
console.log('script_folder: ', dirs.script_folder );  // path to the script folder
console.log('app_folder: ', dirs.app_folder );        // path to the app folder
console.log('cli_folder: ', dirs.cli_folder );        // path to the cli folder
console.log('dirs.posts: ', dirs.posts );             // path to the posts folder
```