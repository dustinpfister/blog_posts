---
title: Example of the _.chunk array method in lodash
date: 2017-09-13 15:06:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 36
updated: 2017-09-30 18:56:30
version: 1.2
---

So I think I will write a [few posts](/categories/lodash/) on [lodash](https://lodash.com/), and as such why not start with [\_.chunk](https://lodash.com/docs/4.17.4#chunk).

So how often do I get into a situation in which I need to break down a linear array into an array of arrays? Maybe not to often but often enough that it would be nice to have a method that is part of a toolkit of sorts that makes quick work of it. In this case the [\_.chunk](https://lodash.com/docs/4.17.4#chunk) method in is just that.

<!-- more -->

## The basic idea of _.chunk

It breaks down array into groups of a given size like this:

```js
var _ = require('lodash'),
 
// basic example
arr = ['one', 'two', 'three', 'four', 'five', 'six'];
 
console.log(_.chunk(arr, 2));
// [ [ 'one', 'two' ], [ 'three', 'four' ], [ 'five', 'six' ] ]
```

Now my array is an array of arrays, which comes in handy now and then

## Matrix use example of _.chunk

One example that comes to mind is a situation in which you have some pixel data stored in a linear array, and I want it organized in a 2d matrix. Say some kind of image data format in which an array of color values, a color pallet, and image width are stored in an object.

```js
var _ = require('lodash'),
chalk = require('chalk'),
 
// matrix data example
data = {
 
    w : 4,
    colors : ['white', 'blue'],
    px : [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1],
 
    // my toMatrix method using _.chunk
    toMatrix : function(){
 
        return _.chunk(this.px,this.w);
 
    }
 
};
 
// draw it out like this
data.toMatrix().forEach(function (line) {
 
    var txt = '';
    line.forEach(function (px) {
 
        var style = chalk[data.colors[px]];
 
        txt += style(px);
 
    });
 
    console.log(txt);
 
});
```

## Conclusion

So yes this method will sure come in handy when working on a project, I can see why people like lodash.

## Conclusion

Be sure to check out my other [posts on lodash](/categories/lodash/)

Happy coding.