---
title: Standard Input in node.js wuth the child-process module
date: 2020-10-26 12:55:00
tags: [node.js]
layout: post
categories: node.js
id: 729
updated: 2020-10-26 13:03:23
version: 1.1
---

The standard input can be used as a source of data when making a nodejs script, doing so just requires the use of the [child process module](/2018/02/04/nodejs-child-process/). There is the [standard input property of a child process instance](https://nodejs.org/api/child_process.html#child_process_subprocess_stdin) when using something like exec, or spawn in that module that is one way to go about reading standard input. However there is also the [readline module](/2018/08/06/nodejs-readline/) in nodejs that can also be used as a way to get input via the command line that might be a [better choice for some projects](https://stackoverflow.com/questions/20086849/how-to-read-from-stdin-line-by-line-in-node).


<!-- more -->
