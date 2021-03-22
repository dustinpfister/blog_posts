---
title: Express examples from very basic to not so basic
date: 2019-04-30 18:00:00
tags: [express,node.js]
layout: post
categories: express
id: 430
updated: 2021-03-22 15:31:39
version: 1.8
---

This is a post on express examples from very basic examples that are just use [expressjs](https://expressjs.com/) by itself, to more complex projects that use a fair number of npm packages, one or more front end frameworks, or a whole lot of vanilla js code. There is a lot to know before hand of course, but if you have been playing around with express for a while now and are not looking for some full express app examples of one sort or another on this site this is the right place to be.

<!-- more -->

## 1 - Express examples what to know

This is not at all a [getting started post](/2018/05/21/express-getting-started/) on expressjs, node.js or javaScript in general. Even if you have some background with express it might be a good idea to gain a solid understanding of express middleware, routers, http status codes, and a wide range of other [express topics](/2018/06/12/express/) before getting into making some actual projects with express. I will be starting out with simple examples here, but will also be linking into some examples that are a little involved as well.


## 2 - Very basic Express example that just uses express

For this basic example I am making use of express static as a way to serve up static files, and I am also using body parser as a way to go about parsing incoming requests for data as a special data path.

### 2.1 - The app.js file

Here is the app.js file.

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

I also have a single index.html file.

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

## 2 - Conclusion

In time I might get around to creating more expressjs examples, and when I do I will of course expand this post with more examples. For the most part I just use express for making simple little server projects for many of my github folders that act as ways to serve up examples of things locally.


