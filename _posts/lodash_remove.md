---
title: The lodash _.remove array method and vanilla javaScript alternatives
date: 2017-09-19 12:57:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 38
updated: 2021-07-20 13:12:24
version: 1.26
---

The process of removing a few elements from an array can sometimes be a little troubling, or at least I remember that it was back when I was first starting out with javaScript. The trouble was mainly with looping over an array from a zero element index value upwards, each time an element is removed it of course changes the length of an array, which of course causes a problem. The way I would resolve the problem is often by looping threw the array backwards, and using an [array prototype](/2018/12/10/js-array/) method like [Array.splice](/2021/07/20/js-array-splice) to purge elements. 

When it comes to just using native javaScript alone of course there are ways of just going ahead and removing elements from an array. However this is a post on lodash where it is assumed that lodash is part of the stack of a project so with that said there is also the [\_.remove](https://lodash.com/docs/4.17.4#remove) array method in [lodash](https://lodash.com/). 

The lodash remove method helps to make quick work of removing elements from an array if lodash is there to work with, and I suppose it would make sense to use it if it is indeed there. It works by passing a metjod that is used to define the conditions that are to be used to remove one or more elements from an array, and on top of that will mutate the array in place. There are however other methods of interest, both in lodash and native javaScript though such as the filter method that might be a better option as it will do the same only not mutate the array in place. Still lots of developers are transitioning away from lodash, so I will also be looking at some vanilla js alternatives to the lodash remove method in addition to just what lodash has to work with by itself.

<!-- more -->


## 1 - lodash remove basic example

The lodash remove method is one of the many [array methods in lodash](/2019/02/14/lodash_array/). It's pretty easy, just pass the array, and a method where you can define the conditions that will result in removal of the element that you want out of there. This method that is passed as the second argument will be given each element as an argument, and this of course can be used to define an expression that will evaluate to true or false. The return keyword can then be used in the body of that method, and if a true value is returned then the element in question will be removed from the array in place.

```js
var arr = ['foo', 27, 'man', 42, 'chew'];
 
_.remove(arr, function (el) {
 
    // remove all numbers
    return typeof el === 'number';
 
});
 
console.log(arr); // ['foo','man',chew];
```

So the method that you pass will return true of false, if what is returned is true the element will be removed.

## 2 - lodash filter method for removing elements without mutating the source array

So one little problem with the lodash remove method is that it will mutate the array in place. In some situations I might not want to mutate the given source array, so another lodash method that comes to mind when it comes to removing elements from an array is the [lodash filter](/2018/06/18/lodash_filter/) method. This method works more or less the same way as the lodash remove method only with a few differences. One as I mentioned is that it will return a new array, rather than mutating the source array, and the other is that a true boolean value is what is returned to find out what elements are to remain rather than be removed.

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

In this section I will be going over vanilla js solutions for removing elements from an array. There are many array prototype methods that are of interest when it comes to removing one or more elements from an array, as well as ways of making my own custom remove methods for projects if needed. So in this section we will be kicking lodash to the curb and working with what there is to work with in modren, and even not so modern native jjavaScript specs.

### 4.1 - Using Array.splice to remove a element

So one way to remove an element from an Array with native core javaScript is to use the Array.splice prototype method. This is often confused with Array.slice that does the same thing only it returns a new array rather than mangling an existing one. Array.splice might be one of the best options if you are someone that worries a great deal about backward compatibility with older browsers. Unlike other native options like Array.filter, Array.splice is a pre ES5 Array prototype method that will work in browsers as old as IE 5.5.

```js
var arr = [1,2,3,4];
arr.splice(2,1);
console.log(arr); // [ 1, 2, 4 ]
```

The problem with Array.splice by itself at least is that I must know the index of the element that I want to remove. It is not to hard to write a method like the lodash remove method with native javaScript that makes use of Array.splice though. There are a few things to be ware of when doing so though when removing more than one element.

### 4.2 - Array.splice in while loops

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

### 4.3 - Array filter

So there is a native array filter method in the core javaScript array prototype. So when it comes to just using javaScript by itself there is a filter method there all ready to work with. It works basically the same way as the lodash filter method only it is called off of in instance of an array. Just as the lodash filter method it will not mutate the array in place also.

```js
let arr = [1, 2, 'foo', 3, 'bar', 4];
 
arr = arr.filter((el) => {
        return typeof el == 'number';
    });
 
console.log(arr);
```

### 4.4 - Remove method using Array.splice
 
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

## 5 - Conclusion

So lodash is packed full of helpful little methods like the lodash remove method. It is true that many of the methods in lodash are redundant, but that is not always the case. Sometimes a lodash method does bring a little more to the table compared to a native counterpart. If you enjoyed reading this post you might want to check out my [main post on lodash](/2019/02/15/lodash/) in general.
