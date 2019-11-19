---
title: Merging two or more objects down on top of each other in node.js using object-merge
date: 2017-11-14 12:05:00
tags: [js,node.js,blog]
layout: post
categories: node.js
id: 91
updated: 2019-11-19 11:37:11
version: 1.5
---

When making any kind of CLI tool, or project with node.js I am often faced with a situation in witch I need to merge down two or more objects into one, and do so recursively. There are many options for doing so, but there is also doing so it a way in which I do not alter the source objects, and also clone the objects rather than just simple copying references.

Although there might be a method in a framework I am using such as with the [lodash merge](/2017/11/17/lodash_merge/) method, or maybe even something native that is getting added in, to help with this, I have found another stand alone package for this of course. That package is called [object-merge](https://www.npmjs.com/package/object-merge), and it works great for this.

<!-- more -->

## 1 - Installing

Because it is an npm package I can get started with it my just typing npm install as always.

```
$ npm install object-merge --save
```

## 2 - Use example

The situation I get in often involves having an object that contains hard coded default values, values that are parsed from the command line using something like [nopt](/2017/05/05/nodejs-nopt/), and maybe even some values from a json file.

As such I might want my CLI tool to treat what is given from the command line as what comes first and foremost, then fall back to what is in JSON, and finally go with what is hard coded last to make an options object that contains the actual set of options that will be used.

```
var merge = require('object-merge');
 
// hard coded defaults
var defaults = {
 
    source: './source',
    target: './build',
    recursive: false,
    writeFiles: {
 
        active: false,
        sizes: [32]
 
    }
 
},
 
// values from JSON
fromJSON = {
 
    source: './html',
    recursive: true,
    writeFiles: {
 
        active: true,
        sizes: [32, 64, 128, 320]
 
    }
 
},
 
// values parsed from CLI
fromCLI = {
 
    writeFiles: {
 
        active: false
 
    }
 
};
 
options =  merge(defaults,fromJSON,fromCLI);
 
console.log(options);
/*
*   { source: './html',
*   target: './build',
*   recursive: true,
*   writeFiles: { active: false, sizes: [ 32, 64, 128, 320 ] } }
*/
```

## 3 - Comparison with Object.assign

I know I write my code examples in an ES5 style, but of course I am ware that there are many methods that do things like this in modern standards of javaScript, but Object.assign is not one of them. It copies keys over, it does not merge down recursively.

```js
console.log(merge(defaults,fromJSON,fromCLI));
/*
*   { source: './html',
*   target: './build',
*   recursive: true,
*   writeFiles: { active: false, sizes: [ 32, 64, 128, 320 ] } }
*/

console.log(Object.assign(defaults,fromJSON,fromCLI));
/*
*   { source: './html',
*   target: './build',
*   recursive: true,
*   writeFiles: { active: false } }
*/
```

## 4 - Conclusion

Thats it for now, it seems like object-merge is a solid solution from merging down one or more objects, but I would not say it is the end all be all solution for this. There are some native methods that can be used for merging objects now, mainly Object assign, but that just assigns properties when it comes to nested objects, and can lead to undesired side effects as a result.

The process of merging objects is a little complicated, there is the question of how to handle references to other nested objects, as well as references to other objects outside of the object, including the global object and other native objects. 
Then there is the question of the prototype chain, and what to do when merging a much of objects that have different prototypes. What should be done in that case, do we just care about the so called own properties of the objects, or do we want to ccopy some prototype methods, or reference theme.

So you want to use the right tool for the job, or maybe even make a custom tool if it seems that doing so is called for.
