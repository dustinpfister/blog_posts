---
title: Making a sum with lodash _.sum, _.reduce, and vanilla javaScript alternatives
date: 2018-11-15 14:48:00
tags: [js,lodash]
layout: post
categories: lodash
id: 332
updated: 2020-07-09 18:34:56
version: 1.20
---

Creating a sum from an array, more often then not, is a fairly trivial matter with javaScript as it can quickly be done with a native array method like [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). However in some cases it might be nice to have methods that make quick work of trivial tasks allowing me to move forward with s project faster. Also in some cases making a sum is not so trivial, thankfully in [lodash](https://lodash.com/) there are some methods that can be used to help make the process of producing a sum speed along a little faster. In this post I will be writing about [\_.sum](https://lodash.com/docs/4.17.11#sum), [\_.sumBy](https://lodash.com/docs/4.17.11#sumBy), [\_.reduce](https://lodash.com/docs/4.17.11#reduce), and vanilla js alternatives when creating a sum.

<!-- more -->

## 1 - what to know before hand

This is a post on using lodash to help with tasks involving [summation](https://en.wikipedia.org/wiki/Summation), as well as plain javaScript examples of doing so as well. This is not a getting started post on lodash, or javaScript in general so I assume that you have at least some background with these topics.

### 1.1 - version numbers matter

In this post I was using lodash 4.17.10

## 2 - Using lodash to add up a sum

So there are a number of methods in lodash that can be used to add up a sum, such as \_.sum which can be used to quickly add up the numbers of an array. In addition summation can also easily be done with methods like \_.reduce, and \_.forEach. However in this post I will be focusing on methods like \_.sum, and \_.sumBy.

### 2.1 - Using \_.sum to just add an array of numbers

Using the \_.sum method is easy enough when it comes to an array of primitive numbers at least. In that case just pass the array of numbers to it and you sum of those numbers will be returned.

```js
// array element length
let a = [1, 2, 3, 4];
 
let sum = _.sum(a);
 
console.log(sum); // 10
```

Although I most real world examples I can not say that I often deal with an array that is formated like this, I must first produce this array, or I must loop over an array of objects adding up one or more values and ignoring others. Not to worry there are other methods that can be used together to deal with most of those situations as well such as \_.sumBy.

### 2.2 - Using \_.sumBy for an array of objects

Say I have a not just an array of numbers, but an array of objects, and I need to make a sum by preforming an operation for each object. For example say I have an array of objects where each object is a report for sales and expenses for a certain business day. I want to add up how much profit has been made for each day, so I will need to subtract expenses from sales and then add that result up for each day. This can be done with \_.sumBy lodash method in a very quick and easy manor.

```js
let reports = [{
        date: '01/01/18',
        sales: 1200,
        expenses: 950
    }, {
        date: '01/02/18',
        sales: 800,
        expenses: 650
    }, {
        date: '01/03/18',
        sales: 300,
        expenses: 250
    }
];
 
let profit = _.sumBy(reports, function (day) {
 
        return day.sales - day.expenses;
 
    });
 
console.log(profit); // 450
```

### 2.3 - Using \_.reduce

The [\_.reduce](/2018/07/25/lodash_reduce/) methods can be used to create a sum fairly quickly as well.

```js
// array element length
let a = [1, 2, 3, 4];
 
let sum = _.reduce(a, (acc, n) => {
 
        return acc + n;
 
    });
 
console.log(sum); // 10
```

### 2.4 - Do not forget about the power of chaining

So if you are using the full lodash library then there are all the methods that lodash has to offer that can be used to help with the process of  working out a more complicated task involving a sum. The lodash methods like groupBy can be used in conjunction with others like \_.map with [Implicit Chaining](/2018/11/11/lodash_chain/).

Say you have a bunch of objects that share a common value, and I want all objects that share that value summed up I could pull that off by doing something like this.

```js
let stores = [{
        store: '1',
        money: 50
    }, {
        store: '1',
        money: 100
    }, {
        store: '2',
        money: 200
    },
 
];
 
let summed = _(stores)
.groupBy('store')
.map((objs, key) => {
    return {
        'store': key,
        'money': _.sumBy(objs, 'money')
    }
})
.value();
 
console.log(summed);
// [ { store: '1', money: 150 }, { store: '2', money: 200 } ]
```

## 3 - Vanilla javaScript examples

Now for some plain vanilla JavaScript examples of how to add things up. Lodash is a great project with many useful methods, but it is also true that making a sum is really not all that hard to do with just plain old javaScript. In this section I will be looking at native equivalents to methods like \_.reduce as well as other features that are part of native javaScript by itself.

### 3.1 - Just using a loop

Noting wrong with just using a for a while loop that is what they are there for. When using a while loop there is the trick of setting an index value to the length of an array and then subtracting from the index variable that is also evaluated in the while loop. This works because the number zero evaluates to false.

For example I can use that to quickly make a method that will figure an average of an array of numbers like this.
```js
// array element length
let a = [68,90,87,83,98];
 
let getAVG = function (a) {
    i = a.length,
    sum = 0;
    while (i--) {
        sum += a[i];
    }
    return sum / a.length;
};
 
console.log(getAVG(a)); // 85.2
```

### 3.1 - using Array.forEach or a loop

Using a native method like Array.forEach can be useful for quickly adding up some numbers.

```js
// array element length
let a = [1, 2, 3, 4];
 
let sum = 0;
 
a.forEach((n) => {
    sum += n;
});
 
console.log(sum);  // 10
```

## 4 - Conclusion

So in lodash there are some methods that ca be used to quickly produce a sum, as well as other methods that can be used to add up a sum as well although they are not there for that purpose alone. With native javaScript there might not be a native sum method in the array prototype, but it is not to hard to make a sum with javaScript alone as well.
