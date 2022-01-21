---
title: Chains and the lodash thru method
date: 2022-01-21 14:56:00
tags: [lodash]
layout: post
categories: lodash
id: 953
updated: 2022-01-21 15:50:13
version: 1.12
---

This will be a post on the [lodash thru method](https://lodash.com/docs/4.17.15#thru) that is one of several useful methods when working with a chain in lodash. The other useful method to take into account would be the [lodash tap method](/2022/01/07/lodash_tap/) that I wrote a post on earlier this month as I take a moment to expand on lodash, and edit some older posts on the topic too while I am at it. There is also the question of how to even go about starting a chain in lodash to begin with, when it comes to that there is the main lodash function, as well as the [lodash chain method](/2018/11/11/lodash_chain/).

<!-- more -->


## 1 - Basics of the lodash thru method and also chaining in lodash

In this section I will be starting out with a few quick basic examples of the lodash thru method, and while doing so I will also be touching base on some basic examples of chaining in lodash in general as well. Although I will be keeping these examples pretty basic I still am making some assumptions that you have at least a little experience with javaScript alone, as well as how to go about making use of a user space library such as lodash in your environment of choice. If not making things that simple is outside the scope of this post.

### 1.1 - Just calling methods and passing arguments

If you have not yet figured out chaining in lodash you might find yourself calling a lodash method as an argument for another lodash method and so on. Although this might work, there are lodash built in ways to avoid having to do this sort of thing.

```js
let a = {
    arr: _.split( _.trim(' abc '), '' )
};
console.log(a);
// { arr: [ 'a', 'b', 'c' ] }
```

### 1.2 - Using lodash chain

One way to avoid having to call lodash methods as arguments for additional lodash methods would be to make use of the lodash chain method.

```js
let a = {
    arr: _.chain(' abc ').trim().split('').value()
};
console.log(a);
// { arr: [ 'a', 'b', 'c' ] }
```

In some situations I might end up making a long chain of lodash methods and at some point in that chain it would be nice to have a way to tap into the chain and just do something custom with the value then and there. This is where methods like the lodash thru method will come into play.

### 1.3 - Using lodash thru

When making a chain the lodash thru method can be called at any point in the chain, and a function can be passed as the first and only argument for this thru method. Inside the body of the function that is passed to thru the return keyword will be used to return what will be the new value for the chain at that point.

```js
let a = _.chain(' abc ').trim().split('')
    .thru(function (a) {
        return {
            arr: a
        };
    }).value();
console.log(a);
// { arr: [ 'a', 'b', 'c' ] }
```

## 2 - Other lodash methods

### 2.1 - The lodash tap method

```js
let a = _.chain('01234')
.tap((x)=>{
    console.log(x); // '01234'
})
.split('')
.tap((x)=>{
    console.log(x); // [ '0', '1', '2', '3', '4' ]
})
.map((n)=>{
    return Math.pow(2, n);
})
.value();
 
console.log(a); // [ 1, 2, 4, 8, 16 ]
```

### 2.2 - The lodash mixin method

```js
_.mixin({
    myMethod: function (str) {
        return _.chain('01234')
        .split('')
        .map((n) => {
            return Math.pow(2, n);
        })
        .value();
    }
})
// I can not call this custom method
let a = _.myMethod('012345');
console.log(a); // [ 1, 2, 4, 8, 16 ]
// it can also be used in chains
let b = _.chain([0, 1, 2, 3, 4, 5])
.join('')
.myMethod()
.value();
console.log(b);
// [ 1, 2, 4, 8, 16 ]
```

## 3 - Conclusion

That is it for now at least when it comes to the lodash thru method until I come around to do a little more editing on this post at some point in the future. That might be a while though as I can not say writing new lodash content is a high priority for me at this time, but I do still get around to doing so never the less.

If you still enjoyed reading this post I do have many other [posts on lodash](/categories/lodash/) that I have wrote over the years. However more often that one when I am working on a project I typically find myself just working with native javaScript by itself actually. Part of my process of editing is to take a moment to think in terms of how to go about doing the same thing a lodash method does in vanilla javaScript. So with that begin said maybe a better choice for additional reading would be to check out one of my many simple [javaScript project examples](/2021/04/02/js-javascript-example/), or one of my [canvas example series posts](/2020/03/23/canvas-example/).

