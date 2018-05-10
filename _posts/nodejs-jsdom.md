---
title: Client side javascript in a node.js environment using jsdom
date: 2018-01-11 16:32:00
tags: [js,node.js]
layout: post
categories: node.js
id: 131
updated: 2018-01-14 15:04:22
version: 1.5
---

There comes a time now and then that I need to work with html in a server side, node.js environment. I have wrriten about a very helpful project called [cheerio](https://www.npmjs.com/package/cheerio) that works well if I just want to grab at something liek a link, or maybe make some kind of edit to html. However cheerio is not an actual emulation of a browser environment. There are other projects that aim to actually emulate an actual usable browser environment for the purpose of getting client side apparitions to work in a node.js project server side. The npm package [jsdom](https://www.npmjs.com/package/jsdom) is one such project, and as such this post will be about how to use jsdom to bring a browser environment to node.

<!-- more -->

Basic example of jsdom

For a basic example of using jsdom I started with with a hard coded html string, and loaded it with the constructor that is exported by the jsdom module. What is returned by the jsdom constructor is something that I quickly found to be just like that of the DOM that I am familiar with when it comes to working within a browser environment. 

I was able to quickly, and easily get the innerHTML of an element in the very same fashion. SOmething that I would expect from a project that aims to emulate a browser environment in a node.js environment. 

```js
let jsdom = require('jsdom').JSDOM,
 
// some hard coded html
html = ''+
'<!DOCTYPE html>'+
    '<html>'+
    '<head>'+
        '<title>Blank</title>'+
    '</head>'+
    '<body>'+
        '<p>Hello World</p>'+
    '</body>'+
'</html>',
 
// get the dom by calling the jsdom constructor, and giving it the html
dom = new jsdom(html),
 
// get the window object @ dom.window
window = dom.window,
 
// now just do whatever, just like in the browser
el = window.document.querySelectorAll('p')[0];
 
console.log(el.innerHTML); // hello World
```

So far it seems like this project might be just what I had in mind when it comes to having a way to run client side code headless on a server.

## Running a script tag with jsdom

So this is what really sets jsdom apart from other projects like cheerio, which is a great project, it's just that it is really just good for transversing over html content, and maybe making an edit or two. Jsdom can actually run most client side scripts headless.

```js
let jsdom = require('jsdom').JSDOM,
 
// some hard coded html
html = ''+
'<!DOCTYPE html>'+
    '<script>'+
        'console.log(\'I am a script tag.\');' +
    '</script>';
 
// logs 'I am a script tag' in the console.
new jsdom(html,{ runScripts: 'dangerously' });
```

## Don't expect everything to work.

Do not expect everything to work, at least not out of the box.

For one thing scripts will not just run by default, as you can see in the example I need to set the value 'dangerously' to the property 'runScripts' in a config object that I pass to the jsdom constructor. As you might expect this is done for security reasons when loading content from untrusted sources, but if you are justing testing things out with your own work, and you know what everything does it is of course not an issue.

In addition to scripts not just working by default without giving the proper runScripts value, many thing will not work without additional modules, other things might work but in a pretend only kind of fashion. Anything that has to do with canvas will for instance not render, because there is nothing to render to if we are going headless. There is still a way to get this working with jsdom, if for some reason you want to, but it involves the use of additional projects.

## Running an external html file, and it's sub resources.

If I want to run a client side app that exists as something in a \*.html file I can attept to load it using jsdoms fromFile method. When doing so I might often have external resources that are referenced from the \*.html file such as external scripts, and other assets. To make use that jsdom is making use of everything that is referenced from the *\.html file I will want to pass some options to the method, on top of the path to the file.

So I set up a public html folder, and placed the following index.html file at the root name space.
```html
<!DOCTYPE html>
<html>
    <head>
        <title>External file</title>
    </head>
    <body>
        <h1>I am an external file</h1>
        <script>
            console.log('I am a script tag on the index.html file');
        </script>
        <!-- here is a line to a sub resource -->
        <script src="sub.js"></script>
    </body>
</html>
```

I also placed a sub.js file at root as well, and linked to it in the html.

```js
var n = 40 + 2;
console.log('I am a sub resource, the answer is : ' + n);
```

And to make use of all this i made a from_file.js demo that I will call from the command line.

```js
let jsdom = require('jsdom').JSDOM,
 
// the file I will be loading
uri = 'public/index.html',
 
// the options that I will be giving to jsdom
options = {
    runScripts: 'dangerously',
    resources: "usable"
};
 
// load from an external file
jsdom.fromFile(uri, options).then(function (dom) {
 
    let window = dom.window,
    document = window.document;
 
    console.log(document.querySelectorAll('h1')[0].innerHTML);
 
}).catch (function (e) {
 
    console.log(e);
 
});
```

This worked as expected just fine, but of course it is not at all a real application. The resources that can be loaded also include iframes, stylesheets, and images on top of external scripts.

## Add something to window before html is parsed.

Jsdom allows for me to define some things before html is parsed to populate the document.

```js
let jsdom = require('jsdom').JSDOM,
 
// the options that I will be giving to jsdom
options = {
    runScripts: 'dangerously',
    resources: "usable",
    beforeParse: function (window) {
 
        window.foo = function () {
 
            console.log('bar');
 
        };
 
    }
};
 
// bar
let dom = new jsdom('<script>foo()<\/script>',options);
```

This can be used to implement something that might not be there if I take the time to do it.

## Canvas support

If I want to do something with canvas in jsdom is looks like I have to install some additional software. Not only do I need to install an additional npm package called juts simply canvas, I also need to install some additional software at the lower level as well, something called Cairo. As of this writing I have not done so, however if interested in doing this I would start by checking out [canvas on npmjs](https://www.npmjs.com/package/canvas).

## Conclusion

js-dom is the most powerful project that I have come across so far that can be used to do this sort of thing in a node.js environment. If I use this project in more of my projects I will likely update this content, and write a few more posts on the subject.