# klaw basic

The knlaw basic script is just a basic, clean, walk of all blog posts. The script can be used as a library for another script, or as a stand alone CLI tool. 

When using from the command line a single argument can be given that is a path to another javaScript file that returns an objet than contains code that is to be called for each markdown file.

## walk all posts from command line

If I just want to run over all files with the built in default for post function then I can just call the main index.js file in this folder with node, or run the npm script for this little project.

```js
$ npm run klaw-basic
```

## Using as Module

When it comes to using this as a library there is just one public function as of this writing at least which is the klawPosts function. Once I require the function in I just call it and pass an object that contains the for post function that I want to call for each file.

```js
let klawPosts = require('./index').klawPosts;
 
klawPosts({
    forPost: (item, next) => {
        console.log(require('path').basename(item.path, '.md'));
        next();
    },
    onDone: () => {
        console.log('walk is done');
    }
});
```