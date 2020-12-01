---
title: The _.slice method in lodash
date: 2020-12-01 13:17:00
tags: [lodash]
layout: post
categories: lodash
id: 752
updated: 2020-12-01 14:36:26
version: 1.7
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

That is all there is to it really when it comes to just the basics of how to use the method. However there is more to write about whe it comes to this of course. There is the question of why one should bother using this method at all when the native Array slice method will work just fine. There might be some additional talking points about that as it would seem that the lodash slice method is not just an abstraction of the native array slice method. So the rest of this post will be centered around the native Array slice method and how it compares to this lodash slice method in some situations.

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

Another way to get a better idea of what is going on here when it comes to dense and sparse arrays is to take into account the diferences between these two objects.

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

The same result happens when the objects are use with map by way of the Function call method.

```
let mapper = (x, i) => {
   return i;
};
a = [].map.call(a, mapper);
b = [].map.call(b, mapper);
 
console.log(a); // [0, 1, 2]
console.log(b); // [ <3 empty items> ]
```

So that is the main diference the lodash slice method will fill in holes with the undefined value, and as such methods like map will not skip over what would otherwase be an empty element.

## 4 - Conclusion

So then when a 'sparse' array is returned, then certain methods like the map method might not work as expected. Often with many methods empty elements are skipped over completely. So when it comes to using the native Array slice method it still might be a good idea to check if one is dealing with a sparce array or not. Another option would be to just take care not to end up with a sparse array to begin with.