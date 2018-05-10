---
title: Parsing markdown to html, or plain text with marked.js
date: 2017-11-19 19:25:00
tags: [js,node.js]
layout: post
categories: node.js
id: 94
updated: 2017-11-19 21:05:30
version: 1.0
---

These days I have been playing around more with a [node.js](https://nodejs.org/en/) project I am familiar with called [marked](https://www.npmjs.com/package/marked). This is a package that can be used to parse markdown into html, in addition it is possible to define a custom renderer that can be used to render out plain text, or some other standard other than html. In any case it is a great little package for doing that sort of thing, so it's wort a post for sure.

<!-- more -->

## Getting started with marked

I assume that you know the basics when working with an npm package, but even so you might still want to know the name of the package to feed to npm right? So here it is:

```
# npm install marked --save
```

Once installed in a new project folder I made an index.js file and did this:

```js
var marked = require('marked');
console.log(marked('#hello world of mark down!'));
```

Will give me the following when called from the CLI

```
$ node index
<h1 id="hello-world-of-mark-down-">hello world of mark down!</h1>
```

## Using a custom renderer for marked to not render links.

There are some npm projects that can be used to do this such as [remove-markdown](https://www.npmjs.com/package/remove-markdown), but it is possible to format the output of marked in many different ways, including plain text, buy writing a custom render.

One step in parsing to plain text is to just render the text of a hyper link, and not add an anchor element in the output.

```js
var marked = require('marked'),
 
// return a custom renderer for marked.
render_unlink = function () {
 
    var render = new marked.Renderer();
 
    render.link = function (href, title, text) {
 
        // render link text in a way that is appropriate
        // for a medium that is not a computer connected
        // to the Internet
        return text + ' ( link to: ' + href + ' )';
 
    };
 
    return render;
 
},
 
md = 'this is some example markdown with [a link](github.com).';
 
console.log(marked(md));
// <p>this is some example markdown with <a href="github.com">a link</a>.</p>
 
console.log(marked(md, {
        renderer: render_unlink()
    }));
// <p>this is some example markdown with a link ( link to: github.com ).</p>
```

So here I am making a custom render that renders links differently, I could have it just render the text, or do anything I want really. As You would expect this can be done for a number of elements, including paragraph, and heading elements.

## rendering to plain text

Rendering to plain text, or in any manner that I want is just a matter of overwriting the render methods by passing a custom renderer.

```js
var marked = require('marked'),
 
// &#63; to ? helper
htmlEscapeToText = function (text) {
 
    return text.replace(/\&\#[0-9]*;|&amp;/g, function (escapeCode) {
 
        if (escapeCode.match(/amp/)) {
 
            return '&';
 
        }
 
        return String.fromCharCode(escapeCode.match(/[0-9]+/));
 
    });
 
},
 
// return a custom renderer for marked.
render_plain = function () {
 
    var render = new marked.Renderer();
 
    // render just the text of a link
    render.link = function (href, title, text) {
 
        return text;
 
    };
 
    // render just the text of a paragraph
    render.paragraph = function (text) {
 
        return htmlEscapeToText(text)+'\r\n';
 
    };
 
    // render just the text of a heading element, but indecate level
    render.heading = function (text, level) {
 
        return level + ' ) ' + text;
 
    };
 
    // render nothing for images
    render.image = function (href, title, text) {
 
        return '';
 
    };
 
    return render;
 
},
 
md = '# This is the markdown! \r\n it can have [links](github.com), and images \r\n![the image](foo.png)';
 
console.log(marked(md));
/*
<h1 id="this-is-the-markdown-">This is the markdown!</h1>
<p> it can have <a href="github.com">links</a>, and images
<img src="foo.png" alt="the image"></p>
*/
 
console.log(marked(md, {
        renderer: render_plain()
    }));
 
// 1 ) This is the markdown! it can have links, and images
```

For any method not specified the hard coded method will be used resulting in html being rendered. The full list of methods can be found in [the readme](https://github.com/chjj/marked/blob/master/README.md)

## Conclusion

Marked is a great project that has helped me a great deal with getting into text processing. I will update, and expand on this post as I work more with the current project I am working on now that makes use of marked.