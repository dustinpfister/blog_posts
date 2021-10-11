---
title: The lodash _.remove array method and vanilla javaScript alternatives
date: 2017-09-19 12:57:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 38
updated: 2021-10-11 13:06:32
version: 1.39
---

The process of removing a few elements from an array can sometimes be a little troubling, or at least I remember that it was back when I was first starting out with javaScript. The trouble was mainly with looping over an array from a zero element index value upwards, each time an element is removed it of course changes the length of an array, which of course causes a problem when looping forward threw array index values that way. One way that I would resolve the problem is by looping threw the array backwards, and using an [array prototype](/2018/12/10/js-array/) method like [Array.splice](/2021/07/20/js-array-splice) to purge elements out. For the most part that seems to work okay, but here is a wide range of other ways to go about doing this sort of thing.

So when it comes to just using native javaScript alone of course there are ways of just going ahead and removing elements from an array. However this is a post on [lodash](https://lodash.com/) where it is assumed that lodash is part of the stack of a project, so with that said there is also the [\_.remove](https://lodash.com/docs/4.17.15#remove) array method to work with. It works by passing a method that is used to define the conditions that are to be used to remove one or more elements from an array, and on top of that will mutate the array in place just like that of the array splice method. However unlike the array splice method I can define a condition by which to remove all elements that meet the condition, rather than a start index and count of elements.

There are however other methods of interest, both in lodash and native javaScript though such as the filter method that might be a better option as it will do the same only not mutate the array in place. Still lots of developers are transitioning away from lodash, so I will also be looking at some vanilla js alternatives such as array splice, but also other native methods. Also there are some additional related topics that come to mind such as the question of removing elements at all to begin with or not when it comes to the idea of just having a fixed set of elements that are simply reused rather than created and purged, such is the case with an [object pool](/2020/07/20/canvas-example-object-pool/).

<!-- more -->

## 1 - lodash remove basic examples and what to know

The lodash remove method is one of the many [array methods in lodash](/2019/02/14/lodash_array/) that work with arrays, there are some additional options to be aware of such as the [pull](/2020/03/03/lodash_pull), [without](https://lodash.com/docs/4.17.15#without), and [filter](/2018/05/18/lodash_filter/) methods in lodash. The remove method is a method where a function must be passed to define what the condition is for removing and element from an array, and the remove method will also mutate the array in place. The other options in lodash do more or less the same as remove, only a value can be given rather than a function, and some of them will not mutate the source array.

So for starters in this section I will be writing about just a few quick simple examples using the lodash remove method, and I also often take a moment to mention some other things you might want to be aware of in this section before continuing to read the rest of this post.

### 1.1 - Basic example of the lodash remove method

It's pretty easy, just pass the array, and a method where you can define the conditions that will result in removal of the element that you want out of there. This method that is passed as the second argument will be given each element as an argument, and this of course can be used to define an expression that will evaluate to true or false. The return keyword can then be used in the body of that method, and if a true value is returned then the element in question will be removed from the array in place.

```js
var arr = ['foo', 27, 'man', 42, 'chew'];
 
_.remove(arr, function (el) {
 
    // remove all numbers
    return typeof el === 'number';
 
});
 
console.log(arr); // ['foo','man',chew];
```

So the method that you pass will return true of false, if what is returned is true the element will be removed.

### 1.2 - The return value of lodash remove

There is always taking note of what a return value of for a function if any, even for methods that mutate in place like the remove method. With that said the remove method is not like other methods that return a new array, so there is no need to set the return value of a new array that is returned t a variable that may have contained the source array like with other methods. However there is still a return value for the lodash remove method it is just that the return value is an array of elements that where removed from the array.

```js
let a = ['foo', 27, 'man', 42, 'chew'];
let b = _.remove(a, (el) => typeof el === 'number');
console.log(b); // [27, 42]
console.log(a); // ['foo','man',chew];
```

### 1.3 - The source code examples of this post are on Github

I have the source code of the examples in this post up on my [test lodash Github repository](https://github.com/dustinpfister/test_lodash/tree/master/forpost/lodash_remove). In that folder I am also drafting out future edits for this post, and the repository also contains the source code examples for all my [other posts on lodash](/categories/lodash/). I do get around to editing my content now and then so if you see anything that might need to change, or something that should be added there is making a pull request there, or leaving a comment down below on this site.

## 2 - lodash filter method for removing elements without mutating the source array

So one little problem with the lodash remove method is that it will mutate the array in place. In some situations I might not want to mutate the given source array, so another lodash method that comes to mind when it comes to removing elements from an array is the lodash filter method. This method works more or less the same way as the lodash remove method only with a few differences. One as I mentioned is that it will return a new array, rather than mutating the source array, and the other is that a true boolean value is what is returned to find out what elements are to remain rather than be removed.

```js
let _ = require('lodash');

let arr = ['foo', 27, 'man', 42, 'chew'];
 
let arr2 = _.filter(arr, (el) => {
 
    // filter all numbers, by returning true
    // for everything that is not a number
    return typeof el != 'number';
 
});
 
console.log(arr); // ['foo', 27, 'man', 42, 'chew'];
console.log(arr2); // ['foo','man',chew];
```

If I want to still mutate the source array I can just reassign the new array to the same variable as a way to obtain the same result as the lodash remove method. So then because I can use the lodash filter method to remove both without and with replacing the source array that makes the lodash remove method a little redundant. This might be one of the reasons why you will nit see a remove method in the native javaScript array prototype, I do not see a need for it really. However of course when it comes to some kind of user space utility library there is not harm in making it part of that even if it is just for the heck of it.

## 3 - Array of enemy objects

When it comes to making a game that involves an array of enemies that the player interacts with, often there will be some kind of process that involves purging enemies from an array. The\ _.remove method can be used to make quick work of that, mutating the array in place, and also making the code easy to read.

```js
var enemy = [{
        id : 'en_1',
        hp : 12,
        maxHP : 50
    }, {
        id : 'en_2',
        hp : 0,
        maxHP : 50
    }, {
        id : 'en_3',
        hp : 50,
        maxHP : 50
    }
];
 
// remove all dead enemies
_.remove(enemy, function (e) {
    return e.hp <= 0;
});
 
console.log(enemy);
// [ { id: 'en_1', hp: 12, maxHP: 50 },
//  { id: 'en_3', hp: 50, maxHP: 50 } ]
```

Still often when I make pet projects that are a game of sorts I do not often use lodash as part of the stack, if anything at all actually. I will often just go with some kind of vanilla javaScript solution, and even make my own remove methods for game modules because depending on the nature of the game there are often other things that need to happen to the state of the game object when something is removed.

## 4 - Vanilla js

In this section I will be going over vanilla js solutions for removing elements from an array. There are many array prototype methods that are of interest when it comes to removing one or more elements from an array, as well as ways of making my own custom remove methods for projects if needed. So in this section we will be kicking lodash to the curb and working with what there is to work with in modern, and not so modern native javaScript specs when it comes to removing elements from an array.

### 4.1 - Array filter

So there is a native [array filter](/2020/10/03/js-array-filter/) method in the core javaScript array prototype. So when it comes to just using javaScript by itself there is a filter method there all ready to work with. It works basically the same way as the lodash filter method only it is called off of in instance of an array. Just as the lodash filter method it will not mutate the array in place also.

```js
let arr = [1, 2, 'foo', 3, 'bar', 4];
 
arr = arr.filter((el) => {
        return typeof el == 'number';
    });
 
console.log(arr);
```


### 4.2 - The Slice array prototype method

The [array slice](/2018/12/08/js-array-slice/) method will return a new array from a source array at a starting and ending index values in the source. So then this is a way to go about creating a new array rather than mutating an array in place like the lodash remove method does.

```js
var a = [1, 'a', 'b', 4, 5, 'c'];
// what is nice about slice is that it does not mutate the source array
var b = a.slice(1, 3);
console.log(b);
// [ 'a', 'b' ]
console.log(a);
// [ 1, 'a', 'b', 4, 5, 'c' ]
```

 One draw back of the array slice method then is that by calling the method just once I can only get one element or a few elements that are next to each other. So when it comes to creating a new array of elements that meet or do not meet a given condition I am going to need to do a bit more than just use the array slice method alone.

### 4.3 - using the array slice and array concat methods

So then there is not just using array slice by itself, but using it in conjunction with the array concat method as a way to furnish a new array with elements that I want, there by removing elements that I do not want.

```js
var a = [1, 'a', 'b', 4, 5, 'c'];
// what is nice about slice is that it does not mutate the source array
var b = a.slice(1, 3).concat(a.slice(5, 6));
console.log(b);
// [ 'a', 'b', 'c' ]
```

### 4.4 - Using Array.splice to remove a element

So one way to remove an element from an Array with native core javaScript is to use the Array.splice prototype method. This is often confused with Array.slice that does the same thing only it returns a new array rather than mangling an existing one. Array.splice might be one of the best options if you are someone that worries a great deal about backward compatibility with older browsers. Unlike other native options like Array.filter, Array.splice is a pre ES5 Array prototype method that will work in browsers as old as IE 5.5.

```js
var arr = [1,2,3,4];
arr.splice(2,1);
console.log(arr); // [ 1, 2, 4 ]
```

The problem with Array.splice by itself at least is that I must know the index of the element that I want to remove. It is not to hard to write a method like the lodash remove method with native javaScript that makes use of Array.splice though. There are a few things to be ware of when doing so though when removing more than one element.


### 4.5 - Array.splice in while loops

When removing more than one element with Array.splice in a loop such as a while loop a problem may come up that has to do with the fact that the length of the array changing when one or more elements are removed.

```js
// so looping from zero upwards presents a problem
// because the length of the array changes
var arr = [-1, -2, 3, -4, 5],
i = 0, len = arr.length;
while (i < len) {
    var el = arr[i];
    if (el < 0) {
        arr.splice(i, 1);
    }
    i += 1;
}
 
console.log(arr); // [ -2, 3, 5 ]
 
A simple solution for this would be to just loop backwards.
 
// looping backwards works
var arr = [-1, -2, 3, -4, 5],
i = arr.length;
while (i--) {
    var el = arr[i];
    if (el < 0) {
        arr.splice(i, 1);
    }
}
console.log(arr); // [3,5]
```

### 4.6 - Vanilla javaScript remove method using Array.splice
 
So making a remove method with Array.splice is not to hard. If you are not familiar with how to write your own higher order functions then it is not a bad idea to make one or two now and then, even if they are kind of basic. A higher order function is just a fancy term that is used to refer to a function that accepts another function as an argument and or returns another function when called. This example is then an exercise of writing something that is the latter of the two, sense I will be returning an Array..
 
 ```js
var remove = function (arr, forEach) {
    var i = arr.length;
    while (i--) {
        if (forEach(arr[i])) {
            arr.splice(i, 1);
        }
    }
    return arr;
};
 
var nums = [-1, 3, -3, -4, 5, 0, 7];
 
console.log(remove(nums, function (n) {
        return n <= 0;
    }));
```

There are of course many different ways that a function such as this could be written. I like Array.splice because of the great browser support, but if you are not such a nut with that sort of thing another option might involve the use of Array.filter for example.

### 4.7 - Vanilla javaScript pull method using Array.splice

```js
// the remove method
var remove = function (arr, func) {
    return arr.filter(function (el, i) {
        if (func.call(arr, el, i, arr)) {
            arr.splice(i, 1);
            return true;
        }
        return false;
    });
};
 
// Object.is polly fill
if (!Object.is) {
  Object.defineProperty(Object, "is", {
    value: function (x, y) {
      // SameValue algorithm
      if (x === y) {
        // return true if x and y are not 0, OR
        // if x and y are both 0 of the same sign.
        // This checks for cases 1 and 2 above.
        return x !== 0 || 1 / x === 1 / y;
      } else {
        // return true if both x AND y evaluate to NaN.
        // The only possibility for a variable to not be strictly equal to itself
        // is when that variable evaluates to NaN (example: Number.NaN, 0/0, NaN).
        // This checks for case 3.
        return x !== x && y !== y;
      }
    }
  });
}
 
// a pull method using Object.is in place of lodash _.eq
var pull = function (arr, value) {
    return remove(arr, function (el) {
        return Object.is(el, value);
    });
};
 
// testing this out
var a = [1, 'foo', 2, 'bar', 3, 'baz'];
var b = pull(a, 'foo');
console.log(a);
//[ 1, 2, 'bar', 3, 'baz' ]
console.log(b)
// [ 'foo' ]
```

## 5 - Conclusion

So lodash is packed full of helpful little methods like the lodash remove method. It is true that many of the methods in lodash are redundant, but that is not always the case. Sometimes a lodash method does bring a little more to the table compared to a native counterpart. If you enjoyed reading this post you might want to check out my [main post on lodash](/2019/02/15/lodash/) in general.
