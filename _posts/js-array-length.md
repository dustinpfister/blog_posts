---
title: Array length in javaScript
date: 2018-12-14 22:01:00
tags: [js]
layout: post
categories: js
id: 348
updated: 2019-04-07 13:42:59
version: 1.30
---

[Array length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) in javaScript often refers to the highest numbered index value of an array plus one because array length is one rather than zero relative. The length differs from the size of an array which may refer to the amount of data that an array might take up in memory, and the count of an array that refers to the number of actual defined elements in he array. So then for the most part the length property in an array is pretty easy to understand, however there are a few situations that might cause a degree of confusion, so a post on this subject might be called for to help clear some of that confusion.

<!-- more -->

## 1 - Array length basics in javaScript

For the most part array length in javaScript is a fairly simple and straight forward process, all Arrays and Array like objects have a length property. This length property is updated each time one or more elements are added to the array, as well as when they are removed as well when using an array prototype method like Array.pop. However there is a difference between length and what is often called count. More on that later on in this post, but for now lets cover the basics of array length in javaScript.

### 1.1 - Array length is one relative, and index values are zero relative

One other aspect of arrays other than the length is the nature of array index values in ajavaScript. Arrays in javaScript are Objects that have a numbered set of public key value pairs. These numbered index values are zero relative, meaning that they start at zero and go upward from there. However the length of an array is one relative so this often results in an inconsistency between length and index values of an array in javaScript.

```js
let a = ['foo'];
 
// array length is one relative
console.log(a.length); // 1
 
// but index values are zero relative
console.log(a[0]); // 'foo'
```

### 1.1 - Array length, and Array index

So the element length of an array can often be obtained by just referencing the length property of an array like so.

```js

console.log(a.length); // 3
 
console.log( a[0]); // 1
console.log( a[2]); // 3
```

The value that is returned is going to be a number that is typically one larger than the highest index of the array. This is because the array length of an array is one relative while the actual index values are zero relative. For the most part that is all there is to it except for maybe some rare but possible situations in which this is not the case. See the length of an array is not always the length of an array, read on if you want to know why.

### 1.2 - Pushing in new elements increases length

When using a method like Array.push to add new elements to an array, the length will be updated each time. In many cases the length of an array is also the count of an array, but in some cases this is not the case more on that later in this section. In the following example I am just creating an empty array with the array literal syntax, pushing in a new element for each iteration, and also loging the current count each time.

```js
let a = [],
count = 5,
i = 0;
while (i < count) {
    a.push(Math.pow(2, i));
    console.log(a.length);
    // 1 2 3 4 5
    i += 1;
}
```

As expected the length of the array goes from one upwards to 5 as I am logging the length after pushing in new elements to it. Fairly simple of course, but in some situations things can get a little confusing when it comes to adding elements to an array in other ways, as well as when removing them.

### 1.3 - Popping out old elements decreases length

So also when expected popping out old elements from an array will result in the length decreasing as well. Here again I have a very simple example where I am just removing elements from an array with the Array.pop method one at a time on each iteration of a loop. As this happens the length as expected decreases with each iteration as well.

```js
let a = [1,2,3,4,5],
i = a.length;
while (i--) {
    a.pop();
    console.log(a.length);
    // 4 3 2 1 0
}
```

There are of course many other ways to remove elements from an array that will result in a decrees of length, however there are also some ways to do so that will not. This is of course where things get a little confusing and why it is important to understand the difference between array length and array count.

### 1.4 - Setting something to a high index value will set the length of the Array

Take into account a basic example such as this for a moment.

```js
let a = [1,2,3,4,5];
a[10] = 10;
console.log(a.length); // 11
```

Here we have an array with a length of 11, but in a way there is only 6 elements in the array. This is what I am talking about when it comes to the difference between array length and array count. The length of the array is just the highest defined index value of he array plus one, while the count of an array is the actual count of defined elements in the array.

### 1.6 - Array length and array count

So the length of an array can be found by simply taking a look at the current value of the length property of an array, but the count must be obtained by some other means such as using the Object.keys static method.

```js
let a = [1,2,3];
a[4] = 5
console.log(a.length); // the length is 5
console.log(Object.keys(a).length); // the count is 4
```

The Object.keys method will work fine for a simple example such as this, but in some cases it will result in unexpected results when dealing with an array that has some additional public keys attached to it.

### 1.5 - length, and count is not always what is expected when dealing with associative Arrays

So if I have an array that has some elements added to it that are attached to indexed key names, and then some that are attached to key names that are not numbered index key values, this will result in an unexpected array count with Object.keys.

```js
let a = [0, 1, 2];
 
a['zero'] = 0;
a['one'] = 1;
a['two'] = 2;
 
console.log(a.length); // 3
console.log(Object.keys(a).length); // 6
```

This is because of the nature of the Object.keys method, it will give an array of all public key names of an object. In javaScript an Array is a kind of Object, so I can still do anything with it that I could with any other object such as adding additional public keys that are not numbered index values. So when trying to get the count of an array the Object.keys method might not always be the best option, more on array count later in this post.

## 2 - Setting the length property

It is possible to set the length property of an array. When setting a length that is lower than the current length that will result in what would be expected. Setting a higher length property will result in a situation in which any index values above the previous length will result in being undefined. This might result in unexpected behavior with some array methods like Array.forEach.

```js
var print = function (arr) {
    arr.forEach(function (el, i) {
        console.log(i, ':', el)
    });
    console.log('length: ', arr.length);
    console.log('*****')
};

var a = [1, 2, 3];
print(a);
a.length = 1;
print(a);
a.length = 5;
print(a);
 
/*
0 ':' 1
1 ':' 2
2 ':' 3
length:  3
*****
0 ':' 1
length:  1
*****
0 ':' 1
length:  5
*****
*/
```

## 3 - Array length when making an array from an object

So in javaScript Arrays are created with the Array constructor, or more often the Array literal syntax. The way that arrays or array like objects are structured is one or more numbered key value pares with a corresponding length property that is often the element count of this kind of object.

In other words something like this:

```js
var a = Array.from({
        0: 'a',
        1: 'b',
        2: 'c',
        length: 3
    });
 
console.log(a.length); // 3
```

Understanding this can help eliminate confusion with some situations in which the length of an array is in fact really not the length of the array. In this section I will cover some more examples like this to help elaborate more with this.

## 4 - Just a length property with empty elements

It is possible to have an array that has a set length, but all of the elements are undefined. This is the case if the array is created from an object that just has a length property. A similar situation can happen if the array is created with the Array constructor syntax and given an argument that will be the length of the array.

```js
var a = Array.from({
        length: 5
    });
 
console.log(a.length); // 5
 
var b = new Array(10);
console.log(b); // [ <10 empty items> ] 
```

Yet another good example of why it is that length differs from the actual element count of an array.

## 5 - Negative index values

It is possible to set negative index values for an array. When doing so this might result in unexpected length values as negative index values will not be counted. 
```js
var a = Array.from({
        0: 2,
        1: 3,
        2: 4,
        length: 3
    });
a[-1] = 1;
 
console.log(a.length); // 3
 
var b = ['a', 'b', 'c'];
 
b[-1] = '!';
 
console.log(b.length); // 3
console.log(Object.keys(b).length); // 4
```

However as long as the index values are enumerable the Object.keys method can be used to get an array of enumerable keys for an object, including possible negative index values. Which would be one way to get the true index value if these negative index values are to be counted.

## 6 - Ways of getting an actual element count

Say you are dealing with an object that also has some named object keys, and a single index value that is way ahead of the others. As I have covered in the previous section the length property of an array in javaScript is just the highest index value plus one. However there are a number of ways to go about getting the actual count of elements in these situations.

```js
var a = [1,2,3];
a[-1] = 0;
a['foo'] = 'bar';
a[10] = 'baz';
 
// length is just one more that the highest
// index value
console.log(a.length); // 11
 
// get the actual count of elements
console.log(Object.keys(a).length); // 6
console.log(Object.values(a).length); // 6
 
// get a count of all keys, even the length property
console.log(Object.getOwnPropertyNames(a).length); // 7
```

The Object.keys method can be used to get an array of enumerable key names of an object, and the Object.values method can be used to get an array of the corresponding values. Then there is Object.getOwnPropertyNames that can be used to get all of the objects own Property names even ones like length, and any additional key value pairs that are set to be not enumerable.

## 7 - Typed Arrays and length

When working with typed arrays the length property refers to the number of bit sized units the array is. For example if it is a Unit16Array and it has 3 elements the length of it is 3, and the byte length of it is 6.

```js
var a = [255,25,257];
 
var buff = Uint8Array.from(a);
 
console.log(buff); // [255,25,1]
console.log(buff.length); // 3
console.log(buff.byteLength); // 3
 
var buff = Uint16Array.from(a);
 
console.log(buff); // [255,25,257]
console.log(buff.length); // 3
console.log(buff.byteLength); // 6
```

The length of an array generally refers to the number of elements, or the highest index value plus one. It does not always refer to the the size of the array in terms of data.