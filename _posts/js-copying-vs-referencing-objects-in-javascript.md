---
title: Copying vs referencing Objects in javaScript, and the many ways to copy them.
date: 2017-11-13 11:35:00
tags: [js,blog,corejs,lodash]
layout: post
categories: js
id: 89
updated: 2020-07-17 13:14:42
version: 1.12
---

I have been cranking out [posts on lodash](/categories/lodash/) as of late, and have come to make a [post on \_.cloneDeep](/2017/11/13/lodash_clonedeep/) which can be used to deep clone objects in javaScript if I am using [lodash](https://lodash.com/) in a project. However I think it is called for to write a post on a subject that has to do with objects in general with javaScript regardless if lodash is used or not. That subject is the deal with referencing vs copying objects in javaScript. You see objects in javaScript are not the same thing as primitive values like numbers and strings, they are always copied by value. However when it comes to copying objects, often you are not making a copy of the object, you are just creating another reference to the same object. So then this is where cloning of objects comes into play, as well as shallow and deep cloning.

So in this post I will be covering a bunch of ways to go about making a copy of an object with native javaScript by itself. In addition I will try to do my best to get the core of the situation with objects in general down when it comes to copying and referencing them.

<!-- more -->

## 1 - js copy object and js reference object basics

In this section I will be going over two very basic examples of copying objects in javaScript. One example involves creating two references to the same object, and the other is one that has to do with creating a whole new independent copy or clone of an object. 

These examples are very simple though, and as such I am not going to be covering everything that is no know about when it comes to making copies of objects in javaScript when it comes to things like the prototype chain, and circular references.

However this is of course just a sort of basic section of this post where I am just writing about a very simple warted down form of things for the sake of outline the theme of the post here. If you think you have a basic understanding of how referencing and copying of objects works in javaScript you might want to move on to some of the more advanced sections in this post.

### 1.2 - Basic js reference example

By default whenever I have a situation in which I have an object assigned to a variable it is a reference to that object. When I use the assignment operator to create another variable and assign that reference to an object as its value, it is not a copy of that object it is just yet another reference to the same object. This is what is meant by copying by reference rather than value.

```js
// start out with a simple object
var obj = {x:32,y:50},
// this makes a reference to the object,
// it does not copy it.
pt = obj;
// as such any change will effect the reference object
// as it is just another reference to the same object
pt.x = 0;
console.log(obj.x); // 0;
```

In many cases this is actually what I want, but some times I want to work with a copy of an object so that I do not mutate the original source object, a typical task in functional programing. As such I need some kind of way to make a copy (or clone) of an object where it is not a reference but a whole new independent copy of that object with the same set of values. 

### 1.1 - Basic js copy object example

Sometimes just a simple shallow clone of the object will work, which is the case with this very simple object example. The reason why is because it does not have any nested objects, or references to other objects outside of it. So just something

```js
// start out with a simple object
var source = {x: 32,y: 50},
// create a whole new object
copy = {};
// populate the new object with the primitives
// from the source object
Object.keys(source).forEach(function (key) {
    copy[key] = source[key];
});

copy.x += 8;

console.log(copy.x, source.x); // 40 32

```

Although this might work okay for this kind of example, other times I have an object with nested objects in it. There is also the question of the object prototype chain, circular references, references to native objects like window and, and laying when it comes to merging down a collection of objects. So now that we understand the very basic idea of copying and referencing with objects in javaScript lets move on to some more advanced related topics here.

## 2 - copying nested objects by references, and basic deep cloning

So now that we have the very basics of coping by referencing, and copying b value understood lets take things just one step further and working with a few examples that have to do with introducing just one nested object. In this section I am still just working with plain old objects, and not doing anything to weird with the prototype chain, or any other advanced topic when it comes to this subject.

### 2.1 - Basic nested object example where I am cloning just the first object, but referencing the first nested object.

So when it comes to having an object within an object the basic way of cloning an object or shallow cloning will still work okay with primitive values of the object that is being clone just as before. However it will not work with any nested object as that is an example of just repeating what we where doing in the first place. 

In other words I am still creating a new object, but that is just it, one object and not any additional nested objects.

```js
// start out with an object with
// a nested object
var source = {
    pos: {
        x: 40,
        y: 25
    },
    heading: 1.57
},
// create a whole new object
copy = {};
// populate the new object with the keys
// from the source object
Object.keys(source).forEach(function (key) {
    copy[key] = source[key];
});
 
// mutating the copy
copy.heading = 0;
copy.pos.x = 0;
 
// works as expected when it comes to heading
console.log(copy.heading, source.heading); // 0 1.57
// does not work with pos because it just copied a
// reference it did not deep clone
console.log(copy.pos.x, source.pos.x); // 0 0
```

So in order to resolve this I mist find a way to deep clone, rather than shallow clone the object and its nested object. One way to do this is the same way as before it is just that now I need to do so recursively.

## 3 - Copying objects, and the for in method of doing it.

One common way to go about copying an object is to use a for in loop.

```js
// and example object to copy
var ref = {
    x: 32,
    y: 50
},
 
// a simple forInClone shallow cone method
forInClone = function (obj) {
 
    var n = {},
    prop;
 
    for (prop in obj) {
 
        n[prop] = obj[prop];
 
    }
 
    return n;
 
},
 
// works
pt = forInClone(ref);
 
pt.x = 0;
 
console.log(ref.x); // 32
```

This will work okay, as long as I don't need a deep cone of the object in which case it will not work okay, as it just copy's the keys of the object to a new object. Never the less many clone methods work just like this in some fashion, and it is often called a shallow clone of an object.

## 4 - Deep Cloning with a for in loop

So when I am in a situation when I need to not just have a shallow copy of an object, but a full copy of the object, and all objects in it, I need some kind of deep clone method.

```js
// and example object to copy
var ref = {
    x: 32,
    y: 50,
    delta : {  // now we have an object in an object
        x : -1,
        y: 5
    }
},
 
// a deep clone method using for in
forInCloneDeep = function (obj) {
 
    var n = {},
    prop;
 
    for (prop in obj) {
 
        // if a primitive just copy
        n[prop] = obj[prop];
 
        // if an object clone that too.
        if(typeof obj[prop] === 'object'){
 
            n[prop] = forInCloneDeep(obj[prop]);
 
        }
 
    }
 
    return n;
 
},
 
// works
pt = forInCloneDeep(ref);
 
pt.delta.x = 0;
pt.delta.y = 0;
 
console.log(ref.delta.x); // -1
console.log(pt.delta.x); // 0
```

This will work okay, but one problem that comes to mind right off that bat is what happens when I feed this method an object with a circular reference in it. That will of course result in an infinite loop. 

## 5 - Deep Cloning Objects with circular references in them with a for in loop

It is possible to make a reference to an object within the same object which is common occurrence in javaScript. When making a clone of an object should these references be with the new object, or the old one? Although there might be exceptions, I can only think that most of the time I would want those reference to be pointing to the new object I am making.

So to fix my clone method I am making here, I would just want to test if a key value is a reference to the object, and if so make the reference.

```js
// and example object to copy
var ref = {
    x: 32,
    y: 50,
    delta : {  // now we have an object in an object
        x : -1,
        y: 5
    }
};
 
ref.ref = ref; // oh boy, look out!
 
var forInCloneDeep = function (obj) {
 
    var n = {},
    prop;
 
    for (prop in obj) {
 
        // if a primitive just copy
        n[prop] = obj[prop];
 
        // if an object clone that too.
        if(typeof obj[prop] === 'object'){
 
           // is this a reference to the object itself?
           if(obj[prop] === obj){
 
                // then make the reference, but to the new object
                // and don't even try to clone it.
                n[prop] = n;
 
            }else{
 
                // we should be able to do this safe
                n[prop] = forInCloneDeep(obj[prop]);
 
            }
 
        }
 
    }
 
    return n;
 
};
```

## 6 - Object.assign

I never really got into ES2015+, Still I guess it is time to get current. As such If I am in a situation in which I do not care much about backward compatibility there is of course [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

```js
let ref = {
    x: 32,
    y: 50,
    delta : {  // now we have an object in an object
        x : -1,
        y: 5
    }
};
 
ref.ref = ref; // oh boy, look out!
 
let copy = Object.assign({},ref);
 
copy.x = 0;
 
console.log(copy.x); // 0
console.log(ref.x); // 32
```

## 7 - Cloning with lodash

As I have mention earlier I have written some posts on how to clone with lodash. As such I will provide some links to my posts on [\_.clone](/2017/10/02/lodash_clone/), and [\_.cloneDeep](/2017/11/13/lodash_clonedeep/).

```js
var copy = _.clone(obj); // shallow copy
var fullCopy = _.cloneDeep(obj); // full deep copy
```

Using something like lodash to clone might be the best option still these days. I know that there are some nice features in EX2015+ for cloning built into the browser itself these days, but I am the kind of person that worries about my code breaking when someone visits my project with an older browser. It's still nice to have a method in something that will work on modern browsers, and also that older platform that most people still use.

## 8 - Cloning with JSON.parse, and JSON.stringify

This one is pretty simple, as long as I am always dealing with a client that has JSON which is most browsers in use these days.

```js
var copy = JSON.parse(JSON.stringify(obj));
````

## 8 - Conclusion

Cloning of objects can become somewhat intense, but there are many solutions, and just a few concepts that needs to be remembered. All solutions involve shallow cloning, and or deep cloning. There is also the matter of having the prototype chain merged down or not, but that often just involves making a new instance of the class that is being used.