---
title: The lodash _.debounce method for delay of function invoking.
date: 2017-12-03 20:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 104
updated: 2020-06-07 16:38:53
version: 1.5
---

The [\_.debounce](https://lodash.com/docs/4.17.4#debounce) method in [lodash](https://lodash.com/) is great for delaying the invocation of a method for a certain about of time. In addition it can be canceled, or flushed at once when called which is another feature about it that might be absent in many alternatives to lodash denounce that might come to mind.

<!-- more -->

## 1 - Basic example of \_.debounce

I just need to call it and pass the function that I want debounced, and a time in milliseconds. Once that is done a debounced function will then be returned, once called the function will be invoked once the given about of time passes.

```js
var bounced = _.debounce(function(){
 
    console.log('debounced');
 
}, 30000);
 
bounced(); // logs 'debounced' after 30 seconds
```

## 2 - flushing

A \_.debounce method comes with a flush method that can be used to call the method at once right alway. This flush method can be called off from and object that is returned when calling lodash denounce.

```js
var check = _.debounce(function(){

    console.log('checking something...');

    check();

},60000);

check();
check.flush(); // check now
```

## 3 - Conclusion

The \_.debounce method in lodash can be useful when making some methods that need to do something every once in a while, but also need to be check right away. The first and foremost thing that comes to mind is some kind of message system.