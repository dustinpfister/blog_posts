---
title: plugins in hapi js
date: 2019-06-25 10:20:00
tags: [hapi]
layout: post
categories: hapi
id: 489
updated: 2019-06-25 10:30:56
version: 1.0
---

In this post I will be going over some hapi js plugins examples.

<!-- more -->

## 1 - Basic Hapi plugin example

```js
let Hapi = require('@hapi/hapi');
 
let pluginRoot = {
    name: 'myPlugin',
    version: '1.0.0',
    register: async function (server, options) {
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, h) {

                return 'hello world this is ' + options.mess;
            }
        });
    }
};
 
let init = async() => {
    let server = Hapi.server({
            port: 3000,
            host: 'localhost'
        });
    await server.register({
        plugin: pluginRoot,
        options: {
            mess: 'foobar'
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
```