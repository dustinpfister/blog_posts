---
title: Express Middleware Example Keyword Viewer App
date: 2019-04-20 20:59:00
tags: [express,node.js]
layout: post
categories: express
id: 420
updated: 2019-04-20 21:42:27
version: 1.2
---

In this post I will be writing about a simple app I have made that is an example of express middleware in action.

<!-- more -->




## 2 - The middleware folder

### 2.1 - The middleware/list_all.js

```js
let express = require('express'),
path = require('path'),
fs = require('fs'),
dir_keywords = path.resolve('_keywords');
 
// create a router, and use body-parser
router = module.exports = express.Router();
 
router.get('*', (req, res, next) => {
 
    req.filenames = [];
 
    fs.readdir(dir_keywords, (err, files) => {
 
        if (err) {
            console.log(err.message);
            next()
        } else {
            files.forEach((fn) => {
                req.filenames.push(path.basename(fn, '.json'));
            });
            next();
        }
    });
 
});
```

### 2.2 - The middleware/process_post.js

```js
let express = require('express'),
path = require('path'),
marked = require('marked'),
fs = require('fs'),
dir_keywords = path.resolve('_keywords'),
dir_posts = path.resolve('_posts');
 
// create a router, and use body-parser
router = module.exports = express.Router();
 
router.get('*', [
 
        // set defaults for reg.data
        (req, res, next) => {
            req.data = {
                html: '',
                mess: '',
                filename: null,
                keywords: []
            };
            next()
        },
 
        // check params
        (req, res, next) => {
            if (!req.params) {
                req.data.mess = 'A post name must be given';
                next('router');
            } else {
                req.data.filename = req.params[0].split('/')[2];
                next();
            }
        },
 
        // get keywords json file
        (req, res, next) => {
            fs.readFile(path.join(dir_keywords, req.data.filename + '.json'), 'utf-8', (e, json) => {
                if (e) {
                    req.data.mess = e.message;
                    next('router');
                } else {
                    req.data.keywords = JSON.parse(json);
                    next();
                }
            })
 
        },
 
        // create html from markdown, and create special style for keywords
        (req, res, next) => {
            fs.readFile(path.join(dir_posts, req.data.filename + '.md'), 'utf-8', (e, md) => {
                if (e) {
                    req.data.mess = e.message;
                    next();
                } else {
                    req.data.html = marked(md.replace(/---/g, ''));
                    // full pattern matches
                    req.data.keywords.forEach((kw) => {
                        req.data.html = req.data.html.replace(
                                new RegExp(kw.keyword, 'g'),
                                '<span style=\"border:3px solid red;\">' + kw.keyword + '<\/span>');
                    });
                    next();
                }
            });
        }
 
    ]);
```


## 3 - The /app.js file
```js
let express = require('express'),
app = express();
 
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || process.argv[2] || 8080);
 
app.get('/', [
        require('./middleware/list_all.js'),
        (req, res) => {
            res.render('index', {
                filenames: req.filenames
            });
        }
    ]);
 
app.get('/blog_post/:postname', [
        require('./middleware/process_post.js'),
        (req, res) => {
            res.render('blog_post', req.data);
        }
    ]);
 
app.listen(app.get('port'), () => console.log('Keyword viewer is up on Port: ' + app.get('port')));
```

## 4 - The /views folder

### 4.1 - /views/index.ejs

```
<html>
<head>
</head>
<body>
<h1>Keyword Viewer</h1>
<% filenames.forEach((fn)=>{ %>
   <p><a href="/blog_post/<%= fn %>"><%= fn %></a></p>
<% }); %>
</body>
</html>
```

### 4.2 - /views/blog_post.ejs

```
<html>
<head>
</head>
<body>
<h1>Blog Post: <%= filename %></h1>
<p>mess: <%= mess %></p>
<p>keywords: <%= keywords.map((kw)=> kw.keyword) %></p>
<pre style="white-space: pre-wrap;">
<%- html %>
</pre>
</body>
</html>
```