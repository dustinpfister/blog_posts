---
title: Making a Simple build tool in nodejs
date: 2021-09-17 08:45:00
tags: [node.js]
layout: post
categories: node.js
id: 929
updated: 2021-09-17 08:57:57
version: 1.0
---

This week I put together a quick simple build tool solution that I might used in one or more of my nodejs projects. There are of course many popular projects that are this kind of tool that I could just use and move on with, but some times I do just like to make my own solutions for things. 

There are at least two general features that I think a build tool should do when making some kind of javaScript project. One feature is to just simply concatenate two or more source code files into a single string value and write that string file to a development form of a final package of the project. The other major feature is to do more or less the same as the first feature only to produce a minified version of the development form of the file. The first major feature is simple enough, all I have to do is loop over an array of relative paths to source code files to create a single string and then write that file. However the second feature is a little not so simple and will require some kind of library for minifying javaScript code.

<!-- more -->
