---
title: Making a sum with lodash _.sum, _.reduce, and vanilla javaScript alternatives
date: 2018-11-15 14:48:00
tags: [js,lodash]
layout: post
categories: lodash
id: 332
updated: 2021-10-02 11:56:15
version: 1.42
---

Creating a sum from an array, more often then not, is a fairly trivial matter with javaScript as it can quickly be done with a native array method like [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce). However in some cases it might be nice to have methods that make quick work of trivial tasks such as this by allowing me to just call a single method for this and move forward with a project that much faster. 

Making a native sum method might not be so hard, however if [lodash](https://lodash.com/) is there to work with in a project then that can be called to quickly create a sum for an array of numbers. In this post I will be writing about [\_.sum](https://lodash.com/docs/4.17.11#sum), [\_.sumBy](https://lodash.com/docs/4.17.11#sumBy), [\_.reduce](https://lodash.com/docs/4.17.11#reduce), and vanilla js alternatives when creating a sum from an array of numbers.

<!-- more -->

## 1 - what to know before hand

This is a post on using lodash to help with tasks involving [summation](https://en.wikipedia.org/wiki/Summation), as well as plain javaScript examples of doing so as well. This is not a getting started post on lodash, or javaScript in general so I assume that you have at least some background with these topics.

### 1.1 - version numbers matter

In this post I was using lodash 4.17.10

### 1.2 - The source code examples here are on github

I have the source code examples here in my [test lodash github respiratory](https://github.com/dustinpfister/test_lodash/tree/master/forpost/lodash_sum). I am working on more examples for this post so it is possible that the examples there might be a bit more up to date. In any case there are some additional notes, lists, and it is also a good place to make a pull request if you see something wrong with the code examples here. It is also where I hold my source code examples for all my other posts on lodash for what they are worth.

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

Working out something with a while loop is fine, but there are a number of other prototype methods, as well as static methods to be aware of when it comes to doing this sort of thing.

### 3.1 - Using Array.forEach or a loop

Using a native method like [Array.forEach](/2019/02/16/js-javascript-foreach/) can be useful for quickly adding up some numbers in an array. This basic array prototype method works by just calling the for each method off of an array, and then passing a function that I want to call for each element in the array. Inside the body of the function that I pass to array for each the first argument will be the current number value for which the function is being called. So then I just need to create a sum variable then call array for each off of the array and add to the sum variable inside the function that I given to array for each.

```js
// array element length
let a = [1, 2, 3, 4];
 
let sum = 0;
 
a.forEach((n) => {
    sum += n;
});
 
console.log(sum);  // 10
```

The for each method is a nice little method for looping over an array, but there are many other similar methods in the array, some of which might prove to be a better choice for making a sum.

### 3.2 - The Array reduce method is also a good choice for making sums

Maybe one of the best options when it comes to array prototype methods would be the [array reduce method](/2021/07/13/js-array-reduce/). This method might be a little confusing when compared to other array prototype methods like for each at first but once one gets the basics of how to use it, the method comes in handy often such as when making some kind of sum value from an array of values. 

The basic idea of making a sum with array reduce would be to call the array reduce method off of the array to which I want to make a sum from and then pass a reduce function as the first argument, and set a starting value for an accumulator to zero with the second argument for array reduce. The reduce function will then have an accumulator value for the first argument, and then the value of a current element as the second argument. Inside the body of the reduce function I just need to return the new value for the accumulator value with would be the sum of the accumulator plus the current element assuming that I will always be dealing with an array of numbers anyway.

```js
// reduce
let sumArray = (array) => {
    return array.reduce((acc, n) => {
        return acc + n;
    }, 0);
};
console.log(sumArray([1, 2, 3, 4])); // 10
```

## 4 - Objects in general and making a sum

Many of the methods in lodash are so called collection methods in the sense that they will work with objects in general, not just arrays. Sadly it would seem that the sum method is not once such method as the expected value that is passed to it needs to be an array. However it is often not so hard to convert say an array like object to an array, or some custom object with named keys to an array. The hard part is just furnishing an array of numbers first, and once that is done that of course can be passed to the lodash sum method, or one of the native options can be used. SO in this section I will be quickly going over some examples of making a sum from various kinds of objects other then that of an array in javaScript.

### 4.1 - Array like objects and Function.call

If you are not familiar with the [function prototype methods such as apply, bind, and call](/2017/09/21/js-call-apply-and-bind/) then it might be a good idea to take a moment to look into them at this point. Often I find myself in a situation in which I am dealing with some kind of array like object. What I mean by that is that I am dealing with an object that is formated like an array, in that it has numbered rather than named keys, and a length property. However it is an array like because it is a plain object, or an object of a prototype other than that of Array. So then I can not just call array prototype methods like reduce off of such objects. However I can call the call function prototype method off of the array reduce prototype method and pass the array like object as the first argument to the call method, after that I can pass arguments as if I am using array reduce.

```
// and array like Object
let obj = {
    0: 42,
    1: 10,
    2: 5,
    length: 3
};
// using array reduce with Function.call
let sum = Array.prototype.reduce.call(obj, (acc, n) => {
        return acc + n;
    }, 0);
console.log(sum); // 57
```

### 4.2 - Objects.values

Yet another method to keep in mind when using objects in general is the Object.values static method. This static method can be used to take an object and return an array of value for each public key. If each public key value is a number that I want to create a sum from this will then work to give me an array of numbers to which I can then pass to lodash sum, or use one of the native options.

```js
// and object with named keys rather than and array
// of array like object
let obj = {
    x: 42,
    y: 10,
    z: 5
};
// object values and reduce
var sum = Object.values(obj).reduce((acc, n) => {
    return acc + n;
}, 0);
console.log(sum); // 57
```

### 4.3 - Object.keys

There is also the Object.keys static method that is just like Object.values only it will return an array of keys rather than values.

```js
// and object with named keys rather than and array
// of array like object
let obj = {
    x: 42,
    y: 10,
    z: 5
};
// object keys and reduce
var sum = Object.keys(obj).reduce((acc, key) => {
    var n = obj[key];
    return acc + n;
}, 0);
console.log(sum); // 57
```

## 5 - Arrays of Arrays

Another topic that might come up when it comes to sums is how to go about making a sum of [arrays of arrays, or a multidimensional array](/2020/03/31/js-array-multidimensional/). When it comes to these kinds of arrays they can not just be passed to the lodash sum method. However there are a number of methods that can be used in lodash to help with this kinds of arrays mainly the [lodash flatten methods](/2018/08/12/lodash_flatten/).

### 5.1 - lodash flatten and sum methods

So if we are talking about just one more level then the lodash flatten method can be used to get a flattened array. The it is just a matter of passing the flattened array to the lodash sum method.

```js
let grid = [
    [0, 1, 3],
    [0, 0, 5],
    [1, 0, 0]
];
 
// using lodash flatten and sum
let sum = _(grid).flatten().sum();
console.log(sum); // 10
 
sum = _.sum(_.flatten(grid));
console.log(sum); // 10
```

### 5.2 - lodash flatten deep method for more then 2 dimensions

If I am dealing with more than one level I can use the flatten deep method.

```js
let grid = [
    [[0, 2, 3], [0, 0, 0], [0, 0, 0]],
    [[0, 0, 0], [0, 7, 0], [0, 0, 0]],
    [[0, 5, 0], [0, 0, 0], [3, 0, 0]]
];
 
// using lodash flatten deep
let sum = _(grid).flattenDeep().sum();
console.log(sum); // 20
```

## 6 - Conclusion

So in lodash there are some methods that can be used to quickly produce a sum, as well as other methods that can be used to add up a sum as well although they are not there for that purpose alone. With native javaScript there might not be a native sum method in the array prototype, but it is not to hard to make a sum with javaScript alone when it comes to using the native array reduce method for example. On top of that the lodash sum method is not a collection method, so in some cases one might still know how to convert certain types of objects to arrays first.

