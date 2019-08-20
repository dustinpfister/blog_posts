---
title: Web Storage api in client side javaScript
date: 2019-08-20 19:40:00
tags: [js]
layout: post
categories: js
id: 526
updated: 2019-08-20 19:44:22
version: 1.1
---

There are a number of ways to store data client side, but in this post I will be mainly writing about the Web Storage API, rather than index db, cookies files, and many other options for client side persistence of data.

<!-- more -->

## 1 - web storage basic example

```html
<html>
    <head>
        <title>web storage</title>
    </head>
    <body>
        <input id="the-text" type="text" placeholder="foo">
        <script>
var text = document.getElementById('the-text');
// get an item with local storage
var get = function(){
  var mess = localStorage.getItem('mess');
  if(mess){
      text.value = mess;
  }
};
// set an item with local storage
var set = function(e){
    localStorage.setItem('mess', e.target.value);
};
text.addEventListener('change', set);
text.addEventListener('keyup', set);
get();
        </script>
    </body>
</html>
```
