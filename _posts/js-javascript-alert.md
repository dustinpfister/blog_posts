---
title: JavaScript alert for messages and alternatives
date: 2019-01-07 18:59:00
tags: [js]
layout: post
categories: js
id: 357
updated: 2021-10-24 15:46:53
version: 1.50
---

When first starting out with front end javaScript code examples the [javaScript alert](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert) method is something that often [comes up on the open Internet](https://www.washington.edu/accesscomputing/webd2/student/unit5/module2/lesson1.html) as a way to log or display something. This might be okay for very basic code examples, but will quickly get annoying, and thus it makes sense to look into other ways to go about alerting the user to something.

There are [many other options for what the javaScript alert](https://www.quora.com/What-is-a-good-alternative-to-using-a-JavaScript-alert-box) method is typically use for that might prove to be more practical. There is the console.log method for course that will often prove to be a better choice for debugging, but even that might prove to fall short in some situations. I often find myself making use of dom manipulation methods, to create some kind of view for the current state of things. There is also making use of some kind of once method that will just fore the first time something happens that is another tool in the tool bug for debugging, and displaying the first instance of some kind of state that is causing problems.

In addition even when it comes to making a finished product the use of the javaScript alert method is not always the best way to go about alerting the user to something in a client side javaScript environment. There ar a number of other ways to do so such as changing the value of the title text of a page, and creating, injecting, and then removing a new element into the page and so forth.

In this post I will be giving a quick overview of the window.alert method in client side javaScript as well as a few other alternatives for logging things out, or displaying something other then the javaScript alter method. As the alert method is not always the best choice for debugging.

<!-- more -->

## 1 - javaScript alert basics

In this section I will be starting out with just a few basic examples of the javaScript alter method. These examples will be fairly basic, however this is still not a kind of [getting started with javaScript](/2018/11/27/js-getting-started/) type post. So I assume that you have at least some background when it comes to the very first steps of getting started with client side javaScript when it comes to using the alter method. Examples like this will work just fine when it comes to [getting started by way of the file protocol](/2020/09/21/js-getting-started-file-protocol), which in other words means just saving the example as an html file and then opening it up in the web browser by way of control \+ o like any other file on the local file system of a computer. However there are other ways of doing so that might prove to be a better way of going once you get into more advanced topics that will cause problems when developing that way.

### - The source code examples here can be found on Github

The source code examples in this post can be found in my [test vjs](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-alert) repository on Github. That repository is where I am parking all my other vanilla [javaScript source code examples for my many other posts on this category](/categories/js/), far beyond just that of the javaScript alert method at this point.

### 1.1 - basic javaScript alert example

In many basic javaScript examples that aim to help people that are new to javaScript get started, the window.alert method is often used as a way to log the result of something so that the developer can confirm that the little javaScript example is working. So that being said one of these simple javaScript examples might look something like this.

```html
<html>
    <head>
        <title>javaScript alert</title>
    </head>
    <body>
        <script>
 
// alert can be used as a way to log
// something to make sure it is working
// as expected
var n = 40 + 2;
alert(n >= 40); // true
 
        </script>
    </body>
</html>
```

The alert method is a property of the window object so there is no real difference between window.alert, this.alert, and just plain alert by itself. So that is just about it when it comes to using alert, just pass in what you want to log and it should alert out to you.


## 2 - JavaScript Alert and loops

With some javaScript examples it can get annoying to have a whole bunch of alerts happen one after another. So for the most part using an alert in the body of a loop or any kind of method that is called a whole bunch of times such as with a while loop is not such a good idea. Except for maybe a crude yet effective means of debugging, which is often what this method is used for in various code examples in the open web. The main reason why might have to do with the fact that the alert method will pause the execution of any additional javaScript after the method is called until the alert is clicked. So then the alert method is a way to get a loop to stop for a second. Still there are alternatives a javaScript developer should be aware of that I will be getting to later in this post, for now in this section I will be getting the loop thing out of the way though.

### 2.1 - A loop example with alert and a while loop

One way to go about looping is to create a for loop, while, or do while type loop. For this example I went with a while loop and did a trick that involves looping backward with an index number to zero when it comes to the expression that is used for the while loop to find out if the looping should stop or not. The reason why that works is because the number zero will evaluate to false when it comes to converting a number value to a boolean value, while any positive number will evaluate to true. As long as the value of the expression remains true the loop will continue.

```html
<html>
    <head>
        <title>javascript alert</title>
    </head>
    <body>
        <script>
var i = 5,n;
while(--i){
    n = Math.pow( 2, i );
    alert( 'i: ' + i + ', n: ' + n);
}
        </script>
    </body>
</html>
```

Anyway when I open this file up in my web browser the value of i will start at 4 and loop back to zero, when zero is reacted the example stops. However for each loop an alert will happen with the string value that I am creating for the value that I am passing gto the alert function. So the alert does not happen once for the first value and then thats it, it would seem that it does pause the flow of things as each value of i, as well as n ends up being alerted.

### 2.2 - An example using the Array.map method

When it comes to working with arrays there are many useful [array prototype methods](/2018/12/10/js-array/) such as the [forEach method](/2019/02/16/js-javascript-foreach/), and the [array map method](/2020/06/16/js-array-map/) just to name a few. For this example I went with a quick example that makes use of the array map method as a way to create a new array from a source array and assign that to the same variable. Again just like with the while loop example I get each value that I want alerted to me when this happens.

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

When it comes to displaying a message in a html document there are many other options to display something aside from javaScript alert. For example there is using a method the [document.querySelector](/2020/06/23/js-document-queryselector/) or [document.getElementById](/2018/12/27/js-document-getelementbyid/) to get an element reference to an element in the hard coded html. After gaining a reference to an html element in client side javaScript there are properties like innerText that can be used to set to change the inner text node of certain elements that have text nodes such as paragraph elements. 

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

In some situations I might only want something to be logged, altered, or displayed just once rather than over and over again in a loop. The javaScript alert method, at least by itself would prove to be a bad choice for this sort of thing. One way to do so is to use a method that will create and return a method that will only log to the console once, and then that is it. So then this would be an example of something that is often referred to as a [closure in javaScript](/2019/02/22/js-javascript-closure/).

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

So a javaScript alert in client side javaScript might be okay for some hello world examples, and also maybe the use of it is called for with some actual projects as well. However there are still often better alternatives when it comes to letting the user know that something is up. There is of course creating some kind of message system using elements that are injected in and then purged out as needed. In many simple projects I often see developers use text area elements as a way to just keep logging text that can then be scrolled back. It all really depends on the project, and what the window alter method is being use for in the first place, as it is often used for debugging and not just altering the user to something.

Also when it comes to debugging there are a wide range of better options that are far more useful, even beyond that of just console.lof by itself.