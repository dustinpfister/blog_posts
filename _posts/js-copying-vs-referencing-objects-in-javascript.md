---
title: Copying by Value, and Reference in javaScript.
date: 2017-11-13 11:35:00
tags: [js,corejs,lodash]
layout: post
categories: js
id: 89
updated: 2021-08-25 09:25:57
version: 1.32
---

I have been cranking out [posts on lodash](/categories/lodash/) as of late, and have come to make a [post on the \_.cloneDeep](/2017/11/13/lodash_clonedeep/) method in lodash which can be used to deep clone objects in javaScript if I am using [lodash](https://lodash.com/) in a project. However I think it is called for to write a post on a subject that has to do with objects in general with javaScript regardless if lodash is used or not when it comes to the subject of referencing vs copying objects in javaScript. 

You see objects in javaScript are not the same thing as primitive values like numbers and strings, that are always copied by value. When it comes to making a copy of a number value, that copy is now a whole other value in memory, and I can change that value without changing the other value from which it is copied. However when it comes to copying objects, often you are not making a copy of the object, you are just creating another reference to the same object. So then this is where cloning of objects comes into play, as well as shallow and deep cloning them, any understanding the difference between what a value is and what a reference to a value is.

So in this post I will be touching base on the topic of copying by value, and copying by reference in javaScript. Also in this post I will be covering a bunch of ways to go about making a copy of an object with native javaScript by itself. In addition I will try to do my best to get the core of the situation with objects in general down when it comes to copying and referencing them.

<!-- more -->

## 1 - Copying by value, and copying by reference basics in javaScript

In this section I will be going over some very basic JavaScript examples on the topic of copying by value, and copying by reference. Inducing examples that involve creating two references to the same object, and another that is one that has to do with creating a whole new independent copy or clone of an object from a source object. When doing so there is making just a shallow copy of an object, and also what is often called a deep copy or clone of an object.

These examples are very simple though, and as such I am not going to be covering everything that there is to know about when it comes to making copies of objects in javaScript when it comes to things like the prototype chain, and circular references. This is of course just a sort of basic section of this post where I am just writing about a very simple watered down form of things for the sake of outlining the theme of the post. If you think you have a basic understanding of how referencing and copying of values works in javaScript you might want to move on to some of the more advanced sections later in this content.

### 1.1 - Basic js reference example

By default whenever I have a situation in which I have an object assigned to a variable it is a reference to that object that is stored in that variable. When I use the assignment operator to create another variable and assign that reference to an object as its value, it is not a copy of that object it is just yet another reference to the same object in memory. This is what is meant by copying by reference rather than value.

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

In many cases this is actually what I want, but some times I want to work with a copy of an object so that I do not mutate the original source object, a typical task in [functional programing](/2020/06/18/js-function-pure/). As such I need some kind of way to make a copy \( or clone if you prefer \) of an object where it is not a reference to the same object, but a whole new independent copy of that object with the same set of values.

### 1.2 - Basic js copy object example using Object.keys and Array.forEach

Sometimes just a simple shallow clone of the object will work just fine, which is the case with this very simple object example. The reason why is because it does not have any nested objects, or references to other objects outside of it. The example here then involves just a single source object that has a x and y named keys, and the values for these keys are numbers, which are a kind of primitive value. When I pass the source object to the [Object.keys method](/2018/12/15/js-object-keys/), what is returned is an array of public key names for the object. Because the returned value of the Object.keys method is an array, I can then use an array prototype method such as the [array.forEach method](/2019/02/16/js-javascript-foreach/) to loop over the key names. So then I could just create a new object, and then use the key names of the source object to create new key named for the new copy of the source object, and also use the key names to get the values from the source object in the body of the function that I pass to the array.forEach method.

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

Although this might work okay for this kind of example, other times I have an object with nested objects in it. There is also the question of the object prototype chain, circular references, references to native objects like window, layering when it comes to merging down a collection of objects. So now that we understand the very basic idea of copying and referencing with objects in javaScript lets move on to some more advanced related topics when it come to copying objects.

### 1.3 - Copying objects, and the for in method of doing it.

Another common way to go about copying an object is to use a for in loop. This is the way that one would have to go about doing this sort of thing way back before many of the more modern options there are to work with in core javaScript. So if for some weird reason you need to get things to work in really old platforms doing something like this might be called for.

```js
// and example object to copy
var ref = {
    x: 32,
    y: 50
};
 
// a simple forInClone shallow cone method
var forInClone = function (obj) {
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

This will work okay, as long as I don't need a deep cone of the object in which case it will not work okay, as it just copy's the keys of the object to a new object. Never the less many clone methods work just like this in some fashion, and it is often called a shallow clone of an object. When it comes to the basics of copying by reference and value solutions like this are easy to understand, but things get a little hard to follow when it comes to getting into deep cloning.

## 2 - Copying nested objects by references, and basic Deep Cloning of an object

So now that we have the very basics of copying by referencing, and copying by value understood lets take things just one step further and working with a few examples that have to do with introducing just one nested object at lest. In this section I am still just working with plain old objects, and not doing anything to weird with the prototype chain, or any other advanced topic when it comes to this subject. So the next step forward is just taking one more step beyond what I covered in the basic section. If I have an object where each key is a primitive I can just loop over the top level own properties of that object, and move on. However if one or more of those properties are an object, then I might want to copy that object also.

### 2.1 - Basic nested object example where I am cloning just the first object, but referencing the first nested object.

So when it comes to having an object within an object the basic way of cloning an object or shallow cloning will still work okay with primitive values of the object that is being clone just as before. However it will not work with any nested object as that is an example of just repeating what we where doing in the first place. In other words I am still creating a new object, but that is just it, one object and not any additional nested objects.

So once more say I have a source object that contains data about a point in 2d space like in the basic section, only this time the x and y properties are in a nested object. In addition there is an additional top level property of the source object now that is a heading property of the source object. If I use the Object.keys, and array.forEach type approach for this I will get an expected result when it comes to the heading property, however making a change to the pos property in the copy object will effect the source object. This is because the pos property of the copy object is the same reference to the pos property in the source object.

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

So in order to resolve this I must find a way to deep clone, rather than shallow clone the source object and its nested pos object. One way to do this is the same way as before it is just that now I need to do so recursively. There are also a number of other ways to go about doing this sort of thing, but the end result is the same. I want to not just copy a single root object, but a root object and one, more than one, or all of the objects children.

### 2.2 - Deep Cloning with a for in loop

So when I am in a situation when I need to not just have a shallow copy of an object, but a full copy of the object, and all objects in it, I need some kind of deep clone method. In this example I am using a solution that involves using the for in loop, but in order to copy not just the root object but the children also I will need to call the function recursively.

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
 
// a deep clone method using for in
var forInCloneDeep = function (obj) {
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

This will work okay, but one problem that comes to mind right off that bat is what happens when I feed this method an object with a circular reference in it. That will of course result in an infinite loop, so I need to be careful when it comes to making and using these kinds of methods.

### 2.3 - deep copy with JSON

This one is pretty simple, as long as I am always dealing with a client that has JSON which is most browsers in use these days.

```js
var copy = JSON.parse(JSON.stringify(obj));
````

## 3 - Deep Cloning Objects with circular references in them with a for in loop

It is possible to make a reference to an object within the same object which is common occurrence in javaScript actually. As such this brings up an important point when it comes to these kinds of references when making a copy of a source object that contains them. When making a clone of an object should these references be with the new object, or the old one? Although there might be exceptions, I can only think that most of the time I would want those reference to be pointing to the new object I am making.

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

## 4 - Object.assign

When it comes to es2015+ spec JavaScript a static Object method of interest is the Object.assign method. These days it is fairly safe to just go ahead and use methods like [Object.assign](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign), as I do not think there are a lot of people visiting my websites with browsers that do not support this method.

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

## 5 - Cloning with lodash

As I have mention earlier I have written some posts on how to clone with lodash. As such I will provide some links to my posts on [\_.clone](/2017/10/02/lodash_clone/), and [\_.cloneDeep](/2017/11/13/lodash_clonedeep/).

```js
var copy = _.clone(obj); // shallow copy
var fullCopy = _.cloneDeep(obj); // full deep copy
```

Using something like lodash to clone might be the best option still these days. I know that there are some nice features in EX2015+ for cloning built into the browser itself these days, but I am the kind of person that worries about my code breaking when someone visits my project with an older browser. It's still nice to have a method in something that will work on modern browsers, and also that older platform that most people still use.

## 6 - Conclusion

Cloning of objects can become somewhat intense, but there are many solutions, and just a few concepts that needs to be remembered. All solutions involve shallow cloning, and or deep cloning. There is also the matter of having the prototype chain merged down or not, but that often just involves making a new instance of the class that is being used.