---
title: Making copy's of objects in an array with the lodash _.cloneDeep method.
date: 2017-11-13 10:35:00
tags: [js,lodash]
layout: post
categories: lodash
id: 88
updated: 2018-04-12 09:44:56
version: 1.2
---

The issue with deep cloning objects in javaScript comes up now and then. Maybe one day I will write a full post on the matter, and all the ways to go about doing it, but this is a post on [lodash](https://lodash.com/), as such I will just be writing about the [\_.cloneDeep](https://lodash.com/docs/4.17.4#cloneDeep) method.

<!-- more -->

## The deal With copying objects in javaScript

If you know about the situation with copying by value vs copying by reference you can skip over what I am writing here. If not it is important to note that making a copy of an object is not as easy as making a copy of a primitive value such as a String or Number. With primitives you can just do something like this:

```js
var n = 40,
 
// making a copy of n
a = n;
 
// making a change to the copy
a += 2;
 
// only the copy is effected
console.log(a); // 42
console.log(n); // 40
```

Objects on the other hand are a bit more of a pain, because when I attempt to copy them the same way I would a primitive, you do not end up with a copy, you end up with a reference.

```js
 var obj = {
 
    foo : 'bar'
 
 };
 
 // I can't just do this, because
 // I am making a reference, not a copy
 var copy = obj;
 
 // as such a change to the reference effects
 // the object I referenced
 copy.foo = 42;
 console.log(copy.foo); // 42
 console.log(obj.foo); // 42
```
Often this is the effect that is desired, when doing something like grabbing a reference to a DOM element, or something to that effect. However if it is a situation in which I want to change values without effecting the object I am referencing, I need to do something to make an actual copy of the object. 

## Shallow Cloning (or copying) of objects with \_.clone in lodash.

There are many ways to do this, but because this is a post on lodash, there is the \_.clone method that works well If I just want to make a quick shallow copy of an object.

```js
var obj = {
 
    foo : 'bar'
 
};
var copy = _.clone(obj);
copy.foo = 42;
console.log(copy.foo); // 42
console.log(obj.foo); // 42
```

this works just fine as long as what is often called a 'shallow clone' with work okay, when dealing with more complex objects it becomes more important to find ways to go about preforming what is called a 'deep clone'.

To understand the problem that can happen with shallow cloning take a look at the following.

```js
 var obj = {
 
    anwser : 37,
    words : ['foo','man', 'chew']
 
 };
 
 // making a 'shallow clone' with _.clone
 copy = _.clone(obj);
 
 copy.anwser = 42;
 
 // works as expected with any primitive that is a 
 // value of a key of the object
 console.log(obj.anwser); // 37
 console.log(copy.anwser); // 42
 
 // however it does not 'deep clone the array'
 copy.words[0] = 'changed';
 
 console.log(obj.words[0]); // changed
 console.log(copy.words[0]); // changed
```

This happens because although I am making a new object rather than just referencing one that all ready exists, one of the properties is another Object ([arrays are objects](/2017/05/12/js-arrays-are-objects/)), and as such that still remains a reference. So I need some kind of way to make not just one new object, but a new object for every object in the object as well. In short I need to deep clone an object.

## Deep Clone with \_.cloneDeep

The \_.cloneDeep method in lodash works basicly the same way, only it deep clones the object. As such I just have to make one simple change to the above example to get it to be a full copy of everything in the object.

```js
 var obj = {
 
    anwser : 37,
    words : ['foo','man', 'chew']
 
 };
 
 // making a 'shallow clone' with _.clone
 copy = _.cloneDeep(obj);
 
 
 // now any change to the copy only effects the copy
 copy.words[0] = 'changed';
 
 console.log(obj.words[0]); // changed
 console.log(copy.words[0]); // changed
```

## Conclusion

Sure there are plenty of other ways to shallow and deep clone objects in javaScript. One of just many is to use JSON.parse, and JSON.stringify like this:

```js
var copy = JSON.parse(JSON.stringify(obj));
```

Also when it comes to the new ES2015+ standards there is plenty more to cover with this, but this is just one of my lodash posts, so that is another ball of wax.