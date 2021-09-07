---
title: Booleans in javaScript what to know
date: 2018-11-28 15:06:00
tags: [js]
layout: post
categories: js
id: 339
updated: 2021-09-07 09:54:00
version: 1.42
---

In [javaScript](https://en.wikipedia.org/wiki/JavaScript) one of the most important primitive values to work with is a [js boolean value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean) that will store a true of false value. To create a boolean there is the boolean literal, and the Boolean object that can be used as a [javaScript constructor](/2019/02/27/js-javascript-constructor/) function to create a boolean also. In addition booleans are often what is returned when using a method such as with the [lodash isArray method](/2017/09/27/lodash_isarray/), and can happen as a result of an evaluation of an expression also. 

A boolean is a value that only has two possible values true, or false, and as such numbers, and other values can often be used as a replacement for boolean values. Although doing so will eat up more memory, and often a boolean is just the appropriate choice for simple true and false values when it comes to code readability. There are some tricks that I have picked up here and there when it comes to booleans, so I will be sure to write about everything that I know about in this post when it comes to Booleans and how to work with them is a javaScript programing environment. And also while I am at it I will be branching off into some other closely related topics when it comes to javaScript programing in general as usual.

<!-- more -->

## 1 - js booleans, what to know before hand, and basic examples

This is not a getting started post on javaScript, in this post I am writing just about booleans and how they are used with programming tasks with javaScript. If you are new to javaScript you might want to start with my [getting started post on javaScript](/2018/11/27/js-getting-started/). Still the examples here are fairly simple, it is just that if you have zero experience this might still prove to be a bit to advanced.

However if you are someone that has at least a little experience thus far, and would like to read up more on the use of booleans in javaScript, and a few code examples making use of boolean values, then this might prove to be a good read. In this section I am going over just a few very basic examples of how to go about creating a boolean value. This section might prove to be to trivial if you have a fare amount of experience thus far, so you may want to skip ahead to the bottom of the post for the more advanced examples.

### 1.1 - Basic logging example

For the most part if I want to set a boolean value I just set it using a boolean literal. When it comes to creating a boolean value by way of a literal then the true and false boolean literal keywords can be used do do just this. In this example I am setting the value of a logging variable to a boolean value of true that will be using in a logging function that will only log a given message of the logging variable is true.

```js
// logging boolean
var logging = true;
// log function that will only log if logging is true
var log = function (mess) {
    if (logging) {
        console.log(mess);
    }
};
// only foo will log
log('foo');
logging = false;
log('bar');
```

### 1.2 - A Boolean literal

For this example I have a boolean called firstRun that is set to true for starters, I then also have a loop that will fire once every second by way of using [setTimeout](/2018/12/06/js-settimeout/) to delay the next call of the method. The first time that the loop fires, a 'first run' message will log to the console, and the firstRun boolean will set back to false. Because I am using the firstRun boolean in an if statement, the 'first run' message will only fire once.

```js
var firstRun = true;
var loop = function () {
 
    setTimeout(loop, 1000);
 
    if (firstRun) {
        console.log('first run!');
        firstRun = false;
    }
 
    console.log('tick');
 
}
loop();
```

This might not be the best way to go about doing something like this as a better approach would be to have a completely separate method for doing anything that needs to happened during the first run of something. However that is a matter for another post, the goal here was to just demonstrate a use case for a boolean.

So literals are one way to end up with a boolean value, that is by just simply setting it to a variable with one of these true or false keywords. There are however several other ways to end up with a boolean value, for example they are often the result of expressions, and function calls. Also it might help to just look over a few more examples of booleans anyway so lets continue with this.

## 2 - Booleans from expressions

Boolean values can also be the result of an expression, that is a collection of numbers, strings, variables that contains such values combined with one or more operators. I will not be getting into operators and expressions in general here, that is a matter for another post. However I will be going over a few examples of expressions that evaluate to a boolean value in this section. 

For example say I have a x variable that holds a number value and I want another boolean that will be true when the x variable is in a certain range, otherwise the value will be false.

```js
var x = 5;
var inRange = x > 4 && x < 10;
console.log(inRange); // true
```

### 2.1 - Using !0 and !1

Many projects that aim to make the source code as compact as possible take advantage of all kinds of tricks to reduce file size. There is using a library that does a decent job of reducing the file size by removing all whitespace, and preforming replace operations for all variable names to smaller variable names that are just one character. However there is then going beyond that and trying to find yet even more ways to crunch things down even more. 

Sometimes I see the use of the expression !0 to replace the boolean literal true, and !1 to replace false as one way t go about crunching down file size even more.

```js
var g = !0; // true
var b = !1; // false
```

This works because the number 0 evaluates to false, and the ! operator both converts to boolean and negates the value as well. For projects where I really do want to crunch down file size it might be called for, but it reduces readability for some developers also. You would think that doing this would not make a big difference, and in many cases you might very well be right about that. However if the volume of source code is large enough, little tricks like this could add up a bit. In any case there is still just understanding out very simple expressions such as this work.

### 2.2 - Using !! to negate back

So the ! operator converts a non boolean value to a boolean, but it is also negated. So just calling the operator twice will then negate it back to its original value.

```js
var a = !!''; // false
var b = !!'foo'; // true
var c = !!1; // true
```

This is yet another tick I see used often as a way to convert something to a boolean value, and then convert that boolean value back to the original boolean value that it will evaluate to.

## 3 - The Boolean Object

In javaScript there is the Boolean global object that can be used as a constructor with the new keyword, or not. When used with the new keyword it will return an object and not a primitive Boolean value. The primitive value of the object can be retrieved with the valueOf method, but I can not think of much of any reason to create a Boolean variable this way. Speaking of the [value of method that is another topic that you might want to check out in detail](/2020/03/06/js-value-of/) at some point sooner or later as it is a way to set what the primitive value of an object should be.

Never the less when it comes to writing a post on boolean variables I suppose it is called for to cover this topic, as it is something that might pop up now and then here and there when reading various code examples.

### 3.1 - Using the Boolean Object as a constructor

When using the Boolean Object as a constructor it returns an object, and not a boolean. As such because the value returned is an object rather than a boolean value this might result in some problems when it comes to creating a boolean this way. When it comes to having one of these boolean objects the value of method of the object can be called to get the actually boolean primitive value of the boolean object that is returned.

```js
var b = typeof new Boolean(false); // 'object'
var c = typeof new Boolean(false).valueOf(); // 'boolean'
```

Making booleans this way is not such a great idea. It makes doing so far more complicated than it needs to be, and can lean to unexpected results if you are not aware of the fact that an object evaluates to true.

```js
var foo = new Boolean(false),
n = 0;
if (foo) {
    n += 1;
}
console.log(n); // 1
```

### 3.2 - Using the Boolean Object as a method

When omitting the new keyword a boolean primitive value will be returned rather than an object, making it a way to convert to a boolean.

```js
var a = Boolean(null); // false
```

I do not use this as well, because the !! operator works just fine to get such a task done. Still the Boolean Object is something to be aware of as it is often used in examples.

## 4 - Using Numbers in place of booleans

As I have mentioned in the section of expressions numbers as well as many other types in javaScript can be converted to a boolean value. The value of the boolean value will change from one type to another as well as with the value of the type. For example an empty string value will evaluate to false, however any non empty string value will evaluate to true. However in this section I think I will be focusing more so on using numbers in place of boolean values. Just for a quick overview any number other than that of zero or [NaN](/2017/09/23/js-nan/) will evaluate to true. So then the value of zero can be used as a way to end a loop, or fail some kind of test for something where all other number values do not.

There is also the simple fact that booleans to have there limitation after all it is a type where there are only two possible values. So if there are ways that I can just use numbers in place of booleans, this does not just allow for the same functionality by just using the numbers 0 and 1 for false and true, it also allows for additional values of course. So not only does the use of numbers allow for the same functionally, it also allows for additional possibles while we are at it.

### 4.1 - while loop example of using numbers

One simple numbers for booleans replacement example might be the while loop trick with an index value that starts at a non zero value, but will reach zero at some point. For example I can set the index value for an element in an array to the length of the array, and then subtract from i in the while loop area that is used to evaluate if the loop should keep looping or not. This way as long as the index value is above zero the loop will continue, but it will reach zero at some point, and when it does that will evaluate to false, and the loop will stop.

```js
// zero and NaN are false
console.log(!!0); // false
console.log(!!NaN); // false
// any number other than zero or NaN is true
console.log(!!1); // true
console.log(!!42); // true
console.log(!!Infinity); // true
console.log(!!-1); // true
console.log(!!-42); // true
console.log(!!-Infinity); // true
 
// This can then be used as a way to get out
// of a loop that will reach zero at some point
var arr = [1, 2, 3, 4],
i = arr.length;
while (i--) {
    console.log(arr[i]);
}
// 4 3 2 1
```

## 5 - Conclusion

So hopefully this post helped you with some of the basics of boolean values in javaScript. There is much more to learn when it comes to the use of Boolean values though, the bulk of which is only gained by experience I would say. Just keep working on projects, learning by doing is by far the best way to learn.