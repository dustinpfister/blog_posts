---
title: Promise all method for a collection of promises
date: 2019-06-24 13:03:00
tags: [js]
layout: post
categories: js
id: 488
updated: 2020-06-19 15:23:50
version: 1.12
---

When a whole bunch of tasks need to be accomplished before moving on with things, one way to do so is with the [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method. This method will return a resolved promise object when everything that is given to it via an array as the first argument is resolved if a promise, or is something that is not a promise. 

So it goes without saying that the promise all method is fairly useful whenever I am in a situation in which I need to do a whole bunch of async tasks and then continue with more to do once all of that has completed. The promise all method should be there when it comes to native Promise support, but can also be added when working with older platforms via something like bluebird. So then lets take a look at a few examples of the promise all method in action.

<!-- more -->

## 1 - Promise all nodejs example

Here I have a simple example of Promise all in nodejs 8.x In this version of nodejs the util.promisify method was introduced that can be used to make methods that just make use of a callback, return a promise. I can then use this as a way to make file system methods return promises, which I can then use in an array. This array can then be passed as the first argument for promise all.

```js
let util = require('util'),
fs = require('fs');
Promise.all([
        util.promisify(fs.stat)('./text.txt'),
        util.promisify(fs.readFile)('./text.txt')
    ])
.then((a) => {
    console.log(a[0].isFile()); // true
    console.log(a[1].constructor.name); // Buffer
})
.catch ((e) => {
    console.log(e.message);
});
```

Once all the promises are resolved a resolved promise is returned and then what is given via the then method is called, and in the event of an error what is given via catch is called just like any other promise.

## 2 - Promise all client side example

So if a browser does support Promise all it can also be used in the front end as well. New browser technologies such as fetch return promises, and it is also possible to create custom promises as well with the Promise constructor. However there is just one little concern when it comes to browser support, if you care about supporting any version of IE at all you will need to use something that will bring promise all support to those older platforms.

```html
<html>
  <head>
    <title>promise all</title>
  </head>
  <body>
    <script>
// get a url with fetch
let get = (url) => {
    return fetch(url)
    .then((res) => {
        return res.body.getReader().read();
    })
    .then((data) => {
        return [].map.call(data.value, (byt) => {
            return String.fromCharCode(byt)
        }).join('');
    })
};
// delay
let delay = (time) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('delay done');
        }, time);
    });
};
// Promise all
Promise.all([get('https://dustinpfister.github.io/'), delay(3000)])
.then((result) => {
    console.log(result)
})
.catch ((e) => {
    console.log(e);
});
    </script>
  </body>
</html>
```

## 3 - File walker use case example of promise all

So say I want to walk a file system path for all items in a path, and then filter out all the folders. After that I want to read all of the files in that path. In nodejs I can use the readdir method to read the contents of a dir, and then I can use promise all for each item in the path, getting the stats for each item. That can the be used to filter out all the folders, at which point I can the use promise all again to read all the files then as well.

```js
let util = require('util'),
path = require('path'),
fs = require('fs');
// functions that return a promise
let readdir = util.promisify(fs.readdir);
let stat = util.promisify(fs.stat);
let fileData = (path_file) => {
    return stat(path_file).then((stats) => {
        return {
            stats: stats,
            isFile: stats.isFile(),
            fileName: path.basename(path_file),
            path_file: path_file
        }
    });
};
let readFile = util.promisify(fs.readFile);
// lets do it
let dir = path.resolve(process.argv[2] || process.cwd());
readdir(dir)
.then((files) => {
    return Promise.all(files.map((file) => {
            //return stat(path.join(dir, file));
            return fileData(path.join(dir, file));
        }))
})
.then((fileData) => {
    // filter out folders
    fileData = fileData.filter((data) => {
            return data.isFile
        });
    // read all
    return Promise.all(fileData.map((data) => {
            return readFile(path.join(dir, data.fileName), 'utf8');
        }));
})
.then((results) => {
    results.forEach((data) => {
        console.log(data);
    });
})
.catch ((e) => {
    console.log(e.message)
});
```

In this example I am also using the util.promisify method as a way to make all the file system module methods that I am using return a promise rather than having to deal with call back hell.

## 4 - Conclusion

So the promise all method can be used as a way to create a promise with an array of promises and other mixed values that will resolve when all of the promises in the array resolve, or contain values that are not a promise. In other words if I am every in a situation in whichI need to do create not just one promise but a whole bunch of them, then the promise all method is what I want to use to get things done.