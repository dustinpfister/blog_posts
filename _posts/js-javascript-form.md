---
title: javaScript form basic examples and more
date: 2020-02-11 14:06:00
tags: [js]
layout: post
categories: js
id: 610
updated: 2020-02-11 18:22:11
version: 1.2
---

So then it comes to [javaScript form examples](https://eloquentjavascript.net/2nd_edition/18_forms.html) there is just getting started with input elements and forms on the client side, and then there is working out server for the back end system of a project or simple example. Depending on what it is that you want or need to do with a form and input elements a back end system may not be needed at all, however a typical use case of forms is to involve some kind of back end system. Still that might not always be the case, so in this post I will be going over some simple examples that just have to do with the basics of working with form elements and javaScript in a client side javaScript environment. In addition I might get around to one or two examples that make use of a nodejs back end system also though.

<!-- more -->


## 1 - javaScript form input elements the basics

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