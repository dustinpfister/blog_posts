---
title: Tap off of a chain in lodash with the lodash tap method
date: 2022-01-07 12:15:00
tags: [lodash]
layout: post
categories: lodash
id: 949
updated: 2022-01-07 12:55:09
version: 1.8
---

When working with a [chain of methods](/2018/11/11/lodash_chain/) in [lodash](https://en.wikipedia.org/wiki/Lodash) there might end up being one or more instances in which I will want to just tap off of the chain at some point, mutate a collection, and then continue on with the chain of methods. The main method of interest with this would be the [lodash tap method](https://lodash.com/docs/4.17.15#tap) that can be called off of a chain at any moment to just do something that involves mutating the collection in place. This tap method works by using a value as the first argument and calling an interceptor function as the second argument, the return value of the tap method is then also the given value as well. 

There are some other lodash methods that are worth mentioning such as the [lodah flow method](/2018/11/19/lodash_flow/) that might be a better alternative to using the lodash chain method to begin with. Also there is maybe a few things to write about when it comes to doing similar things with javaScript by itself also.

<!-- more -->

## 1 - The lodash tap method

In this section I will be starting out with some basic examples of the lodash tap method.

### 1.1 - Using lodash tap with lodash chain 

So then one of the typical use case examples of the lodahs tap method might involve using in with the lodash chain method, and any and all additional methods that might end up being used in such a chain.

```js
let a = [1,2,3,4,5]
// using tap with lodash chain, and map
let b = _.chain(a)
.map((n)=>{
    return Math.pow(n, 2);
})
.tap((a)=>{
    a[3] = 0;
})
.value();
console.log(b);
//[ 1, 4, 9, 0, 25 ]
```

## 2 - Vanilla javaScript and tapping

Now that I got some lodash examples out of the way with the tap method, as well as various other methods related to the use of the lodash tap method, I now like to get into at least a few examples that involve just working with vanilla javaScript by itself.

### 2.1 - Basic example of chaining and just mutating after the chain is done

Maybe one way to go about doing what I wan to do with chaining is to just stop at one point with the chain, then do whatever I want with the result. After that continue with a new chain or not depending on the situation. I know that thins might no sit well with a certain line of reasoning that makes one think that they should be able to just continue with the chain as long as they want, but this way of handing things might not be such a bad idea some times actually.

```js
let a = [1, 2, 3, 4, 5]
 
// IIFE
let b = a.map((n) => {
        return Math.pow(n, 2);
    });
b[3] = 0;
 
console.log(b);
//[ 1, 4, 9, 0, 25 ]
```

### 2.2 - IIFE

There is working out something that involves using an IIFE as a way to group everything together as a single expression I guess. This kind of approve might work, but I have to say that more often than not it might just be making the situation more complex than it needs to be.

```js
let a = [1, 2, 3, 4, 5]
 
// IIFE
let b = (function () {
    return {
        tap: function (cb) {
            a.map((n) => {
                return Math.pow(n, 2);
            });
            cb(a);
            return a;
        }
    }
}()).tap(function (a) {
    a[3] = 0;
});

console.log(b);
//[ 1, 4, 9, 0, 25 ]
```

## 3 - Conclusion

The tap method is then one way to go about, well tapping off of a lodash chain to do something with the collection at a given point in a chain. There are a few drawbacks from this as it would seem that one is restricted to having to use methods that will mutate the collection in place as the return value of the interceptor function given to the lodash tap method would seem to have no effect on the chain. So then for this reason and many others one might want to look for another method to use in a chain such as the [lodash thru method](https://lodash.com/docs/4.17.15#thru), or maybe even just not use a chain to begin with actually. Another idea about this would be to just break things down into a whole bunch of fine grain steps actually where I call a helper function to create and return one result, and save that result to a variable, then use that said variable as an argument for another and so on.

