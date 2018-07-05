---
title: Visualizing google analytics data with three.js
date: 2018-07-01 09:46:00
tags: [js,express,node.js,three.js]
layout: post
categories: express
id: 218
updated: 2018-07-05 11:34:15
version: 1.12
---

I have been [writing posts](/categories/express/) on [express.js](https://expressjs.com/), and am now at a point in which I am just making some projects based that include express.js. I have a post on a basic express todo app, a middleware that responds to requests with json, and now the project that I am going to write about in this post that has to do with using three.js to visualizing my google analytics data that I am just calling [express_visual_analytics](https://github.com/dustinpfister/express_visual_analytics). I think one of the best ways to learn something a little complicated, is to just start building something interesting with it, and learn as I go. That has been the case with this project, and as such it only makes sense that I write about it.

<!-- more -->


## 1 - what to know before

This is a post on [a project](https://github.com/dustinpfister/express_visual_analytics) that I have made using express.js that involves visualizing google analytics data using three.js. It is not a getting started post on express.js, three.js, google analytics, node.js, or javaScript in general. I assume that you have a background in at least most of these things. If interested you might want to check out my [main post on express](/2018/06/12/express/) if you are new to express.


## 1.1 - This is a work in progress

When I am writing this I am working on version 0.1.x of this project, and it may never be a done deal. There are many additional ideas for features that I wanted to add, and I am also relatively new to full stack development.

## 1.2 - Not meant for deployment at this time.

This project is just one of several projects that I want to mention in my main post on express.js as examples of full stack applications using express. The aim with this project was to just simply make some three.sj models that reflect changes in google analytics data that is imported from CSV files. I do not intent to deploy this project, but I do intent to make it into some kind of offline tool that can be used to make some interesting three.js models that I can then make images, and maybe animations from that can then potential be shard somewhere.

## 1.3 - Relationship with express_flyjson

This project borrows from a tool, and middle ware that I have development as a separate independent project called [express_flyjson](https://github.com/dustinpfister/express_flyjson). Mainly The tool at /lib/csv_ga_import, and the middleware at /mw/json_fly_va are copyes of what I am also using in that project. Changes and improvements that I make with them here may be adopted into that, and vise versa.

## 2 - Setup

Because this project is a little complex I will not be getting into how to go about making the whole thing from the ground up. If you are interested in following alone locally it would be best to just clone down the project.

```
$ git clone https://github.com/dustinpfister/express_visual_analytics
$ cd express_todo
$ npm install
$ node app
```

As of this writing I am working on 1.x, if doing this gives you a later version what I am writing about here may be out of date.

## 3 - importing CSV

To import csv download a csv from the audience overview section in google analytics. At present the library that I have made only imports csv data that is exported for daily user counts there. At some point if I do continue to suport this there may me more options.

Once I have a csv file download I then need to place it in a csv folder at the root of the project folder, if it is not there just created it.

Then I just need to call the main build script at root, and the lib at /lib/csv_ga_import should build a json database at /db/db.json that will be used by the project as the date to be visualized.
```
$ node build
```

### 3.1 - The main build.js file

The script that I call from the command line to build the json database is located in the root name space and is simply called build.js.

```js
let path = require('path');
 
require('./lib/csv_ga_import')({
 
    dir_csv: path.join(__dirname,'csv'),
    dir_db: (path.join(__dirname,'db'))
 
}).then((a) => {
 
    console.log('Looks like we did it');
 
}).catch ((e) => {
 
    console.log(e.message);
 
});
```

As you can see I use a lib called csv_ga_import which is something I put together in a separate project called [express_flyjson](https://github.com/dustinpfister/express_flyjson).

### 3.1 - csv importing thanks to csvtojson

The procress of importing csv was not as time consuming as it would have been if I had not used [csvtojson](https://www.npmjs.com/package/csvtojson), which is a great tool for doing as the name implies. If interested in learning more about that I [have a post](/2018/02/12/nodejs-csv-to-json/) on csvtojson.


## 4 - json_fly_va middle ware

The json_fly_va middleware is custom hacked over version of a similar middleware that I developed in my express_flyjson project. ALthoigh I will not get into full detail about the full sorce code of this I will of course cover some of the features of it that I use to make my three.js models.


### 4.1 - The main index.js of json_fly_va

The main index.js of this middleware creates an instance of the express.js app object by calling the express top level function, and this of course is what is exported by the middleware, and is therefor what is used in the main app.js file via app.use.

```js
let express = require('express'),
FileAsync = require('lowdb/adapters/FileAsync'),
low = require('lowdb'),
flyJS = express();
 
flyJS.get('/',
 
    [
 
        // set the standard response object
        require('./response_set_obj'),

        // get the days database
        require('./db_get_days'),
 
        // check for query string
        require('./check_query'),
 
        // tabulate
        require('./response_send_tab'),
 
        // respond to sd and ed query string values
        require('./response_send_sded'),
 
        // end of line
        require('./response_send_fail')
 
    ]);
 
module.exports = function (options) {
 
    flyJS.set('path_db', options.path_db || 'db.json');
 
    return flyJS;
 
};
```

### 4.2 - json_fly_va/response_send_tab for sending tabulated totals

This is a part of the midddleware that allows for be to make querys where I can give a start date, a number of days, and a count of number of days to go back from the start date to give tabulated totals of users. So in other words if I want to go back 28 days from a start date, and break those 28 days down into 7 day chunks, and have a total for each 7 day chunk of that 28 day total this will come in handy.

```js
let _ = require('lodash');
 
// trying out new tabulation method
module.exports = function (req, res, next) {
 
    // must send tab bool is true, and a start date is given
    if (req.query.tab && req.query.sd) {
 
        let jRes = req.app.locals.jRes,
        sd = req.query.sd.split('/'), // start date
        days = Number(req.query.days) || 28, // number of days to tabulate
        count = req.query.count || 1, // number of times to go back a count of days.
        startDate = new Date('20' + sd[2], sd[0] - 1, sd[1]); // standard javaScript Date instance of sd
 
        // start by getting days
        req.db.get('days')
 
        // filter days that are not part of the desired time range
        .filter(function (day) {
 
            let thisDate = new Date(day.timeStamp),
            time = startDate - thisDate;
 
            // filter any days that come after sd
            if (thisDate.getTime() > startDate.getTime()) {
 
                return false;
 
            }
 
            // return true if it is a day that I want
            return day.date === req.query.sd || time < (days * 24 * 60 * 60 * 1000 * count);
 
        }).write().then(function (data) {
 
            // make sure we have a proper array
            if (data.length > days * count) {
 
                // drop any extra days.
                data = _.drop(data, data.length - days * count);
 
            }
 
            // chunk the data by days
            data = _.chunk(data, days);
 
            // tabulate totals
            let totals = [];
            data.forEach(function (dayArray) {
 
                let t = 0;
                dayArray.forEach(function (day) {
                    t += Number(day.users);
                });
 
                // push an object that contains the total, along with other relavent info
                totals.push({
                    userTotal: t,
                    sd: dayArray[0].date,
                    ed: dayArray[dayArray.length - 1].date,
                    days: dayArray
                });
 
            });
 
            // send the response.
            jRes.success = true;
            jRes.mess = 'tabulation from ' + req.query.sd + ' going back ' + days + ' days' + ' ' + count + ' times.';
            jRes.data = totals;
            res.json(jRes);
 
        }).catch (function (e) {
 
            // send an error response if something goes wrong.
            res.eMess = e.message;
            res.json(jRes);
 
        });
 
    } else {
 
        // continue on as the query string is no good.
        next();
 
    }
 
};
```

So then this kind of query...
```
http://localhost:8080/flyjson?sd=6/28/18&tab=true&days=7&count=2
```

... will give me this json.

```js
{
    "success": true,
    "mess": "tabulation from 6/28/18 going back 7 days 2 times.",
    "eMess": "",
    "data": [{
            "userTotal": 2876,
            "sd": "6/15/18",
            "ed": "6/21/18",
            "days": [{
                    "date": "6/15/18",
                    "users": "399",
                    "timeStamp": "2018-06-15T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/16/18",
                    "users": "175",
                    "timeStamp": "2018-06-16T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/17/18",
                    "users": "166",
                    "timeStamp": "2018-06-17T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/18/18",
                    "users": "524",
                    "timeStamp": "2018-06-18T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/19/18",
                    "users": "537",
                    "timeStamp": "2018-06-19T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/20/18",
                    "users": "535",
                    "timeStamp": "2018-06-20T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/21/18",
                    "users": "540",
                    "timeStamp": "2018-06-21T04:00:00.000Z",
                    "pages": []
                }
            ]
        }, {
            "userTotal": 2943,
            "sd": "6/22/18",
            "ed": "6/28/18",
            "days": [{
                    "date": "6/22/18",
                    "users": "454",
                    "timeStamp": "2018-06-22T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/23/18",
                    "users": "188",
                    "timeStamp": "2018-06-23T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/24/18",
                    "users": "175",
                    "timeStamp": "2018-06-24T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/25/18",
                    "users": "533",
                    "timeStamp": "2018-06-25T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/26/18",
                    "users": "554",
                    "timeStamp": "2018-06-26T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/27/18",
                    "users": "511",
                    "timeStamp": "2018-06-27T04:00:00.000Z",
                    "pages": []
                }, {
                    "date": "6/28/18",
                    "users": "528",
                    "timeStamp": "2018-06-28T04:00:00.000Z",
                    "pages": []
                }
            ]
        }
    ]
}
```

## 5 - The Public folder

This project features a public folder that is used to server certain static assets that I intend to use across different themes. So this folder contains a javaScript folder that contains things like jQuery that is of course used in my bootstrap powered theme in the themes folder, along with three.js, and additional front end code that will be used to provide a common frameworks of sorts when it comes to displaying the models, as well as of course the code that composes the models themselves, although I will go into detail about those in a later section.

## 6 - The themes folder

The themes folder as the name suggests is where I place my ejs templates when it comes to rendering a theme. As of this writing there is only one theme that is in use that is based on jQuery and bootstrap rather than the usual angular powered theme common in mean stack applications. At a later point I might make an angular powered theme, but for now I am happy with anything that just works, as this is not the bottom line of this project.

## 7 - The main app.js file

```js
let express = require('express'),
path = require('path'),
 
app = express();
 
// SETTINGS
app.set('port', 8080); // just set port 8080
app.set('theme', 'bootstrap'); // only one them for now so.
app.set('views', path.join(__dirname, 'themes', app.get('theme')));
app.set('view engine', 'ejs');
 
// STATIC PATHS
app.use('/js', express.static('public/js'));
app.use('/img', express.static('public/img'));
 
// theme statics
app.use('/theme/js', express.static(path.join(__dirname, 'themes', app.get('theme'), 'js')));
app.use('/theme/css', express.static(path.join(__dirname, 'themes', app.get('theme'), 'css')));
 
// using fly_json
app.use('/flyjson', require('./mw/json_fly_va')({
        path_db: path.join(__dirname, 'db', 'db.json')
    }));
 
// MAIN INDEX
app.get('/',
 
    require('./mw/get_pkg_json')(),
 
    function (req, res) {
 
    res.render('index', {
 
        layout: 'home',
        pkg: req.pkg
 
    });
 
});
 
// WORKS PATH
app.use('/works', require('./routes/works')({
        views: app.get('views'),
        dir_works: path.join(__dirname, 'public/js/visual_analytics/works')
    }));
 
// START LISTENING
app.listen(app.get('port'), () => {
 
    console.log('express_visual_analytics is up on port: ' + app.get('port'));
 
});
```

## 8 - Current lists of Models, or Works

## 9 - Conclusion