---
title: Having a path that responds with on the fly json.
date: 2018-06-26 20:48:00
tags: [js,express,node.js]
layout: post
categories: express
id: 217
updated: 2018-06-27 16:14:06
version: 1.2
---

So I have been writing some [express.js](https://expressjs.com/) projects these days, and I seem to be generally making two kinds of paths in my projects. Paths that render html, and paths that respond to requests that are sent via some kind of http client in the browser. Because much of full stack development often has at least a little to do with a database of some kind, I wanted to do some exercises that involve making a path that will spit out json, but the json will be different depending on the query strings that are given. Also it would be a path that will not just spit out a static json file, but a result to some kind of query. So in other words a path that gives on the fly json.

<!-- more -->


### 2.1 - The /app.js file


```js
let express = require('express'),
path = require('path'),
app = express();
 
app.set('port', process.env.PORT || process.argv[2] || 8080);
 
app.use('/json', require('./mw/json_fly')({
 
        path_db: path.join(__dirname, 'db', 'days.json')
 
    }));
 
app.get('/', function (req, res) {
 
    res.send('okay');
 
});
 
app.listen(app.get('port'), function () {
 
    console.log('express_flyjson is up on port: ' + app.get('port'));
 
});
```

### 2.2 - The /mw/json_fly.js file

```js
let express = require('express'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
flyJS = express();
 
flyJS.get('/',
 
    [
 
        // set standard response object defaults
        function (req, res, next) {
 
            req.app.locals.jRes = {
 
                success: false,
                mess: '',
                eMess: '',
                data: {}
 
            }
 
            next();
 
        },
 
        // get database
        function (req, res, next) {
 
            let jRes = req.app.locals.jRes;
 
            try {
 
                // try to populate req.db
                //req.db = require(flyJS.get('path_db'));
 
                let adapt = new FileAsync(flyJS.get('path_db'));
 
                low(adapt).then((db) => {
 
                    // if all goes well continue
                    req.db = db;
                    next();
 
                }).catch ((e) => {
 
                    // else spit out an error response
                    jRes.mess = 'error getting database';
                    jRes.eMess = e.message;
                    res.json(jRes);
 
                });
 
            } catch (e) {
 
                // else spit out an error response
                jRes.mess = 'error getting database';
                jRes.eMess = e.message;
                res.json(jRes);
 
            }
 
        },
 
        // check for query string
        function (req, res, next) {
 
            let jRes = req.app.locals.jRes,
            qKeys = Object.keys(req.query);
 
            // if no query string just give stats
            // not the whole db
            if (qKeys.length === 0) {
 
                jRes.success = true;
                jRes.mess = 'No query string given, so just giving database stats';
                jRes.data = {
 
                    dayCount: req.db.get('days').value().length
 
                };
                res.json(jRes);
 
            } else {
 
                next();
 
            }
 
        },
 
        // respond to sd and ed query string values
        function (req, res, next) {
 
            let jRes = req.app.locals.jRes;
 
            if (req.query.sd) {
 
                let sd = req.query.sd.split('/'),
                ed = sd;
 
                if (req.query.ed) {
 
                    ed = req.query.ed.split('/');
 
                }
 
                sd = new Date('20' + sd[2], sd[1] - 1, sd[0]);
                ed = new Date('20' + ed[2], ed[1] - 1, ed[0]);
 
                req.db.get('days')
                .filter((day) => {
 
                    // filter by date
                    let date = new Date(day.timeStamp);
                    return date >= sd && date <= ed;
 
                })
                .sortBy('date').write().then((data) => {
 
                    jRes.success = true;
                    jRes.mess = 'data for days ' + sd + ' to ' + ed;
                    jRes.data = data;
                    res.json(jRes);
 
                }).catch ((e) => {
 
                    jRes.mess = 'error';
                    res.json(jRes);
 
                });
 
            } else {
 
                next();
 
            }
 
        },
 
        // end of line
        function () {
 
            let jRes = req.app.locals.jRes;
 
            jRes.mess = 'end of line sorry';
            res.json(jRes);
 
        }
 
    ]);
 
module.exports = function (options) {
 
    flyJS.set('path_db', options.path_db || 'db.json');
 
    return flyJS;
 
};
```