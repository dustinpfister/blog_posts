---
title: The lodash _.clone method For shallow copying of objects.
date: 2017-10-02 09:09:00
tags: [js,lodash]
layout: post
categories: lodash
id: 51
updated: 2020-09-16 14:58:03
version: 1.16
---

When dealing with objects in javaScript often I just need to create them, and reference them, but some times I may want to copy one. The process of cloning an object can some times be a bit complicated, there are shallow clones, deep clones, and many other concerns surrounding objects when making copies of them such as the prototype chain and circular references. 

In native javaScript there is the [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) method, but browest support for Object.assign only goes back so far, and it is only helpful for making shallow clones of objects. Also Object.assign will not work out so great in some cases when it comes to deep cloning of objects. 

So there are many options in [lodash](https://lodash.com/) when it comes to copying objects as such the lodash [\_.clone](https://lodash.com/docs/4.17.4#clone) method which might be a good starting point at least when it comes to getting started with researching what the options are when it comes to using lodash as part of a project. The draw back with the lodash clone method is that it can only be used to make shallow clones, but sometimes just a shallow clone will work just fine, and it is nice to have a quick method at the ready to make a shallow clone and move on to more important things with a project.

So in this post I will be taking a quick look at the lodash clone method, as well as some other options for making shallow clones using lodash.

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

## 2 - Cloning objects is copying an object by value rather than reference.

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

## 3 - lodash clone and deep cloning of nested objects

So the plain old lodash clone method will work okay with shallow copy clones, but what if I want to copy an object with nested objects in it? The lodash clone method will just reference those objects, as only the primitive values at the first level of the object are copied. I do have a new separate object, but only just that a single new object, all nested objects are still just referenced as before.

```js
// here I have an object with a nested object in it
let obj = {
    point: {
        x: 54,
        y: 127
    },
    mess: 'foobar',
    n: 42
};
 
// using clone to clone the object
let a = _.clone(obj);
 
// changing a value of the nested object
a.point.x = 0;
a.point.y = 0;
 
// This effects the cloned object
// as well as the original because the
// nested object is still referenced rather than
// copied
console.log(obj.point.x, obj.point.y); // 0 0
console.log(a.point.x, a.point.y); // 0 0
```

So to fix this I must do something to deep clone the object. In lodash there are a number of methods that can be used to do this, but the first that comes to mind would be the lodash clone deep method.

### 3.1 - Using lodash cloneDeep

So the above example where the lodash clone did not work as I wanted the [lodash clone deep](/2017/11/13/lodash_clonedeep/) method can clone all objects concerned including the nested one.

```js
// here I have an object with a nested object in it
let obj = {
    point: {
        x: 54,
        y: 127
    },
    mess: 'foobar',
    n: 42
};
 
// using cloneDeep to clone the object
let a = _.cloneDeep(obj);
 
// changing a value of the nested object
a.point.x = 0;
a.point.y = 0;
 
// This effects the cloned object
// as well as the original because the
// nested object is still referenced rather than
// copied
console.log(obj.point.x, obj.point.y); // 54 127
console.log(a.point.x, a.point.y); // 0 0
```

## 4 - Conclusion

Like a lot of methods in lodash, this functionality is now native in modern browsers, as a similar effect can be done with the use of [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) if just making a shallow cone of an object is what I want to do at least. Object Assign works okay as long as I do not care about supporting older browsers and versions of node that are not ecma2015+ compliant. 

I wrote a post on [copying arrays](/2020/09/03/js-array-copy/) in which I touch base on some topics that have to do with both shallow cloning, and deep cloning of arrays. Many other the methods that I write about there could also be applied to objects in general, so maybe that is worth checking out if you want to read up some more on copying objects in javaScript.

However because I do care at least to some extent about backward compatibility, and do not want to invest a great deal of time making platform specific client systems, just suing lodash will help march things back a bit more depending on the version of lodash used. This is maybe the main reason why projects like lodash, and jQuery, are not dead just yet but there is more to it then just that.