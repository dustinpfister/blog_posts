---
title: Promise all method for a collection of promises
date: 2019-06-24 13:03:00
tags: [js]
layout: post
categories: js
id: 488
updated: 2021-10-17 16:47:42
version: 1.42
---

When a whole bunch of tasks need to be accomplished before moving on with things, some or all of which might take a while, one way to do so is with the [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) method. This method will return a resolved promise object when everything that is given to it via an array as the first argument is resolved if a promise, or is something that is not a promise, or in other words it is all ready a value to begin with. So the array that is given to the promise all method can be a mixed collection of values some of which can be promises, and things will not continue until all promises in the array are resolved or rejected.

So it goes without saying that the promise all method is fairly useful whenever I am in a situation in which I need to do a whole bunch of async tasks, and then continue with more to do once all of that has completed. The promise all method should be there when it comes to native Promise support, but can also be added when working with older platforms via something like [bluebird](/2017/12/02/nodejs-bluebird/). 

So then lets take a look at a few examples of the promise all method in action.

<!-- more -->

## 1 - The basics of the Promise.all method

In this section I will be starting out with the basics of the Promise.all method, starting out with some very simple examples that should help one to get the core idea of what the Promise.all method is all about. I will also be getting into some other examples that are a little involved but should serve well as some what basic example for a nodejs and client side javaScript environment as there are different things to work with in those two different environments.

I trust that you have at least some background when it comes to the very [basics of javaScript](/2018/11/27/js-getting-started/) in the client side as well as in [nodejs](/2017/04/05/nodejs-helloworld/). If not you might want to take a step back and come back to promises later, many developers consider promises part of advanced javaScript along with things like [closures](/2019/02/22/js-javascript-closure/) and the nature of the [this keyword](/2017/04/14/js-this-keyword/). I will be trying to keep these examples fairly basic and easy to follow at least in the first section, but I am not going to cover every little detail that you should know before hand here.

### 1.1 - The source code examples in this post are on github

The [source code examples here can be found on github](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-promise-all) in my test vjs repository. In this repository there is also all the source code examples for all my other [posts on vanilla javaScript](https://dustinpfister.github.io/categories/js/).

### 1.2 - Simple Promise all hello world example

To start out with this method in just about any javaScript environment that supports promises an array of any kind can be given as the first argument. Often when using this method the array will contain at least one ore more Promise Objects, but that does not have to be the case. In the event that it is an array of primitives that will result in a resolved promise for the call of Promise all so then the next then function call in the Promise chain will be what is called.

So then something like this:

```js
Promise.all(['Hello', 'world'])
.then((array) => {
    console.log(array.join(' '));
})
.catch((e) => {
    console.warn(e.message);
});
```

Will result in the text Hello World being logged to the console. However this is not in any way a typical use case example of the Promise all method, and I could just pass the array to a [Promise.resolve static method](/2019/09/18/js-promise-resolve-reject/) call to get the same result. I am just bothering with this to make a point which is that the array that I give to Promise.all can be an array of primitives, or it can also be an array of Promise objects that will resolve or reject in certain situations, or a combination of the two. More on this later in this post, but for now on many at least a few more basic examples are call for.

### 1.3 - Simple Promise all example with a method that will return a promise

Although The array that is given to the Promise all method can be an array of anything, often it should contain at least one if not more promise objects. When all the Promise objects in the array resolve, then the next then method in the promise chain will be called.

```js
// a delayed function that returns a promise
let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            resolve(new Date() - st);
        }, ms || 1000)
    });
}
// calling the function twice for two elements in an array, and
// passing that array to the promise all method
Promise.all([delayed(10), delayed(1500)])
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
```

When calling this source code example I get an array of numbers where each number is the amount of time it took for each of the called of the delay method to finish.

### 1.4 - Simple resolve and reject example of Promise all

If Just one of the promise objects in the array reject, then so will the promise all call as a whole and then next catch statement will file in the promise chain for the Promise all call.

```js
let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            let t = new Date() - st;
            if (t >= 1000) {
                reject(new Error('process took to long'))
            }
            resolve(t);
        }, ms || 1000)
    });
}
Promise.all([delayed(10), delayed(985)])
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
```

### 1.5 - Promise all nodejs example

Here I have a simple example of Promise all in nodejs 8.x, in this version of nodejs the [util promisify method](/2019/06/22/nodejs-util-promisify/) was introduced that can be used to make methods that just make use of a callback, return a promise. I can then use this as a way to make file system methods return promises, which I can then use in an array. This array can then be passed as the first argument for promise all.

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


### 1.6 - Promise all client side example

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

## 2 - The array passed to Promise all can be a mix of Promises and static values

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

In this example I am passing an array that is a concatenation of a hard coded array of values, and an array of promise objects for files that contain additional string values. In the event that all the fires are there, and there is no problem reading them, then an array of the hard values along with the loaded values will be returned. If there is an array of any kind then the hard values will be returned only.

this example could be written differently where the hard coded values are added later, but you get the idea. The array can be of mixed values, and in some cases this might be helpful. Say you need to do something where you start off with some hard coded values, and what is loaded will effect those values. The hard coded values can be just packed up along with everything else and passed down along the promise chain.

## 3 - Array methods and the Promise all method

It is a good idea to know a thing or two about the [array prototype methods](/2018/12/10/js-array/) when working with the Promise all method. Mainly the array map and array filter methods, as these are the methods that I find myself using the most often when working with arrays of data, or objects to which I want to create an array of promises for that I would then pass to the Promise all method. So then in this section I am going to be going over a few quick examples of using the promise all method with certain array prototype methods. The basics covered in this section here will then come up in the actually basic project examples that I will be getting to later in this post.

### 3.1 - Array map

```js
let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            resolve(new Date() - st);
        }, ms || 1000)
    });
}
 
// an array of times
let times = [10, 1500, 100, 75, 33, 150];
// using array.map to create a new array of promises
// my calling delayed method for each element in times array
Promise.all(times.map((ms) => {
    return delayed(ms);
}))
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
```

### 3.2 - Array filter

```js
let delayed = (ms) => {
    return new Promise((resolve, reject) => {
        let st = new Date();
        setTimeout(() => {
            resolve(new Date() - st);
        }, ms || 1000)
    });
}
 
// an array of times
let times = [10, 1500, 33, 7500, 3000, 150];
// filtering out times over 1000, and then using map
Promise.all(times.filter((ms) => {
    return ms < 1000;
}).map((ms) => {
    return delayed(ms);
}))
.then((array) => {
    console.log(array);
})
.catch((e) => {
    console.log(e.message);
});
```

## 4 - File walker use case example of promise all

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

## 5 - Nodejs promise all example that has to do with creating a JSON report for a collection of blog post files.

For yet another project example of the Promise all method here is yet another example that runs on top of nodejs, and does not use any npm packages. The goal here is to have some kind of system where I read all the mark down files in a given folder, and create objects for each file found in the given folder. I then write a json file that will contain all of the data that was extracted. For now with this example at least the goal is to just create a collection of objects where each object is just a file name, and also a date, and updated key that is extracted from the top from data of each mark down file.

### 5.1 - The report.js file

Here I have the javaScript code that I will be using for this example that creates a json report for a collection of mark down files in a given folder. So then this module will export just one public function that I can then use in some kind of main index script that when called is passed a folder that contains markdown files, and a path to a json file to update, or create in the event that it is not there.

When it comes to the Promise all method alone which is of course the theme of this post then the main method of interest to write about here would be the read all method. This method calls the get uri array method that will return a promise that should resolve to an array of file names for each post, that can then be used to create an array of promise objects each of which are a call of the read file method that will return a promise. When each of these promise resolve the end result will then be an object that contains the filename as well as the text that was read from the mark down file. This array of promise objects is then passed to, you guessed it the promise all method.

```js
let util = require('util'),
path = require('path'),
fs = require('fs'),
readFile = util.promisify(fs.readFile),
writeFile = util.promisify(fs.writeFile),
readdir = util.promisify(fs.readdir);
 
let NEW_REPORT = {
    posts: []
};
 
// just get a filtered list of posts for the given dir
let get_uri_array = (dir_posts) => {
    return readdir(dir_posts)
    .then((files) => {
        return files.filter((fileName) => {
            return fileName.match(/\.md$/) != null;
        });
    })
};
 
// read all files returning an array of objects with fileName, and md for each post
// like this: [{fileName: foo.md, md: 'markdown text of foo.md'}]
let readAll = (dir_posts) => {
    fileNames = [];
    return get_uri_array(dir_posts)
    .then((files) => {
        fileNames = files;
        let array = files.map((fileName) => {
                return readFile(path.join(dir_posts, fileName), 'utf8')
                .then((md) => {
                    return {
                        fileName: fileName,
                        md: md
                    };
                });
            });
        return Promise.all(array);
    });
};
 
// set dates for the array of post objects
// deleting any md key for each object in any case
let setDates = (postObjects) => {
    let patt = /---[\s|\S]*?---/g;
    return postObjects.map((postObj) => {
        let m = postObj.md.match(patt);
        if (m) {
            m[0].split('\r\n').forEach((str) => {
                if (str.match(/^date/)) {
                    postObj.date = str.replace(/^date:/, '').trim();
                }
                if (str.match(/^updated/)) {
                    postObj.updated = str.replace(/^updated:/, '').trim();
                }
            });
        }
        // delete md
        delete postObj.md;
        return postObj;
    })
};
 
// try to get the given json file and if not found
// write a new one, in any case return an object that
// is the parsed json, or a default object used for a new report
let getReport = function (uri_json) {
    return readFile(uri_json, 'utf8')
    .catch((e) => {
        let json = JSON.stringify(NEW_REPORT);
        console.log('report not found writing new one');
        return writeFile(uri_json, json, 'utf8')
        .then(() => {
            return Promise.resolve(json);
        })
    })
    .then((json) => {
        return JSON.parse(json);
    });
};
 
// export
let api = (dir_posts, uri_json) => {
    let report = {};
    return getReport(uri_json)
    .then((loadedReport) => {
        report = loadedReport;
        return readAll(dir_posts);
    })
    .then((objects) => {
        var posts = setDates(objects);
        report.posts = posts;
        return writeFile(uri_json, JSON.stringify(report), 'utf8');
    })
};
 
module.exports = api;
```

### 5.2 - The index.js file

So I then have a index.js file that will make use of this report module that I have above. I just require in the module, and see about calling the main method that is exported by the module. The result of which is then a json file being crated for each of the demo posts that I have in my test project folder.

```js
let path = require('path'),
report = require(path.join(__dirname, 'report.js'));
 
report(path.join(__dirname, 'posts'), path.join(__dirname, 'report.json'))
.then((a) => {
    console.log('report done');
})
.catch((e) => {
    console.warn(e.message);
});
```

The end result of the report is then just a collection of objects for each markdown file that contain just the file name as well as updated and date keys extracted from the files header data. That is all that I wanted to do for this example at least, but there is taking this and making at least one or two more scripts that will do a bot more than just that such as tabulate things that I might want to know for a massive collection of text files.

## 6 - Conclusion

So the [promise all method](https://www.freecodecamp.org/news/promise-all-in-javascript-with-example-6c8c5aea3e32/) can be used as a way to create a promise with an array of promises and other mixed values that will resolve when all of the promises in the array resolve, or contain values that are not a promise. In other words if I am every in a situation in whichI need to do create not just one promise but a whole bunch of them, then the promise all method is what I want to use to get things done.