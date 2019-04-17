# klaw basic

Just a basic, clean, walk of all blog posts

## walk all posts

```js
$ node klaw-basic
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