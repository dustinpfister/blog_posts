---
title: Setting up a view in hapi js
date: 2019-06-24 11:46:00
tags: [hapi]
layout: post
categories: hapi
id: 487
updated: 2019-06-25 10:30:57
version: 1.9
---

So when starting out with hapi js one of the first things that comes up is how to go about setting up a client system, serve static assets, and provide a view. A view can be set up by just hosting static assets, but what about server side, on demand rending with templates? In this post I will be going over how to get started with a view in hapi js.

<!-- more -->

## 1 - hapi view and what to know before hand.

To set up a view more dependencies need to be installed into a project beyond just hapi itself. Of course the layout engine of choice needs to be installed, but also an additional plug in as well at least in hapi 17.x.

## 2 - Setting up a view in hapi 17.x

In this section I am using hapi 17.9.0 which differs significantly from older versions of hapi, in older, and possibly newer major releases of hapi the code example here might break.

So I set up a project folder for this example and I am using the following dependences and version of hapi.

```
$ mkdir view-pug
$ cd view-pug
$ npm init
$ npm install @hapi/hapi@17.9.0 --save
$ npm install @hapi/vision@5.2.2 --save
$ npm install pug@2.0.4 --save
```

I then have a main index.js file that looks like this:

```js
let Hapi = require('@hapi/hapi');
let init = async() => {
    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
    await server.register(require('@hapi/vision'));
    // set up pug as a view engine
    server.views({
        engines: {
            pug: require('pug')
        },
        relativeTo: __dirname,
        path: 'views'
    });
    // use pug
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.view('index.pug');
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
```

And a index.pug file in the views folder.

```
doctype html
html(lang="en")
  head
    title This is Pug
  body
    h1 Hello World Pug Style
    p So Pug can be used as a way to make templates for Hapi js projects
```

### 2.1 - Using locals

So then there is also a desire to use local variables for the template in most cases. For that just pass an object that contains the locals that are to be used in the template when calling the view method in the response toolkit.

```js
    // use pug
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.view('index.pug', {mess:'foobar'});
        }
    });
```

So the the local variable can be used in the template.

```
doctype html
html(lang="en")
  head
    title Using locals
  body
    h1 
      | So this is all 
      span= mess
```