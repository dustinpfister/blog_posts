---
title: The express.js top level function for creating app objects, and more.
date: 2018-06-13 16:34:00
tags: [js,express,node.js]
layout: post
categories: express
id: 207
updated: 2018-06-15 11:05:53
version: 1.2
---

When creating an [express.js](https://expressjs.com/) project of any kind the first thing that I work with is the express top level function. It is the function that is exported when grabbing at express with require when making the typical app.js file. This function is used to create instances of an app object, and it also has some additional methods attached to it as well.

<!-- more -->


## Calling the express top level method to create an app object

Any express object will often involve calling the top level function that is exported from the express module to create an instance of the app object.

```js
let express = require('express'),
app = express(); // the app object
app.get('*', function(req,res){res.send('hello');});
app.listen(8080);
```

It is also possible to create an express app middle ware by using express.Router as well, more on that later though. Here I am just giving a simple hello world example of the app object, but there is much more to know on it. If you are wondering on how to go about parsing the body of an incoming post request for example you will want to use app.post, and also a body parser as well.

You can read more on the [app object](/2018/06/15/express-app-object/).