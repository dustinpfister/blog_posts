---
title: Express set
date: 2019-04-17 12:52:00
tags: [express,node.js]
layout: post
categories: express
id: 418
updated: 2019-04-18 20:30:11
version: 1.0
---

This will be a quick post on the express set method in [express.js](https://expressjs.com/) 

<!-- more -->

## 1 - Express set basic example

```js
let express = require('express'),
app = express();
 
// set  value for port
app.set('port', process.env.PORT || process.argv[2] || 8080);
 
// define one or more paths
app.get('/', (req, res) => res.send('foo'));
 
// listen on port
app.listen(app.get('port'), ()=> console.log('app up on port: ' + app.get('port')));
```