---
title: Express examples from very basic to not so basic
date: 2019-04-30 18:00:00
tags: [express,node.js]
layout: post
categories: express
id: 430
updated: 2019-04-30 20:53:43
version: 1.1
---

This is a post on express examples from very basic examples that are just a single file, to more complex projects that use a fair number of npm packages, or a lot of vanilla js code apart from expressjs. There is a lot to know before hand of course, but if you have been playing around with express for a while now and are not looking for some full express app examples of one sort or another on this site this is the right place to be.

<!-- more -->

## 1 - Express examples what to know


## 2 - Very basic Express example that just uses express

### 2.1 - The app.js file

```js
let express = require('express'),
app = express();
 
// using express static to host the index.html file
app.use('/', express.static('public'));
 
// using body parser to parse incoming json from
// the client
app.use(require('body-parser').json());
 
// singe middleware that responds to post requests
app.post('/data', (req, res) => {
    res.json({
        mess: req.body.mess + 'bar'
    });
});
 
app.listen(8080);
```

### 2.2 - The public/index.html file

```html
<h1>Express Example</h1>
<div id="out"></div>
 
<script>
var xhr = new XMLHttpRequest();
xhr.open('POST', '/data', true);
xhr.onreadystatechange = function () {
    if (this.readyState === 4) {
        document.getElementById('out').innerHTML = this.response;
    }
};
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({
        userAgent: navigator.userAgent,
        mess: 'foo'
    }));
</script>
```