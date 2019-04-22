---
title: Express Middleware Example Read and Write to a file
date: 2019-04-22 11:34:00
tags: [express,node.js]
layout: post
categories: express
id: 422
updated: 2019-04-22 11:51:11
version: 1.1
---

So there is a lot to write about concerning [express middleware](https://expressjs.com/en/guide/using-middleware.html), I have all ready covered the [basics of middleware in express](/2019/04/19/express-middleware-basics/), and I have a post on [express middleware in general](/2018/06/25/express-middleware/) as well. However in this post I thought I would focus on application level middleware specifically.

<!-- more -->

## 1 - Applaction level Express Middleware basic example

```js
let express = require('express'),
app = express();
 
app.get('/', (req, res) => res.json('foo'));
 
app.listen(8080);
```