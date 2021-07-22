---
title: js array to string and converting an array to a string in general
date: 2021-07-22 10:19:00
tags: [js]
layout: post
categories: js
id: 916
updated: 2021-07-22 10:46:24
version: 1.7
---

I have wrote a [post on the subject of the to string method of an object in general](/2020/07/14/js-to-string/) before, however in todays post I think I will take a moment to write about this subject when it comes to [arrays alone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString). The to string method of an array will work okay when it comes to an array of primitives, however it will often fall short of expectations when it comes to an array of objects. When it comes to converting a complex array of objects into a string format it is often called for to create a custom helper function, or class prototype method to do so. It is also possible to create a custom to string method for an array, and when making a custom class that makes use of an array it is general a good idea to have a to string method as part of the prototype object.

<!-- more -->

## 1 - Basic examples of the array to string method

In this section I will be starting out with just some basic examples of the array to string method, but will progress into the subject of what to be aware of when it comes to using the to string method in general. You see the to string method is not just simply an array prototype method, there is also a to string method in the mother of all prototypes in the main Object prototype. In other words the to string method is a kind of standard method that should always be there for any kind of object in javaScript. The to string method can be called directly, but it is also called in expressions when an object value needs to be converted to a string value primitive.

### 1.1 - An Array of primitives

If I am dealing with a simple array of primitives and I want a string value of the array I can often just call the to string method. The default to string method of the array prototype will often give me what I want when it comes to this, however often I might still want to use an alternative method to create a string value from an array.

```js
var a = [1, 2, 3, 4];
// there is calling to string directory
console.log(a.toString()); // '1,2,3,4'
// the to string method will be called when an
// operation is preformed that will result in a need
// to covert to an array a string
console.log(a + ''); // '1,2,3,4'
```

However the need thing to be aware of with the to string method of the array prototype, and with the to string method in general is that it will be called in javaScript expressions. That is when I work out any kind of expression that involves an object in the expression and that object needs to be converted to a string, the to string method is what will be called to create that string value.

### 1.2 - An Array of Objects

When I am dealing with an array of objects this is often when the to string method will fall short, or at least the defaul to string method of the array prototype object.

```js
var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
console.log( a.toString() );
// [object Object],[object Object],[object Object]
```

### 1.3 - Using array map first to work with an Array of Objects

One way to address the problem that I run into with the to string method is to just use a method like array map to create a custom array or privative values first.

```js
var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
// creating a new array b from a
var b = a.map(function(obj){
    return '{x:'+ obj.x + ',y:' + obj.y + '}';
});
// and then calling toString off of b
console.log( b.toString() );
// {x:42,y:12},{x:0,y:0},{x:12,y:35}
```

### 1.4 - Creating a custom to string method

```js
var a = [
    {x: 42, y: 12},
    {x: 0, y: 0},
    {x: 12, y: 35}
];
// creating a custom toString method for the array
a.toString = function(){
    return this.map(function(obj){
        return '{x:'+ obj.x + ',y:' + obj.y + '}';
    }).join(',');
};
// calling toString will now work the way I want it to
console.log( a.toString() );
// {x:42,y:12},{x:0,y:0},{x:12,y:35}
```

### 1.5 - Creating a Class

```js
// a constructor function to create a class of an object
var Stack = function (a) {
    this.a = a || [];
};
// the to string method is used to define what a string value should be for
// this class of an object
Stack.prototype.toString = function () {
    return this.a.map(function (el) {
        // if el is a number
        if (typeof el === 'number') {
            return String(el);
        }
        // if object
        if (typeof el === 'object' && el != null) {
            return Object.keys(el).map(function (key) {
                return key + ':' + el[key];
            }).join(',');
        }
        // string null for null
        if (el === null) {
            return 'null';
        }
        // string of undefined for undefined
        if (el === undefined) {
            return 'undefined';
        }
        // default to just calling whatever the toString method is
        return el.toString();
    }).join(',');
};
// value of is used to define what a number value should be for this
// class of object
Stack.prototype.valueOf = function () {
    return this.a.reduce(function (acc, el) {
        if (typeof el === 'number') {
            return acc += el;
        }
        if (typeof el === 'object' && el != null) {
            return acc += Object.values(el).reduce(function (acc, el) {
                return typeof el === 'number' ? acc += el : acc;
                acc;
            }, 0);
        }
        return acc;
    }, 0);
};
 
var s = new Stack([null, undefined, 1, [1, 1], {x: 3}]);
console.log(s.toString());
//null,undefined,1,0:1,1:1,x:3
console.log(s.valueOf());
// 6
```

## 2 - Conclusion

