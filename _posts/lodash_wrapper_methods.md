---
title: lodash wrapper methods
date: 2019-11-01 17:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 554
updated: 2019-11-01 18:04:01
version: 1.4
---

A [wrapper method](https://stackoverflow.com/questions/326596/how-do-i-wrap-a-function-in-javascript) generally might refer to a simple kind of method that just gives and alternative interface for using a method that is all ready in place. In other words a wrapper method does not really have any functionality of its own, it just accepts input and then uses that input for another method that actually does something. In [lodash](https://lodash.com/) there are a few wrapper methods, that are methods that just make use of native vanilla javaScript methods. It would be different if these methods feature tested for a native method and use that if available, and then used another javaScript solution if that native method is not there. However in late versions of lodash a few methods are just straight up referencing native javaScript methods.

<!-- more -->

## 1 - A basic wrapper method example

Here is a basic example of a wrapper method, I am writing a method that just provides an alternative way of using an method that all ready exists.

```js
let pow = function (base, pow) {
    return Math.pow(base, pow);
};
 
console.log(  pow(2,4) ); // 16
```

In many respects this might appear to be silly and pointless, but there is a methods to the madness in some cases. If I where to expand this single method into a lengthly framework of hundreds of methods, it might still make sense to do something like this even if it is just for the sake of consistency. 

Other subject that might come up is browser support of native javaScript methods, Math.pow is an example of a native javaScript method that goes back a ways when it comes to browser support, but that might nit always be the case with many other methods.