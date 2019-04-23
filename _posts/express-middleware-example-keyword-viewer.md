---
title: Express Middleware Example Keyword Viewer App
date: 2019-04-20 20:59:00
tags: [express,node.js]
layout: post
categories: express
id: 420
updated: 2019-04-21 17:55:11
version: 1.14
---

In this post I will be writing about an app I have made that is an example of [express middleware](https://expressjs.com/en/guide/using-middleware.html) in action. I have wrote a [main post on express middleware](/2018/06/25/express-middleware/) in which I explore the subject in general, as well as another post in which I cover just the [very basics](/2019/04/19/express-middleware-basics/) of this topic as well. However this post will be one of several posts in which I demonstrate the usefulness of express middleware, mainly when it comes to writing your own to accomplish whatever needs to get done server side.


<!-- more -->

## 1 - The Express Middleware Example overview

I wanted to start developing some tools that will help me gain some insight into how it is that some of my content is preforming well with organic search, while other posts are not so much. There are many metrics that come to mind when it comes to this sort of thing, but one of them is the number of times that an full pattern match for a keyword is found in the content. 

So that being said I wanted to make a tool that will loop over the contents of a folder that contains json files in which I am storing one or more keywords that I am targeting in another corresponding markdown file in another folder. For each file in the keyword folder a link will appear in an index that when clicked on will result in another view in which the content of the post is displayed with each instance of the keyword highlighted.

### 1.1 - Setup

In this project on top of using express I am also using [marked](/2017/11/19/nodejs-marked/) as a way to quickly parse markdown into html, and I am also [useing ejs](/2018/05/25/express-rendering-with-ejs/) as a template system. I also made a few folders where I will be placing router level middleware, markdown, and json files.

```
$ mkdir express-middleware-example-keyword-viewer
$ cd express-middleware-example-keyword-viewer
$ npm init
$ npm install express --save
$ npm install ejs --save
$ npm install marked --save
$ mkdir views
$ mkdir _posts
$ mkdir _keywords
$ mkdir middleware
```

## 2 - The middleware folder

The middleware folder is where I will be placing all of my router level middleware that I will then be using in the main express application at the root name space of the project folder. In here I have two files, one is used when a get request is received the the root name space of the site, and as such it serves an index of links to posts that I have keyword targeting data for. The other is used to render the text for a given post with matches for that keyword highlighted.

### 2.1 - The middleware/list_all.js

Here is the middleware that creates a list of filenames to which there is keyword data. This is achieved by using the node.js file system modules fs.readdir method to get a list of json files in the keyword folder. Each of the filenames in this keyword folder corresponds with a markdown file in the posts folder.

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

The actual rendering of this list of filenames is done in the ejs template for the index of the project, more on that as well as the json file format later.

### 2.2 - The middleware/process_post.js

This is the middleware that creates html form the markdown of a post in the post folder, and also injects span tags that highlight each instance of a keyword that I am targeting in the corresponding json file. Like the other router level middleware in this folder this does not do any actual rendering, but rather builds something that will be used in the rendering process by passing the data that it acquires and generates as an object to an ejs template.

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

Here is the main app.js file of the project. I am using require to input by router level middleware in the middleware folder, and I am using ejs to render templates with that is appended to the request objects by that middleware.

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

Here in my view folder I have an ejs file for both the index that is rendered when doing to the root path, and then one for when rendering the content of a blog post as well. I will not be getting into ejs in depth here as I have wrote a post on that all ready.

### 4.1 - /views/index.ejs

Here is the index.ejs file, I am just creating a link for each post for which there is a keywords file. Nothing fancy with pagination or anything to that effect.

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

The ejs file for rendering the blog post content including the highlighted instances of the keyword

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

There is then the keywords and posts folders that contain the json file with the keywords I am targeting, and the markdown of the content of the post itself.

### 5.1 - keywords JSON file example /_keywords/express-middleware-links.json

the format of a json file in the keywords folder looks like this.

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

I then have a markdown file in which I am using the keyword one or more times.

```
## 1 - express middleware links
 
This is another post on the keyword express middleware that has [links to things like the expressjs website](https://expressjs.com/). For the sake of this project at least links should be removed, or somthing should be done to avoid injecting tags for keywords that might appear in a tag urls.
```

## 6 - Conclusion

There is much more I would like to do with this project if I get the time to work on it more. So far I am happy with it though, using express and node.js is a great way to make useful little tools like this.