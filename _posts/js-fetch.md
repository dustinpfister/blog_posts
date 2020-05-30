---
title: Using fetch to script http
date: 2018-03-27 17:08:00
tags: [js]
layout: post
categories: js
id: 165
updated: 2020-05-30 19:49:03
version: 1.4
---

[fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a new way of making http requests in browser, like the tired yet true [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), but makes use of promises, and provides an updated [response api](https://developer.mozilla.org/en-US/docs/Web/API/Response) for better handling common tasks like parsing json to a workable object.

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

If you are concerned about support for older browsers, then a polyfill for fetch will have to be used, or just do things the old fashion way with XMLHttpRequst as any polyfill will likely use just that. A popular polyfill for fetch can be found on github here at [https://github.com/github/fetch](https://github.com/github/fetch).