---
title: The _.slice method in lodash
date: 2020-12-01 13:17:00
tags: [lodash]
layout: post
categories: lodash
id: 752
updated: 2020-12-01 16:45:47
version: 1.12
---

In native javScript there is the [Array slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) method that will return a new array from another array without mutating the array in place. There is also yet another method in the core javaScript Array prototype object called splice that does more or less the same thing as [Array slice](/2018/12/08/js-array-slice/) only it will mutate the array in place. This however is a post on the [slice method in lodash](https://lodash.com/docs/4.17.15#slice) that is not just a reference to the native Array slice method.

The Array slice method in plain old javaScript by itself will work more or less just as well as the lodash slice method, but there is at least one note worthy thing that is different.

<!-- more -->

## 1 - Lodash slice basic example

If you all ready know about the Array slice method the lodash slice method works in just about the same way when it comes to the index value that you give to it. First the array that I want to slice must be given as the first argument, and then the starting and ending index values.

```
let a =  [1,2,3,4];
let b = _.slice(a, 1, 3);
 
console.log(a); // [ 1, 2, 3, 4 ]
console.log(b); // [ 2, 3]
```

That is all there is to it really when it comes to just the basics of how to use the method. However there is more to write about when it comes to this of course. There is the question of why one should bother using this method at all when the native Array slice method will work just fine. There might be some additional talking points about that as it would seem that the lodash slice method is not just an abstraction of the native array slice method. So the rest of this post will be centered around the native Array slice method and how it compares to this lodash slice method in some situations.

## 2 - The native Array slice method

When it comes to kicking lodash to the curb there is the native array slice method that will work in almost the same way. I will be getting to one little point on that in the next section. However for now just a simple example on the native Array slice method just for the sake of touching base on it.

```
let a =  [1,2,3,4];
let b = a.slice(1, 3);
 
console.log(a); // [ 1, 2, 3, 4 ]
console.log(b); // [ 2, 3]
```

Same result when it comes to this simple array of numbers sure. However this basic arrays of numbers is often called a 'dense array', rather than a 'sparse array'. The differences between these two kinds of arrays is where the lodash slice method is a little more robust.

## 3 - Sparse Arrays and the lodash slice vs Array slice methods

So far the examples of the Array slice and lodash slice methods involved the use of [dense arrays rather than sparse arrays](https://2ality.com/2012/06/dense-arrays.html). The difference between the two has to do with the absence or presence of empty elements in the array.

One way to create a sparse array is to use the Array constructor and pass a length for the array that is say 3 elements. When doing so the resulting Array is a 'sparse array', that is that it is basically just an object with a length property when it comes to the public key values. There are holes in the array sort of speak where there is not value at all, not even an undefined or null value, just no key at all.

The lodash array method will account for this, and the resulting array that is returned will have empty array elements filled with the value undefined. The native Array slice method will not do this for me.

### 3.1 - Using Array map on two arrays that are the result of calling Lodash slice and Array slice with a sparse array

This example should help give a basic idea as to why the lodash slice method is a tad more robust compared to the native counterpart. I involves using the Array map method on two arrays that are both the result of what is returned by lodash slice, and Array slice when used with the same sparse array. If you are not familiar with the map method it will return a new array by calling a function for each element in the array that it is called off of. Whatever is returned by the function that is passed to the map method will become the new element for the resulting array that is returned my the map method.

```
// a sparse array 'a'
let a =  new Array(5);
 
// creating 'b' from 'a' with lodash slice
// and creating 'c' from 'a' with Array slice
let b = _.slice(a, 1, 3);
let c = a.slice(1, 3);
 
// simple map method
let mapper = (x, i)=>{
  return i;
}
// using the same native Array.map on both results with the same mapper
console.log(b.map(mapper)); // [0, 1]
console.log(c.map(mapper)); // [ <2 empty items> ]
```

### 3.2 - Two Objects

Another way to get a better idea of what is going on here when it comes to dense and sparse arrays is to take into account the differences between these two objects.

```
let a = {
  0: undefined,
  1: undefined,
  2: undefined,
  length: 3
};
 
let b = {
  length: 3
};
```

These two objects can be though of as examples of array like objects. They might be plain javaScript Objects rather than arrays, but with respect of the own properties of each of the objects they are like arrays. Object a can be though of as a dense array like object, while object b would be a sparse array like object. The same result happens when the objects are use with map by way of the Function call method.

```
let mapper = (x, i) => {
   return i;
};
a = [].map.call(a, mapper);
b = [].map.call(b, mapper);
 
console.log(a); // [0, 1, 2]
console.log(b); // [ <3 empty items> ]
```

So that is the main difference the lodash slice method will fill in holes with the undefined value, and as such methods like map will not skip over what would otherwise be an empty element.

## 4 - Shallow clone Arrays with lodash slice

One additional thing that is worth mentioning about lodash slice, as well as the native array slice methods as that they can be used as a way to go about creating a shallow clone, or copy if you prefer, of an array. There is more than one way to go about doing this of course, but never the less the slice method is one way to skin this cat.

If you are not familiar with what a shallow clone is, and how it might compare to a deep clone, the difference has to do with objects compared to primitive values like numbers and strings. If you have an array of primitive values then a shallow clone will work just fine in making a true independent copy of that array, and changes made to it will not effect the source array from which it is cloned. However if you are working with an array of objects then shallow clone will just create a new array, but the same objects will be referenced, and any change made to the object values in the copy of the array will effect the source array.

So then the slice method will not work as excepted in all situations when it comes to cloning arrays, and as such it is not a replacement for methods like the lodash \_.deepClone method. For more on this topic check out my post on [copying arrays](/2020/09/03/js-array-copy/), in that post I go over a few options for cloning arrays. However for the sake of this section I will just be going over a few quick examples of shallow cloning of arrays using slice.

### 4.1 - Using slice to copy an array of primitive values works just fine

If it is an array of primitive values that are being copied then the slice method will work just fine. The reason why is because in javaScript primitives values like numbers and strings are copied by value rather than reference. So each element will end up being a whole new independent number. So then if the values are changed in the resulting array that is returned by the slice method, such changes will not effect the number values in the source array.

```js
let a = [1, 2, 3, 4];
let b = _.slice(a, 0, a.length);
 
b = _.map(b, (n)=> { return Math.pow(2, n); } );
 
console.log(b); // [ 2, 4, 8, 16 ]
// a is unchanged
console.log(a); // [ 1, 2, 3, 4, ]
```

### 4.2 - Using slice to copy an array of object values will result in a copy by reference situation

If slice is being used to copy an array of objects that is a whole other ball game, because in javaScript objects are copied by reference rather than by value. So then in that case it will be a new array, but it will still be the same references to the same objects in memory. So then in that case any change made to the objects in the new array returned n by slice will effect the source objects in the original array.

```js
let a = [{n:1}, {n:2}, {n:3}, {n:4}];
let b = _.slice(a, 0, a.length);
 
b = _.map(b, (obj)=> { obj.n = Math.pow(2, obj.n); return obj; } );
 
console.log(b); // [ { n: 2 }, { n: 4 }, { n: 8 }, { n: 16 } ]
// a is effected
console.log(a); // [ { n: 2 }, { n: 4 }, { n: 8 }, { n: 16 } ]
```

### 4.2 - Using map, and creating a new object for each element can help

However the map method by itself can be used as a way to deep clone an array objects, as long as it is just one level deep anyway. That is that things generally become a little complicated when it comes to nested objects. However even in those situations there are methods like the deep clone method in lodash that can be used to help with those kinds of situations in one wants complete copies of objects in an array.

```js
let a = [{n:1}, {n:2}, {n:3}, {n:4}];
let b = _.slice(a, 0, a.length);
 
b = _.map(b, (source)=> { 
    var newObj = {
        n: Math.pow(2, source.n)
    };
    return newObj; 
});
 
console.log(b); // [ { n: 2 }, { n: 4 }, { n: 8 }, { n: 16 } ]
// a is not effected
console.log(a); // [ { n: 1 }, { n: 2 }, { n: 3 }, { n: 4 } ]
```

## 5 - Conclusion

So then when a 'sparse' array is returned, then certain methods like the map method might not work as expected. Often with many methods empty elements are skipped over completely. So when it comes to using the native Array slice method it still might be a good idea to check if one is dealing with a sparse array or not. Another option would be to just take care not to end up with a sparse array to begin with.