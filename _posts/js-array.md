---
title: javaScript Arrays a general overview of what to be aware of
date: 2018-12-10 12:13:00
tags: [js]
layout: post
categories: js
id: 347
updated: 2021-11-29 11:47:54
version: 1.112
---

In [javaScript Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) are a special kind of object in which elements exist in an ordered collection where each element has a certain numbered index value for the key name, along with an [array length](/2018/12/14/js-array-length/) property that is the element size of the array. These arrays are sparse nature in which it is possible for one or more of the key names to not be defined, which is one root cause for problems when one is not aware of thins and how to prevent these problems from happening in the first place.

There are many methods that can be used with arrays that are in the array prototype. These methods help with editing, filtering, and mapping arrays. Many of these methods have been part of the javaScript spec for a long time and are thus very safe to use when it comes to concerns of engine support. Others are a little newer so there should be a degree of concern at least maybe depending on the situation with browser support.

Often a javaScript developer will come across objects that are considered array like objects but are not an actual instance of Array, but Array methods can be used with them by using a [function prototype method like call, apply or bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call). The reason why is because the own properties of the object just happen to be the same as that of an array, it is just that the object was created with a constructor other than the Array constructor and as such does not have the same methods in the prototype of the object as with an instance of an array. On top of using function prototype methods to get these objects to work with array prototype methods there are also a number of ways to convert these kind of objects to arrays. There is also knowing about various tools to work with in native javaScript that help with the process of creating arrays from other kinds of collections such as object collection involving named keys rather than numbered ones.

There are many [posts on the Internet that have to do with getting started with javaScript arrays](https://www.javascripttutorial.net/javascript-array/), and also posts that get into all kinds of details about arrays when it comes to the various array prototype methods. However I thought I would take a moment to get together my own content on arrays when it comes to javaScript as there are all kinds of little things to get to in my own little way about them for what it is worth. This post will then serve as a general overview of Arrays in javaScript in which I will touch base on a lot of things concerting arrays themselves, and all kids of little things that might branch off from there. I will also be lining to all kinds of additional posts from here that get into certain array prototype methods, properties, and things that come up when working with arrays.

<!-- more -->

## 1 - JavaScript arrays and what to know before hand

This is a post on javaScript arrays, as such it is important to have at least some starting background with javaScript as this is not a getting started post on javaScript in general. If you are completely new to javaScript it might be a good idea to start with my [getting started with javaScript post](/2018/11/27/js-getting-started/), or some other alternative. However if you have at least some background with javaScript, but want to learn more about arrays in general, then this might prove to be a good read.

In this section I will be starting out with some very imple examples of arrays that should work okay in most javaScript environments. In later sections in this post I will be getting into the various topics that I am touching base on here in further detail.

### The source code examples are on Github

I have a a Github repository called test vjs which serves as the dumping ground for my source code examples for my [various posts on javaScript](/categories/js/). This post is no exception of this and as such the source code examples in this post can be found in the [for post folder that corresponds with the file name of this post](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-array).

### 1.1 - Basic array example

For a basic example of an array there is starting out bu just creating one by using the Array constructor, or the array bracket syntax. I will be getting into detail about the various ways of going about creating an array in a later section in this post, but for now there is just starting out with a quick example that uses the bracket syntax.

```js
let a = [1, 2, 3, 4];
console.log(a.join('')); // '1234'
console.log(a.length); // 4
console.log(a instanceof Array); // true
console.log(a.constructor.name); // 'Array'
```

Once an instance of an array is created there are a number of things that can then be done with the array. Prototype methods such as the array jon method for example can be used to create a string value of the array, there is also accessing the length property of the array. In order to confirm that the instance of an array is indeed an array that is using the instance of operator, or checking the name property of the constructor object of the array.

### 1.2 - While loop example

There are a number of ways to loop over the contents of an array, some of which are array prototype methods, but others are part of the javaScript syntax itself. Prototype methods work fine, however there are also a lot of talking points as to why it might be a good idea to consider using a loop such as a while loop first and foremost. For one thing while loops seem to preform a fair amount faster compared to the array for each method when working with large arrays. Other things come up that have to do with the sparse nature of javaScript arrays which result in certain array prototype methods skipping over certain elements. So for these reason and many more it is some times called for to just use a tired yet true loop of one kind or another as a means to loop over the contents of an array.

```js
let a = [1, 2, 3, 4],
el,
i = 0,
len = a.length;
while (i < len) {
    a[i] = Math.pow(2, a[i]);
    i += 1;
}
console.log(a.join('-')); // '2-4-8-16'
```

### 1.3 - Array prototype methods

There are a number of useful methods to work with in the prototype object of an instance of an array. One example of this would be the array map method that will return a new array with elements that are result of some code that is in a function that is called for each element in the source array.

```js
let a = [1, 2, 3, 4].map((el) => {
    return Math.pow(2, el);
});
console.log(a.join('-')); // '2-4-8-16'
```

There is a great number of additional method to be aware of that I will be getting into in depth later on in this post. For now there is just being aware of the fact that there are a whole lot of tools in the array tool box of sorts, and methods like map, join, and for each are just a few of these tools.

### 1.4 - Other methods that return arrays, and objects in general.

There are a whole lot of other methods and features in javaScript that will create and return an array, or they are some kind of feature that is closely tiled to arrays. There are also all kinds of problems that will arise when dealing with arrays, as well as with objects in general actually because a lot of what surrounds arrays and objects can prove to be a little complex. For example there is not just thinking in terms of arrays but collections in general. That is having to choose between using an array, or some other kind of collection object standard involving numbered key values and a length property compared to collections that involve named keys.

```js
let obj = {
    foo: 1,
    bar: 2,
    baz: 3
};
// can get an array of keys like this
let a = Object.keys(obj);
// array prototype methods can then be used with the array
// of object key names
let b = Object.keys(obj).reduce((acc, key) => {
    return acc + obj[key];
}, 0);
let c = Object.keys(obj).reduce((acc, key) => {
    return acc + key + '-';
}, '');
console.log(a);
console.log(b);
console.log(c);
```

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

### 2.4 - The Object.keys and Object.values methods can be used to create arrays of key names or values from Objects

Often I might want to create an array of key names or values of an object. So on top of using things like the array constructor and bracket syntax there is also using static Object methods as a way to go about creating an array that is populated with values that I want right away. Using a method like Object.keys saves me the trouble of creating an empty array and then using something like a for in loop as a way to loop over the keys of an object and push key names into such an array.

```js
// the Object.keys method can be used to create an
// array of key names for a given object
var a = Object.keys({foo:1,'bar': 2});
console.log(a); // [ 'foo', 'bar' ]
// The Object.values method does the same as Object.keys
// only it will be an array of values rather than the key names
var b = Object.values({foo:1,'bar': 2});
console.log(b); // [ 1, 2 ]
```

### 2.5 - The array from method for creating arrays from array like objects

There is then the [array from static method](/2020/01/27/js-array-from/) of the Array global that is yet another way to go about creating an array. What is great about this method is that it is a nice way to go about quickly creating an array from an array like object. That is a plain old object ir any object that is formated like an array, but because of the way the object was created is not an instance of array. Feeding that kind of object to the array from method will return a new array that is an instance of array created with the properties of this array like object.


```js
var a = Array.from({
        0: 1,
        1: 2,
        2: 3,
        length: 3
    });
console.log(a); // [ 1, 2, 3 ]
```

There is a great deal more to write about when it comes to array like objects, so there is another section later in this post in which I revised this subject in further detail. For now as far as this section is concerned this is just yet another way of how to go about creating an array.

## 3 - Pushing, shifting, and adding elements to an array

Once an Array is created it is important to know how to add elements to it. There are a number of ways to do so, with array prototype methods, as well as just directly writing index values. The most common way to go about adding elements to an array in javaScript may be the Array.push method as a way to just append one or more elements to the end of an array, but there are a number of other ways to do so as well that a javaScript developer should be aware of. In this section then I will be running over some of the various ways that I find myself adding elements to an array when working on a project.

### 3.1 - Just adding, or overwriting by index

One of the most simple ways to go about adding elements to an Array is to just use the square bracket notation to set the element value of a desired index. To do this just use square brackets after the variable name with the desired index value passed via the brackets. This can be used as a way to both set, and query a certain index value of the array. For example I can use a while loop to just step an index variable and then use that index variable with the bracket syntax to start setting element values of an array.

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

There are a number of other ways to add or set element to an array rather than just using a while loop though. For example I can create a function that uses an expression to figure what an index value should be for a single element that I want to add or change

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

The [array splice method](/2021/07/20/js-array-splice/) is typically used as a way to remove elements from an array. However while removing elements it is also possible to use the method to add some elements in at an index location also. In addition to this option to add elements to the array it is also possible to give a value of zero for the number of element to remove at an index location. So then the array splice method can be used to just add elements to an array and do so at any index location.

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

### 6.3 - Using setTimeout as a way to loop

If I want to loop over an array in a way in which a certain about of time passes between each index I can use [something like setTimout](/2018/12/06/js-settimeout/). In fact this is one of several options when it comes to making some kind of main application loop of some kind, but that might be a matter for a whole other post. With that being said when it comes to really looking into doing this kind of looping in client side javaScript there is the [request animation frame method](/2018/03/13/js-request-animation-frame/), and also getting into [web workers](/2021/11/05/js-webworker/) when it comes to spinning up more than one event loop to work with in a browser. In nodejs there is using a method like setTeimout sure, but it might be worth it to not do so alone and to loop into using the [child process](/2018/02/04/nodejs-child-process/) module to spin up more than one process on the host operating system.

```js
var arr = [0, 0, 0, 0];
 
var i = 0;
var loop = function () {
    setTimeout(loop, 1000);
    arr[i] = Math.random() >= 0.5 ? arr[i] - 1 : arr[i] + 1;
    arr[i] = arr[i] < -5 ? -5 : arr[i];
    arr[i] = arr[i] > 5 ? 5 : arr[i];
    console.log(arr);
    i += 1;
    i %= arr.length;
};
loop();
```

## 7 - Array Prototype methods In depth

There is a great number of array prototype methods to work with in order to preform various tasks with arrays. I have all ready used a fair number of them in the various sections of this post so far such as push, map, and for each just to name a hand full of them. However if the aim is to create a comprehensive post on arrays in general in javaScript, then I will want to have a section in which I go over most, if not all of these methods. So then in this section I will be going over some quick examples of the various array prototype methods that there are to work with that a javaScript developer should become familiar with sooner or later.

### 7.1 - Using Array.filter

One of the most important tasks to preform with arrays is to filter them to create a new array that is a kind of sub collection of elements. One of the many Array prototype methods is [Array.filter](/2020/10/03/js-array-filter/) than can help with filtering tasks. The Array.filter method creates a new array rather than mutating the Array that it is call off of making Array.filter a functional programming friendly method.
To use Array.filter all I need to do is just call the method, and pass a function that will be used to filter the Array that I call filter off of. The current element is passed as the first argument which I can use when defining the logic that will be used to filter. If a true boolean value is returned the current element will be included, else it will not.


```js
var arr = [2, 3, 16, 7, 9, 128];
var pow2 = arr.filter(function (n) {
    return String(Math.log(n) / Math.log(2)).indexOf('.') == -1;
});
 
console.log(arr); // [2,3,16,7,9,128]
console.log(pow2); // [2,16,128]
```

### 7.2 - Mapping an Array

Another handy Array method to know about is of course Array.map. This method is useful when I want to apply some kind of logic to all elements in an array, and remap the contents in the process. This is another array method that excepts a function as its first argument like that of Array.forEach, or Array.filter. However this time the returned value is what will be set as the current index value.

```js
var a = [1,2,3,4,5,6];
 
a = a.map(function(n){
 
   return Math.pow(2,n);
 
});
 
console.log(a); // [2,4,8,16,32,64]
```

In lodash there is the [\_.map](/2018/02/02/lodash_map/) method that works the same way as Array.map, but it is a collection method so it can be used with objects as well as a means of mapping both array elements, and objects keys in general.

### 7.3  - finding something in an array

When it comes to working with an array there will come a time where I will want to [find something in the array](/2021/07/19/js-array-find). This can have more that one meaning, but will often mean finding a single element in the array. There is some over lap though when it comes to finding something in an array, filtering and array, and sorting an array though.

There is the array find method that can be used to find a single element in an array that meets a condition of some kind given with a function. This works by applying the callback for each element starting from index 0 forward to the end of the array. In the event that the function that is given to the find method returns true for a given element, that element value will then be the returned value from the call of array kind.

```js
// and array of numbers
var a = [1, 2, 3, 4, 5, 6, 7];
 
var b = a.find(function (n) {
        return n > 2;
    });
console.log(b); // 3
```

### 7.4 - Sorting an array

The [array sort method](/2019/12/02/js-array-sort/) is the native javaScript way to go about sorting an array in place. there are also many useful user space methods that have been made for this sort of thing, for examples when it comes to using lodash there is also the [lodash sort by method](/2018/07/06/lodash_sortby) that can be used in that framework if that is part of an application. In this section though I will be mainly just going over the user of the array sort method in native javaScript.

Here is a basic example of using the sort array prototype method on an array or primitives. When it comes to using the array sort method this way I do not even have to give a sort function as the default functionally will work well when it comes to that. One thing to point out right away with this is that the array sort method will mutate the order if index values in place. So if I do not want that to happen I will need to make a copy of the array first. If I do not want the numbers to be in the order of smallest to largest I can use the array reverse method, or get into making a custom sort method.

```js
// basic example that will mutate in place
let arr = [7, 4, 2, 5, 8, 6, 3, 1];
arr.sort();
console.log(arr);
// [ 1, 2, 3, 4, 5, 6, 7, 8 ]
 
// to not mutate in place a copy of the source array
// must be made first, it will then be the copy that 
// is mutated by array sort
arr = [4, 0, 1, 1, 5, 8, 3, 4, 6];
let b = arr.map((n)=>{ return n}).sort();
console.log(arr); // [ 4, 0, 1, 1, 5, 8, 3, 4, 6 ]
console.log(b) // [ 0, 1, 1, 3, 4, 4, 5, 6, 8 ]
 
// the array reverse method is one way to reverse the order
arr = [4, 9, 8, 2, 3, 6, 5];
arr.sort().reverse();
console.log(arr); //[ 9, 8, 6, 5, 4, 3, 2 ]
```

### 7.5 - The reduce method

The [reduce method](/2021/07/13/js-array-reduce/) is often used for tasks that involve condensing an array into a single primitive value such as a number or a string. However the method can also be used as an alternative to the array filter method, and even though the method is called reduce it can also be used to create a larger new array from a source array actually depending of course on the logic in the function that is passed to it.

```js
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// reduce array of numbers into a sum
let b = a.reduce((acc, n) => {
    return acc + n;
}, 0);
console.log(b); // 45
```

### 7.6 - for each

The [for each method](/2019/02/16/js-javascript-foreach/) is a prototype type method that can be used as one of several options for just looping over the contents of an array. As I have covered in the above section on looping I generally prefer to use while loops as a way to loop over an array in some kind if general custom way. There are a number of reasons why I often do go with some other prototype method in place of the for each method also, as there are many other prototype methods that are similar to that of for each, but prove to be a better choice for certain kinds of tasks. Still I find myself using for each on occasion when it comes to quick simple examples and solutions, it is just not by any means the only way to go about doing this sort of thing.

```js
let a = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let b = 0;
a.forEach((n) => {
    b += n;
});
console.log(b); // 45
```

### 7.7 - The flat method for flattening out an array of arrays into just one array 

The [array flat method](/2021/07/15/js-array-flat/) is the standard built in array prototype method for creating a single array of elements from an array of arrays of elements. I will be getting into arrays of array and various other ways of creating an multidimensional array in javaScript in a later section in this post.

```js
// demo
let a = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
let b = a.flat();
console.log(b); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## 8 - Multidimensional Arrays

There are two general ways of making [Multidimensional Arrays in javaScript](/2020/03/31/js-array-multidimensional/) as I see it. There are arrays of arrays, and then there is using a formula to make a sort of virtual multidimensional array that is really just a plain old linear array with a single dimension. If you spend enough time playing around with various libraries as well as native javaScript features chances are it is only a matter of time until one becomes familiar with both general ways of making multidimensional arrays. In this section then I will be going over a few quick examples of these kind of arrays in bother there nested format as well as the ways of doing so with just a single flat array, but using a formula to get and set elements.

### 8.1 - Arrays of Arrays

One way to go about having a multidimensional array in javaScript is to have an Array of Arrays. This is simple enough as the way of doing so is to just create an array like always just think in terms of having arrays as elements of the array. All use case examples involve just two dimensions, but there is adding additional dimensions by just continuing to nest arrays rather than having some kind of primitive value or object for each end node of the matrix.

```js
 
var grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
 
console.log( grid[1][1] ); // 5
```


### 8.2 - Plain old linear Array, but with style.

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

## 9 - Array length and count

Another subject of arrays is what is often referred to as the [length of an array](/2018/12/14/js-array-length/) to which I will not be getting into in detail here as I have all ready went off the deep end when it comes to that topic. The length of an array is just a property of an array object that contains a number that is the current max element size of an array, but with that said yes the length can change. The length of an array is often confused with other values of an array, such as the number of actual public numbed keys, or elements that there are in the array. So it is worth looking into playing around with a few quick code examples to have a better understating of what the deal is with array length, and that this is not always reflective as to how many elements are in the array, depending on how you go about counting elements.

## 9.1 - Basic array length example

First off there is just knowing what the length property is about when it comes to a typical basic situation at least. If I have an array that I create with the array bracket syntax then the length of that array is 1 as one might expect.

```js
let a = ['foo'];
// array length is one relative
console.log(a.length); // 1
// but index values are zero relative
console.log(a[0]); // 'foo'
```

## 10 - Conclusion

There is a great deal more to write about when it comes to javaScript Arrays. I did not even scratch the surface when it comes to every little thing to know about with Arrays in javaScript. For example there is more to write about when it comes to typed arrays, and how they differ from the regular typical arrays that are used in javaScript. In lodash there is a lengthly collection of methods that can be used to help with common programming tasks surrounding arrays, as well as with objects in general to discus as well. Hopefully this post did a decent job of covering some of the basics and then some though.