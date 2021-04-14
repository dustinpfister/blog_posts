---
title: Share code between nodejs and the browser with this javaScript module example
date: 2021-04-14 14:45:00
tags: [js]
layout: post
categories: js
id: 845
updated: 2021-04-14 15:09:38
version: 1.5
---

I am continuing to expand my collection of [javaScript example](/2021/04/02/js-javascript-example/) type posts this week, and today I think I will be covering a simple module design pattern for [sharing code between nodejs and a browser](https://www.geeksforgeeks.org/how-to-share-code-between-node-js-and-the-browser/) environment.

One of the cool things about nodejs is that I can use the programing language of the open web to create scripts that will run in my operating system environment. However it would be nice to make modules for nodejs that will also work in a browser environment also without hacking over the code a little first. Thankfully the process of doing so is not so hard, and can be done with just a few basic core javaScript features.

<!-- more -->


## 1 - The module that will work in node and a browser

First off I just need to write a [IIFE](/2020/02/04/js-iife) or Immediately Invoked Function Expression that is a kind of self executing function. The only thing that is special about this IIFE is the value that I will be passing to it when calling it. The value will be the result of an expression that makes use of the conditional expression to test for the presence of the module global in node.

```js
(function (api) {
 
    // PI * 2
    api.pi2 = Math.PI * 2;
 
    // no operation
    api.noop = function () {};
 
    // mathematical modulo
    api.mod = function (x, m) {
        return (x % m + m) % m;
    };
 
    // distance
    api.distance = function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    };
 
}(  typeof module === 'undefined' ? this['utils'] = {} : module.exports ));
```

## 2 - Using the module in a node script

So now to test out if this module works in a node script, to do so I just need to require the script in like always. I can then call one of the public methods of the module from the script that makes use of it. So then the module is working as exspected in node, but what about a browser example.

```js
let path = require('path');
utils = require( path.join(__dirname, 'lib/utils.js' ));
 
console.log( Math.floor(utils.distance(0,0,45,45)) ); // 63
```


## 3 - Using the module in client side javaScript

```html
<html>
    <head>
        <title>javaScript example</title>
    </head>
    <body>
        <div id="app"></div>
        <script src="./lib/utils.js"></script>
        <script>
var container = document.querySelector('#app');
container.innerText = utils.distance(37, 20, 10, 0);
        </script>
    </body>
</html>
```

## 4 - Conclusion

That is it for this kind of javaScript module pattern, at least as far as this post is concerned at least. There is getting more into the subject of module design in javaScript in general which is in itself a pretty large topic. Working out something like this is just one of many kinds of other patterns that might work out better in some situations.

It is great that if I want to I can go about writing my modules like this, but just because I can do something does not alone mean that it is a good idea. it might still be best to maintain browser and nodejs variants of the same module, but doing something like this works okay too. There are many popular frameworks that follow some kind of pattern like this, and that does not keep me from using them.

