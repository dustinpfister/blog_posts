---
title: Express Middleware Example Keyword Viewer App
date: 2019-04-20 20:59:00
tags: [express,node.js]
layout: post
categories: express
id: 420
updated: 2019-04-21 11:42:34
version: 1.4
---

In this post I will be writing about an app I have made that is an example of express middleware in action. I have wrote a main post on express middleware in which I explore the subject in general, as well as another post in which I cover just the very basics of this topic as well. However this post will be one of several posts in which I demonstrate the usefulness of express middleware, mainly when it comes to writing your own to accomplish whatever needs to get done server side.

<!-- more -->

## 1 - The Express Middleware Example overview

I wanted to start developing some tools that will help me gain some insight into how it is that some of my content is prefroming well with organic search, while much of it is not. There are many metrics that come to mind when it comes to this sort of thing, but one of them is the number of times that an full pattern match for a keyword is found in the content. 

So that being said I wanted to make a tool that will loop over the contents of a folder that contains json files in which I am storing one or more keywords that I am targeting in another corresponding markdown file in another folder. For each file in the keyword folder a link will appear in an index that when clicked on will result in another view in which the content of the post is displayed with each instance of the keyword highlighted.

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
                    // remove headers from markdown
                    md = md.replace(/---/g, '');

                    // create html from markdown
                    req.data.html = marked(md);

                    // remove a tags
                    req.data.html = req.data.html.replace(/<a [^>]*>|<\/a>/g, '');

                    // highlight full pattern matches with span elements
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
<p><a href="/">Back to Index</a></p>
<p>mess: <%= mess %></p>
<p>keywords: <%= keywords.map((kw)=> kw.keyword) %></p>
<pre style="white-space: pre-wrap;">
<%- html %>
</pre>
</body>
</html>
```

## 5 - The /keywords, and /posts folders

### 5.1 - keywords JSON file example /_keywords/express-middleware-links.json

```
[{
        "keyword": "express middleware",
        "value": 6500
    }, {
        "keyword": "expressjs",
        "value": 3500
    }
]
```

### 5.2 - A markdown example /_posts/express-middleware-links.md

```
## 1 - express middleware links
 
This is another post on the keyword express middleware that has [links to things like the expressjs website](https://expressjs.com/). For the sake of this project at least links should be removed, or somthing should be done to avoid injecting tags for keywords that might appear in a tag urls.
```