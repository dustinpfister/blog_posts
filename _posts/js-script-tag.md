---
title: Script tags in client side javaScript
date: 2019-01-19 18:39:00
tags: [js]
layout: post
categories: js
id: 361
updated: 2019-07-30 14:25:26
version: 1.12
---

In javaScript [script tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) come into play with web development when I want to do anything that involves the use of client side javaScript in a website. Script tags can be used to add in line javaScript, and can also be used to link to external javaScript as well. It is also possible to create javaScript script tags with javaScript as well as a way to load additional external assets with code. In this post I will be sharing all the little things there are to know about when working with script tags to get things working with client side javaScript.

<!-- more -->

## 1 - script tags can be used to add in line javaScript code to a website

A script tag can be used to add javaScript to a website by placing the javaScript code between the beginning and ending script tags. These days there is not need to set the script tags type attribute to javaScript as that is what is assumed these days.

```html
<html>
    <head>
        <title>script tags and inline scripting</title>
    </head>
    <body>
        <script>
var n = 40;
console.log(n+2); // 42
        </script>
    </body>
</html>
```

I some times used in line javaScript for simple projects, but often the code will ultimately end up in an external javaScript file. When that is the case the src attribute must be used to load the javaScriot file, so lets look at some more examples of the script tag in action.

## 2 - script tags and external javaScript files

It is also possible to load external scripts as well. This can be done by making use of the src attribute of the script tag to point to the url of the external javaScript file.

For example here I have some html, and I am linking to the external javaScript file by adding a script tag in the body element just before the end body tag.

```html
<html>
    <head>
        <title>script tag</title>
    </head>
    <body>
        <script>
        </script>
        
        <div id="out"></div>
        <script src="main.js"></script>
    </body>
</html>
```

I then have this javaScript in the external file that just grabs the div tag with and id of out and just adds some text to that element.

```js
document.getElementById('out').innerText = 'external';
```

## 3 - Creating script tags with javaScript

So then there is creating script tags with javaScipt and then appending them to the html document. This can be done with the document.createElement method which will return a script tag when the tag name of script is given as the first argument. Once a reference to the script tag is obtained that script tag can then be appended to the html with something like the appendChild method just like any other html element. The reference can then be used to set an src attribute to the external javaScript file to load which will cause the browser to start to load the script.

Script tags are loaded async by default according to the Mozilla documentation any way. Depending on the situation This may or may not be a problem. If one script depends on another then it might be best for them to be loaded in the proper order, otherwise it might be better for them to be loaded async. In any case in this section I will be going over some examples of creating and loading script tags with native javaScript.

### 3.1 - Creating and Loading scripts sync style the hard way

So say I have an html document with a single hard coded ul tag element, and a single script tag that links to a loader.js file. This loader.js file can then be used to load additional scripts that do something with that ul tag.

```html
<html>
    <head>
        <title>script tag</title>
    </head>
    <body>
        <script>
        </script>
        <ul id="out"></ul>
        <script src="loader.js"></script>
    </body>
</html>
```

The loader.js file might look something like this:

```js
console.log('loading scripts...');
var scripts = ['foo.js', 'bar.js'],
i = 0,
loadNext = function () {
    var scriptTag = document.createElement('script');
    scriptTag.src = scripts[i];
    scriptTag.addEventListener('load', function () {
        i += 1;
        if (i < scripts.length) {
            loadNext();
        } else {
            console.log('scripts loaded');
        }
    })
    document.body.appendChild(scriptTag);
};
loadNext();
```

One of the scripts is a foo.js file that looks like this.

```js
console.log('foo script runing...');
var out = document.getElementById('out');
var i = 10;
while (--i) {
    var li = document.createElement('li');
    li.innerText = 10 - i;
    out.appendChild(li);
}
```

And a bar.js file that looks like this.

```js
console.log('bar script running');
[].forEach.call(document.getElementsByTagName('li'), function (li,i) {
    li.innerText = 'bar ' + i
});
```

According to the Mozilla documentation when a script is created with the create element method the scripts are loaded async by default.

So then it seems that this simple script loader will load scripts in order one at a time which is important if one script depends on something that a previous script does. There is the question of loading all scripts at once, and then executing them all in the proper order when that is a factor of concern

## 4 - Loading Scripts async