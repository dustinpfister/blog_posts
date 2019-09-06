---
title: javaScript and select tags
date: 2019-09-04 15:10:00
tags: [js]
layout: post
categories: js
id: 530
updated: 2019-09-06 13:44:33
version: 1.5
---

When working out some kind of interface for a client side javaScript project [select tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) are often used to give the user a range of options to choose from. A select tag or select element consists of a select tag and then a few nested option tags for each option in the selection tag. In this post I will be writing about a few quick examples of select input tags and javaScript.

<!-- more -->

## 1 - Select tag basic example

Here I have a basic example of a select tag.

```html
<html>
    <head>
        <title>javaScript create element</title>
    </head>
    <body>
        <select id="selections">
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
        </select>
        <script>
var select = document.getElementById('selections');
select.addEventListener('change', function (e) {
  var sel = e.target;
  console.log(sel.value);
});
        </script>
    </body>
</html>
```

## 2 - The value property and select tags

```html
<html>
    <head>
        <title>javaScript select tag</title>
    </head>
    <body>
        <select id="selections">
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>
        <script>
var select = document.getElementById('selections');
select.addEventListener('change', function (e) {
  var sel = e.target;
  console.log(sel.value);
});
        </script>
    </body>
</html>
```

## 3 - The disabled attribute and select tags

```html
<html>
    <head>
        <title>javaScript select tag</title>
    </head>
    <body>
        <select id="obj-control">
            <option value="ai">AI Control</option>
            <option value="user">User Control</option>
        <select>
        <select id="obj-control-user-options" disabled>
            <option value="1">keyboard only (wasd)</option>
            <option value="2">mouse only</option>
            <option value="3">mouse and keyboard (wasd)</option>
        </select>
        <script>
var sel_control = document.getElementById('obj-control'),
sel_control_useropt = document.getElementById('obj-control-user-options');
 
sel_control.addEventListener('change', function(e){
    sel_control_useropt.setAttribute('disabled', 'true');
    if(e.target.value === 'user'){
        sel_control_useropt.removeAttribute('disabled');
    }
});
 
        </script>
    </body>
</html>
```