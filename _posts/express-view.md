---
title: Express view
date: 2019-04-25 20:52:00
tags: [express,node.js]
layout: post
categories: express
id: 425
updated: 2021-03-23 14:40:32
version: 1.6
---

An [express view](https://expressjs.com/en/guide/using-template-engines.html) folder contains template files that are use for server side rendering. It can be used in place of, or in conjunction with other assets that can be served via [express.static](/2018/05/24/express-static/) when it comes to just simple static hosting of files. Using express static to host a public html folder might work okay, and in some situations in might just be what needs to happen. However by going with a template language, and using a render engine, server side rendering of html can be preformed using nodejs an express.

In order to use a view folder there must be a template engine to use. I tend to prefer ejs, but there are many other options such as pug. So this post will be centered around setting up the beginnings of an express view folder, and maybe I will get into some more advanced topics when it comes to creating a client system for a project.

<!-- more -->

## 1 - Express View Basic example using ejs

In this section I will be covering a very simple express view folder example that makes use of just express and ejs as a template system so that is all that will need to be installed when  it comes to npm packages.

```
$ mkdir express_view
$ cd express_view
$ npm init
$ npm install express --save
$ npm install ejs --save
$ mkdir views
```

In this example there will just be a single express app.js file in the root name space of the express_view project folder, and a single index.ejs in the views folder as well.

### 1.1 - The app.js file at root

In the main app.js file that will be called to start the server, I am using the app.set method to set the view engine to ejs. Now I can use the res.render method to render html using an ejs template file and some local variables. In this example I am just going to be passing some string literals to the template, but in a more advanced project this could be some data that is retrieved from a database or something to that effect.

```js
let express = require('express'),
app = express();
 
app.set('view engine', 'ejs');
 
app.get('/', (req, res) => {
    res.render('index', {
        mess_title: 'Express View Example',
        mess_greet: 'This is ejs in action.'
    });
});
 
app.listen(8080);
```

When calling the res.render method the first argument that I give is the name of the file in the views folder that will be used to render the html that will be sent to the client. So in the next section I will be taking a quick look at the index.ejs file for this example.

### 1.2 - The view/index.ejs file in the view folder

Here I have the index.ejs file of this crude, simple, yet function express view. Notice that I am using the key names of the object that I passed to the res.render method in the app.js file. The values of those object keys will be what is displayed for the title and other elements in this example.

```
<html>
  <head>
    <title><%= mess_title %></title>
  </head>
  <body>
    <h1><%= mess_title %></h1>
    <p><%= mess_greet %></p>
  </body>
</html>
```

There is much more to write about when it comes to ejs, but I will not get into depth in ejs to much in this post as I have also wrote a post on [using ejs with express](/2018/05/25/express-rendering-with-ejs), and I have also wrote another post on [using ejs with just node.js by itself](/2017/12/07/nodejs-ejs-javascript-templates/) as well. There are of course many other options when it comes to template langauges, I tend to prefer ejs but another option would be [pug](/2019/04/16/express-pug/). Still when this example is up and working it should help to give a general idea as to why ejs is useful compared to its serving static html assets.