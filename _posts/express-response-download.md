---
title: Managing file downloads in express with the response download method
date: 2018-06-11 11:01:00
tags: [js,express,node.js]
layout: post
categories: express
id: 204
updated: 2021-03-23 11:16:32
version: 1.9
---

As I continue expanding on [express.js](https://expressjs.com/) this month today I thought I would write about the [response download method](https://www.geeksforgeeks.org/express-js-res-download-function/), which is one of the many methods in express that are part of the standard response object that I might write about more this week. The download response method will send a file as an attachment rather than the content to be displayed, so it does differ a little from the [send file response method](/2018/06/13/express-response-send-file/) that would be used as a way to send a file as browser display content, rather than an attachment to be downloaded to a place on a clients local file system.

This download method of the response object of a middleware function is useful if you want to have some kind of path that will work as a way to deliver a file as a download when a link is clicked, or something to that effect. When doing so the user should end up being prompted if they want to download the file, and if it is something they want they can then click to downloaded to a location on there local file system. It is very easy to use, you do not have to worry about setting the proper headers or anything like that it does it all for you so all that has to be done basically is to just call a method in the response object.

<!-- more -->

## 1 - What to know

This is a post on express.js a popular node.js framework that is used in many node.js projects. It is not a getting started post on express.js, node.js, or any additional skills required to get something of value out of reading this. I have my [getting started post on express.js](/2018/05/21/express-getting-started/), but you might want to start elsewhere if you are new to [express.js](https://expressjs.com/), [node.js](https://nodejs.org/en/), and [javaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

Also in this post I am working with express.sj version 4.16.3, which as of this writing is the latest version.


## 2 - Basic example of res.download in express.js

For a basic example I have just a single file called doc1.txt in a folder called docs in the root of my demo folder. For this demo the only dependency that is needed is express itself.

```
$ mkdir response-download
$ cd response-download
$ npm init
$ npm install express --save
$ mkdir docs
```

### 3 - The app.js file for the basic example of res.download in express.js

This demo has just one javaScript file that is of course the main app.js file that will be started with node in the command line to start the demo. I am just setting up two paths. One path for the root name space of the app, that will provide a link to a path that will result in a file download, and the other is that path that will result in the download.

```js
let express = require('express'),
path = require('path'),
port = process.env.PORT || process.argv[2] || 8080,
app = express();
 
app.get('/', function (req, res) {
 
    res.send('<a href="/getdoc">get a doc</a>');
 
});
 
app.get('/getdoc', function (req, res) {
 
    res.download(path.join(__dirname, 'docs/doc1.txt'), function (err) {
 
        console.log(err);
 
    });
 
});
 
app.listen(port, function () {
 
    console.log('response-download demo is up on port: ' + port);
 
});
```

Now I just need to start the app in the command line by calling the script with node.

```
$ node app.js
```

And go to localhost:8080 in my browser I see the get a doc link, when I click it I end up downloading doc1.txt to the downloads folder. So then the app seems to work as expected the res download method in express can be used to start a download of a file for a user that goes to a given path. this of course can prove to be a useful feature for all kinds of applications that call for such an action.

## 4 - Conclusion

The response download method works great if you want something to be treated as a file download. this makes the method useful for things like documents and platform dependent binaries that are meant to be used outside of the browser in some capacity. There are many other such methods like res.sendFile that can also be used to just send a file to the client, although they do work differently. If you want to just host some files in a public folder of sorts you would want to use express.static. If you enjoyed this post consider reading my [other posts on express](https://dustinpfister.github.io/categories/express/).