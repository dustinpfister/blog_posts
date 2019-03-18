---
title: Lodash _.find collection method examples with vanilla js alternatives as well.
date: 2017-09-14 10:49:00
tags: [js,lodash,node.js]
layout: post
categories: lodash
id: 37
updated: 2019-03-18 08:54:33
version: 1.28
---

So there is the old do I use objects or arrays problem that I run into when working on a project. Of course [arrays are objects](/2017/05/12/js-arrays-are-objects/), but I gather that you may know what I mean if you are like me, and have been coding with javaScript for a few years. I try not to get caught up on these things, it does not matter a whole lot, plus there are ways of always dealing with whatever it may be anyway. As such methods like [\_.find](https://lodash.com/docs/4.17.5#find) in [lodash](https://lodash.com/) come in handy for this kind of thing.

<!-- more -->

## 1 - lodash find method and alternatives

So the lodash \_.find method is a nice little method that works in a very similar fashion to the [Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) method in core javaScript. However the Array.find method is an array protoype method and not a collection with like with \_.find in lodash. So there is more that the \_.find brings to the table compared to the native array method alternative, and in this post I will be pointing out what these features are that set ot array from Array.find.

Still it is not to hard to just find something in an array with just plain old javaScript by itself, in many cases the native Array.find method will work just fine, and in some cases it is possible to get it working with array like objects as well. So in this post I will also be writing about some plain old vanilla js ways of finding an object or something to that effect with plain javaScript as well.

## 2 - \_.find vs Array.find

So there seems to be a lot of debate these days where it comes to lodash even being relevant or necessary when it comes to writing modern javaScript. It is ture that a lot of the functionality in lodash is now baked into core javaScript itself. So there are many methods in lodash that are not really needed any more, if a developer is only concerned about supporting modern evergreen browsers as least.

However there are some methods that are not a part of core javaScript at all, and there are many methods where there is a native counterpart, but it works just a little differently, brings some more features, is a little more robust and so forth. That being said the lodash \_.find method is one of those methods and in this section I will be pointing out some of the deferences between \_.find and the native Array.find method.

### 2.1 - Native Array.find overview

So yes there is of course Array.find, and Array.find works just fine with arrays. Just call the find prototype method off of an instance of any plain old javaScript array as with any Array prototype method, and pass a function that will be used to find what it is that needs to be found in the Array.

```js
var arr = ['a',1,'b','c'];
 
var n = arr.find(function(el){
 
   return typeof el === 'number';
 
});
 
console.log(n); // 1
```

In this example I just have a simple array of primitives. I which to just find the first element in the array that is a number. I just need to use the typeof operator when making an expression that will return true when an element is found that is a number. In more complex situations involving arrays of objects for example the function that I pass might be a bot more complex, but you get the basic idea.

### 2.2 - Array.find with Array like objects

It also works well with array like objects when used with call. If you are not aware of what array like objects are they are it is a trem that if often used to describe an object that is formated very much like an Array in that all of the object keys are numbers, and it has a length property. However the so called array like object is not an instance of the Array constructor so it does not have Array prototype methods associated with it.
```js
var obj = {
 
    0 : 'bar',
    1: 42,
    length: 2
 
};
 
var n = [].find.call(obj, function(el){
 
    return typeof el === 'number';
 
});
 
console.log(n); // 42
```

### 2.3 - Lodash \_.find will work with Arrays, Array like Objects and plain old objects in general as well.

However \_.find is a collection method, not an Array method. So in addition to working just fine with Arrays \_.find works with plan old objects as well, even if they are not array like.

```js
var n = _.find({
 
   foo: 'bar',
   n: 42
 
},function(el){
 
    return typeof el === 'number';
 
});
 
console.log(n); // 42
```

Also there is the built in iteration methods that can come in handy. The potential for better backward compatibility with old versions of IE if for some reason that is a concern. Also this is a lodash post, so...

## 3 - What a collection is, and basic example

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

## 4 - The iteration method

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

## 5 - Custom iteration methods and lodash method shorthands

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

## 6 - FromIndex example

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

## 7 - Finding an Object in an Array, a basic usage example of \_.find

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

## 8 - Using \_.find to find the index of an element in an Array, or the key of a property in an Object.

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

This is because strings are also another example of something in javaScript that is kindof Array like, even though it is not an array. Sure it's constructor is String, and not Array as such it does not have array methods in it's prototype. However it can still be thought of as an array of characters.

## 9 - Vanilla javaScript and finding things in an array

Depending on what needs to happen sometimes finding something in an array is really not all that hard. With simple hobby projects and so forth often just a loop and a conditional will get the job done. In some cases I might want to write my my own custom find method when making some kind of module or something to that effect as well. In a previous section I covered the native Array.find method well but in this section I will cover some more ways of finding things with just plain old javaScript by itself.

### 9.1 - Making a crude yet affective find method

So it is not to hard to make a find method that works in a similar way to that of the lodash find method. The for in loop is of course one way to go about looping over the public key value pairs of any object in javaScript. So the for in loop can be used as a way to make a collection method that will work okay for any kind of object, not just Arrays. There are performance concerns with for in, but for many projects it will work okay when performance is not of grave concern.


Making a basic find method with for in might look something like this:

```js
// crude yet effective find method
let find = function (col, forEach) {
    let prop;
    for (prop in col) {
        if (forEach(col[prop], prop)) {
            return col[prop];
        }
    }
    return false;
};
```

```js
// array of objects
let people = [{
        name: 'John',
        age: 32,
        sex: 'M'
    }, {
        name: 'Mike',
        age: 24,
        sex: 'M'
    }, {
        name: 'Jen',
        age: 42,
        sex: 'F'
    }
];
// works with array of objects
var mike = find(people, function (val, key) {
        if (val.age === 24) {
            return true;
        }
        return false;
    });
console.log(mike.age); // 24
```

```js
// Just an object
let obj = {
    foo: 'bar',
    salty: true,
    n: 42
};
 
var aNumber = find(obj, function (val, key) {
        if (typeof val === 'number') {
            return true;
        }
    });
 
console.log(aNumber); // 42
```

## 10 - Conclusion

Many of the methods in lodash provide functionality that is very similar to certain native methods, but often they do bring a little something more to the table.

I have updated this post a few times now, and I will likely update this post again in the future once again at some point. If you are in the mood check out [my other posts on lodash](/categories/lodash/).
