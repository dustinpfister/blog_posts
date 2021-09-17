---
title: Making a Simple build tool in nodejs
date: 2021-09-17 08:45:00
tags: [node.js]
layout: post
categories: node.js
id: 929
updated: 2021-09-17 09:12:12
version: 1.2
---

This week I put together a quick simple build tool solution that I might used in one or more of my nodejs projects. There are of course many popular projects that are this kind of tool that I could just use and move on with, but some times I do just like to make my own solutions for things. 

There are at least two general features that I think a build tool should do when making some kind of javaScript project. One feature is to just simply concatenate two or more source code files into a single string value and write that string file to a development form of a final package of the project. The other major feature is to do more or less the same as the first feature only to produce a minified version of the development form of the file. The first major feature is simple enough, all I have to do is loop over an array of relative paths to source code files to create a single string and then write that file. However the second feature is a little not so simple and will require some kind of library for minifying javaScript code.

Although I do tend to try to avoid using external user space projects when it comes to this series of nodejs examples, I have not got around to making my own simple javaScript tokenizer, let alone any kind of project that will minify javaScript code. At some point in the future I might get around to making my own project for that sort of thing, and try to keep it simple but for now I think I am going to have to just go with some kind of user space option. 

A few years back I wrote a post on a user space package for this sort of thing called [jsmin](/2017/08/18/nodejs-jsmin/), which is a tired yet true solution for minifying javaScript. It looks as though this project is not being maintained though as nothing has changed with the source code for over ten years. I am the kind of person that understands that that is not always such a bad thing, some times you have a project that is pretty darn solid, and still works great for a certain kind of task. However I decided to go with another popular well known option for this [called uglify.js](https://www.npmjs.com/package/uglify-js).

<!-- more -->
