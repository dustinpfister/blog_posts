---
title: Cheerio, a server side jQuery like tool to help work with HTML in nodejs
date: 2017-11-28 13:05:00
tags: [js,node.js]
layout: post
categories: node.js
id: 100
updated: 2020-06-07 15:44:26
version: 1.6
---

I have been making some personal projects that have to do with working with html in a nodejs environment. Often I am in a situation in which I end up generating html from markdown using something liked [marked](/2017/11/19/nodejs-marked/), or looping over actual html files, in ether case I have raw html that I want to work with in javaScript.

In these types of situations I do not always need to visualize a browser environment in a nodejs environment in order to do whatever it is that I need to do with this sever side html code. I might just want to

I have written a post recently on another node.js solution for this sort of thing called [html-to-json](/2017/11/06/nodejs-html-to-json/), however in this post I will be writing about [cheerio](https://www.npmjs.com/package/cheerio). Which is a server side implementation of core jQuery functionality, but I can not do everything that I can do in a browser environment with cheerio so it does have its limits.

<!-- more -->

## 1 - Basic usage example

So I just need to do the usual npm install with the package name cheerio in a test folder as a way of getting started with a simple example of cheerio.

```js
$ mkdir test_cheerio
$ cd test_cheerio
$ npm init
$ npm install cheerio
```

Once i have my basic test folder set up I can work out basic.js file the just severs as a basic starting point for using this package:

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

Okay great so you get the basic idea then of what cheerio is all about. You have some html formatted text, and you want to interact with it in a way similar to that of what you might be used to when it comes to monkeying around in a web browser. One option would be to just work out a vanilla javaScript solution using regular expressions. If that kind of thing works out just fine then great, but cheerio does that and brings some usful methods to the table also on top of that.

## 2 - Selectors

Selectors work in very much the same way as in jQuery. The usual selection by tag, class, and id work in very much the same fashion.

```js
var cheerio = require('cheerio'),
$ = cheerio.load('<p>cheerio!<\/p><p class=\"foo\">foo text<\/p><p id=\"name\">Dustin</p>');
 
$('p').each(function (i, el) {
 
    console.log(el.children[0].data); // 'cheerio!', 'foo text', 'Dustin'
 
});
 
console.log( $('.foo')[0].children[0].data); // 'foo text'
 
console.log( $('#name')[0].children[0].data); // 'Dustin'
```

## 3 - hasClass method

There are many methods that can be used with a collection, picking one at random there is hasClass that can be used to find if a collection is using a certain class or not.

```js
var cheerio = require('cheerio'),
$ = cheerio.load('<p class=\"red\">red<\/p><p class=\"red big\">red and big<\/p><p class=\"red\">red</p>');
 
console.log(  $('.red').hasClass('big') ); // true
console.log(  $('.red').hasClass('little') ); // false
```

## 4 - each method

A method that I actually use often is the each method that loops over all elements in a collection, real handy for doing this like tabulating values of elements or something to that effect.

```js
$('p').each(function(index, el){
 
    console.log(el.children[0].data);
 
});
```

The method that I pass to each will give me each index, and a reference to the corresponding element in a collection.

## 5 - Conclusion

So cheerio is one of my standard go to npm packages for doing this sort of thing in a nodejs environment. So far I have not found myself needing a way to run client side javaScript sever side, so as long as that is not the case cheerio by itself works fine. If I do need to run client side code there are other options like jsdom, and maybe some other options I have not look into at this point.