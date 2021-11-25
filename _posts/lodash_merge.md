---
title: _.merge in lodash as a means to recursively merge down objects.
date: 2017-11-17 12:21:00
tags: [js,lodash]
layout: post
categories: lodash
id: 93
updated: 2021-11-25 13:12:31
version: 1.7
---

These days I have been exploring all the options out there when it comes to merging down two or more objects into a single object. There are many ways to go about doing it that have different effects, there is the idea of just copying over key values, or just referencing them even. However it most cases I often want to merge them down like that of a bunch of sheets of acetate rather than that of paper. That is if a certain value is in one object, but not any other, it is the value that will end up in the final object. That is the effect that is achieved when using the lodash [\_.merge](https://lodash.com/docs/4.17.4#merge) method.

<!-- more -->

## 1 - Basic example of lodash merge compared to assign

So for starters there is taking a look at a very simple example of using the merge method compared to [lodash assign](/2018/09/21/lodash_assign/) which is another popular method used for merging together objects. The lodash assign method or the native Object.assign method just copy references to any nested objects that might exist in the given source objects. In many cases this might not preset a problem, but it can result in unexpected behavior now and then it you do not understand the differences between these various methods that are used to merge objects together in lodash and native javaScript.

```js
// s source object
let source = {
    x: 1,
    y: 2,
    z: {
        val: 42,
        mess: 'foo'
    }
};
// creating new objects with _.merge, and _.assign
let m = _.merge({}, source),
a = _.assign({}, source);
// changing a value in nested object of the source object
source.z.val = 0;
// new object created with _.merge is not effected
// by the change to the source object while the new
// object created with _.assign is
console.log(m.z.val); // 42
console.log(a.z.val); // 0
```

One of the key factors to keep in mind here is the nature of copying by reference rather than by value. In javaScript copying objects is just not the same thing as copying primitive values. When you have a whole bunch of nested objects in an object do you want to just copy the first level into a new object, or do you want to recursively copy everything? In sort a shallow clone of an object is nit the same thing as a deep clone of one.

## 2 -  The lodash \_.merge vs the lodash \_.assign method

The lodash \_.merge differs from lodash \_.assign method in that \_.assign will create a new object for my deltas overwriting any values that may exist in any lower object. In other words I would end up with an undefined value for delta.y in my example.

```js
// merge everything down into a new object
merge = _.merge({},methods,defaults,inputs),
assign = _.assign({},methods,defaults,inputs);
 
console.log(merge.delta.x + ',' + merge.delta.y); // 325,240
console.log(assign.delta.x + ',' + assign.delta.y); // 325,undefined
```

In some cases this might be a desired effect, but in the example I am presenting here, obviously not.

## 3 - A lodash \_.merge example with many objects

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


## 4 - Conclusion

So the lodash merge method is one such method that seems to be something of use compared to what is available in just native javaScript by itself at least at the time of this writing. There is more than one method in lodash for merging object together as well as for making deep and shallow clones of objects. In addition there is what there is to work with when it comes to native javaScript static objects for doing this sort of thing as well as working out my own methods for copying and merging objects. It can all be a little confusing, and at times I myself still do not thing I have everything as sold as I would like with this. However by just taking a breath and working put some simple examples it can quickly become clear as to the differences between all these options for copying and merging objects in lodash and native javaScript.