---
title: Add elements with javaScript
date: 2019-02-26 10:34:00
tags: [js]
layout: post
categories: js
id: 391
updated: 2020-06-07 12:33:44
version: 1.10
---

Adding elements in javaScript generally refers to creating and appending html elements to an html document, in core javaScript in general it may refer to creating and appending elements for an Array as well. In [jQuery there is the add method](https://api.jquery.com/add/) that can be used as a way to add elements. It is true that jQuery is still a widely used front end javaScript framework, but today for the most part just working in the browser itself is safe more or less.

I have written a [post on innerHTML](/2019/01/13/js-innerhtml/) not to long ago which is one typical way of doing so, however in this post I will be covering the subject in general. There are of course alternatives to innerHTML that involve the use of a collection of methods, such as [createElement](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement), and appendChild. Also there is some things to cover when it comes to html node lists as well, and how they are like arrays.

<!-- more -->

## 1 - Add Elements

To add an element in javaScript I first need to gain a reference to a hard coded element in the html to begin with. There are a number of ways to go about doing this such as with document.getElementById which shows up in a lot of javaScript examples, to properties such as document.body. Once I have a reference to an element I can then use a property like innerHTML or a collection of methods to create an add elements.

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

In this post I am not going to be going into detail about innerHTML as I have written a post on that all ready. However innerHTML is of course one option for making quick work of this when it comes to simple projects. When it comes to more advanced projects though there are some situations in which the alliterative way of doing this should be used.

## 2 - createElement methods for adding elements

The alternative to using innerhtml as a way to create elements is to use the document.createElement method along with something like appendChild, and createTextNode. This is generally the preferred way to create and add new elements into an html document because it allows for access to element object reference right away. In addition I can set all kinds of properties to the created element before appending it the the html, or I can even not append it at all if I find that I do not want to for whatever the reason.

```html
<html>
    <head>
        <title>javascript create element</title>
    </head>
    <body>
        <script>
var el = document.createElement('p');
el.appendChild(document.createTextNode('hello world'));
document.body.appendChild(el);
        </script>
    </body>
</html>
```

## 3 - Conclusion

So the two general ways to go about adding elements in front end javaScript is the inner html method, and then the createElements method that is often regarded as the more professional way of going about adding elements. There is also other properties and ways of doing things in front end javaScript that can be thought of as a way of adding nodes in general such as the innerText property. That is not a way of adding elements to some HTML, but it is a way of adding text nodes, and doing so in a way in which any inner content is removed while doing so.