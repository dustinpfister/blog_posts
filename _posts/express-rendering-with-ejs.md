---
title: Rendering with ejs in express.js
date: 2018-05-25 15:27:00
tags: [js,express,node.js]
layout: post
categories: express
id: 194
updated: 2021-03-25 13:21:38
version: 1.10
---

When rendering a template in [express.js](https://expressjs.com/) there are many options to choose from, however so far I seem to prefer Embedded javaScript or EJS for short, over other options such as [pug](/2019/04/16/express-pug/). I have written a post on using the [ejs module by itself in node.js](/2017/12/07/nodejs-ejs-javascript-templates/) as the package can be used by itself outside of express as a way to render html with ejs templates, and some data. However this post is more about using it in an express.js environment, as such I will be covering how to set up an express view folder using ejs as a template language.

<!-- more -->

## 1 - Express ejs basic example

To get started with a basic example start a new project folder, [install express](https://www.npmjs.com/package/express), and the [ejs](https://www.npmjs.com/package/ejs) npm packages. In this post I am using express 4.16.x, and ejs 2.6.x, and if no major code breaking changes have happened the source code examples in this post should still be up to date.

In the root name space of the project folder I am going to want to create a view folder, this is where I am going to end up placing my ejs files. At the root of the project folder I am also going to have a main app.js file that I will be using as the start scipt for the project, the source code of which I will be getting to in this section.

```
$ mkdir render-ejs
$ cd render-ejs
$ npm init
$ npm install express@4.16.3
$ npm install ejs@2.6.1
$ mkdir views
```

### 1.2 - The views folder

As you may have noticed I made a views folder inside the root name space of the project folder, this is where I will be placing all my ejs template files. For my basic demo I just stared off with a single index.ejs file in the root name space of the views folder.

index.ejs would look like this for starters

```
<h1>Hello ejs!</h1>
```

### 1.3 - The app.js for the basic example

The main file that is called to start the project is often called app.js in an express.js project, often located at the root of the project folder. In this basic example of using ejs to render a template using express.js and node.js, I just need to set the views path to the folder where my ejs template are, and set the view engine to ejs.

```js
let express = require('express'),
path = require('path'),
app = express(),
 
// getting port this way
port = process.env.PORT || process.argv[2] || 8080;
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.get('/', function (req, res) {
 
    res.render('index',{});
 
});
 
app.listen(port, function () {
 
    console.log('app is up on port: ' + port);
 
});
```

## 2 - Conclusion

When I start this and go to localhost:8080 in my browser I am greeted with the "Hello ejs!" message. I have [another post on ejs](/2017/12/07/nodejs-ejs-javascript-templates/) in which I work with the ejs module by itself, which might be a good idea to do if you want to learn more about ejs. Ejs is just one template engine option when it comes to making an [express view](/2019/04/25/express-view/), there is also making use of the [express static](/2018/05/24/express-static/) built in middleware as well for the purpose of hosting static assets that are to be used in a view.

If you liked this post be sure to check out my [main post on expressjs](/2018/06/12/express/) in general.