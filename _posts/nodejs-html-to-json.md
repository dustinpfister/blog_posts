---
title: Converting html code to a JavaScript object in node.js with html-to-json
date: 2017-11-06 17:06:00
tags: [js,node.js,blog]
layout: post
categories: node.js
id: 87
updated: 2019-11-19 09:50:12
version: 1.10
---

So I wanted to make a simple tool to run threw all of my blog posts that have been parsed into html, and find certain values such as word count for my posts. In other words I want to create a collection of objects for each html file, or have a way to convert to a JSON format from HTML. So there should be some kind of dependency in the npmjs ecosystem that I can use to just quickly turn html into an object tyoe form that I can work with in a node environment, similarly to that of what I can work with in a browser or client side javaScript environment.

WIth that being said I took a little time to see what there is to work with if anything and after doing so I found a few projects that work nice. However in this post I will mostly be writing about a npm package called [html-to-json](https://www.npmjs.com/package/html-to-json). This package has a method where I can feed it an html string, and what is returned is a workable object.

<!-- more -->

## 1 - Basic example of html-to-json in node.

So of course as always the first thing is to install the package into a node project folder. I assume that you know the basics of setting up a new node project folder, if not this is nt the post to start out with the basic of using node and the default package manager for it called npm.

```
$ npm install html-to-json --save
```
After that I wanted to make my typical hello world example of how to get started with html to json. As such I put together a simple example to just test out how it works, by seeing if I can just pull the text from a single paragraph element just for starters.

So with that said there is the parse method of this project where the first argument that is given is an html string, and the second argument given is an object the serves as a filter. Then a third argument can be given that is a callback, but the method also returns a promise. The resulting object that is given via a callback, or in a resolved promise via the this method contains what I would expect.

```js
var htmlToJson = require('html-to-json'),
 
htmlToJson.parse('<p>This is only an example</p>', {
 
    p: function (doc) {
 
        return doc.find('p').text();
 
    }
 
}).then(function (result) {
 
    console.log(result.p); // 'this is only an example'
 
});
```

So far so good, looks like this project is more or less what I had in mind, but lets look at a few more examples just for the hell of it.

## 2 - Converting many files to javaScript objects

To do this I used another javaScript dependency called node-dir, which comes in handy when I want to grab the content of many files that exist in a complex file structure. I [wrote a post](/2017/11/05/nodejs-node-dir/) on it if you want to learn more about how to loop over files recursively with it.

There are other options that can be used to walk the contents of a file system, in fact I am not sure if I can say node dir is the best option when it comes to file system walkers. [I wrote a post on the subject of file system walking](/2018/07/20/nodejs-ways-to-walk-a-file-system/) that you might want to check out when it does come to other options for this. However in any case I just need a way to loop over the contents of a file system recursively, open each html file, and then use this project to parse the html into a workable object.

Anyway using node-dir with html-to-json i was able to quickly build the json report that I wanted.

```js
var htmlToJson = require('html-to-json'),
fs = require('fs'),
dir = require('node-dir'),

results = [],
source = './html',
jsonFN = './report.json';
 
// using the readFiles method in node-dir
dir.readFiles(source,
 
    // a function to call for each file in the path
    function (err, content, fileName, next) {
 
    // if an error happens log it
    if (err) {
 
        console.log(err);
    }
 
    // log current filename
    console.log(fileName);
 
    // using html-to-jsons parse method
    htmlToJson.parse(content, {
 
        // include the filename
        fn: fileName,
 
        // get the h1 tag in my post
        title: function (doc) {
 
            return doc.find('title').text().replace(/\n/g, '').trim();
 
        },
 
        // getting word count
        wc: function (doc) {
 
            // finding word count by getting text of all p elements
            return doc.find('p').text().split(' ').length;
 
        }
 
    }).then(function (result) {
 
        // log the result
        results.push(result);
 
    })
 
    next();
 
}, function () {
 
    // write out a json file
    fs.writeFile(jsonFN, JSON.stringify(results), 'utf-8');
 
});
```

## 3 - Conclusion

So I might want to work on my content analysis tool some more as a great deal more comes to mind other than just word count of my posts. It seems like what is a lot more important than a high word count is targeting the right string of keywords that people are searching for. Anyway this is a great solution for helping me with the task of converting html to json, I hope this post helped you.