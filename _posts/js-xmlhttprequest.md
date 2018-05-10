---
title: Good old xmlHttpRequest for scripting http requests
date: 2018-03-28 16:16:00
tags: [js]
layout: post
categories: js
id: 166
updated: 2018-03-29 16:22:27
version: 1.2
---

These days there are a ton of options for scripting http, I have written posts on [axios](/2018/01/10/nodejs-axios/), and [fetch](/2018/03/27/js-fetch/), but I still find myself using [XMLHttprequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) for these tasks. It does have it's draw backs, compared to more modern solutions, but it is not that hard to quickly make a solution that makes use of more modern javaScript features like promises.

<!-- more -->

## Using an XMLHTTPRequest pollyfill

There was once a time where the use of a pollyfill for XMLHttpRequest was a must, today more often then not it might not be as big of a deal. Of course it really comes down to browser share of your site, for me it does not seem to matter everyone is using late versions of IE, when they are using IE, which is not often.

Still If it is desired to push backward compatibility as far back as possible a pollyfill like this might be used.

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

This is only really needed if for some reason you want to march backward comparability of your project all the way back to IE 5. Maybe if for some reason you get a lot of traffic from china, or some country where there are still a lot of people using these browsers a Polly fill will be of interest.

However if you site analytics show nothing but IE 7, and older chances are there is not much of a reason to bother with the polly fill anymore, and you can just assume that it is there in window to work with.

In which case you can just use the constructor.

```js
var xhr = new XMLHttpRequest();
```

## Using XMLHttprequest to make a method for scripting http

I often prefer to make some kind of easy to use method that can be used with just one ore two arguments, but can also be given additional things to work with via some kind of con fig object, just like that of the popular solutions like axios.


So I might end up with something like this.

```js
var http = function(argu, done, fail) {
 
  var xhr = new XMLHttpRequest();
 
  // if first argument is a string, assume it is a url for a get request
  if (typeof argu === 'string') {
 
    argu = {
      url: argu
    }
 
  }
 
  argu = argu || {};
 
  // default method is GET, payload is null, and URL is location.href
  argu.method = argu.method || 'GET';
  argu.playload = argu.payload || null;
  argu.url = argu.url || location.href;
 
  // default done and fail callbacks
  argu.done = done || argu.done || function() {};
  argu.fail = fail || argu.fail || function() {};
 
  // default before send method
  argu.beforeSend = argu.beforeSend || function(xhr, next) {
    next();
  };
 
  // open the request
  xhr.open(argu.method, argu.url, true);
 
  // setup on ready state method to call done or fail methods
  xhr.onreadystatechange = function() {
 
    console.log(this.readyState);
 
    if (this.readyState === 4) {
 
      if (this.status === 200) {
 
        argu.done.call(this)
 
      } else {
 
        argu.fail.call(this);
 
      }
 
    }
 
  };
 
  // call before send, and send request
  argu.beforeSend(xhr, function() {
 
    xhr.send(argu.payload);
 
  });
 
};
```

So then I can use it like this:

```js
// the method in action
http('https://openlibrary.org/api/books?bibkeys=ISBN:9780743487733;format=json', function() {
 
  console.log(this.response);
 
});
```

Or like this:

```js
http({
 
   url: 'https://openlibrary.org/api/books?bibkeys=ISBN:9780743487733;format=json',
   done : function(){
     console.log(this.response);
   }
 
});
```

## Using a fetch pollyfill

Of course you could do what I just did, and throw together your own solution, but it might be best to just use something that is out there all ready, and see that it confroms to some kind of newer standard for this sort of thing. Because fetch is poised to be the new replacement for XMLHttprequest it might be a good idea to make (or find) some kind of pollyfill that does a good job of bringing fetch to older browsers. for that you might want to check out [fetch.js](https://github.com/github/fetch/blob/master/fetch.js).

## Conclusion

XMLhttprequest is the best solution for scripting http if you care about trying to get your code to work on a wide range of browsers, as it is the tired yet way of doing it. For the most part I would not loose sleep over it thought if you choose to go with something more modern.

