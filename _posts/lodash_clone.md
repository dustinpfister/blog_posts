---
title: The lodash _.clone method For shallow copying of objects.
date: 2017-10-02 09:09:00
tags: [js,lodash]
layout: post
categories: lodash
id: 51
updated: 2019-11-03 10:35:47
version: 1.6
---

When dealing with objects in javaScript often I just need to create them, and reference them, but some times I may want to copy one. The process of cloning an object can some times be a bit complicated, there are shallow clones, deep clones, and many other concerns surrounding object such as the prototype chain and circular references. In native javaScript there is the [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method, but there is poor browser support. Also Object.assign will not work out so great in some cases when it comes to deep cloning of objects. So there are many options in lodash when it comes to copying objects as such the lodash [\_.clone](https://lodash.com/docs/4.17.4#clone) method might be a good starting point at least. It is a useful method that is useful in [lodash](https://lodash.com/) to help allow for better browser support with cloning.

<!-- more -->

## 1 - The deal with referencing, and copying.

If you do not yet know about the deal with copying and referencing in javaScript I will quickly give the low down on it here. When you are dealing with primitives copying is done by value, not reference, so then when you do something like this:

```js
var n = 42,
copy = n;
 
copy += 8;
 
console.log(n); // 42
console.log(copy); // 50
```

Things work as expected if the goal is copying by value, rather than referencing that value which is the case with objects. So if I for example create an object, assign that object to a variable, and then assign that variable to another variable I am not copying the object I am creating another reference to the same object.

```js
// I created an object
var obj = {foo:'bar'},
 
// I am referencing the object
n = obj;
 
// a change to ref affects obj
// because it is a reference, not a copy.
n.foo = 42;
console.log(obj.foo); // 42
```

In some cases this might be what is desired actually, if I am working with DOM elements in client side javaScript I do not typically want to create a new element, but rather reference an existing one. In a nodejs environment I might create an object that contains a public api for a module, I would like a reference to that api locally within the module, as well as set it is an object that is exported, so no problem there as well.

However in some cases this might present a problem, I want to copy, or clone an object.

## 2 - Cloning objects is copying an object my value.

If I want to work with a copy of an object, rather than simply making a reference to it, I will want to use some kind of cloning method. \_.clone is one such method.

```js
// I created an object
var obj = {foo:'bar'},
 
// I am referencing the object
n = obj;
 
// a change to ref affects obj
// because it is a reference, not a copy.
n.foo = 42;
console.log(obj.foo); // 42
 
// cloning will copy
n = _.clone(obj);
 
// a change to the copy will effect only the copy
n.foo = 'foobar';
console.log(n.foo); // 'foobar'
console.log(obj.foo); // 42
```

## 3 - Conclusion

Like a lot of methods in lodash, this functionality is now native in modern browsers. As is the case with Object.assign. However because I do care at least to some extent about backward compatibility, and do not want to invest a great deal of time making platform specific client systems, just suing lodash will help march things back a bit more. This is maybe the main reason why projects like lodash, and jQuery, are not dead just yet.