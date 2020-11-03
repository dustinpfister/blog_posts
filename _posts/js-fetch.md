---
title: Using fetch to script http
date: 2018-03-27 17:08:00
tags: [js]
layout: post
categories: js
id: 165
updated: 2020-11-03 10:48:19
version: 1.12
---

In late specs of client side javaScript there is the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) method that is a way of making http requests in browser that is introduced in the [whatwg living standard](https://fetch.spec.whatwg.org/) . It is like the tired yet true [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) method, but may prove to be a little easier to use, and returns a promise out of the box. However one draw back might be browser support for older platforms, depending on the situation with that the fetch method might have to be polyfilled, and is thus not necessary a native replacement for user space http clients like [axios](https://github.com/axios/axios).

So then the js fetch method makes use of promises, and provides an updated [response api](https://developer.mozilla.org/en-US/docs/Web/API/Response) for better handling common tasks like parsing json to a workable object which is a nice feature. So in many respects it is a little more user friendly compared to the tired yet true XMLHttpRequest method that would need to be used with much additional javaScript code around it to end up with similar functionality. It might still be a smarter play to go with a user space option that makes use of XMLhttpRequest to provide the same functionality still tough, at least that is what I would do more often then not.

So the fetch native client side javaScript method is like a browser built in modern http client. However because fetch is still a new feature relative to XMLhttprequest at least, it might be to soon to regard it as a replacement for a user space http client. However the fetch method can be added to older platforms by making use of a [polyfill](https://github.com/github/fetch) for the fetch method. Still in my projects in generally prefer to use a user space http client, or the tired yet true XMLHttprequest method.

In any case the fetch method is still without question a feature in modern browsers that is worth a moment of my time to write at least one post on the subject. I have done so all ready with [XMLHttpRequest](/2018/03/28/js-xmlhttprequest/), and [axios](/2018/01/10/nodejs-axios/) after all.

<!-- more -->

## 1 - Simple get request example of fetch

For starterts I think an example that is just a basic get request would be in order, as that is often the case with these kinds of posts. Say that I want to prefrom a get request to just get the html text of a given page at a certain location on the open web, for argument sake how about just the text of this very blog post? In that case fetch just needs to be given one argument which is the URL of the resource that I want to fetch. This is a whole world more simple compared to using XMLHttpRequest that often proves to be a bit of a pain by comparison.

```html
<html>
    <head>
        <title>js fetch</title>
    </head>
    <body>
        <textarea id = "out" cols="100" rows="15"></textarea>
        <script>
let out = document.getElementById('out');
fetch('https://dustinpfister.github.io/2018/03/27/js-fetch/')
.then(response => {
    return response.text();
}).then((text) => {
    out.value = text;
}).catch((e)=>{
    out.value = e.message;
});
        </script>
    </body>
</html>
```

So when calling fetch and giving the URL of this page as the first argument what is returned is a promise. I will not be getting into detail about promises here, but the typical basic use of them involves attaching then and catch calls that will fire depending on the outcome of the request.

If all goes well in the body of the next then call I will have access to a [response object](https://developer.mozilla.org/en-US/docs/Web/API/Response). This response object will not have the text of the page at the ready necessary, but there is a method of the response object to get just that tough. In this case I am not getting JSON, but html that can be thought of as just plain text content, so calling the text method of the response API will give me what I would want from the response object in this case. In the event that there is some kind of error the catch call will fire, and in the body of that method I can potentially handle the error.

So maybe this is not the most compelling example of the js fetch method, but you should get the basic idea at least. It is a more modern, and easier way to go about making http get requests compared to XMLHttpRequest, and in modern browsers it is there to work with without any additional javaScript code being made part of the projects dependences.

## 2 - Making a Post request with fetch

```html
<html>
    <head>
        <title>js fetch</title>
    </head>
    <body>
        <textarea id = "out" cols="100" rows="15"></textarea>
        <script>
let out = document.getElementById('out');
fetch('localhost:8080/data', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
     action: 'search',
     query: 'foo'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
        </script>
    </body>
</html>
```

## 3 - Using a fetch pollyFill

If you are concerned about support for older browsers, then a polyfill for fetch will have to be used, or just do things the old fashion way with XMLHttpRequst as any polyfill will likely use just that. A popular polyfill for fetch can be found on github here at [github](https://github.com/github/fetch).

Another option would be to just not use fetch at all and chose or make an http client, which is what I would often do rather than using fetch when it comes to working on an actual project where I will need to script http requests.

## 4 - Conclusion

So fetch is a new standard for preforming http requests that can be used in modern browsers, and maybe it is a little easier to use compared to the traditional XMLHttpRequest method. Still when it comes to worrying about browser support I still know that I will get my code to work on a wider range of clients by using the tried yet true XMlHttprequest over fetch. For this reason I often choose to go with XMLHttprequest over fetch when making my own http client, something that I find myself doing now and then when it comes to vanilla JavaScript projects. If you would like my take on [XMLHttpRequest I of course wrote a post on that one for what it is worth](/2018/03/28/js-xmlhttprequest/).

In addition I would not say that fetch is a replacement for various user space http clients that wrap XMlhttprequest rather then that of fetch. If a client is designed right there is a potential to get a best of both world situation between browser support and supporting later features like promises.
