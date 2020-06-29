---
title: The lodash _.extend method for combining objects, and alternatives
date: 2018-10-01 11:57:00
tags: [js,lodash]
layout: post
categories: lodash
id: 294
updated: 2020-06-29 19:53:49
version: 1.10
---

When working with many objects there some times comes a need to combine them all together, when doing so things can get a little confusing. There are what is often referred to as the objects own properties, then there are inherited properties, in addition there is also ways of making hidden properties. If that was not enough then there is also the nature of copying by reference rather than value with objects in javaScript as well. 

In this post I will be writing about the [lodash](https://lodash.com/) object method known as [\_.extend](https://lodash.com/docs/4.17.10#extend), and how it compares to other methods in lodash. Hopefully this post will help eliminate some confusion that you might have with combining objects in javaScript, or reinforce what you all ready know, so lets get to it.

<!-- more -->

## 1 - what to know

This is a post on the \_.extend object method in lodash, and other related topics. In order to better understand \_.extend it is a good idea to have a deep understanding of how objects work in javaScript. In this section I will briefly cover some of these topics, but will not be going into them in detail. I also assume that you have at least some background with lodash, and javaScript in general.

### 1.1 - Referencing vs copying of objects

The \_.extend lodash method works by assigning the own properties, and prototype properties of one or more objects to an object. Assigning is another term for referencing, rather than copying, or cloning. So when \_.extend is used any change that might occur to nested objects in the objects that are being referenced, will also occur in the object that is extended. If this is a problem there are many other methods in lodash, such as \_.merge that will deep copy the given objects, rather than just simply referencing them. I will cover this is greater detail in a latter section in this post.

### 1.2 - Own vs inherited properties.

When a javaScript developer refers to an objects own properties, they typically refer to the properties of an object that are not inherited from the objects prototype object that contains properties that are shared across multiple instances of a class of object. So therefor an objects own properties are properties that set the object apart from others that are made from the same constructor method, or that share the same prototype object. The \_.extend method combines both the own properties, as well as anything that may be in the prototype object. In some cases this might be desired, however in other cases it is not, and a method like \_.assign would be a better choice.

## 2 - A Basic example that makes use of \_.extend

For a basic example of \_.extend I put together a quick example that involves an object that is made with \_.create that works in a very similar fashion to that of the native Object.create. The reason why this is important for a \_.extend example is that it will result in object that has a prototype object with some visible properties that will be combined when used with \_.extend which sets the method apart from other alternatives such as \_.assign, and \_.merge.

```js
let _ = require('lodash');
 
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

### 2.1 - Compared to \_.assign

\_.extend is very similar to \_.assign, it works in almost the same way only it does not merge in prototype methods. In fact \_.extend is just an alias for \_.assignIn. So compared to \_.extend it will do the same thing, but without combining in prototype key name values.

```js
// extend will assign own, and inherited properties
console.log( _.extend({},a,b) ); // { own_prop: 37, proto_prop: 42, own_prop_two: true }
 
// _.assign will not assign inherited properties
console.log( _.assign({},a,b) ); // { own_prop: 37, proto_prop: 42, own_prop_two: true }
```

### 2.2 - Compared to \_.merge

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
let b = {
    own_prop_two: true
};
 
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

## 3 - Conclusion

So that is my post on \_.extend for now, as my content on lodash continues to grow I will likely come back to this post to revise and expand on the content. It might be a good idea to add some vanilla js alternatives to \_.extend, or give some more detailed examples of its use. If there is anything you might like me to add, be sure to let me know in the comments section. Thanks for reading.