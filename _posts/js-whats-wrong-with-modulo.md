---
title: What is wrong with javaScript Modulo?
date: 2017-09-02 14:39:00
tags: [js,corejs]
layout: post
categories: js
id: 34
updated: 2017-09-02 14:47:00
version: 1.1
---

When working with many javaScript projects the use of [modulo](https://en.wikipedia.org/wiki/Modulo_operation) comes up from time to time. Modulo is a Operator in core javaScript that often does work as expected, however it does follow a certain convention, and sometimes it can cause problems.


<!-- more -->

## What is modulo used for?

In short the modulo operation is used to find the remainder of a division operation, and for the most part that is how the modulo operation works in javaScript. However there is more than one convention, and sometimes javaScripts modulo operator will not work as expected.

One typically use case might be something like this, say you have a grid that is ten by ten sections. You want to write a method where if given a certain index value from 0-99, you can get the x, and y grid position.


As such javaScripts modulo works just fine by itself as expected, not problem.

```js
var width = 10,
i = 13,
y = Math.floor(i / width),
x = i % width; // whats remains when diving by width
 
console.log(x + ',' + y); // 3,1
```

However when starting to work with negative numbers, this is where problems happen.

## Negative Number problem

Say you have a spinner in a game that is used to find the number of spaces a player moves, like in many board games. In can be spin forwards, but also backwards, and should always reflect a certain number within a range, say 1 to 6.

As such say you put together something like this:
```js
var spin = {
 
    len : 5,
    index : 7,
    fix : function(){
    
       this.index = this.index % this.len;
    
    }
 
};
spin.fix();
console.log(spin.index); // 2
```

The fix method works just fine at correcting the zero relative index value if it goes over, but what if I give it a negative number?

```js
spin.index = -8;
spin.fix();
console.log(spin.index); // -3
```

This is not the way I would expect modulo to work for me most of the time when given a negative number. The spinner example reflects what I expect from a modulo operation most of the time where -8 would whip back around and land on 2. It's not wrong in the sense that 5 - 3 = 2, but with certain values it gives numbers like negative zero so I end up with 5 - -0 = 5 where I want the value to be 0.

## Using another a modulo method.

Sometimes it seems like the best thing to do is to just use a different method compared to what is used in core javaScript alone, as such my problem is solved.

```js
var spin = {
 
  len: 5,
  index: -10,
  modulo: function(x, m) {
 
    return (x % m + m) % m;
 
  },
  fix: function() {
 
     this.index = this.modulo(this.index,this.len);
 
  }
 
};
spin.fix();
console.log(spin.index); // 0
```