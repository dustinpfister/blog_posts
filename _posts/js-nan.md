---
title: Help with confusion over javaScripts Not a Number (NaN), and the isNan methods.
date: 2017-09-23 16:46:00
tags: [js,blog,corejs,lodash]
layout: post
categories: js
id: 42
updated: 2017-09-24 10:37:57
version: 1.1
---

In JavaScript there is a special number value that happens as a result of a math operation with a String, or a variety of other situations such as division of zero over zero. 

<!-- more -->

## The nature of NaN

```js
console.log(0/0); // NaN
console.log(1 * 'foo'); // NaN
console.log(NaN); // NaN
```

What is strange about NaN is that it does not equal anything, not even itself. Because of this it makes testing for NaN a little strange. There is a well supported native method called isNaN, but also Number.isNaN both of which work differently.

## isNaN

So to some extent isNaN works as expected, but it also returns true for values that are not NaN, such as undefined.

```js
isNaN(12); // false
isNaN(NaN); // true
isNaN(undefined); // true
```

this behavior is not wrong in a way values like undefined, and null are Not Numbers, but it still may not really be the behavior that is expected.

## Number.isNaN

So the Number.isNaN method works as expected if what is expected is for the method to return true only if the given value is NaN and only NaN.

```js
Number.isNaN(12); // false
Number.isNaN(NaN); // true
Number.isNaN(undefined); // false
Number.isNaN(null); // false
```

The only problem with Number.isNaN is that it does not work on any version of IE, there is no support at all. So this is why it makes sense to use the isNaN methods given in a utility library like [lodash](/tags/lodash/).

## Writing an isNaN method

When going vanilla js style with a project such a method might need to be part of your micro frame work. making a method to do this is not so hard, one way is to just return false if any type other than a Number is given, then convert to a String and test against the String 'NaN' in the off chance that the string 'NaN' is given then it will return false because it is a String. Whatever something like this.

```js
var _isNaN = function(val) {

  // not a number? than false.
  if (typeof val !== 'number') {
    return false;
  }

  // convert to String and test against the String 'NaN'
  return val + '' === 'NaN';

};
```

This seems to behave like that of Number.isNaN, but will work on old browsers. It seems to work okay, but maybe you might prefer to use the method that exists in lodash that makes use of the fact that NaN is the only primitive value that does not equal itself.

```js
var _isNaN = function(n) {
    return isNumber(n) && n != +n;
}
```

Nice slick one liner.

## Monkey patching Number.isNaN

Monkey Patching is generally frowned upon, but generally only if you are extending built in Objects with non standard methods. In this case monkey patching Number.isNaN support is just making sure that something that should be there is there.

```js
Number.isNaN = Number.isNaN || function(n){

   return isNumber(n) && n != +n;

};
```