---
title: The lodash _.drop method vs Array.shift, splice, and slice.
date: 2017-09-25 08:41:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 44
updated: 2019-06-27 17:50:47
version: 1.10
---

It looks like [lodash](https://lodash.com/) is a bit of a mixed bag of methods some of which do not exist in javaScripts built in Array prototype, and other methods that appear to be redundant. There are also some methods that on the surface seem redundant but are actuality collection methods that will work with both arrays and objects in general. So maybe some of these methods are not so redundant and there is also the question of backward compatibility as well when it comes to defending the use of lodash these days. Still more often then not I tend to prefer to just work within core js by itself.

<!-- more -->

Sometimes it seems like I come across something like [_.drop](https://lodash.com/docs/4.17.11#drop) in lodash, and scratch my head wondering if looking into lodash is a wise investment of time. A lot of these methods do work differently, and provide a certain something that does go beyond what may be in the core of js itself, so yes maybe it is worth it. However I do not thing that the lodash drop method might be the best example of this. In any case in this post I will be doing over some quick examples of the lodash drop method, as well as some plain old vanilla js alternatives.

## 1 So what does lodash _.drop do?

Its a quick way to create a new array in which one or more elements are dropped from the beginning of the array. So it makes it a kind of functional programing method example sense the original array is not mutated in any way.

```js
let arr = [1,2,3,4,5,6],
newArr = _.drop(arr,3);
// the new Array is what remains
console.log(newArr); // [4,5,6]
// the original array is unchanged
console.log(arr); // [1,2,3,4,5,6]
```

Pretty straight forward, but is _.drop a good example of why one should use lodash? After all is it really all that hard to do something like this in plain old vanilla javaScript? What about Array.shift, Array.splice, and Array.slice? Good question lets take a look at these vanilla javaScript alternatives for a moment then.

## 2 - What does Array.shift do?

It returns the first element from the beginning of the Array, and it also directly modifies the Array that it is invoked on resulting in an array that is now one element shorter each time it is called. So although it can be used as a way to remove one element from the beginning of an array also it does work a little differently.

```js
let arr = [1,2,3,4,5,6],
first = arr.shift();
// shift returns the first element in the array
console.log(first); // 1
// shift also modifies the array, 
console.log(arr); // [2,3,4,5,6]
```

Because Array.shift mangles the original array it is not very functional like, and I can also only remove one element at a time as well, but there are other options in vanilla javaScript so lets look at more examples when it comes to dropping some elements from the beginning of an array in JavaScript.

## 3 - What about Array.splice, and Array.slice

So there is also the core js Array.slice, and splice methods that can be used to do this as well. Both methods do the same thing only one directly modifies (Array.splice), and the other returns a copy (Array.slice). Also they return arrays, rather than just a single element as is the case with Array.shift. However it is not to hard to just adjust for that.

Array.splice in action:
```js
let arr = [1,2,3,4,5,6],
// my Array.shift example could also be done like this with Array.splice
first = arr.splice(0,1)[0];
console.log(first); // 1
console.log(arr); //[2,3,4,5,6]
```

and Array.slice
```js
let arr = [1,2,3,4,5,6],
// Array.slice does the same thing only it returns
// a new array so it does not mangle the original
first = arr.slice(0,1)[0];
console.log(first); // 1
console.log(arr); //[1,2,3,4,5,6]
```

I often get the two mixed up, they both do the same thing but with one very big difference. Array.slice is the method that is more functional like because it does not mangle the original array that is given to it.

## 4 - Conclusion

So the lodash drop method is a way to create a new array with the first few elements dropped from the beginning of the array, and the Array.slice method is another method that does more or less the same thing.