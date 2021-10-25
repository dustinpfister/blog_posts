---
title: Nodejs require for importing modules and more
date: 2019-06-13 15:04:00
tags: [js,node.js]
layout: post
categories: node.js
id: 478
updated: 2021-10-25 11:04:12
version: 1.7
---

In nodejs the [require global](https://nodejs.org/docs/latest-v8.x/api/modules.html#modules_require) is something that will end up being used often in projects as a way to make use of built in as well as custom made nodejs modules. There is more to it then just a way to load modules though, it can also be used as a way to load json files and other assets, so lets take a look at some nodejs require examples today.

<!-- more -->

## 1 - nodejs require can be used for loading built in modules

So the nodejs require can be used to load any of the nodejs built in modules such as the file system and operating system modules. These modules are built into nodejs itself so no additional software needs to be installed globally or into a project folder with npm, or copied ans passed into an external javaScript file.

```js
let os = require('os');
console.log(os.platform());
```

In the above example I am using the operating system module to find out the current operating system platform that the script is running on. There is a wide range of other built in modules to work with so be sure to check those out first to see if they work out okay before looking into npm packages.

## 2 - nodejs require can also be used to load custom modules

So the nodejs require global can also be used to load an external modules in the from of an external javaScript file. When writing an external javaScript file there is the module.exports property this is of interest when it comes to making what is exported a function.

A function is a kind of object in javaScript so the function can be extended with additional properties as well.

```js
let api = function (a, b) {
    return a + b;
};
api.myFunc = api;
module.exports = api
```

once I have an external javaScript file that exports something I can then bring it into another file with the nodejs require global, just like that of built in modules, only now I pass a relative path to the external javaScript file.

```js
let mm = require('./mymod.js');
console.log( mm(5,1) ); // 6
console.log( mm.myFunc(5,1) ); // 6
```

## 3 - require can also be used to load json

Another thing about the node.js require global is that it can also be used as a way to read and [parse external JSON](/2020/02/28/js-json-parse/) data. This is often a quicker option to using the file system module and jSON.parse.

```js
{
    "foo": "bar"
}
```

```js
let json = require('./foo.json');
console.log(json.foo); // 'bar'
```