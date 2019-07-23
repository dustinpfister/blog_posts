---
title: The history of the lodash is array method and it's relevance today
date: 2017-09-27 11:49:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 46
updated: 2019-07-23 11:45:49
version: 1.7
---

Detecting if an Object is an Array is a trivial matter, or at least it is if you do not care a whole lot about backward compatibility. If you do want to march backward compatibility back to say IE 8 (latest ie for win xp), or even further to IE 6 (latest for win 9.x) then you can not depend on Array.isArray, or [_.isArray](https://lodash.com/docs/4.17.4#isArray) in [loash](https://lodash.com/) ether for that matter because in late versions lodash just references Array.isArray.

<!-- more -->

## 1 - The lodash is array method in lodash 4.17.4

In late versions of lodash the native Array.isArray method is just being referenced, for some developers this might not sit well. However if you just care about modern evergreen browsers then it might not be much of a problem.

So then this is whats going on with it now.

```js
var isArray = Array.isArray;
```

So yes it's one of those methods in lodash now, where there is more or less no point. Many of us are scratching out heads wondering if we should even bother with lodash any more because of things like this. Of course lodash has much more to offer than just this one little method, but sometimes it seems like it is just a handful of methods like \_.merge.

## 2- So whats the point of _.isArray in lodash?

Today there is no point, however in the past there was a point, so now it is there just for the sake of keeping old code written with lodash from breaking. If you are writing new code the whole point of _.isArray is lost in late versions of lodash, unless you patch it, making your own lodash hack job, and thus make it the way it was in older versions of lodash.

## 3 - _.isArray in lodash 3.10.1

In lodash 3.10.1 (4.17.4 is the latest as of the writing) _.isArray existed in a manner that you would expect if greater backward compatibility is desired. It was a polyfill that looked like this:

```js
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};
```

So yes if a native is array method exists just use that, else use what I am writing here that should work.

## 4 - Conclusion

So then the lodash \_.isArray method might have had a purpose in the past, and maybe still does if you care a great deal about browser support. Otherwise this is just yet another method in lodash that is starting to show its age.