---
title: The lodash _.extend method for combining objects, and alternatives
date: 2018-10-01 11:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 294
updated: 2022-01-29 13:16:05
version: 1.15
---

When working with two or more objects there may come a need to combine them all together into a single object, and when doing so things can get a little confusing. There are what is often referred to as the objects own properties, then there are inherited properties, in addition there is also ways of making hidden properties by making use of the Object define property method. If that was not enough then there is also the nature of copying by reference rather than value with objects in javaScript, and also things like how to go about handing any and all recursive references, mainly the question of if they should refer to the new object, or should they be preserved as is.

In this post I will be writing about the [lodash](https://lodash.com/) object method known as [\_.extend](https://lodash.com/docs/4.17.10#extend), and how it compares to other methods in lodash that are used for combining objects together. Hopefully this post will help eliminate some confusion that you might have with combining objects in javaScript, or reinforce what you all ready know. If not in any case this is a somewhat complicated topic, but they only way to make process with it is to just start reading up on it, and also toy around with some examples at a first hand level.

<!-- more -->

## 1 - Basics of lodash extend and what to know first

This is a post on the \_.extend object method in lodash, and other related topics. In order to better understand \_.extend it is a good idea to have a deep understanding of how objects work in javaScript. In this section I will briefly cover some of these topics, but will not be going into them in detail. I also assume that you have at least some background with lodash, and javaScript in general.

### Referencing vs copying of objects

The \_.extend lodash method works by assigning the own properties, and prototype properties of one or more objects to an object. Assigning is another term for referencing, rather than copying, or cloning. So when \_.extend is used any change that might occur to nested objects in the objects that are being referenced, will also occur in the object that is extended. If this is a problem there are many other methods in lodash, such as \_.merge that will deep copy the given objects, rather than just simply referencing them. I will cover this is greater detail in a latter section in this post.

### Own vs inherited properties.

When a javaScript developer refers to an objects own properties, they typically refer to the properties of an object that are not inherited from the objects prototype object that contains properties that are shared across multiple instances of a class of object. So therefor an objects own properties are properties that set the object apart from others that are made from the same constructor method, or that share the same prototype object. The \_.extend method combines both the own properties, as well as anything that may be in the prototype object. In some cases this might be desired, however in other cases it is not, and a method like \_.assign would be a better choice.

### 1.1 - A Basic example that makes use of \_.extend

For a basic example of \_.extend I put together a quick example that involves an object that is made with \_.create that works in a very similar fashion to that of the native Object.create. The reason why this is important for a \_.extend example is that it will result in object that has a prototype object with some visible properties that will be combined when used with \_.extend which sets the method apart from other alternatives such as \_.assign, and \_.merge.

```js
// and object with own, and inherited properties
let a = _.create({
        proto_prop: 42
    }, 
    {
        own_prop: 37
    });
 
// another object, with just own properties
let b = {
    own_prop_two: true
};
 
// extend will assign own, and inherited properties
console.log( _.extend({},a,b) ); // { own_prop: 37, proto_prop: 42, own_prop_two: true }
```

So as you can see when I use \_.extend to combine objects a and b into a new empty object, all own and inherited properties are combined, and assigned to the empty object. In a nut shell thats all there is to write about, but there are some additional pit falls to cover, when it comes to dealing with nested objects for instance.

### 1.2 - Compared to \_.assign

\_.extend is very similar to [\_.assign](/2018/09/21/lodash_assign/), it works in almost the same way only it does not merge in prototype methods. In fact \_.extend is just an alias for \_.assignIn. So compared to \_.extend it will do the same thing, but without combining in prototype key name values.

```js
let a = _.create({ proto_prop: 42}, { own_prop: 37 });
let b = {
    own_prop_two: true
};
// extend will assign own, and inherited properties
console.log( _.extend({},a,b) ); // { own_prop: 37, proto_prop: 42, own_prop_two: true }
// _.assign will not assign inherited properties
console.log( _.assign({},a,b) ); // { own_prop: 37, own_prop_two: true }
```

### 1.3 - Compared to \_.merge

The \_.merge method also works like \_.extend, but it will deep clone objects, rather than just simply referencing them. In some cases this might be preferred if for some reason I want everything to be copied into new objects that can be manipulated without changing the state of the objects from which they are created, and vis versa. In other cases it is not needed, or will actually result in undesired behavior as I do in fact want to work with references, as such \_.extend, or \_.assign would be the better choice.

```js
// and object with own, and inherited properties,
// and a nested object as one of its own properties
let a = _.create({
        proto_prop: 42,
        nested_prop: {
            foo: 'bar'
        }
    }, {
        own_prop: 37
    });
// another object, with just own properties
let b = { own_prop_two: true};
 
// extend will assign own, and inherited properties
let c = _.extend({}, a, b);
console.log(c);
/*{ own_prop: 37,
proto_prop: 42,
nested_prop: { foo: 'baz' },
own_prop_two: true }
 */
 
// because properties are referenced, and not copied
// any change to the original will effect the object that
// is the result
a.nested_prop.foo = 'baz';
console.log(c.nested_prop.foo); // baz
 
// However this is not the case with _.merge
let d = _.merge({}, a, b);
a.nested_prop.foo = 'foobar';
console.log(d.nested_prop.foo); // baz (no change to merged object)
```

## 2 - Vanilla javaScript alternatives to lodash extend

As I write new posts on lodash, as well as edit old ones I have found that it is generally a good idea to have at least one if not more sections on how to do what lodash does without lodash. In other words just about every lodash method has a native javaScript counterpart, or often it is not so hard to make a quick single stand alone method that does what a lodash method does. Some times a lodash methods might be a collection method rather than just an array method, a lodash method might do the same thing in a slightly different non spec kind of way, or making a vanilla javaScript solution will prove to be a little involved. However more often than not it is still not so hard to do the same thing that a lodash method does with native javaScript features if you are just familial with what there is to work with.

### 2.1 - Object.create, and Object.getPrototypeOf

```js
let a = Object.create({
    foo: 'bar'
});
 
console.log( Object.keys( a )); // []
console.log( Object.keys( Object.getPrototypeOf(a) )); // ['foo']
console.log( a.prototype); // undefined
```

### 2.2 - Using Object.assign, with Object.getPrototypeOf


When it comes to doing what the lodash extend method does there is a native Object.assign method, however using just that alone will not do what the lodash extend method does, as this method will just assign own properties of the objects. However if you can just simply get the desired prototype object, then adding it into the mix just like with extend would just have to involve using the Object.getPrototypeOf method for an object on top of just passing the object alone.

```js
let a = Object.create({
    foo: 'bar'
});
a.bar = 42;
 
// so then assign by itself will not cut it, as that will
// just assign own properties of objects
let b = Object.assign({}, a)
console.log(b) // {bar: 42}
 
// however assign can be used in conjunction with the Object.getPrototypeOf method
// to get a similar effect to that of the lodash extend method
let c = Object.assign({}, a, Object.getPrototypeOf(a));
console.log(c); // { bar: 42, foo: 'bar' }
// c then also has an empty prototype object
console.log( Object.getPrototypeOf(c) ); // {}
```

## 3 - Conclusion

So that is my post on \_.extend for now, as my content on lodash continues to grow I will likely come back to this post to revise and expand on the content. It might be a good idea to add some vanilla js alternatives to \_.extend, or give some more detailed examples of its use. If there is anything you might like me to add, be sure to let me know in the comments section. Thanks for reading.