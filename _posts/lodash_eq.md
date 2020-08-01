---
title: lodash eq method, Object.is, SameValueZero, equality, and identity
date: 2019-12-04 12:01:00
tags: [lodash]
layout: post
categories: lodash
id: 576
updated: 2020-08-01 16:36:06
version: 1.10
---

So there is the [lodash eq](https://lodash.com/docs/4.17.15#eq) method that is one way of finding out the [same value zero result](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero) of two values. However what is same value zero, and is it all that hard to get the same result in native javaScript itself these days? 

Well in ECMA2015 spec javaScript the [Object.is](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) static method was introduced that does indeed do the same thing as the lodash eq method. So if this is the only thing that you care about in a project, maybe a simple polyfill will do just fine and you can ditch lodash to the curb. Otherwise the lodash \_.eq method can do more or less the same thing if you are still keeping lodash as part of your projects stack becuase of client support concerns, or other method of interest that are not native in any javaScript spec. 

Regardless of what you attitude is with lodash these days I will make this post also about Same Value Zero in general so that this is not just a post on lodash eq alone.

<!-- more -->

## 1 - lodash eq basic example

So when comparing two values there is the equality operator and then the identity operator. I will not be getting into detail about two two different operators when it comes to finding out if two value are equal or not here, as I have wrote a [blog post on the equality and identity operators](/2019/02/06/js-javascript-equals/) before hand. However I will say that these to operators do the same thing which is comparing two values to see if they are equal, but they do so in very different ways. In addition because they preform equality in very different ways they will not always return true and false for the same set of values in some certain situations.

So the lodash eq method is yet another way of comparing two values to see if they are equal, but it also follows a different way of determining equality. For example the lodash eq method will return true even when comparing two values that are NaN, something that will result in a false value for equality and identity.

```js
console.log( NaN == NaN ); // false
console.log( NaN === NaN ); // false
console.log( _.eq(NaN , NaN) ); // true
```

Finding out if a value is NaN or not has been a bit of a rabbit hole in javaScript for a while, and to some extern I guess it still is. It is a value that does not equal any other value even itself, meaning that an expression that compares to values together with equality or identity alone will evaluate to false if any of the two values are NaN even if they are both NaN. Even the methods that are used to find out if a Value is NaN or not have issues, but that is a matter for another post. In any case the point here is that the lodash eq method will return true if both values or NaN, it will also work with other situations like this that would otherwise result in a false value.

## 2 - Object is and polyfill

The native javaScript equivalent to the lodash eq method is the object is method. The method works in more or less the same way, call the Object is method and pass two values to compare as arguments. If you wan to use this method in place of lodash eq it might still be a good idea to use a polyfill for it as it is still a new feature, and browser support is not so great thus far.

```js

Object.is = Object.is || function (x, y) {
    if (x === y) { 
        return x !== 0 || 1 / x === 1 / y;
    } else {
        return x !== x && y !== y;
    }
};

console.log( 0 == -0 ); // true
console.log( 0 === -0 ); // true
console.log( Object.is(0 , -0) ); // false
```

## 4 - Conclusion

So that is about it for now when it comes to the lodash eq method as a way to go about getting the same value zero value of two values with lodash, and javaScript by itself. Simply but the lodash eq method is just yet another way to go about finding out if two values are equal to each other or not that might yield different results in certain situations.