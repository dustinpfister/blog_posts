---
title: Heroku node.js hello world example
date: 2018-01-26 17:48:00
tags: [heroku, node.js]
layout: post
categories: heroku
id: 136
updated: 2018-01-26 18:33:41
version: 1.0
---

I have heard a lot of great things about heroku when it comes to hosting a node.js project, so I thought I would check them out. I would like to get into writing full stack applications more, and have them up an running on the web. Whats great about heroku is that i have found it easy to use, and has a great free plain, if you are like me and just starting out with hobby apps.

<!-- more -->

## First things first, install what you need, and set up an account.

First you will want to make sure you have the following installed:

* node.js, and npm
* The heroku CLI tool
* git

Then of course you will want to set up a heroku account. At which point you should be ready to start making a node.js app that can be deployed to heroku.

## Create the node.js app

When it comes to making a node.js project, that can be done more or less like normal, but make sure that you are grabbing at the port that heroku uses via an environment variable that can be obtained via process.env in a javaScript file. Make sure that you are using that port when starting the server.

I mean something like this:
```
let port = process.env.PORT || process.argv[2] || 8080;
```

With my hello world app I started by making a folder.

```
$ mkdir heroku_hello_world
$ cd heroku_hello_world
```

Then I put together this index.js at root.

```js
// using the http module
let http = require('http'),
 
// look for PORT environment variable, 
// else look for CLI argument,
// else use hard coded value for port 8080
port = process.env.PORT || process.argv[2] || 8080;
 
// create a simple server
let server = http.createServer(function (req, res) {
 
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.write('hello heroku!', 'utf-8');
        res.end();
 
    });
 
// listen on the port
server.listen(port, function () {
 
    console.log('app up on port: ' + port);
 
});
```

The most important thing here is to get the port that is used by herokus severs, that can be accessed by an environment variable. Here I am checking for it via process.env first, and that should work. The process.argv[2] || 8080 deal is more for working locally.

## package.json

Like any node.js project, the app should have a package.json. Regardless if you want the app to run when deployed, the project will need one. So have a package.json file at the root name space that points to the javaScript file that you want to run when starting the app. At a minimum it should at least do that, along with the other required key value pares in the json.

```
# npm init
```

In my running hello world app the package.json looks like this:

```js
{
  "name": "heroku_hello_world",
  "version": "1.0.0",
  "main": "index.js",
  "engines": {
    "node": "8.9.3"
  },
  "description": "My first heroku app!",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Dustin Pfister",
  "license": "GPL-3.0"
}
```

With package.json files the name, and version are always required. In order for the app to run it will also need the main property that points to my index.js file. It is also a good idea to declare the version of node that is being used, but as far as I know it is not required.

## Make the folder a new git folder

Make the project a git folder, and make the first commit. Heroku uses git as the source control system, and it should be a git folder before deploying.

```
$ git init
$ git add *
$ git commit -m "first commit"
```

## Some more things to consider

There are some more files that may not be required, but you should still know about them, as they might become more important when making a more complex project.

### The Procfile

You might want to add some additonal files such as the Procfile, This file should generate when deploying, but you might want to have a copy in the root name space to have better control, mine looks like this for this project:

```
web: node index.js
```

As you might gather this is what is really used to start the app. When deploying it can be found out by looking at the package.json, but if for some reason you want more control you can have a copy in root and it will be used.

### .env file

The env file can be used to set environment variables including things like api keys. Of course it goes without saying that anything that is sensitive should not be pushed to any public repo.

### .gitignore

I often use a .gitignore file in my projects to at least hide the node_modules folder, in this project I am not using any npm packages, so it is not needed.

## Create the heroku app, and deploy

Now use the heroku CLI tool to make the app on heroku, and deploy it. First log in, and then use the create option followed by a name that you want the project to be known by on heroku.

```
$ heroku login
$ heroku create dp83-hello-world
$ git push heroku master
```

If all goes well the project should now be live at [https://dp83-hello-world.herokuapp.com/](https://dp83-hello-world.herokuapp.com/)


## Conclusion

I really like heroku so far, it seems like it is fairly easy to make and deploy node.js apps with heroku. I will be making this a series of posts on my site here, as this seems like something great to get into, if you have not done so before.