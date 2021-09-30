---
title: JavaScript NaN (Not a Number) and the isNaN methods.
date: 2017-09-23 16:46:00
tags: [js,corejs]
layout: post
categories: js
id: 42
updated: 2021-09-30 11:48:20
version: 1.21
---

In [JavaScript NaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN) is an weird number value in javaScript that means [Not A Number](https://en.wikipedia.org/wiki/NaN), but yet the type of the value is Number. So yes if the [type of operator](/2019/02/15/js-javascript-typeof/) is used with a NaN value that type is indeed number. However that is not the last thing that is a little weird about the NaN value in javaScript.

This value has some unique things going on with it aside from the fact that the data type is a Number, yet it is called Not A Number. For one thing it does not equal anything, including itself, which means that special methods must be used to test if a value is NaN or not. On top of that there are problems with the native and user space methods that are used to test for NaN that a javaScript developer needs to look out for. Many of them will return what many will observe as a false positive for certain values other than NaN, such as the undefined value, which in turn further complicating the process of testing for NaN.

The value will come up now and then often as a result of an expression, when something in that expression ends up being undefined or a sting value that can not parse to a number, and thus ends up being the NaN value. So the existence of the NaN value is closely tied with the typeless nature of javaScript when it comes to working out expressions involving numbers and strings. When values such as these are combined with math operators such as Multiplication then the resulting value will be NaN. So there is a need to know how to account for the possibility of JavaScript NaN being a possible value, and how to deal with it when working out some code.

<!-- more -->

## 1 - JavaScript NaN basics

In this section I will just be going over some basics with the NaN number value in native core javaScript. So then this section will just focus on how it is possible to end up with a NaN value to begin with, and also certain aspects of the value itself that is a bit odd. I will be keeping this examples fairly basic in this section of course, but I still assume that you have at least some background when  it comes to [getting started with javaScript](/2018/11/27/js-getting-started/). I also often use this section to bring up various things that you might want to know also before continuing to read the rest of the post.

### 1.1 - The source code examples here are on github

The source code examples here can be found on my [Github test vjs](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-nan) repository. All the source code for my various other posts on javaScript in general can also be found there.

### 1.1 - Some ways to end up with a JavaScript NaN value

First off there are a number of ways to end up with the value of NaN to begin with. For example dividing the value of zero by zero will result in NaN. Another way to end up with NaN would be to multiply a string that can not effectively be converted to a number value. There is also just the plain old javaScript NaN literal that will directly result in the value of NaN.

```js
console.log(0/0); // NaN
console.log(1 * 'foo'); // NaN
console.log(NaN); // NaN
```

So now that we have some basic ways of knowing how to end up with NaN figured out lets look into the ways to go about knowing if we have a NaN value, and so forth.

### 1.3 - Not a Number is actually a Number

The NaN value is an acronym for _Not-a-Number_, but yet using the typeof operator with a NaN value will result in the type of _number_ . The reason for this has to do mainly with javaScripts typeless nature when it comes to what values a variable can contain. In javaScript a variable can be a number value, but at any moment that same variable can end up storing a string value for example.

So when it comes to evaluating expressions, it is possible for a variable that should hold a number will in fact end up storing a string value. This is not always a problem if the string value can effectively be converted to a valid number value, unless for some reason it can not be, in which case the NaN value is a result. So this Not a Number value typically means that somewhere a string value failed to property convert to a Number value, and thus the value is Not a Number, but the type of NaN is still a Number. It is a bit confusing but the term Not a Number means the value from which the Number was converted from, rather than the type of the NaN value.

```
let n = NaN;
 
// The Not a Number value is in fact actually a Number
console.log(typeof n); // 'number'
 
// So because NaN is a Number, Number prototype methods
// such as Number.toFixed can be used with a NaN value
console.log(n.toFixed(2)); // NaN
 
// This Fact can also be used as a way to help
// test for NaN
let isValueNaN = (a) => {
    if (typeof a != 'number') {
        return false;
    }
    if (String(a) === 'NaN') {
        return true;
    }
    return false;
};
 
console.log( isValueNaN(n) ); // true
console.log( isValueNaN('NaN') ); // false
console.log( isValueNaN(undefined) ); // false
console.log( isValueNaN(null) ); // false
```

So because the NaN is a number methods that are part of the Number prototype can still be used with a NaN value such as the Number.isFixed method. In addition to this the fact that NaN is a number can be used to ones advantage when it comes to making a user space is NaN number. The type of the value can be checked first, and if the type if not _number_ return false right away. After we have found that the value is not a string we can not convert the value to a String, and test if the result of that is equal to the string _NaN_ if so return true. If all else fails assume that the type is number and that the value of the number is not NaN so return false.

### 1.2 - The NaN value does not equal itself

What is strange about NaN is that it does not equal anything, not even itself. Because of this it makes testing for NaN a little move involved then just using the equality or identity operators to do so. There is a well supported native method called isNaN, but also Number.isNaN both of which work differently, more on that later.

```
console.log(NaN === NaN); // false
```

So now we have the basics of NaN out of the way. The NaN value is something that can end up happening as a result of an expression where proper filtering and type checking is not preformed. In addition if we have a NaN value ot is not always so easy to test for it, so special methods are needed to find out if a value is NaN or not.

## 2 - The native javaScript isNaN method

So to some extent the [native javaScript isNaN method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN) works as expected, but it also returns true for values that are not NaN, such as undefined.

```js
isNaN(12); // false
isNaN(NaN); // true
isNaN(undefined); // true
```

This behavior may not be wrong necessarily because in a way values like undefined, and null are Not Numbers also of course. Still it may not really be the behavior that is expected when using a method called isNaN as often the expectation might be that the method should only return true when a value is NaN and only NaN. So with that said lets look at some more options when it comes to finding out if a Value is NaN.

## 3 - The Number.isNaN method

So the [Number.isNaN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) method works as expected if what is expected is for the method to return true only if the given value is NaN and only NaN.

```js
Number.isNaN(12); // false
Number.isNaN(NaN); // true
Number.isNaN(undefined); // false
Number.isNaN(null); // false
```

The only problem with Number.isNaN is that it does not work on any version of IE, there is no support at all. So then this might be a reason why you might want to use some kind of user space option for testing for NaN if you care about supporting those older platforms for some reason. With that said lets look at making a user space option as that is nit so hard to do   when it comes to working out a quick user space solution.

## 4 - Writing an isNaN method

When going vanilla js style with a project, a method that tests for NaN might need to be part of your micro frame work. Making a method to do this is not so hard, one way is to just return false if any type other than a Number is given, then convert to a String and test against the String 'NaN'. In the off chance that the string 'NaN' is given then it will return false because the type is is a String, and thus will not get to the part where we are converting the string value to a string. So in this section I will be going over some user space examples of testing for NaN, that mainly take this kind of approach.

### 4.1 - The example from the basic section

In the basic section I covered this user space example right here.

```
let isValueNaN = (a) => {
    if (typeof a != 'number') {
        return false;
    }
    if (String(a) === 'NaN') {
        return true;
    }
    return false;
};
```

This might work okay when it comes to having a vanilla javaScript is NaN method, but it can be crunched down a little.

### 4.2 - Crunching it down a little

One step forward might be doing something to not need to additional second if statement.

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

This seems to behave like that of Number.isNaN, but will work on old browsers. It seems to work okay, but maybe you might prefer to use the method that exists in lodash that makes use of the fact that NaN is the only primitive value that does not equal itself. Also there is the idea of just using whatever it is that they are using in lodash as a single stand alone method, or in one way or another find out a simple single expression type solution for this.

### 4.3 - slick one line example

Taking a moment to look at the source code of the popular javaScript framework know as lodash, I found a isNan method that looks like this:

```js
var _isNaN = function(n) {
    return isNumber(n) && n != +n;
}
```

So of course this is a Nice slick one liner. On top of that this kind of method makes use of the Nature of NaN not equaling itself. However the check for the number type still needs to be preformed because the string value of 'NaN' will still return true.

### 4.4 - Monkey patching Number.isNaN

Monkey Patching is generally frowned upon, but generally only if you are extending built in Objects with non standard methods. In this case monkey patching Number.isNaN support is just making sure that something that should be there is there.

```js
Number.isNaN = Number.isNaN || function(n){

   return isNumber(n) && n != +n;

};
```

## 6 - Conclusion

So the javaScript NaN value is often the result of faulty operations such as multiplying a number by a string that can not effectively be converted to a number value. The value can often end up being the result of certain function calls and so forth especially when taking values from user input, so parsing of value should be handled well, or testing for NaN should be preformed.

Sooner or later I will be getting around to editing and expanding this post a bit more, however I think there is only so much more to cover. I think that in the future the only thing left to do would be to just write a bit more about various code examples that typicality result in NaN values, and additional ways to not just test for NaN but also to prevent it from happening to begin with.

