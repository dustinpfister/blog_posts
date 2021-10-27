---
title: document location object in client side javaScript
date: 2019-01-26 12:34:00
tags: [js]
layout: post
categories: js
id: 365
updated: 2021-10-27 11:20:03
version: 1.59
---

The [location](https://developer.mozilla.org/en-US/docs/Web/API/Document/location) property of the [document object](https://developer.mozilla.org/en-US/docs/Web/API/Document) in client side javaScript contains a [location object](https://developer.mozilla.org/en-US/docs/Web/API/Location). This location object contains the URL of the current page, along with other useful properties about the current location of a web page. So the property is useful for finding out where a script is being used, but it can also be used as a way to redirect to a new page by setting a value to the href property that is the new desired page url.

So then in addition to being a way to know the current URL, it can also be used to preform a redirect to a new location by setting the value of the document location property to a string that is the new URL to go to. That is because although the object itself is read only a new URL can be set to the property that will cause the browser to load that new given URL that it has been set to. So there is using this location object to know the current location, and also using it to set a new location.

So the location property of the document object will come in handy when making any kind of client side system that needs to know the current location where it is running, as well as changing what the current page is with client side javaScript. With that said in this post I will be outlining some basic use case examples of the document location property as well as some other related topics such as window location and how it compares to document location.

<!-- more -->

## 1 - Basics of the document location object

In this section I will be starting out with a few simple examples of the document location object that have to do with just checking out what the various properties are in terms of useful information, and also things like a simple redirect example. In this basic sections of my posts I like to keep the examples as simple as possible generality, but I still assume that you have at [least some background when it comes to using javaScript](/2018/11/27/js-getting-started/), as well as the various other related skills that are needed in order to do much of anything in client side web development.

### - The source code examples here are on Github

If you are not on Github you should consider signing up and getting into source control at some point, getting into the reasons why would be a bot off topic, but I do like to mentioning that the source code examples in my posts can often be found on Github. This post is not exception as the [source code examples on this post about the document location object can be found in my test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-document-location). The test vjs repository also contains the source code examples for my [many other posts that I have wrote on javaScript](/categories/js/) in general thus far.

### 1.1 - document location and a basic example of the href property to read the current location

For a basic example of document location here I have a basic html structure, and a single script tag. Inside the script tag I am using the document location href property to display the current href of the document with the help of the innerText property of an element that I am getting a reference to by way of the [document.getElementById method](/2018/12/27/js-document-getelementbyid/) yet another useful method of the document object for getting a reference to an element. There are a [lot of other options for getting an element reference](/2020/06/23/js-document-queryselector/) in client side javaScript, but getting into that here and now might be a bot off topic.

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

So this basic example just displays the current href of the page in the browser window. Nothing to interesting of course but this is a basic example after all that just illustrates on features of this little corner of client side javaScript.

However maybe one of the most useful aspects of the document location property is that it can be used to preform a client side redirect to a new page. There are a few more methods and properties of a location object in client side javaScript so lets look at some more examples of the document location property.

### 1.2 - A simple document location redirect example

The href property of a location object can also be set to a url, and when doing so will result in a redirect to that url. Although the location object of the document location property is read only a [DOMString](https://developer.mozilla.org/en-US/docs/Web/API/DOMString) can be set to the href property of this read only object, and when a new url is assigned to it that will result in a client side redirect to the url that is set to the href property of the location object.

For this example I am using the get elements by tag name method of the document object to get an html collection of all input elements in the page, I did it this way just for the sake of switching things up when it comes to how to go about getting an element reference. Anyway once I have an element object reference by one way or the other I then attached an [event handler](/2019/01/16/js-event-listeners/) to the first input element by way of the add event listener method and the on click pointer event that will work with mouse and touch events.

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

### 1.3 - The protocol property of document location

Another useful property of the location object at the document location property is the protocol property. This can be used as a way to find out if the page is being hosted via a protocol like that of file:\/\/ rather than http:\/\/ or https:\/\/. Speaking of which this might be a good time to mention how to go about [getting started with javaScript by way of the file protocol](/2020/09/21/js-getting-started-file-protocol/). If you are new to javaScript you might all ready be developing this way which is by creating static html files with script tags in them, saving them on your location file system, and opening them up in a web browser. However the file protocol will not work well in all situations, some times I run into problems with the file protocol that are resolved by way of hosting what I am working on my way of http.

In some situations this can be useful if I am developing some kind of project that makes use of a resource that just does not play nice when someone chooses to open it up in the browser rather than hosting it with a web server. I can use the location protocol property as a way to fine out if the file protocol is being used, and if so display a message to tell the person using it that then need to host the file by way of http.

```js
if (location.protocol == 'file:') {
    console.log('File should not be served via file protocol');
} else {
    console.log('we are good')
}
```

When it comes to serving a public html folder over the http protocol there are a lot of options to do so. I have [wrote a post on a nodejs simple static sever script](/2017/12/04/nodejs-simple-static-server-file/) that would be one way to go about doing so with just nodejs itself. However when it comes to really getting into back end development with nodejs it might be best to look into frameworks as a way to save time such as with the [express static method in express](/2018/05/24/express-static/).

Much of the remaining values of a location object will depend on the protocol along with other factors. For example if I am looking at an html document via the file: protocol then the location object will not have a host name or port, because the url is just a path to a static resource located on my computer.

### 1.4 - The document location host and hostname properties

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

### 1.5 - The path name of a document location

The path name of the location object in document will refer to the path name after the protocol host name and port, and before any additional parts of the url afterwards such as query strings and hash tags to any items in the page

```js
//  at https://dustinpfister.github.io/2017/09/14/lodash-find/
console.log(document.location.pathname); // "/2017/09/14/lodash-find/"
```

## 2 - Reload a page with javaScript via document.location

So the document location property can be used to redirect, but it can also be used to reload the current page via javaScript as well. To do so I just need to call the reload method of the location object that when called will reload the current page, rather than redirect to a new one. So then in this section I ill be going over a few examples that I have made to see how this method works, and if it does so okay in various kinds of environments such as in the body of event handers, and in application loop functions.

### 2.1 - Basic reload method example of document location

For this example I just wanted to test out of this reload method works as it should when called in the body of an event hander. So I set up a simple example that will just display a random number once when the page loads, so then the only way to go about getting a new random number would be to reload the page. With that said I also placed a button that when clicked will call the reload method of the location object.

```html
<html>
    <head>
        <title>document location</title>
    </head>
    <body>
        <div id="out"></div>
        <input type="button" id="button_reload" value="reload">
        <script>
// random display text
document.getElementById('out').innerHTML = Math.random();
// event handler that will reload the page
document.getElementById('button_reload').addEventListener('click', function(){
    location.reload();
});
        </script>
    </body>
</html>
```

### 2.2 - The reload method works by way of setTiemout also

I was thinking that this is an example of a kind of method that can end up being abused by developers to create a web page that will keep reloading over an over again. So I was thinking that there might be some kind of browser feature that would nit allow this. It would seem that I was wrong with that assumption at least in the version of chrome that I was using at the time of this writing as the below example that uses [setTimeout](/2018/12/06/js-settimeout/) works with the reload method.

```html
<html>
    <head>
        <title>document location</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
// random display text
document.getElementById('out').innerHTML = Math.random();
// using setTiemout
setTimeout(function(){
    location.reload();
}, 3000);
        </script>
    </body>
</html>
```

### 2.3 - App loop example of the reload method

So then because this reload method seems to work okay it can be used not just in event handers that are fired by some kind of user action, but also be used in a condition that can happen inside the body of some kind of application loop.

```html
<html>
    <head>
        <title>document location</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
// state object
var state={
    n : Math.random().toFixed(2),
    lt : new Date(),
    delay : 10,
    secs: 0
};
// loop
var loop = function(){
    var now = new Date(),
    secsDelta = (now - state.lt) / 1000;
 
    setTimeout(loop, 33);
 
    state.secs += secsDelta;
    state.secs = state.secs > state.delay ? state.delay: state.secs;
    if(state.secs === state.delay){
        location.reload();
    }
    state.lt = now;
    // display text
    document.getElementById('out').innerHTML = 'n = ' + state.n + ' , ' +
        'reload in: '+ Math.round(state.secs) + ' / ' + state.delay;
 
};
loop();
        </script>
    </body>
</html>
```

## 3 - Document location and window location

It would seem that in some browser environments document location and window location are the same thing, however in others they are not. It might be best to actually stick with window location because that might be more consistent across environments, but don't just take my word for it there is a good [thread on stack overflow](https://stackoverflow.com/questions/2430936/whats-the-difference-between-window-location-and-document-location-in-javascrip) on this one that is worth checking out.

## 4 - Conclusion

So the document location property is very useful when it comes to client side redirects as well as knowing the current protocol and more about the current location of the page. Document location in most modern browsers seems to be the same thing as window location, but that should not always be assumed especially when it comes to older browsers, namely Internet explorer.
Many other subjects branch off from document location when it comes to things like query strings, ports, protocols and everything else that can often compose a url string. There is also much more to cover when it comes to redirecting traffic also, this might be the typically way to do so when it comes to client side javaScript, however it is not a replacement for sever side solutions for dong so. Hopefully you learned one or two new things reading this, but thank you for stopping by in any case.
