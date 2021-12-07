---
title: The lodash _.debounce method for delay of function invoking.
date: 2017-12-03 20:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 104
updated: 2021-12-07 09:30:34
version: 1.6
---

The [\_.debounce](https://lodash.com/docs/4.17.4#debounce) method in [lodash](https://lodash.com/) is great for delaying the invocation of a method for a certain amount of time. In addition it can be canceled, or flushed at once when called which is another feature about it that might be absent in many alternatives to lodash denounce that might come to mind such as the [setTimeout method](/2018/12/06/js-settimeout/). Still it is nice to stick to native methods and certin simple copy and past solutions in order to avoid having to depend on a library such as lodash. So in this post I will be going over a few quick examples of the lodash debounce method as well as looking into this subject in detail when it comes to javaScript in general.

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