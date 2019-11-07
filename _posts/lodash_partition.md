---
title: Using _.partition in lodash to break a collection into two groups
date: 2017-11-22 20:21:00
tags: [js,lodash]
layout: post
categories: lodash
id: 97
updated: 2019-11-07 10:51:24
version: 1.4
---

In [lodash](http://lodash.com/) there is a method that can be used to break a collection into two groups one of which meets a condition that is given in a function that is passed to it, and another that does not meet that condition. This is of course the [\_.partition](https://lodash.com/docs/4.17.4#partition) method. It is also not to hard to work out some simple solutions for doing more or less the same with plain old vanilla javaScript as well, but never the less lets look at some examples of spliting and array into two parts with lodash, and native javaScript.

<!-- more -->

## 1 - Basic example of lodash \_.partition

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

## 3 - Lets split an array into two with native javaScript