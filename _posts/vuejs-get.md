---
title: Creating a vue get method via plug-ins
date: 2019-11-13 10:13:00
tags: [vuejs]
layout: post
categories: vuejs
id: 562
updated: 2019-11-13 11:16:16
version: 1.2
---

There is a vue set global method in vuejs, but it is not what one might think compared to other frameworks. The vue set method is used to set reactive properties to an object, so there is not vue get global method, and no set or get method of any kind when it comes to Vue class instance methods.

So if I want a vue get method I need to add one via a plugin, and maybe this is best actually. One reason why is because a [vue get](https://vuejs.org/v2/guide/computed.html) method could be one of many things, the name is vague after all. A vue get method could be an instance method actually that gets an object key in the vue data object, and element in the template, or it cold be a very simple http client that just makes get requests. With that said I might want to make my own vue get method one, or maybe even all of those things depending on the nature of the project.

<!-- more -->

## 1 - vue get data props method like lodash \_.get

I have wrote a lot of posts on lodash, more than I care to mention. In lodash there is the [\_.get](/2018/09/24/lodash_get) method of that utility library that can be used to get object properties by way of a string of key names separated by periods. This is just one of many possible things a generic get method can do, and I have to start somewhere so lets start off with this one.

If I want to have a vue get method that works in a similar way to that of lodash \_.get then I might create a plug-in that looks like this maybe:

```hml
<html>
  <head>
    <title>vue get example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
// get a data object prop
var vueGet = (function () {
 
    // get by path
    var getPath = function (obj, path) {
        var keys = path.split('.'),
        i = 0,
        len = keys.length,
        ref = obj;
        while (i < len) {
            ref = ref[keys[i]];
            if (i === len - 1) {
                return ref;
            }
            i += 1;
        }
        return false;
    };
    // return the public plug-in object
    return {
        install: function (Vue) {
            Vue.prototype.$get = function (path, obj) {
                if (path === undefined) {
                    return this.$data;
                }
                return getPath(obj || this.$data, path)
            };
        }
    }
}
    ());
// using it
Vue.use(vueGet);
var app = new Vue({
        el: '#demo',
        template: '<div>a: {{ a }}; b: {{ b }}; e: {{ c.d.e }}; f: {{ f }}</div>',
        data: {
            a: 5,
            b: 7,
            c:{
              d:{
                e: 40
              }
            },
            f:0
        },
        mounted: function () {
            // I can use it like this
            this.$get().a = this.$get('a') + 5;
            // so that now vue get is just an abstraction for this
            this.$data.b = this.$data.b + 5
            // but I can also get by path just like with lodash _.get
            this.$get().f = this.$get('c.d.e') + 2;
        }
    });
  </script>
  </body>
</html>
```
