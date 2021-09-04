---
title: client side xmlHttpRequest for scripting http requests in a tired yet true way
date: 2018-03-28 16:16:00
tags: [js]
layout: post
categories: js
id: 166
updated: 2021-09-04 11:04:37
version: 1.26
---

These days there are a ton of options for scripting http requests with javaScript when it comes to modern native options like [fetch](/2018/03/27/js-fetch/), as well as popular user space options like [axios](/2018/01/10/nodejs-axios/) that seems to be a popular solution for this sort of thing. Many developers go so far as to make there own http clients themselves when it comes to yet another option, but even then a native method of one sort or another will have to be used in order to do so. There is using a modern browser built in feature like fetch, but I would still go with the old fashion tired yet true [XMLHttprequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) for these tasks in many simple pet projects at least. 

It does have it's draw backs, compared to more modern solutions, but it is not that hard to quickly make a solution that makes use of more modern javaScript features like promises. It is true however that if I am going to start to invest a great deal of time into making my own http client, I should probably stop and take another look at where there is in terms of user space options for http clients. There are many great solutions out there all ready and I am not sure if I really need to be yet another developer inventing the wheel again by making yet another http client.

Still if I do choose to make my own custom tailored http client I will most likely use XMLHttpRequest as a way of making the request. Often I just go with it for examples where I just need to make a request for an example when working out a simple client system for an examples that has to do with a back end framework, or something to that effect as to not complicated the process any father than it needs to. In this post then I will be going over some very basic use case examples of the XMLHttpRequest method, as well as any additional topics that might come up when using the method.

<!-- more -->

## 1 - Basic XmlHttpRequest examples

In this section I will be starting out with just some basic, simple, copy and past style examples of XMLHttprequest, for typical situations of the use of the method. The basic process starts out with creating a new request object by calling the XMLHtteprequest constructor with the new keyword just like any other javaScript constructor function. Then I call the open method off of the request object that is returned by the constructor passing some arguments for the kind of request that I want to make, along with the url to make the request to, and a few additional options. After that I will want to do something with an on ready state change method to handle the request, and finish by calling the send method.

The basic process will switch up a little here and there though depending on the kind of request that I would like to make. Often I might need to set some additional headers for the server that I will be sending the request to, and so forth. I will not be covering all the bases with the various kinds of requests here, but I should at least cover some basic examples of get requests at least to start off with.

### 1.1 - Basic hello world example getting some plain text

First off I have a simple example that will be used to just get plain text. When it comes to just getting some text there is nothing special that needs to be done. Just create a new instance of a request object, open the request, create a handler, and call send.

```html
<html>
    <head>
        <title>XMLHttpRequest example</title>
    </head>
    <body>
        <textarea id="out"></textarea>
        <script>
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dustinpfister.github.io/', true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('out').value += this.response;
        }
    };
    xhr.send();
        </script>
    </body>
</html>
```

### 1.2 - Get json example

To get JSON I just need to make the responseType prop JSON, after that the process is more or less the same as plain text. I do not even have to parse the response when I do it this way now.

```html
<html>
    <head>
        <title>XMLHttpRequest example</title>
    </head>
    <body>
        <script>
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dustinpfister.github.io/json/fakekeys.json', true);
    xhr.responseType = 'json';
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            console.log(this.response['fake-site-one']);
        }
    };
    xhr.send();
        </script>
    </body>
</html>
```

### 1.3 - Get an image and append the image to html

When [downloading images using XMLHttprequest](https://stackoverflow.com/questions/8778863/downloading-an-image-using-xmlhttprequest-in-a-userscript) it is possible that I might run into cross domain problems. If So addressing that might be outside the scope of this post, assuming that it is possible to begin with depending on the situation. However if I am trying to get something that is in my own domain something like this should work.

```html
<html>
    <head>
        <title>XMLHttpRequest example</title>
    </head>
    <body>
        <div id="out"></div>
        <script>
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dustinpfister.github.io/favicon.ico', true);
    xhr.responseType = 'blob';
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var img = document.createElement('img')
            img.src = window.URL.createObjectURL(this.response);
            document.getElementById('out').appendChild(img);
        }
    };
    xhr.send();
        </script>
    </body>
</html>
```

## 2 - Using XMLHttprequest to make my own method for scripting http

So I have covered a few basic examples of working directly with the XMKHttpRequest method, however often I will still want to use some kind of http client library, or make my own from the ground up, that has a lot of typically use case examples precoded and ready to use.For example when it comes to working with XMLHttpRequest directly I have to remember things like setting the response type to blob rather than the default text setting when I want to use it to get an image, and on top of that the response is a blob, not an image element. However when it comes to making my own http client I can create a public method that is a kind of load image method that will make a request with the property settings, and parse and return an image element as the response in an on done callback or resolved promise.

In this section I will be going over the source code of a basic http client method that I first worked out when making a basic game framework javaScript example. In that example I wanted to have an asset loader that will be used in a built in load state, so I needed some kind of basic http client for it. At the time of this writing I was just interested in loading images, so I have two methods one of which the aim is just a simple http method that can be used to preform request in general, and the other for images.

### 2.1 - A utils module that mainly just my http methods

Here is then the state of the http method of my utils lib in the game framework at the time of this writing at least. The main http method will take a single object as an argument, that should contain at least a url to the resurface that I want to get, or that path that I want to post to, with a body of course in that case. I have not extensively tested this yet, but so fra it works fine for what I want to use if for in my game framework.

```js
var utils = {};
 
// no operation ref
utils.noop = function () {};
 
/********* ********** ********** *********/
//  HTTP
 /********* ********** ********** *********/
 
// very simple http client
utils.http = function(opt){
    var opt = opt || {};
    // default options
    opt.url = opt.url || '';
    opt.method = opt.method || 'GET';
    opt.async = opt.async === undefined ? true: opt.async;
    opt.body = opt.body === undefined ? null: opt.body;
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    opt.responseType = opt.responseType || '';  // set to 'blob' for png
    // create and set up xhr
    var xhr = new XMLHttpRequest();
    xhr.responseType = opt.responseType;
    xhr.open(opt.method, opt.url, opt.async);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if(xhr.status >= 200 && xhr.status < 400){
                opt.onDone.call(xhr, xhr.response, xhr);
            }else{
                opt.onError.call(xhr, xhr);
            }
        }
    };
    // send
    xhr.send(opt.body);
};
 
// load just a png file, this calls utils.http with proper settings, and the response is an Image
utils.httpPNG = function(opt){
    opt = opt || {};
    opt.onDone = opt.onDone || utils.noop;
    opt.onError = opt.onError || utils.noop;
    utils.http({
        url: opt.url,
        responseType: 'blob',
        onDone : function(res, xhr){
            var imageURL = window.URL.createObjectURL(res);
            var image = new Image();
            image.src = imageURL;
            opt.onDone.call(xhr, image, xhr);
        },
        onError: opt.onError
    });
};
```

### 2.1 - Basic example of my utils.http method

Now for a basic example of this to get started with. In this example I will just be using the http method of the utils lib to get the html of my website and inject it into a text area element.

```js
<html>
    <head>
        <title>XMLHttpRequest example</title>
    </head>
    <body>
        <textarea id="out" cols="100" rows="25"></textarea>
        <script src="./utils.js"></script>
        <script>
utils.http({
    url: 'https://dustinpfister.github.io/',
    method: 'GET',
    onDone: function(res, xhr){
        document.getElementById('out').value = res;
    }
});
        </script>
    </body>
</html>
```

## 3 - Using an XMLHTTPRequest pollyfill

There was once a time where the use of a pollyfill for XMLHttpRequest was a must, today more often then not it might not be as big of a deal as this is only something that would apply to really old versions of Internet explorer these days. Of course it really comes down to browser share of your site, for me it does not seem to matter everyone is using late versions of IE, when they are using IE at all to begin with, which is not often.

Still If it is desired to push backward compatibility as far back as possible a pollyfill like this might be used to do so.

```js
  var xhr;
  if (window.XMLHttpRequest) { // Mozilla, Safari, ...
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) { // IE
    try {
      xhr = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        console.log('error, no XHR support at all');
        return;
      }
    }
  }
```

This is only really needed if for some reason you want to march backward comparability of your project all the way back to IE 5 which at this time is a browser that is over 15 years old now. Maybe if for some reason you get a lot of traffic from China, or some country where there are still a lot of people using old browsers a Polly fill will be of interest. I am a bit of a nostalgia nerd myself, but even I do not bother with this any more.

However if you site analytics show nothing but IE 7, and older chances are there is not much of a reason to bother with the polly fill anymore, and you can just assume that it is there in window to work with.

In which case you can just use the constructor and move on.


## 4 - Using a fetch pollyfill

Of course you could do what I just did, and throw together your own solution, but it might be best to just use something that is out there all ready, and see that it conforms to some kind of newer standard for this sort of thing. Because fetch is poised to be the new replacement for XMLHttprequest it might be a good idea to make (or find) some kind of pollyfill that does a good job of bringing fetch to older browsers. for that you might want to check out [fetch.js](https://github.com/github/fetch/blob/master/fetch.js).

## 5 - Conclusion

The XMLhttprequest method might be the best solution for scripting http if you care about trying to get your code to work on a wide range of browsers, as it is the tired yet way of doing so. For the most part I would not loose sleep over it thought if I where to choose to go with something more modern, at least when it comes to looking at what is going on with browser vender's and versions with this site at least.

