---
title: Cheerio, a server side jQuery like tool to help work with HTML in nodejs
date: 2017-11-28 13:05:00
tags: [js,node.js]
layout: post
categories: node.js
id: 100
updated: 2017-11-28 14:01:44
version: 1.1
---

I have been making some personal projects that have to do with working with html in a nodejs environment. Often I am in a situation in which I end up generating html from markdown using something liked [marked](/2017/11/19/nodejs-marked/), or looping over actual html files, in ether case I have raw html that I want to work with in javaScript.

I have written a post recently on another node.js solution for this sort of thing called [html-to-json](/2017/11/06/nodejs-html-to-json/), however in this post I will be writing about [cheerio](https://www.npmjs.com/package/cheerio). Which is a server side implementation of core jQuery.

<!-- more -->

## Basic usage example

So I just need to do the usual npm install with the package name cheerio in a test folder.

```js
$ npm install cheerio
```

And my basic basic.js file looks like this:

```js
var cheerio = require('cheerio'),
$ = cheerio.load('<p>cheerio!</p>');
 
console.log($('p').get(0).children[0].data);
```

So that when I call my basic.js file from the command line I get the innerText of the paragraph element.

```
$ node basic
cheerio!
```

## Selectors

Selectors work in very much the same way as in jQuery. The ushual selection by tag, class, and id work in very much the same fashion.

```js
var cheerio = require('cheerio'),
$ = cheerio.load('<p>cheerio!<\/p><p class=\"foo\">foo text<\/p><p id=\"name\">Dustin</p>');
 
$('p').each(function (i, el) {
 
    console.log(el.children[0].data); // 'cheerio!', 'foo text', 'Dustin'
 
});
 
console.log( $('.foo')[0].children[0].data); // 'foo text'
 
console.log( $('#name')[0].children[0].data); // 'Dustin'
```

## hasClass method

There are many methods that can be used with a collection, picking one at random there is hasClass that can be used to find if a collection is using a certain class or not.

```js
var cheerio = require('cheerio'),
$ = cheerio.load('<p class=\"red\">red<\/p><p class=\"red big\">red and big<\/p><p class=\"red\">red</p>');
 
console.log(  $('.red').hasClass('big') ); // true
console.log(  $('.red').hasClass('little') ); // false
```

## each method

A method that I actualy use often is for course the each method that loops over all elements in a collection.

```js
$('p').each(function(index, el){
 
    console.log(el.children[0].data);
 
});
```

The method that I pass to each will give me each index, and a reference to the corresponding element in a collection.