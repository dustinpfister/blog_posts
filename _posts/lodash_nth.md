---
title: The lodash _.nth method use case example
date: 2017-10-12 08:52:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 60
updated: 2019-11-06 18:09:13
version: 1.5
---

When grabbing an element from an Array I need to give a zero relative index value where zero will be the first element and that last element in the array will end up having a value one less that of the total length of the array. This is a trivial matter for even a new javaScript developer as it is one of the first things I remember becoming aware of. There is a question of how to handle index values that fall outside the index range of the array though, that is when a negative index value is given. If I want to there are plenty of waysto handle that sort of thing with just plain old vanilla javaScript, but if I am using  [lodash](https://lodash.com/) in a project there is the [\_.nth](https://lodash.com/docs/4.17.4#nth) method.

<!-- more -->

## 1 - The Situation

When getting an element from an array by using the bracket syntax and giving an index value if I give an index that is below zero, or above or equal to the length of the array it will result in undefined. That is unless for some reason I set some negative index value for the array which I could, but that is another matter. With respect of the theme of this post when I get array elements this way I will not just get the corresponding element from the end of the array, and effect that might be desired in some situations.

That is if I think about an array being this thing like that of a circle, rather than an finite line. If I do think about it that way than I am going to be disappointed without some kind of helper method maybe. So to get to the point say I have a sime array of string elements, that is five elements in total.

```js
 var arr = ['fear','the','foo','man','chew'];
 
 console.log(arr[0]); // 'fear'
 console.log(arr[4]); // 'chew'
 console.log(arr[-3]); // undefined
 console.log(arr[5]); // undefined
```

If I get index zero with the bracket notation I get the first element, if I get index four with the bracket notation, no problem. However if I get index negative three I will not end up getting index element two, and if I get index five that will not swing around and get me the first element.

### 1.2 - Using the \_.nth lodash method

The lodash \_.nth method can be used to supply this kind of functionality in line with thinking of an array as being like a circle rather than a line segment.

```js
 var arr = ['fear','the','foo','man','chew'];
 
 console.log(arr[-3]); // undefined
 console.log(_.nth(arr,-3)); // 'foo'
```

Any number value that is given outside the range of the array will just be converted to whatever the corresponding index would work out to.

## 3 - Running into trouble with making my own method, because javaScripts modulo operator

I [wrote a post](/2017/09/02/js-whats-wrong-with-modulo/) on the nature of the modulo operator, and why it does not work the way that you might expect it to. So if you attempt to correct the given index value like this:

```js
 var nth = function(arr,index){
 
    return arr[ index % arr.length];
 
 }
```

You are going to have a bad time. That would be a pretty sleek one liner if it worked, and it will work with positive values that go equal to or beyond the length of the array, but not with negative index values.

```js
 console.log('js mod:');
 console.log( nth(arr,7)  ); // 'foo'
 console.log( nth(arr,-1)  ); // undefined
```

As such you would need to do something else.

## 4 - Working vanilla js alternative to \_.nth

Making a vanilla js alternative to \_.nth just involves working out how to [make a modulo operation](/2017/09/02/js-whats-wrong-with-modulo/) that works a different way in which a positive, valid, in range value is always given.

```js
 var nth = function(arr, index){
 
    // ajust index
    index = (index % arr.length + arr.length) % arr.length;
 
    // return that element
    return arr[index];
 
 };
```

## 5 - Conclusion

These lodash methods are helpful, many even though many of them can be written quickly, it still saves time. I know that lodash is now one of those projects like jQuery where much of this is no longer needed, but even when a method like that comes along lodash still helps with backward compatibility with those older browsers people still use.
