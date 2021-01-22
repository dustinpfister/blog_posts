# klaw basic

Just a basic, clean, walk of all blog posts

## walk all posts from command line

To just walk all files from the command line this will work

```js
$ npm run klaw-basic
```

## Using as Module

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