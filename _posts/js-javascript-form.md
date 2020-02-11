---
title: javaScript form basic examples and more
date: 2020-02-11 14:06:00
tags: [js]
layout: post
categories: js
id: 610
updated: 2020-02-11 18:28:30
version: 1.3
---

So then it comes to [javaScript form examples](https://eloquentjavascript.net/2nd_edition/18_forms.html) there is just getting started with input elements and forms on the client side, and then there is working out server for the back end system of a project or simple example. Depending on what it is that you want or need to do with a form and input elements a back end system may not be needed at all, however a typical use case of forms is to involve some kind of back end system. Still that might not always be the case, so in this post I will be going over some simple examples that just have to do with the basics of working with form elements and javaScript in a client side javaScript environment. In addition I might get around to one or two examples that make use of a nodejs back end system also though.

<!-- more -->


## 1 - javaScript form input elements the basics

To get started with javaScript forms it might be best to know a thing or two about input tags, which are used to make fields for a form. There is a great deal to cover just with them when it comes to the various types of input tags, as well as how to get the current value of an input tag when attaching events for them, and so forth. In this section I will just be going over the basics and more when it comes to input tags, so lets get started.

```html
<html>
    <head>
        <title>javaScript form input example</title>
    </head>
    <body>
        <input id="seed" type="text" value="1234"><br><br>
        <div id="out"></div>
        <script>
var disp = function(text){
    document.getElementById('out').innerText = text;
};
var gen = function(seed){
    return seed.split('').map(function(c){
        return c.charCodeAt(0) + ':';
    }).join('');
};
var input = document.getElementById('seed');
input.addEventListener('keyup', function(e){
    disp(gen(e.target.value));
});
disp(gen(input.value));
        </script>
    </body>
</html>
```