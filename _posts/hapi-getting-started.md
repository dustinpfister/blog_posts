---
title: Getting started with full stack development with the hapi framework.
date: 2017-09-28 17:15:00
tags: [js,node.js,hapi]
layout: post
categories: hapi
id: 47
updated: 2019-06-25 15:35:46
version: 1.5
---

I did some reading on the [hapi framework](https://hapijs.com/) for quickly making full stack applications. From what I have gathered it is a little more full featured out of the box compared to [express](https://expressjs.com/), so I thought I would give it a try. As such this will be a sort of getting started, and first impressions kind of post. When I first wrote this post I was using hapi 16.x which it would seem is still being supported in 2019, as I can see the occasional bug fix and so forth in the github repo of the project.


<!-- more -->

## 1 - Getting started with hapi 17.x

Most of the documentation including the official documentation with hapi as of this writing at least is on hapi 17.x. In this section I will be covering a very basic hello world example for hapi 17.x.

```js
let Hapi = require('@hapi/hapi');
let init = async () => {
    let server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });
    server.route({
        method: 'GET',
        path:'/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();
```

## 2 - Getting started with hapi js 16.x

First off this version of hapi is now more or less deprecated, it looks like there is still some support going on, but if you are looking to start a new project with hapi js it might be best to start with hapi 17.x. Still I will leave this section up for the hell of it.

As with starting any node project I start my making a test folder that will contain a package.json file, a .gitignore file, and all the other files that will compose the test project.

```js
$ git init
$ npm init
$ npm install hapi@16.7.0 --save
```

In this post I will keep things simple, and just start with a very simple hello world project. So I just need to have hapi itself installed for now.

### 2.1 - The server.js file

Now that I have hapi installed in my projects folders node_modules folder I will want to have a server.js file which I will start from the command line. For me it looks like this:

```js
var Hapi = require('hapi');
 
// create a new instance of hapi server
var server = new Hapi.Server();
 
// port 3000, and I will be using localhost
// when running I will connect via http://localhost:3000
server.connection({ port: 3000, host: 'localhost' });
 
// just one route for now
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
 
        reply('hapi! hapi! hapi!...joy! joy! joy!');
    }
});
 
// start the server
server.start(function(){
 
    console.log('hapi server up!');
 
});
```

Now I just start the server from the command line, and open localhost:3000 in my browser and it looks like I might just be starting out with something great.

```
$ node server
```

So there is a great deal more to cover, such as how to start up a simple static server, and how to handle some posts rather than just a get request. But so far I am loving hapi, and not just because of the name. Glancing over the [api docs](https://hapijs.com/api) on the site, it looks like it is a whole world richer than the more minimalist express framework.

## 3 - conclusion

So this is just my getting started post for what will be a line of posts on hapi, because this is the kind of thing that you do not just write one post about. Looks like I will be writing a whole lot on this one because there is a great deal to cover on it. I will hack over this post as more content comes along.