---
title: The _.create method in lodash, and native Object.create
date: 2018-09-27 18:41:00
tags: [js,lodash]
layout: post
categories: lodash
id: 290
updated: 2020-06-30 10:53:52
version: 1.9
---

So in javaScript the [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) method or [\_.create](https://lodash.com/docs/4.17.10#create) in [lodash](https://lodash.com/) might come up now and then in many code examples. This is a method that can be used to create a new object with a given object that will function as the new objects prototype object. If you are still new to javaScript the prototype is something that you should become familial with at some point sooner or later, as it is a major part of javaScript development. In this post I will be giving some use case examples, and hopefully give at least a basic idea of what the create object method is all about.

<!-- more -->

## 1 - What to know about \_.create

This is a post on the lodash method \_.create, and it's native counter part [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) that works almost same way. This makes the \_.create method in lodash one of many methods that make javaScript developers scratch there heads wondering why they are still bothering with lodash. 

Of course not all methods in lodash are baked into core javaScipt itself, and some that are do sometimes bring a bit more to the table, but \_.create is not the best example of this. So because I do not feel like writing one post for \_.create, and another for Object.create I will be sort of blending things together here, and just be writing mostly about the nature of the method itself, regardless if it is native or not.

## 2 - A Basic example of \_.create

So for starters if I have an object that contains methods and I want to use those methods with an object there are a number of ways to go about doing that. If the methods are designed in a way in which they could be part of an objects prototype I can use something like Function.call, or another way would be to use \_.create to make it so the object of methods is the prototype object of the object that I want to use with the methods.

```js
var methods = {
 
    move: function (x, y) {
 
        this.x += x;
        this.y += y;
 
    }
 
};
 
var obj = _.create(methods, {x: 5,y: 15});
 
obj.move(5, 5);
 
console.log(obj.x, obj.y); // 10 20
```

Doing this differs from just making the method part of the object to begin with. For one thing if I where to make a whole bunch of objects with object.create, they will end up taking up less memory because they would all share the same set of methods. This also differs from making just a reference to the methods object as well because doing so would be defining a method as one of the actual own properties of the object rather than it's prototype. As prototype methods can act as a default of sorts if the method is not define in the own properties of the object.

### 2.1 - Using the native Object.create 

The javaScript native Object.create will not work the same way as \_.create, as I can not just pass any object as a second argument to set some own properties of the object. it must be an object where each property is an object, and the value property of that object is what will set the value of the own property of the object that will be made with Object.create. That might be a little confusing but the native method can be used to set all kinds of advanced values for each property this way. In fact by default the properties will not be writable, and must be set true in these objects.

```js
let obj = Object.create(methods, {x: {value:5,writable: true},y: {value:15,writable: true}});
 
obj.move(5, 5);
 
console.log(obj.x, obj.y); // 10 20
```

## 3 - Conclusion

In order to give the \_.create method justice I will also need to get into the concept of the prototype object in detail. However that is a matter for another post, in a whole other category, for now hopefully this post will help shed some like on the subject of the lodash create method, and its native counterpart.

There is much more of course when it comes to knowing how to create objects from other objects that are collections with both lodash, and just plain on vanilla javaScript though. The lodash create method is just for creating an object with a given prorotype object, and additional objects for its starting properties.