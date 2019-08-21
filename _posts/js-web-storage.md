---
title: Web Storage api in client side javaScript
date: 2019-08-20 19:40:00
tags: [js]
layout: post
categories: js
id: 526
updated: 2019-08-21 13:38:42
version: 1.6
---

There are a number of ways to store data client side, but in this post I will be mainly writing about the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API), rather than index db, cookies files, and many other options for client side persistence of data. The Web Storage API is easy to use as everything can just simply be stored as key value pairs of the localSorage global on clients that support the Web Storage API. However depending on the nature of the project it might not always be the best choice. Cookie files will always give better backward compatibility when it comes to older browsers, and the indexed db option is a better choice when it comes to storage large amounts of data. Still the Web Storage API is a good option for quickly getting the job done, and most modern browsers support the standard well.

<!-- more -->

## 1 - web storage basic example

Working with the Web Storage API is as easy as working with an plain old javaScript object. The localStoarge global can then be used just like that of any javaScript Object, whatever you want to save on the client just define it as a property of the localStorage global. However there are also setItem and getItem methods also that can be used to do get and set properties of the localStoarge global as well. Once a property is set then that value will be there again every page load, serving the purpose of client side persistence of data.

So then here I have a basic example of the Web Storage API that just stores a single message that can be set in an test input element. I set some [event handlers](/2019/01/16/js-event-listeners/) that will fire each time a keyboard key is released, or the value changes. Each time one of the events fire a set method will set the current value of the text input element to a mess property of the localStorage global. Each time the page loads a get method will fire that will set the value of the text element to the mess property of the localStorage global.

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
