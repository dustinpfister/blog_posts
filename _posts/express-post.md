---
title: Express post request example
date: 2019-04-17 12:52:00
tags: [express,node.js]
layout: post
categories: express
id: 417
updated: 2019-04-18 13:59:19
version: 1.8
---

The app.post method can be used in [express.js](https://expressjs.com/) to define what is to be done in the event that a post request is received from a client system. Working with express post requests can be a somewhat complicated process, there is much to cover in terms of how to go about making a client system that will send post requests, and also how to parse the incoming request as well. I will not be going into every little detail about this in this post of course, but I will be covering some basic examples, and link to other relevant works when it comes to how to get up and running with express post requests.

<!-- more -->

## 1 - Express post example using just a static html file in a public folder

For this express post method example I am using express.static in my app_static.js file at the root name space of the project as a way to host an html file called static.html, and a client side javaScript file called static_client.js as well in a public folder. This is one way to go about having a project that makes post requests to an express powered back end that does not involve something more advanced with server side rendering, and additional client side libraries. 

So in this example I am just using express.js on top of node.js, and when it comes to rendering I am just using plain old static html files. In addition I am using the browser native XMLHttpRequest as a way to make the post request rather than using something like axios.

### 1.1 - The public/static.html file

Here is the html of the file that I have in the public folder. Nothing to interesting here I just have a div element with an id of 'out' assigned to it. In addition I am linking to an external javaScript file that will act as a crude yet effective client system for this simple express post example.

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

This html file will serve as an index of sorts for the backend code that I will get to latter in this section.

### 1.2 - The public/static_client.js file

Here I have the javaScript client for the html file that will be used to just make a simple post request to the express.js powered pack end that I will get to shortly. To keep away from making things to complicated for the example I am just using the tired yet true browser built in way to go about making a post request to a server via the XMLHttpRequest method.

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

I will not be getting into every little detail here when it comes to making post requests with XMLHTTPRequest, but one of the most important things to be aware of here is the request header that I am setting. In this example I am using JSON as a way to transmit data from a client system back to the back end system. The body parser that I am using in express will only work as expected if the proper headers are sent along with the request.

### 1.3 - The app_static.js file

Now for the server side javaScript, here I am requiring express and creating an app object typical of any express project. I am then use the app.use method to use the built in express.js body parser middleware to parse the incoming post request into a workable object. I am also using express.static to set up the static.html file in the public folder as the index for the root path of the project.

Once that is done I am the use the app.post to set up what to do for a express post request. The body parser middleware will parse the incoming request and populate the req.body property. There I will have access to what has been sent from the client. In this simple example I am using that to just simply figure the power of the base and pow properties sent fro the client, and then send that result back to the client in the form of a string.

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