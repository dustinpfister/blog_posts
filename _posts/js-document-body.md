---
title: document body property in vanilla js
date: 2019-01-03 21:00:00
tags: [js]
layout: post
categories: js
id: 354
updated: 2021-08-10 11:05:21
version: 1.38
---

The [document.body property](https://developer.mozilla.org/en-US/docs/Web/API/Document/body) of the document object in client side javaScript is a reference to the [body](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body) element in an html document. So the property is a way to go about getting a reference to the main body element without having to assign and id value or class to it which is silly sense there is always, or at least should be only one body element in an html document.

The body element is where all additional elements will be placed that have to do with the documents layout and structure, of course you should all ready know that if you are getting into javaScript now, if not maybe you should take a step back and review html a little more before continuing. 

In this post I will be covering some topics when it comes to the document.body property that can be used to quickly reference this html element. The property is one of many ways to go about getting a reference to an element in client side javaScript, but I often use this property if it is the body element alone that I am interested in. So lets get a few quick examples out of the way with this one so we can continue on to something more interesting.

<!-- more -->

## 1 - document body example

The document body property of the document object can always be used to quickly [gain a reference to the body element](https://stackoverflow.com/questions/26067590/get-body-element-of-site-using-only-javascript). So it can be used as an alternative to something like document.getElementById, or document.getElementsByTagName when it is only just the single body tag of an html document that is of concern. In this example I am creating a canvas element with the create element method, and then appending it to the body element of an html document with the append child method.

So for this example I might have some html that looks like this.

```html
<html>
    <head>
        <title>document body</title>
    </head>
    <body>
        <script src="main.js"></script>
    </body>
</html>
```

Here I am linking to an external javaScript file called main.js where I will be creating and appending the the canvas element. The contents of the main.js file are as follows.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d');
 
// using document body to append a new canvas element
document.body.appendChild(canvas);
 
canvas.width = 320;
canvas.height = 240;
 
ctx.fillStyle='#000000';
ctx.fillRect(0,0,canvas.width,canvas.height);
```

If all goes well this example just results in a black blank canvas, nothing to interesting, but you get the idea. So as you can see the document.body property is always there to serve as a quick reference to the body element.

## 2 - Other ways of getting the body element

There is not much need for other ways to get the body element. The document body property is well supported across browsers these days. Never the less in this section I will be quickly going over some other options when it comes to getting a reference to the body element in client side javaScript. Many of these methods can be used as a way to go about getting references to elements in general, so if you are still new to javaScript and looking to get up to speed with some of these options this section might be of interest.

### 2.1 - Using getElementById

Although it is kind of weird to do so because there should only be one body element per document, an id can still be set for the body element. So then the [getElementById method](/2018/12/27/js-document-getelementbyid/) can be used as a way to get a reference to body just like with any other element to which an id can be set.

```html
<html>
    <head>
        <title>js body</title>
    </head>
    <body id="the-body">
        <script>
var body = document.getElementById('the-body'),
p = document.createElement('p');
p.innerText = 'hello world';
document.body.appendChild(p);
        </script>
    </body>
</html>
```

This method of gaining references to elements has been around for a real long time so it is one of the most reliable methods of gaining references to elements in client side javaScript. Although it is kind of silly to use it to gain a reference to the body element.

### 2.2 - Using getElementsByTagName to get the document body element with javaScript

Although the document body property is the quickest way to go about getting a reference to the body element of an html document, with javaScript there are of course a number of other ways both new and old to get references to an element including the body element. One such way would be to use the document.getElementsByTagName method.

```js
var body = document.getElementsByTagName('body')[0];
console.log(body);
```

This tired yet true way to go about getting a reference to the body element will return an html collection rather than a reference to the body element. It will always do this for a tag even if there is just one of theme such is the case with body.

### 2.3 - The document.querySelector

Another option for getting a reference to the body tag, or the first instance of any tag for that matter, would be to use [document.querySelector](/2020/06/23/js-document-queryselector/). This is a newer option compared to older methods like the get element by id method, however at this point it is still well supported in modern browsers. To use it I just call the method off of the document object just like with the other options, and pass a string that is the name of the tag that I want in this case body. The result of calling the query selector method is a single reference to the first instance of a tag, in this case this is not a problem as there should always be just one body tag. However when it comes to other tags to which there may be more than one instance of a tag I can also select elements by id with this method. There is also the query selector all method that will work just like query selector, only it will return an HTML Collection rather than a single element reference.

```html
<html>
    <head>
        <title>js body</title>
    </head>
    <body id="the-body">
        <script>
var body = document.querySelector('body'),
p = document.createElement('p');
p.innerText = 'hello world';
document.body.appendChild(p);
        </script>
    </body>
</html>
```

### 2.4 - The document children property

So if you are looking for a totally over complicated solution for something that is really simple look no further get a load of this one. like I said in the beginning of this post there are many ways to go about getting a reference to an element in client side javaScript. For the most part I figured just to throw this example together just for the sake of having yet another examples of how to get the js body element.

```html
<html>
    <head>
        <title>document body</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
var forTag = function (tagName, cb, children) {
    children = children === undefined ? document.children : children;
    tagName = tagName === undefined ? 'body' : tagName;
    tagName = tagName.toLowerCase();
    cb = cb || function (tag) {
        console.log(tag);
    };
    var i = children.length,
    tag;
    while (i--) {
        tag = children[i];
        if (tag.children.length > 0) {
            forTag(tagName, cb, tag.children);
        }
        if (tag.nodeName.toLowerCase() === tagName) {
            cb(tag);
        }
    }
};
forTag('body', function(body){
   console.log(body);
});
        </script>
    </body>
</html>
```

So I made a method that involves looping over all children via a recursive method that calls itself from with itself and uses the children property of elements to keep looking for tags of a given type. Each time it finds an element with a tag name that matches the given string it fires a callback for the tag. Maybe not the best way to just go about getting the document body element though, but if you want to walk over the full content of an html document it might be a decent way of doing so.

## 3 - Create a new document body element

The document body property can be set to a new element. When doing so it goes without saying that all content in the page that is inside the body tag will be replaced. This can be done more or less the same way as with any other element when it comes to creating the new body tag as well. Just call the document createElement method and pass the string body as the first argument to create a new body tag. Then it is just a matter of appending some content to the new body tag and setting it as the value of the document body property.

```html
<html>
    <head>
        <title>document body create new</title>
        <script>
var body = document.createElement('body'),
h1 = document.createElement('h1');
h1.appendChild(document.createTextNode('Well that seems to work okay.'));
body.appendChild(h1);
document.body = body;
        </script>
    </head>
    <body>
        <h1>Oh no looks like javaScript is not working.</h1>
    </body>
</html>
```

There are other ways of destroying everything on the page such as using document write. In most cases it is not necessary to do so though. In real life examples I can not say that I am creating new body elements and then setting them as the new body via the document body property but never the less it can be done.

## 4 - Document body and window onload

In a lot of examples you might see and event handler set for the window onload event before doing anything with body. This makes sense if for some reason you need to wait until content for the body has been loaded completely before continuing. For example if I place an image element in the body element, and then a script that depends on the content of that image then the script might not work as expected because the image has not completed loading just yet.

```html
<html>
    <head>
        <title>document body on load</title>
    </head>
    <body>
<img src="https://dustinpfister.github.io/css/images/banner.jpg">
        <script>
var createCanvas = function (image) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    // throw error if zero with image
    if (image.naturalWidth === 0) {
        throw new Error('zero width image!')
    }
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 0.25;
    ctx.drawImage(image,0,0);
    document.body.appendChild(canvas);
}
// calling right away
try{
createCanvas(document.body.children[0]);
}catch(e){
console.log(e.message);
}
// calling after window load
window.addEventListener('load', function () {
    createCanvas(document.body.children[0]);
});
        </script>
    </body>
</html>
```

The above create canvas element will throe an error if it is called an given an image that has a zero width size. If I just pass the image to it right away without waiting for it to load first that will of course result in an error, however if I pass the image via document body after the on load window event has fired then the example works just fine.

## 5 - Using document body as a default in the event that an container is not given

Whenever I make some kind of method that expects a container element to append to as one of the arguments I make it so that the body element is the default element that will be used in the event that a container element is not given. The document body property is of course a great way to just set the container element to body in the event that something is not given when using the method.

```html
<html>
    <head>
        <title>document body as a default element</title>
    </head>
    <body>
        <div></div>
        <div id="game-area"></div>
        <script>
var createCanvas = function (container, w, h, draw) {
    container = container === undefined ? document.body : container;
    container = typeof container === 'string' ? document.querySelector(container) : container;
    draw = draw || function (ctx, canvas) {
        ctx.fillStyle = '#afafaf';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    container.appendChild(canvas);
    canvas.width = w || 160;
    canvas.height = h || 120;
    draw(ctx, canvas);
};
createCanvas('#game-area'); // appends to game area
createCanvas(document.getElementsByTagName('div')[0]); // appends to first div
createCanvas(); // appends to body
        </script>
    </body>
</html>
```

## 6 - Attaching events and the body tag

Another good thing to look into when it comes to the topic of the body tag and javaScript would be to experiment a little with [event attachment](/2019/01/16/js-event-listeners). The body tag may not be the base most point at which to attach and event handler, as it is also possible to attach handlers to document, and window objects. However this is something that should be explored further at one point or another, and maybe the body tag is a good place to start with this sort of thing. So then in this section I will be going over a few quick examples of event attachment and the body tag, as well as some additional topics that might pop up while I am at it.

### 6.1 - Basic event attachment to body with an on click event

In this example I am starting out with just a simple example that has to do with attaching a on click event to the body element. When I click the page I then get some info set to the inner text of a div element that is a child of the body element. This is achieved by making a string with some data in the event object that is pass as an argument for the event handler function that I pass to the add event listener method.

```html
<html>
    <head>
        <title>document body</title>
    </head>
    <body>
        <div id="out">Click Page</div>
        <script>
document.body.addEventListener('click', function(e){
    var out = document.getElementById('out');
    out.innerText = e.target.nodeName + ', ' + e.clientX + ', ' + e.clientY;
    console.log(e.target.nodeName);
});
        </script>
    </body>
</html>
```

## 7 - Conclusion

So the document body property is a great way to just quickly reference the body element of an html document when doing something with client side javaScrpt. There are other ways of getting the body element of course, but because there is, or at least should be only one body element in an html document for the most part the document body property works fine in getting a reference to that element. 

There is a lot more to be aware of when it comes to the document object, I have covered much of that here in this post, but there are still some aspects of the object that a client side javaScript developer should be aware of. For example there is the [location object of the document object](/2019/01/26/js-document-location/) that contains important information about the location of the current document in terms of its location on the web, or on a local host. The document location object can also be used to preform a client side redirection also which might come in handy some times. There is also the subject of the title tag to which there is also a reference to in the document object via the [document.title property](/2018/12/28/js-document-title/).

