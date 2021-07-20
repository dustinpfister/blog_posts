---
title: javaScript Arrays a general overview
date: 2018-12-10 12:13:00
tags: [js]
layout: post
categories: js
id: 347
updated: 2021-07-20 11:51:48
version: 1.71
---

In [javaScript Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) are a special kind of object in which elements exist in an ordered collection where each element has a certain index value for the key name, along with an [array length](/2018/12/14/js-array-length/) property. There are many [posts on the Internet that have to do with getting started with javaScript arrays](https://www.javascripttutorial.net/javascript-array/), and also posts that get into all kinds of detail about arrays. However I thought I would take a moment to get together my own content on arrays when it comes to javaScript as there are all kinds of little things to get to in my own little way about them for what it is worth.

There are many methods that can be used with arrays that are in the array prototype. These methods help with editing, filtering, and mapping arrays. Many of these methods have been part of the javaScript spec for a long time and are thus very safe to use when it comes to concerns of engine support. Others are a little newer so there should be a degree of concern at least maybe depending on the situation with browser support.

Often a javaScript developer will come across objects that are considered array like objects but are not an actual instance of Array, but Array methods can be used with them by using Function.call. 

This post will then serve as a general overview of Arrays in javaScript in which I will touch base on a lot of things concerting arrays themselves, and all kids of little things that might branch off from there. I will also be lining to all kinds of additional posts from here that get into certain array prototype methods, properties, and things that come up when working with arrays.

<!-- more -->

## 1 - JavaScript arrays and what to know before hand

This is a post on javaScript arrays, as such it is important to have at least some starting background with javaScript as this is not a getting started post on javaScript in general. If you are completely new to javaScript it might be a good idea to start with my [getting started with javaScript post](/2018/11/27/js-getting-started/), or some other alternative. However if you have at least some background with javaScript, but want to learn more about arrays in general, then this might prove to be a good read.

## 2 - Creating arrays

So in order to get into the ins and outs of arrays first you need to know hoe to go about creating them, or ending up with one in the first place. There is both an array constructor method, and an array literal syntax in javaScript that can be used to create a regular javaScript array from scratch. There are also many methods that might return an array as well from something else when it comes to things like the Array.from static method, and the String.split prototype method for example.

So then in this section I will just be going over some ways to go about creating an array in the first place, which seems like good starting point for a post such as this.

### 2.1 - The array constructor

One way to create an array is to use the Array constructor with the new keyword to create a new empty array of a set length. This is used more or less the same way as any other constructor function where you type the new operator followed by calling the constructor function to create an instance of that constructor which in this case would be an array. I will not be getting into constructor functions in detail here as that is a matter of another post.

I do not recommend the use of the Array constructor, and generally prefer using the literal syntax in place of this. However it does show up in many code examples on the open web so it is something that a javaScript developer should be aware of at least.

```js
// use the new keyword an call the constructor
let a = new Array();
a.push(1,2,3,4);
 
console.log(a); // [ 1, 2, 3, 4 ]

// An argument can be given to set a starting length
let b = new Array(10);
 
console.log(b.length); // 10
console.log(b); // [ <10 empty items> ]
```

### 2.2 - The array literal syntax

Anther way to create an array is to use the array literal syntax. This involves the use of square brackets, and placing starting elements in between commas. In addition an empty array with a zero starting length can be created by just not giving any starting elements and just having and opening and closing set of square brackets. Square brackets are also used as a way of getting a single element in an array also by using them off the end of an array and having an index value between the opening and closing square brackets.

```js
var arr = [1,2,3,4];
 
console.log(arr[1]); // 2
```

### 2.3 - Creating an array by calling a method that will return one like String.split

Another way of creating an array, or end up with one rather, would be to call a method that would return one as a product. In some cases I would like to not create and array from scratch by rather create one from some kind of data source such as a string. In the string prototype object there is the string split method that can be used to split a string into a bunch of substrings where each substring is and element in a resulting array.

```js
var a = '1.2.3.4.5'.split('.'),
b = 'Strings can be split into arrays'.split(' ');
 
console.log(a[1]); // 2
console.log(b[3]); // 'split'
```

## 3 - Pushing, shifting, and adding elements to an array

Once an Array is created it is important to know how to add elements to it. There are a number of ways to do so, with array prototype methods, as well as just directly writing index values. The most common way to go about adding elements to an array in javaScript may be the Array.push method, but there are a number of other ways to do so as well that a javaScript developer should be aware of.
### 3.1 - Just adding, or overwriting by index

One of the most simple ways to go about adding elements to an Array is to just use the square bracket notation to set the element value of a desired index. To do this just use square brackets after the variable name with the desired index value passed via the brackets. This can be used as a way to both set, and query a certain index value of the array.

```js
var arr = [],
i = 0,
len = 10;
 
while (i < len) {
    arr[i] = Math.pow(2, i);
    i += 1;
}
 
console.log(arr[3]); // 8
```

### 3.2 - Use Array.push to add an element to the end of an Array

The [Array.push](/2020/06/17/js-array-push/) method can be used to add one or more additional elements to the end of an Array. This is often used in place of using the length property of an array as a means of finding out what the current index value is for a new element that will be appended to the end of an array.

```js
var a = [1, 2, 3];
 
a.push(4);
 
a[a.length] = 5;
 
a.push(6,7,8,9);
 
console.log(a); // [1,2,3,4,5,6,7,8,9]
```

### 3.3 - Use Array.unshift to add an element to and end of an Array

The unshift method works just like the push method but it can be used to add one or more elements to the beginning of an Array at index 0, rather than at the end of an array. So then that is push to add an element at the end, and unshift to add an element to the begging of the array at the left most position. Also just like that is the push method it is possible to add more than one element at a time, but just making use of more than one argument when calling the method.

```js
var a = [4,5,6];
 
a.unshift(1,2,3);
 
console.log(a); // [1,2,3,4,5,6]
```

### 3.4 - Array.concat, and Array.slice

So there are a number of useful Array prototype methods that can be used such as the [Array.concat](/2020/07/13/js-array-concat/) method that can be used to add together two ore more arrays into a single array. In addition there is also the [Array.slice](/2018/12/08/js-array-slice/) method that can come in handy when I want to get an array segment from an existing array from a given starting and ending index.

```js
var a = [1, 2, 3, 7, 8, 9];
 
a = a.slice(0, 3).concat([4, 5, 6], a.slice(3, 6));
 
console.log(a); // [1,2,3,4,5,6,7,8,9]
```

### 3.5 - The Array.splice method can be used to remove no elements, and inject ones at an index location

The array splice method is typically used as a way to remove elements from an array. However while removing elements it is also possible to use the method to add some elements in at an index location also. In addition to this option to add elements to the array it is also possible to give a value of zero for the number of element to remove at an index location. So then the array splice method can be used to just add elements to an array and do so at any index location.

```js
var a = [1, 2, 4, 5];
// first augment is an array index location
// second argument is the number of elements I want
// to remove, and the third argument is what I want to inject
a.splice(2, 0, 3);
console.log(a); // [1, 2, 3, 4, 5]
```

## 4 - Arrays are Objects

So a javaScript Array is not just an Array, there is more to it then just simply an ordered collection of elements. Many people might treat arrays as something that is completely separate from objects, maybe in some languages that is the case, however in javaScript [Arrays are a kind of object](/2017/05/12/js-arrays-are-objects/). When I create an Array what I am creating is an Object that is made with the Array constructor and as such it has many methods that cab be used via its prototype object.

### 4.1 - Array inherits from object

An instance of an Array in javaScript inherits from Object. What this means is that any and all methods that are in the Object Prototype object can also be used in arrays such as Object.hasOwnProperty. In addition if I add any method to the Object prototype it will also be available with anything that inherits from Object such as with Arrays.

```js
var arr = [1, 2, 3, 4];
 
console.log(arr.hasOwnProperty('0')); // true
console.log(arr.hasOwnProperty('4')); // false
 
Object.prototype.foo = function () {
 
    return 'bar';
 
};
 
console.log(arr.foo()); // 'bar'
```

### 4.2 - Still using an Array as an object

So because Arrays are still objects they can still be used in the same way as I would a plain old object created with the Object constructor, or the curly bracket syntax. So if I want to I can just add any additional public properties to an array of I want to in terms of named keys for the array, such as a method that will add up all the numbers of an array just for the sake of an examples of this.

```js
var arr = [17, 40, -15];
 
arr.getAnswer = function () {
    var sum = 0;
    [].forEach.call(this, function (el) {
        if (typeof el === 'number') {
            sum += el;
        }
    });
    return sum;
};
 
console.log(arr.getAnswer()); // 42
```

I am not saying doing so is a best practice or not, it is just that in javaScript Arrays are a kind of object and as such they can be used like that of nay other object. Also plain old objects in general can be thought of as an array of sorts also, in fact they can be formated like arrays and with a little function prototype trickery can  be used with array prototype methods. The core deference is that when working with an Array I am working with an object where the key values are indexed numbers rather than property names.

## 5 - Array like objects

Often when working with javaScript you might come across what is often referred to as "array like objects". Arrays themselves are objects as well, so to help clarify this better array like objects are objects that are structured like an array, but are not created with the Array constructor or literal syntax. As such they might be structured like an array, but may not have the various array methods available in the objects prototype.

If you are still confused maybe it is best to just play around with some code examples. Examples of Array like objects in javaScript are the arguments object in the body of a function, and html node lists. It is also possible to create array like objects from scratch. In addition although array methods like Array.splice may not be available it is still possible to use them with array like objects by making use of Function.call.

### 5.1 - The arguments object

An example of an Array like object would be the arguments object of function. Whenever a function is called, inside the body of a function there is an arguments object that contains the given arguments to the function. This is useful for defining different logic that is to be used depending on the number of arguments that are given to the function. However for the sake of the content of this post, and this section what is of interest here is the way that the object is structured.

```js
var func = function(a,b){
 
   // the arguments object is structured like an array
   console.log(arguments[0]); // 5
   console.log(arguments.length); // 2
 
   // However the constructor is Object, not Array
   // so it is an "array like object"
   console.log(arguments.constructor.name); // Object
   
   return a + b; // 10
 
};
func(5,5);
```

So because the argument objects constructor is Object and not Array it is just a plain old Object, and as such it does not have Array prototype methods available to it. However it is still very mush structured like an Array so it can be considered an Array like Object.

### 5.2 - HTMLCollections

So html collections are another common example of an Array like object when it comes to client side javaScript. When a method like getElementsByTagName is used to get all elements in an html document of a certain tag name, what is returned is not an instance of Array, but HTMLCollection.

```js
var nodeList = document.getElementsByTagName('div');
 
console.log(nodeList[0]); // (first div)
console.log(nodeList.length); // (number of divs)
 
console.log(nodeList.constructor.name); // HTMLCollection
```

Just like with the arguments object in a function these objects are structured just like an Array, but because they are not an instance of Array they do not have Array prototype methods like Array.forEach or Array.filter

### 5.3 - Using Array prototype methods with an Array like object

If an Object that is not an instance of Array is still structured just like an Array where the keys are index values, and there is a single length property that is the number of elements. Then it is possible to still get Array prototype methods to work just fine with these by making use of something like [Function.call, Function.apply, or Function.bind](/2017/09/21/js-call-apply-and-bind/).

```js
Array.prototype.forEach.call(nodeList, function(div){
 
    console.log(div)
 
});
```

These function prototype methods will come up often as they are a way to break a prototype methods away from its class and get the method to work with any kind of object given that it is formated in a way that will allow it to work with a prototype method. There are a whole lot of other reasons why I would want to use one of these function prototype methods, but getting into it in detail here might prove to be a little off topic from arrays in general.

## 6 - Looping over an Array

When working with arrays often one way or another a developer must loop over all the elements in an array. With javaScript arrays there are a number of ways to do this such as with a loop such as a while or for loop, a method that is called over and over again, or with an array prototype method such as Array.forEach. In this section I will be covering some of these options that a javaScript developer should be familiar with.

### 6.1 - Using a while loop

When using a loop as a means to loop over the elements in a javaScript array I tend to prefer to use a while loop. One reason why I like while loops is because I have the option to loop over an array backwards by setting an index value to the length of the array, and then subtract from that index.

```js
var arr = [1, 2, 3, 4],
i = arr.length;
 
while(i--){
    arr[i] = Math.pow(2,arr[i]);
}
 
console.log(arr); // [2,4,8,16]
```

This works because a positive number evaluates to true, and a number of zero or lower does not. So I can set a number to the length of an array, and subtract from that number as well in the same location. When the index value reaches a value of zero the loop will end. I have nothing against for loops, and I am not going to say this is the best and only way to loop over an array. However it does has its good points.

### 6.2 - Array.forEach

Another common way to loop over the contents of an Array in javaScript is to use the Array.forEach method. This is one of the many Array prototype methods that can be called off an instance of Array to preform tasks such as this. When using Array.forEach a function is passed as the first argument, this function will be called for each element in the Array and the current element and index will be passed as arguments to this function.

```js
var arr = [1, 2, 3, 4];
 
arr.forEach(function (n, i) {
    console.log(i, n);
});
```

## 7 - Filtering an Array

One of the most important tasks to preform with arrays is to filter them to create a new array that is a kind of sub collection of elements. One of the many Array prototype methods is [Array.filter](/2020/10/03/js-array-filter/) than can help with filtering tasks. The Array.filter method creates a new array rather than mutating the Array that it is call off of making Array.filter a functional programming friendly method.

## 7.1 - Using Array.filter

To use Array.filter all I need to do is just call the method, and pass a function that will be used to filter the Array that I call filter off of. The current element is passed as the first argument which I can use when defining the logic that will be used to filter. If a true boolean value is returned the current element will be included, else it will not.


```js
var arr = [2, 3, 16, 7, 9, 128];
var pow2 = arr.filter(function (n) {
    return String(Math.log(n) / Math.log(2)).indexOf('.') == -1;
});
 
console.log(arr); // [2,3,16,7,9,128]
console.log(pow2); // [2,16,128]
```

## 8 - Mapping an Array

Another handy Array method to know about is of course Array.map. This method is useful when I want to apply some kind of logic to all elements in an array, and remap the contents in the process. This is another array method that excepts a function as its first argument like that of Array.forEach, or Array.filter. However this time the returned value is what will be set as the current index value.

```js
var a = [1,2,3,4,5,6];
 
a = a.map(function(n){
 
   return Math.pow(2,n);
 
});
 
console.log(a); // [2,4,8,16,32,64]
```

In lodash there is the [\_.map](/2018/02/02/lodash_map/) method that works the same way as Array.map, but it is a collection method so it can be used with objects as well as a means of mapping both array elements, and objects keys in general.

## 9  - finding something in an array

When it comes to working with an array there will come a time where I will want to [find something in the array](/2021/07/19/js-array-find). This can have more that one meaning, but will often mean finding a single element in the array. There is some over lap though when it comes to finding something in an array, filtering and array, and sorting an array though.

### 9.1 - The array find method

There is the array find method that can be used to find a single element in an array that meets a condition of some kind given with a function. This works by applying the callback for each element starting from index 0 forward to the end of the array. In the event that the function that is given to the find method returns true for a given element, that element value will then be the returned value from the call of array kind.

```js
// and array of numbers
var a = [1, 2, 3, 4, 5, 6, 7];
 
var b = a.find(function (n) {
        return n > 2;
    });
console.log(b); // 3
```

## 10 - Sorting an array

The [array sort method](/2019/12/02/js-array-sort/) is the native javaScript way to go about sorting an array in place. there are also many usful user space methods that have been made fo this sort of thing, for examples when it comes to using lodash there is also the [lodash sort by method](/2018/07/06/lodash_sortby) that can be used in that framework if that is part of an application.

## 10.1 - Basic array sort example

Here is a basic example of using the sort array prototype method on an array or primitives. When it comes to using the array sort method this way I do not even have to give a sort function as the default functionally will work well when it comes to that.

```js
var arr = [7,4,2,5,8,6,3,1];
arr.sort();
console.log(arr);
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
```

## 11 - Multidimensional Arrays

There are two general ways of making Multidimensional Arrays in javaScript as I see it. There are arrays of arrays, and then there is using a formula to make a sort of virtual multidimensional array that is really just a plain old linear array.

### 11.1 - Arrays of Arrays

One way to go about having a multidimensional array in javaScript is to have an Array of Arrays.

```js
 
var grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
 
console.log( grid[1][1] ); // 5
```

### 11.2 - Plain old linear Array, but with style.

So I do not have to have an array of arrays, but just a simple plain old linear array. So this can be thought of as a kind of virtual multidimensional array, because it is just a linear collection of elements. When doing this an expression can be used as a way to get the proper index.

```js
var createGrid = function (w, h) {
 
    var grid = [],
    i = 0;
 
    w = w || 8;
    h = h || 6;
 
    // creating the grid
    while (i < w * h) {
        grid.push({
            i: i,
            x: i % w,
            y: Math.floor(i / w)
        });
        i += 1;
    }
 
    // I can append a method to grid,
    // because arrays are still objects
    grid.get = function (ix, y) {
 
        if (arguments.length === 1) {
            return grid[ix];
        }
 
        // using a formula to get the desired
        // element
        if (arguments.length === 2) {
            return grid[y * w + ix];
        }
 
        return grid[grid.length-1];
 
    }
 
    return grid;
 
};
 
var g = createGrid(4, 3);
 
console.log(g.get(1,2)); {i: 9, x: 1, y: 2}
```

## 12 - Array length and count

Another subject of arrays is what is often referred to as the [length of an array](/2018/12/14/js-array-length/) to which I will not be getting into in detail here as I have all ready went off the deep end when it comes to that topic. The length of an array is just a property of an array object that contains a number that is the current max element size of an array, but with that said yes the length can change. The length of an array is often confused with other values of an array, such as the number of actual public numbed keys, or elements that there are in the array. So it is worth looking into playing around with a few quick code examples to have a better understating of what the deal is with array length, and that this is not always reflective as to how many elements are in the array, depending on how you go about counting elements.

## 13 - Conclusion

There is a great deal more to write about when it comes to javaScript Arrays. I did not even scratch the surface when it comes to every little thing to know about with Arrays in javaScript. For example there is more to write about when it comes to typed arrays, and how they differ from the regular typical arrays that are used in javaScript. in lodash there is a lengthly collection of methods that can be used to help with common programming tasks surrounding arrays, as well as with objects in general to discus as well. Hopefully this post did a decent job of covering some of the basics and then some though.