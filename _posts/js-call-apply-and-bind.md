---
title: Whats the deal with JavaScript Call, Apply, and Bind
date: 2017-09-21 08:56:00
tags: [js,corejs]
layout: post
categories: js
id: 40
updated: 2020-10-16 10:33:05
version: 1.20
---

In my travels on the open web I see a lot of posts on the [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) keyword, and also the [JavaScript call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply), and [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) methods of the Function prototype. So writing a post on the this keyword is something that just needs to happen at one point or another when writing, and maintaining a blog on javaScript.

I did cover the [this keyword](/2017/04/14/js-this-keyword/) before, but I did not get into call, apply, and bind and least not in detail. In any case it strings me as a good idea to have a post where I am just getting into just the use of these methods and how they relate to the use of the this keyword.

The call method is maybe the one that I find myself using the most often, and simply put this Function prototype method is a function that can be called off of any function, and the value of what the this keyword should be inside the body of the function can be set by passing that value as the first argument when calling the call method. So this call method comes in handy often when working with native javaScript methods to help break methods free from their Class and get them to work with any object to which they might work with. 

So in this post I will be going  over some examples of the use of call, as well as apply and the bind method that each do the same thing a little differently.

<!-- more -->

## 1 - Where to get started with JavaScript Call, Apply, and Bind.

Maybe a good place to start is to know that in javaScript you often have a situation in which you are working with one or more objects, and you also have methods that act on those objects. For example there are Arrays and then there are methods like join that act on those arrays.

```js
var arr = ['foo','man','chew','is','always','in','style'],
mess = arr.join(' ');
console.log(mess); // foo man chew is always in style
```

No confusion there, but with the power of call I can invoke the Array.join method on a plain old object.

```js
var arr = {0:'foo',1:'man',2:'chew',3:'is',4:'always',5:'in',6:'style',length:7},
mess = [].join.call(arr,' ');
console.log(mess); // foo man chew is always in style
```

The main point here is that yes there are methods that are associated with a certain kind of Object that is made with a certain kind of constructor function. However if any object just happens to have values that a method uses, call can be used to invoke a method on any object regardless if it is an instance of the constructor that it is associated with or not. A real simple way of thinking about it, is that Call can be used to free methods from there prototype.

## 2 - Using Function.call

So call is a property of the Function prototype, which means it is a method that works with any function, including methods that are part of the prototype of any kind of Object like Date, and Array. Call works by using the call method on any function that I want to use with a certain object in which it might work by passing that object as the first argument. This Object will become the value of the this keyword when it comes to the body of the code that defines the method I am using. Any additional arguments are just the arguments that normally get passed to the method that I am using with call like normal.

## 3 - Using Apply

Apply works the same way as call, but you pass an array of arguments. This array of arguments will then be used with the method that apply is called off of where the value given in index zero will be the first argument and so forth.

```js
console.log( [].concat.apply({length:3},['foo','man','chew']) );
console.log( [].concat.call({length:3},'foo','man','chew') );
 
// both produce ['foo','man','chew'];
```

## 4 - Using Function.bind

Bind will return a new method that can be used with the given object. It Works just like call, and apply, but will give you a new function that can be assigned to a variable, and called all over the place.

```js
// basic object
var obj = {
 
    x : 0,
    y : 0
 
},
 
// basic module example
mod = {
 
    x: 37,
    y: 50,
 
    // move by angle, and distance
    moveAD: function(angle, dist) {
 
        this.x += Math.cos(angle) * dist;
        this.y += Math.sin(angle) * dist;
 
    }
};
 
// moved by a distance of 100 by a 45 degree angle
mod.moveAD(Math.PI / 180 * 45,100);
 
console.log('*****');
console.log(obj.x +','+obj.y); // unchanged
console.log(mod.x +','+mod.y); // moved 100
 
// bind to obj
moveAD = mod.moveAD.bind(obj);
moveAD(0,100); // now use the method made with bind
 
console.log('*****');
console.log(obj.x +','+obj.y); // moved 100
console.log(mod.x +','+mod.y); // unchanged
 
// just calling the method dirrecly still works as exspected
mod.moveAD(Math.PI / 180 * 45,100);
console.log('*****');
console.log(obj.x +','+obj.y); // unchanged
console.log(mod.x +','+mod.y); // moved 100
```

## 5 - Using call to create a custom api in a higher order function

One use case example of Function.call would be to use it to make a custom api that can be used via the this keyword inside the body of a function that is used with call to set the value of this. For example say I want to make a function that can be used to set the state of something based on a current frame relative to a max frame count basis.

In that case I might make something like this.

```js
var setFrame = function (frame, opt) {
    opt = opt || {};
    opt.frame = frame === undefined ? 0 : frame;
    opt.maxFrame = opt.maxFrame === undefined ? 50 : opt.maxFrame;
    opt.forFrame = opt.forFrame || function () {
        console.log(this);
    };
    var per = opt.frame / opt.maxFrame;
    opt.forFrame.call({
        frame: opt.frame,
        maxFrame: opt.maxFrame,
        per: per,
        bias: 1 - Math.abs(0.5 - per) / 0.5
    });
};
 
setFrame(10, {
    forFrame: function () {
        console.log(this.per); // 0.2
    }
})
```

This is an example of a high order function which is a fancy term for a function that accepts a function as one of its arguments. When it comes to calling a function that is passed as an argument, it can just be called like normal, but using something like Function.call can be used to set what the value of the this keyword is inside the body of that function that is passed as an argument.

## 6 - Using Array prototype methods with other objects that are not arrays

So Function.call and the similar methods can be used to use prototype methods of a class with objects that are not an instance of that class. If the object just happens to have all the properties that the method uses, then chances are, in most cases it will work.

```js
// not an array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
// Can use call to use an Array method with an object
let arr = Array.prototype.map.call(obj, (n) => {
        return Math.pow(2, n);
    });
console.log(arr.constructor.name); // 'Array'
console.log(arr); // [2,4,8]
```

## 7 - A Function call use case example that involves getting the word count of a page

As a content writer I do a little keyword research now and then, and in the process of doing so I check out the content of the competition. If I want to rank well with a given keyword I must of course write content that is at least just as good if not far better than the content that is all ready ranking for a keyword of interest.

There are many things to go by when it comes to garaging the quality of a piece of content, but one of many metrics that come to mind is of course word count. So when looking at a piece of content I like to know the word count of it along with many other things. I should use some kind of browser plug-in, and I have plans to eventually develop or use some kind of software that will do the job. However I can also just copy and past something like this into the javaScript console of the page that I am looking at as well.

```js
[].map.call(document.getElementsByTagName('p'), (p) => {
    return p.innerText;
}).reduce((acc, words) => {
    return acc + words + ' ';
}).split(' ').length;
```

The use of Function.call allows for me to use an Array prototype method with an instance of HTMLCollection. I then create an Array of strings of the inner text of each paragraph element in the page, and then of course use that to get a ruff idea of word count.

## 8 - conclusion

Yes call, apply, and bind are pretty helpful function prototype methods that every javaScript developer should be aware of. They allow for me to break methods from there prototypes and use those methods with any object. They can also be used to apply a prototype method of a Class to any object, and in some cases it will work.