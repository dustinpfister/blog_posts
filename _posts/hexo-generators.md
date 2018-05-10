---
title: Working with Generators in hexo to make scripts, and plug-ins
date: 2018-01-04 17:28:00
tags: [hexo,js,node.js,ejs]
layout: post
categories: hexo
id: 126
updated: 2018-01-04 18:43:52
version: 1.1
---

In [hexo](https://hexo.io/) a [generator](https://hexo.io/api/generator.html) can be used to build files for a static website. It can work with content from the sites blog posts, it can be used in conjunction with *.ejs files to make *.html files, or it can be used to make other plain text files as well.

<!-- more -->

## What to know before hand.

I assume that you have knowledge of javaScript, html, css, and at least some basic understanding of how to work with the node.js powered static site generator known as hexo. In this post I will just be covering generators, and not scripts and plug-ins in general, I have [a post for that]().

## Basic hexo generator example

A basic example of a hexo generator would be to create a scripts folder in the root name space of the hexo project alone side the source, theme, public folders ect. Inside the scripts folder I would then create a *.js file that will contain the following JavaScript:

```js
hexo.extend.generator.register('basic-generator', function (locals) {
 
    return {
 
        path: 'test.md',
        data: '# This is only a test.'
 
    };
 
});
```

When I generate the site this will create a test.md mark down file in the root name space of the public folder. If I just want to create plain text files, and the like this is all there is to it. 

## Making many files in a folder with a generator

```js
hexo.extend.generator.register('gen-path', function (locals) {
 
    return [{
 
            path: 'path/file1.md',
            data: 'this is file one.'
 
        }, {
 
            path: 'path/file2.md',
            data: 'this is file two.'
 
        }, {
 
            path: 'path/file3.md',
            data: 'this is file three.'
 
        }
    ];
 
});
```

## Making an *.html file with a hexo generator.

Although I can make plain text files at a give path, chances are what I will really want to use a hexo generator for is to make one or more *.html files with an *.ejs template file that I have in my theme.

In oder to do this I will want to have the template file that I want to use in the layout folder of my theme in place.