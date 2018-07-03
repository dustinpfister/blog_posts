---
title: Visualizing google analytics data with three.js
date: 2018-07-01 09:46:00
tags: [js,express,node.js,three.js]
layout: post
categories: express
id: 218
updated: 2018-07-03 16:17:16
version: 1.5
---

I have been [writing posts](/categories/express/) on [express.js](https://expressjs.com/), and am now at a point in which I am just making some projects based that include express.js. I have a post on a basic express todo app, a middleware that responds to requests with json, and now the project that I am going to write about in this post that has to do with using three.js to visualizing my google analytics data that I am just calling [express_visual_analytics](https://github.com/dustinpfister/express_visual_analytics). I think one of the best ways to learn something a little complicated, is to just start building something interesting with it, and learn as I go. That has been the case with this project, and as such it only makes sense that I write about it.

<!-- more -->


## 1 - what to know before

This is a post on [a project](https://github.com/dustinpfister/express_visual_analytics) that I have made using express.js that involves visualizing google analytics data using three.js. It is not a getting started post on express.js, three.js, google analytics, node.js, or javaScript in general. I assume that you have a background in at least most of these things. If interested you might want to check out my [main post on express](/2018/06/12/express/) if you are new to express.


## 1.1 - This is a work in progress

When I am writing this I am working on version 0.1.x of this project, and it may never be a done deal.

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

### 3.1 - csv importing thanks to csvtojson

The procress of importing csv was not as time consuming as it would have been if I had not used [csvtojson](https://www.npmjs.com/package/csvtojson), which is a great tool for doing as the name implies. If interested in learning more about that I [have a post](/2018/02/12/nodejs-csv-to-json/) on csvtojson.


## 4 - json_fly_va middle ware
