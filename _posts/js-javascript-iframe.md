---
title: Javascript iframe basics
date: 2019-02-10 09:20:00
tags: [js]
layout: post
categories: js
id: 375
updated: 2020-07-09 08:05:35
version: 1.11
---

Sometimes it is called for to do something that involves an [iFrame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) element when it comes to developing a client side system with javaScript. An iframe is a way to have another html page inside an html page, when it comes to javaScript it is also a way to have another window object.

The subject of iframes can become a little complicated there is much to write about with them when it comes to more advanced topics involving hidden iframes, and security concerns when with things like click jacking. So in this post I will be sticking to just the basics for now.

<!-- more -->

## 1 - javaScript iFrame basics

To get started with iframes there are two general ways of doing so one would be to add one to the actual hard coded html by editing an html file or template, and the other way would be to create and inject one into a document. In this section I will be coving how to go about doing just this involving a single html file.

### 1.1 - Working with an iFrame that is hard coded into the html

When working with an iframe that is hard coded into the html the process is to just gain a reference to it by using something like document.querySelector, document.getElementById, or any other means that will result to the hard coded iFrame element in the html of the page.

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

Once a reference to the iFrame is obtained it is possible to access the window object of that iFrame via the contentWindow property of the iFrame element. This works in much the same way as the window object of the page itself as such I can add content to the iFrame in the same manner as i would with the main window object.

### 1.2 - Creating and injecting an iframe with javaScript

Another way to work with an iframe is to create and inject the iframe with javaScript. This will involve the use of document.createElement, and the appendChild methods. Again once a reference is gained to the element the contentWindow property can be used to place content into it.

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

## 3 - Conclusion

The basics of iframes are not so hard but there is much more to write about them when it comes to sandboxing, hidden iframes, and cross domain issues. Hopefully thing post has served you well when it comes to the basics of iframes and javaScript for now.