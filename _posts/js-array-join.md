---
title: The js array join method
date: 2020-03-09 20:53:00
tags: [js,corejs]
layout: post
categories: js
id: 623
updated: 2021-07-20 13:18:14
version: 1.23
---

The [js array join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) prototype method can be used to join all elements of [an array](/2018/12/10/js-array/) into a string. When doing so a string can be given as the first argument that is used as a separator between each element in the array. This is of course just one of many such methods that a javaScript developer should be aware of when it comes to what there is to work with in the array prototype object. It is a good idea to become familiar with these methods as it will save time that would otherwise be spent having to look for or write some kind of user space option for joining elements of an array together into a string.

One of the great things about the js array join method is that it has been part of javaScript for a real long time. So no need to bother with polyfills with this one, it will even work in browsers as old as IE 5.5. Even so there is still a [join method in lodash anyway](/2018/08/11/lodash_join/), but when it comes to that it would seem that is just there for the sake of consistency as the lodash join method is just a wrapper method for the native array join method. So the lodash join method is not one of the most compelling methods in lodash to warrant a need to continue using it when it comes to the so called safety net aspect of using lodash at least.

So this will just be a quick post on the js array join method as well as some quick related topics that might come up in the process of doing so such as the Object.toString method that is used to define what the string value of an object should be.

<!-- more -->

## 1 - basic js array join method example

The basic idea of array join is to just call it off an instance of a javaScript array, and a string that consists of all the values of the array joined together will be what is returned. When doing so I just pass a string that I want to have between each element in the resulting string produced form the array with js array join.

So say I have an array of three numbers where the first number is the value of a month, the second number is the value of a day, and the final number in the array is a year. I want to furnish this set of numbers into a string with a forward slash between each number. I could user a method like Array.forEach to loop over each elements and use string concatenation with an outside variable to produce such a string, however why bother with all that when I can just use Array.join?

```js
var arr = [3,9,2020],
str = arr.join('/');
 
console.log(str); '3/9/2020'
```

This example is an array of primitive values each of which are a number. When dealing with an array of values each of which are a string or number then using join can be as simple as just calling it off the array like this. However when dealing with objects there might need to be a little more done before getting to the point at which the Array.join method is used. So although we have the basic idea of Array.join covered, maybe we should look at some more examples of this.

## 2 - js array join and empty string as a separator

An empty string can be given as the argument to the array join method. Doing so is what I would want to do if I do not want anything at all to be between each element with the resulting string that is returned my array join.

```js
var arr = [1,2,3,3],
 
a = parseInt(arr.join('')),
 
b = a + 1;
 
console.log(b); // 1234
```

## 3 - String split and js array join

The string split method is another method that comes to mind when dealing with the array join method as it is an inversion of the method. Where the js array join method will create a string from an array the string split method will split a string into an array of elements.

```js
var n = 12345;
 
var a = parseInt(String(n).split('').map(function (n) {
        return Math.pow(2, n);
    }).join(''));
 
console.log(a); // 2481632
```

## 4 - Using array map before hand when working with an array of objects

For some arrays something might have to happen before joining all the elements together. For example say you have an array of objects and you want to join together all the values of a single property of each nested object together. In this kind of situation the array map method can be used as a way to create an array of primitive values before hand, and then that is what can be joined together.

```js
let arr = [ {a: 42}, {a: 30}, {a: 50} ];
 
let str = arr.map((obj) => {
    return obj.a;
}).join('-');
 
console.log(str); // '42-30-50'
```

## 5 - The toString method of Objects

The toString method of an Object is a standard way to define what the string value of an Object should be. The array join method is a method where we are joining all the elements of an array into a string. With that said if we are dealing with an array of string values then the array join method can just be called, but what if we are dealing with an array of objects? There is more than one way to go about creating string values from objects, some filtering, and mapping can be done to do so sure. However I think that I should have a section on the toString method of objects in this post also.

### 5.1 - A Basic Object.toString example

Say I have a simple object that holds properties for date, month, and year. A toString method can be added to the object to define what the string value for this object should be. The string value can be obtained by just directly calling the toString method of the object, but it will also be used in expressions where string concatenation is called for.

```js
var obj = {
    day: 9,
    month: 3,
    year: 2020,
    toString: function () {
        return this.month + '/' + this.day + '/' + this.year;
    }
};
 
console.log( obj.toString() ); // '3/9/2020'
console.log( 'date: ' + obj ); // 'date: 3/9/2020'
```

So this is the basic idea of the toString method, and now that we have that covered there is the idea of having an array of objects that have a proper toString method for each of them, and calling the array join method off of that.

### 5.2 - Now lets have an array of objects with toString methods and call array join off of it

So now that we have the basic idea of the toString method covered lets try out a quick example of how array join works with on an array of objects that have a custom toString method set for each object.

```js
// lets start with a method that will create an object
// with a toString method that will return a desired
// string representation of the object.
var createDateObj = function (month, day, year) {
    return {
        day: day,
        month: month,
        year: year,
        toString: function () {
            return this.month + '/' + this.day + '/' + this.year;
        }
    };
};
// now I can create an array of objects with these toString methods
var numbers = [[3, 9, 2020], [2, 1, 2017], [2, 20, 2020]];
var dateObjects = numbers.map(function (set) {
    return createDateObj.apply(null, set);
});
console.log(dateObjects);
/*
[
    { day: 9, month: 3, year: 2020, toString: [Function: toString] },
    { day: 1, month: 2, year: 2017, toString: [Function: toString] },
    { day: 20, month: 2, year: 2020, toString: [Function: toString] }
]
*/
// once I have the array of objects with toString methods I can just call Array.join
// to get a string with the string value for each object, and the given separator
// string between each string of the object
var str = dateObjects.join(' - ');
console.log(str); // 3/9/2020 - 2/1/2017 - 2/20/2020
```

So there doing something to furnish an array of string or number values by making use of a method like Array map, but then there is just having a desired toString method for any and all objects in the array. If that is the case then there is no need to bother with calling map to create string values, I can just call Array.join and be done with it.

## 6 - Conclusion

So the js array join method is one of many array prototype methods that I find myself using all the time when and where using it is called for. If I have an array of elements and I want to join them all together into a string then the array join method is there to do just that right away and allow me to continue on with my code.