---
title: The lodash _.drop method vs Array.shift, splice, and slice.
date: 2017-09-25 08:41:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 44
updated: 2017-10-02 09:47:05
version: 1.3
---

It looks like [lodash](https://lodash.com/) is a bit of a mixed bag of methods some of which do not exist in javaScripts built in Array prototype, and other methods that appear to be redundant. If a method is redundant maybe there is some kind of reason why I might still want to use it such as backward compatibility, but more often then not I tend to prefer to just work within core js.

<!-- more -->

Sometimes it seems like I come across something like [_.drop](https://lodash.com/docs/4.17.4#drop) in lodash, and scratch my head wondering if looking into lodash is a wise investment of time. A lot of these methods do work differently, and provide a certain something that does go beyond what may be in the core of js itself, so yes maybe it is worth it.

## So what does _.drop do?

Its a quick way to create a new array in which one or more elements are dropped from the beginning of the array. 

```js
var arr = [1,2,3,4,5,6],
 
newArr = _.drop(arr,3);
 
// the new Array is what remains
console.log(newArr); // [4,5,6]
 
// the original array is unchanged
console.log(arr); // [1,2,3,4,5,6]
```

Pretty straight forward, but is _.drop a good example of why one should use lodash? What about what there is in core js, is just using vanilla js really all that more difficult? As such Array.shift, Array.splice, and Array.slice come to mind.

## What does Array.shift do?

It returns the first element from the beginning of the Array, and it also directly modifies the Array that it is invoked on resulting in an array that is now one element shorter each time it is called.

```js
var arr = [1,2,3,4,5,6],
 
first = arr.shift();
 
// shift returns the first element in the array
console.log(first); // 1
 
// shift also modifies the array, 
console.log(arr); // [2,3,4,5,6]
```

## What about Array.splice, and Array.slice

So there is also the core js Array.slice, and splice methods that can be used to do this as well. Both methods do the same thing only one directly modifies (Array.splice), and the other returns a copy (Array.slice). Also they return arrays, still the above can be done with them as well.

```js
 
// A new array could be made with slice
newArr = arr.slice(3,arr.length);
 
// my Array.shift example could also be done like this with Array.splice
first = arr.splice(0,1)[0];
```

## Conclusion

These things do tend to drive me a little nuts, I guess lodash might help to make code that is a little easier to follow, yet again maybe not. Are the vanilla js alternatives really that much harder to follow? 

Be sure to check out my other [posts on lodash](/categories/lodash/)