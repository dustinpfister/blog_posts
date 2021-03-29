---
title: Log once javaScript example
date: 2021-03-29 15:35:00
tags: [js]
layout: post
categories: js
id: 833
updated: 2021-03-29 16:26:54
version: 1.7
---

The next step after learning javaScript is to start creating some actual projects, or at least some examples of basic features and modules. For todays new javaScript example post I thought I should write a quick post on having a long once method that often proves to be an important part of a basic debugging kit of sorts.

Learning to use the console.log method to log something to the javaScript console of a browser, or the standard output of a terminal in a nodejs environment is one of the first things to become aware of when learning javaScript for the first time. However just having console.logs all over ones source code is not always the best way to go about debugging code, often it might be better to have a custom log method that is used in place of doing something such as that. That is having a log function all over the source code of a project, and having everything pipe to this function first. Then in the body of that function I can use console.log to log out some kind of debug message, or I can comment that out with just one line. I can also have this kind of messaging piped to something other than console.log.

Anyway I also often find myself in situations in which if something happens I just want something to be logged once, not over and over again for each element in a loop. To create such a log function I would need to have a function that will return this kind of function, in other words a [javaScript function closure](/2019/02/22/js-javascript-closure/).

<!-- more -->

## 1 - The utils lib that contains my Create Log Once method

At the top of the module I have my log function that will take a mess argument to be logged. I then have a create log once method that when called will return a function that when called will call the utils.log function only once. Any additional calls to the function after that will result in no further action of any kind.

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


At the end of this module I am making use of [environment detection](https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser) to export the value of the utils global in the event that this module is being used in a nodejs environment. I made the code that will return true or not another utility method of the module in the forum of an is browser method. This function makes use of a [javaScript try catch](/2019/03/02/js-javascript-try/) statement that will cause an exception if the function is called in a nodejs environment, so then in the catch blog of the try catch statement I return false.

## 2 - Some basic use case examples of Create Log Once

So now it is time to test out this utils module to make sure that it will work they way that I want it to in both a nodejs and bowser environment. So there will need to be at least two basic examples that involve doing a few things in a loop, but only log once for just one item in the loop.

### 2.1 - A nodejs example

For a nodejs example I just need to require in the utils.js file, and then I can create a single log once method at the top of the file. I can then call the log once method in a while loop, and as I expected a message will only log to the console once.

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

When it comes to using the library in a client side javaScript environment I just need to link to the file in a public folder with a script tag just as with any other javaScript file in the front end. I can then use the create log once method in more or less the same way with the same results.

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

So that is it for now when it comes to logging something to a console just once. These might not be the most compelling use case examples, but when it comes to working on a real project I often might get around to making some kind of custom logging utility such as this. The feature of having all my logs going to one method helps, and also I am often in a situation in which I just want to log something once when a certain condition happens.

There are many frameworks that might have this kind of method at the ready to begin with though. A few years back I wrote about once such method in lodash which is called the [lodash once](/2017/12/04/lodash_once/) method. As you would expect that function works more or less the same way, so if a framework that is all ready part of the stack has something like this then there is just making use of what there is to work with to begin with.

There is a lot more to add to this kind of module when it comes to things like the use of color in the output of the log method in a nodejs environment. When it comes to that there is a nodejs [npm package called chalk](/2017/05/31/nodejs-chalk/) that is a popular solution for that sort of thing, but another option is to just learn a thing or two about [ANSI escape codes](/2019/09/19/nodejs-ansi-escape-codes/) when it comes to creating color terminal output.

