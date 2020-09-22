---
title: Web Storage api in client side javaScript
date: 2019-08-20 19:40:00
tags: [js]
layout: post
categories: js
id: 526
updated: 2020-09-22 09:23:58
version: 1.13
---

There are a number of ways to store data on the client side, but in this post I will be mainly writing about the [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API), rather than index db, cookies files, and many other such options for [client side persistence of data](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Client-side_storage) in a front end javaScript environment.

The Web Storage API is easy to use as everything can just simply be stored as key value pairs of the localSorage global variable on clients that support the Web Storage API. However depending on the nature of the project it might not always be the best choice when storing large amounts of data. The indexed db option is a better choice when it comes to storage of large amounts of data on the clients computer, and cookie files will always give better backward compatibility when it comes to supporting older browsers but with a limited size.

There is also the idea of using the [File reader constructor](/2020/03/24/js-filereader/) to have it so the user can save and load files anywhere on their computers local file system. So in some projects the file reader constructor might be be the best choice for handing the saving and loading of state, or other assets in general actually.

Still the Web Storage API is a good option for quickly getting the job done, and most modern browsers support the standard well, any one had to start somewhere when it comes to researching what the options are.

<!-- more -->

## 1 - web storage basic example

Working with the Web Storage API is as easy as working with a plain old javaScript object more or less which makes it one of he reasons why I tend to like using it. The localStoarge global can then be used just like that of any other javaScript Object, whatever you want to save on the client just define it as a property of the localStorage global. However there are also setItem and getItem methods that can be used to do get and set properties of the localStoarge global which should be used to do so. Once a property is set then that value will be there again every page load, site wide, serving the purpose of client side persistence of data on top of other options such as cookie files.

So then here I have a basic example of the Web Storage API that just stores a single message that can be set from the value property of a text type input element. 

I have an [event handler](/2019/01/16/js-event-listeners/) that will fire each time a keyboard key is released, or the value changes. So Each time a key is release, or for any reason the value property of the text input element changes I call the set method of my web storage module to set the value for a key that I have set as mess. Then each time the page loads the value of the text element is set to the value in local storage that is obtained by way of the get method of my web storage module.

```html
<html>
    <head>
        <title>web storage</title>
    </head>
    <body>
        <input id="the-text" type="text" placeholder="foo">
        <script>
var ws = {};
// get an item with local storage
ws.get = function(key){
  var mess = localStorage.getItem(key);
  if(mess){
      return mess;
  }else{
      return '';
  }
};
// set an item with local storage
ws.set = function(key, value){
    localStorage.setItem(key, value);
};

// DEMO
var text = document.getElementById('the-text'),
setMessHandler = function(e){
   ws.set('mess', e.target.value);
};
text.addEventListener('change', setMessHandler);
text.addEventListener('keyup', setMessHandler);
var storeText = ws.get('mess');
if(storeText != ''){
   text.value = storeText;
}
        </script>
    </body>
</html>
```

## 2 - Conclusion

So there are a number of other options when it comes to finding a way to store some data for a user in a web application. Of course there is having a database sever side for example as a way of saving data for a user. However with many of the applications that I have made thus far I do not care to get into that sort of thing f it is the kind of project where I can avoid doing so.