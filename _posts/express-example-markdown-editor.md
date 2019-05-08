---
title: An express markdown editor example
date: 2019-05-02 08:30:00
tags: [express,node.js]
layout: post
categories: express
id: 432
updated: 2019-05-08 12:44:26
version: 1.3
---

I have been having a hard time finding a markdown editor that has all the features that I want, also I want one that I can use in any operating system environment that I can get node.js installed on. So for today's express example why not a markdown editor, after all if you want a job done right sometimes you have to do it yourself. 

<!-- more -->

## 1 - Express Markdown Editor Example, and what to know first

This [express example](/2019/04/30/express-example/) requires at least some background knowledge with [express](/2018/06/12/express/), node.js and javaScript in general.

## 2 - The Main app.js file

In the main app.js file I creates the main express app object instance, and add some application settings with the app.set method. These settings have to do with what port to listen on, as well at the current working directory in which mark down files are to be found.

Here I am also using the [express static](/2018/05/24/express-static/) built in middleware as well as a way to host all static assets for the client system. I am also using the built in [body parser](/2018/05/27/express-body-parser/) middleware as a way to parse incoming [post request](/2019/04/17/express-post/) body's from the client system as well.

```js
let express = require('express'),
path = require('path'),
app = express();
 
app.set('dir', path.join(process.cwd(), '_posts'));
app.set('fn', 'first-post.md');
 
app.set('encode', 'utf8');
app.set('port', process.argv[2] || process.env.PORT || 8080);
app.set('dir_mw', path.resolve('./middleware'))
 
// hosting static assets for the client system
app.use('/js', express.static('public/js'));
app.use('/', express.static('public/html'));
 
// html of current md file
//app.use('/html', require('./middleware/md_html.js'));
app.use('/html', require(path.join(app.get('dir_mw'), 'md_html.js')));
 
// body parser
app.use(require('body-parser').json());
 
// actions
app.post('/action',
    [
        // check body
        require(path.join(app.get('dir_mw'), 'body_check.js')),
        // preform action
        require(path.join(app.get('dir_mw'), 'action.js')),
        // something went wrong
        (req, res, next) => {
            res.reply.mess = 'YIKES something went wrong';
            res.status(400).json(res.reply);
        }
    ]);
 
app.listen(app.get('port'), () => console.log('example markdown editor is up on port: ' + app.get('port')));
```