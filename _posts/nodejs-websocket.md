---
title: Node websocket simple vanilla javaScript example
date: 2019-11-20 17:16:00
tags: [node.js]
layout: post
categories: node.js
id: 567
updated: 2019-11-20 17:24:20
version: 1.0
---

So you want to get break ground with a node websocket project, and so you want to write everything vanilla javaScript style? First things first, reconsider and just use a package such as [websocket-node](https://github.com/theturtle32/WebSocket-Node/), trust me this one is going to be time consuming. If you still want to just put together a very simple web socket server, and client then this post is my take on doing so.

Again when it comes to using websockets in an actual project you are going to want to use a well supported npm package, there is allot to this, and handing the handshake, and frames is a little complicated. STill if you just want to make a simple node websocket project working just with the core nodejs modules, maybe this post will help you get started at least.
 
<!-- more -->

