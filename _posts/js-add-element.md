---
title: Add elements with javaScript
date: 2019-02-26 10:34:00
tags: [js]
layout: post
categories: js
id: 391
updated: 2020-09-11 11:42:16
version: 1.17
---

[Adding elements](https://www.tutorialspoint.com/how-to-add-a-new-element-to-html-dom-in-javascript) in javaScript generally refers to creating and appending html elements to a container element in an html document. Also in core javaScript by itself in general, adding elements may refer to creating and appending elements for an Array. However in this post I will be going mainly over ways to go about adding html elements to an html document with javaScript code.

In [jQuery there is the add method](https://api.jquery.com/add/) that can be used as a way to add elements. It is true that jQuery is still a widely used front end javaScript framework, but it is a library that is starting to die out a little. There are many other front end frameworks that make adding elements, and many DOM mutation related tasks a little easier but today for the most part just working in the browser itself is nt so hard and can still work just fine for small projects.

I have written a [post on innerHTML](/2019/01/13/js-innerhtml/) not to long ago which is one typical way of adding elements once a reference to a container element is obtained. However in this post I will be covering the subject in general, and not just the use of innerHTML which might not always be the best choice. There are of course alternatives to innerHTML that involve the use of a collection of methods, such as [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement), and appendChild. 

Also there is some things to cover when it comes to html node lists as well, and how they are like arrays. However they are not instances of the Array constructor so one can not just use array prototype methods with them. So there is a little to cover when it comes to adding elements to an html document with client side javaScript.

<!-- more -->

## 1 - The very basics of Adding Elements in client side javaScript

To add an element in javaScript I first need to gain a reference to a hard coded element in the html to begin with. There are a number of ways to go about doing this such as with document.getElementById which shows up in a lot of javaScript examples, to properties such as document.body. Once I have a reference to a container element I can then use a property like innerHTML or a collection of element object methods to create an add elements. In this section I will be going over the very basic tools for doing adding elements, but will not get into detail with other topics that surround this.

### 1.1 - Uisng innerHTML to add elements

The innerHTML property of an element object is one way to go about getting a string value of the innerHTML of an element, but it can also be used to set the innerHTML also with a string value of the desired innerHTML.

```html
<html>
    <head>
        <title>add elements</title>
    </head>
    <body>
        <script>
var el = document.body;
el.innerHTML += '<p>hello world<\/p>'
 
        </script>
    </body>
</html>
```

In this post I am not going to be going into detail about innerHTML as I have written a post on that all ready. However innerHTML is of course one option for making quick work of this when it comes to simple projects. When it comes to more advanced projects though there are some situations in which an alliterative way of doing this should be used.

So now that we have a very basic idea of what this is all about otu of the way I can now move on to other ways of adding elements to an html document.

### 1.2 - createElement methods for adding elements

The alternative to using innerhtml as a way to create elements is to use the document.createElement method along with something like appendChild, and createTextNode. This is generally the preferred way to create and add new elements into an html document because it allows for access to element object reference right away. In addition I can set all kinds of properties to the created element before appending it the the html, or I can even not append it at all if I find that I do not want to for whatever the reason.

```html
<html>
    <head>
        <title>javascript create element</title>
    </head>
    <body>
        <script>
// create an element
var el = document.createElement('textarea');
// can add values to properties
el.value = 'Hello World';
// then I can append it to the document
document.body.appendChild(el);
        </script>
    </body>
</html>
```

## 2 - The createTextNode method and creating paragraph elements, and any element that might require a text node

Some elements such as a p, span, and pre might require a text node value added to after creating it in order for the element to actually show some text. So in this section I think that it is called for to cover a few quick examples that have to do with adding text nodes to newly created elements with the create element method.

### 2.1 - The createTextNode method and a paragraph element

So for starters there are paragraph elements, and when creating them it is often called for to define what the value of the text node is for that element. One way to do so it to use the createTextNode method to create a text node with the desired text, and then append that to the newly created paragraph element.

```html
<html>
    <head>
        <title>javaScript create element</title>
    </head>
    <body>
        <div id="container">
        </div>
        <script>
var con = document.getElementById('container'),
p = document.createElement('p'),
text = document.createTextNode('hello world');
p.appendChild(text);
document.body.appendChild(p);
        </script>
    </body>
</html>
```

### 2.2 - pre element example

It might be fun to play around with some javaScript examples that have to do with preformatted text elements. If you are not familiar with them this kind of element is what is used in html for preformatted text that contains line breaks. WIth many other elements line breaks will be ignored when it comes to formating, but with preformatted elements they will not be ignored. So this might be a good way to become familiar with how to go about creating preformatted text with javaScript code by creating and adding pre elements to an html document.

There is more than one kind of line break depending on the operating system, but for the most part it is best to just go with the windows style one that contains a carriage return and then a line feed after. the reason why I say that it that that kind of line break will work o  windows but will also work okay on just about every other operating system just fine also.

```js
<html>
    <head>
        <title>javaScript create element</title>
    </head>
    <body>
        <div id="container">
        </div>
        <script>
// create a string with line breaks
var createLinesString = function (w, h, ch, EOL) {
    var i = 0,
    w = w || 16,
    h = h || 9,
    EOL = EOL || '\r\n',
    len = w * h,
    x,
    y,
    str = '';
    while (i < len) {
        x = i % w;
        y = Math.floor(i / w);
        str += ch || '.';
        if (x === w - 1) {
            str += EOL;
        }
        i += 1;
    }
    return str;
};
 
var con = document.getElementById('container'),
pre = document.createElement('pre'),
str = createLinesString(16, 9, 'o'),
text = document.createTextNode(str);
 
pre.appendChild(text);
document.body.appendChild(pre);
 
        </script>
    </body>
</html>
```

An example such as this could be expanded with additional methods to make a simple grid system, but this alone should help with the general idea of why it is that pre elements are useful in some situations.

## 3 - Conclusion

So the two general ways to go about adding elements in front end javaScript is the inner html method, and then the createElements method that is often regarded as the more professional way of going about adding elements. There is also other properties and ways of doing things in front end javaScript that can be thought of as a way of adding nodes in general such as the innerText property. That is not a way of adding elements to some HTML, but it is a way of adding text nodes, and doing so in a way in which any inner content is removed while doing so.