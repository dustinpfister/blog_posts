---
title: _.merge in lodash as a means to recursively merge down objects.
date: 2017-11-17 12:21:00
tags: [js,lodash]
layout: post
categories: lodash
id: 93
updated: 2017-11-17 13:25:18
version: 1.1
---

These days I have been exploring all the options out there when it comes to merging down two or more objects into a single object. There are many ways to go about doing it that have different effects, there is the idea of just copying over key values, or just referencing them even. However it most cases I often want to merge them down like that of a bunch of sheets of acetate rather than that of paper. That is if a certain value is in one object, but not any other, it is the value that will end up in the final object. That is the effect that is achieved when using the lodash [\_.merge](https://lodash.com/docs/4.17.4#merge) method.

<!-- more -->

## A lodash \_.merge example

For an example say I have an object that has default values from something, another object that holds input values, and yet another object that holds methods that act on those values. I want everything merged down together in a way where the values in the input object will override any default values, and I want the this keyword in the methods object to refer to the values in the resulting object of an object that is created from all of this.

```js
// some default values
var defaults = {
 
    x : 320,
    y : 240,
    delta : {
 
       x : 0,
       y : 0
 
    }
 
},
 
// some input values
inputs = {
 
   delta : {
   
      x: 5
   
   }
 
},
 
// some methods that act on values
methods = {
 
    move : function(){
 
        this.x += this.delta.x;
        this.y += this.delta.y;
 
    }
 
};
 
// merge everything down into a new object
var obj = _.merge({},methods,defaults,inputs);
 
obj.move();
 
console.log(obj.x); // 325
```

This differs from other methods that might copy inputs.delta over in a way in which I will end up with an undefined value for delta.y, this is the case with \_.assign or Object.assign.

## \_.merge vs \_.assign

The \_.merge differs from \_.assign in that \_.assign will create a new object for my deltas overwriting any values that may exist in any lower object. In other words I would end up with an undefined value for delta.y in my example.

```js
// merge everything down into a new object
merge = _.merge({},methods,defaults,inputs),
assign = _.assign({},methods,defaults,inputs);
 
console.log(merge.delta.x + ',' + merge.delta.y); // 325,240
console.log(assign.delta.x + ',' + assign.delta.y); // 325,undefined
```

In some cases this might be a desired effect, but in the example I am presenting here, obviously not.
