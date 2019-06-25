---
title: Plugins in hapi js
date: 2019-06-25 10:20:00
tags: [hapi]
layout: post
categories: hapi
id: 489
updated: 2019-06-25 10:52:56
version: 1.5
---

In this post I will be going over some [hapi js plugin](https://hapijs.com/tutorials/plugins?lang=en_US) examples. A plugin in hapi like most other frameworks is just an object that is formated a certain way. There just needs to be a register property and a name at a minimum, but there are a few more properties that are also of concern.

<!-- more -->

## 1 - Basic Hapi plugin example

In this section I will be going over some very basic hello world style plugin examples, it is also worth noting that in this section I am using hapi 17.9.0, in older and newer versions of hapi these code examples might break.

So a very basic hapi plugin example can just be an object. This way of using plugins can be used as a good starting point when it comes to the process of breaking things down into smaller more manageable, and reusable blocks of code.

The object must have a register property and a name property. The name can just be a string, and the register must be a async function that will do whatever needs to happen for the plugin, such as setting up a path which will be what is going on in this plugin.

```js
let Hapi = require('@hapi/hapi');
 
let pluginRoot = {
    name: 'pluginRoot',
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

### 1.1 - Same basic example as external js

```js
exports.pluginRoot = {
    name: 'pluginRoot',
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
```

```js
let Hapi = require('@hapi/hapi');
let init = async() => {
    let server = Hapi.server({port: 3000,host: 'localhost'});
    await server.register({
        plugin: require('./module').pluginRoot,
        options: {
            mess: 'foobar'
        }
    });
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();
```