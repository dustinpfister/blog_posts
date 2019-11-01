---
title: lodash wrapper methods
date: 2019-11-01 17:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 554
updated: 2019-11-01 17:51:19
version: 1.2
---

A wrapper method generally might refer to a simple kind of method that just gives and alternative interface for using a method that is all ready in place. In other words a wrapper method does not really have any functionality of its own, it just accepts input and then uses that input for another method that actually does something. In lodash there are a few wrapper methods, that are methods that just make use of native vanilla javaScript methods. It would be different if these methods feature tested for a native method and use that if available, and then used another javaScript solution if that native method is not there. However in late versions of lodash a few methods are just straight up referencing native javaScript methods.

<!-- more -->

## 1 - A wrapper method example

Here is a basic example of a wrapper method, I am writing a method that just provides an alternative way of using an method that all ready exists.

```js
let pow = function (base, pow) {
    return Math.pow(base, pow);
};
 
console.log(  pow(2,4) ); // 16
```

In many respects this might appear to be silly and pointless, but there is a methods to the madness in some cases. If I where to expand this single method into a lengthly framework of hundreds of methods, it might still make sense to do something like this even if it is just for the sake of consistency.