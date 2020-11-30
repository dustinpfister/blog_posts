---
title: Javascript iframe basics
date: 2019-02-10 09:20:00
tags: [js]
layout: post
categories: js
id: 375
updated: 2020-11-30 10:58:26
version: 1.19
---

Sometimes it is called for to do something that involves the use of an [iFrame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) element, when it comes to developing a client side system with javaScript. An iframe is a way to have another html page inside an html page, when it comes to javaScript it is also a way to have another window object to work with. 

Thats is that I can have a completely separate window object that will not collide with the what is going on in the parent window object. However doing so WILL NOT result in a separate event loop when it comes to running javaScript on the page as a whole. Both the javaScript code that runs in the parent window object, as well as any iframes will share a single event loop. So iframes are not an alternative to something such as web worker, and when it comes to rending in a page there is still one main thread for that.

The subject of iframes can become a little complicated there is much to write about with them when it comes to more advanced topics involving hidden iframes, and security concerns when with things like [click jacking](https://en.wikipedia.org/wiki/Clickjacking) that ca be preformed with iframes. So in this post I will be sticking to just the basics for now as many of these other topics are matters for another post.

<!-- more -->

## 1 - javaScript iFrame basics

To get started with iframes there are two general ways of doing so, one would be to add one to the actual hard coded html by editing an html file or template, and the other way would be to create and inject one into a document with something like the document create element method. In this section I will be covering how to go about doing just this involving a single html file. I assume that you have at least some background with javaScript, and html before hand.

### 1.1 - Working with an iFrame that is hard coded into the html

When working with an iframe that is hard coded into the html the process is to just gain a reference to it by using something like document.querySelector, document.getElementById, or any other means that will result in the creation of a reference to the hard coded iFrame element in the html of the page.

```html
<html>
    <head>
        <title>javascript iframe basic example</title>
    </head>
    <body>
        <iframe id="theframe" width="320" height="240"></iframe>
        <script>
let iFrame = document.querySelector('#theframe'),
w = iFrame.contentWindow;
div = document.createElement('div');
 
div.innerHTML ='Hello World';
w.document.body.appendChild(div);
        </script>
    </body>
</html>
```

Once a reference to the iFrame is obtained it is possible to access the window object of that iFrame via the [contentWindow property of the iFrame element](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/contentWindow). This works in much the same way as the window object of the page itself as such I can add content to the iFrame in the same manner as I would with the main window object. So there is getting at the window object of an iframe that is all ready there in the html, but then there is creating and injecting them also, so with that said lets look at the next section.

### 1.2 - Creating and injecting an iframe with javaScript

Another way to work with an iframe is to create and inject the iframe with javaScript and the main window object of the main html page. This will involve the use of document.createElement, and the appendChild methods of a container element that I wish to append the new iframe to. Again once a reference is gained to the new iframe element the contentWindow property can be used to place content into the iframe element.

With this kind of approach you might have some html like this.

```html
<html>
    <head>
        <title>javascript iframe basic example</title>
    </head>
    <body>
        <script src="inject.js"></script>
    </body>
</html>
```

And some javaScript like this.

```js
// create and append the iframe
let iFrame = document.createElement('iframe');
document.body.appendChild(iFrame);

// create and inject content into it
let div = document.createElement('div'),
w = iFrame.contentWindow;
div.innerHTML = 'Hello World';
w.document.body.appendChild(div);

```

## 2 - Pointing an iframe to a url

This can sometimes work, but it might not also these days because of security concerns. When pointing to a url that is at a different domain than that of the domain at which the parent page exists at it can some times result in an same origin related error. Some websites send a header that informs the browser to not display the site in the iframe to prevent a kind of attack known as [click jacking](https://en.wikipedia.org/wiki/Clickjacking). This is a more advanced topic for iframes, so I will not get into this is detail here in this beginners post on javaScript and iframes.

Never the less if the url is at the same domain, or if it is a url where this sort of thing will happen without issue then the following might work out okay. 

```html
<html>
    <head>
        <title>javascript iframe</title>
    </head>
    <body>
        <iframe id="theframe" width="320" height="240"></iframe>
        <script>
let iFrame = document.querySelector('#theframe'),
w = iFrame.contentWindow;
 
iFrame.setAttribute('src', './basic.html');
        </script>
    </body>
</html>
```

To do so I just need to set the src attribute of the iframe to the url of the resource that I want to load and display in the iframe. If all goes well that alone should work, if not finding a solution to this is outside the scope of this post.

## 3 - Threading with an iframe will not result in a separate event loop, or 'true threading' as it is sometimes called

Conventional wisdom might lead one to believe that it is possible to have more than one event loop when creating iframes. That is that each iframe will result in not just a new window object, but also a new event loop when it comes to running javaScript code in a page. However as of this writing it would seem that this is not true.

I can define separate javaScript code in an iframe yes, but that javaScript code will share an event loop with the parent page also. So if I do something heavy in an iframe that can end up bogging down what is going on in the main page also. However do not just take my word for it, prove it to yourself with just a little html and javaScript. In fact I will save you the trouble and go over something in this section that helps to prove this point.

### 3.1 - A thread.html file that will be loaded into an iFrame

Here I have a page that is doing something that will take a little time that I will be saving as thread.html. This page can be loaded up by itself, however I intend to load it up in an iframe in a main html file that will open this file up via the src attribute. If an iframe where to get its own event loop, then the while loop taking a long time to count to a large number would not interfere with something else going on in the main page.

```html
<html>
    <head>
        <title>javascript iframe</title>
    </head>
    <body>
        <script>
let out = document.createElement('p');
out.innerText = '';
document.body.appendChild(out);
var lt = new Date();
var loop = function () {
    setTimeout(loop, 100);
    var i = 500000000;
    while (i--) {};
    var secs = (new Date() - lt) / 1000;
    lt = new Date();
    out.innerText = secs;
};
loop();
        </script>
    </body>
</html>
```

### 3.2 - The main index.html file that will contain the iframe

Here I have a main html file in which I am loading the thread.html page that I went over in the above sub section. In this page I also have a little javaScript code running, but I am not doing anything that should take a long time. If the page that I am loading in the iframe has its own event loop then the javaScript code in this page should run faster, and not end up getting effected by the javaScript code running in the iframe that much.

```html
<html>
    <head>
        <title>javascript iframe</title>
    </head>
    <body>
        <iframe id="theframe" width="640" height="480" src="thread.html"></iframe>
        <script>
let out = document.createElement('p');
out.innerText = '';
document.body.appendChild(out);
var lt = new Date();
var loop = function () {
    setTimeout(loop, 100);
    var secs = (new Date() - lt) / 1000;
    lt = new Date();
    out.innerText = secs;
};
loop();
        </script>
    </body>
</html>
```

When I start this up the javaScript code in the thread.html file ends up causing the code in the main page to slow down also. If the iframe had its own event loop this would not be the case. So then the use of an iframe is not a replacement for web workers, or opening the separate html file in a whole other tab or window all together. That is that if I where to open the thread.html file op in its own window that will run independently from any additional windows, and have its own event loop it would seem.

So no using an iframe is not an alternative to using web workers, if for some reason you want more than one event loop that is the way that it is done in a web browser.

## 4 - Conclusion

The basics of iframes are not so hard but there is much more to write about them when it comes to sandboxing, hidden iframes, and cross domain issues. Hopefully thing post has served you well when it comes to the basics of iframes and javaScript for now.