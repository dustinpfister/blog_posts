---
title: Working with promises in node.js with bluebird
date: 2017-12-02 19:48:00
tags: [js,node.js]
layout: post
categories: node.js
id: 103
updated: 2019-09-18 10:01:25
version: 1.5
---

Today I will be writing about the npm package [bluebird](https://www.npmjs.com/package/bluebird), which is a fully featured featured promise library for [node.js](https://nodejs.org/en/). There is built in support for promises in node.js as well in any version that is up to spec with [ES2015+ javaScript](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-objects), so I will see about how bluebird compares to native promise support.

<!-- more -->

## 1 - Some Basics with promises

If you do not know anything about promises they are [worth checking out](https://en.wikipedia.org/wiki/Futures_and_promises). In a nut shell promises are a great way to handle anything that needs to be done in an async kind of way and or anything that may result in a pass or fail result.

If you are not going to bother with promises one alliterative is to have high level functions with pass and fail callbacks, although it works things can get a little messy. As such a lot of developers like to use promises.

Take into account the following code.

```js
var fs = require('fs');
 
fs.stat('README.md', function (err, stats) {
 
    if (err) {
 
        console.log('error getting readme stats');
        console.log(err);
 
    } else {
 
        console.log('readme stats: ');
        console.log(stats);
 
    }
 
});
```

This is an example of something where there are two possible outcomes, one where I will be getting the stats of a readme file logged to the console, and another in the event that some kind of error happens. As such the above example can be written as a promise like this:

```js
// a getStats method that will return a promise
var getStats = function (path) {
 
    // the promise to return
    return new Promise(function (resolve, reject) {
 
        require('fs').stat(path, function (err, stats) {
 
            if (err) {
 
                // if error reject, and pass the error
                reject(err);
 
            } else {
 
                // else resolve with that stats
                resolve(stats);
 
            }
 
        });
 
    });
 
};
 
// get readme stats promise style!
getStats('README.md').then(function (stats) {
 
    console.log('readme stats:');
    console.log(stats);
 
}).catch (function (err) {
 
    console.log('error getting readme stats');
    console.log(err);
 
});
```

In the above example I am using the built in Promise constructor that comes in any version of node that supports promises. In most cases it works okay, but bluebird provides a few more features, some of which are pretty helpful.

so add it to a project can check it out:

```
$ npm install bluebird --save
```

## 2 - Bluebirds promisify method

This is a great method in bluebird as it can quickly turn a node.js function like fs.stat used in the above example, and turn it into a promise. However in late versions of nodejs this is now also a native nodejs feature as well that can be found in the util module of nodejs. So it only makes sense to still bother with bluebird for this reason alone when it comes to pushing backward compatibility to older versions of nodejs that do not support promisify or even promises in general.

As such the above example I gave that uses the built in node.js Promise constructor can be simplified to just this with bluebird.

```js
var Prom = require('bluebird');
 
// The node.js Built in Promise constructor does not have promisify (4.3.2)
console.log(Promise.promisify); // undefined
 
// but bluebird does
console.log(Prom.promisify); // [Function]
 
var getStats = Prom.promisify(require('fs').stat);
 
// Hey now I can just give the nodeFunction to bluebirds
// promisify method, pretty sweet!
getStats('README.md').then(function (stats) {
 
    console.log('readme stats:');
    console.log(stats);
 
}).catch (function (err) {
 
    console.log('error getting readme stats');
    console.log(err);
 
});
```

It is common practice to overwrite (or monkey patch) the built in Promise Constructor but for this post I decided not to in order to compare what it is that is gained in features. In production I see no reason why not though bluebird just gives you a more powerful, and capable Promise constructor with additional helpful methods like this.

## 3 - Bluebirds promise any method

So one of the features of blue bird that is not found in native javaScript promises is the promise any method. This is one of the many blue bird collection methods beyond that of promise all. An array of value can be given to promise any, and a vale can be a promise. If one or more values resolves in the array the first value that does so is what the promise that is returned with the promise any method will resolve with.

```js
var Prom = require('bluebird');

let roll = () => {
    return Math.floor(Math.random() * 6) + 1;
}
 
// if doubles defense1 will apply
let Defence1 = () => {
    let d1 = roll(),
    d2 = roll();
    if (d1 === d2) {
        return Promise.resolve({
            message: 'Defence 1 (doubles)',
            d1: d1,
            d2: d2,
            defence: 10 * (d1 / 6)
        });
    }
    return Promise.reject({
        d1: d1,
        d2: d2,
        message: 'defence 1 failed'
    });
}
 
// if sum of 7 defense2 will apply
let Defence2 = () => {
    let d1 = roll(),
    d2 = roll();
    if (d1 + d2 === 7) {
        return Promise.resolve({
            message: 'Defence 2 (sum of 7)',
            d1: d1,
            d2: d2,
            defence: 10
        });
    }
    return Promise.reject({
        d1: d1,
        d2: d2,
        message: 'defence 2 failed'
    });
}
 
Prom.any([Defence1(), Defence2()])
.then((result) => {
    console.log(result);
})
.catch((e) => {
    console.log('no defence worked');
    console.log(e[0]);
    console.log(e[1]);
});
```

## 4 - Conclusion

There are many more methods to write about, as well as a whole lot more to write about when it comes to promises in general, for now there is the [bluebird website](http://bluebirdjs.com/docs/api-reference.html) that is pretty helpful if you want to learn more about that api.