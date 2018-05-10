---
title: Copying vs referencing Objects in javaScript, and the many ways to copy them.
date: 2017-11-13 11:35:00
tags: [js,blog,corejs,lodash]
layout: post
categories: js
id: 89
updated: 2017-11-13 12:45:42
version: 1.1
---

I have been cranking out [posts on lodash](/categories/lodash/) as of late, and have come to make a [post on \_.cloneDeep](/2017/11/13/lodash_clonedeep/) which can be used to deep clone objects in javaScript if I am using [lodash](https://lodash.com/). As such A thought occurred that maybe I should write a post on the deal with refencing vs copying objects in javaScript, and cover a bunch of ways to go about making a copy of an object.

<!-- more -->

## Referencing objects

By default whenever I have a situation in which I have an object assigned to a variable it is a reference to that object.

```js
var ref = {x:32,y:50},
 
// this makes a refence to the object,
// it does not copy it.
pt = ref;
 
// as such any change will effect the reference object
pt.x = 0;
 
console.log(ref.x); // 0;
```

In many cases this is actual what I want, but some times I want to work with a copy. As such I need some kind of way to make a copy (or clone) of an object. Sometimes just a simple shallow clone of the object will work, other times I have an object with objects in it, and as such I will want to deep clone that object.

## Copying objects, and the for in method of doing it.

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

This will work okay, as long as I don't need a deep cone of the object in which case it will not work okay, as it just copy's the keys of the object to a new object. Never the less many clone methods work just like this in some fashon, and it is often called a shallow clone of an object.

## Deep Cloning with a for in loop

So when in a situation when I need to not just have a shallo copy of an object, but a full copy of the object, and all objects in it, I need some kind of deep clone method.

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

## Deep Cloning Objects with recursive references in them with a for in loop

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

## Object.assign

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

## Cloning with lodash

As I have mention earlier I have written some posts on how to clone with lodash. As such I will provide some links to my posts on [\_.clone](/2017/10/02/lodash_clone/), and [\_.cloneDeep](/2017/11/13/lodash_clonedeep/).

```js
var copy = _.clone(obj); // shallow copy
var fullCopy = _.cloneDeep(obj); // full deep copy
```

Using something like lodash to clone might be the best option still these days. I know that there are some nice features in EX2015+ for cloning built into the browser itself these days, but I am the kind of person that worries about my code breaking when someone visits my project with an older browser. It's still nice to have a method in something that will work on modern browsers, and also that older platform that most people still use.

## Cloning with JSON.parse, and JSON.stringify

This one is pretty simple, as long as I am always dealing with a client that has JSON which is most browsers in use these days.

```js
var copy = JSON.parse(JSON.stringify(obj));
````

## Conclusion

Cloning of objects can become somewhat intense, but there are many solutions, and just a few concepts that needs to be remembered. All solutions involve shallow cloning, and or deep cloning. There is also the matter of having the prototype chain merged down or not, but that often just involves making a new instance of the class that is being used.