---
title: invoke them all with lodash invokeMap or just plain old javaScript
date: 2020-05-01 15:43:00
tags: [lodash]
layout: post
categories: lodash
id: 654
updated: 2022-01-12 12:59:06
version: 1.15
---

So you have a collection in javaScript, and by collection I mean an array or an object in general that is a collection of key value pairs. With that said the situation is that you want to invoke a method in the collections prototype, or any method in general, for all elements in this collection. Well in lodash there is the [invokeMap method](https://lodash.com/docs/4.17.15#invokeMap) that can be used to invoke a method at a certain path, for all elements in a collection. When I say path I mean a string representation of nested property names for an object in a collection, a standard that is used with methods like the [lodash get](/2018/09/24/lodash_get/) method, and the [lodash set](/2018/12/04/lodash_set/) method that might be worth looking into when it comes to the basics of paths in lodash.

However in modern javaScript there are also plenty of tools to grab at to begin with that a javaScript developer should be aware of that can also be used for this kind of task. So lets take an look at some code examples of calling a method for all elements in a collection by using lodash, and also just plain javaScript on its own.

<!-- more -->

## 1 - The basics of using lodash invoke map with arrays

So the lodash invoke map method is used by calling the method and then passing the collection as the first argument. The second argument is then a path to a method in the given collection object, or a function to use in place for such a method that is to be called for all elements in the collection. Any additional arguments are then arguments that are to be passed to the method that is to be called.

In this section I will be going over a few quick examples of the invoke map method in lodash as well as various other lodash methods. Also in the process I will be touching base on various aspects of native javaScript itself when it comes to the differences between invoke map and the regular lodash map method for example.

### 1.1 - String Split example

When calling invoke map the first argument should be the collection that I want to use invoke map with, such as an array fo numbers for example. The second argument is then a path to the function to call for each element, or the function itself to use. Then after that it is a question of what values to use for the arguments when calling the given function that is what the additional arguments are for at that point.

```
let nums = [123,456,789];
let a = _.invokeMap(nums, ''.split, '');
console.log(a);
// [ [ '1', '2', '3' ], [ '4', '5', '6' ], [ '7', '8', '9' ] ]
```

### 1.2 - Array of arrays invoke map example

For this example I am using the array sort method for each nested array in an array of arrays.

```js
let arr = [ [7, 56, 3, 3, 0, 12], [6, 5, 4], [5, 5, 5, 1] ];
let r = _.invokeMap(arr, 'sort', function (a, b) {
    if (a < b) { return -1; }
    if (a > b) { return 1; }
    return 0;
});
console.log(r);
// [ [ 0, 3, 3, 7, 12, 56 ], [ 4, 5, 6 ], [ 1, 5, 5, 5 ] ]
```

### 1.3 - Using lodash map in place of invoke map

There is also the [lodash map](/2018/02/02/lodash_map/) collection method also that will work in a very similar way to that of invoke map, but will give a grater amount of control when it comes to what to do for each element in a given collection. However there are still ways to go about having the same amount of control actually when it comes to using invoke map it is just that things need to be done a little differently. 

For example say that I want to use Math.round to create a new array of numbers from an array of numbers where each number is a fraction. In order to use invoke map I can not just pass [Math.round](/2020/06/15/js-math-round/) as the second argument for invoke map, I will instead want to pass a function of my own. Also when passing a function of my own I will want to use a [function expression](/2019/01/27/js-function-expression/), and not an [arrow function](/2019/02/17/js-arrow-functions/) because of the way that function expressions handle the value of the [this keyword](/2017/04/14/js-this-keyword/). I can then use the this keyword in the body of the function expression that I give to refer to the current element in the array, which in this case is a number, so I can then pass that as an argument for Math.round. The [return value](/2019/03/01/js-javascript-return/) of Math.round will then need to be the return value of this function expression that I give to lodash invoke map.

So then that is a little involved, but I can still do this sort of thing with invoke map. However it might often be a little easier to just use the lodash map method in this case. With lodash map I can just pass the Math.round method as the second argument and be done with it.

```js
// invoke map can just be used with an array of numbers
let nums = [0.5,1.75, 2.9, 4.05];
let a = _.invokeMap(nums, function(a){
    return Math.round(this)
});
console.log(a);
// [ 1, 2, 3, 4 ]
// although in some cases it might be better to just one map
let b = _.map(nums, Math.round);
console.log(b);
// [ 1, 2, 3, 4 ]
let c = _.map(nums, function(n){
    return ''.split.call(n, '.');
});
console.log(c);
// [ [ '0', '5' ], [ '1', '75' ], [ '2', '9' ], [ '4', '05' ] ]
```

## 2 - lodash invoke map is a collection method so it works out of the box with objects in general too

So it is true that invokeMap is one of the many so called collection methods in lodash. That is it is a method that will not just work with arrays or objects in general but both. So if I have a similar situation as before, but now it is an object with named rather than numbers key values then I can still juts use invokeMap. The only difference now is that because it is a plain old javaScriot object it does not have sort in the prototype object, however I can pass the method as the second argument rather than a string that is a path to the method.

### 2.1 - Using invoke map with plain object

```js
let obj = {
    a: [7, 56, 3, 3, 0, 12],
    b: [6, 5, 4],
    c: [5, 5, 5, 1]
};
 
let sorter = function (a, b) {
    if (a < b) {
        return -1;
    }
    if (a > b) {
        return 1;
    }
    return 0;
};
 
let r = _.invokeMap(obj, Array.prototype.sort, sorter);
 
console.log(r);
// [ [ 0, 3, 3, 7, 12, 56 ], [ 4, 5, 6 ], [ 1, 5, 5, 5 ] ]
```


## 3 - Doing the same things with javaScript alone

### 3.1 - Doing the same thing with vanilla javaScript using Array.prototype.map

However it is not so hard to do what invoke map does with plain old vanilla javaScript my itself also. For example I can do the same as above with just the native map array prototype method.

```js
let r = arr.map(function (nums) {
        return nums.sort(sorter);
    });
 
console.log(r);
// [ [ 0, 3, 3, 7, 12, 56 ], [ 4, 5, 6 ], [ 1, 5, 5, 5 ] ]
```


## 3.2 - However it is not that much harder to do so with vanilla javaScript, just need to use Object.values

However it is not always so hard to still do the same with just pain old vanilla javaScript.
```js
let r = Object.values(obj).map(function (nums) {
        return nums.sort(sorter);
    });
console.log(r);
// [ [ 0, 3, 3, 7, 12, 56 ], [ 4, 5, 6 ], [ 1, 5, 5, 5 ] ]
```

## 4 - Conclusion

I am not the kind of developer that things that lodash is just filled with methods like invokeMap. There are many talking points as to why it is that lodash is more than just a collection of methods that I may or may not use in a project. Even if you do not use lodash it is still a good idea to look at the lodash source code as there is a lot to be learned as to how it is designed. Also there is much more to write about when it comes to why it might be a good idea to use some kind of user space module that is a collection of independent methods in its own global variable rather than monkey patching methods that should be there into native objects.

Still when it comes to invokeMap alone I can not say this is the most compelling method to support a case to use lodash. There are some good talking points as to why one should use lodash, or some kind of custom lodash like library though. With that said if you liked this post and would like to read more on lodash there is my [main blog post on lodash](/2019/02/15/lodash/) that I started, and edit every now and then, and also a whole bunch of other [posts that I have wrote on lodash](/categories/lodash/) over the years.
