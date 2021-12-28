---
title: An express text editor example
date: 2019-05-01 06:24:00
tags: [express,node.js]
layout: post
categories: express
id: 431
updated: 2021-12-28 09:20:58
version: 1.22
---

I want to write a few posts on [express examples](/2019/04/30/express-example/) that are actual full working application examples, rather than just simple hello world type examples. There is of course the typical todo app that is often the case, but I want to make a few more that go beyond that into other examples as well. As of late I have been transitioning from using windows to linux, and so far have been having a hard time finding a text editor that stacks up to notepad++ which I have grown accustomed to in windows. So why not make my own text editor on top of node.js, and express that I can take with me to any operating system that I can get node.js installed on? Sounds like a good idea to me compared to being dependent on a windows exclusive app, so I put together a quick basic [expressjs](https://expressjs.com/) powered text editor example.

<!-- more -->

## 1 - What to know about this Express Example before hand

For the sake of this post I am thinking more in terms of an express example that is starting to look like an actual project of one sort or another rather than a more basic example. If you are new to express you might want to start with my getting started post on express, and also my main post on express as well. I also assume that you have loged a fair amount of time playing around with javaScript and node.js in general, I will not be getting into that or anything else that is outside the scope of this post.

### 1.1 - Setup

For this project I am just using express when it comes to node.js dependencies, and I am just using a vanilla js client system. In the root of the project folder I have a folder for [express middleware](/2018/06/25/express-middleware/), and a public folder for all assets the compose the client system. 

```
$ mkdir express-example-text-editor
$ cd express-example-text-editor
$ npm init
$ npm install express@4.16.4 --save
$ mkdir middleware
$ mkdir public
$ cd public
$ mkdir html
$ mkdir js
```

## 2 - The /app.js file

So in the main app.js file in the root of the project folder I am just using express to create an instance of an app object. I am also using the built in [path module](/2017/12/27/nodejs-paths/) as well here. The [app.set](/2019/04/18/express-set/) method is then used to set some application settings for port, the current working directory and so forth. I then use [express static](/2018/05/24/express-static/) to host static assets in the public folder that will compose the client system, and I am also using the built in [body parser](/2018/05/27/express-body-parser/) middleware to parse incoming json from the client system as well.

```js
let express = require('express'),
path = require('path'),
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

I am then using a bunch of middleware methods that I have made and placed in my middleware folder. These preform all kinds of actions when it such as getting the current file, saving the current file, and listing the contents of the current directory.

## 3 - The /middleware folder

The middleware folder is where I offset much of the logic for getting the current file, saving the current file, and checking for a proper request body and so forth. By breaking things down into fine grain methods and files, it helps to keep things better structured.

### 3.1 - /middleware/check_body.js

Here I have my body check middleware in this file I am just checking for the presence of a request body, and creating an object that will be a reply for all post requests made from the client system to the path that this middleware is mounted to. In the event that a body is not present a 400 status is sent.

```js
let path = require('path'),
fs = require('fs');
 
// create reply object, and check for body
module.exports = [
 
    (req, res, next) => {
 
        // Create reply object
        res.reply = {
            success: false,
            mess: 'no body object populated.',
        };
 
        // check for body or next
        if (!req.body) {
            res.status(400).json(res.reply);
        } else {
            // sync server side fn and dir settings to any settings given by client
            res.app.set('fn', req.body.fn || res.app.get('fn'));
            res.app.set('dir', path.resolve(req.body.dir || res.app.get('dir')));
            res.reply.fn = res.app.get('fn');
            res.reply.dir = res.app.get('dir');
            // next middleware
            next();
        }
    },
 
    // if no action
    (req, res, next) => {
        // If no action Action, or next
        if (!req.body.action) {
            res.reply.mess = 'An action must be given';
            res.status(400).json(res.reply);
        } else {
            next();
        }
    }
]
```

In the event that a request body is there, application settings will be updated here if values are given. In addition if not action property is given that will also send a 400 status as well. All post requests sent to the path should have an action property that will be used to know which action should be preformed.

### 3.2 - /middleware/action_open.js

Here I have my open action middleware this is what will be used to open the current file, and send the data of that file to the client system. A 400 status will be sent in the event that any kind of error will happen in the process of doing so.

```js
let path = require('path'),
fs = require('fs');
 
// if action : 'open'
module.exports = (req, res, next) => {
    if (req.body.action === 'open') {
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
    } else {
        next();
    }
}
```

The error message will be sent as part of the standard reply object so if something goes wrong that information can be displayed in the client system.

### 3.3 - /middleware/action_save.js

Here I have my save action middleware as the name suggests this is what will be used to save the current file with data that is sent from the client system via a post request body.

```js
let path = require('path'),
fs = require('fs');
 
// if action : 'save'
module.exports = (req, res, next) => {
    if (req.body.action === 'save') {
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
    } else {
        next();
    }
};
```

Again 400 status will be sent for any error that might happen while saving the file, or if no data is given to save.

### 3.4 - /middleware/action_list.js

Here I have my list middleware this is what I am using to create a list of the contents of the current directory. I am using the fs.readdir file system module method to read the contents of the current directory set in the application settings of the project. I am also using the fs.stat method to find out if an item in a directory is a file or another directory. This data is then sent to the client system that uses the data to implement a file system navigation feature of the text editor.

```js
let path = require('path'),
fs = require('fs');
 
// if action : 'list' - to list files in current dir
module.exports = (req, res, next) => {
    if (req.body.action === 'list') {
 
        // change dir
        if (req.body.cd) {
            res.app.set('dir', path.join(res.app.get('dir'), req.body.cd));
            res.reply.dir = res.app.get('dir')
        }
 
        fs.readdir(path.resolve(res.app.get('dir')), (e, files) => {
 
            if (e) {
 
                res.reply.mess = e.message;
                res.status(400).json(res.reply);
 
            } else {
 
                let i = 0,
                len = files.length,
 
                // step stat
                stepStat = () => {
                    i += 1;
                    if (i === len) {
 
                        // add back one
                        files.unshift({
                            fn: '..',
                            dir: true
                        });
 
                        res.reply.success = true;
                        res.reply.mess = 'list sent';
                        res.reply.data = files;
                        res.status(200).json(res.reply);
                    } else {
                        readStat();
                    }
                },
 
                // next stat
                readStat = () => {
                    fs.stat(path.join(res.app.get('dir'), files[i]), (e, stat) => {
                        if (stat) {
                            files[i] = {
                                fn: files[i],
                                dir: stat.isDirectory()
                            };
                        } else {
                            files[i] = {
                                fn: files[i]
                            };
                        }
                        stepStat();
                    });
                };
                readStat();
            }
 
        });
 
    } else {
 
        // else next action
        next();
 
    }
}
```

That concludes the middleware that I am using, as well as all the back end code as well. Now for the public folder that contains all the front end code.

## 4 - The /public folder

The public folder contains html, css, and javaScript files. For this example there is nothing fancy going on in terms of the client system when it comes to the use of front end frameworks, as I did not want to pull to much attention away from express. 

### 4.1 - /public/html/index.html

Here I have just the one html file that I am using for this project. I am using a textarea element for the text as this project is just a plain old text editor, so I do not need to do anything fancy when it comes to styling text.

```html
<html>
<head>
  <title>Express Example Text Editor</title>
  <link rel="stylesheet" type="text/css" href="edit.css">
</head>
<body>
<div class="list"><iframe id="list_files" class="list_files"></iframe></div>
<div class="editor">
 
  <textarea id="text_edit" rows="16" cols="64"></textarea>
  <br><br>dir : <input id="text_dir" type="text">
     <input id="text_list" type="button" value="list">
  <br><br>fn  : <input id="text_fn" type="text">
    <input id="text_open" type="button" value="open">
    <input id="text_save" type="button" value="save">
  <br><br>
    <span id="text_emess" class="text_emess"></span>
    <span id="text_mess" class="text_mess"></span>
</div>
 
<script src="/js/get.js"></script>
<script src="/js/menu.js"></script>
<script src="/js/client.js"></script>
</body>
</html>
```

### 4.2 - /public/html/edit.css

Some css is used to position elements and style message text.

```css
* {
    padding:0px;
    margin:0px;
}
div {
    padding:1%;
    position:relative;
    float:left;
}
.list{
    width:20%;
    background:grey;
}
.list_dirlink{
    color:red;
}
#list_files{
    width:100%;
    height:400px;
}
.editor{
    width:50%;
}
.text_mess{color:green;}
.text_emess{color:red; width:auto;}
```


### 4.3 - / public/js/get.js

Here I have a javaScript file that provides a function that both wraps document.getElementById, and can also be used to make post requests as well.

```js
var get = function (sOpt) {
 
    // if STRING get is a wrapper for document.getElementById
    if (typeof sOpt === 'string') {
 
        return document.getElementById(sOpt);
 
    } else {
 
        // else an OBJECT is assumed and used to make http requests
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/data', true);
 
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

### 4.4 - / public/js/menu.js

Here I have another module that I worked out that has to do with making all the various requests to the express middleware back ends that I put together.

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
 
    // Open the file that is at the current
    // dir and fn app settings
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
                //get('text_fn').value = resObj.fn;
                mess(resObj.mess);
                setInputs(resObj);
            },
            onError: api.error
        });
    };
 
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
                mess(resObj.mess);
            },
            onError: api.error
        });
 
    };
 
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
                cd: opt.cd || null
            },
            onDone: function (files, resObj) {
 
                emptyList();
 
                console.log('files:');
 
                var list = get('list_files');
                files.forEach(function (fStat) {
                    var item = document.createElement('div');
                    item.innerHTML = '<span style=\"' + (fStat.dir ? 'color:red;' : 'color:green;') + '\">' + fStat.fn + '<\/span>';
                    item.addEventListener('click', function (e) {
                        // open the file clicked
                        if (fStat.dir) {
                            Menu.List({
                                cd: e.target.innerText
                            });
 
                        } else {
                            api.Open({
                                fn: e.target.innerText
                            });
                        }
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

### 4.5 - / public/js/client.js

An additional javaScript file that attaches some event handers, and makes the initial calls for certain methods in the menu module.

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