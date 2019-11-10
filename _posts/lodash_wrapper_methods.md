---
title: lodash wrapper methods
date: 2019-11-01 17:32:00
tags: [js,lodash]
layout: post
categories: lodash
id: 554
updated: 2019-11-10 18:31:33
version: 1.6
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

## 2 - What is going on with lodash and wrapping of native javaScript methods

When I looked over a [late version of lodash \(4.17.15\)](https://raw.githubusercontent.com/lodash/lodash/4.17.15-npm/core.js) I have come across the use of and internal baseEach method that looks like this.

```js
// Add `Array` methods to `lodash.prototype`.
baseEach(
    ['pop', 'join', 'replace', 'reverse', 'split', 'push', 'shift', 'sort', 'splice', 'unshift'],
    function (methodName) {
    var func = (/^(?:replace|split)$/.test(methodName) ? String.prototype : arrayProto)[methodName],
    chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
    retUnwrapped = /^(?:pop|join|replace|shift)$/.test(methodName);

    lodash.prototype[methodName] = function () {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
            var value = this.value();
            return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function (value) {
            return func.apply(isArray(value) ? value : [], args);
        });
    };
});
```

What is going on here is a bunch of native array and string methods are just being flat out right referenced from the lodash prototype. in other worlds lodash is not providing any actually functionality with some of these methods it is just wrapping native ones.

## 3 - Conclusion

In lodash a few methods are just references to native javaScript methods, however of course it goes without saying that this is not always the case. In some cases depending on the version of lodash some lodash methods are also pollyfills of sorts that will only reference the native method if there is one, else it will use some custom code. There are also a number of methods where there is no native equivalent at all.