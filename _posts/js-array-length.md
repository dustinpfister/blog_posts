---
title: Array length in javaScript and addressing the confusion
date: 2018-12-14 22:01:00
tags: [js]
layout: post
categories: js
id: 348
updated: 2021-07-21 13:59:56
version: 1.65
---

You would think that [Array length](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length) in javaScript is a trivial matter, and in some respects it might be. However on closer inspection there does seem to be more to it than what might appear to be the case on first inspection. One way of thinking about it might be that Array length in javaScript refers to the highest numbered index value of an array plus one because array length is one rather than zero relative. That is when it comes to the number index values of arrays the numbers start at zero rather than one as with the array length property. However the value can also be though of more as just a potential for that actually, as all the elements could be empty elements as the length of an array might not always be the same as what is often called the count of an array.

So then because in some cases array length is just an object property that does not even reflect the highest indexed object key of the array, because there is nothing there actually in some situations. Then in a way it is just a way of declaring an element size of sorts, but many of those elements can be undefined, the default value for an object key that is not there.

The length differs from the size of an array which may refer to the amount of data that an array might take up in memory. There is also what if often called the count of an array that refers to the number of actual declared elements in the array, and that array count might differ in many respects depending on how you go about counting elements in the first place.

So then for the most part, on the surface at least, the length property of an array is easy to understand under a certain light. However there are a few situations that might cause a degree of confusion. So in this post on the subject of array length in javaScript I will take a moment to see about trying to clear up some of the confusion. As such this will be a lengthy post that I will be updating often.

<!-- more -->

## 1 - Array length basics in javaScript

For the most part array length in javaScript is a fairly simple and straight forward concept, all [Arrays](/2018/12/10/js-array/) and [Array like objects](/2017/05/12/js-arrays-are-objects/) have a length property. This length property is updated each time one or more elements are added to the array, as well as when they are removed using an array prototype method like Array.pop, or Array.splice. However there is a difference between length, and what is often called count when taking about arrays in js. More on that later in this post, but for now lets cover the basics of array length in javaScript.

### 1.1 - Array length is one relative, and index values are zero relative

One of the basic concepts to understand about arrays is the nature of array index values in a javaScript programing environment. Arrays in javaScript are Objects that have a numbered set of public key value pairs. So each property of the object that is an element of the array has a numbered index value that can start at the value of zero upwards to the array length minus one. 

So in other words these numbered index values are zero relative, meaning that they start at zero and go upward from there, rather than starting at one which would be one relative. So then because the length of an array is one relative, this can often result in inconsistency between length of an array and the index values of an array, however this can easily be adjusted by subtracting or adding one.

```js
let a = ['foo'];
 
// array length is one relative
console.log(a.length); // 1
 
// but index values are zero relative
console.log(a[0]); // 'foo'
```

### 1.1 - Array length, count, and Array index

An array has a length property and in most situations the length property is also the number of actual elements in the array as well. However this is not always the case depending on how you go about counting elements. So an arrays count of elements might differ from the length of the array depending on the methodology used to count elements, or potential elements if you prefer. One way of putting it would be thinking of an empty liter sized bottle, it might be an empty bottle but it still has a capacity of one liter. The length of an array could be thought of as the liter bottle itself, and the count of an array can be thought of as whatever amount of volume of something is filling that array.

In addition to the length of an array, and the count of the elements in the array there is also the array index value. This is often a number or a string that can be easily converted to a number that reflects the index of a certain element in an array. That being said there are at least three general numerical values of interest when it cokes to working with an array then, the max capacity or array length, the element count, and the current index value when it comes to looping over the contents of an array.

```js
// a plain old object
// with numbered keys and
// a length property
var obj = {
    2: 'array',
    4: 'length',
    6: 'in',
    8: 'javaScript',
    length: 10
};
 
// creating an array from this object
var arr = Array.from(obj),
 
// getting the length value
len = arr.length,
 
// getting the count value by way of a
// certain method
count = arr.filter(function (el) {
        return !!el ? el : false;
    }).length,
 
// setting an index value
index = 2,
 
// using that index value to get an element
el = arr[index];
 
console.log(arr.length, count, index, el);
 // 10 4 2 'array'
```

In the above example I have an array that was created from an object that has numbered key value pairs, and a length property that has a value greater than the number of other keys in the object. Also the numbed keys of the object are going up by multiples of two, and there are four keys in the object aside from the length key. This hopefully helps to give a clear understanding of what the differences are between array length, count, and an index value.


### 1.2 - Pushing in new elements increases length

When using a method like Array.push to add new elements to an array, the length will be updated each time. In the following example I am just creating an empty array with the array literal syntax, pushing in a new element for each iteration, and also logging the current length each time.

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

As expected the length of the array goes from one upwards to five as I am logging the length after pushing in new elements to it. Fairly simple of course, but in some situations things can get a little confusing when it comes to adding elements to an array in other ways, as well as when removing them.

### 1.3 - Popping out old elements decreases length

So also as expected popping out old elements from an array will result in the length decreasing. Here again I have a very simple example where I am just removing elements from an array with the Array.pop method one at a time on each iteration of a loop. As this happens the length decreases with each iteration of the loop as elements are removed from the end of the array with Array.pop.

```js
let a = [1,2,3,4,5],
i = a.length;
while (i--) {
    a.pop();
    console.log(a.length);
    // 4 3 2 1 0
}
```

There are of course many other ways to remove elements from an array that will result in a decrees of length, however there are also some ways to do so that will not. This is of course where things get a little confusing and why it is important to understand the difference between array length and array count as I have covered in the previous sub section of this post on length, count and index values of an array in javaScript.

### 1.4 - Setting an array element to a high index value will set the length of the Array

ANother way to end up setting array length is by using the bracket syntax to set a numbers index value higher than the current length. Take into account a basic example such as this for a moment.

```js
let a = [1,2,3,4,5];
a[10] = 10;
console.log(a.length); // 11
```

Here we have an array with a length of 11, but in a way there is only six elements in the array when it comes to a basic way of counting elements. This is what I am talking about when it comes to the difference between array length and array count. The length of the array is just the highest defined index value of he array plus one, while the count of an array is the actual count of defined elements in the array.

### 1.5 - Array length and array count with Object.keys

So the length of an array can be found by simply taking a look at the current value of the length property of an array, but the count must be obtained by some other means such as using the Object.keys static method which can be used to get an array of public keys of any object including arrays.

```js
let a = [1,2,3];
a[4] = 5
console.log(a.length); // the length is 5
console.log(Object.keys(a).length); // the count is 4
```

The Object.keys method will work fine for a simple example such as this, but in some cases it will result in unexpected results when dealing with an array that has some additional public keys attached to it.

### 1.6 - length, and count is not always what is expected when dealing with associative Arrays

So say I have an array that has some elements added to it that are attached to indexed key names as usual with an array, but then some that are attached to key names that are not numbered index key values but non numbed string values. This will result in what might be an undesired array count with Object.keys.

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

It is possible to set the length property of an array. When setting a length that is lower than the current length that will result in what would be expected which is the array will end up being truncated to that length that was set. Setting a higher length property will result in a situation in which any index values above the previous length will result in being undefined. This might result in unexpected behavior with some array methods like Array.forEach.

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

## 6 - Array count, and ways of getting an actual element count

Say you are dealing with an object that also has some named object keys, and a single index value that is way ahead of the others. As I have covered in the previous section the length property of an array in javaScript is often just the highest index value plus one, and in some cases it is not even that it is just a property of an object. However there are a number of ways to go about getting the actual count of elements in these situations.

### 6.1 - Object.keys and Object.values

There are two static methods of the main Object Object in core javaScript that in most cases will work okay for getting element count, but there are some drawbacks to be aware of.

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

One drawback to using these methods as a way to obtain element count of an array is that if some additional named properties are added to the array that will effect the count, to resolve this a method that involves just counting the positive numbered keys of the array. 

### 6.2 - Just loop for Array count

So one way of getting actual element count that comes to mind is to just loop from zero to the length of the array of vice versa and preform some kind of condition for each for each potential element to determine if there is actually something there or not.

```js
let count = (arr) => {
 
    let i = arr.length,
    ct = 0;
    while (i--) {
        if (arr[i] !== undefined) {
            ct += 1;
        }
    }
    return ct;
}
 
// empty array with a length of 100
let a = new Array(100);
 
a[49] = 'foo';
a[70] = 'bar';
 
console.log(a.length); // 100
console.log(count(a)); // 2
 
a[71] = undefined;
 
// however declared yet undefined keys will not be counted
console.log(count(a)); // 2
console.log(Object.keys(a).length); // 3
```

This presents some issues of concern when it comes to arrays with a length property that might be set to a very high number for example. It is a silly waste of resources to loop over all those undeclared numbered key values, when I could find some way to just filter a list of declared key values that can be obtained via the Object.keys static method.

### 6.3 - Get Array count with Array.filter

So another way to get the actual count of an array would be to still use a method like Object.keys, but filter the results of that method. The [Array filter method](/2020/10/03/js-array-filter/) could be used as a way to create an array of Object keys that are numbered keys equal to or grater than that of zero. The length of that array could then be used as a way to determine the count or an array.

```js
let count = (arr) => {
    return Object.keys(arr).filter((key) => key >= 0).length;
}
 
// empty array with a length of 100
let a = new Array(100);
 
// three numbered keys
// above zero and below length
// with one declared by undefined
// element
a[49] = 'foo';
a[70] = 'bar';
a[71] = undefined;
 
// some named keys
a[-1] = 'oh boy';
a['foo'] = 'bar'
 
// count works as expected compared to actual key length
console.log(count(a)); // 3
console.log(Object.keys(a).length); // 3
 
// using delete will get rid of an element for real
delete a[71];
console.log(count(a)); // 2
```

The expression could be tweaked to preform additional checks such as weather or not object keys that are declared but set to undefined should be counted or not.

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

## 8 - The delete operator and Array length

So in javaScript there is the [delete operator](/2019/02/20/js-javascript-delete/) which can be used to delete object properties. Once might thing that using it might effect array length, but it does not. It would seem that it is no different from just setting an array element to undefined. So then it does not behave as one might expect when it comes to using the delete keyword to remove elements from an array.

```js
// delete
let a = [1,2,3];
 
console.log(a.length); // 3
 
delete a[2];
 
console.log(a[2]); // undefined
console.log(a.length); // 3
 
// set undefined
let b = [1,2,3];
 
console.log(b.length); // 3
 
b[2] = undefined;
 
console.log(b[2]); // undefined
console.log(b.length); // 3
```

This is of course a very untypical way of deleting elements from an array though. In fact I can not say I use the delete keyword very often, in fact at all in just about any project so far.

### 8.1 - Deleting a source object property will effect length sometimes though

Although using the delete keyword to delete an array element will not effect length, deleting a property of an object that will be used to create an array might effect the resulting length of that array.

```js
let fromObj = function (obj) {
    let arr = [];
    Object.values(obj).forEach((val) => {
        arr.push(val)
    });
    return arr;
};
 
let obj = {
    0: 'bar',
    1: 42,
    3: false
};
 
console.log(fromObj(obj).length); // 3
 
// deleting a source object property
delete obj[1];
 
console.log(fromObj(obj).length); // 2
```

## 9 - Conclusion

So in javaScript array length is fairly easy to understand, but there are some things about it that can result in some confusion. There can be a difference between the length of an array and the actual element count for example. The length property is really only just a property of an object that reflects the highest element index of the array, and the array could be nothing but empty elements. There are also many little tricks about array length when it comes to setting the value of the length property of an array as a way to delete unwanted elements at the end of an array, and atypical ways of creating arrays fro plain old objects that juts have a length property.

In nay case I hope you enjoyed this post on array length in javaScript, I am sure that I have still managed to not cover everything when it comes to array length in javaScript alone, let alone the subject in general. If you have anything of relevant interest to add be sure to bring it up in the comments if you feel compelled to do so. Thank you for reading.