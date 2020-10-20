---
title: JavaScript throw statement
date: 2019-03-15 20:07:00
tags: [js]
layout: post
categories: js
id: 402
updated: 2020-10-20 08:47:49
version: 1.17
---

The [javaScript throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) statement can be used to intentionally throw a user defined exception or error much like the built in errors that will happen. It can be used as a way to stop execution of a javaScript program in the event that some kind of essential condition is not in order, or it can be used with [try catch statements](/2019/03/02/js-javascript-try/), and other means of error handing with custom events rather that just what happens out of the box with javaScript. 

In some cases I might use it as a way to intentionally throw a wrench into a machine sort of speak to stop execution of a program at a certain point as a means of debugging, but as of late I prefer to use alternatives to that to catch a state of affairs as to what is happening at a certain point in time. So for the most part the throw statement is just used in the process of making custom errors.

So lets take a look at some example of the javaScript throw keyword in action.

<!-- more -->

## 1 - javaScript throw basics

In this section I will be going over just the basics of the javaScript throw statement.

### 1.1 - javaScript throw basics

To use a throw statement in a basic way where just a string is passed as a value for an error message just type the throw keyword followed by the string value that reflects what the error is about. For example I could have an add numbers method that will throw and error if I pass it a value other than a Number. In the body of the method I just use the typeof operator in an expression that will be used in an if statement. If the type of either value given to the add numbers method is not number then the JavaScript throw statement is used to throw an error where I am just passing a string that describes the error.

```js
var addNumbers = function (a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw 'must give numbers';
    }
    return a + b;
};

console.log( addNumbers(15,5) ); // 20
addNumbers('foo', []); // Error must give numbers
```

The value can be a string, number, boolean, or an object that should be given certain standard key value pairs, more on that later. For now you should get the basic idea at least, the throw statement will cause an error to happen, and then an additional value can be passed as a way to shed some light on what that error is.

### 1.2 - javaScript throw defined with an object

So a string can be used to describe the user defined Error, but it might be best to use an Object or The [Error constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error) to create an object with message and name properties that help to better identify what is wrong when the Error is thrown. This standard object of sorts can be called you guessed it an [error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error) that contains properties like message that is used to set the string message of the error, but also properties like name, line number, and so forth

```js
throw {
    message: 'this error is defined with an object',
    name: 'ObjectDefinedError'
}
// ObjectDefinedError: this error is defined with an object
```

So now that we know how to create errors with the javaScript throw statement, maybe now is the time to cover a thing or two about some basic error handling.

## 3 - javaScript throw and try catch blocks

When an Error is thrown in a try block then any catch block present with that try statement will of course be executed which can be used to handle the Error.

```js
var process = function (str) {
    if (str === 'bar') {
        console.log('foobar');
    }
    throw {
        message: 'must give bar',
        name: 'NoBarError'
    };
};
 
try {
    process('foo');
} catch (e) {
    console.log(e.message); // 'must give bar'
}
```

## 4 - Conclusion

So the javaScript throw statement is what is used in javaScript to throw a custom user define error. However it is just one thing that comes to mind when it comes to creating and working with user defined errors. There is not just creating error objects after all, but also how to go about handling them. The javaScript try and catch blocks can be used as a way to define some code that will run in the event that a user define error happens.
