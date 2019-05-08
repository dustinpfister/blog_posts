---
title: An express markdown editor example
date: 2019-05-02 08:30:00
tags: [express,node.js]
layout: post
categories: express
id: 432
updated: 2019-05-08 19:48:55
version: 1.21
---

I have been having a hard time finding a markdown editor that has all the features that I want, also I want one that I can use in any operating system environment that I can get node.js installed on. So for today's express example why not a markdown editor, after all if you want a job done right sometimes you have to do it yourself. 

<!-- more -->

## 1 - Express Markdown Editor Example, and what to know first

This [express example](/2019/04/30/express-example/) requires at least some background knowledge with [express](/2018/06/12/express/), node.js and javaScript in general.

### 1.1 - Setup

This project involves just the use of [express](https://www.npmjs.com/package/express) and [marked](https://www.npmjs.com/package/marked) when it comes to node.js dependences. All other code is just pure vanilla js code.

```
$ mkdir express-example-markdown-editor
$ cd express-example-markdown-editor
$ npm init
$ npm install express@4.16.4 --save
$ npm install marked@0.6.2 --save
$ mkdir middleware
$ mkdir public
$ mkdir _posts
$ cd public
$ mkdir html
$ mkdir js

```

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

Here Is the middleware that I worked out that is used to parse the current mark down file to plain old html. In this middleware I am using marked.js, the only other dependency for this express example to do so. There is much more to write about when it comes to using marked.js, but I have all ready wrote a [post on marked](/2017/11/19/nodejs-marked/), so I will not be getting into detail about that here.

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

Beyond the use of marked I am just using the node.js built in file system module to read the current markdown file, there are other options for doing so as well such as fs-extra, but I do not want to pull to much focus away from the fact that this is an express example, and not an example on other node.js dependencies.

### 2.2 - The /middleware/body_check.js file

Here I have a middleware that is the first of many when it comes to handing post requests that are made from the client system. Here I create an object that will untamitly be the response for the post request, I also check for a post body, and if it has an action property.

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

I also update application settings with any values that may be present in the object as well.

### 2.3 - The /middleware/action.js file

This middleware calls another middleware method depending on the action property value. If the middleware method does not exist then as one would expect the method responds to the request with a 400 http status.

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

this way in order to add more actions I just have to add the file to the middleware folder, and then update my client system to make use of that feature. I tend to prefer something like this compared to having each middleware hard coded into the source code of the project. If the file is there it will make use of it, if not it will shoot out an error.

### 2.5 - The /middleware/action_open.js file

This action can be used to just send back the raw text of the current file. The encoding is one of the application settings set in the main app.js file, there is no way to change it as of yet, but that might change at some point maybe.

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

Actions can be simple lik this one or far more complex, it just so happens that I do want at least some like this that are just read that current file and give me that text.

### 2.6 - The /middleware/action_save.js file

Here I have the middleware that will save the current file with the data that is given from the client system.

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

Here I have a middleware that will send back a list of all files in the current directory.

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

## 3 - The public folder

This express example makes use of just a plain old vanilla js client system. In this section I will be quickly going over the state of that system.

### 3.1 - The /public/html/index.html file

There is just a single html file that is used for the index of the project.

```html
<html>
<head>
  <title>Express Example Markdown Editor</title>
  <link rel="stylesheet" type="text/css" href="edit.css">
</head>
<body>
<div class="wrap_main">
<div class="list">
  <br><br><iframe id="list_files" class="list_files"></iframe>
</div>
 <div class="editor">
  <textarea id="text_edit"></textarea>
  <br><br>dir : <input id="text_dir" type="text">
     <input id="text_list" type="button" value="list">
  <br><br>fn  : <input id="text_fn" type="text">
    <input id="text_open" type="button" value="open">
    <input id="text_save" type="button" value="save">
  <br><br><hr>
    <span id="text_emess" class="text_emess"></span>
    <span id="text_mess" class="text_mess"></span>
</div>
<div class="viewer">
  <iframe id="viewer_md" src="/html"></iframe>
</div>
</div>
<script src="/js/get.js"></script>
<script src="/js/menu.js"></script>
<script src="/js/client.js"></script>
</body>
</html>
```

### 3.2 - The /public/html/edit.css file

There is some css.

```css
* {
	padding:0px;
	margin:0px;
}
div {
	position:relative;
	float:left;
}
.wrap_main{
	width:98%;
	padding:1%;
}
.list{
	width:20%;
}
#list_files{
	width:100%;
}
.editor{
	width:40%;
	padding:1%;
}
#text_edit{
	width:100%;
	min-height:400px;
}
.viewer{
	width:38%;
	
}
#viewer_md{
	width:100%;
	height:400px;
}
```

### 3.3 - The /public/js/get.js file

I am using a javaScript file that serves as a wraper for document.getElementByid and also as a way to make post requests.

```js
var get = function (sOpt) {
 
    // if STRING get is a wrapper for document.getElementById
    if (typeof sOpt === 'string') {
 
        return document.getElementById(sOpt);
 
    } else {
 
        // else an OBJECT is assumed and used to make http requests
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/action', true);
 
        sOpt = sOpt || {};
        sOpt.payload = sOpt.payload || {};
        sOpt.action = sOpt.action || 'open';
        sOpt.onDone = sOpt.onDone || function (res,resObj) {
            console.log(resObj);
        };
        sOpt.onError = sOpt.onError || function (e) {
            console.log(e);
        };
 
        // what to do for ready state
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                try {
                    var resObj = JSON.parse(this.response);
                    if (this.status === 200) {
                        sOpt.onDone.call(this, resObj.data, resObj);
                    } else {
                        sOpt.onError.call(this, resObj.mess, resObj);
                    }
                } catch (e) {
                    sOpt.onError.call(this, 'JSON Parse Error in get.js', {});
                }
            }
        };
 
        // in this project all requests will be for JSON data
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(sOpt.payload));
    }

};
```

### 3.4 - The /public/js/menu.js file

```js
// Module to help work with the
// back end system for the editor
var Menu = (function () {
 
    // set / clear messages
    var mess = (function () {
        var el_mess = get('text_mess'),
        el_eMess = get('text_emess');
        var func = function (mess) {
            el_mess.innerHTML = mess;
        };
        func.eMess = function (eMess) {
            el_eMess.innerHTML = eMess;
        };
        func.clear = function () {
            el_mess.innerHTML = '';
            el_eMess.innerHTML = '';
        };
        return func;
    }
        ());
 
    // set the dir and fn input elements values to
    // what is in the given reply object
    var setInputs = function (reply) {
        get('text_dir').value = reply.dir;
        get('text_fn').value = reply.fn;
    };
 
    // public api
    var api = {};
    api.noop = function () {};
    api.done = function (text) {
        console.log(text)
    };
    api.error = function (eMess) {
        console.log(eMess);
        mess.eMess(eMess);
    }
 
    // Open a file
    api.Open = function (opt) {
        // if null for dir or fn the default will
        // be whatever is set server side
        opt = opt || {};
        mess.clear();
        get({
            payload: {
                action: 'open',
                dir: opt.dir || null,
                fn: opt.fn || null
            },
            onDone: function (text, resObj) {
                get('text_edit').value = text;
                get('viewer_md').contentWindow.location.reload();
                mess(resObj.mess);
                setInputs(resObj);
            },
            onError: api.error
        });
    };
 
    // save the current file
    api.Save = function (opt) {
        opt = opt || {};
        mess.clear();
        get({
            payload: {
                action: 'save',
                dir: opt.dir || null,
                fn: opt.fn || null,
                data: get('text_edit').value
            },
            onDone: function (text, resObj) {
                get('text_edit').value = text;
                get('viewer_md').contentWindow.location.reload();
                mess(resObj.mess);
            },
            onError: api.error
        });
 
    };
 
    // List files in the current dir
    var emptyList = function () {
        var list = get('list_files').contentWindow.document.body;
        while (list.firstChild) {
            list.removeChild(list.firstChild);
        }
    };
    api.List = function (opt) {
        opt = opt || {};
        mess.clear();
        get({
            payload: {
                action: 'list',
                dir: opt.dir || null,
            },
            onDone: function (files, resObj) {
                emptyList();
                var list = get('list_files');
                files.forEach(function (fn) {
                    var item = document.createElement('p');
                    item.innerText = fn;
                    item.addEventListener('click', function (e) {
                        // open the file clicked
                        api.Open({
                            fn: e.target.innerText
                        })
                    })
                    list.contentWindow.document.body.appendChild(item);
                });
            },
            onError: api.error
        });
 
    };
 
    return api;
 
}
    ());
```

### 3.5 - The /public/js/client.js file

```js
// open the current file
Menu.Open();
Menu.List();
 
get('text_open').addEventListener('click', function (e) {
    Menu.Open({
        fn: get('text_fn').value,
        dir: get('text_dir').value
    });
});
 
get('text_save').addEventListener('click', function (e) {
    Menu.Save({
        fn: get('text_fn').value
    });
});
 
get('text_list').addEventListener('click', function (e) {
    Menu.List({
        dir: get('text_dir').value
    });
});
```

## 4 - The _posts folder