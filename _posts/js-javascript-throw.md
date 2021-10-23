---
title: JavaScript throw statement
date: 2019-03-15 20:07:00
tags: [js]
layout: post
categories: js
id: 402
updated: 2021-10-23 13:43:27
version: 1.49
---

The [javaScript throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw) statement can be used to intentionally throw a user defined exception, or error of you prefer much like the built in errors that will happen now and then. It can be used as a way to stop execution of a javaScript program in the event that some kind of essential condition is not in order, or it can be used with [try catch statements](/2019/03/02/js-javascript-try/), and other means of error handing with custom events rather than just what happens out of the box with javaScript. 

In some cases I might use it as a way to intentionally throw a wrench into a machine sort of speak to stop execution of a program at a certain point as a means of debugging, but as of late I prefer to use alternatives to that to catch a state of affairs as to what is happening at a certain point in time. So for the most part the throw statement is used as a way to define my own errors, but always doing so in a way in which I am making sure that doing so is happening in the body of a try statement. Ether by using throw in a try statement, or in the body of a function that I am passing as an argument to something where try statements are being abstracted away.

So lets take a look at some examples of the javaScript throw keyword in action when it comes to working a few things out with native javaScript. There may only be so much to write about when it comes to the throw keyword itself, but there sure is a lot that branches off from the use of it.

<!-- more -->

## 1 - javaScript throw basics

In this section I will be going over just the basics of the javaScript throw statement for throwing user defined Errors. The basic process is to just type throw followed by one of several options when it comes to some kind of value after the throw statement. Although there is more than one option it might be best to just go with objects, this allows for defining not just an error message, but other properties such as a standard error name that might be a better option for error handing later on.

I will be trying to do my best to keep these examples fairly simple, in this section at least, but I still assume that you have at least some background when it comes to the very basics of javaScript itself. If not you might want to take a step back and read up more on [getting started with javaScript](/2018/11/27/js-getting-started/) as I am not going to cover every little detail that you should know before hand here.

### - These source code examples and many more are on github

The source code examples in this post can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-throw) on Github, along with all the other source code examples for my [series of posts on various vanilla javaScript](/categories/js/) topics.

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

In the event that an error happens by passing any value that is not a number for one or more of the arguments, the throw statement will be reached, the user defined error will happen, and this will stop the execution of the rest of the code in the function. So the throw statement will have a similar effect to that of the return keyword in the body of a function where it will cause any additional code afterward to not run.

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

## 2 - javaScript throw and try catch blocks

When an Error is thrown in a [try block then any catch block](/2019//03/02/js-javascript-try/) present with that try statement will of course be executed which can be used to handle the Error. This is something that should be used either directly, or indirectly when causing user define errors with the throw statement. That is unless for one reason or another I want the program as a whole to halt, which would end up being the case if there are no catch stamens that will prevent that from happening.

### 2.1 - A Basic try catch example

So for a basic try catch example with the throw keyword there is just starting with a clean try an catch block, and throwing a user define error in the try block. The catch block will then run and the value that is given when using throw will be valuable as an argument for the catch block. Although this value does not have to be an object, it is generally a good idea to stick with objects, and event going to far as to imitating certain standards with error objects such as using the Error constructor. At a minimum the object should at least have a message property.

```js
try {
    throw new Error('user error');
} catch (e) {
    console.log(e.message); // 'user error'
}
```

### 2.2 - A Basic try catch example

In this example I am using throw in the body of a function, and then calling that function in the body of a try block. This will result in the catch block firring also.

```js
var process = function (str) {
    if (str === 'bar') {
        console.log('foobar');
    } else {
        throw {
            message: 'must give bar',
            name: 'NoBarError'
        };
    }
};
 
try {
    process('foo');
} catch (e) {
    console.log(e.message); // 'must give bar'
}
```

### 2.3 - High order function example

So then because the throw keyword can be used in the body of a function that will trigger and catch block if the function is being called in a try block that corresponds to the catch block this opens up a lot of possibles when it comes to writing higher order functions. For example I can make some kind of high order function that works in a similar way to some of the basic features of [Promises when it comes to the whole resolve and reject](/2019/09/18/js-promise-resolve-reject/) aspect of them.

```js
// high order function that takes functions as arguments
// and uses a try catch when calling them
var highOrder = function (func, resolve, reject) {
    var result = { pass: false, mess: '' };
    try {
        result.mess = resolve( func() );
        result.pass = true;
    } catch (e) {
        try {
            result.mess = reject(e);
        } catch (e) {
            result.mess = e.message || 'reject method error with no message';
        }
    }
    return result;
};
// resolve and reject methods
var resolve = function (res) {
    return res;
};
var reject = function (e) {
    return e.message;
};
// error demo
var result = highOrder(function () {
        throw new Error('Causing an error in the first function');
        return 'foo'
    }, resolve, reject);
console.log(result); // { pass: false, mess: 'Causing an error in the first function' }
// no error demo
var result = highOrder(function () {
        return 'foo'
    }, resolve, reject);
console.log(result); // { pass: true, mess: 'foo' }
```

## 3 - Using throw with an Error constructor

In the basic section of this post I went over an example where I am passing an object as the value to use for the throw statement. This is generally a good idea because it allows for me to attach additional useful information with it comes to handing an error when it happens.

In core javaScript there is a generic Error constructor that can be used as a standard way to create an [Error object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error). This object can be used as a way to know what the core properties of an error object are, but there can potential be more than just the message and name values.

### 3.1 - The basic Generic Error object constructor

So when  it comes to the [generic Error constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error) the constructor can be called with or without the new keyword actually. Many code examples will involve the use of the new keyword when using it, but the same result is achieved with or without the use of it. When calling it the first argument given should be the message for the Error.

```js
try {
    throw Error('this is a custom error object');
} catch (e) {
    console.log('name: ', e.name);
    console.log('message: ', e.message);
}
// name: Error
// message:  this is a custom error object
```

This might be a good starting place when it comes to using an Error constructor, however the name of the Error object that is just simply _Error_ is not always so helper when it comes to classifying the different types of errors that can happen in a program.

### 3.2 - RangeError constructor

There is a built in [RangeError constructor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError) which can be used to define a typically type of error thats has to do with a given value being outside of an expected range.

However typically some additional checks need to be preformed before hand when it comes to a javaScript environment. First off I would want to do a check to make sure that the value that is given is in fact a number to begin with, and if not throw a typeError. In the event that the value given is in fact a number I might want to still preform a check for NaN, and throw an Error for the type of situation that might happen.

```
var checkNum = function (n) {
    if (typeof n != 'number') {
        throw TypeError('must give a number');
    }
    if (String(n) === 'NaN') {
        throw Error('value is a number, but is NaN');
    }
    if (n < 0 || n >= 10) {
        throw RangeError('must give a number between 0 and 9');
    }
    return n;
};
 
try {
    checkNum(25);
} catch (e) {
    console.log(e.name);
    console.log(e.message);
}
/*
RangeError
must give a number between 0 and 9
*/
```

## 4 - Using promises and the throw keyword

When using a [Promise](/2021/10/22/js-promise/) there is calling the resolve or reject methods in the body of a function that I pass to the Promise constructor that I call with the new keyword. When I call the reject method I pass an Error object that will be accessible as an argument for the next catch function call in the returned promise object. However another way to get the next catch block to call is by just throwing any kind of exception in the body of the function, this two will seem to work fine and cause the next catch function call to fire that can then be used as a way to handle the error.

### 4.1 - Basic promise example

So when I write a promise I often call the reject method inside the body of the function that I give to the constructor. When I d so I typically pass an Error object that will be the nature of the reason as to why the promise is to be rejected. However I can also just use the throw keyword in the body of the function without calling anything that will also serve as a way to trigger the next catch call in the promise chain.

```js
new Promise(function (resolve, reject) {
    reject(new Error('Calling reject'));
})
.catch(function (e) {
    console.log(e.message); // 'Calling reject'
});
 
new Promise(function (resolve, reject) {
    throw new Error('Just using throw, and not calling anything.');
})
.catch(function (e) {
    console.log(e.message); // ''Just using throw, and not calling anything.''
});
```

## 5 - Global Error handers and throw

There is also the question of how to go about creating global error handers for a script in nodejs as well as in client side javaScript. That is to have a way to define some logic that will fire in the event that any kind of error happens in a web page, or in a nodejs script. In this section I will be going over some examples that have to do with creating some kind of final catch all in javaScript then when using the throw keyword.

### 5.1 - In nodejs the default of what happens when using throw in

By default when making a nodejs script if I use the throw keyword in the top level any code after that will not file at all. On top of that the default action of nodejs for this kind of error is to print what happened to the standard error, and then call the process.exit method with a status code of 1.

```js
// loop using setInterval
let count = 5;
let t = setInterval(function () {
        count -= 1;
        console.log('count: ' + count);
        if (count === 0) {
            clearInterval(t);
        }
    }, 1000);
// Throwing an error will cause the script to stop working
// the console.log below will not print, and on top of it the loop
// above will not work also
throw new Error('Throwing an error outside of any try');
console.log('This will not print');
```

So what if I want something else to happen in this kind of situation? Such as setting the exit code to some other kind of code other than 1, of maybe even not call process.exit at all actually? With that said at least a one if not more examples are called for when it comes to this sort of thing then.

### 5.2 - Using an event hander in which I DO NOT call process.exit

In nodejs I can use the on method of the process object to attach an event handler for the _uncaughtException_ event. When doing so I will want to make sure that I attach the event first before any kind of situation happens involving throw that might not be handled. Inside the body of the handler I can do something other than one the default is for an manhandled error, such as printing to the standard output rather than standard error, an choosing to not call the process.exit method at all actually.

```js

// setting an new uncaughtException handler to which
// I AM NOT calling process.exit
process.on('uncaughtException', (e) => {
    console.log('An Error has happened: ' + e.message);
});
// loop using setInterval
let count = 5;
let t = setInterval(function () {
        count -= 1;
        console.log('count: ' + count);
        if (count === 0) {
            clearInterval(t);
        }
    }, 1000);
// Throwing an error will cause the console.log below to not print
// but the above loop will continue until it is done.
throw new Error('Throwing an error outside of any try');
console.log('This will not print');
```

Choosing not to call process.exit at all is what I have decided to do here, as a result the console.log at the bottom of the script will still not fire because of the throw statement. However the loop continues until the count of zero is reached, at which point the script then exits.

### 5.3 - Client side javaScript example of a global error handler

```html
<html>
    <head>
        <title>js throw</title>
    </head>
    <body>
        <script>
// make sure to attach first
window.addEventListener('error', function(e){
    console.log(e.error.code);
    console.log(e.error.message);
});
// then throw
var err = new Error('user error');
err.code = 'EUDERR'
throw err;
        </script>
    </body>
</html>
```

## 6 - Conclusion

So the javaScript throw statement is what is used in javaScript to throw a custom user define error. However it is just one thing that comes to mind when it comes to creating and working with user defined errors. There is not just creating error objects after all, but also how to go about handling them. The javaScript try and catch blocks can be used as a way to define some code that will run in the event that a user define error happens. However there is not always just working with the try catch statement directly, as another option is to use some kind of promise library such as [bluebrid](/2017/12/02/nodejs-bluebird/), or even native Promise objects now that are ways of going about abstracting that away.


