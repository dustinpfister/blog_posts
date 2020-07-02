---
title: Using fetch to script http
date: 2018-03-27 17:08:00
tags: [js]
layout: post
categories: js
id: 165
updated: 2020-07-02 10:04:40
version: 1.8
---

The client side javaScript [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) method is a new way of making http requests in browser, like the tired yet true [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest). The js fetch method makes use of promises, and provides an updated [response api](https://developer.mozilla.org/en-US/docs/Web/API/Response) for better handling common tasks like parsing json to a workable object. So in many respects it is a little more user friendly compared to the tired yet true XMLHttpRequest method that would need to be used with much additional javaScript code around it to end up with similar functionality.

It is like a browser built in [axios](/2018/01/10/nodejs-axios/), but because it is a new feature it might be to soon to regard it as a replacement for axios or XMLHttpRequest, unless a [polyfill](https://github.com/github/fetch) is used.

<!-- more -->

## 1 - Simple get request example of fetch

If all I want to do with fetch is to preform a get request then making such a simple get request is real simple. In that case fetch just needs to be given one argument which is the URL of the resource that you want to fetch. This is a whole world more simple compared to using XMLHttpRequest.

```js
fetch('https://openlibrary.org/api/books?bibkeys=ISBN:9780743487733;format=json')
.then(response => {
    return response.json();
}).then(json => {
    console.log(json);
});
```

Here I am using the [open library book api](https://openlibrary.org/dev/docs/api/books) to get book info on the time machine. The data is json so I will want to use the json method of the [response api](https://developer.mozilla.org/en-US/docs/Web/API/Response) to get the full json by chaining promises.

## 2 - Using a fetch pollyFill

If you are concerned about support for older browsers, then a polyfill for fetch will have to be used, or just do things the old fashion way with XMLHttpRequst as any polyfill will likely use just that. A popular polyfill for fetch can be found on github here at [github](https://github.com/github/fetch).

Another option would be to just not use fetch at all and chose or make an http client, which is what I would often do rather than using fetch when it comes to working on an actual project where I will need to script http requests.

## 3 - Conclusion

So fetch is a new standard for preforming http requests that can be used in modern browsers, and maybe it is a little easier to use compared to the traditional XMLHttpRequest method. Still when it comes to worrying about browser support I still know that I will get my code to work on a wider range of clients by using the tried yet true XMlHttprequest over fetch. For this reason I often choose to go with XMLHttprequest over fetch when making my own http client, something that I find myself doing now and then when it comes to vanilla JavaScript projects. If you would like my take on [XMLHttpRequest I of course wrote a post on that one for what it is worth](/2018/03/28/js-xmlhttprequest/).

In addition I would not say that fetch is a replacement for various user space http clients that wrap XMlhttprequest rather then that of fetch. If a client is designed right there is a potential to get a best of both world situation between browser support and supporting later features like promises.
