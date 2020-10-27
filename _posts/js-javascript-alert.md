---
title: JavaScript alert for messages and alternatives
date: 2019-01-07 18:59:00
tags: [js]
layout: post
categories: js
id: 357
updated: 2020-10-27 17:02:01
version: 1.30
---

When first starting out with front end javaScript code examples the [javaScript alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) method is something that often comes up on the open Internet as a way to log or display something. This might be okay for very basic code examples, but will quickly get annoying, and thus it makes sense to look into other ways to go about alerting the user to something.

There are many other options for what the javaScript alert method is typically use for that might prove to be more practical. There is the console.log method for course that will often prove to be a better choice for debugging, but even that might prove to fall short in some situations. I often find myself making use of dom manipulation methods, to create some kind of view for the current state of things. There is also making use of some kind of once method that will just fore the first time something happens that is another tool in the tool bug for debugging, and displaying the first instance of some kind of state that is causing problems.

In addition even when it comes to making a finished product the use of the javaScript alert method is not always the best way to go about alerting the user to something in a client side javaScript environment. There ar a number of other ways to do so such as changing the value of the title text of a page, and creating, injecting, and then removing a new element into the page and so forth.

In this post I will be giving a quick overview of the window.alert method in client side javaScript as well as a few other alternatives for logging things out, or displaying something other then the javaScript alter method. As the alert method is not always the best choice for debugging.

<!-- more -->

## 1 - javaScript alert for logging

In many basic javaScript examples that aim to help people that are new to javaScript get started. The window.alert method is often used as a way to log the result of something so that the developer can confirm that the little javaScript example is working. So that being said one of these simple javaScript examples might look something like this.

```html
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


## 2 - JavaScript Alert and loops

With some javaScript examples it can get annoying to have a whole much of alerts happen one after another. So for the most part using an alert in the body of a loop or any kind of method that is called a whole bunch of times such as Array.map is not such a good idea.

One nice thing about it though is that it will pause the execution of any additional javaScriot until the alert is clicked, so it is a way to get a loop to stop for a second, which might be okay for debugging purposes now and then. Still There are alternatives a javaScript developer should be aware of that I will be getting to later in this post.

```html
<html>
    <head>
        <title>javascript alert map example</title>
    </head>
    <body>
        <script>
let arr = [1,2,3,4];
arr = arr.map((n)=>{
   n = Math.pow(4, n);;
   alert(n);
   return n;
});
alert(arr);
        </script>
    </body>
</html>
```

This might work out okay if a developer is just working something out, but is not going to leave it that way, but when it comes to using alert in an actual production app of some kind that can get very annoying. There are other ways to log what is going on where even if it is left in place, will not greatly effect the behavior of the application.

## 3 - javaScript alert alternatives

The javaScript alert method might come in handy now and then, but for the most part I would avoid using it for production projects, and also I would not even use it for debugging in most cases as well. There are many other ways to go about displaying a message, for the purpose of debugging or informing a user of something so lets look at some alternatives to javaScript alert.

### 3.1 - console.log

The console.log method is a favorite for me and many other developers, it will of course log to the javaScript console rather than log a message as an alert box. This makes it an all around better choice in most cases when it comes to loggin the state of things with a basic application at least in place of using javaScript alert

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

### 3.2 - innerText element property

When it comes to displaying a message in a html document there are many other options to display something aside from javaScript alert. When gaining a reference to an html element in client side javaScript there are properties like innerText that can be used to set to change the inner text node of certain elements that have text nodes such as paragraph elements. 

So lets take a quick look at a simple innerText example for displaying something.

```html
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

I just need to get a reference to an element by one means or another such as with document.getElementById. Once I have a reference to an element I can then use that as a way to display a message. A method like this can then be used to display a message in a browser window without having an annoying dialog box pop up each time.

### 3.3 - javaScript Prompt

The prompt method works just like the javaScript alert method, but with one little difference. It allows for the use to input a value. However just like with the alert method it will pause all other javaScript while the prompt dialog box is open, which in most cases might be an undesired side effect of its use.

```html
<html>
    <head>
        <title>javaScript alert map example</title>
    </head>
    <body>
        <script>
var startTime = new Date(),n;
setTimeout(()=>{
   let el = document.createElement('p'),
   time = new Date() - startTime;
   el.innerText = time + ' : ' + n;
   document.body.appendChild(el);
},1000);
n = prompt('Give a number', 0);
        </script>
    </body>
</html>
```

The prompt method might still come in handy now and then, but for the most part I would prefer to go with input elements, or some other means of gathering user input that will not delay the event loop.

## 4 - Writing a custom once method in place of using javaScript alert

In some situations I might only want something to be logged to be logged, altered, or displayed just once. one way to do so is to use a method that will create and return a method that will only log to the console once, and then that is it.

```js
let createOnce = () => {
    var count = 0;
    return function (mess) {
        if (count === 0) {
            console.log(mess);
            count += 1;
        }
    };
};
 
var once = createOnce();
 
var i = 10;
while (i--) {
    once(i); // 9
}
```

## 5 - Writing a custom log function in place of using javaScript alert

Maybe one of the best alternatives to using javaScript alert for the purpose of logging something for the purpose of debugging might be to have some kind of custom log method. This is something that I see going on in a log or projects and when I think about it for a second it makes a whole lot of sense. I can define the custom log method in an external javaScript file and then link to it in any page or module, and redefine what the logic of the custom log method is not and then when necessary.

### 5.1 - Simple custom log function using console.log

So here I have a basic custom log method using console.log in place of the javaScript alert method. This way I can do whatever I want with the message that is passed, such as displaying the public properties of an object in a custom way. For example I can test if the given value is an object, and if it is an object log each public key in a standard clean way property by property using Object.keys and Array.forEach or any other similar means. If the value is anything other than an object then the value can just be logged out as always.

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

The best thing about his though is that as a project grows I am passing all stuff that is to be logged to a custom method rather than just console.log. This way I can change what logging is in one place very easily. For example say I do not want anything logged to the console for a moment, to do so i just need to comment out one line rather then every instance of console.log throughout my code.

In real projects I often might use something like this, but it often will become something packed with additional features, many of which might be custom to the nature of the project. There is making it so the module name is part of what gets logged, along with additional information that might help with debugging. There are other features that come to mind such has having an argument that will serve as a way to only log if a given condition is true, and so forth.

## 6 - Conclusion

So a javaScript alert in client side javaScript might be okay for some hello world examples, and also maybe the use of it is called for with some actual projects as well. However there are still often better alternatives when it comes to letting the user know that something is up. Also when it comes to debugging there are a wide range of better options that are far more useful, even beyond that of just console.lof by itself.