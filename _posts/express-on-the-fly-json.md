---
title: Having a path that responds with on the fly json.
date: 2018-06-26 20:48:00
tags: [js,express,node.js]
layout: post
categories: express
id: 217
updated: 2018-06-26 20:48:27
version: 1.1
---

So I have been writing some [express.js](https://expressjs.com/) projects these days, and I seem to be generally making two kinds of paths in my projects. Paths that render html, and paths that respond to requests that are sent via some kind of http client in the browser. Because much of full stack development often has at least a little to do with a database of some kind, I wanted to do some exercises that involve making a path that will spit out json, but the json will be different depending on the query strings that are given. Also it would be a path that will not just spit out a static json file, but a result to some kind of query. So in other words a path that gives on the fly json.

<!-- more -->



