---
title: Using _.partition in lodash to break a collection into two groups
date: 2017-11-22 20:21:00
tags: [js,lodash]
layout: post
categories: lodash
id: 97
updated: 2018-06-03 07:01:53
version: 1.1
---

In [lodash](http://lodash.com/) there is a method that can be used to break a collection into two groups one of which meets a condition that is given in a function that is passed to it, and another that does not meet that condition. This is of course the [\_.partition](https://lodash.com/docs/4.17.4#partition) method.

<!-- more -->

## Example of \_.partition

For a quick example of this I thought it would be fun to play with an array that represents a hand of seven French playing cards. The \_.partition method can be used to split the collection of objects into two separate groups that meet a given condition, such as if a card has a value greater than or equal to eleven.

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
 
    part.forEach(function(card){
 
        console.log(card.desc);
 
    });
 
});
```