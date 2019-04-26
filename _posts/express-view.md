---
title: Express view
date: 2019-04-25 20:52:00
tags: [express,node.js]
layout: post
categories: express
id: 425
updated: 2019-04-26 13:22:28
version: 1.2
---

An express view folder contains template files that are use for server side rendering. It can be used in place of, or in conjunction with other assets that can be served via express.static. In order to use a view folder there must be a template engine to use. I tend to prefer ejs, but there are many other options such as pug. So this post will be centered around setting up the beginnings of an express view folder, and maybe I will get into some more advanced topics when it comes to creating a client system for a project.

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

### 1.2 - The view/index.ejs file in the view folder



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