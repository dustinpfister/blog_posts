---
title: Express text built in middleware
date: 2021-03-23 13:24:00
tags: [express,node.js]
layout: post
categories: express
id: 829
updated: 2021-03-23 13:45:19
version: 1.5
---

As of [expressjs](https://expressjs.com/) 4.17.x there is now an [express text](http://expressjs.com/en/api.html#express.text) built in middleware function, that is one of a few built in middleware functions based off of [body parser](/2018/05/27/express-body-parser/), which is also a built in middleware for parsing incoming http post request bodies. Using the body parser middleware directly might still be the best way to gain the highest degree of control over parsing incoming post request payloads, but there are a number of built in methods now for json, raw data, and plain text.

There is going over every little detail about the body parser middleware, but if I just want to parse text then there is the express text middleware. Using the function helps to keep the rest of my code a little more clean and readabule compared to suing the body parser directly.

So then in this post I will be going over soem basics of the express text middleware, and in the process of doing so I will also be touching on a wide range of other topics when it comes to parsing incoming post requests. In these examples I will be sticking to just using nodejs and express, and as such I will be using XMLHttpRequest as an http client in a single html file as a way to go about creating post requests. I will also be suing the express static built in middleware as a way to go about hosting the simple yet effective client systems for these examples.

<!-- more -->

## 1 - Basic express text hello world example

First off in this section I will be going over a very simple hello world type example of the express text built in middleware.

### 1.1 - The app.js file

Here I have the main app.js file that I have at the root of the example folder.

```js
let express = require('express'),
path = require('path'),
app = express();
app.set('port', process.argv[2] || process.env.PORT || 8080);
 
// using express satic to host my single index.html file
app.use('/', express.static( path.join(__dirname, 'public') ))
 
// using express.text to parse post requests for the root path
app.use('/', express.text());
app.post('/', (req, res) => {
    res.json({
        status: 'okay',
        body: req.body
    });
});
 
// listen on app port
app.listen(app.get('port'), () => {
    console.log('app up on port: ' + app.get('port'));
});
```

### 1.2 - The index.html file

Now for my simple client system that sends a post request to the server script.

```html
<html>
  <head>
    <title>Express text Example</title>
  </head>
<body>
<h1>Express Text Example</h1>
<textarea id="out"></textarea>
<script>
var xhr = new XMLHttpRequest();
xhr.open('POST', '/', true);
xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
        document.getElementById('out').innerHTML = this.response;
    }
};
xhr.setRequestHeader('Content-type', 'text/plain');
xhr.send('Hello World');
</script>
</body>
</html>
```

