---
title: Converting html code to a JavaScript object in node.js with html-to-json
date: 2017-11-06 17:06:00
tags: [js,node.js,blog]
layout: post
categories: node.js
id: 87
updated: 2017-11-12 20:44:47
version: 1.3
---

I have been writing a javaScript blog for a little under a year now, and would like to have some tools at my disposal that will help me improve the quality of the content in my posts.

So I wanted to make a simple tool to run threw all of my blog posts that have been parsed into html, and find certain values such as word count for my posts. So I wanted to find some kind of javaScript project that I can use in my CLI tool that would help easily turn some html into a javaScript object that I can then work with. I found a few projects that work nice, but settled in on something called [html-to-json](https://www.npmjs.com/package/html-to-json).

<!-- more -->

## Basic example of html-to-json in node.

So of course as always the first thing is to install the package into a node project

```
$ npm install node-to-json --save
```
After that I wanted to make my typical hello world example of how to get started with html to json. As such I put together a simple example to just test out how it works, by seeing if I can just pull the text from a single paragraph element.

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

## Converting many files to javaScript objects

To do this I used another javaScript dependency called node-dir, which comes in handy when I want to grab the content of many files that exist in a complex file structure. I [wrote a post](/2017/11/05/nodejs-node-dir/) on it if you want to learn more about how to loop over files recursively with it.

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

## Conclusion

So I might want to work on my content analysis tool some more as a great deal more comes to mind other than just word count of my posts. It seems like what is a lot more important than a high word count is targeting the right string of keywords that people are searching for. Anyway this is a great solution for helping me with the task of converting html to json, I hope this post helped you.