---
title: Promise all method for a collection of promises
date: 2019-06-24 13:03:00
tags: [js]
layout: post
categories: js
id: 488
updated: 2020-10-11 09:56:47
version: 1.19
---

When a whole bunch of tasks need to be accomplished before moving on with things, some or all of which might take a while, one way to do so is with the [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method. This method will return a resolved promise object when everything that is given to it via an array as the first argument is resolved if a promise, or is something that is not a promise, or in other words it is all ready a value to begin with. So the array that is given to the promise all method can be a mixed collection of values some of which can be promises, and things will not continue until all promises in the array are resolved or rejected.

So it goes without saying that the promise all method is fairly useful whenever I am in a situation in which I need to do a whole bunch of async tasks, and then continue with more to do once all of that has completed. The promise all method should be there when it comes to native Promise support, but can also be added when working with older platforms via something like [bluebird](/2017/12/02/nodejs-bluebird/). 

So then lets take a look at a few examples of the promise all method in action.

<!-- more -->

## 1 - Promise all nodejs example

Here I have a simple example of Promise all in nodejs 8.x, in this version of nodejs the util.promisify method was introduced that can be used to make methods that just make use of a callback, return a promise. I can then use this as a way to make file system methods return promises, which I can then use in an array. This array can then be passed as the first argument for promise all.

So in the example here I am using the util promisify method to make sure that the fs stat method will return a promise when used, and doing the same for the fs read file method. In addition I am doing so in an array, so I have an array of two promise objects and of course I am passing this to the Promise all method as the first argument. Wit that said the promise all method then returns a promise as it should, and just like with any other promise I can call then and catch methods off of it. In the event that and error happens, and I end up with a rejected promise I end up logging an error message, if all goes to plan then it will resolve and the code in the then function call with run. In the body of that then function call I will have access to both a stats object, and the content of the read file call as the array of resolved values will be passed as an argument there.
That is a bit of a mouth full, but maybe it is best to just play around with a code example to get a better idea of that the deal is when this.

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

If you are using a later version of node, and you do not need to work about pushing backward compatibility back to node 8.x then the code example could be a litter different as some of the later versions of node have files system methods that will return promises anyway. However in any case this simple example of promise all should help give you a basic idea of what the deal is with the promise all method and why it can come in handy now and then.


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

## 4 - The array passed to Promise all can be a mix of Promises and static values

I have mentioned this before, but it is worth repeating and having a section on this. The array that you pass to the Promise all method does not have to be an array of promise instances only. It can be a mix of promises and plain old objects, strings, numbers, of any valid javaScript value for an array element. In the event that an element is not a promise that element with just be reorganized as might resolved all ready.

```js
let util = require('util'),
path = require('path'),
fs = require('fs');
// returns a promise
let read = util.promisify(fs.readFile);
 
// mixed array of promises and other values
let mixed = () => {
    let hard = [42, 'bar'];
    return Promise.all([read('file1.txt'), read('file2.txt')].concat(hard))
    .then((result) => {
        return result.map((el) => {
            return el instanceof Buffer ? el.toString() : el;
        });
    })
    .catch((e) => {
        return hard;
    });
};
 
mixed().then((arr) => {
    console.log(arr);
});
```

## 5 - Conclusion

So the [promise all method](https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/) can be used as a way to create a promise with an array of promises and other mixed values that will resolve when all of the promises in the array resolve, or contain values that are not a promise. In other words if I am every in a situation in whichI need to do create not just one promise but a whole bunch of them, then the promise all method is what I want to use to get things done.