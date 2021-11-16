---
title: Using _.partition in lodash to break a collection into two groups
date: 2017-11-22 20:21:00
tags: [js,lodash]
layout: post
categories: lodash
id: 97
updated: 2021-11-16 12:47:24
version: 1.18
---

In [lodash](http://lodash.com/) there is a method that can be used to break a collection into two groups one of which meets a condition that is given in a function that is passed to it, and another that does not meet that condition. This is of course the [\_.partition](https://lodash.com/docs/4.17.4#partition) method. Te return value is an array of arrays where the first element is all the elements that meet a given condition and the second element is all elements that do not meet the given condition.

When it comes to the partition method in lodash, it is also not to hard to work out some simple solutions for doing more or less the same with plain old vanilla javaScript. So then lets look at some examples of splitting a collection into two parts with lodash, as well as a few native javaScript solutions for this that do not require lodash.

<!-- more -->

## 1 - Basic example of lodash \_.partition

So lets start out with a very basic example of lodash partition. Here I have an array with mixed types, and values of types including numbers. Say I want the array split into two arrays one of which is just numbers that are not NAN, and the other is everything else. The lodash partition method is one way to go about doing that right away. I just have to call the lodash partition method, pass the array of interest as the first argument, and then a function that outlines the condition that will result in each element being placed in the first or second array within the array of arrays that will be returned.

```js
let arr = [8, null, 32, 'foo', NaN, 'bar', false, {}, 64, 128];
let parts = _.partition(arr, (el) => {
        return typeof el === 'number' && !_.isNaN(el);
    });
console.log(parts[0]);
// [ 8, 32, 64, 128 ]
console.log(parts[1]);
// [ null, 'foo', NaN, 'bar', false, {} ] 
```

So that is the basic idea, but lets look at some more examples using lodash, and native javaScript.

## 2 - Example of lodash \_.partition that involves playing cards

For a quick example of lodash partition I thought it would be fun to play with an array that represents a hand of seven [French playing cards](https://en.wikipedia.org/wiki/French_playing_cards). The \_.partition method can be used to split the collection of objects into two separate groups that meet a given condition, such as if a card has a value greater than or equal to eleven. In other words and example that splits a collection of cards into face cards, and everything else.

```js
var cards = [
 
    {suit: 'clubs', val: '1', desc: 'ace'},
    {suit: 'spades', val: '11', desc: 'jack'},
    {suit: 'hearts', val: '5', desc: '5'},
    {suit: 'hearts', val: '6', desc: '6'},
    {suit: 'diamonds', val: '7', desc: '7'},
    {suit: 'clubs', val: '13', desc: 'king'},
    {suit: 'hearts', val: '12', desc: 'queen'},
 
];
 
_.each(_.partition(cards, function(card){
 
   return card.val >= 11;
 
}), function(part){
 
    console.log('** part: ' + i + ' **');
 
    _.each(part, function(card){
 
        console.log(card.desc);
 
    });
 
});
```

In this example I am using \_.partition to create an Array of Arrays the first of which is an array of cards that meets the criteria of the condition that I gave it, and the second is everything else that remains. I then used \_.each to loop over each of these arrays, and then again to loop over each card.

As such I get what is expected.
```
** part: 0 **
jack
king
queen
** part: 1 **
ace
5
6
7
```

So as the name suggested \_.partition is useful for well partitioning an array into two arrays one of which meets the conditions given, and the other does not.

## 3 - Using vanilla javaScript in place of the lodash partition method

Okay so getting back to my basic lodash partition example, it is not to hard to do the same with native javaScript of course.  The basic idea of this is not all that hard to reproduce after all. I just need to create an array of two nested arrays, then have some function that will preform some kind of test for each element in a source array, or object in general that will return true or false for each element when the function is called and passed the value of an element. It is then just a question of pushing an element from the source array into the first element of the array of arrays for each true test, and the second array for each false test.

### 3.1 - Lets split an array into two with native javaScript

I was able to throw a little javaScript code together in a flash that does more or less the same thing as the lodash partition method.

```js
let source = [8, null, 32, 'foo', NaN, 'bar', false, {}, 64, 128], // source array
i = source.length, // index
parts = [[], []],  // the parts array
condition = (el) => { // a condition
    return typeof el === 'number' && !Number.isNaN(el);
};
// loop over elements of the source array, and call the condition function for each
// the the return value of the condition is true, add to the first array, else the second
while (i--) {
    let el = source[i],
    pi = condition(el) ? 0 : 1;
    parts[pi].unshift(el);
}
console.log(parts);
//[ [ 8, 32, 64, 128 ], [ null, 'foo', NaN, 'bar', false, {} ] ]
```

If partitioning an array into two parts is something that just happens once in the body of my code that is one thing, but if I start running into this sort of thing over and over again, I am going to want to abstract it away into a framework. I could start developing my own framework for these sorts of things, but why bother when there is all ready lodash?

### 3.2 - Creating a partition function that will work okay with arrays

The next step with this might be to make a quick copy and past method that will work with arrays at least for starters. So then for this example I just took the top level code example that I world out and just make a function that I can call over an over again with more than one source array, and set of conditions.

```js
// creating a function
let part = (source, condition) => {
    i = source.length,
    parts = [[], []],
    condition = condition || function (el) {};
    while (i--) {
        let el = source[i],
        pi = condition(el) ? 0 : 1;
        parts[pi].unshift(el);
    }
    return parts;
};
// demo
let source = [8, null, 32, 'foo', NaN, 'bar', false, {}, 64, 128]; // source array
let b = part(source, (el) => {
        return typeof el === 'number' && !Number.isNaN(el);
    });
console.log(b);
//[ [ 8, 32, 64, 128 ], [ null, 'foo', NaN, 'bar', false, {} ] ]
```

This was simple enough, however the lodash partition method is one of the many collection methods in lodash. What this means is that it is a method that will not just work with arrays, but it will work with objects in general.

### 3.3 - Making a partition methods that will work with objects in general

```js
// creating a function
let part = (source, condition) => {
    let values = source instanceof Array ? source : Object.values(source),
    keys = Object.keys(source),
    i = 0,
    len = values.length,
    parts = [[], []];
    condition = condition || function (el, key, source, i) {};
    while (i < len) {
        let el = values[i],
        pi = condition(el, keys[i], source, i) ? 0 : 1;
        parts[pi].push(el);
        i += 1;
    }
    return parts;
};
// demo
let source = {
    foo: 42,
    bar: 'baz',
    taz: false
};
let b = part(source, (el, key, source, i) => {
        console.log(el, key, source instanceof Array, i);
        return typeof el === 'number' && !Number.isNaN(el);
    });
console.log(b);
// 42 'foo' false 0
// baz bar false 1
// false 'taz' false 2
//[ [ 42 ], [ 'baz', false ] ]
```

## 4 - Conclusion

That will be it for now at least when it comes to the lodash partition method at least. If you would like to look into some further reading on lodash I have my [main post on lodash](/2019/02/15/lodash) that I have written on the topic. There are also a number of similar methods in lodash that come to mind that might also be of interest when it comes to these kinds of tasks such as the [Group by](/2018/08/02/lodash_groupby/) and [key by methods](/2018/10/24/lodash_keyby) in lodash.

