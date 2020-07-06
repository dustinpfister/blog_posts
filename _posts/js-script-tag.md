---
title: Script tags in client side javaScript
date: 2019-01-19 18:39:00
tags: [js]
layout: post
categories: js
id: 361
updated: 2020-07-06 12:12:12
version: 1.22
---

In javaScript [script tags](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) come into play with web development when I want to do anything that involves the use of client side javaScript in a website. Script tags can be used to add in line javaScript, and can also be used to link to external javaScript files also by placing javaScript code between and opening and closing script tag. 

It is also possible to create javaScript script tags with javaScript also as a way to load additional external javaScript file assets with javaScript code. Just about any script loaded would have to do that as a way to inject additional code more often then not because other options such as [eval](/2019/09/09/js-eval/) bring about problems with speed and security. In this post I will be sharing all the little things there are to know about when working with script tags to get things working with client side javaScript.

<!-- more -->

## 1 - script tags can be used to add in line javaScript code to a website

So in this section I will be starting off with a simple example of using script tags to add in-line javaScript to a page. When it comes to doing this in a modern ECMA 2015+ spec javaScript world there is no need to bother with a type attribute or any kind of means to comment out the javaScript code. When it comes to older browsers, and older html specs before that of html 5 it might have been necessary when making a script tag. However these days a script tag just needs to have javaScript placed between proper opening and closing script tags.

So an in line script tag today might look something like this:

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

I some times use in line javaScript for simple projects, but often the code will ultimately end up in an external javaScript file. When that is the case the src attribute must be used to load the javaScriot file, or a script tag must be created and injected into the document. So with that in mind lets look at some more examples of the script tag in action.

## 2 - script tags and external javaScript files loaded by way of the src attribute

It is also possible to load external scripts with script tags of course on top of just in-line javaScript. Doing so helps to keep things clean, and better structured, and in some cases doing so might be required as in-line scripts might not be allowed. So then loading an external javaScript file with a script tag can be done by making use of the src attribute of the script tag to point to the url of the external javaScript file. In this section I will be doing so with hard coded script tags that are written in the html itself, rather than doing something complex involving the create element method, or the function constructor.

So for this section I again have a simple example of a script tag only now with an scr attribute that links to a main.js file that should be in the same relative path as the html file. I make sure that I am placing the script tag just before the end body tag because in this case the javaScript code in the javaScript file makes use of an element that is hard coded in the html.

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

I then have this javaScript code in the external file that just grabs the div tag with and id of out and just adds some text to that element.

```js
document.getElementById('out').innerText = 'external';
```

## 3 - Creating script tags with javaScript

So then there is creating script tags with javaScipt and then appending them to the html document with an element method. One way that this can be done is with the document.createElement method which will return a script tag when the tag name of script is given as the first argument. Then once a reference to the script tag is obtained that script tag can then be appended to the html with something like the appendChild method just like any other html element. The reference can then be used to set an src attribute to the external javaScript file to load which will cause the browser to start to load the script.

Script tags are loaded async by default, depending on the situation this may or may not be a problem. For example if the javaScript code of one script tag depends on another, then it might be best for them to be loaded in the proper sync order. However if each script is a stand alone utility library that does not have any dependencies at all, then it might be better for them to be loaded async. In any case in this section I will be going over some examples of creating and loading script tags with native javaScript with very little dependence on hard coded script tags in the html itself.

### 3.1 - Creating and Loading scripts sync style the hard way

So say I have an html document with a single hard coded ul aka unordered list tag element, and a single script tag that links to a loader.js file. This loader.js file can then be used to load additional scripts that do something with that ul tag such as inject a bunch of li or list item tags for it.

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

So then it seems that this simple script loader will load scripts in order one at a time which is important if one script depends on something that a previous script does. There is the question of loading all scripts at once, and then executing them all in the proper order when that is a factor of concern

### 3.2 - Loading Script Tags sync style the easy way

So in the first example in this section I created and loaded script tags with javaScript using the create element method. By default when creating script tags this way with javaScript, the scripts will load async. That is that they will not always load in the order in which they are given in the array of scripts. However they still loaded in order each time because I would not create a new script tag and start loading it until the first script finishes loading.

However another way to load scripts sync style is to make sure that the async attribute of the script tag is set to false.

```js
console.log('loading scripts...');
var base = 'https://cdnjs.cloudflare.com/ajax/libs/';
var libs = [
    'jquery/3.4.1/jquery.js',
    'three.js/106/three.js',
    'axios/0.19.0/axios.js'
];
var loaded = 0;
libs.forEach(function (libPath, i) {
    var scriptTag = document.createElement('script');
    // load in sync order (jquery, three, then axios)
    scriptTag.async = false;
    scriptTag.addEventListener('load', function (e) {
        console.log(e.target.src);
        loaded += 1;
        if (loaded === libs.length) {
            console.log('all loaded');
        }
    });
    scriptTag.src = base + libPath;
    document.body.appendChild(scriptTag);

});
```

In this example the Script tags load in sync order as well.

### 3.3 - loading script tags async style when creating them with javaScript

In oder to load script tags async style I just need to use the create element method to create the script tag, append to the html document, and set the src attribute to the location of the script. By default script tags create this way will load asycn style.

## 4 - Conclusion

There is a great deal more to write about when it comes to the ins and outs of script tags in client side javaScript. There is also a lot more to write about when it comes to alternative means of pulling javaScript code from a server and running it on the client. For now though that is all. At least from now to the point that I get a little more done with editing on this post.