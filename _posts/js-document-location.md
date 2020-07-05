---
title: document location object in client side javaScript
date: 2019-01-26 12:34:00
tags: [js]
layout: post
categories: js
id: 365
updated: 2020-07-05 11:59:15
version: 1.29
---

The [document location](https://developer.mozilla.org/en-US/docs/Web/API/Document/location) property contains a [location object](https://developer.mozilla.org/en-US/docs/Web/API/Location) in client side javaScript that contains the URL of the current page, along with other useful properties about the current location of a web page.

In addition to being a way to know the current URL, it can also be used to preform a redirect to a new location by setting the value of the document location property to a string that is the new URL to go to. That is because although the object itself is read only a new URL can be set to the property that will cause the browser to load that new given URL that it has been set to.

So the location property of the document object will come in handy when making any kind of client side system that needs to redirect. With that said in this post I will be outlining some basic use case examples of the document.location property as well as some other related topics such as window location and how it compares to document location.

<!-- more -->

## 1 - document location and a basic example of the href property to read the current location

For a basic example of document location here I have a basic html structurer and a single script tag. Inside the script tag I am using the document location href property to display the current href of the document with the help of the innerText property of an element that I am getting via document.getElementById.

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

So this basic example just displays the current href of the page in the browser window, but one of the most useful aspects of the document location property is that it can be used to preform a client side redirect as well as other tasks as well. There are a few more methods and properties of a location object in client side javaScript so lets look at some more examples of the document location property.

## 2 - A simple document location redirect example

The href property of a location object can also be set to a url, and when doing so will result in a redirect to that url. Although the location object of the document location property is read only a DOMString can be set to the href property of this read only object, and when a new url is assigned to it that will result in a client side redirect to the url that is set to the href property of the location object.

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

The same can also be done with the location href property of the window object as well. In fact in most modern browsers there is not any note worth difference between the two, but that might not always be the case when it comes to older browsers. Some developers seem to suggest that the window location property should be used for this, and anything else that has to do with the location object of the page. However this is a post on document location so that is what I use that in this example, in production code though maybe window location would be best.

## 3 - Document location and window location

It would seem that in some browser environments document location and window location are the same thing, however in others they are not. It might be best to actually stick with window location because that might be more consistent across environments, but don't just take my word for it there is a good [thread on stack overflow](https://stackoverflow.com/questions/2430936/whats-the-difference-between-window-location-and-document-location-in-javascrip) on this one that is worth checking out.

## 4 - The protocol property of document location

Another useful property of the location object at the document location property is the protocol property. This can be used as a way to find out if the page is being hosted via a protocol like that of file:\/\/ rather than http:\/\/ or https:\/\/. In some situations this can be useful if I am developing some kind of project that makes use of a resource that just does not play nice when someone chooses to open it up in the browser rather than hosting it with a web server.

```js
if (location.protocol == 'file:') {
    console.log('File should not be served via file protocol');
} else {
    console.log('we are good')
}
```

Much of the remaining values of a location object will depend on the protocol along with other factors. For example if I am looking at an html document via the file: protocol then the location object will not have a host name or port, because the url is just a path to a static resource located on my computer.

## 5 - Reload a page with javaScript via document.location

So the document location property can be used to redirect, but it can also be used to reload the current page via javaScript as well. To do so I just need to call the reload method of the location object. This could be done in an event handler like in the following example, or by whatever means that would be appropriate when doing so.

```js
<html>
    <head>
        <title>document location</title>
    </head>
    <body>
        <div id="out"></div>
        <input type="button" id="button_reload" value="reload">
        <script>
document.getElementById('out').innerHTML = Math.random();
document.getElementById('button_reload')
.addEventListener('click', function(){
console.log('yes');
  location.reload();
});
        </script>
    </body>
</html>
```

## 6 - The document location host and hostname properties

In a location object there is a host and hostname properties that can get the domain name if there is one to get depending on the protocol. For example if I create an html document and just open it up in the browser then the protocol is file: and then the values for host and hostname are empty strings. However if I host that file locally with an http server then the protocol will be http: and the host and hostname properties will not return an empty string.

The two properties more or less give the same thing, but with one note worth difference the hostname will also give a post if there is one in the url string.

```js
if(location.protocol === 'file:'){
    console.log(location.protocol); // 'file:'
    console.log(location.host); // ''
    console.log(location.hostname); // ''
}else{
    console.log(location.protocol); // 'http:'
    console.log(location.host); // localhost:8080
    console.log(location.hostname); // localhost
}
```

So the values of many of these properties of course depending on the state of the url string. If the protocol is the file: protocol the of course I am not going to get a domain name, or port, because the url is just a path to a local asset.

## 7 - The path name of a document location

The path name of the location object in document will refer to the path name after the protocol host name and port, and before any additional parts of the url afterwards such as query strings and hash tags to any items in the page

```js
//  at https://dustinpfister.github.io/2017/09/14/lodash-find/
console.log(document.location.pathname); // "/2017/09/14/lodash-find/"
```

## 7 - Conclusion

So the document location property is very useful when it comes to client side redirects as well as knowing the current protocol and more about the current location of the page. Document location in most modern browsers seems to be the same thing as window location, but that should not always be assumed especially when it comes to older browsers, namely Internet explorer.

Many other subjects branch off from document location when it comes to things like query strings, ports, protocols and everything else that can often compose a url string. Hopefully you learned one or two new things reading this, but thank you for stopping by in any case.
