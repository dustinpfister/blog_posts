---
title: A todo app example using express, lowdb, and much more.
date: 2018-06-23 19:52:00
tags: [js,express,node.js]
layout: post
categories: express
id: 215
updated: 2018-06-26 16:11:46
version: 1.26
---

So I have been working with [express.js](https://expressjs.com/) for a while now when it comes to making simple demos, but now I think it is time to start making something that is a full working project of some kind. Often people start with a simple todo list project of some kind, so maybe that will do for now. I do not have to make this the kind of project that I will devote a few years of my life to, it can just be a good start. In this post I will be writing about this first express.js project, and if all goes well maybe this will not be the last post like this, as I progress into something else that is more interesting.

<!-- more -->

## 1 - What to know before continuing

This is a post on an example of a full stack web application built using node.js, express.js, and a whole bunch of other modules. This is not at all a getting started post on express.js, javaScript, html, css, and so forth. If you are new to this sort of thing it might be best to start at my [main post on express.js](/2018/06/12/express/), as this is a more advanced post on full stack web development using express.js.

### 1.1 - This is the first release I am writing about

This is the first release that I am writing about in this post express_todo 0.0.125. There might be a 1.x in the future as there is a lot about this project that I am not satisfied with. However I am interested in progressing into more interesting projects as well, so that might not come to pass. So in other words, this project is not at all production ready, and if you are going to use it I would only do so locally.

## 2 - install, or setup

Because this has turned out to be a complex project I have made a repo on my github page. So If for some reason you want to install this locally you can by cloning it down, and doing an npm install to install all the dependencies for it.

### 2.1 - install by cloning the repo

So one way to quickly reproduce what I am wrting about here is to just clone down what I have made with git clone, make sure you are using the version that I am writing about (0.0.125), and then install the dependencies with an npm install.

```
$ git clone https://github.com/dustinpfister/express_todo
$ cd express_todo
$ git checkout tags/0.0.125 -b foobar
$ npm install
$ node app
```

Once everything is installed you would just need to call node app to start the main app.js file, and if all goes well you will be able to use the app when you navigate to localhost:8080 in a web browser.

### 2.2 - Reproducing from scratch

If you want to reproduce from scratch there are a few things to install, and study if you are not familiar with them.

However you might start out like this.
```
$ mkdir express_todo
$ cd express_todo
$ npm init
$ npm install ejs@2.6.1 --save
$ npm install express@4.16.3 --save
$ npm install fs-extra@6.0.1 --save
$ npm install js-yaml@3.12.0 --save
$ npm install lodash@4.17.10 --save
$ npm install lowdb@1.0.0 --save
$ npm install shortid@2.2.8 --save
```

## 3 - At the root

At the root of the project folder is a few files of interest, like any other express.js project or demo of mine there is the main app.js file, also there will be a conf.yaml file as well for some app settings. There are also many folders of interest that lead into many other folders and files that compose both a front end, and back end system.

### 3.2 - The main app.js file

The main app.js file might always be a good starting location, as this is the file that is called with node to start the app. It is here that the main app object instance is, I am also calling a conf.js file in the lib folder that makes a conf.yaml file, or get settings from it that are used to set app settings like what port or theme to use. 

I am also setting up all my static paths here as well as using some routes defined in the routes folder, that in turn also use some built in middleware methods.

```js
let express = require('express'),
path = require('path'),
app = express();
 
// use lib/conf.js to load app settings from conf.yaml
require('./lib/conf.js')(app, __dirname).then(function () {
 
    // static paths for all themes
    app.use('/js', express.static('public/js'));
 
    // static paths for current theme
    app.use('/theme/js', express.static(path.join(__dirname, 'themes', app.get('theme'), 'js')));
    app.use('/theme/css', express.static(path.join(__dirname, 'themes', app.get('theme'), 'css')));
 
    // use /list path
    app.use(require('./routes/list')({
            dir_root: __dirname
        }));
 
    // main render
    app.get('/', function (req, res) {
 
        res.render('index', {
            layout: 'index'
        });
 
    });
 
    app.get('/create', function (req, res) {
 
        res.render('index', {
            layout: 'create'
        });
 
    });
 
    //app.use('/edit', require('./routes/edit')());
    app.use(require('./routes/edit')({
            app: app
        }));
 
    // start listening
    app.listen(app.get('port'), function () {
 
        console.log('express_todo is live.');
        console.log('port: ' + app.get('port'));
        console.log('theme: ' + app.get('theme'));
 
    });
 
}).catch (function (e) {
 
    console.log(e.message);
 
});
```

Of course this is also where I am calling app.listen to start the project on a port that is in the port app setting.

### 3.1 - config.yaml

So the config.yaml is a file that will be created when starting express_todo for the first time. as of this writing there are just two settings the port, and the theme. As of this writing the only value you might want to change is the port, as there is only one theme.

## 4 - The /lib folder

This lib folder contains tow files, conf.js that is used to make or read the main conf.yaml file that is used to store app settings, and the db_lists file that is used to help work with the lowdb powered database.

### 4.1 - conf.js

So the conf.js file reads the main conf.yaml file and sets app settings for the main instance of the app object. In the event that the conf.yaml file is not there one is created, and set up with some hard coded default settings.

```js
let express = require('express'),
fs = require('fs-extra'),
_ = require('lodash'),
yaml = require('js-yaml'),
path = require('path');
 
// set settings to the given app with the given settings object
let setWithYAML = function (app, root, yamlConf) {
 
    // load yaml
    let setObj = yaml.safeLoad(yamlConf.toString());
 
    // set settings
    _.each(setObj, function (val, key) {
 
        app.set(key, val);
 
    });
 
    // insure port is set to the PORT environment variable if present
    if (process.env.PORT) {
 
        app.set('port', process.env.PORT);
 
    }
 
    // always use ejs for now
    app.set('views', path.join(root, 'themes',app.get('theme')));
    app.set('view engine', 'ejs');
 
    return app;
 
};
 
// read conf.yaml
let readConf = function (app, dir) {
 
    return fs.readFile(path.join(dir, 'conf.yaml')).then(function (yamlConf) {
 
        console.log('conf.yaml found.');
        return setWithYAML(app, dir,yamlConf);
 
    });
 
};
 
// set settings for the given instance of app
module.exports = function (app, dirroot) {
 
    // these values should be given from the main app.js
    app = app || express();
    dirroot = dirroot || process.cwd();
 
    // read yaml file
    return readConf(app, dirroot).catch (function (e) {
 
        // create new conf.yaml
        let conf = {
 
            port: process.env.PORT || process.argv[2] || 8080,
            theme: 'landscape'
 
        };
 
        let data = yaml.safeDump(conf);
        return fs.writeFile(path.join(dirroot, 'conf.yaml'), data, 'utf8').then(function (yamlConf) {
 
            console.log('new conf.yaml');
 
            return readConf(app, dirroot);
 
        });
 
    })
 
};
```

This file might be a bit overkill at the moment, but if I do take the time to expand this project, then there might come a time where I would want a setup like this.

### 4.2 - db_lists.js

This is the lib that I am using to interact with my database. For this simple todo app I am using lowdb for a database solution, not the best choice for a production app, but this is no production app. I do like the simplicity of lowdb, and for simple projects like this that I do not intent to deploy, it gets the job done.

```js
let path = require('path'),
fs = require('fs-extra'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
shortId = require('shortid');
 
// okay just do this for now.
let dir_db = 'db',
path_lists = path.join(dir_db, 'lists.json');
 
/********* ********** **********
HELPER
 ********** ********** *********/
 
// ensure db folder, and default list.json
exports.ensureDB = function () {
 
    let listAdapter = new FileAsync(path_lists);
 
    return fs.ensureDir(dir_db).then(function () {
 
        return low(listAdapter).then(function (list) {
 
            return list.defaults({
                lists: []
            }).write();
 
        })
 
    });
 
};
 
/********* ********** **********
LISTS
 ********** ********** *********/
 
// read the lists
exports.readLists = function () {
 
    let listAdapter = new FileAsync(path_lists);
 
    return low(listAdapter);
 
};
 
// push new list
exports.pushList = function (obj) {
 
    obj = obj || {};
 
    obj.name = obj.name || 'new list';
 
    return this.readLists().then(function (lists) {
 
        let list = {
 
            name: obj.name,
            id: shortId.generate(),
            items: []
 
        };
 
        return lists.get('lists').push(list).write().then(function () {
 
            return list;
 
        });
 
    });
 
};
 
// getListById
exports.getListById = function (id) {
 
    return this.readLists().then(function (lists) {
 
        return lists.get('lists').find({
            id: id
        });
 
    }).then(function (list) {
 
        // sort by done
        return list.assign({
 
            items: list.get('items').sortBy(function (item) {
 
                return !item.done;
 
            }).value()
        });
 
    });
 
};
 
// delete a list by listId
exports.deleteListById = function (obj) {
 
    return this.readLists().then(function (db) {
 
        return db.get('lists').remove({
 
            id: obj.listId
 
        }).write();
 
    });
 
};
 
/********* ********** **********
ITEM
 ********** ********** *********/
 
// get an item by list and item id
exports.getItemById = function (obj) {
 
    return this.getListById(obj.listId).then(function (list) {
 
        return list.get('items').find({
            id: obj.itemId
        });
 
    });
 
};
 
// edit an item by list and item id
exports.editItemById = function (obj) {
 
    return this.getListById(obj.listId).then(function (list) {
 
        var item = list.get('items').find({
                id: obj.itemId
            });
 
        // toggle done flag?
        if (obj.toggleDone) {
 
            return item.assign({
                done: !item.value().done
            }).write();
 
        } else {
 
            // then direct edit, if we have an item object to do so with
            if (obj.item) {
                return item.assign(obj.item).write();
            }
 
        }
 
        // if this happens just return a promise,
        // and change nothing.
        return item.write();
 
    });
 
};
 
// get an item by list and item id
exports.deleteItemById = function (obj) {
 
    return this.getListById(obj.listId).then(function (list) {
 
        return list.get('items').remove({
            id: obj.itemId
        }).write();
 
    });
 
};
 
// push a new item to a list
exports.pushItem = function (obj) {
 
    return this.getListById(obj.listId).then(function (list) {
 
        obj.item.id = shortId.generate();
        obj.item.done = false;
 
        return list.get('items').push(obj.item).write();
 
    });
 
};
```

This is used by my middleware functions to handle everything with respect to the lists.json file in the db folder. Also any additional future middleware will use this as well when it comes to doing anything with the list data.

## 5 - The /public folder

So like many of my express.js projects so far there is a public folder. I put this folder in as a way to serve up some static assets that will be shared across what might eventually be more than one theme. For the moment I am using it as a way to just host a single javaScript file that acts as a kind of api to access everything of interest in the back end.

### 5.1 /public/js/list_client.js

So this is a javaScript file that provides a simple custom trailered http client using XMLHttprequest, and a bunch of methods that can be called to make certain kinds of requests from the front end. Requests for a certain list if I know the id, and making post requests for new lists, and items.

```js
// list client.
var lc = (function () {
 
    // simple, custom, http client using XMLHttpRequest
    var http = function (obj) {
 
        obj = obj || {};
 
        // defaults to making GET requests to the /list path
        this.method = obj.method || 'GET';
        this.path = obj.path || '/list';
        this.body = obj.body || null;
        this.onDone = obj.onDone || function () {
            console.log(this.response);
        };
        this.onFail = obj.onFail || function () {
            console.log(this.response);
        };
 
        // start the request
        var xhr = this.xhr = new XMLHttpRequest();
        xhr.open(this.method, this.path);
 
        // with this client all GET,and POST request should be for JSON
        xhr.setRequestHeader('Content-Type', 'application/json');
 
        var req = this;
        xhr.onreadystatechange = function () {
 
            if (this.readyState === 4) {
 
                if (this.status === 200) {
 
                    req.onDone.call(this, this);
 
                } else {
 
                    req.onFail.call(this, this);
 
                }
 
            }
 
        };
 
        // send
        xhr.send(this.body);
 
    };
 
    // no call back default
    var nocb = function () {
 
        console.log(this.response);
 
    };
 
    // public api
    return {
 
        // expose http
        http: http,
 
        // just get the main index
        getIndex: function (obj) {
 
            obj = obj || {};
 
            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;
 
            new http({
 
                onDone: obj.onDone,
                onFail: obj.onFail
 
            });
 
        },
 
        // get a list by id
        getList: function (obj) {
 
            obj = obj || {};
 
            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;
            obj.listId = obj.listId || null;
 
            new http({
                method: 'POST',
                body: JSON.stringify({
                    mode: 'get',
                    listId: obj.listId
                }),
                onDone: obj.onDone,
                onFail: obj.onFail
 
            });
 
        },
 
        // delete a list
        delList: function (obj) {
 
            obj = obj || {};
 
            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;
            obj.listId = obj.listId || null;
 
            new lc.http({
 
                method: 'POST',
                body: JSON.stringify({
                    mode: 'delete',
                    listId: obj.listId
                }),
                onDone: obj.onDone,
                onFail: obj.onFail
 
            });
 
        },
 
        // creates a new list
        createList: function (obj) {
 
            obj = obj || {};
 
            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;
 
            obj.body.mode = 'create';
            obj.body = JSON.stringify(obj.body);
 
            new http({
 
                method: 'POST',
                body: obj.body,
                onDone: obj.onDone,
                onFail: obj.onFail
 
            });
 
        },
 
        // creates a new list
        addListItem: function (obj) {
 
            obj = obj || {};
 
            obj.onDone = obj.onDone || nocb;
            obj.onFail = obj.onFail || nocb;
 
            obj.body = obj.body || {};
            obj.body.mode = 'add_list_item';
            obj.body.item = obj.body.item || {
                name: 'cry'
            };
            obj.body = JSON.stringify(obj.body);
 
            new http({
 
                method: 'POST',
                path: '/edit',
                body: obj.body,
                onDone: obj.onDone,
                onFail: obj.onFail
 
            });
 
        }
 
    };
 
}
    ());
```

## 6 - The routes folder

So the routes folder is a way to help break down the many paths that are defined by this project. For the most part when I think about it I am going to want to have a path that has to do with editing a list, and another path that has to do with creating, deleting, and getting a main index of lists. So in this folder there is an edit.js, and list.js files, as well as a middleare folder that has all the middleware functions that are used by these two paths.

### 6.1 - /routes/edit.js

Here in the edit.js file I am setting what should be done for get, and post requests to the /edit path. This path is used by the client to edit a list that was created before hand.

```js
let express = require('express'),
dbLists = require('../lib/db_lists'),
 
editApp = express();
 
//editApp.get('/edit', require('../lib/mw_edit_get'));
 
editApp.get('/edit', require('./mw/edit_get'));
 
// POST
editApp.use(require('body-parser').json());
editApp.post('/edit',
 
    [
        // check body
        require('./mw/check_body'),
 
        // set postRes object
        require('./mw/setobj_postres'),
 
        // add item?
        require('./mw/item_add'),
 
        // delete item?
        require('./mw/item_delete'),
 
        // edit item?
        require('./mw/item_edit'),
 
        // get item?
        require('./mw/item_get'),
 
        // fail
        require('./mw/check_fail')]);
 
module.exports = function (obj) {
 
    // set views from main app
    editApp.set('views', obj.app.get('views'));
 
    return editApp;
 
};
```

### 6.2 - /routes/list.js

The list.js file is where I set up what is to be done for GET and POST requests to the /list path.

```js
let express = require('express'),
path = require('path'),
fs = require('fs-extra'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
shortId = require('shortid'),
 
dbLists = require('../lib/db_lists'),
 
listApp = express();
 
// GET for /list path
listApp.get('/list', function (req, res) {
 
    // send just a list of names, and ids
    dbLists.readLists().then(function (list) {
 
        res.json({
            lists: list.get('lists').value().map(function (l) {
                return {
                    name: l.name,
                    id: l.id
                }
            })
        });
 
    });
 
});
 
// POST for /list path
listApp.use(require('body-parser').json());
listApp.post('/list',
    [
 
        // check for a body
        require('./mw/check_body'),
 
        // set postRes object
        require('./mw/setobj_postres'),
 
        // create a list?
        require('./mw/list_create'),
 
        // delete a list?
        require('./mw/list_delete'),
 
        // get a list?
        require('./mw/list_get'),
 
        // fail
        require('./mw/check_fail')
 
    ]);
 
// export a list app
module.exports = function (obj) {
 
    listApp.set('dir_root', obj.dir_root || process.cwd());
    listApp.set('path_lists', path.join(listApp.get('dir_root'), 'db', 'lists.json'));
 
    // ensure db folder
    dbLists.ensureDB();
 
    return listApp;
 
};
```
like with edit.js I am using many middleware methods in an additional folder that I placed in the routes folder.

### 6.3 - The middleware at the /routes/mw folder

here I have a much of middleware files that I use with the /edit and /list paths as a way of breaking things down more, so they are easier to understand, and manage.

#### 6.3.1 - edit_get.js

So making a get request to the /edit path will result in server side rendering, and what will be rendered depends on the query string given.

```js
// a middleware that starts a render object
let dbLists = require('../../lib/db_lists');

module.exports = [
 
    // set up a standard render object
    require('./setobj_rend'),
 
    // make sure we are using the edit layout
    function (req, res, next) {
 
        // use edit layout
        req.rend.layout = 'edit';
 
        next();
 
    },
 
    // render list of lists, if no listId is given in the query string
    function (req, res, next) {
 
        if (req.query.l === undefined) {
 
            dbLists.readLists().then(function (lists) {
 
                req.rend.lists = lists.get('lists').value();
                res.render(req.rend.main, req.rend);
 
            }).catch (function () {
 
                res.render(req.rend.main, req.rend);
 
            });
 
        } else {
 
            // else we where given a list id so set the list id, and continue.
            req.rend.listId = req.query.l;
            next();
 
        }
 
    },
 
    // if no item id is given, just send out the list
    function (req, res, next) {
 
        // no item id given?
        if (req.query.i === undefined) {
 
            dbLists.getListById(req.query.l).then(function (list) {
 
                req.rend.list = list.value();
                res.render(req.rend.main, req.rend);
 
            });
 
        } else {
 
            // item id given
            req.rend.itemId = req.query.i;
            next();
 
        }
 
    },
 
    // get the item
    function (req, res) {
 
        dbLists.getItemById({
 
            listId: req.query.l,
            itemId: req.query.i
 
        }).then(function (item) {
 
            req.rend.item = item.value();
            res.render(req.rend.main, req.rend);
 
        });
 
    }
 
];
```

#### 6.3.2 - setobj_rend.js

I made this middleware as a way to setup a standard object that will be passed to ejs wen rendering templates.

```js
// a middleware that starts a render object
module.exports = function (req, res, next) {

    req.rend = {
 
        main: 'index', // main ejs file to use in the root of the theme
        layout: 'index', // layout ejs file to use
 
        listId: null,
        itemId: null,
        lists: [],
        list: {},
        item: {}
 
    };
 
    next();
 
};
```

#### 6.3.3 - setobj_postres.js

This one sets a standard object that is send for responses to post requests.

```js
// a middleware that starts a render object
module.exports = function (req, res, next) {
 
    // set defaults for an standard object
    // that will be send back for a post
    // request
    req.postRes = {
        success: false,
        body: req.body,
        mess: '',
        eMess: '',
        list: [],
        item: {}
    };
 
    next();
 
};
```

#### 6.3.4 - check_body.js

As the name suggests this middeware just checks for a body, and makes sure a mode is set as well. If something is missing it responds, else it does nothing.

```js
// check body
module.exports = function (req, res, next) {
 
    // body must be there,
    if (req.body) {
 
        //  and the body must have a mode property
        if (req.body.mode) {
 
            // then we are good to continue
            next();
 
        } else {
 
            // respond with no mode mess
            res.json({
 
                success: false,
                mess: 'no mode.',
                body: req.body
 
            });
 
        }
 
    } else {
 
        // respond with no body mess
        res.json({
 
            success: false,
            mess: 'no body was parsed.'
 
        });
 
    }
 
};
```
#### 6.3.5 - check_fail.js
#### 6.3.6 - item_add.js
#### 6.3.7 - item_delete.js
#### 6.3.8 - item_edit.js
#### 6.3.9 - item_get.js
#### 6.3.10 - list_create.js
#### 6.3.11 - list_delete.js
#### 6.3.12 - list_get.js

## 7 - The /themes folder

### 7.1 - The Landscape theme

#### 7.1.2 - css

#### 7.1.3 - js

#### 7.1.4 - layouts

#### 7.1.5 - index.ejs

#### 7.1.6 - nav.ejs

## 8 - the /db folder

## 9 - conclusion