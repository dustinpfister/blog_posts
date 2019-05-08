---
title: An express markdown editor example
date: 2019-05-02 08:30:00
tags: [express,node.js]
layout: post
categories: express
id: 432
updated: 2019-05-08 13:24:29
version: 1.7
---

I have been having a hard time finding a markdown editor that has all the features that I want, also I want one that I can use in any operating system environment that I can get node.js installed on. So for today's express example why not a markdown editor, after all if you want a job done right sometimes you have to do it yourself. 

<!-- more -->

## 1 - Express Markdown Editor Example, and what to know first

This [express example](/2019/04/30/express-example/) requires at least some background knowledge with [express](/2018/06/12/express/), node.js and javaScript in general.

## 2 - The Main app.js file

In the main app.js file I creates the main express app object instance, and add some application settings with [the app.set](/2019/04/18/express-set/) method. These settings have to do with what port to listen on, as well at the current working directory in which mark down files are to be found.

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

In addition to built in middleware I am also using much of my own middleware methods for reading the current file at the current directory, parsing the markdown to html and sending it to the client.

## 2 - The middleware folder.

In this exmpress example I am using my own external express middleware methods for preforming all kinds of tasks that I want to accomplish via node.js rather than the browser. To keep my main app.js file from becoming a long monolithic block of code that is hard to follow in a blog post I have broken things down into many external files, and placed them in a middleware folder. In this section I will be going over these including the one the parses the mark down to plain html.


### 2.1 - The /middleware/md_html.js file

```js
let express = require('express'),
path = require('path'),
fs = require('fs'),
marked = require('marked'),
 
router = module.exports = express.Router();
 
// send html of current markdown file
router.get('*', (req, res) => {
 
    let fn = req.app.get('fn'),
    dir = req.app.get('dir'),
    dir_md = path.join(dir, fn);
 
    // read current markdown file
    fs.readFile(dir_md, 'utf8', (e, md) => {
        if (e) {
            res.status(500).send(e.message);
        } else {
            // used marked to send html of markdown
            res.set('Content-Type', 'text/html');
            let html = '<head>  <link rel="stylesheet" type="text/css" href="edit.css"><\/head>' +
                '<body>' + marked(md) + '<\/body>';
            res.status(200).send(html);
        }
    });

});
```

### 2.2 - The /middleware/body_check.js file


```js
let express = require('express'),
 
router = module.exports = express.Router();
 
router.use([
 
        // create reply object
        (req, res, next) => {
 
            // Create reply object
            res.reply = {
                success: false,
                mess: 'no body object populated.'
            };
 
            next();
 
        },
 
        // check body
        (req, res, next) => {
 
            // check for body or next
            if (!req.body) {
 
                res.status(400).json(res.reply);
 
            } else {
 
                // body must have an action property
                if (!req.body.action) {
 
                    res.mess = 'body must have an action property';
                    res.status(400).json(res.reply);
 
                } else {
 
                    // we are good
                    next();
 
                }
 
            }
 
        },
 
        // update settings
        (req, res, next) => {
 
            let app = res.app;
 
            // sync server side fn and dir settings to any settings given by client
            app.set('fn', req.body.fn || app.get('fn'));
            app.set('dir', req.body.dir || app.get('dir'));
            res.reply.fn = app.get('fn');
            res.reply.dir = app.get('dir');
 
            next();
 
        }
    ]);
```

### 2.3 - The /middleware/action.js file

```js
let express = require('express'),
path = require('path'),
 
router = module.exports = express.Router();
 
router.use((req, res, next) => {
 
    try {
 
        let action = require(path.join(res.app.get('dir_mw'), './action_' + req.body.action + '.js'));
        action(req, res, next);
 
    } catch (e) {
 
        res.reply.mess = e.message;
        res.status(400).send(res.reply)
 
    }
 
});
```

### 2.5 - The /middleware/action_open.js file

```js
let express = require('express'),
path = require('path'),
fs = require('fs');
 
module.exports = (req, res, next) => {
 
    // try to open the current filename at the current dir
    fs.readFile(path.join(res.app.get('dir'), res.app.get('fn')), res.app.get('encode'), (e, data) => {
        if (e) {
            res.reply.mess = e.message;
            res.status(400).json(res.reply);
        } else {
            res.reply.success = true;
            res.reply.mess = 'opened and sent file data';
            res.reply.data = data;
            res.status(200).json(res.reply);
        }
    });

};
```

### 2.6 - The /middleware/action_save.js file

```js
let express = require('express'),
path = require('path'),
fs = require('fs');
 
module.exports = (req, res, next) => {
 
    // if we have data
    if (req.body.data) {
        // try to save the data
        fs.writeFile(path.join(res.app.get('dir'), res.app.get('fn')), req.body.data, (e) => {
            if (e) {
                res.reply.mess = e.message;
                res.status(400).json(res.reply);
            } else {
                res.reply.success = true;
                res.reply.mess = 'save file success';
                res.reply.data = req.body.data;
                res.status(200).json(res.reply);
            }
        })
    } else {
        // else we do not have data to save
        res.reply.mess = 'must have data to save';
        res.status(400).json(res.reply);
    }

};
```
### 2.4 - The /middleware/action_list.js file

```js
let express = require('express'),
path = require('path'),
fs = require('fs');
 
// if action : 'list' - to list files in current dir
module.exports = (req, res, next) => {
 
    fs.readdir(path.resolve(res.app.get('dir')), (e, files) => {
        if (e) {
            res.reply.mess = e.message;
            res.status(400).json(res.reply);
        } else {
            res.reply.success = true;
            res.reply.mess = 'list sent';
            res.reply.data = files;
            res.status(200).json(res.reply);
        }
    });

};
```