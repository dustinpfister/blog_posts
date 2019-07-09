---
title: JavaScript alert for messages and alternatives
date: 2019-01-07 18:59:00
tags: [js]
layout: post
categories: js
id: 357
updated: 2019-07-09 12:20:52
version: 1.17
---

When starting with javaScript alert is something that often comes up in many examples found on the Internet as a way to log something. It works okay for that when it comes to thous kinds of simple projects where a developer is just starting to learn javaScript for the first time, but there are other options for logging as well with client side javaScript such as console.log, which also works just find in a node.js environment. In this post I will be giving a quick overview of the [window.alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) method in client side javaScript as well as a few other alternatives for logging things to know it they are working as expected or not

<!-- more -->

## 1 - javaScript alert for logging

In many basic javaScript examples that aim to help people that are new to javaScript get started. The window.alert method is often used as a way to log the result of something so that the developer can confirm that the little javaScript example is working. So that being said one of these simple javaScript examples might look something like this.

```js
<html>
    <head>
        <title>javaScript alert</title>
    </head>
    <body>
        <script>
 
// alert can be used as a way to log
// something to make sure it is working
// as exspected
var n = 40 + 2;
alert(n >= 40); // true
 
        </script>
    </body>
</html>
```

The alert method is a property of the window object so there is no real difference between window.alert, this.alert, and just plain alert by itself. So that is just about it when it comes to using alert, just pass in what you want to log and it should alert out to you.

However with some javaScript examples it can get annoying to have a whole much of alerts happen one after another, luckily there are many other ways to log something to confirm that it is working in both a browser and node.js environment. Also when it comes to using alert in an actual production app of some kind there is a whole range of options that come to mind when it comes to alerting a user that something has happened.

## 2 - javaScript alert alternatives

The javaScript alert method might come in handy now and then, but for the most part I would avoid using it for production projects, and also I would not even use it for debugging in most cases as well. There are many other ways to go about displaying a message, for the purpose of debugging or informing a user of something so lets look at some alternatives to javaScript alert.

### 2.1 - console.log

The console.log method is a favorite for me and many other developers, it will of course log to the javaScript console rather than log a message as an alert box.

```js
console.log('log a message');
 
var a = (5 + 3) * 10,
b = 20;
 
// can log a var
console.log(a); // 80
 
// can log more than one thing in a single call
console.log(a, b, 'foo'); // 80 20 'foo'
 
// expressions
console.log(a + b); // 100
 
//and objects
console.log({
    x: 60,
    y: 40
});
```

### 2.2 - innerText

When it comes to displaying a message in a html document there are a wide range of alternatives to using yet anotherjavaScript alter as a way to gain a sense of what is going on with what you are working on. I will cover a few of them in this section, and and for starters there is the innerText property.

```js
<html>
    <head>
        <title>javaScript alert innerText alternative</title>
    </head>
    <body>
        <div id = "out"></div>
        <script>
// get a ref to the element by any means
// possible
var out = document.getElementById('out');
 
// the innerText property can be used to set or get
// the inner text node of an element
out.innerText = 'This can be used to set a message';
 
        </script>
    </body>
</html>
```

## 3 - Writing a custom log function in place of using javaScript alert

Maybe one of the best alternatives to using javaScript alert for the purpose of logging something for the purpose of debugging might be to have some kind of custom log method. This is something that I see going on in a log or projects and when I think about it for a second it makes a whole lot of sense. I can define the custom log method in an external javaScript file and then link to it in any page or module, and redefine what the logic of the custom log method is not and then when necessary.

### 3.1 - Simple custom log function using console.log

So here I have a basic custom log method using console.log in place of the javaScript alert method. This way I can do whatever I want with the message that is passed, such as displaying the public properties of an object in a custom way.

```js
let log = (mess) => {
 
    // log objects in a different way
    if (typeof mess === 'object' && mess != null) {
        Object.keys(mess).forEach((key) => {
            console.log(key + ' : ', mess[key]);
        });
        return;
    }
 
    // if we get here just log like this
    console.log(mess)
};
```

Once I have my custom log method defined I can then use it anywhere in my project where doing so is needed.

```html
<html>
    <head>
        <title>javaScript alert innerText alternative</title>
    </head>
    <body>
        <script src="log_function.js"></script>
        <script>
log('foo');
log(null);
log({x: 40, y: 2});
        </script>
    </body>
</html>
```

## 4 - Conclusion

So a javaScript alert in client side javaScript might be okay for some hello world examples, and also maybe the use of it is called for with some actual projects as well. However there are still often better alternatives when it comes to letting the user know that something is up. Also when it comes to debugging there are a wide range of better options that are far more useful, even beyond that of just console.lof by itself.