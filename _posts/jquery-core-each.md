---
title: Using jQuerys core $.each method to loop over objects and Arrays
date: 2017-09-22 21:08:00
tags: [js,jquery]
layout: post
categories: jquery
id: 41
updated: 2017-09-22 21:57:21
version: 1.1
---

So the $.each method is a simple tool to loop over an object or array. This is not the first post I have written on a tool that does this, I wrote a post on the npm package traverse that is another tool that does basically the same thing. yes there is Array.forEach, the for in loop, and a wide range of other options that come to mind, but for now lets just keep it with an option in jQuery.

<!-- more -->

## The basics of looping over an object

In vanilla js typically looping over an object is done with a for in loop. It is not that hard to quickly write my own methods for this one.

```js
// here is my own each method using a for in
var each = function(obj, func){
 
    for(var key in obj){
 
        func(key,obj[key],obj);
 
    }
 
};
 
// it works with objects, and arrays
var obj = {x: 42,y: 70,w: 32,h: 32},
arr = [1,2,3,4,5,6],
forEach = function(k,v,o){
 
     console.log(k + ':' + v);
 
};
 
each(obj,forEach); // list properties
each(arr,forEach); // list elements
```

There are many other ways to do so, there is of course Array.forEach, and also while loops. However Array.forEach is only for Arrays, or regular Objects that look like arrays.

```js
[].forEach.call(
    {0:'foo',1:'man',2:'chew',length: 3}, 
    function(el){
        console.log(el);
    }
);
```

However the use of a while loop might be a nice change to my each method

```js
var each = function(obj, func) {
 
    var keys = Object.keys(obj),
    l = keys.length,
    i = 0;
 
    while (i < l) {
 
        func(keys[i], obj[keys[i]], obj);
        i += 1;
 
    }
 
};
```

But what am I doing wasting time writing my own methods for something that is so basic and trivial? Good question that is why there are all ready methods like this in many popular projects like jQuery.

## So why not just use $.each() if jQuery is being used.

yes there is no need to write that method, if there is something that will get the job done to begin with.

```js
$.each({x: 42,y: 70,w: 32,h: 32}, function(k,v){
     console.log(k + ':' + v);
});
```

## Use $.each to loop over $

So one idea that comes to mind is to use jQuerys each method to look over jQuerys core object. 

```js
$.each($, function(prop){
 
    console.log(prop);
 
});
```

This is something that I like to do whenever working with something new, just to get a sense of what it is that I am working with.

## Thats it for now

I have been writing posts at the rate of about one per day lately, as such quality is taking a hit. Maybe I will come back to this one at some point but there is not much to write about on it. Just another way to loop over an object.