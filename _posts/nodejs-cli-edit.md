---
title: A node cli tools text editor project
date: 2019-10-28 19:09:00
tags: [node.js]
layout: post
categories: node.js
id: 551
updated: 2019-10-29 12:26:28
version: 1.1
---

So when it comes to developing a node cli tool that is a text editor of sorts there are two general ideas that come to mind. One idea is a text editor that is terminal based in which I am using ansi escape codes to make a text editor like that of nano or vim. The other idea is a text editor that works in a browser window, and I am using nodejs as a way to serve a client system that is that editor, and also have some back end code that is used to save the file I am working on.

<!-- more -->

## 1 - This is not a getting started post on node cli tools

This post is on a text editor i made for my node_cli_tools project. The editor that I am writing about here makes use of many resources that are part of the core repository of the project. So it might be a good idea to start with my post on the node_cli_tools project in general. If not you might have a hard time trying to reproduce what I am writing about here.
