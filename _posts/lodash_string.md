---
title: Lodash String methods
date: 2022-01-28 10:25:00
tags: [lodash]
layout: post
categories: lodash
id: 955
updated: 2022-01-28 11:00:34
version: 1.9
---

This will be a quick post on string methods in the popular javaScript library known as [lodash](https://lodash.com/docs/4.17.15). The main reason why I am bothering with this is that I have wrote posts on [lodash collection methods](/2022/01/14/lodash_collection) in general, as well as [object methods](/2019/02/13/lodash_object/), and [array methods](/2019/02/14/lodash_array/) in lodash, so then it makes sense to write a post on the general topic of working with strings and loash.

<!-- more -->

## 1 - The Basics of strings and working with lodash

In this section I will be starting out with a few quick examples of using lodash to work with strings. This will not be an overview of the various lodash string methods, or how to go about doing similar things without the use of lodash, as these are things that I will intend to get to in later sections in this post.

### 1.1 - Basic example using strings and lodash

Maybe a good hello would type of method to start out with would be the split method, if I pass a string as the first argument an then a string to split by as the second the result will be an array where each element is a sub string between each instance of the string that was given to split the source string with.

```js
let a = _.split(',1,2,3,', ',');
console.log(a);
// [ '', '1', '2', '3', '' ]
```

So then the lodash split is an example of a method that will take a string as a first argument and then the method returns an array. Although the return value is an array the source that that method works with is very much a string, so then it is a kind of string method in lodash. However often one will need to also work with other lodash methods that are array methods, collection methods, or object methods in order to complete some kind of over all greater task. As you can see the end result of this example is an array with some empty strings as elements, as such I will typically want those elements removed, and then do something more with the array after that.

### 1.2 - The chain method with split, map and join

So now that I have a very basic hello workd style example out of the way when it comes to string methods in lodash the next step might be something a little more advanced. When it comes to chaining methods in lodash there are a few options to choose from, one of which is the lodash chain method. When calling the chain method the first method that I can pass to it could be a string value, but then when it comes to calling another method off of chain it will then need to be a string method, or at least some method that will work with a string value. As with the basic example above this can be the split method again for examples as that is of course a string method in lodash.

After the split method is called then I can use some kind of method in lodash that will work with an array to remove those empty string values that I do not want. There are a few options for this, one of which is the compact method that works well for this examples at least. I can then use the clean array of the empty string removed now with another method such as the lodash map collection method to create an array of values based off of the values from the source string. There is then array methods that can be used to create a string primitive value from an array of values, one such options with this would be the join method.

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

