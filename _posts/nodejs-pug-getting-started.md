---
title: The pug template engine in node.js getting started
date: 2017-12-05 10:33:00
tags: [js,node.js]
layout: post
categories: node.js
id: 109
updated: 2017-12-05 11:44:03
version: 1.1
---

When it comes to node.js template engines I am a big fan of ejs, but a pretty nice alternative is [pug](https://www.npmjs.com/package/pug) (formerly known as jade). It uses a clean whitespace sensitive syntax similar to markdown, but a bit more powerful. I still like ejs a lot becuase it is pretty much just an argument html, put pug is kind of like markdown in the sense that it helps keep things clean and simple.

<!-- more -->

## Getting started

As with most projects like this I set up a test folder, and install the package with npm.

```
$ mkdir test_pug
$ cd test_pug
$ npm install pug
```

One that is done I made a basic.js file that will be a hello world sort type js file that uses the project, that looks like this:

```js
var pug = require('pug');
 
console.log( pug.render('p This is some pug') );
```

In this basic example I am using pugs render method that accepts a string of pug text, and returns plain old html.

```
$ node basic
<p>This is some pug</p>
```

## Some basics of the language

With pug the first few characters are interpreted as a tag, and a return is considered an end of the tag. Tags can also be nested by placing a return right after writing the first tag.

```
p this is some pug
br
p
 
   span I can make nested tags
```

becomes

```html
<p>this is some pug</p><br/><p><span>I can make nested tags</span></p>
```

For a more compleate overview of the laguage it might be a good idea to [check out the site on pug](https://pugjs.org/api/getting-started.html).

## Read *.pug files

Storing pug as an external file should have the *.pug extension, in addition reading pug files is a pretty straightforward process of just using the pug.readFile method.

I made a readfile.js file that I placed in the root of my test_pug project folder like this.

```js
var pug = require('pug'),
 
pf = process.argv[2];
 
// pug to html helper
pugToHTML = function (pf) {
 
    return new Promise(function (resolve, reject) {
 
        if (!pf) {
 
            reject(new Error('no pug file given'));
 
        }
 
        pug.renderFile(pf, function (err, html) {
 
            if (err) {
 
                reject(err);
 
            }
 
            resolve(html)
 
        });
 
    });
 
};
 
if (!pf) {
 
    console.log('please give a path to a pug file to read');
    console.log('example:');
    console.log('$ node readfile pugfiles/demo.pug');
 
} else {
 
    pugToHTML(pf).then(function (html) {
 
        console.log(html);
 
    }).catch (function (err) {
 
        console.log(err);
 
    });
 
}
```

I also made a pugfiles folder in the project, and made some *.pug files to read. One of the files I made is called full.pug which looks like this:

```
doctype html
 
html
 
    head
 
        title This is a pug file
        meta(charset='UTF-8')
        style.
 
            .redtext { color: red;}
 
    body
 
        h1(class="redtext") My first full pug file
 
        div
 
            p
 
                | pug is pretty cool, 
                a(href='https://pugjs.org') check out the site! 
                | It allows for cleaner 
                | writing of templates but I can still do everything with it when 
                | needed because when it is called for I can just copy and past 
                | plain old html into the template as well, just like with ejs!
 
            <p>
                <span>yes I can still just use html as well if I want.</span>
            </p>
```

So then I can call my readfile script from the command line and get the rendered html of a pug file just like this:

```
$ node readfile pugfiles/full.pug
```

which will give me this html from full.pug

```html
<!DOCTYPE html>
<html>
  <head>
    <title>This is a pug file</title>
    <meta charset="UTF-8">
    <style>
      .redtext {
        color: red;
      }
    </style>
  </head>
  <body>
    <h1 class="redtext">My first full pug file</h1>
    <div>
      <p>pug is pretty cool, <a href="https://pugjs.org">check out the site! </a>It allows for cleaner writing of templates but I can still do everything with it when needed because when it is called for I can just copy and past plain old html into the template
        as well, just like with ejs!</p>
      <p>
        <span>yes I can still just use html as well if I want.</span>
      </p>
    </div>
  </body>
</html>
```

## Conclusion

There is a great deal more to pug such has how to handle partials, I might write a few more posts on pug if I get to it but I have a lot on my plate when it comes to what more to write about in the wonderful world of javaScript and node.js programing.