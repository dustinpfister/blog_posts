---
title: The lodash keys method and native javaScript
date: 2019-05-14 14:08:00
tags: [lodash]
layout: post
categories: lodash
id: 446
updated: 2020-07-04 08:18:33
version: 1.12
---

The [lodash keys](https://lodash.com/docs/4.17.11#keys) method in lodash can be used to get an array of public key names of an object. There is also the native [Object.keys method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) as well that has been introduced in recent years. In addition a [for in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in) loop is another option for getting object keys that has great backward compatibility with older environments, so this makes the lodash \_.keys method one of many methods in lodash that make me scratch my head wondering if I should bother or not.

<!-- more -->

## 1 - lodash keys and Object.keys example

The lodash keys method works by just simply passing an object as the first argument, and an array of public key names is returned by the method. The native [Object.keys](/2018/12/15/js-object-keys/) method works in the same manner as well but it might not always be there when it comes to older browsers.

```js
let obj = {
    foo: 'bar',
    n: 42
};
 
// lodash _.keys can be used to get the keys
// for each key of an object
console.log(_.keys(obj) ); // ['foo', n]
 
// there is also the native Object.keys
// that does the same thing
console.log( Object.keys(obj) ); // ['foo', n]
 
// There is the lodash _.values, and Native Object.values
// that can be used to get object value of the keys as well
console.log(_.values(obj)); // [ 'bar', 42 ]
console.log(Object.values(obj)); // [ 'bar', 42 ]
```

So because there is a native method for getting public key names of an Object, what bother with lodash? Well first off this is just one method, and there are many lodash methods where there is no native counter part at all. Also there are many lodash methods where the lodash method works a little differently, or brings a little something more to the table.

The lodash keys method might not be the best example of the worth of lodash these days, but there is something to say about browser support with the Object.keys method. The native Object.keys method is still fairly new in light of the history of web development, and it is also true that the method is not supported at all when it comes to Internet Explorer. So it still makes sense to use the lodash keys method as a way to bring better browser support. If you do not want to use lodash, it is still wise to use a polyfill for this one.

## 2 - A for in loop as a lodash keys replacement, and Object.keys pollyfill

It is not to hard to write a keys method using a for in loop. If backward compatibility is of concern using for in might be the best option, however if performance is a concern you might wish to work something else out. Still both a stand alone keys method can be added super easy, and it can also be used as a polyfill in the event that Object.keys is not there.

```js
let obj = {
    foo: 'bar',
    n: 42
};
 
// stand alone method
var keys = function (obj) {
    var keyNames = [],
    keyName;
    for (keyName in obj) {
        keyNames.push(keyName);
    }
    return keyNames;
};
 
console.log( keys(obj) ); // ['foo', 'n']
 
// polyfill
Object.keys = Object.keys || function (obj) {
    var keyNames = [],
    keyName;
    for (keyName in obj) {
        keyNames.push(keyName);
    }
    return keyNames;
};
 
console.log( Object.keys(obj) ); // ['foo', 'n']
```

There is also a [\_.forIn](/2018/09/30/lodash_forin/) lodash method that can also be used to create an array of public or own property names of an Object as well.

## 3 - Conclusion

There is also the lodash [\_.values](/2019/05/13/lodash_values/) method that is similar to the \_.keys method only it gives an array of object values rather than the key names. These two methods are often used to quickly get an array of object values or Object key values that can then be used with an array prototype method when working with native ajavaScript methods in the Array prototype and getting them to work with objects that are not arrays.

Speaking of native javaScript there are now of course native methods in jaavScriot that do the same thing as the lodash methods. The only questing is how far back do you want to go with browser support. Looking at the stats for my website when it comes to browser vender's and versions and comparing that to the specs that these methods where introduces I can not say there is much of a concern these days. Also even it I want to support older browser it is often not just a question of just using lodash and being done with it, the version of lodash is something to consider also when it comes to this.