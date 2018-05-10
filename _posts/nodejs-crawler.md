---
title: Making a basic web crawler in node.js using node-crawler
date: 2017-11-26 17:58:00
tags: [js,node.js]
layout: post
categories: node.js
id: 98
updated: 2017-11-26 18:45:22
version: 1.1
---

I made my first crawler with [crawler](https://www.npmjs.com/package/crawler), or [node-crawler](https://github.com/bda-research/node-crawler) as it might be known on github. In this post I will just be briefly covering how to get started with it, as the source code of my crawler is a little buggy at the moment and I don't want to go over it here just yet.

<!-- more -->

## Basic use example of crawler

To get started with crawler I just called the main constructor function to create an instance of crawler, and I give it an object with a method that will be called for each crawled page.

```js
var Crawler = require('crawler');
 
// create a new crawler
var c = new Crawler({
 
        maxConnections: 1,
        jQuery: false,
 
        // This will be called for each crawled page
        callback: function (err, res, done) {
 
            if (err) {
 
                console.log(err);
 
            } else {
 
                // the body of the page
                console.log(res.body);
 
            }
 
            done();
        }
 
    });
 
// query a single url
c.queue('http://www.google.com');
```

For now I am keeping maxConnections at 1, and disabling the jQuery feature that seems to be giving me errors for some reason, I have not looked into why.

## Using cheerio to work with html, and following links.

One of the dependences for node-crawler is [cheerio](https://www.npmjs.com/package/cheerio), which is a lean implementation of jQuery for node.js. In short it's a nice little node package for working with html.

```js
// basic crawler useage

var Crawler = require('crawler'),
cheerio = require('cheerio');

// create a new crawler
var c = new Crawler({
 
        maxConnections: 1,
        jQuery: false,
 
        // This will be called for each crawled page
        callback: function (err, res, done) {
 
            var $,
            self = this;
 
            if (err) {
 
                console.log(err);
 
            } else {
 
                $ = cheerio.load(res.body);
 
                // all the anchors in the page
                //console.log($('a'));
                $('a').each(function (i, a) {
 
                    var href = a.attribs.href;
 
                    if (href) {
 
                        console.log(res.request.host + ' > ' + href);
 
                        // follow it
                        c.queue(href);
 
                    }
 
                });
 
            }
 
            done();
        }
 
    });
 
// query a single url
c.queue('http://www.google.com');
```

When the jQuery bool is set to true crawler automatically does this and sets the parsed body to res.$. If I want to use something else to do this I would want to to feed what is in res.body to it, as that will always be the raw html of a page, if what is being crawled is html.

## Events

There are some events that can be attached to the crawler, that can be used to define some things to do for certain events such as when crawling stops because of an empty queue.

```js
c.on('drain',function(){

    console.log('crawling is done');

});
```