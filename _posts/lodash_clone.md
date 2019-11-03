---
title: The lodash _.clone method For shallow copying of objects.
date: 2017-10-02 09:09:00
tags: [js,lodash]
layout: post
categories: lodash
id: 51
updated: 2019-11-03 10:54:33
version: 1.9
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

However in some cases this might present a problem, I want to copy an object. Doing so is not always so easy, because objects can contain references to other objects as property values that would also have to be cloned for example. However one way to go about doing so is with the lodash \_.clone method when it comes to making what is often called a shallow clone with simple objects that do not have nested objects, or its okay if those are left as references when making the new object.

## 2 - Cloning objects is copying an object my value.

If I want to work with a copy of an object, rather than simply making a reference to it, I will want to use some kind of cloning method. The lodash \_.clone method is one such method that will work okay when it comes to making shallow clones of simple object such as the one in this example.

```js
// I created an object
var obj = {
    foo: 'bar',
    n: 42
},
 
// cloning will copy the object
a = _.clone(obj);
 
// a change to the copy will effect only the copy
a.foo = 'foobar';
console.log(a.foo); // 'foobar'
console.log(obj.foo); // 'bar'
 
// the older object will retain the same values
// and the new object will still share values that
// have not changed
console.log(obj.n); // 42
console.log(obj.foo); // 'bar'
console.log(a.n); //42
console.log(a.foo); // 'foobar'
```

So now I have an actual copy of an object, but it is a simple object that does not have any references to other objects. There is also nothing going on with the prototype chain outside of just having the object prototype methods, and There are no circular references as well. Still If I just want to copy the first level of primitives values, this will work just fine if lodash is part of the applications stack of library's that are there at the ready.

## 3 - Conclusion

Like a lot of methods in lodash, this functionality is now native in modern browsers. As is the case with Object.assign. However because I do care at least to some extent about backward compatibility, and do not want to invest a great deal of time making platform specific client systems, just suing lodash will help march things back a bit more. This is maybe the main reason why projects like lodash, and jQuery, are not dead just yet.