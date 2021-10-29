---
title: document title property is client side javaScript for getting and setting the title tag
date: 2018-12-28 16:35:00
tags: [js]
layout: post
categories: js
id: 352
updated: 2021-10-29 11:52:09
version: 1.29
---

When working on updating the theme for my site one of the many things I think about are my title tags. For many reasons they are one of the most important tags in an html document, and not just from a search engine perspective. Title tags are useful for informing visitors about what a page is about, or what is currently going on with a page when it comes to a web application. That is because the title tag can be this fixed static thing that is just some text, but it can also be [mutated with some javaScript code](https://stackoverflow.com/questions/413439/how-to-dynamically-change-a-web-pages-title) also to display something that will change. 

The title tag is often what will be displayed in a link to the page in a search engine result page, so it is important to think in terms of the actually written content of the title tag. It also goes without saying that the title tag is a great resource to inform a user to something that is going on when it is not just a static page we are talking about, but a single page application of some kind. If it is a messaging app of some kind the title tag can be used to inform a user that they have a new message even when the tag is inactive. If it is a game that has money as a resource that value can be displayed in the title tag for example also.

In this post I will be taking a moment to play around a little with the [document.title](https://developer.mozilla.org/en-US/docs/Web/API/Document/title) property of the [document object](/2021/10/29/js-document/) in client side javaScript. This property can be used to both get and set the title text of an html document. There is also maybe a little more to cover when it comes to using the title property with a few other javaScript features such as setTimeout. Otherwise there is not much to write about if one just wants to set the text of a title element of a page with javaScript.

<!-- more -->

## 1 - The basics of the document title property

In this section I will be starting out with just some very basic examples of the document title property. This will just be a few quick hello world style examples before moving on to some more advanced examples of the use of the title property in later sections in this post. I will be keeping these examples very basic here, but I assume that you have at least some background when it comes to [getting started with javaScript](/2018/11/27/js-document-title/).

### 1.1 - The source code examples in this post are on Github

All the javaScript and html examples in this post can be found in my [test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-document-title) on Github. All of the source code examples for all my [other posts on vanilla javaScript](/categories/js/) should be found there also.

### 1.2 - document.title property a basic example

The document.title property of the document object in client side javaScript can be used to get or set the title text of the title element in an HTML document. Just set the desired string value to the document title property, and that should do it just fine.

```html
<html>
  <head>
    <title>foo</title>
  </head>
  <body>
    <script>
      document.title = 'bar';
    </script>
  </body>
</html>
```

That's all there is to it when it comes to just setting the value of the title element with javaScript. However maybe there is more to write about when it comes to other factors to consider when setting a title tag value such as what happens when a tag goes inactive. Maybe a few more examples beyond that are also in order just to touch base on some related topics to the title property and how to go about doing things with it.

### 1.3 - Simple loop example

Here is another basic example of using the document title method where I am using the [set time out method](/2018/12/06/js-settimeout/) to create a very simple app loop. This way I am not just updating the title text once, but over and over again in the body of this function that is being called at a rate given as the second argument when calling the set time out method.

```html
<html>
  <head>
    <title>Document title loop demo</title>
  </head>
  <body>
    <script>
var c = 0;
var loop = function(){
   setTimeout(loop, 100);
   c += 1;
   document.title = c;
}
loop();
    </script>
  </body>
</html>
```

However it would seem that there is a problem, when I click on another tab in the browser the rate at which the text updates seems to slow down to just about one per second. So in the more advanced sections of this post I will be looking into what the deal is with that a bot more.


## 2 - document title update time when a tab is inactive

When using [setTimeout](/2018/12/06/js-settimeout/) as a way to go about updating the text that is displayed in a title tag, the time at which frames will run can change depending on the browser. For example if I set 33 milliseconds as the desired target time at which the next call to my loop will run, I often get a time around that much if the tag is active and I am not doing much of anything in the function call. However if I change tabs the time between calls will increase to 1000 milliseconds regardless of what value I set.

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

## 3 - Scroll text example

So one thing that comes to mind when it comes to editing the title tag text is to have scrolling text. This is a feature that I find happening now and then in pages. Wiping something like that up just takes a little work with a basic app loop, and the use of the substring String prototype method. It might be a good idea to go with date objects as a way to change the letter index value thought rather than just stepping the index value each time the app loop is called.


```
<html>
  <head>
    <title></title>
  </head>
  <body>
    <script>
var lt = new Date(),
mess = 'Hello World ',
i = 0;
var loop = function () {
    var now = new Date(),
    t = now - lt,
    sec = t / 1000;
    setTimeout(loop, 100);
    document.title = mess.substr(Math.floor(i), 4);
    i += sec;
    i %= mess.length - 1;
    lt = now;
};
 
loop();
    </script>
  </body>
</html>
```

There are some tweaks and additional changes that I might make to something like this, but the basic idea is there. 

## 4 - The visibility Change event

It might also be worth mentioning that the [visibility change event](/2020/10/17/js-onvisibilitychange/) can be used as a way to check if a user has switched tabs or not. This can then be used as a way to change what the text of a title tag should be depending if a user is actually looking at the page or not. This visibility change event can be attached by way of the [add event listener method](/2019/01/16/js-event-listeners/) that is called off of the document object. I then just need to use the string \"visibilitychange\" for the event type, and then pass the function that I want to call each time the event happens. Another useful document propriety to use with this would be the document visibility state property that will contain a string value for the current visibility state of the page.

```html
<html>
  <head>
    <title>active</title>
  </head>
  <body>
    <script>
document.addEventListener("visibilitychange", function() {
  if (document.visibilityState === 'visible') {
    document.title = 'Active'
  } else {
    document.title = 'Not Active'
  }
});
    </script>
  </body>
</html>
```

This might be just a basic example, but in a real project a static text title can be set when the user has the page active in the browser, and a title that reflects the current status of an application can be set as the title when the page is not active.

## 5 - Conclusion

So the document title property is there for getting and setting the value of the title tag of an html document when it comes to client side javaScript. If you are wondering how to go about making some javaScript code that will display some kind of status info via a page title this is how. Also the title tag is a good way of know what will be going on with your javaScript code when a page becomes inactive, as there are only so many other ways of doing that sort of thing.


### 5.1 - Be mindful of making changes to the title with javaScript when it comes to search engines

Google and other search engines have been able to [run javaScript and take the mutated Dom into consideration](https://searchengineland.com/tested-googlebot-crawls-javascript-heres-learned-220157) for some time now. So changes that are made to the title tag with javaScript could possible end up negatively impacting organic traffic performance. So mutating the title tag with javaScript might not always be a good idea for certain projects, such as blog pages that one one want to serve as landing pages to a website.
