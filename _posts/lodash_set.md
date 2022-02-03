---
title: Set object values with a path string in lodash with set
date: 2018-12-04 14:48:00
tags: [lodash]
layout: post
categories: lodash
id: 344
updated: 2022-02-03 11:16:18
version: 1.21
---

A few months ago I wrote a post on the [get method](/2018/09/24/lodash_get/) in the popular javaScript utility library known as [lodash](https://lodash.com/) that is used for getting a property of an object by way of a path string, and returning a default value for the property in the event that the object property is undefined. When it comes to the default value that is given to the get method that is just a return value of get to use in the event that the property value is not in the source value, the get method as the name sugests just simply gets, it does not mutate the source object in any way.

So then because I wrote a post on the get method, it would make sense to write a post on the lodash [set](https://lodash.com/docs/4.17.10#set) method as well. The \_.set method works just like that of the \_.get method in lodash, only it can be used to set a property rather than getting it when using path strings to do so. Another lodash method that comes to mind that might be considered a part of this set of method is the [lodash \_.has](/2019/05/15/lodash_has/) method that can be used to not get, or set, but simply check it an object has a certain path or not, returning a boolean value for the result of the check rather than any value, or default value.

However it might not be so hard to just do what these methods do with just plain vanilla javaScript by itself, so lets look a few quick examples of lodash set and other lodash methods. While I am at it in this post I should also touch based on any related topics that might come up as I do so when it comes to just plain vanilla javaScript by itself.

<!-- more -->

Many of these tasks that the lodash \_.set and other related methods accomplish can also easily be done with just plain old javaScript. I guess the only talking point is if you find using string paths haves helpful or not.

## 1 - Some basic examples of lodash set

In this section I will be starting out with just a few simple hello world style examples of the lodash set method.

### 1.1 - Basic \_.set example

The basic idea of \_.set is that a value can be set by just passing the object, and then a path in string format, followed by the value to set the property to. In the event that the property is not there then a path to it will be cerated, so it is a pretty robust litle way to make sure that object properties are always there in an object of interest.

```js
let enemy = {
 
    // enemy health
    health: {
        current: 80,
        max: 100,
        healRate: {
            active: false,
            perTick: 5
        }
    },
 
    // index values of targets
    targets: [2, 6, 8]
 
};
 
// a path
let path = 'health.healRate.active';
 
// set the value at path
_.set(enemy, path, true);
 
// get the value at path
console.log( _.get(enemy, path) ); // true
```

### 1.2 - \_.set creates a path if it is not there

It's not like setting a property of an object is all that hard without lodash, but this method allows for setting the value with a string format path which can be helpful in some situations. Another added benefit is that it can also be used to create paths in the event that they are not there as well.

```js
let foo = {};
 
let path = 'bar.foobar.answer.to.life';
 
_.set(foo, path, 42);
 
console.log(_.get(foo,path)); // 42
```

## 2 - Vanilla javaScript alternatives to lodash set

When I write new posts on lodash, as well as come around to edit older posts on lodash such as this one I have made a habit of having at least one section in the post that has to do with doing the same thing that can be done with lodash, only using native javaScript alone. In many cases there is just a native method that can be used to do the same thing, at which point it is just a question of what the deal is with browser support with that method, and if the version of lodash is being used will help push things back a little farther. There are also of course a lot of other things to take into account when making the choice to use a native method rather than some kind of user space solution. However in any case I think I should always have a section in each lodash post on this topic.

When it comes to a vanilla javaScript alternative to the lodash set method I am not aware of any such native method, at least not when it comes to the Object prototype, and static methods of the main Object object in javaScript. However this is something where making a custom vanilla javaScript method is not so hard. I have found a lot of solutions on the open, web and have wrote one or two of my own in my time, and all of them seem to have a few things in common. One of which is the use of the [split string prototype method](/2021/07/14/js-string-split/) which can be used to split the given path string into an array of key names for desired bath to set for a source object. Once this array of keys is created it is just a matter of using array shift, or some other kinds of means to loop threw these key names, and get or create objects as needed until that final key is reached at which point the given value is set for that path of the source object.

### 2.1 - Vanilla javaScript set method

After doing some quick research I have found a question on stack over flow titled [Dynamic deep setting for a JavaScript object](https://stackoverflow.com/questions/6842795/dynamic-deep-setting-for-a-javascript-object). At the time of this edit of this post the top answer for the question was this.

```js
// https://stackoverflow.com/questions/6842795/dynamic-deep-setting-for-a-javascript-object
// https://stackoverflow.com/a/20240290/2057445
function setValue(obj, path, value) {
  var a = path.split('.')
  var o = obj
  while (a.length - 1) {
    var n = a.shift()
    if (!(n in o)) o[n] = {}
    o = o[n]
  }
  o[a[0]] = value
};
 
let foo = {};
setValue(foo, 'bar.foobar.answer.to.life', 42);
console.log(foo.bar.foobar.answer.to.life); // 42
```

### 2.2 - Another set method

The first question that I found was a duplicate and as such there was a link to another question on the same topic titled [\"How to set object property \(of object property of..\) given its string name in JavaScript?\"](https://stackoverflow.com/questions/13719593/how-to-set-object-property-of-object-property-of-given-its-string-name-in-ja). 

```js
// https://stackoverflow.com/questions/13719593/how-to-set-object-property-of-object-property-of-given-its-string-name-in-ja
/**
 * Set the value of a deep property, creating new objects as necessary.
 * @param {Object} obj The object to set the value on.
 * @param {String|String[]} path The property to set.
 * @param {*} value The value to set.
 * @return {Object} The object at the end of the path.
 * @author github.com/victornpb
 * @see https://stackoverflow.com/a/46060952/938822
 * @example
 * setDeep(obj, 'foo.bar.baz', 'quux');
 */
function setDeep(obj, path, value) {
    const props = typeof path === 'string' ? path.split('.') : path;
    for (var i = 0, n = props.length - 1; i < n; ++i) {
        obj = obj[props[i]] = obj[props[i]] || {};
    }
    obj[props[i]] = value;
    return obj;
}
 
let foo = {};
setDeep(foo, 'bar.foobar.answer.to.life', 42);
console.log(foo.bar.foobar.answer.to.life); // 42
```

### 2.3 - My utils.getPath and utils.setPath methods from my turn based RPG javascript project example

I have made a lot of vanilla javaScript project examples for my collection of posts on the topic of doing so. With that said while working on one of them where the aim was to make a turn based rpg game I have made a set and get path method for the general utilities library that I made for that example. The set method that I made for that game is as follows.

```js
// from js-javascript-example-turn-based-rpg in my test_ vjs repository
var utils = {};
 
// set a given path to a source object to a given value,
// return an error object if something goes wrong, or empty object if all goes well
utils.setPath = function(sourceObj, pathStr, value){
   var propNames = pathStr.split('.');
   var i = 0, len = propNames.length,
   node = sourceObj, tNode;
   while(i < len){
      try{
          // if this is the last index in propNames
          // then set the value to the current object
          // stored in 'node'
          if(i === len - 1){
              node[propNames[i]] = value;
          }else{
              // else I need to create an object
              // for a given prop name if the key
              // is undefined, and update node var
              tNode = node[propNames[i]];
              // create new object if undefined
              if(tNode === undefined){
                  tNode = node[propNames[i]] = {};
              }
              // if tNode is not an object
              if(typeof tNode != 'object' || tNode === null){
                  return new Error('Property ' + propNames[i] + ' is not an object or is null.');
              }
              node = tNode;
          }
      }catch(e){
          return e;
      }
      i += 1;
   }
   return {};
};
 
let foo = {};
utils.setPath(foo, 'bar.foobar.answer.to.life', 42);
console.log(foo.bar.foobar.answer.to.life); // 42
```

## 3 - Conclusion

So I would not say that the lodash set method is one of the most interesting or even useful methods in lodash. When it comes down to it I can not say that I actually use the lodash set method in many of my projects, and also in addition I can not say that I am using lodash at all most of the time now that I think of it. There are native javaScript ways of doing the saem thing that the set methods does without the path feature that I can not say that I often really need actually, at least speaking from my experience thus far working on projects. Still if lodash is part of the stack of a project then this is one method that may come in handy now and then when it comes to setting values to objects.