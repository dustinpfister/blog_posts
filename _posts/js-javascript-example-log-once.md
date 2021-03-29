---
title: Log once javaScript example
date: 2021-03-29 15:35:00
tags: [js]
layout: post
categories: js
id: 833
updated: 2021-03-29 16:00:16
version: 1.3
---

The next step after learning javaScript is to start creating some actual projects, or at least some examples of basic features and modules. For todays new javaScript example post I thought I should write a quick post on having a long once method that often proves to be an important part of a basic debugging kit of sorts.

Learning to use the console.log method to log something to the javaScript console of a browser, or the standard output of a terminal in a nodejs environment is one of the first things to become aware of when learning javaScript for the first time. However just having console.logs all over ones source code is not always the best way to go about debugging code, often it might be better to have a custom log method that is used in place of doing something such as that. That is having a log function all over the source code of a project, and having everything pipe to this function first. Then in the body of that function I can use console.log to log out some kind of debug message, or I can comment that out with just one line. I can also have this kind of messaging piped to something other than console.log.

Anyway I also often find myself in situations in which if something happens I just want something to be logged once, not over and over again for each element in a loop. To create such a log function I would need to have a function that will return this kind of function, in other words a [javaScript function closure](/2019/02/22/js-javascript-closure/).

<!-- more -->

## 1 - The utils lib that contains my Create Log Once method

```js
var utils = {};
 
utils.log = function (mess) {
    console.log(mess);
};
 
utils.createLogOnce = function (callBack) {
    var count = 1;
    return function (mess) {
        if (count > 0) {
            utils.log(mess);
            count -= 1;
        }
    };
};
 
utils.isBrowser = (function(global){
    return function () {
        try {
            return global === window;
        } catch (e) {
            return false;
        }
    };
}(this));
 
// if nodejs, export utils
if (!utils.isBrowser()) {
    module.exports = utils;
}
```

## 2 - Some basic use case examples of Create Log Once

### 2.1 - A nodejs example

```js
let path = require('path'),
utils = require( path.join(__dirname, 'lib/utils.js') );

var i = 10,
logOnce = utils.createLogOnce();
while(i--){
    logOnce('i=' + i);
}
```

### 2.2 - an HTML example of the Log Once method

```html
<html>
    <head>
        <title>javaScript example item object</title>
    </head>
    <body>
        <script src="./lib/utils.js"></script>
        <script>
var i = 10,
logOnce = utils.createLogOnce();
while(i--){
    logOnce('i=' + i);
}
        </script>
    </body>
</html>
```

## 3 - Conclusion

So that is it for now when it comes to logging something to a console just once. There are many frameworks that might have this kind of method at the readu to begin with though.
