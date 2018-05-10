---
title: Simple node.js database solution based off lodash called lowdb.
date: 2017-12-28 22:07:00
tags: [js,node.js,lodash]
layout: post
categories: node.js
id: 123
updated: 2018-01-02 13:56:29
version: 1.4
---

When it comes to database solutions that are popular in a node.js environment the first project that comes to mind is of course mongoDB. I am no database expert, it strikes me as a decent solution, but it might not be the best tool for the job with simple projects. Also It complicates the process of deployment, and setup as another application besides node needs to be installed. Thats why a simpler solution like [lowdb](https://www.npmjs.com/package/lowdb) is sometimes what a project calls for.

<!-- more -->

## getting started with lowdb

I assume you have a working knowledge of javaScript, node.js, and git. IF not sorry that is outside the scope of this post, and maybe even this site. 

My procedure for setting up a test project goes like this:

```
$ mkdir test_lowdb
$ cd test_lowdb
$ git init
$ npm init
$ npm install lowdb --save
```

I often uses git as a means of source control, and publish my test projects to my github account now. Also if you do not know by now using the --save option when calling npm install will add it to the package.json file of a node.js project.

Now that I have a test folder I can start writing a few demos using this project, lets start with the usual basic one.

## Basic lowdb hello world example

In my basic example I just wanted to see how easy it is to make a json file from a single object, and it is pretty easy. Still in order to use lowdb I need not just a reference to the module itself, but also an adapter for reading and writing to the json file. Luck for me one is included that seems to work just fine.

```js
let low = require('lowdb'),
FileSync = require('lowdb/adapters/FileSync'),
adapter = new FileSync('db.json'),
 
db = low(adapter);
 
// set defaults for the db
db.defaults({
    earnings: []
}).write();
 
// something to add to the db
let today = {
    date: '2017-12-27',
    cash: 87.50,
    unit: 'USD'
};
 
// push and write to the db
db.get('earnings').push(today).write();
```

I will want to always set, and write some defaults for the database. The defaults will make sure that whatever I am grabbing at later will be there in some form, even if it is just an empty array. This is also a way of defining what the collections will be to be used with methods like the db.get method used in the example.

The above example gives me the following db.json file
```js
{
  "earnings": [
    {
      "date": "2017-12-27",
      "cash": 87.5,
      "unit": "USD"
    }
  ]
}
```

## Find something in a database

This project is powered by lodash a subject that I have [wrote a few posts on](/categories/lodash/) including [the find method in lodash](/2017/09/14/lodash-find/). The same method is used in lowdb to find an object in a collection, so if you are comfortable with \_.find then getting an object in a collection should be pretty easy for you.

```js
let low = require('lowdb'),
FileSync = require('lowdb/adapters/FileSync'),
adapter = new FileSync('find.json'),
 
db = low(adapter);
 
// set defaults for the db
db.defaults({
    users: []
}).write();
 
let users = db.get('users');
 
// add one user if we have none
if (users.value().length === 0) {
 
    let userNames = ['jerry', 'mongo', 'elvis']
 
    userNames.forEach(function (name,i) {
 
        // call him jerry
        users.push({
 
            name: name,
            lastOn: new Date(),
            visits: 0
 
        }).write();
 
    });
 
}
 
console.log( db.get('users').find({name:'mongo'}).value() );
```

## Update something

I should at least also cover a basic example of how to update an object in a collection in lowdb. It just involves using find, and assign, then finishing with write like so:

```js
let low = require('lowdb'),
FileSync = require('lowdb/adapters/FileSync'),
adapter = new FileSync('update.json'),
 
db = low(adapter);
 
// set defaults for the db
db.defaults({
    users: []
}).write();
 
let users = db.get('users');
 
// add one user if we have none
if (users.value().length === 0) {
 
    // call him jerry
    users.push({
 
        name: 'jerry',
        lastOn: new Date(),
        visits: 0
 
    }).write();
 
}
 
// find  and update jerry
let jerry = db.get('users').find({name:'jerry'});
let visits = jerry.value().visits;
 
jerry.assign({visits:visits += 1,lastOn : new Date()}).write();
 
console.log( jerry.value() );
```

This demo should write a single object to the collection users if it is empty, and every time get and update the single record with a count, and date.

## Do not forget to call .value()

When getting a collection or a query for something I need to call value otherwise I am not going to get what I might expect.

## Conclusion

This project seems to be just what it was that I was looking for when it comes to a simple, easy to use database solution. I will be using this in a pet project of mine, as such I may be writing about this a great deal more in the future, for now hopefully this post still provides at least some value. In the mean time the [readme](https://www.npmjs.com/package/lowdb) on lowdb helps explain the basics more as well.