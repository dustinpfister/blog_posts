---
title: lodash xor array method aka symmetric difference
date: 2020-04-01 16:49:00
tags: [lodash]
layout: post
categories: lodash
id: 639
updated: 2020-04-14 10:40:07
version: 1.4
---

In [lodash there is the \_.xor](https://lodash.com/docs/4.17.15#xor) method that can create a new array that is the symmetric difference of the given arrays. In other words it will be an array of elements that show up in the arrays that are unique to each array, but not elements that are shared across all the arrays, or in other words elements that are intersections.

<!-- more -->

## 1 - Basic lodash xor example

For a basic example of the lodash xor method consider two arrays one with elements that are the numbers \[0,1\], and another with the numbers \[1,2\]. If the arrays are given to the lodash xor method the resulting array should be \[0,2\]

```js
let _ = require('lodash');
 
let xor = _.xor([0,1],[1,2]);
 
console.log(xor);
// [0,2]
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