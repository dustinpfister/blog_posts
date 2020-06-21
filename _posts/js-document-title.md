---
title: document title property is client side javaScript for getting and setting the title tag
date: 2018-12-28 16:35:00
tags: [js]
layout: post
categories: js
id: 352
updated: 2020-06-21 10:34:44
version: 1.8
---

When working on updating the theme for my site one of the many things I think about are my title tags. For many reasons they are one of the most important tags in an html document, not just from a search engine perspective, but also for the sake of informing visitors about what a page is about, or what is currently going on with a page. That is because the title tag can be this fixed static thing, but it can also be mutated with some javaScript code also. 

The title tag is often what will be displayed in a link to the page in a search engine result page, so it is important to think in terms of the actually written content of the title tag. it also goes without saying that the title tag is a great resource to inform a user to something that is going on when it is a game from a complex front end system of some kind.

In this post I will be taking a moment to play around a little with the [document.title](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) property in client side javaScript. This property can be used to both get and set the title text of an html document. There is also a little more to cover when it comes to going beyond the basics with this as well when it comes to using the title tag of a page to inform a user about something as well with javaScript so lets get to it.

<!-- more -->

## 1 - document.title property a basic example

The document.title property of the document object in client side javaScript can be used to get or set the title text of the title element in an HTML document. Just set the desired string value to the document title property and that should do it just fine.

```html
<html>
  <head>
    <title>foo</title>
  </head>
  <body>
    <textarea id="out"></textarea>
    <script>
      var out =document.getElementById('out');
      out.value += document.title + '\n'; // foo
      document.title = 'bar';
      out.value += document.title + '\n'; // bar
    </script>
  </body>
</html>
```

That's all there is to it when it comes to just getting or setting the string value of the title element with javaScript. However maybe there is more to write about when it comes to other factors to consider when setting a titles value. 

## 2 - document title update time when a tab is inactive

When using setTimeout as a way to go about updating the text that is displayed in a title tag, the time at which frames will run can change depending on the browser. For example if I set 33 milliseconds as the desired target time at which the next call to my loop will run, I often get a time around that much if the tag is active and I am not doing much of anything in the function call. However if I change tabs the time between calls will increase to 1000 milliseconds regardless of what value I set.

For example something like this:

```js
var lt = new Date();
var loop = function () {
 
    var now = new Date(),
    t = now - lt;
 
    setTimeout(loop, 33);
 
    document.title = t;
 
    lt = now;
 
};
 
loop();
```

Will update the title text to the amount of time between function calls, as expected it will give me around 33ms if the window is active, but will increase to a second if the window is inactive.
