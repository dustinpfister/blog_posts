---
title: An express text editor example
date: 2019-05-01 06:24:00
tags: [express,node.js]
layout: post
categories: express
id: 431
updated: 2019-05-07 17:49:55
version: 1.4
---

I want to write a few posts on [express examples](/2019/04/30/express-example/) that are actual full working application examples, rather than just simple hello world type examples. There is of course the typical todo app that is often the case, but I want to make a few more that go beyond that into other examples as well. As of late I have been transitioning from using windows to linux, and so far have been having a hard time finding a text editor that stacks up to notepad++ which I have grown accustomed to in windows. So why not make my own text editor on top of node.js, and express that I can take with me to any operating system that I can get node.js installed on? Sounds like a good idea to me compared to being dependent on a windows exclusive app, so I put together a quick basic [expressjs](https://expressjs.com/) powered text editor example.

<!-- more -->

## 1 - What to know before hand

For the sake of this post I am thinking more in terms of an express example that is starting to look like an actual project of one sort or another rather than a more basic example. If you are new to express you might want to start with my getting started post on express, and also my main post on express as well. I also assume that you have loged a fair amount of time playing around with javaScript and node.js in general, I will not be getting into that or anything else that is outside the scope of this post.


## 2 - The /app.js file

```js
let express = require('express'),
path = require('path'),
fs = require('fs'),
app = express();
 
app.set('dir', process.cwd());
app.set('fn', 'newfile.txt');
 
app.set('port', process.argv[2] || process.env.PORT || 8080);
app.set('dir_mw', path.resolve('./middleware'));
app.set('encode', 'utf8');
 
// hosting static assets for the client system
app.use('/js', express.static('public/js'));
app.use('/', express.static('public/html'));
 
// body parser
app.use(require('body-parser').json());
 
// singe middleware that responds to post requests
app.post('/data',
    [
        // check body
        require(path.join(app.get('dir_mw'), 'check_body.js')),
        // actions
        require(path.join(app.get('dir_mw'), 'action_open.js')),
        require(path.join(app.get('dir_mw'), 'action_save.js')),
        require(path.join(app.get('dir_mw'), 'action_list.js')),
        // unknown action
        (req, res, next) => {
            res.reply.mess = 'The action given is not known';
            res.status(400).json(res.reply);
        }
    ]);
 
app.listen(app.get('port'), () => console.log('example text editor is up on port: ' + app.get('port')));
```

## 3 - The /middleware folder

### 3.1 - /middleware/check_body.js
### 3.2 - /middleware/action_open.js
### 3.3 - /middleware/action_save.js
### 3.4 - /middleware/action_list.js

## 4 - The /public folder
### 4.1 - The /public/html folder
#### 4.1.1 - /public/html/index.html
#### 4.1.2 - /public/html/edit.css

### 4.2 - The /public/js folder
#### 4.2.1 - / public/js/get.js
#### 4.2.2 - / public/js/menu.js
#### 4.2.3 - / public/js/client.js