---
title: JS Function basics and much more
date: 2019-12-26 14:52:00
tags: [js]
layout: post
categories: js
id: 585
updated: 2021-07-23 13:35:40
version: 1.37
---

In [javaScript functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions) are a central part of much of the code that a javaScript developer will be studying and writing. The basics of functions in javaScript are something that can be quickly picked up in a flash, however there are many other aspects of functions in javaScript that might take longer to get solid. Functions can be used as a way to create reusable segments of code, but there are many different ways of just doing that to begin with. Functions are also used for compartmentalizing massive amounts of code into a kind of module or package, and functions can also be used as a way to create a main application loop.

So this post will be a general overview of functions in javaScript, I will not be getting into every little thing that comes up in detail, but I will be touching base on a wide range of topics relating to functions in javaScript, and I will link to additional content where doing so is called for.

<!-- more -->

## 1 - Basic javaScript function examples

There are many ways to go about defining a function in javaScript such as [function expressions](/2019/01/27/js-function-expression/), [function declarations](/2019/04/11/js-function-declaration/), and yet even more options. There is getting into the depth of the differences between these kinds of functions in javaScript, but for now lets start out with a few very simple examples of a functions in javaScript.

### 1.1 - js function basic example that returns something

When writing a function the use of the return keyword is required if you want the function to return some kind of product. There is a few exceptions to this though when it comes to working with variables down the scope chain, and constructor functions, more on that later.

```js
var func = function () {
    return 'Hello World';
};
 
console.log( func() );
```

Here I defined a function via a function expression and I assigned that function to a variable called func. I can then call that function and the string hello world is returned. This is the basic idea of what is accomplished with many functions, you call it and some kind of product is returned. This might be a silly pointless example, but we will be progressing on to some real examples later on in this post that also return a product when called with the return keyword, but also by another way of interest in javaScript.

### 1.2 - Function Arguments AKA independent variables

A function can be passed one or more arguments, or in other worlds independent variables, these argument values are then local to the body of the function when it comes to scope, and they are typically used in the process of creating and returning a value of some kind. However they differ from any additional variables that may be defined inside or outside of the body of the function.

```js
var func = function (a, b) {
    return a + b;
};
console.log(func(1, 2)); // 3
```

Functions do not always have to be used to return something though, often a function is just used as a way to keep things encapsulated from everything else. However getting back to the topic at hand here, it is import to know that arguments can of course be added to functions by simply just having a few argument names for them. There is a lot more to write about when it comes to arguments such as the arguments object, and also the nature of the this keyword, as well as the variable scope chain as well as the prototype chain, but for now this is just the basic section.

### 1.3 - local variables, and Dependant variables

The use of the var keyword, or any of the more modern alternatives inside the body of a function will result in the variable having a scope that is local to the body of the function. So the value can only be accessed inside that function and now outside of it. In old specs of javaScript there was only function level variable scope, however in newer specs the scope of variables can be block level by using let or const to declare them rather than the tired yet true var.

```js
var func = function (x, y) {
    var a = x + y,
    b = Math.pow(x, y),
    c = Math.sqrt(a * b);
    return Math.round(c);
};
var d = func(2, 5);
console.log(d); // 15
try {
    console.log(x);
} catch (e) {
    console.log(e.message); // 'x is not defined'
}
```

## 2 - A Constructor function

So another thing about functions is using them to create what is often called a [constructor function](/2019/02/27/js-javascript-constructor/), or just simply a constructor for short. Of you have been using javaScript for at least a little while thus far chances are you have used one or two all ready. One example of a built in constructor function would be the Date constructor. This Date constructor is called with the new keyword to create an instance of a date object. Once there is a date object there is a whole bunch of methods that can be called off of that data object such as the get full year method that will return the full year of that date object instance.

As a javaScript developer you can use built in constructor functions such as Date, but you can also create your own by just simply using the this keyword in the body of a function that will be used as a constructor. This user defined constructor function should be a function expression, or declarations, but not an arrow function because of how the this keyword is handled in arrow functions. Once you have a constructor function prototype methods can then be added to the prototype object of the constructor function.

In other words something like this.

```js
var Box = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0 : opt.x;
    this.y = opt.y === undefined ? 0 : opt.y;
    this.w = opt.w === undefined ? 32 : opt.w;
    this.h = opt.h === undefined ? 32 : opt.h;
};
 
Box.prototype.getArea = function () {
    return this.w * this.h;
};
 
var bx = new Box({w:10, h:5});
 
console.log( bx.getArea() ); // 50
```

These days there is a lot of talk about pure functions and how they differ from constructor functions. JavaScript is not a language that is purely functional because of the built in prototype nature of functions and objects. However functional style programing can still be done with it, it is just that that style of programming is not enforced, you can break free from it if you want to by making functions like that of a constructor, or a function that uses a variable in the global scope, and so forth that violate the rules of functional programming.

## 3 - Pure functions

[Pure functions](/2020/06/18/js-function-pure/) are functions that only work with what is given via a set of arguments, and not anything that that is a global variable of object class instance. They also do not mutate and object that is given in place but return a new object.

```js
var pure = function (a, b) {
    return a + b;
};
 
console.log(pure(1, 1));
```

## 4 - Arrow functions

In late specs of javaScript there are now [arrow functions](/2019/02/17/js-arrow-functions/), these kinds of functions are nice and concise. There is one draw back to using arrow functions though and that has to do with how the this keyword is handled, because of that they can not be used as a drop in replacement for other kids of options that work better with function prototype methods like call and apply.

```js
let foo = _ => 'bar';
 
let bar = ()=> 'foobar';
 
let pow = n => 'pow: '+ Math.pow(2,n);

let est = (s,c) => {
    return s / c * 6.5 
};
console.log(foo()); // 'bar'
console.log(foo(4)); // 'pow: 16'
```

## 5 - The this keyword and javaScript functions

The [this keyword](/2017/04/14/js-this-keyword/) is something that deserves a whole post on its own, and I have got around to written on eon that a long time ago. However now that I got around to writing a post on javaScript functions in general I think that such a post should at least touch base on the nature of the this keyword.

I have all ready covered constructor functions and how the this keyword applies there, but I should also at least mention that the this keyword can come into play outside of that of constructor functions. For example the Call function prototype method can be used to change what the value of the this keyword is, thus it is a way to break methods out of there prototypes and get them to work on any object to which it might in fact work with or without problems.

### 5.1 - Having a method of an object

One way to start playing around with the this keyword outside of that of constructor function is to create a method that works just like a prototype method, but just make it part of a single stand alone object rather than that of a prototype object.

```js
var pt = {
    x: 0,
    y: 0
};
pt.distance = function (x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
};
console.log( pt.distance(10, 5).toFixed(2) ); // 11.18
```

So when I just call the method of the object the this keyword will refer to the object to which the method is a property of. However this can easily be change by making use of some methods that are part of the prototype of any javaScript function that can eb used to change what the value of this is in the body of a function such as this distance method. Well at least function expressions and declarations anyway.

### 5.2 - The call function prototype method

The call method of the function prototype can be called off of any function as any function is an instance of the function constructor and therefor prototype methods are there to work with. By calling the call method off of a function the first argument that I pass to call is a value that will be used as the value of the this keyword in the body of the function, after the first argument I can then continue passing arguments like normal.

```js
var pt = {
    x: 0,
    y: 0
};
pt.distance = function (x, y) {
    return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
};
var pt2 = {
    x: -10,
    y: -10
}
console.log(pt.distance(0, 0).toFixed(2)); // 0.00
console.log(pt.distance.call(pt2, 0, 0).toFixed(2)); // 14.14
```

## 6 - Loops with javaScript functions

Functions can be used to create a product with some independent and Dependant variables, that is I pass some arguments to it and it returns a result based just on those arguments. However not all functions in javaScript are those kinds of functions there are functions that act on an object that I pass it as an argument in place, and then do not return anything, or the result is just another reference to the same object that I just passed it. Functions can also be used for a number of other kinds of things such as just having a way to wrap everything up into a local variable scope, or creating main application loops by calling the function inside the body of the function itself. So with that said lets look at a few examples of making a loop of sorts with a function rather than that of a while loop or something to that effect.

### 6.1 - Basic function loop with setTimeout

One basic way to go about making an application loop with a javaScript function would be to use the [setTiemout method](/2018/12/06/js-settimeout/) inside the body of a function and call the function itself with it in a delayed way. So in other words I create a function and call setTiemout inside the body of the function, I pass setTiemout a reference to the function in which I am calling setTiemout as the first argument, and then a millisecond value as the second argument. The setTiemout method will then return a number that I can pass to clearTiemout if I want to cancel the delayed action of calling the inner loop again.

```js
var c = 0;
var loop = function () {
    var id = setTimeout(loop, 100);
    console.log(c);
    c += 1;
    if (c >= 50) {
        clearTimeout(id);
    }
};
loop();
```

So then this is the basic idea of what an app loop is with javaScript functions. of course this topic can branch off into a wide range of other topics surrounding this kind of use of javaScript functions. There are many other options when it comes to making this kind of function. There is the setInterval method, and in client side javaScript there is the requestAnimationFrame method that might be a better choice when it comes to canvas projects. 

There is also the fact than making a loop this way is still resulting in having code run in a single event loop, so use of this alone is not an example of what might often be referred to as _true-threading_ However getting into that would be way off topic when it comes to just this general overview of what can be done with javaScript functions.

## 7 - Inverse functions

Another topic that might come up with functions is the topic of [inverse functions](/2021/07/23/js-function-inverse/). An inverse function, or anti function, is a kind of function that is the inversion of another function.  These kinds of functions will come all the time, often I have a way to go about getting a unknown value say x, with a known y value, other times I have y actually and now I actually need a way to get x with y. for example say I have a function that will return a position given a distance and angle, and inversion of that function would be a function that gives a distance and angle for a given position. So then in this section I think I should go over at least a few quick examples of this kind of function.

### 7.1 - basic inverse functions example

For a basic example of an inverse function say I have a function that will just return a value that can be called x, by multiplying an argument called y by 5. In that case the inverse of such a function would be a function that will divide x by 5 to get y.

```js
// get x function with div
var getX = function (y) {
    return y * 5;
};

var getY = function (x) {
    return x / 5;
};

// getting x when I know y
var x = getX(12);
console.log(x); // 60
// when I feed x to my getY function
// I should get the original value I gave to getX
var y = getY(x, 5);
console.log(y); // 12
```

## 8 - Conclusion

I have not even begone to scratch the surface when it comes to what can be done with javaScript functions in this post. The next step forward is to just get into creating projects with functions, and all the other little elements of the javaScript language.