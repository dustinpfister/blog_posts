---
title: The history of the lodash is array method and it's relevance today
date: 2017-09-27 11:49:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 46
updated: 2022-01-20 16:01:35
version: 1.17
---

Detecting if an Object is an Array is a trivial matter, or at least it is if you do not care a whole lot about backward compatibility. If you do want to march backward compatibility back to say IE 8 (latest IE for win xp), or even further to IE 6 (latest for win 9.x) then you can not depend on Array.isArray, or [_.isArray](https://lodash.com/docs/4.17.4#isArray) in [loash](https://lodash.com/) ether for that matter actually. The reason why is because in late versions lodash just references Array.isArray, where is older versions do provide a user space javaScript solution for this.

So the lodash isArray method is maybe one talking point about the relevancy of still using lodash, but even then only when it comes to pushing legacy support way back to older clients that not many people are using at this point. Even if you want to go way back with support, even if it is more or less just for the nostalgia aspect of doing so, then it is not just a question of using lodash. There is the question of what version to use, and also weather or not it might be better to have a certain custom trailered lodash utility library of sorts that you can call your own.

<!-- more -->

## 1 - The lodash is array method in lodash 4.17.4

In late versions of lodash the native Array.isArray method is just being referenced, for some developers this might not sit well. However if you just care about modern evergreen browsers then it might not be much of a problem.

So then this is whats going on with it now.

```js
var isArray = Array.isArray;
```

So yes it's one of those methods in lodash now, where there is more or less no point. Many of us are scratching out heads wondering if we should even bother with lodash any more because of things like this. Of course lodash has much more to offer than just this one little method, but sometimes it seems like it is just a handful of methods like \_.merge.

### So whats the point of _.isArray in lodash?

Today there is no point, however in the past there was a point, so now it is there just for the sake of keeping old code written with lodash from breaking. If you are writing new code the whole point of \_.isArray is lost in late versions of lodash, unless you patch it, making your own lodash hack job, and thus make it the way it was in older versions of lodash.

### _.isArray in lodash 3.10.1

In lodash 3.10.1 (4.17.4 is the latest as of the writing) \_.isArray existed in a manner that you would expect if greater backward compatibility is desired. It was a polyfill that looked like this:

```js
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};
```

So yes if a native is array method exists just use that, else use what I am writing here that should work.

### 1.1 - Basic example of lodash is array

For a basic example of the lodash is array method there is just creating an array with say the array bracket syntax and then assigning that to a variable. When I pass that variable that contains a reference to the array as one would expect the return ed result of the is array method is true.

```js
let a = [1, 2, 3];
 
console.log( _.isArray(a) ); // true
```

### 1.2 - The lodash is array like method

There is the  also the [lodash is array like method](/2020/08/01/lodash_isarraylike) that will not just return true of arrays, but also any object that is formated like an array in terms of the own properties of the object. For example I can just create an object with the object literal syntax and then just start adding public keys that are numbers rather than names. I will then want to add a length property to this object that is the value that will be used to set the max number of elements for the array, or array like object rather. For this I can use the [Object define property method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) to make it so the length property will not be enumerable, and I can use the [object keys method](/2018/12/15/js-object-keys/) to get a count of the number of public keys when setting the value for this length property.

When I pass a reference to this kind of array like object to the lodash is array method the result is false, but when I pass it to the lodash is array like method as one would expect the result is true.

```js
let a = {
    0: 1,
    1: 2,
    2: 3
};
Object.defineProperty(a, 'length', {value: Object.keys(a).length});
 
console.log( _.isArray(a) ); // false
console.log( _.isArrayLike(a) ); // true
```

## 2 - Conclusion

So then the lodash \_.isArray method might have had a purpose in the past, and maybe still does if you care a great deal about browser support. Otherwise this is just yet another method in lodash that is starting to show its age. There are of course a lot of other [array methods in lodash](/2019/02/14/lodash_array/) that are also worth checking out real quick, many of them do preform useful tasks with arrays where there is no native array prototype counter part yet. If you think that you got something of value out of reading this and would like to read more on lodash I have a lot of [other posts on lodash](/categories/lodash/), including a kind of [main post on the topic of lodash](/2019/02/15/lodash/) that I get around to editing more often than the others.