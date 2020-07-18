---
title: Example of the _.chunk array method in lodash
date: 2017-09-13 15:06:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 36
updated: 2020-07-18 19:53:54
version: 1.13
---

So I think I will write a few posts on [lodash](https://lodash.com/), and as such why not start with the [\_.chunk](https://lodash.com/docs/4.17.4#chunk) array method. The lodash chunk method is a method in lodash that can break a linear array into an array of arrays, or in other words a multidimensional array as it may often be called.

So how often do I get into a situation in which I need to break down a linear array into an array of arrays? Maybe not to often but often enough that it would be nice to have a method that is part of a toolkit of sorts that makes quick work of it. In this case the lodash chunk method in is just that. There is also the question of flattening an array of arrays into a single array, for that there is the [lodash flatten](/2018/08/12/lodash_flatten/) method.

<!-- more -->

## 1 - What to know before hand.

This is a post on the \_.chunk method in lodash which is one of the many [lodash array methods](/2019/02/14/lodash_array/) that are intended to be used with arrays only rather than any collection or object in general. If you are new to javaScript and lodash this might not be a good starting point for you, as I assume that you have at least got you feet wet with javaScript before hand .

## 2 - The basic idea of \_.chunk

So the \_.chunk method will break down an array into an array of arrays of a given size for each child array. The first argument given to the lodash chunk method should be the array that is to be broken down, and the second argument is the number of elements per chunk or child array within the resulting array that is returned.

So a basic example of the lodash chunk method might be like this:

```js
var _ = require('lodash'),
 
// basic example
arr = ['one', 'two', 'three', 'four', 'five', 'six'];
 
console.log(_.chunk(arr, 2));
// [ [ 'one', 'two' ], [ 'three', 'four' ], [ 'five', 'six' ] ]
```

It breaks a single dimensional array into a multidimensional array and that is more or less the basic idea of the chunk method.

## 3 - Matrix use example of \_.chunk, and \_.chunks friend \_.zip

One example that comes to mind is a situation in which you have some pixel data stored in a linear array, and I want it organized in a 2d matrix. Say some kind of image data format in which an array of color values, a color pallet, and image width are stored in an object.

In this example I can use \_.chunk to break the linear array down into a 2d matrix, or grid if you prefer. Once I have that done I can use [\_.zip](/2018/02/01/lodash_zip/) to rotate the matrix if I want to.

```js
// matrix data example
data = {
 
    w : 10,
    colors : ['grey', 'blue','red'],
    px : [
        1,1,1,1,2,2,2,2,2,2,
        1,0,0,1,0,0,0,0,0,0,
        1,1,1,1,2,2,2,2,2,2,
        0,0,0,0,0,0,0,0,0,0,
        2,2,2,2,2,2,2,2,2,2],
 
    // my toMatrix method using _.chunk
    toMatrix : function(){
 
        return _.chunk(this.px,this.w);
 
    },

    // rotation thanks to zip
    rotated : function(){

        // _.zip is useful for doing this
        return _.zip.apply(0, this.toMatrix());

    }
 
};
 
// draw it out like this

var html = '';
data.rotated().forEach(function (line) {
 
    line.forEach(function (px) {
 
        html += '<span style=\"color: '+data.colors[px]+';\">X<\/span>';
 
    });
    html += '<br>';
 
});

console.log(html);
```

<span style="color: blue;">X</span><span style="color: blue;">X</span><span style="color: blue;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: blue;">X</span><span style="color: grey;">X</span><span style="color: blue;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: blue;">X</span><span style="color: grey;">X</span><span style="color: blue;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: blue;">X</span><span style="color: blue;">X</span><span style="color: blue;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><span style="color: grey;">X</span><span style="color: red;">X</span><br>

## 4 - Conclusion

So yes this method will sure come in handy when working on a project where I need to chunk a linear array into an array of arrays. This is something where it would actually be nice to have a convenience method for this sort of thing in a utility library actually. It is true that may of the methods in lodash are just abstractions of native methods. However the lodash chunk method is one method that I often find myself grabbing for that is not part of core javaScript itself. 

Be sure to check out my other [posts on lodash](/categories/lodash/), I also have my main post on [lodash](/2019/02/15/lodash/) in general as well.

Happy coding.