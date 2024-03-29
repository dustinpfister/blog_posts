---
title: The lodash _.nth method use case example
date: 2017-10-12 08:52:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 60
updated: 2021-12-17 13:46:22
version: 1.19
---

When grabbing an element from an Array I need to give a zero relative index value where zero will be the first element, and that the last element in the array will end up having a value of one less from that of the total length of the array. This is a trivial matter for even a new javaScript developer as it is one of the first things I remember becoming aware of when [learning javaScript for the first time](/2018/11/27/js-getting-started/). 

There is a question of how to handle index values that fall outside the index range of the array though, that is when a negative index value is given. There are plenty of ways to handle that sort of thing with just plain old vanilla javaScript, such as making use of a [mathematical modulo method](https://en.wikipedia.org/wiki/Modulo_operation#Common_pitfalls) that will work well, but if I am using  [lodash](https://lodash.com/) in a project there is the [\_.nth](https://lodash.com/docs/4.17.4#nth) method.

<!-- more -->

## 1 - The Situation

When getting an element from an array by using the bracket syntax and giving an index value if I give an index that is below zero, or above or equal to the length of the array it will result in undefined. That is unless for some reason I set some negative index value for the array which I could, but that is another matter. With respect of the theme of this post when I get array elements this way I will not just get the corresponding element from the end of the array, and effect that might be desired in some situations.
That is if I think about an array being this thing like that of a circle, rather than an finite line. If I do think about it that way than I am going to be disappointed without some kind of helper method maybe. So to get to the point say I have a simple array of string elements, that is five elements in total.

### 1.1 - The basic situation

For a basic idea of what the situation is to begin with take into account a simple array of strings such as this.

```js
 var arr = ['fear','the','foo','man','chew'];
 
 console.log(arr[0]); // 'fear'
 console.log(arr[4]); // 'chew'
 console.log(arr[-3]); // undefined
 console.log(arr[5]); // undefined
```

If I get index zero with the bracket notation I get the first element, if I get index four with the bracket notation, no problem. However if I get index negative three I will not end up getting index element two, and if I get index five that will not swing around and get me the first element. The lodash nth method will give me the element that I want with negative numbers, but it will not swing back around when it comes to values that are at the array length and higher.

### 1.2 - Using the \_.nth lodash method

The lodash \_.nth method can be used to supply this kind of functionality in line with thinking of an array as being like a circle rather than a line segment. Any number value that is given outside the range of the array will just be converted to whatever the corresponding index would work out to, well with negative numbers at least for starters.

```js
 var arr = ['fear','the','foo','man','chew'];
 console.log(arr[-3]); // undefined
 
 // the nth method will wrap with negative numbers
 console.log( _.nth(arr, -3) ); // 'foo'
 // but it will not wrap values at length or higher
  console.log( _.nth(arr, 6) ); // undefined
```

So then there is the question of how to go about having the same thing going on with numbers at and above the length, and also how to go about getting index values rather than an element. So then maybe a few more examples are called for worthing with other lodash methods, and maybe even adding one of need be.

### 1.3 - The index of method

Another method in lodash that works this way with negative index values would be the [lodash index of method](/2019/06/26/lodash_indexof/). Just like that if the lodash nth method I can give an array and then a negative index value, only I will also need to give a value to look for. The other main difference is that I will be given an index value rather than an element at that location.

```js
 var arr = ['fear','man','foo','man','chew'];
 console.log( _.indexOf(arr, 'man') );     // 1
 console.log( _.indexOf(arr, 'man', -3) ); // 3
 // will not wrap though
 console.log( _.indexOf(arr, 'man', 7) );  // -1
```

### 1.4 - The lodash clamp method

There is a lodash clamp method that can be used to clamp a number to a given range. This clamp method can then be used set bounds for index values that might go below zero or above the length of an array minus one. This might work in some situations in which this is what I want to happen when index values that are out or range are given, but it is not a situation in which I get th behavior of the lodash nth method in both directions.

### 1.5 - Adding a lodash wrap number method

It would seem that there is a clamp number method in lodash, but no wrap number method. This would mean that if I want such a method in lodash I will need to add one using the [lodash mixin method](/2018/01/31/lodash_mixin/) to do so. If I add a wrap number method I can then use the same method to create an updated version of the lodash nth method that will wrap rather than just give me an undefined value when I give an index number of an array that is at the length of the array or higher.

The wrap method that I came up with for this example and many other examples is based off of the [wrap method that is found in the phaser game framework](/2018/07/22/phaser-math-wrap-and-clamp/). I just took what was in the source code and made it the source code of this wrap method that I am adding to lodash by way of the lodash mixin method. The method seems to work well when it comes to wrapping rather than clamping numbers.

```js
// adding a _.wrapNumber method to lodash
_.mixin({'wrapNumber': function(n, min, max){
    var r = max - min;
    return (min + ((((n - min) % r) + r) % r));
}});
// updated nth2 method that WILL WRAP
_.mixin({'nth2': function(arr, i){
    return arr[_.wrapNumber(i, 0, arr.length)];
}});

// can use the wrap number method directly
console.log(_.wrapNumber(-1, 0, 10)); // 9
console.log(_.wrapNumber(10, 0, 10)); // 0

 // the nth2 method will wrap with negative numbers, 
 // and index values at and above array length
 var arr = ['fear','the','foo','man','chew'];
 console.log(arr[-3]); // undefined
 console.log( _.nth2(arr, -3) ); // 'foo'
 console.log( _.nth2(arr, 6) ); // 'the'
```

## 2 - Running into trouble with making my own method, because javaScripts modulo operator

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

## 3 - Working vanilla js alternative to \_.nth

Making a vanilla js alternative to \_.nth just involves working out how to [make a modulo operation](/2017/09/02/js-whats-wrong-with-modulo/) that works a different way in which a positive, valid, in range value is always given.

```js
 var nth = function(arr, index){
 
    // ajust index
    index = (index % arr.length + arr.length) % arr.length;
 
    // return that element
    return arr[index];
 
 };
```

## 4 - Conclusion

These lodash methods are helpful, many even though many of them can be written quickly, it still saves time. I know that lodash is now one of those projects like jQuery where much of this is no longer needed, but even when a method like that comes along lodash still helps with backward compatibility with those older browsers people still use.
