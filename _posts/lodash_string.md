---
title: Lodash String methods
date: 2022-01-28 10:25:00
tags: [lodash]
layout: post
categories: lodash
id: 955
updated: 2022-01-28 10:42:20
version: 1.2
---

This will be a quick post on string methods in the popular javaScript library known as [lodash](https://lodash.com/docs/4.17.15). The main reason why I am bothering with this is that I have wrote posts on [lodash collection methods](/2022/01/14/lodash_collection) in general, as well as [object methods](/2019/02/13/lodash_object/), and [array methods](/2019/02/14/lodash_array/) in lodash, so then it makes sense to write a post on the general topic of working with strings and loash.

<!-- more -->

## 1 - The Baiscs of strings and working with lodash

### 1.1 - Basic example using strings and lodash

```js
let a = _.split(',1,2,3,', ',');
console.log(a);
// 2 4 8 16
```

### 1.2 - The chain method with split, map and join

```js
let a = _.chain(',1,2,3,4,').split(',').compact().map((n) => Math.pow(2, n) ).join(' ').value();
console.log(a);
// 2 4 8 16
```

### 1.3 - The lodash words method

```js
let a = _.chain('This is some Text').words().value();
console.log(a);
// 2 4 8 16
```

## 2 - Some lodash string methods

### 2.1 - The deburr method

```js
let spanish = 'Jalapeño';
console.log(_.deburr(spanish));
// Jalapeno
```

### 2.2 - lodash escape and escaping for html

```js
let a = _.escape('Some times < text & code > things need to be escaped');
console.log(a);
// Some times &lt; text &amp; code &gt; things need to be escaped
```

### 2.3 - lodash pad

```js
let an = 1503345; 
console.log(_.pad(an,10,'0'));      // 0150334500
console.log(_.padEnd(an,10,'0'));   // 1503345000
console.log(_.padStart(an,10,'0')); // 0001503345
```


## 3 - Conclusion

