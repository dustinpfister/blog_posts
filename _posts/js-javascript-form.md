---
title: Basic javaScript form examples including simple full stack code
date: 2020-02-11 14:06:00
tags: [js]
layout: post
categories: js
id: 610
updated: 2021-11-17 12:00:22
version: 1.18
---

So then when it comes to [javaScript form examples](https://eloquentjavascript.net/2nd_edition/18_forms.html) there is just getting started with input elements, and forms on the client side for starers. This is simple enough, but in order to have a truly functioning form one will have to get into working out server code for some kind of back end system of a project or simple example. 

Depending on what it is that you want or need to do with a [javaScript form](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation) and input elements a back end system may not be needed at all, however a typical use case of forms is to involve some kind of back end system. Still that might not always be the case, so in this post I will be going over some simple examples that just have to do with the basics of working with form elements and javaScript in a client side javaScript environment. In addition I might get around to one or two examples that make use of a nodejs back end system also though.

<!-- more -->


## 1 - Basic javaScript form examples

To get started with javaScript forms it might be best to know a thing or two about input tags, which are used to make fields for a form. There is a great deal to cover just with them when it comes to the various types of input tags, as well as how to get the current value of an input tag when attaching events for them, and so forth. So then there may be a number of other posts that you might want to start off with if you are still very new to javaScript, such as how to get a reference to an element by way of a method like [document.querySelector](/2020/06/23/js-document-queryselector/). It might also be a good idea to read up more on [event listeners](/2019/01/16/js-event-listeners/) and the [event objects](/2020/07/23/js-event-object/) that there are to work with inside such handers for various kinds of events.

In this section I will just be going over the basics and more when it comes to input tags, which is a major part of getting started with javaScript forms. Later in this post I will be getting into some far more complex examples that involve the use of some back end code when it comes to making forms that interact with some kind of server. I will be keeping these examples fairly simple, but this is still not a [getting started with javaScript](/2018/11/27/js-getting-started/) type post.

### 1.1 - Basic example of a button type input element

Here I have a basic example of an input element with the type attribute set to button.

```html
<html>
    <head>
        <title>javaScript form input example</title>
    </head>
    <body>
        <input id="button_1" type="button" data-c="0" value=""><br><br>
        <div id="out"></div>
        <script>
// ref to the button
var b = document.getElementById('button_1');
// update the value of the button
var draw = function(){
    b.value = 'click me (' + b.dataset.c + ')';
};
//
b.addEventListener('click', function(e){
    var d = e.target.dataset,
    c = parseInt(d.c);
    c += 1;
    d.c = c;
    draw();
});
// call draw for the first time
draw();
        </script>
    </body>
</html>
```

### 1.2 - Text type input element

Another type of input element typically used for forms would be the text type input element.

```html
<html>
    <head>
        <title>javaScript form input example</title>
    </head>
    <body>
        <input id="seed" type="text" value="1234"><br><br>
        <div id="out"></div>
        <script>
var draw = function(text){
    document.getElementById('out').innerText = text;
};
var input = document.getElementById('seed');
input.addEventListener('keyup', function(e){
    draw(e.target.value);
});
draw(input.value);
        </script>
    </body>
</html>
```

## 2 - Node sever script javaScript form example with query string and get requests

In order to really get into what javaScript forms are for I need to have at least one or two examples in this post that involve some back end javaScript code. So with that said in this section I will be going over a very basic example of using a javaScript from to navigate to a search path with some query strings that are set with a form.

### 2.1 - The query-string.html file

Here I have an html file with just a form element and a single text input element in it, and a submit button. I am setting the action attribute of the form element to the search path and the method to get. This way when the submit button is clicked the user will be directed to the search path with the query string set to the values given in the text input field.

```html
<html>
    <head>
        <title>javaScript form input example</title>
    </head>
    <body>
        <form action="/search" method="GET">
            <input name="q" type="text" value="javaScript form"><br><br>
            <button type="submit">Search</button>
        </form>
    </body>
</html>
```


### 2.1 - The server.js file

Now for the server file for this javaScript form example. I am using the http module to create a simple server that will just respond to get requests for severing up the client system that is just the single html file, and then any kind of query to the search path. The file system module is used to read the contents of the query string html file with the form element, and send it to the client when the root path is reached, and I am also using the path module, and url module for parsing paths and query strings.

```js
let http = require('http'),
path = require('path'),
fs = require('fs'),
url = require('url'),
port = process.env.port || process.argv[2] || 8080;
 
let server = http.createServer();
 
let getHandler = function (req, res) {
 
    return new Promise((resolve, reject) => {
        if (req.method === 'GET') {
            if (req.url === '/') {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                fs.createReadStream(path.join(__dirname, 'query-string.html')).pipe(res, function () {
                    resolve();
                });
            } else {
                let qs = url.parse(req.url, true).query;
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });
                res.write('query for: ' + qs.q);
                resolve();
            }
        } else {
            reject(new Error('not a get request'));
        }
    });
};
 
server.on('request', function (req, res) {
    getHandler(req, res)
    .catch((e) => {
        res.writeHead(501, {
            'Content-Type': 'text/plain'
        });
        res.write(e.message);
        res.end();
    })
    .then(() => {
        res.end();
    });
});
 
server.listen(port, () => {
    console.log('web server is up on port: ' + port);
});
```

So then when this example is up and ruining it is serving up the single html file at the root path, and the search path which at this time is just displaying the query in the browser window. Nothing major at this point but the basic idea is all ready there and working it is now just a matter of what I do with that query in the back end system.

## 3 - Conclusion

of course it goes without saying that I have not even scratched the surface of what can be done with javaScript forms, and a little sever side javaScript. When it comes to making a real project there is a whole world more that needs to be covered when it comes to things like sever side sanitation and horizontal scaling just to name a few things that come to mind. Still when it comes to simple projects that are just going to be used off line then just some basic work with input elements and a little javaScript is enough to get things working at least. In this post I just wanted to cover the basics of javaScript forms, and that is about it.