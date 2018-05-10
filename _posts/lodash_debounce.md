---
title: The lodash _.debounce method for delay of function invoking.
date: 2017-12-03 20:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 104
updated: 2017-12-03 20:16:20
version: 1.2
---

The [\_.debounce](https://lodash.com/docs/4.17.4#debounce) method in [lodash](https://lodash.com/) is great for delaying the invocation of a method for a certain about of time. In addition it can be canceled, or flushed at once when called.

<!-- more -->

## Basic example of \_.debounce

I just need to call it and pass the function that I want debounced, and a time in milliseconds. Once that is done a debounced function will then be returned, once called the function will be invoked once the given about of time passes.

```js
var bounced = _.debounce(function(){
 
    console.log('debounced');
 
}, 30000);
 
bounced(); // logs 'debounced' after 30 seconds
```

## flushing

A \_.debounced method comes with a flush method that can be used to call the method at once.

```js
var check = _.debounce(function(){

    console.log('checking something...');

    check();

},60000);

check();
check.flush(); // check now
```

## conclusion

The \_.debounce method in lodash can be useful when making some methods that need to do someting every once in a while, but also need to be check right away. The first and formost thing that comes to mind is some kind of message system.