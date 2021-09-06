---
title: Array Slice in javaScript and related topics
date: 2018-12-08 11:17:00
tags: [js,canvas,animation]
layout: post
categories: js
id: 346
updated: 2021-09-06 15:45:04
version: 1.43
---

In [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) the [Array.slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) prototype method comes up a whole lot in many code examples. The method is one way to go about getting a new array that is a range of element from a source array. It works in a very similar fashion to that of [Array.splice](/2021/07/20/js-array-splice/) but with one very important difference, it returns a new Array rather than manipulating the existing one that it is used with. So then the array slice method is a great way to go about getting a sub section of elements from an array, without mutating the source array from which I call the method.

This nature of the array slice method that involves not mutating [an array](/2018/12/10/js-array/) in place makes it more consistent with the concept of [pure functions](/2020/06/18/js-function-pure/), and functional programing when working with an array in JavaScript. Although I would not go so far as to say the array slice method is a pure function , the main reason why being that the array slice method is still very much an array prototype method.  So then the state of the result that is returned can differ with the same arguments depending on the state of the array off of which the array slice method is called. Still there is the nature of not mutating an array in place, that is a nice feature that is a step in that kind of a direction at least.

So for todays post on javaScript I will be covering some simple examples of Array.slice, as well as some related topics. At the end of the post I might also be able to get into at least one or more use case examples also while I am at it.

<!-- more -->


## 1 - JavaScript Array Slice basic example

For starters lets look at a very basic example of the Array.Slice method just for the sake of covering the very basics. With that said when working with an instance of a javaScript Array the Array.slice prototype method can be used by calling the method off the Array instance, and passing a starting and ending index for the range of elements to be included in the new array. The returned result will be a new array that is a collection of elements from that starting index up to one less from the ending index. So the ending index in other words will not be included in the returned new array that is a slice of the source array.

```js
let a1 = [1,2,3,4],
a2 = a1.slice(1,3);
 
// a2 is a new array
// with the starting and ending index values
// from the a1 array
console.log(a2); // [2,3]
 
// and a1 remains unchanged
console.log(a1) // [1,2,3,4]
```

The index values are zero relative as is the case with all javaScript arrays as usual.

What is nice about this is that you can see that the source array is not mangled, this is not the case with the array splice method that will mutate the array in place. Many built in array prototype methods are like that which is one talking point as to why a lot of developers still like to use lodash over some of this built in methods.

## 2 - Getting the last element of an array with array slice

Negative index values can be given to Array.slice this results in the corresponding index value from the end of the length of an array. So then array slice can be used as a quick way of getting the last element of an array by taking advantage of this fact by passing negative 1 as the starting index.

```js
let a1 = [1,2,3,4],
last = a1.slice(-1)[0];
 
console.log(last); // 4
```

So I guess it is slightly more concise then doing the same thing by subtracting one from the length of the array that I would usually use over doing that at least.

```js
let a1 = [1,2,3,4],
last = al[al.length - 1];
 
console.log(last); // 4
```

However there are yet event more ways of getting the last element in an array, but some of them will mutate the source array. Still if I just want to get the last element of an array, maybe it would be best to just use something like this and move on. This is not the kind of rabbit hole that I care to get stuck on, and I can always make these kinds of simple changes later on when maintaining a project of it comes to that.

## 3 - javaScript Array slice can be used to clone (or copy if you prefer) an array but it is a shallow clone

So because Array.slice returns a new Array rather than mutating one, it can in some cases be used as a way to clone an array assuming it is an array of primitive values. What I mean by that is that the use of Array.slice as a way to copy and array by itself will result in a shallow clone of the source array. So if the source array contains one or more objects as elements then those elements in the resulting array will be the same references to the same objects in memory. For this reason it is necessary to look into options for deep cloning an object then.

```js
let a1 = [1,2,3,4],
a2 = a1.slice();
 
a1[1] += 5;
 
console.log(a1); // [1,7,3,4]
console.log(a2); // [1,2,3,4]
```

This works because I am working with an array of primitives, objects however are copied by reference. So in these situations using just array slice might not be enough. When I am in these situations somehow I will need to preform what is often called a deep clone of the array. By doing so I would then return something that is separate from the source array that can not end up being mangled elsewhere in a body of code. However getting into stuff like that is beyond the scope of this post, if you want to read more about this then you might want to check out my post on [copying arrays in javaScript](/2020/09/03/js-array-copy/), and maybe also my posts on [lodash clone](/2017/10/02/lodash_clone/), and [lodash deep clone](/2017/11/03/lodash_clonedeep/).

```js
var points = [
    {
        x: 5,
        y: 42
    }, {
        x: 27,
        y: -15
    }
];
 
var p = points.slice();
 
points[0].x = 0;
 
console.log(points[0].x); // 0
console.log(p[0].x); // 0
```

## 4 - Some use case examples of array slice

In this section I will be going over at least a few [use case example of the array slice method](https://www.javascripttutorial.net/javascript-array-slice/) that might help to show how this method can be useful in some situations. Many of these examples might make use of the array slice method as part of the process of doing so, but there are a lot of other tools in the tool box when it comes to working with native javaScript. On top of using the array slice method I will also take the time to cover some other prototype methods and native javaScript features when going over these examples of the array slice method.

### 4.1 - Convert an array like object to an array

Often I might end up with something that is an array like object, in other words it is an object that is formated like an array, but it is not an array. The format of an array like object is that it has numbed key named for values, and a length property that reflects the number of these numbered keys, however the prototype of the object is something other than the of the array prototype. One way to go about converting one of these array like objects would be to have a helper method that uses the array slice method with call to force the method to work with an array like object, and because the properties of the object are like that of the array it should work

```js
var objToArray = function(obj) {
    return Array.prototype.slice.call(obj);
};
 
var obj = {
    0: 'a',
    1: 'b',
    length: 2
};
 
// so it would seem to work
var a = objToArray(obj);
console.log(a); //[ 'a', 'b' ]
 
// but there are also options like Array.from
console.log( Array.from(obj) );
//[ 'a', 'b' ] 
```

However there are a lot of other ways to go about doing this sort of thing with an array like object. One of the many ways to do so would be to just use the [Array.from method](/2020/01/27/js-array-from/) to convert and array like object to a regular array.

### 4.2 - Format a number example

One use case example that I made for this post was a format money example. There are a lot of ways of going about doing this sort of thing, and it would be a good idea to [look into a few other examples of how to go about doing this](https://stackoverflow.com/questions/5731193/how-to-format-numbers) other that the example I made for this post.

```js
let formatCentValue = function (centValue) {
    var centsArray = String(centValue).split('').slice(-2);
    var dollars = String(Math.floor(centValue / 100)).split('');
    var i = dollars.length - 3;
    if (i > 0) {
        while (i > 0) {
            dollars.splice(i, 0, ',');
            i -= 3;
        }
    }
    return dollars.join('') + '.' + centsArray.join('');
};
 
console.log(formatCentValue(100000025)); // 1,000,000.25
```

However making some kind of solution like this might prove to be more complex than needed. In most cases I want to format a number because it is a money value. Or for one reason or another I want to do something to format the number in a way that helps to make it more readable. In modern specs of javaScipt there is the number format method in the international object than can be used to make quick work of these sorts of things.

```js
var format_money = function(number){
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        // These options are needed to round to whole numbers if that's what you want.
        minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0 // (causes 2500.99 to be printed as $2,501)
    });
    return formatter.format(number); /* $2,500.00 */
};
 
console.log( format_money(1000.34444) ); '$1,000'
```

### 4.3 - Random color example

ANother good example might be some kind of random color method example that makes use of the array slice method as part of the process of doing so. However there are a [number of other examples of how to go about making a random color method](https://stackoverflow.com/questions/1484506/random-color-generator), many of which might not need the use of array slice, and might prove to be more concise. Never the less for the sake of just having some array slice method examples I have went with a method that make used of that of course.

Here I am using the Math random method to get a random number between 0 and 1, and I then use the to string method of the returned number to get a hex string of that value. After that I call the split method of the resulting string to get an array of random hex values, and then you guessed it used the array slice method to get the last six random hex letters. I then just use the array join method to set these six random hex letters in an array back to a string and concatenated it with the number symbol to get a valid hex color string.

```js
var randomColor = function () {
    return '#' + Math.random().toString(16).split('').slice(-6).join('')
};
 
console.log(randomColor());
```

## 5 - Conclusion

So the array slice prototype method is a way to get a section of an array, without mutating the source array. [This is not to be confused with the array splice](https://www.freecodecamp.org/news/lets-clear-up-the-confusion-around-the-slice-splice-split-methods-in-javascript-8ba3266c29ae/) method that can be use to do the same, only it will mutate the array in place. The array splice method is work checking out though for sure it is still a useful method and and just for the sake of getting a range of elements fro a source array, it can also be used to inject elements into an array also while one is at it.

When it comes to a nodejs environment there is the [buffer slice](/2021/03/19/nodejs-buffer-slice/) method that works just like the array slice method only with nodejs data buffers rather than arrays. There is also the idea of doing something similar to what the array slice method is doing in all kinds of collections such as with strings, typed arrays, html collections, and all kinds of similar objects that there are to work with in various environments.


