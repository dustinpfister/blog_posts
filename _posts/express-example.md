---
title: Express examples from very basic to not so basic
date: 2019-04-30 18:00:00
tags: [express,node.js]
layout: post
categories: express
id: 430
updated: 2021-03-26 15:21:23
version: 1.20
---

This will be a post on express examples from very basic examples that are just use [expressjs](https://expressjs.com/) by itself, to more complex projects that use a fair number of npm packages, one or more front end frameworks, or a whole lot of vanilla js code. Learning express is something that will take a fair investment of time, but the more I play around with it the more I begin to like it actually. The framework takes a kind of minimalistic approach just like that of vuejs when it comes to front end frameworks, which I think pares well with express.

There is a lot to know before hand of course, but if you have been playing around with express for a while now and are not looking for some full express app examples of one sort or another on this site this is the right place to be.

<!-- more -->

## 1 - Express examples what to know

This is not at all a [getting started post](/2018/05/21/express-getting-started/) on expressjs, node.js or javaScript in general. Even if you have some background with express it might be a good idea to gain a solid understanding of express middleware, routers, http status codes, and a wide range of other [express topics](/2018/06/12/express/) before getting into making some actual projects with express. I will be starting out with simple examples here, but will also be linking into some examples that are a little involved as well.


## 2 - Very basic Express example that just uses express

For this basic example I am making use of express static as a way to serve up static files, and I am also using body parser as a way to go about parsing incoming requests for data as a special data path.

### 2.1 - The app.js file

Here is the app.js file for this simple express.js example. I start my requiring in express and then use the main express function to create an instance of an app. Once I have a main app object I can use the use method of app to make use of express static as a way to host a single index.html file ina  public folder.

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

I also have a single index.html file that will just work as a way to test that this example works as expected. In this html I have some javaScript that I am using to just preform a single post request to that data path that I set up. When the response complete the sever side data is then injected into the html.

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

## 3 - Express project examples thus far.

In this Section I will be briefly writing about all the expressjs example that I have made so far when it comes to starting to make something that is at least starting to look like some kind of project. Many of these are not production worthy, but just sever as some examples to get a general idea of what express is all about when it comes to making full stack web applications. making a real full stack application often requires a great investment of time and effort if it is just one developer doing all the work, which is the case wit me and these examples.

### 3.1 - [A simple markdown editor](/2019/05/02/express-example-markdown-editor/)

I started a project where the idea was to have something that I would start on one computer on my network, and then use a front end system to edit a collection of markdown files on that computer from any computer on the network.

### 3.2 - [Network pointers](/2021/03/25/express-example-network-pointers/)

This is a simple little network pointers canvas type thing that I started, but did not get around to finishing to work jst the way that I wanted to. However the basic idea was to make something where any user on a network can connect to the sever that is running this, and then will send up with a circle in a canvas that repentants them. So the general idea was to start something that could work as some kind of starting point for network games, but there is still more to work on with this when it comes to the very basics of it.

### 3.3 - [Making use of the serve index middleware](/2021/03/22/express-example-serve-index/)

The server index middleware that is one official middleware created and maintained by the express team, is a nice little basic tool for serving up and index of files in a path.

### 3.4 - [A basic text editor project](/2019/05/01/express-example-text-editor/)

A basic text editor example that I started, but never really got around to completing. I just wanted to have a simple little express example that can eb used to create and edit text files from a web browser. I did not get around to adding all the little features that I wanted when it comes to logging in any so forth so it goes without saying that if this is ever to be used it should only be used on a trusted network, and with files that you do not really care about.

## 4 - Conclusion

In time I might get around to creating more expressjs examples, and when I do I will of course expand this post with more examples. For the most part I just use express for making simple little server projects for many of my github folders that act as ways to serve up examples of things locally. I have to admit that I am a lot more interested in front end development, however maybe that is why I like express so much. When it does come to working out at least a little back end code of course I like to use node because I can use the same scripting language that I have come to like using in front end development. Working out some things with vanilla javaScript alone can often prove to be time consuming when it comes to nodejs itself, so express helps to make quick work of many common tasks, and there is a wealth of well supported middleware for it also.


