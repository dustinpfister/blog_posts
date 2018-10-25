---
title: The lodash _.times method as an alternative to loops, forEach.
date: 2017-10-11 16:35:00
tags: [js,lodash]
layout: post
categories: lodash
id: 59
updated: 2018-10-25 11:37:15
version: 1.9
---

How often do I need to use a while loop, or Array.forEach in a project? All the time of course. I could write a post about what way of looping is the fastest, or what way is the most concise. This is yet another one of my lodash posts, so I will be writing about [\_.times](https://lodash.com/docs/4.17.4#times) in [lodash](https://lodash.com/) naturally, but I will also touch base on some vanilla js alternatives as well.

<!-- more -->

## 1 - What to know

This is a lodash post on the \_.times method that can be used to call a given method a number of times, as well as plain old vanilla js alternatives that bring forth a similar effect. The lodash \_.times method is a nice concise solution, but if you care about speed the most first and for most it might be best to stick with native looping.

## 2 - Some Basic \_.times examples

In this section I will be covering some basic examples of \_.times along with some quick vanilla js alternatives. Keep in mid that more concise solutions are not always better solutions all around. I have not taken the time to do synthetic testing with performance in this post, juts throwing together examples.

### 2.1 - Just call a method a number of times

So here is a quick brainless example of of \_.times where I am just calling a method four times. To do this I just call the method and pass the number of times that a function should be called followed by the function.

```js
_.times(4, ()=> console.log('foo')); // 'foo' (4x)
```
#### 2.1.1 - Just using a while looop

A while loop example that does the same would look like this.

```js
let log = (text) => {
    console.log(text);
};
let i = 0;
while (i < 4) {
    log('foo');
    i += 1;
}
```

Some times just using a good old while loop is just whats called for, no need for lodash, and if I just replace let with var, and use old function literals in place of arrow functions this will work on a wide range of browsers as well.

#### 2.1.2 - Array.from

The native array.from method can also be used to call a method a bunch of times as well.

```js
Array.from({length:4},(_,i)=> console.log('foo'));
```

So many solutions like this are a little longer, and maybe Array.from does not have the best browser support when it comes to supporting older non every green browsers. However if most of your site traffic is up to date with there software, using solutions like this can lead to no longer needing lodash as part of a stack.

### 2.2 - Use return to build a results array with \_.times, and alternatives

So there is a bit more that can be done compared to just a simple while loop, such as building a results array by using return in the body of the function passed to \_.times. The return keyword can be used in the body of a function to return a value for each element in an array that is returned when using \_.times. In this section I will be going over using \_.times to do this, as well as vanilla js alternatives for doing so as well.

#### 2.2.1 - Using \_.times to build an array

The times method can be used to build an array, in fact one is always returned when using it, its just by default the values for each element will be undefined if nothing is returned.

```js
// using a native method that returns something
let arr = _.times(4, (i) => Math.pow(2, i));
console.log(arr); //[1,2,4,8]
 
// using return keyword
let rnd = _.times(4, (i) => {
    return 10 + i * 10;
});
console.log(rnd); // [ 10, 20, 30, 40 ]
```

This can be useful for a lot of situations, but it is also unnecessary if it is a situation in which I just need to call a method a few times, and the method is not used to build elements in an array.

## vanilla js example

here is a vanilla js example I put together in a flash. Not only does it have the same features, I thought it would be great to also pass the times count to the function. In addition I used call to define a bunch of stuff that comes to mind to the this keyword.

```js
var times = function(len, func){
 
    var i = 0,
    per,
    results = [];
 
    len = len || 0;
    func = func || function(){};
 
    while(i < len){
 
        per = i / len;
        results.push( func.call({
 
            i:i,
            len : len,
            per : per,
            bias : 1 - Math.abs(.5 - per) / .5,
            results : results
 
        },i,per) );
 
        i += 1;
 
    }

   return results;
 
};
 
var foos = times(10, function(i,len){
 
    return 'foo ' + i + '/' + len;
 
});
 
console.log(foos); // foo x/10
```

## Conclusion

I am on a roll with my [lodash posts](/categories/lodash/), it's still a useful utility these days.