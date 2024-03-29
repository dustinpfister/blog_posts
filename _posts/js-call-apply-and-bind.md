---
title: JavaScript Call, Apply, and Bind Function prototype methods
date: 2017-09-21 08:56:00
tags: [js,corejs]
layout: post
categories: js
id: 40
updated: 2021-11-30 10:35:07
version: 1.54
---

In my travels on the open web I see a lot of posts on the [this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) keyword, and also the [JavaScript call](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call), [apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply), and [bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) methods of the Function prototype. So writing a post on the this keyword is something that just needs to happen at one point or another when writing, and maintaining a blog on javaScript it would seem. with that said I did cover the [this keyword](/2017/04/14/js-this-keyword/) before in a post, but I did not get into call, apply, and bind methods at least not in detail anyway. In any case it strikes me as a good idea to have a post where I am just getting into the use of these function prototype methods, and how they relate to the use of the this keyword.

The call method is simply a Function prototype method that can be called off of any function, and the value of what the this keyword should be inside the body of the function can be set by passing that value as the first argument when calling the call method. So this call method comes in handy often when working with native javaScript methods to help break methods free from their Class prototype object and get them to work with any object to which they might work with. One good example of this would be to get the array for each prototype method to work with an object that is an HTMLCollection object. An HTMLCollection object is not an instance of an array, but it is an example of an object where the own properties of the object are formated like that of an array, thus doing so will work.

So in this post I will be going  over some examples of the use of call, as well as apply and the bind method that each do the same thing a little differently. In the process if doing so I should also end up covering all kinds of other varioius subjects on javaScript that might prove to be useful.

<!-- more -->

## 1 - Where to get started with JavaScript Call, Apply, and Bind.

Maybe a good place to start is to know that in javaScript you often have a situation in which you are working with one or more objects, and you also have methods that act on those objects call prototype methods. What methods are available depending on the Class of the Object, for example there are Arrays, and in javaScript an Array is a Class of object. So when it comes to an Object that is an instance of an Array there are [Array prototype methods](/2018/12/10/js-array/) such as the array map method that will create a new array from a source array where each element in the new array is the result of some kind of action define by some code in the body of a function that I pass when calling them method.

In this section I will then be going over some basic examples that have to do with functions that contain the this keyword in the body of a function to refer to what is often a class instance of some kind. There is making methods that will work with a built in class, and then there is also making a whole new class from the ground up by getting into writing constructor functions. This is celled for as it is what I see as a first step before getting into the various function prototype methods such as the function call method.

### The source code examples here are on Github

The source code examples in this section, alone with the rest of this post, as well as all my other posts on vanilla javaScript can be found in [my test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-call-apply-and-bind) on Github. This post like many other posts is still a work in progress that I come around to edit every now and then. So that is where I store the current state of the source code examples, as well as any additional notes that have to do with research and planing out future edits. So then that would be a good place to make a pull request if you are on Github, there is also the comments section in this Blog that can be used as a way to bring something up.

### 1.1 - Only type array method that is a stand alone method that takes an array as an argument

Say I want to have a method that will return a new array from an array that will only contain elements that are of a given type. One way of doing that would be to quickly put together a method using the [array filter](/2020/10/03/js-array-filter/) method. However one question to ask when making a simple method such as this would be how to go about passing in the array value to call the filter method off of. With that there is just making it one of the arguments to pass when calling the method, so with that said maybe one would end up with something like this:

```js
var onlyType = function (arr, typeStr) {
    typeStr = typeStr || 'number';
    return arr.filter(function (el) {
        return typeof el === typeStr;
    });
};
// demo
var a = [1, 'two', 3, 'four', 5];
var b = onlyType(a, 'number');
console.log(b);
// [1, 3, 5]
```

There is nothing wrong with writing methods like this, in fact many developers prefer this kind of approach for a range of reasons. However this is very much a post on the Function prototype methods, as such it might be a good idea to take a method such as this and do something inside the body of the function that involves the use of the this keyword as a way to get a reference to an array.

### 1.2 - Only type method that uses the this keyword, but it is Monkey patching the prototype in question

Out on the wild Internet you might come across the occasional example that involves adding a method to the prototype object of a built in class. This is a practice that is often called monkey patching, and it is generally frowned upon unless there is decent justification for doing so, such as making sure that something that should be there is there.

With that said there is taking the above stand alone only type method, and dong something to monkey path it into the array prototype.

```js
Array.prototype.onlyType = function (typeStr) {
    typeStr = typeStr || 'number';
    var arr = this; // using 'this' keyword to refer to what should be an array
    return arr.filter(function (el) {
        return typeof el === typeStr;
    });
};
// demo
var a = [1, 'two', 3, 'four', 5];
var b = a.onlyType('number');
console.log(b);
// [1, 3, 5]
```

Although this might work it is not always the best way of going about doing things. When new developers are first learning about javaScript they might end up gaining the false impression that this method is built into javaScript code when studying the source code elsewhere that uses this. However this is a situation in which the this keyword is being used to refer to some kind of state or class instance to which I am working with.

### 1.3 - Only type array method using the this keyword and Function.call

So then I took my stand alone only type method and changed things up so it is now just the type string that I want that is given as an argument, and I am not using the this keyword as a way to refer to what should be an array. However I can not now just call this method just anywhere now, I must have a way to go about setting what the value of the this keyword is. This is where one of the Function prototype methods will come in handy as I can use the call method as a way to go about getting this method to work with an array.

```js
var onlyType = function (typeStr) {
    typeStr = typeStr || 'number';
    var arr = this; // using 'this' keyword to refer to what should be an array
    return arr.filter(function (el) {
        return typeof el === typeStr;
    });
};
// demo
var a = [1, 'two', 3, 'four', 5];
var b = onlyType.call(a, 'number');
console.log(b);
// [1, 3, 5]
```

### 1.4 - Directly calling a prototype method off of a built in class

When it comes to working with arrays there are a whole lot of built in prototype methods to work with. Thus far in this section I went over some examples that make use of the array map method. Another one of these methods would be the array join method that will return a new string from an array of elements where there is a separator string between each element that is given as an argument.

```js
var arr = ['foo','man','chew','is','always','in','style'],
mess = arr.join(' ');
console.log(mess); // foo man chew is always in style
```

No confusion there, but with the power of call I can invoke the Array.join method on a plain old object that is not an array. So next lets look at an example of that.

### 1.5 - Getting a built in prototype method to work with an object that is not of that Class.

The call function prototype method can be used as a way to liberate built in prototype methods from there prototype objects and call the method with any object. If the object that I am using with an array prototype method just happens to be formated in the same way as an array, then it should more often then not work fine.

```js
var arr = {0:'foo',1:'man',2:'chew',3:'is',4:'always',5:'in',6:'style',length:7},
mess = [].join.call(arr,' ');
console.log(mess); // foo man chew is always in style
```

The main point here is that yes there are methods that are associated with a certain kind of Object that is made with a certain kind of constructor function. However if any object just happens to have values that a method uses, call can be used to invoke a method on any object regardless if it is an instance of the constructor that it is associated with or not. A real simple way of thinking about it, is that Call can be used to free methods from there prototype.

## 2 - More on using Function.call

So call is a property of the Function prototype, which means it is a method that works with any function, including methods that are part of the prototype of any kind of Object like Date, and Array. Call works by using the call method on any function that I want to use with a certain object in which it might work by passing that object as the first argument. This Object will become the value of the this keyword when it comes to the body of the code that defines the method I am using. Any additional arguments are just the arguments that normally get passed to the method that I am using with call like normal.

### 2.1 - Basic call example

To help get a basic idea of what is going on when it comes to using call it might be a good idea to work out a simple example that just involves a single method of a plain old object that makes use of the this keyword to refer to the object that it is a part off.

Here I have a javaScript call example that just has a simple add method in a plain javaScript method created with the object literal syntax. In this add method I am using the this keyword to refer to the object that it is a part of, and I am adding the values of the a and b properties of the object. When I just call this method the returned result is going to be the sum of the a and b properties of this object that the add method is a part of. However because the add method is a function, and thus has all the prototype methods of a function, I can use the call function prototype method off of the add function to set a different object for the add method to use.

```
// an Object
var pt = {
    a: 2,
    b: 3,
    // a simple add method of this object
    // that uses the this keyword to refer to
    // properties of the object
    add: function () {
        return this.a + this.b;
    }
};
// just calling the add method
console.log(pt.add()); // 5
// using Call to use the add method with another object
console.log(pt.add.call({
        a: 1,
        b: 1
    })); // 2
```

## 3 - Using Apply

Apply works the same way as call, but you pass an array of arguments after passing the value for this rather than additional arguments. This array of arguments will then be used with the method that apply is called off of where the value given in index zero will be the first argument and so forth. This proves to be useful in various situations in which I have an array of values that I would like to use as arguments to a function, on top of setting what the value should be for the this keyword.

### 3.1 - A Basic apply example involving the array slice method

For a basic example of the apply function prototype method I went with this example that has to do with using a string with the [array slice](/2018/12/08/js-array-slice/) method.

```js
var str = 'Hello Word'
var a = [].slice.apply(str, [6, 10]);
console.log(a);
// [ 'W', 'o', 'r', 'd' ]
```

### 3.2 - The Array push method and apply

Another array prototype method that works well with apply would be the [array push method](/2020/06/17/js-array-push/) which is one of many options when it comes to adding elements to an array. However it also works well as an option for pushing public keys to an array like object also, when used with a function prototype methods like the apply method.

```js
var obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
[].push.apply(obj, ['foo', 'man', 'chew']);
console.log( obj );
/*
{
    '0': 1,
    '1': 2,
    '2': 3,
    '3': 'foo',
    '4': 'man',
    '5': 'chew',
    length: 6
}
*/
```

### 3.3 - The arguments object and array apply

I often fine myself in situation in which I am using the apply method to call a function that will have a fixed number of standard arguments, alone with one or more additional arguments. In this example I have a state object, and then I have what would be a collection of update methods that can be applied to this state object. Each update method for this state object will have a fixed number of standard arguments, and then one or more additional option arguments.

The [arguments object](/2019/01/21/js-javascript-arguments-object/) is an example of an array like object, that is the kind of object that will often work okay with a method like array apply. I am using apply with the array slice method to create an array of additional arguments. I then use apply again with what I want to set as the value for the this keyword for these update methods, as well as using a final array of call arguments which is the result of a concatenation of the core arguments and these additional arguments.

```js
var state = {
    count: 0,
    baseDelta: 1
};
 
var updateMethods = {
    optionOne: function (state, count, baseDelta, a) {
        a = a === undefined ? 0 : a;
        // referring to state by way of this keyword
        this.count = count + baseDelta + a;
    }
};
 
var updateState = function (state, methodKey) {
    var coreArgumnets = [state, state.count, state.baseDelta],
    // additional arguments array from arguments object thanks to splice and apply
    additionalArgumnets = [].slice.apply(arguments, [2, arguments.length]);
    var callArgumnets = coreArgumnets.concat(additionalArgumnets);
    // calling update method with apply
    updateMethods[methodKey].apply(state, callArgumnets);
    return state;
};
 
updateState(state, 'optionOne', 5);
 
console.log(state);
// { count: 6, baseDelta: 1 }
```

### 3.4 - Math min and max methods

One example that I should bring up in this section is the need trick that can be done with the [Math.min, and Math.max methods](/2020/01/22/js-math-max-min/) with apply. These methods work by giving one or more numbers by way of arguments, and then the highest or lower numbers of the set of numbers is what is returned.

```js
var nums = [1, 7, 100, 30, 0, 0, 5];
 
console.log( Math.min.apply(null, nums) ); // 0
console.log( Math.max.apply(null, nums) ); // 100
```

### 3.5 - A sum method that adds up arguments

For this example I have a simple sum method that uses the [array reduce method](/2021/07/13/js-array-reduce/) with the Function call method to add up all the arguments that are given to it by making use of the arguments object.

```js
// a sum methods that adds up all the arguments given
var sum = function () {
    return [].reduce.call(arguments, function (acc, n) {
        return acc + n;
    }, 0)
};
// using apply for this
var nums = [1, 2, 3, 4, 5];
console.log( sum.apply(null, nums) ); // 15
```

### 3.6 - Concatenating arrays of arrays with apply

Another example of apply that is worth bring up in this section might be this one involving an [array of arrays](/2020/03/31/js-array-multidimensional/). With this example I have an array fo arrays and I want to concatenate an array in front of the first array of the array of arrays. Now there may be a wide range of ways of how to go about doing this, and maybe the best option would be to just use the array unshift method to do so, there are also ways of flattening the array of arrays first and then concatenating just two arrays. However for this example I am just going to go over some quick examples that involve just using array concat and the function apply method.

```js
var arrays = [
    [4, 5, 6],
    [7, 8, 9]
];
 
// not what I want
console.log( [1,2,3].concat(arrays) );
// [ 1, 2, 3, [ 4, 5, 6 ], [ 7, 8, 9 ] ]
 
// works
console.log( [1,2,3].concat(arrays[0], arrays[1]) );
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
 
// also works using apply though
console.log( [].concat.apply([1,2,3], arrays) );
// [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## 4 - Using Function.bind

Bind will return a new method that can be used with the given value for the this keyword in the method that it is called off of. So then the bind function prototype method works just like call, and apply, but will give you a new function that can be assigned to a variable. Once this stored function is created with bind the function can then be called all over the place so it can be used as a way to capture the value of the this keyword.

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

## 6 - Using prototype methods with other objects that are not of that prototype

So Function.call and the similar methods can be used to use prototype methods of a class with objects that are not an instance of that class. If the object just happens to have all the properties that the method uses, then chances are, in most cases it will work. However in some cases it might not work because some prototype methods might call other prototype methods and if they are not in the prototype object that I am passing for the this keyword then of course that will cause an error.

### 6.1 - Array map example with array like object

I all ready covered a few source code examples in this post that involved using array prototype methods with array like objects. So then this example will just be more of the same for the most part by using yet another array prototype method with an array like object.

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

### 6.2 - Using the to upper case string prototype method with an array

Many of the examples in this post in which I am using a prototype method with something that is not of that prototype method involves the use of array prototype methods. So in this section I think I will explore this sort of thing more by looking into some string prototype methods. With that said it would seem that some string methods will work well with arrays, one of these would be the to update case method of the string prototype.

```js
var str = ''.toUpperCase.call(['aa', 'b']);
console.log(str); // 'AA,B'
```

## 7 - Problems with using Function prototype methods

There is running into problems now and then when using Function prototype methods to get methods of a prototype to work with some kind of objects or value that is not an instance of that prototype. Often there might be good reasons for this, and as such some times the best solution is to just not use the function prototype methods, but fine a way to create a new instance of the prototype itself, and just use the methods as intended.

In this section I will then be going over at least a few examples of this sort of thing where it is just not possible to use the function prototype methods, or for one reason or another it might just not be a good idea. This is often not a problem though as long as there is some way to go about creating an instance of the class itself using the object or value that I want to use with the method. Some times that is just the way that it needs to happen.

### 7.1 - Problems with array concat

One array method that I ran into trouble with while editing this post was the [array concat method](/2020/07/13/js-array-concat/), and trying to use an array like object with it. The returned result is not a new array with the numbers keys of the array like object as elements of the new array, but the array like object being the first element of the new array.

So far it would look as though I just need to convert the array like object into an actual array for this one, which is not so hard as the [Array.from method](/2020/01/27/js-array-from/) is one method that can make quick work of that. Once I have my array that was created from the array like I can then just call the concat method like normal because it is an actual array that I am working with.

```js
// not an array
let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3
};
 
// this will not work as expected
console.log([].concat.apply(obj, [4, 5, 6]));
// [ { '0': 1, '1': 2, '2': 3, length: 3 }, 4, 5, 6 ]
 
// Some times I just have to convert to an array
console.log(Array.from(obj).concat([4, 5, 6]));
// [ 1, 2, 3, 4, 5, 6 ]
```

There might be one or more ways to go about [getting the function prototype methods to worth with array concat](https://stackoverflow.com/questions/48097695/get-concat-to-work-with-an-array-like-object). However it is not like these methods always have to be used to accomplish what needs to happen. Often there are one or more methods that can be used to create an instance of the class itself such as the Array.from method, if for some reason I run into problems using the constructor of the class that I want to use with an object.

### 7.2 - Problems with date prototype methods

Another set of prototype methods that I have run into problems with is the Date Class prototype methods. When it comes to looking into what the Date Object equivalent of an array like would be I ran into trouble finding out what that is, as I can not find any public or private keys values for one. So then If I need to do something with one of these methods with an object or value that is not a date object, I am just going to need to create an instance of the Date object with the constructor first.

```js
var d = new Date();
// no pubic or private keys with date objects!?
console.log(Object.keys(d)); // []
console.log(Object.getOwnPropertyNames(d)); // []
// so how to I even?
try {
    var obj = {};
    console.log(Date.prototype.getFullYear.call(obj));
} catch (e) {
    console.log(e.message); // this is not a Date object.
}
 
// guess I just have to fine other ways, which is what I should do anyway
 
// From Numbers
console.log(new Date(1234567890123)); // 2009-02-13T23:31:30.123Z
var y = 2021, m = 1, d = 3;
console.log(new Date(y, m - 1, d)); // 2021-01-03T05:00:00.000Z
```

## 8 - A Function call use case example that involves getting the word count of a page

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

## 9 - conclusion

Yes call, apply, and bind are pretty helpful function prototype methods that every javaScript developer should be aware of. They allow for me to break methods from there prototypes and use those methods with any object. They can also be used to apply a prototype method of a Class to any object, and in some cases it will work.