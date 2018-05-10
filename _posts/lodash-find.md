---
title: Example of the _.find collection method in lodash
date: 2017-09-14 10:49:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 37
updated: 2018-02-09 12:22:25
version: 1.12
---

So there is the old do I use objects or arrays problem that I run into when working on a project. Of course [arrays are objects](/2017/05/12/js-arrays-are-objects/), but I gather that you may know what I mean if you are like me, and have been coding with javaScript for a few years. I try not to get caught up on these things, it does not matter a whole lot, plus there are ways of always dealing with whatever it may be anyway. As such methods like [\_.find](https://lodash.com/docs/4.17.5#find) in [lodash](https://lodash.com/) come in handy for this kind of thing.

<!-- more -->

## What a collection is, and basic example

The lodash \_.find method works not just with Arrays but also any object, so \_.find is considered one of the many collection methods in lodash. So find can help solve that problem when it comes to choosing between using Arrays and plain old Objects, as in any case I can use \_.find to get at what I want in an Object of any kind, not just an Array.

So the first argument that is given to \_.find is a collection, which can be an Array, an Array like object, just a plain old Object, and even Strings.

```js
// The is an Object that is an Array that
// is a kind of collection
var anArray = ['i', 'am', 'an', 'Array'];
 
console.log(anArray.constructor.name); // Array
 
// This is an Object that is an Object
// but it is an collection that is 'Array like'
var notAnArray = {
 
    0: 'i',
    1: 'am',
    2: 'not',
    3: 'an',
    4: 'Array'
 
};
 
console.log(notAnArray.constructor.name); // Object
 
// This is an Object that is not at all like an Array
// It is a collection of key value pairs though
var soNotAnArray = {
 
    foo: 'totally',
    bar: 'not',
    man: 'an',
    chew: 'Array'
 
};
 
console.log(soNotAnArray.constructor.name); // Object
 
// this is a method that I can pass to _.find
// along with a collection that will give me the first
// element that has a length greater than 3
var method = function (el) {
 
    return el.length >= 3;
 
};
 
console.log( _.find(anArray, method) ); // Array
console.log( _.find(notAnArray, method) ); // not
console.log( _.find(soNotAnArray, method) ); // totally
```

## The iteration method

The second argument that is given to \_.find is an iteration method, or some kind of short hand for such a method. This method can have three arguments, the first of which is the current element in the collection that is being looked at. In addition the second argument is the current index, and the last argument is a reference to the collection that was given.

```js
var result = _.find(['a', 'b', 'c'], function (el, i, col) {
 
     // first argument is the current collection element 'a' - 'c'
    console.log(el);
 
    // second argument is the current index 0 - 2
    console.log(i);
 
    // third argument is the actual collection ['a','b','c']
    console.log(col);
 
    // if true is returned, then that is what
    // will be returned by _.find, else it will keep looking
    return el === 'b'
 
});
 
console.log(result); // b
```

In the body of the iteration method, if what is returned by the method evaluates to true then, then that will count as the element being found.

## Custom iteration methods and lodash method shorthands

As shown above I can make my own methods that are used to define the terms of whether or not an element in a collection is what it is that I am looking for. I can of course make a method that returns a iteration method that \_.find can use. However I might not even have to do that if such a method is in lodash to begin with, and there are even some shorthands that can be used in \_.find that allow for me to not even have to call the lodash method directly.

```js
// say I have an array with some data like this
var data = ['talk', 'run', {action: 'walk'}, {action: 'sing'}, {action: 'dance'}],
 
// sure I can make my own methods that
// make use of closure...
findProperty = function (propName) {
 
    // ...that when called pass a function that 
    // _.find can use
    return function (el, i, col) {
 
        if (typeof el === 'object') {
 
            return propName in el;
 
        }
 
    };
 
};
 
// and find will use it.
console.log( _.find(data, findProperty('action')) ); // {action:'walk'}
 
// but there is a lodash method for that to begin with
// called _.property
console.log( _.find(data, _.property('action') ) );  // {action:'walk'}
 
// and why even bother with that when there is
// a short hand for it.
console.log( _.find(data, 'action') );  // {action:'walk'}
```

In addition to shorthands for \_.property there are also shorthands for \_.matches \_.matchesProperty.

```js
// _.matchesProperty
console.log( _.find(data, ['action','sing']) );  // {action:'sing'}

// _.matches
console.log( _.find(data, {action:'dance'}) );  // {action:'dance'}
```

## FromIndex example

This lodash method can accept a third argument that is the index where to start looking in the collection.

```js
var collection = [1,2,3,4,5,'a','b','c'],
method = function(el,i){
 
  if(typeof el === 'string'){
  
      return true;
  
  }
 
};
 
console.log( _.find(collection, method) ); // 'a'
console.log( _.find(collection, method , 6) ); // 'b'
```

## Finding an Object in an Array, a basic usage example of \_.find

So \_.find will help with returning an element in an array, rather than it's index. So if you have an array of objects and you want to find a single object in the array by a certain key value pare \_.find is the right tools for the job.

```js
var db_array = [
 
    {
        name : 'Dave',
        sex : 'male',
        age : 34
    },
 
    {
        name: 'Jake',
        sex : 'male',
        age : 22
    },
 
    {
        name :'Jane',
        sex : 'female',
        age : 27
    }
 
],
 
// find dave
q = _.find(db_array, {name:'Dave'});
 
console.log(q); // {name:'Dave',sex:male,age:34}
```

You do not have to give an object, you can also use a function like this.

```js
q = _.find(db_array, function (obj) {
    return obj.name === 'Dave';
});
```

## Using \_.find to find the index of an element in an Array, or the key of a property in an Object.

In lodash there is the [\_.findIndex](https://lodash.com/docs/4.17.5#findIndex) method, that works just fine with Arrays, as it is an Array method. However it will not work with Objects in general, as it is not a collection method. It is possible to use \_.find to get the index of an element in an Array, or the key of a property in any Object. As you might have read earlier in this post the second argument that is given in the iteration method is the index, or key value if it is a plain Object.

```js
var arr = ['foo', 'man', 'chew'],
index = -1;
 
// using _.find to find an index, or key value
var findIndex = function (col, what) {
 
    var index = -1;
 
    // _.find will return the value
    // but the index or key is one of the values
    // in the iteration method
    _.find(col, function (el, iKey) {
 
        index = iKey;
        return el === what;
 
    });
 
    // return the result
    return index;
 
};
 
// this will return the index, or key
console.log(findIndex(arr, 'man')); // 1
console.log(findIndex({
        what: 'foo',
        how: 'bar'
    }, 'bar')); // 'how'
 
// there is also the _.findIndex method
var findIndex = function (col, what) {
 
    // _.findIndex will return an index, rather than a value
    return _.findIndex(col, function (el, i) {
 
        console.log('i=' + i);
 
        return el === what;
 
    });
 
};
 
// _.findIndex works fine with arrays
console.log(findIndex(arr, 'man')); // 1
 
// but it is an array method, so it will only work with arrays
console.log(findIndex({what: 'foo',how: 'bar'}, 'bar')); // -1
```

## Using \_.find on an array of primitives, and a single primitive.

Find is fairly robust, of course it can be used with an array of primitives.

```js
var words = ['foo**', '*foo*', '**foo'];
 
var result = _.find(words, function (str, i) {
 
        if (str.match(/\*\*foo/)){
 
            return true;
 
        }
 
    });
 
console.log(result); // '**foo'
```

However \_.find can be used on a single stand alone String as well

```js
var str = 'This is a single string! Yes it can be used with find.';
 
console.log( _.find(str,function(el,i,col){
 
    return el === '!';
 
}) ); // !
```

This is because strings are also another example of something in javaScript that is kindof Array like, even though it is not an array. Sure it's constructor is String, and not Array asu such it does not have array methods in it's prototype. However it can still be thought of as an array of characters.

## Conclusion

This post needed a major update, as it was pretty thin before hand. I am still pretty sure I have not covered all bases with the lodash find method, so I will likely update this post again in the future at some point. If you are in the mood check out [my other posts on lodash](/categories/lodash/).
