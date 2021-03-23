---
title: Express text built in middleware
date: 2021-03-23 13:24:00
tags: [express,node.js]
layout: post
categories: express
id: 829
updated: 2021-03-23 13:32:02
version: 1.1
---

As of [expressjs](https://expressjs.com/) 4.17.x there are now a number of built in middleware functions based off of body parser, which is also a built in middleware for parsing incoming http post request bodies. Using the body parser middlewar directly might still be the best way to gain the highest degree of control over parsing incoming post request payloads, but there are a number of built in methods now for json, raw data, and plain text.

<!-- more -->

## 1 - Basic express text hello world example


### 1.1 - The app.js file

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

