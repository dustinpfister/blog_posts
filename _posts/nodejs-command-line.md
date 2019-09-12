---
title: node command line options and command use examples
date: 2019-09-11 16:09:00
tags: [node.js]
layout: post
categories: node.js
id: 534
updated: 2019-09-12 19:50:57
version: 1.3
---

This will be a post on the [node command](https://nodejs.org/api/cli.html) that is used to start nodejs projects written in javaScript. The node command is used to run scripts written in javaScript by way of an external javaScript file, or other means such as from the command line via the eval option. This post is mainly aimed at developers that are new to nodejs, but even if you are a more seasoned nodejs developer there might be a few more aspects of using the node command that you might not yet be aware of that might be of use in some situations when it comes to advanced topics such as [piping](https://en.wikipedia.org/wiki/Pipeline_(Unix)).

<!-- more -->

## 2 - The eval node command option

When using the node command in the terminal the eval option can be used as a way to run some javaScript by passing it as a string as part of the command. I can not say that I use this option often, but if for some reason you do just want to test out a line of code without saving it to a fine this is one way to go about doing just that.

```
$node --eval "console.log(2+5)"
7
```

## 3 - Using interactive mode

There is the interactive mode of node that allows for me to drop into a javaScript console of sorts. I can also use this in conjunction with piping from the standard input into this console.

```
$ echo 40 + 2 | node -i
> 40 + 2
> 42
```