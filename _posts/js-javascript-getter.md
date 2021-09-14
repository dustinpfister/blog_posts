---
title:  Getters, Setters, and reactive objects in javaScript
date: 2020-10-07 15:05:00
tags: [js]
layout: post
categories: js
id: 718
updated: 2021-09-14 13:04:55
version: 1.41
---

In [vuejs](/2019/05/05/vuejs-getting-started/) it is possible to create [reactive objects](https://vuejs.org/v2/guide/reactivity.html), by default this is the case with the [data object of a vuejs instance](/2019/05/18/vuejs-data/). When I make a change to a property of the data object that will trigger an update to the view that uses that data object. So then there is this binding between state and view where a change to the state object of a system will automatically update a view that renders that state.

However this is not so much a post on vuejs but core javaScript itself, with that said it might be a good idea to dive deep down into how reactive objects work when making a framework like that of vuejs. The key javaScript feature behind reactive objects in vuejs is the [Object.definePropery](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) method and the use of javaScript [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set).

In ECMA-262 R5 spec javaScript forward getters and setters where introduced as a way to have control over how properties are actually rendered to a result each time the property is accessed, or set by way of some kind of assignment. Each time a property is set with the assignment operator in the form of an equals sign, a setter function can be defined for the object. This setter function will be called and it is the return value of this setter that will end up being the final value assigned to the object. In the body of this setter function other things can be done, such as triggering the update of a view. On top of setters there are also getters, which are more or less the same thing as setters only they will fire each time a property is accessed.

One way of thinking about getters and setters is that they can be thought of as event handlers of sorts where each time a property of a object is accessed the getter function is called, and the value that is returned by the getter is what will be used for the value of that property.

So in this post I will be writing a bit about javaScript getters, but I suppose I will also have to touch base on setters, and other related topics like the Object.definePropery method.

<!-- more -->

## 1 - What to know first, and the basics of JavaScript getters

The subject of getters and setters might be though of as an advanced topic on javaScript like that of [closures](/2019/02/22/js-javascript-closure/) and the [function call prototype method](/2017/09/21/js-call-apply-and-bind/). So if you are still fairly new to javaScript it might still be a good idea to get more solid with the very basics when it comes to [getting started with javaScript](/2018/11/27/js-getting-started/).

When it comes to the basics of getters and setters I will be starting out with just a few basic examples of them in this section of course. There are two ways of defining a javaScript getter that I am aware of, one way is to make use of the get syntax, an the other is to do so by using the Object define property method.

### 1.1 - The source code examples here are on github

The source code examples here as well as with all my other vanilla javaScript examples are in my [test vjs repository on github](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-getter). If for some reason you want to make a pull request for one of the source code examples here that would be where to make it. Also there is the comment section in this blog post where you can bring something up that might have to do with getters and setters on javaScript or some closely related topic to the use of them.

### 1.2 - Basic javaScript getter example

One way to define a JavaScript getter is to use the get syntax when making a new object. This is one way to go about defining a getter for an object that does not involve having to use the define property method. To use it I just need to type the word get inside the object literal followed by the function that will be called for each get of an object property.

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

Although this way of defining a getter might work okay I have come to prefer using the define property method of doing so. One reason why is that I can stick to a syntax that is more in line with now I am familiar with defining objects properties. However the real reason why is because there are additional features of the define property method that allow for me to make properties of an object that are private.

### 1.3 - The define property method

The other way to go about creating a javaScript getter is to make use of the define property Object static method. The way one goes about using this method is by calling it, and then passing an object to which a property is to be defined. The next argument is a property key for the given object followed by another object that can be used to set a number of features for the property that is to be defined. One of the possible things to define for the property is of course a getter. However this can also be used to define setters, as well as many other features for the property such as if the property will show up in a loop or not.

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

## 2 - Creating a reactive object With getters and setters

So by using javaScript getters in combination with javaScript setters it is possible to [create reactive objects](https://www.monterail.com/blog/2016/how-to-build-a-reactive-engine-in-javascript-part-1-observable-objects). These are objects where a method will fire each time a property chances by way of any kind of assignment each time, or doing something interesting each time an object property is accessed. This method that will fire each time the property is set can be used to do things like render a view for the object or something to that effect. In this section then I will be going over a few examples of making this kind of object using just vanilla javaScript code.

### 2.1 - Basic make a object property reactive example

There is starting out by making a simple method that will just make one property of an object reactive. This is more or less the starting point of making this kind of system as getters and setters need to be set up on a per property basis. So here I have an example of such a method that will take an object as the first argument, followed by a key that I want to make reactive, and then a draw function that will fire each time the value of the property changes. For a default draw method I am just using the console.log method.

```js
// a make reactive property of an object
var makePropertyReactive = function (obj, key, draw) {
    draw = draw || console.log;
    var val = obj[key];
    Object.defineProperty(obj, key, {
        get: function () {
            return val; // Simply return the cached value
        },
        set: function (newVal) {
            val = newVal;
            draw(obj, key, val); // log
        }
    });
    return obj;
};
 
var data = {
    count: 0
};
makePropertyReactive(data, 'count');
 
data.count += 1;
```

I am then testing this out by creating a simple data object that just has a count property with a value set to zero. I then pass this object to the make property reactive helper, and set that it is the count property that I want to make reactive. When I go to change the value of the count property the result is that the console log method fires with the passed values for the object, as well as the key name in this case count, and the new value for the count key.

### 2.2 - Make a full object reactive example

Now that I have a decent helper method for making a property reactive the process of making a full object reactive would just involve calling that helper for each key that I want to make reactive. One way to go about doing so for every public key of an object would be to use the [Object.keys static method](/2018/12/15/js-object-keys/). There are many other options though such as a for in loop, or the Object.getOwnPropertyNames method that would come in handy of there are some private object keys that I would want to make reactive for some reason. However for this example I will just be using the object keys method and moving on with this one for now.

```js
// draw
var draw = function (obj, key, val) {
    console.log(key, val);
};
// a make reactive property of an object
var makePropertyReactive = function (obj, key, draw) {
    draw = draw || console.log;
    var val = obj[key];
    Object.defineProperty(obj, key, {
        get: function () {
            return val; // Simply return the cached value
        },
        set: function (newVal) {
            val = newVal;
            draw(obj, key, val); // log
        }
    });
    return obj;
};
// make a full object reactive
var makeObjectReative = function (obj, draw) {
    Object.keys(obj).forEach(function (key) {
        makePropertyReactive(obj, key, draw);
    });
    return obj;
};
 
var data = {
    count: 0,
    name: 'Dustin'
};
makeObjectReative(data, draw);
 
data.count += 1;
data.name = 'Stin'
```

For this example I now only made a full object reactive I also now have a custom draw method. This custom draw method again just sued the console log method as a crude yet effective view, but never the less this is where I can do whatever needs to be done each time the data object changes. In an example that will start to resemble a full reactive framework of some kind this draw method could mutate the DOM of a page for example if it is a client side javaScript project.

### 2.3 - Reactive object example using defineProperty

For this example I will be starting out with something that is not yet that advanced when it comes to making some kind of view and model binding type system. In this example I am using the define property object static method to create a hidden locals property for the object. This locals property will contain an object which is where I will actually store values that are set to the object using the assignment operator.

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

So [javaScript getters and setters](https://www.jackfranklin.co.uk/blog/es5-getters-setters/) can come into play in some situations in which they might be called for. However that is just it when they are called for, getters and setters should not be over used at every twist and turn. I have to admit that it tends to make code more complex, and if the use of them is not really justified then the use of getters and setters is just making something more complicated then it needs to be.

There is more to write about when it comes to the define property Object static method. Yet another interesting feature that has been added to the Object in the from of a static method is the [Object.freeze method](/2020/05/08/js-javascript-object-freeze-seal-and-define-property/). However I tend to prefer using the define property method in place of it as that define property method has the ability to make it so a property of an object is not writable.

I do get around to editing my content now and then and with that said this is yet another post that I might want to put a little more time into at some point in the future. I can not say I have any plans to make my own relative object based framework of any kind in the near or distance future. WHen it comes to such frameworks I have to say that I really like to just use vuejs when it comes to that sort of thing. So with that said there is not much reason to bother, apart from making a very simple such module purely for the sake of this post.
