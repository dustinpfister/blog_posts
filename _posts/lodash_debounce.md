---
title: The lodash _.debounce method for delay of function invoking.
date: 2017-12-03 20:01:00
tags: [js,lodash]
layout: post
categories: lodash
id: 104
updated: 2021-12-07 10:16:49
version: 1.9
---

The [\_.debounce](https://lodash.com/docs/4.17.15#debounce) method in [lodash](https://lodash.com/) is great for delaying the invocation of a method for a certain amount of time. In addition it can be canceled, or flushed at once when called which is another feature about it that might be absent in many alternatives to lodash denounce that might come to mind such as the [setTimeout method](/2018/12/06/js-settimeout/). Still it is nice to stick to native methods and certin simple copy and past solutions in order to avoid having to depend on a library such as lodash. So in this post I will be going over a few quick examples of the lodash debounce method as well as looking into this subject in detail when it comes to javaScript in general.

<!-- more -->

## 1 - The Lodash debounce method and what to know first

This is a post centered around a single method in the [javaScript utility library known as lodash](/2019/02/15/lodash/) known as debounce, as well as any and all related topics that pop up while I go over a few examples of this method. I assume then that you know enough about [getting stared with javaScript](/2018/11/27/js-getting-started/) to make use of such a method in a [nodejs](/2017/04/05/nodejs-helloworld/) or [client side javaScript environment](/2020/09/21/js-getting-started-file-protocol/). If not you might want to take a step back and read up more on the basics of working with javaScript only, and how to even get started with a user space library such as lodash.

### 1.3 - Basic example of \_.debounce

For this basic debounce method example I just called it and pass the function that I want debounced, and a time in milliseconds as a second argument. Once that is done a debounced function will then be returned, once called the function will be invoked once the given about of time passes.

```js
var bounced = _.debounce(function(){
 
    console.log('debounced');
 
}, 30000);
 
bounced(); // logs 'debounced' after 30 seconds
```

### 1.2 - flushing

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

The \_.debounce method in lodash can be useful when making some methods that need to do something every once in a while, but also need to be check right away in some situations. So then the debouce method is very simular to that of native methods like setTimeout only with a few key differences such as the fact that the return value is a function rather than an id that can be used with clearTimeout, and that the delay will start when the returned function is called rater than right away.