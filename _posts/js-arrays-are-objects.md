---
title: Array like objects and Arrays are Objects in JavaScript examples and explanations.
date: 2017-05-12 07:59:00
tags: [js]
layout: post
categories: js
id: 18
updated: 2021-04-01 15:39:43
version: 1.13
---

In core javaScript [Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) are technically not Arrays, but [Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), that is that an array is a kind, or class of an object. The thing about Arrays that are made with the core js Array constructor, or literal syntax, is that they are a special kind of object in which the objects constructor name is Array. This also means there there are a bunch of array prototype methods that can be used with that instance of Array also. However there are also array like objects in addition to Arrays. What this means is that if any object contains a length property that has a value that is a number from 0 to the max safe integer, then it is "Array like" and can be used with methods that act on arrays. If you are confused then in this post I will try to help reduce some of this confusion, and of course it will be best for you to just work out some examples of your own when it comes to learning by doing.

<!-- more -->

You can gain a better sense of what is going on by checking out what the constructor is of an Object.

```js
console.log( [].constructor.name ); // Array
```

Any object created with the Array literal notation, like in the above example, will result in an object that is an instance of Array, and therefore has Array methods like splice, slice, and join in it's prototype.

## 1 - Making a plain old object like an Array.

It is possible to make just a plain old object with the object literal notation, and call Array methods on it using call. One way to do so would be to just create a plain object like always, but make some public keys that are numbers rather than named. The next step would be to add a length property that will be the max number of elements for the array. I now have an object that is not really an array, but it is an array like object that is formated like one. So then I can use the object with an array prototype method by calling the call method of the array prototype method that i would like to use with such an object.

```js
// make an object like this
var obj = {

   0 : 'one',
   1 : 'two',
   2 : 'three'
   
};

// set a length property, with its value equal to the number of keys.
obj.length = Object.keys(obj).length

// it's constructor is Object, not Array.
console.log( obj.constructor.name );

// because it is not an array it does not have array methods like slice in it's prototype, but we can use Array methods on it by using call.
console.log( [].slice.call(obj,1,3) );
```

So it is not an Object with a constructor name of Array, but if it is formatted in a certain way it can still be used as an Array. Often you may come across something in javaScript that looks like an Array, but is really just a plain old Object, or an instance of some other constructor function such as HTMLCollection.

The call function prototype method is pretty useful for these kinds of situations then, there are some additional such methods in the function prototype that are also work checking out. However getting into these methods in detail would be a bit off topic. If you would like to read up more on [call, apply, and bind function prototype methods I do have my post](/2017/09/21/js-call-apply-and-bind/) on that topic just like every other javaScript developer that runs a blog for that matter. This is just one of the many little parts of the language that one ends up getting around to at one point or another.

## 2 - The arguments object in functions.

An example of an Array like Object that is not an Array is the [arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) object in functions. Every time a function is called there is an arguments object that is Array like in the sense that each of the arguments that you pass to the function is in it, in a fashion where the first argument is in a property called '0', and the second argument is in a property called '1', and so forth. In addition it even has a length property just like an Array, but it is not.

```js
 
func(1,2,3);
 
function func(one,two,three){
 
    console.log(arguments[1]); // 2
 
    console.log(arguments.length) // 3
 
    console.log( arguments.constructor.name ); // Object (not an Array)
 
    // we can use call to invoke an Array method on it.
    console.log( [].splice.call(arguments,1,2) ); // [2,3]
 
};
```

## 3 - HTMLCollection Objects

Another example of Array like Objects that are not Arrays are instances of [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection). This is what you end up with when you use a method like document.getElementsBytagName to get a collection of HTML DOM element references in a document, when it comes to client side javaScript. These values might seem to be arrays, but they are very much not. When it comes to working with a collection like this it is a good idea to use the dom methods to do things like removed and append elements to such collections.

Say you just have some simple paragraph elements.

```html
<p>one</p>
<p>two</p>
<p>three</p>
```

Some native javaScript methods will return an instance of [HTMLCollection](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCollection), which is another example of an Array like object that is not an instance of Array, and as such does not have Array methods in it's prototype.

```js
var p_tags = document.getElementsByTagName('p');
 
// you can use it like an Array
console.log(p_tags[0].innerText); // one
 
// we have length
console.log(p_tags.length); // 3
 
// but it is not an Array
console.log(p_tags.constructor.name); // HTMLCollection
 
// still we can use read Array methods on it
console.log( [].slice.call(p_tags,1,3)[1].innerText ); // three
```

Again to some extent you can call Array methods on them, as long as the are read only methods, methods such as splice will cause an error, you need to use appropriate DOM manipulation methods to edit HTML.

## 4 - Making an Array Object like

Because Arrays are objects you can treat them like so. We have covered some examples of how you can treat Plain Objects, or any Object that is Array like, like an Array. How about treating an Array like an Object by adding some named keys to the object though.

```js
var array = [ 'one' , 'two'];
 
array.three = 3;
 
// so the element length is only 2
console.log(array.length); // 2
 
// but the keys length is 3, as expected
console.log(Object.keys(array).length) // 3
```

When doing so this will result in the length of the array still remaining what the actual numbers index value of elements is. If I add named keys to the array it will not effect that. However adding numbers keys might impact that of course. The thing about this is that even though this can be done in javaScript that does not meed that doing so is a good idea. I would generally stay away from doing things like this.

## 5 - Conclusion

I hope this post has helped to address some confusion when it comes to arrays in javaScript and why they seem to be more or less just like objects in general. Part of the reason why that is can be explained by saying that they are in fact a kind of object rather than this whole other kind of data type all together which might be the case in other languages.

At times it might event seem that everything in javaScript is an object, I hear people saying such things now and then but that just simply is not true. JavaScript does very much have primitive values, and all though things like a string value might seem to be an object, this object is just a wrapper of the primitive value.

