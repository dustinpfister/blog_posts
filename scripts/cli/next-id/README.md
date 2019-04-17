# next-id

This script prints the next valid id of a new post, which is also the current count of posts as well.

```
$ node next-id
417
```

## using as module

```js
let getId = require('./index').getId;
 
// callback
getId((id) => {
    console.log(id);
});
 
// promise
getId().then((id) => {
    console.log(id);
});
```