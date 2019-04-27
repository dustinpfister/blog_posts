---
title: Express response objects
date: 2019-04-27 09:00:00
tags: [express,node.js]
layout: post
categories: express
id: 427
updated: 2019-04-27 09:16:17
version: 1.2
---

An [express response](https://expressjs.com/en/api.html#res) object is one of four possible arguments that is passed to an [express middleware](/2018/06/25/express-middleware/) function. Expressjs has to do with the use of middleware that does something with incoming http requests. So request objects have to do with the incoming http request from a client system, and response objects have to do with the response to that system. The other two arguments in an middleware method have to do with error handling, and passing along control to another middleware method. However in this post I will be focusing on just response objects today.

<!-- more -->

## 2 - Express response methods

The response methods in a express response object can be used to end an htp request and respond to that request for some kind of data or at least a status of some kind to let the client know what might have went wrong. In this section I will be going over the options when it comes to the response methods in an express response object. In addition I will link to additional posts for each that will go into these methods in further detail as there is much to cover with them.

### 2.1 - [Express res.send](/2019/04/23/express-send)

One of the most simple and easy to use response methods is res.send.

```js
let express = require('express'),
app = express();
app.get('/', (req, res) => res.send('foo'));
app.listen(8080);
```
