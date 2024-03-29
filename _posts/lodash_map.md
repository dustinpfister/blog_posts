---
title: The lodash map method
date: 2018-02-02 20:53:00
tags: [js,lodash]
layout: post
categories: lodash
id: 142
updated: 2022-01-24 09:21:46
version: 1.17
---

If you work with javaScript a lot like I do chances are you are going to be aware of many of the methods that are part of the Array prototype, one of which is [Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map). This [array prototype method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) can be used to map over all elements in an array by passing a function as the first argument when calling Array map off of an instance of an Array. In this method that is passed to array map the value of a current element in the array is available as the first argument in the method that ias passed, and the value that is returned in this method will become the new value for that current element.

In [lodash](https://lodash.com/) there is also the [\_.map](https://lodash.com/docs/4.17.4#map) method what works just like the native array map method when it comes to arrays, only it is a little more advanced when it comes to working with objects in general with javaScript. You see the load map method is one of the so called collection methods in lodash. What this means is that the method works well out of the box with both arrays and plain old objects by themselves. In this post I will be covering Array.map, and how it compares with what is in lodash.

<!-- more -->


## 1 - Basics of the lodash map method

In this first section I will be starting out with just a few basic examples that center around the lodash map method itself. Later in this post I will be looking into some more advanced examples of the method, as well as what there is to work with in native javaScript by itself.

### 1.1 - Basic lodash map method example

For a basic hello world style example of the lodash map method there is starting out with a simple array of numbers as a source array. I can then pass this simple source array as the first argument for the lodahs map method, followed by a function that will be called for each element in the source array where the return value will be the value of the corresponding element in the new array that will be returned by lodash map.

```js
let source = [1,2,3,4,5];
// create a new array from the source array by preforming
// an action with the given function for each element in the
// source array using lodash map
let b = _.map(source, function(el){
    return el * 10;
});
// lodash map creates the new array and WILL NOT mutate the 
// source array in place when doing so
console.log(b);
// [10,20,30,40,50]
console.log(source);
// [ 1, 2, 3, 4, 5 ]
```

So the lodash map method is a great way to create a new array, based off of the values of another source array, without mutating the source array in place.

### 1.2 - Lodash map is a collection method

The map method in lodash is a so called [collection method](/2022/01/14/lodash_collection/), this means that the lodash map method can be used on plain old objects as well as Arrays. So then I can give just a plain old object as the source object for the lodash map method, and the values of that object will be used to create the new array that will be returned by lodahs map.

```js
var obj = {foo: 'bar', answer: 42};
 
console.log(_.map(obj, function(item){
    return item;
}));
// ['bar',42]
```

It is possible to do the same with native javaScript still, just often not with the array map prototype method alone. At least some trickery with other methods in native javaScript need to be used such as Function.call, or the Object.keys methods in combination with the bracket syntax. If you are an experience javaScipt developer these things might not be to big of a deal, but with the lodash map method you can just go ahead and map any kind of object more or less.

## 2 - Recursive example of \_.map

For a more advanced example of \_.map in action, say I have a complex object that has nested objects inside of it, and I want to toggle a boolean value for each object, and flatten everything out into an array. I can call \_.map recursively on objects, and arrays. Other lodash methods like \_.isArray, and \_.flatten can also be used in the process.

```js
var obj = {
 
    player: {
 
        team: 'GoodGuys',
        hp: 12,
        hpMax: 100,
        heal: false
 
    },
 
    enemys: [{
 
            team: 'BadGuys',
            hp: 90,
            hpMax: 250,
            heal: true
 
        }, {
 
            team: 'BadGuys',
            hp: 120,
            hpMax: 250,
            heal: true
 
        }
 
    ]
 
};
 
var toggleHeal = function (item) {
 
    if (typeof item != 'object') {
 
        return item;
 
    } else {
 
        if (_.isArray(item)) {
 
            return _.map(item, toggleHeal);
 
        }
 
        item.heal = !item.heal;
 
    }
 
    return item
 
};
 
var toggled = _.flatten(_.map(obj, toggleHeal));
 
console.log(toggled);
// [
//     {team: "GoodGuys", hp: 12, hpMax: 100, heal: true},
//     {team: "BadGuys", hp: 90, hpMax: 250, heal: false},
//     {team: "BadGuys", hp: 120, hpMax: 250, heal: false}
// ]
```

## 3 - Vanilla JavaScript alternatives to lodash map

When it comes to vanilla javaScript alternatives to the lodash map method there is the [array map method](/2020/06/16/js-array-map/) of the [array prototype](/2018/12/10/js-array/). One draw back with the array map method is that, well it is an array method rather than a collection method like in lodash. However this can easily be addressed by just making use of some additional vanilla javaScript features beyond just simply that of the array map method such as the [Object keys](/2018/12/15/js-object-keys/) static method that will return an array of public key names of any object, and with that there is also an Object.values method that will do the same as with Object keys only with values rather than key names.

### 3.1 - Simple example of Array.map

The Array map method will create a new array with what is returned by a given method that will be called for each element in the array. The first argument in the method that is passed is the current value of an element in the array, and the return keyword is used to return what will become the new value for the element in the array.

```js
// a simple array
var arr = [1,2,3,4,5];
 
// array.map will set each element to what is returned
// and I can use the value of each element in the process.
arr = arr.map(function(el){
 
    return el * 10;
 
});
 
console.log(arr);
// [10,20,30,40,50]
```

The Array map method will not mutate the array in place like many other native methods in the built in javaScript Array prototype. So in this example I am assigning the result of array map to the variable the stores the array as a way to mutate the source array. In some cases this behavior of not mutating a source array is in fact the kind of behavior I would want, in fact it is an aspect of what is often referred to functional programing, but that is a matter for another post.

Now that we have a basic example of the native array map meth9d out of the way lets take a look at what can be done with the lodash equivalent of array map.

## 4 - Conclusion

So the lodash map method and native array map methods are useful native methods for a common task that comes up often when working with a javaScript project. However it is not a golden hammer when it comes to these kinds of methods, in some cases you will want to use [filter](/2018/05/18/lodash_filter/) and [reduce](/2018/07/25/lodash_reduce/) for example. There are a lot of native and user space methods like array map and lodash map, it takes time to become familiar with all of these, but it is worth the investment of time to get solid with them and the reasons why one might have something more to ofter compared to the other. With that said if you enjoyed reading this post you might want to check out one of my [many other posts on lodash](/categories/lodash/), or maybe some of my vanilla javaScript examples when it comes to creating actually projects with javaScript alone rather than using lodash.