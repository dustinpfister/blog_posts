---
title: document location object in client side javaScript
date: 2019-01-26 12:34:00
tags: [js]
layout: post
categories: js
id: 365
updated: 2019-06-11 19:53:03
version: 1.11
---

The [document location](https://developer.mozilla.org/en-US/docs/Web/API/Document/location) property contains a [location object](https://developer.mozilla.org/en-US/docs/Web/API/Location) in client side javaScript that contains the url of the current page, along with other useful properties about the current location. An additon to being a way to know the current url, it can also be used to preform a redirect to a new location. That is because although the object itself is read only a new url can be set to the property that will cause the browser to load that url. So in this post I will be outlining some basic use case examples of the document.location property.

<!-- more -->

## 1 - document location basic example

For a basic example of document location here I have a basic html structurer and a single script tag. Inside the script tag I am using the document location href property to display the current href of the document.

```html
<html>
    <head>
        <title>document location</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
let el = document.getElementById('out')
el.innerText = document.location.href;
        </script>
    </body>
</html>
```

So this basic example just displays the current href of the page in the browser window, but many one of the most useful aspects of the document location property is that it can be used to preform a client side redirect.

## 2 - redirect example with document location

The href property of a location object can also be set to a url, and when doing so will result in a redirect to that url. Although the location object of the document location property is read only a DOMString can be assigned to it that will result in a similar effect as doing so to the href property of the location object

```html
<html>
    <head>
        <title>document location redirect</title>
    </head>
    <body>
        <input value="to google" type="button">
        <script>
document.getElementsByTagName('input')[0].addEventListener('click', function(){
document.location.href = 'https://www.google.com/';
});
        </script>
    </body>
</html>
```

## 3 - The protocol property of document location

Another useful property of the location object at the document location property is the protocol property. This can be used as a way to find out if the page is being hosted via a protocol like that of file:// rather than http:// or https://. In some situations this can be useful if I am developing some kind of project that makes use of a resource that just does not play nice when someone chooses to open it up in the browser rather than hosting it with a web server.

```js
if (location.protocol == 'file:') {
    console.log('File should not be served via file protocol');
} else {
    console.log('we are good')
}
```

## 4 - Conclusion

So the document location property is very useful when it comes to client side redirects as well as knowing the current protocol and more.
