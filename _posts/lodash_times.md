---
title: The lodash _.times method as an alternative to loops, forEach.
date: 2017-10-11 16:35:00
tags: [js,lodash]
layout: post
categories: lodash
id: 59
updated: 2018-10-25 11:04:44
version: 1.5
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
_.times(4, ()=> {
    console.log('foo'); // 'foo' (4x)
});
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

#### 2.1.2 - Array.from

```js
Array.from({length:4},(_,i)=> console.log('foo'));
```

## Use return to build a results array

So there is a bit more that can be done compared to just a simple while loop, such as building a results array by using return in the body of the function passed to \_.times.

```js
 // four random dice rolls
 var rolls = _.times(4,function(){
 
     return Math.floor(Math.random() * 6) + 1;
 
 });
 
 console.log(rolls); // array of random numbers (1 - 6)
```

## The index value is passed to the function passed.

Often I will want to do something with the current index value, that passed to the function given as the first argument.

```js
 results = _.times(4,function(i){
 
     return i;
 
 });
 
 console.log(results); // [0,1,2,3]
```

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