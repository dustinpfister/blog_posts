---
title: javaScript getters, setters, and reactive objects
date: 2020-10-07 15:05:00
tags: [js]
layout: post
categories: js
id: 718
updated: 2020-10-07 16:49:13
version: 1.7
---

In vuejs it is possible to create reactive objects, by default this is the case with the data object of a vuejs instance. However it might be a good idea to dive deep down into how this works, and the key behind it is the Object.definePropery method and the use of javaScript getters and setters.

In ECMA-262 R5 spec javaScript forward getters and setters where introduced as a way to have control over how properties are actually rendered to a result each time the property is accessed, or set by way of some kind of assignment. One why of thinking about it is that they can be thought of as event handlers of sorts where each time a property of a object is accessed the getter function is called, and the value that is returned by the getter is what will be used for the value of that property. In addition setters can be used as a way to define some additional logic that will fire each time the value of a property is set with an assignment operator.

Son in this post I will be writing a bot about javaScript getters, but I suppose I will also have to touch base on setters and other related topics like the [Object.definePropery](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) method.

<!-- more -->

## 1 - JavaScript getters

In this section I will be starting out with just a few basic examples of javaScript getters. There are two ways of defining a javaScript getter that I am aware of. One way is to make use of the get syntax, an the other is to do so by using the Object define property method.

### 1.1 - Basic javaScript getter example

One way to define a JavaScript getter is to use the [get syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) when making a new object.

```js
var obj = {
    mess: 'foo',
    get foo() {
        return '(' + this.mess + ')';
    }
};
 
console.log(obj.foo);
// '(foo)'
```

### 1.2 - The define property method

The other way to go about creating a javaScript getter is to make use of the define property Object static method. The way one goes about using this method is by calling it, and then passing an object to which a property is to be defined. The next argument is a property key for the given object followed by another object that can be used to set a number of properties for the property that is to be defined. One of the possible things to define for the property is of course a getter.

```js
var obj = {
    mess: 'foobar'
};
 
Object.defineProperty(obj, 'foo', {
    get: function () {
        return this.mess;
    }
});
 
console.log(obj.foo);
// 'foobar'

```

## 2 - creating a reactive object With getters and setters

So by using javaScript getters in combination with javaScript setters it is possible to create reactive objects. These are objects where a method will fire each time a property chances by way of any kind of assignment each time. This method that will fire each time the property is set can be used to do things like render a view for the object or something to that effect.

```js

var createReactive = function (obj, onSet) {
    obj = obj || {};
    onSet = onSet || function () {};
    var newObj = {};
    Object.defineProperty(newObj, 'locals', {
        enumerable: false,
        value: {}
    });
    Object.keys(obj).forEach(function (key) {
        Object.defineProperty(newObj, key, {
            enumerable: true,
            get: function () {
                return this.locals[key];
            },
            set: function (newValue) {
                this.locals[key] = newValue;
                onSet(newObj);
            }
        });
        newObj[key] = obj[key];
    });
    return newObj;
};
var render = function (obj) {
    console.log(obj);
};
var a = createReactive({
        n: 42
    }, render);
console.log(a.n);
```

So this kind of trick is often used in many frameworks as a way to keep developers from having to update a model, and then do the same for a view thus having to update to things each time. Such a thing can often get messy, and confusing, so things like reactive objects can help to make it so I just have to update the model object, and by doing so that will trigger updating the view each time.

## 3 - Conclusion

So javaScript getters and setters can come into play in some situations in which they might be called for. However that is just it when they are called for, getters and setters should not be over used at every twist and turn. I have to admit that it tends to make code more complex, and if the use of them is not really justified then the use of getters and setters is juts making something more complicated then it needs to be.