---
title: Express post request example
date: 2019-04-17 12:52:00
tags: [express,node.js]
layout: post
categories: express
id: 417
updated: 2019-04-18 13:03:33
version: 1.4
---

The app.post method can be used in [express.js](https://expressjs.com/) to define what is to be done in the event that a post request is received from a client system. Working with express post requests can be a somewhat complicated process, there is much to cover in terms of how to go about making a client system that will send post requests, and also how to parse the incoming request as well. I will not be going into every little detail about this in this post of course, but I will be covering some basic examples, and link to other relevant works when it comes to how to get up and running with express post requests.

<!-- more -->

## 1 - Express post example using just a static html file in a public folder

For this express post method example I am using express.static in my app_basic.js file at the root name space of the project as a way to host an html file called basic.html, and a client side javaScript file called basic_client.js as well in a public folder. This is one way to go about having a project that makes post requests to an express powered back end that does not involve something more advanced with server side rendering, and additional client side libraries. 

So in this example I am just using express.js on top of node.js, and when it comes to rendering I am just using plain old static html files. In addition I am using the browser native XMLHttpRequest as a way to make the post request rather than using something like axios.

### 1.1 - 

```html
<html>
  <head>
    <title>Express Post static example</title>
  </head>
  <body>
    <p>n = <span id="out"></span></p>
    <script src="static_client.js"></script>
  </body>
</html>
```

### 1.2 -

```js
var xhr = new XMLHttpRequest();
xhr.open('POST', '/', true);
xhr.onreadystatechange = function () {
 
    if (this.readyState === 4) {
        document.getElementById('out').innerHTML = this.response;
    }
};
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify({
        base: 2,
        pow: 4
    }));
```

### 1.3 -

```js
let express = require('express'),
app = express();
 
// using the JSON body parser
app.use(require('body-parser').json());
 
// using static.html to serve as the index of root at /
app.use('/', express.static('public', {
        index: 'static.html'
    }));
 
// using app.post to define express post requests
app.post('/', (req, res) => {
 
    res.send(String(Math.pow(req.body.base, req.body.pow)));

});
 
app.listen(8080, () => {
    console.log('express static basic example up on port 8080');
});
```