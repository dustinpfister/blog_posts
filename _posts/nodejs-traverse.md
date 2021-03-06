---
title: Traversing over an object in node.js
date: 2017-08-26 15:16:49
tags: [js,node.js]
layout: post
categories: node.js
id: 32
updated: 2019-11-18 09:38:50
version: 1.6
---

Sometimes I get into a situation in which I may want to loop over all the nodes of a given object. That is I want to traverse, or loop over an object and preform a certain action with certain key value pairs of an object that has one or more nested objects in it. 

I could slap together my own solution for looping over all nested object keys, maybe starting with a for in loop that I use in a method that is called recursively. However a much better option would likely be to just go ahead and use [traverse](https://www.npmjs.com/package/traverse) as this seems to work just fine for this kind of task.

<!-- more -->

## 1 - Install the traverse npm package

You know the deal whe it comes to adding an npm package to a stack, unless you do not in which case.

```
$ npm install traverse --save
```

This will install traverse into the current project folder and save it as a dependency of the project in the package.json file.

## 2 - The Object

So just for the sake of this post I will be starting with the following code for each example.

```js
// to use transverse
var traverse = require('traverse'),
 
// the object to walk
foo = {
 
    bar : 'foo',
    barfoo : false,
 
    foobar : {
 
        bar : 'foo',
        foo : {
 
            b : 41,
            a : 43,
            r : 42
        }
 
    }
 
};
```

Each following example will be code that is written after the above code. Notice that the object has a nested object within yet another nested object, in addition to having some primitive key values also (String, Boolean, and Number). Although this is a silly example object, in the wild I come across objects like this all the time, and sometimes I would like to walk over them for one reason or another.

## 3 - forEach example

So I thought I would start off with a simple forEach example.

```js
// walk the object with forEach
traverse(foo).forEach(function (node) {
 
    if (node === 42) {
 
        console.log('The anwser has been found!');
 
        console.log('forEach aurgs');
        console.log('node: ' + node); // the answer
        console.log('path: ' + this.path.join('/')); // the way to the answer
 
    }
 
});
```

So this works a whole lot like Array.forEach in that it loops over each key value pare of the Object. As you would expect it does not work just the same way because I am looping over just a plain old object rather than an instance of Array. Also via the use of the this keyword I have access to a whole lot of helpful properties when walking over the object such as this.path, also this.node can be used as an alternative to the node argument.

## 3 - Paths example

So there are a lot of useful methods in this dependency that help with what comes to mind when dealing with this certain aspect of node.js development. The Path method for example will return an array of all possible paths in the object which I am sure will come in handy now and then.

```js
var trav = traverse(foo),
 
// grab an array of all paths in the objest
paths = trav.paths();
 
// looping over the array
paths.forEach(function (path) {
 
    // a path is an array of key values to a certain path
    console.log(path);
 
    // the traverse get method excepts a path array
    console.log(trav.get(path));
 
});
```

## 4 - reduce example

Okay now for an example using the reduce method, this should be fun.

```js
var trav = traverse(foo),
 
obj = trav.reduce(function (acc, node) {
 
        var ref = acc,
        self = this;
 
        // if the node is a number
        if (typeof node === 'number') {
 
            // go over the key path
            this.path.forEach(function (key, index) {
 
                // are we at the end of the key path?
                if (index === self.path.length - 1) {
 
                    // then et the node value
                    ref[key] = node;
 
                } else {
 
                    // else create a new object if we need one
                    if (ref[key] === undefined) {
 
                        ref[key] = {};
 
                    }
 
                    // change the ref to the next object in the path
                    ref = ref[key];
 
                }
 
            });
 
        }
 
        // return the new object being made with reduce
        return acc;
 
    }, {});
 
console.log(obj); // { foobar: { foo: { b: 41, a: 43, r: 42 } } }
```

Reduce can be used to return a new object that is constructed during the process of looping over the contents on the object. Here I am creating a new object that only has the structure of my foo object that contains keys that have numbers.

## 5 - Conclusion

So the the traverse npm package is a good way to go about looping over all the contents of an object in a nodejs project. Although it looks like it is not supported any more, so maybe another solution should be looked into on this one. It is true that just because a project is not being supported it does not mean that it is broken, there is a difference between supporting and mangling.

Be sure to check out my many other [posts on node.js and npm packages](/categories/node-js/).
