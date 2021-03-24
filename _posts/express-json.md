---
title: Express JSON receiving parsing and sending
date: 2019-05-04 15:27:00
tags: [express,node.js]
layout: post
categories: express
id: 434
updated: 2021-03-24 13:33:49
version: 1.11
---

In [express json](https://expressjs.com/en/api.html#res.json) can be sent from the server to a client with response methods like res.json, it can also be received from clients by making post requests from a client system, and then parsing the incoming body with the [body parser](/2018/05/27/express-body-parser/) middleware. In late versions of express such as 4.17+ there is now an express.json method that can be used as a kind of short hand for the body parser middleware to quickly parse a json body of an incoming post request.

In this post I will be coving some basics and more about expressjs and json when it comes to both sending it and receiving it to and from a client system.

<!-- more -->

## 1 - Express JSON - Sending JSON from expressjs

To send JSON from a server side script with expressjs just use the json response method, by just calling the method and passing the object that you want sent as JSON as the first argument.

```js
let express = require('express'),
app = express();
app.set('port', process.env.PORT || process.argv[2] || 8080);
// path for root
app.get('/', (req, res) => {
    // The res.json response method can be used to
    // send json to a client
    res.json({
        foo: 'bar'
    });
});
// listen
app.listen(app.get('port'), () => console.log('app up on port: ' + app.get('port')));
```

Sending JSON from a server to a client is simple and straight forward when using the express JSON response method to do so. The reason why is that the express JSON response method is a convenience method that sets the proper content type response header, and uses the [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) the object for you.

### 1.1 - Sending JSON the hard way

To gain a deeper understating and appreciation for the res.json response method take into account the following example that does the same thing as the above one.

```js
let express = require('express'),
app = express();
app.set('port', process.env.PORT || process.argv[2] || 8080);
// path for root
app.get('/', (req, res) => {
    // json can also be sent this way, but it is a bit more involved
    try {
        let json = JSON.stringify({
                foo: 'bar'
            });
        res.set('Content-Type', 'application/json ');
        res.send(json);
    } catch (e) {
        res.status(400).send(e.message);
    }
 
});
// listen
app.listen(app.get('port'), () => console.log('app up on port: ' + app.get('port')));
```

Express has a few methods like this that help make code cleaner, sometimes they might not always be the best choice though. If for some reason you want to have control over the Content-Type header you would have to do something like this.

## 2 - Express JSON - Receiving from a client parsing and sending

There is sending JSON from a server to a client as a response to a request from that client, and then there is sending JSON from a client system to a server as a payload by way of a [POST request](/2019/04/17/express-post/). There are a number of ways to send a post request from a client system to express when it comes to what is available in terms of front end frameworks. However when it comes to plain native javaScript the tired yet true way of sending one is to use [XMLHttpRequest](/2018/03/28/js-xmlhttprequest/).

So in this example I just have a basic client system that just sends a post request, and then the body parser middleware is then used to parse the body of that request into a workable object via the req.body property of a request object. The incoming payload can then be used.

```js
let express = require('express'),
app = express();
app.set('port', process.env.PORT || process.argv[2] || 8080);
 
// send basic client system that sends json
// to the server with XMLHttpRequest
app.get('/', (req, res) => {
    res.send(
        '<script>\n' +
        'var xhr = new XMLHttpRequest();\n' +
        'xhr.open(\'POST\', \'\/\', true);\n' +
        'xhr.onreadystatechange = function () {\n' +
        '  if (this.readyState === 4) {\n' +
        '    document.body.innerHTML += \'<span>\' + this.response + \'<\/span>\';\n' +
        '  }\n' +
        '};\n' +
        'xhr.setRequestHeader(\'Content-type\', \'application\/json\');\n' +
        'xhr.send(JSON.stringify({x: 40}));\n' +
        '<\/script>');
});
 
// body parser can be used to parse the incoming json into 
// a workable object via req.body
app.use(require('body-parser').json());
app.post('/', (req, res) => {
    let obj = {
        x: req.body.x,
        y: 2
    };
    obj.n = obj.x + obj.y;
    res.json(obj);
});
 
// listen
app.listen(app.get('port'), () => console.log('app up on port: ' + app.get('port')));
```