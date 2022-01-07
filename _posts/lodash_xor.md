---
title: lodash xor array method aka symmetric difference
date: 2020-04-01 16:49:00
tags: [lodash]
layout: post
categories: lodash
id: 639
updated: 2022-01-07 15:40:54
version: 1.14
---

In [lodash there is the \_.xor](https://lodash.com/docs/4.17.15#xor) method that can create a new array that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference) of the given arrays. In other words it will be an array of elements that show up in the arrays that are unique to each array, but not elements that are shared across all the arrays. In other words elements that are intersections for onw or more of the arrays will not be included in the resulting array. So then the lodash xor method is yet another method in lodash that can be used to create a new array from a collection of other arrays. There is then more than one way to go about doing what the xor method does with other lodash methods, as well as with plain old vanilla javaScript as well.

<!-- more -->

## 1 - Basic lodash xor example

### 1.1 - Basic xor example

For a basic example of the lodash xor method consider two arrays one with elements that are the numbers \[0,1\], and another with the numbers \[1,2\]. If the arrays are given to the lodash xor method the resulting array should be \[0,2\]

```js
let _ = require('lodash');
 
let xor = _.xor([0,1],[1,2]);
 
console.log(xor);
// [0,2]
```

I can not say that i get into situations in which I need to use a method like this thus far, but if I need to this is a kind of method where i might just use the lodash xor method and move on in a project. There are many methods in lodash where it is a bot of a gray area as to the question if I should even bother with lodash as there is a native method that can be used. It is also true that there are many methods in lodash where it is really not all that hard to do what the method does with plain od vanilla javaScript. However I am not so sure that this is one of thous methods in lodash,

### 1.2 - Three or more arrays

It is then possible to pass as many arrays that I want as arguments to the xor function. In the first basic example I was just starting out with two, but in this one I am now dealing with three. The result is the same though the values that are returned in the resulting arrays will be cuase that show up in just one, bit not two or more of the additional arrays.

```js
let xor = _.xor([3,1], [1,2], [2,2,0]);
console.log(xor);
// [3, 0]
```

There is the question of how to go about feeding an array of arrays to this xor method, or any other method that works like this. Also if there is an xor method that will give my an array of values that are values that only show up once in one array then there should be a method that will return values that show up in all of the arrays. So lets look at a few more examples that will help with that and much more while we are at it here.

### 1.3 - Sort

The order of the values will change form one use case to another depending on the order in which the arrays are given. In mode cases this is not a problem, but if for some reason it is a problem the values will need to be sorted. One way to do so with lodash method would be to make use of the [lodash sort by method](/2018/07/06/lodash_sortby/).

```js
let a = _.xor([3, 1], [1, 2], [2, 2, 0]);
let b = _.sortBy(a, (n) => {
        return n;
    });
 
console.log(a);
// [3, 0]
console.log(b);
// [0, 3]
```

### 1.4 - The apply Function prototype method

If I want to use an array of arrays, then one way to go about doing so with the lodash xor method would be to use the [apply method of the function prototype](/2017/09/21/js-call-apply-and-bind/).

```js
let a = [ [3, 1], [1, 2], [2, 2, 0] ];
let b = _.xor.apply(null, a);
 
console.log(b);
// [3, 0]
```

### 1.5 - The lodash intersection method

The [lodash intersection](/2019/12/03/lodash_intersection) method is then the method that I would want to use in order to get an array of values that show up in each of the given arrays of values.

```js
let a = [ [3, 1], [1, 2], [2, 2, 0, 1] ];
 
let b = _.xor.apply(null, a);
let c = _.intersection.apply(null, a);
 
console.log(b);
// [ 3, 0 ]
 
console.log(c);
// [ 1 ] 
```

## 2 - Looking under the hood with this one in the lodash source code

With a lot of lodash methods it is not always so hard to make a vanilla javaScript alternative, however with the lodash xor method it might not be so easy. Even if it is easy to make a stand alone method there might still be a lot to take into account when it comes to certain situations.

As a lodash end user I often just call methods like \_.xor, get the result that I want, and then move on. However some times I take a look at the lodash source code to gain a deeper understanding and apprehension of what is going on with the lodash source code. Even if you do not use lodash, or maybe just a method or two now and then at all, the lodash source code is still worth checking out when it comes to reading code.

I was able to get a similar result by copying and pasting in much of the lodash internals like this.

```js
// arrayIncludes
function arrayIncludes(array, value) {
  const length = array == null ? 0 : array.length
  return !!length && baseIndexOf(array, value, 0) > -1
}
 
// baseUniq
function baseUniq(array, iteratee, comparator) {
  let index = -1
  let includes = arrayIncludes
  let isCommon = true
 
  const { length } = array
  const result = []
  let seen = result
 
  if (comparator) {
    isCommon = false
    includes = arrayIncludesWith
  }
  else if (length >= LARGE_ARRAY_SIZE) {
    const set = iteratee ? null : createSet(array)
    if (set) {
      return setToArray(set)
    }
    isCommon = false
    includes = cacheHas
    seen = new SetCache
  }
  else {
    seen = iteratee ? [] : result
  }
  outer:
  while (++index < length) {
    let value = array[index]
    const computed = iteratee ? iteratee(value) : value
 
    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let seenIndex = seen.length
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer
        }
      }
      if (iteratee) {
        seen.push(computed)
      }
      result.push(value)
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed)
      }
      result.push(value)
    }
  }
  return result
}
 
// isFlattenable
function isFlattenable(value) {
  return Array.isArray(value) || isArguments(value) ||
    !!(value && value[spreadableSymbol])
}
 
// baseDifference
const LARGE_ARRAY_SIZE = 200
function baseDifference(array, values, iteratee, comparator) {
  let includes = arrayIncludes
  let isCommon = true
  const result = []
  const valuesLength = values.length
 
  if (!array.length) {
    return result
  }
  if (iteratee) {
    values = map(values, (value) => iteratee(value))
  }
  if (comparator) {
    includes = arrayIncludesWith
    isCommon = false
  }
  else if (values.length >= LARGE_ARRAY_SIZE) {
    includes = cacheHas
    isCommon = false
    values = new SetCache(values)
  }
  outer:
  for (let value of array) {
    const computed = iteratee == null ? value : iteratee(value)
 
    value = (comparator || value !== 0) ? value : 0
    if (isCommon && computed === computed) {
      let valuesIndex = valuesLength
      while (valuesIndex--) {
        if (values[valuesIndex] === computed) {
          continue outer
        }
      }
      result.push(value)
    }
    else if (!includes(values, computed, comparator)) {
      result.push(value)
    }
  }
  return result
}
 
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable)
  result || (result = [])
 
  if (array == null) {
    return result
  }
 
  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, predicate, isStrict, result)
      } else {
        result.push(...value)
      }
    } else if (!isStrict) {
      result[result.length] = value
    }
  }
  return result
}
 
// baseXor
function baseXor(arrays, iteratee, comparator) {
  const length = arrays.length
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : []
  }
  let index = -1
  const result = new Array(length)
 
  while (++index < length) {
    const array = arrays[index]
    let othIndex = -1
 
    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator)
}
 
let a = baseXor([[0, 1], [1, 2]]);
console.log(a);
// [0,2]
```

This is still not all of the code that might be used in some cases as I did not copy over all the internal methods that are used in the various other internal methods that the lodash baseXor method uses. I did not take the time to make my own stand alone vanilla javaScript xor method for this post, but the basic idea that I started with is there in the baseXor method that I started out with in my attempt with two nested while loops. 

I might get around to updating this post with a stand alone vanilla javaScript method that is just the core of what is going on here, but for now this is one where I might just use lodash and move on when and if i am in a situation in  which I need an xor method like this.

## 3 - Conclusion

That is it for now when in comes to the lodash xor method, as well as many other related lodash and native javaScript features in this post at least. If you enjoyed reading this post there is checking out my [main post on lodash](/2019/02/15/lodash/), or looking into what I have wrote with respect to the many [other lodash posts I have written](/categories/lodash) over the years.