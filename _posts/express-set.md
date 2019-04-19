---
title: Express set
date: 2019-04-17 12:52:00
tags: [express,node.js]
layout: post
categories: express
id: 418
updated: 2019-04-18 20:39:13
version: 1.2
---

This will be a quick post on the [express set](https://expressjs.com/en/api.html#app.set) method in [express.js](https://expressjs.com/). The app.set method to be specific can be used to set application settings like the view engine to use. In addition it can be used as an alternative to defining global variables for just about anything that has to be stored and accessed at a later point elsewhere in the app. 

<!-- more -->

## 1 - Express set basic example

When it comes to using the express app.set method as a way to store an application setting I can use any key name that I want, but some names are reserved because they are used by express internally such as 'view engine', and 'env'. So for example if I want to store the port number that I will be listening on as an application setting I can use the app.set method as a way to do just that.

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