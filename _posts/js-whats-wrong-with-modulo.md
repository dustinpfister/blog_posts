---
title: What is wrong with javaScript Modulo?
date: 2017-09-02 14:39:00
tags: [js,corejs]
layout: post
categories: js
id: 34
updated: 2021-04-19 14:42:39
version: 1.20
---

When working with many javaScript projects the use of [modulo](https://en.wikipedia.org/wiki/Modulo_operation) comes up from time to time. Modulo is an [Arithmetic Operator in core javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators) that helps to find out the remainder of a division operation between two numbers.

Most of the time the javaScript modulo operator will work as expected just fine, however it follow a certain convention that might not be the same as some people might expect coming from other programing environments. This might not always be such a bad thing, but it can be when it produces different results for the same operation with the same values when compared to other ways of preforming a modulo operation. With javaScript modulo it is possible that you might run into problems when it comes to using the operator with negative numbers, and this might prompted a need for some other way to go about getting the remainder of two numbers. This raises the question what is wrong with the javaScript Modulo operator? Well nothing actually, yet something, in any case maybe this post might help to clear up some of the confusion.

<!-- more -->

## 1 - javaScript modulo and some examples of it in action

In short the modulo operation is used to find the remainder of a division operation, and for the most part the modulo operator will do just that and thus work as expected. However there is more than one convention, and sometimes javaScripts modulo operator will not work the way that one might want it to. In this section I will be going over a few quick basic examples of the modulo operator when working with positive numbers. As long as both numbers in an operation are positive then the built in javaScript modulo operator will work as I, and I am sure many others, would expect modulo to work. If you are more interested in reading about what happens with negative numbers then maybe you would prefer to skip this section, as this section is geared more for the basics of what modulo is all about for beginners mainly.

### 1.1 - A simple module example showing order of operations of javaScript modulo

I will not be getting into [Operator precedence](/2019/02/02/js-operator-precedence/) in detail here as I have wrote a post on that subject in detail all ready, and getting into the thick of that would be a bit off topic anyway. So I will just be briefly writing about order of operations and how it applies to just the modulo operator here. With that said the order of operators of the javaScript Modulo operator is the same as division and multiplication, so it will out rank addition for example when making an expression.

```js
console.log( 5 + 12 % 7 ); // 10
console.log( (5 + 12) % 7 ); // 3
```

### 1.2 - A grid example

One typical use case of the modulo operator might be something like getting the x and y values of a grid location when you know an index value as well as the width of the grid.  So say you have a grid that is ten by ten sections, and you want to write a method where if given a certain index value from 0-99, you can get the x, and y grid position. In such a case javaScripts modulo works just fine for this kind of example as it is yet another use case where one is just dealing with positive numbers.

```js
var width = 10,
i = 13,
y = Math.floor(i / width),
x = i % width; // what remains when diving by width
 
console.log(x + ',' + y); // 3,1
```

So then the javaScript modulo will work okay when it comes to example such as this where positive numbers are always what will be used. However the operator might not get the values that one might want when it comes to something that might involve numbers that will go in a negative range.

## 2 - The Negative Number problem with javaScript modulo

Say you have a spinner in a game that is used to find the number of spaces a player moves, like in many board games. A spinner can be spin forwards, but also backwards, and should always reflect a certain number within a range, such as say 1 to 6. In these kinds of situations I would have a pointer value that would be a value that represents the current section on the spinner. If I add to that pointer value then there should be no problem when it comes to using the javaScript modulo operator to get the remainder and use that as a way to loop back around again with the pointer value. However A problem might come up when it comes to using javaScript modulo to do the same when it comes to subtracting from that pointer value and ending up with a negative value for the pointer value that is then used with javaScript modulo.

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

## 3 - Using another JavaScript modulo method that is not the native module operator.

Sometimes it seems like the best thing to do is to just use a different method compared to what is used in core javaScript alone, as such the problem of the javaScript module operator not working as expected can be solved for all situations where a modulo operator is called for. Just work out a method that provides the same result as what one would want when dealing with negative numbers.

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

Now that I am using a custom cut modulo method that does work as expected I now of course get the results that I want. I first fount this little gem of a method called Mathematical modulo in the source code of [angles.js](https://github.com/infusion/Angles.js/blob/master/angles.js), which is a great little library by the way with all kinds of helpful methods that have to do with working with, you guessed it, angles. It sure is work checking out if you get a chance.

## 4 - Conclusion

So often I use the custom modulo in situations in which module is called for. Often I might be using modulo in expressions with values that might go into the negative number range, and thus using a custom modulo method to get the results that I want is often called for. 

The angles.js library that contained the mathematical modulo method that prompted me to write this post appears to no longer be maintained. That is not always such a bad thing assuming that the methods still work okay, and I would say that is more or less the case. Still I have taken the time to make my own angles.js module that I might come back to now and then when it comes to working out all kinds of things that have to do with angles. As such the mathematical modulo method should be a part of that kind of module, [so the post that I wrote on my angles module might be worth checking out when it comes to applications of the mathematical modulo method](/2021/04/16/js-javascript-example-angles-module/).


