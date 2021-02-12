---
title: Creating a vue get method via plug-ins
date: 2019-11-13 10:13:00
tags: [vuejs]
layout: post
categories: vuejs
id: 562
updated: 2021-02-12 12:10:35
version: 1.10
---

There is a vue set global method in vuejs, but it is not what one might think compared to other frameworks. The vue set method is used to set reactive properties to an object, so there is not vue get global method, and no set or get method of any kind when it comes to Vue class instance methods. 

What a get method typically does can change from one framework to another, in express.js for example the get method can be used to set up what to do for incoming get requests, or to get an application setting value depending on how the method is used. In other frameworks the get method might be how to go about getting a DOM element reference, or a value in a data object. In vuejs however it is more up to me how I want to go about creating a get method and thus define what it is the the get method does.

So if I want a vue get method I need to add one via a plugin, and maybe this is best actually. One reason why is because a [vue get](https://vuejs.org/v2/guide/computed.html) method could be one of many things, the name is vague after all. A vue get method could be an instance method actually that gets an object key in the vue data object, and element in the template, or it cold be a very simple http client that just makes get requests. With that said I might want to make my own vue get method one, or maybe even all of those things depending on the nature of the project.

<!-- more -->

## 1 - vue get method that gets vue data object properties like the lodash \_.get method

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

Seems to work okay when it comes to properties that are separated by periods, but I did not take the time to support the array syntax that the lodash \_.get method supports. In any case I am not sure that I would want to have a vue get method like this in most projects anyway, there are other ways to get references to nested objects that I am willing to except that make this whole vue get method example more or less pointless. So with that said lets look at some other ways I could go about making a vue get method.

## 2 - vue get method that gets template elements

So then there is getting some value in the vue data object, and then there is getting a reference to a DOM element in the template of a vue instance. I guess that could be another vue get method of sorts right. Well such a method could just be an abstraction for the vue el instance property. So this kind of vue get method plug-in would be very simple in that case.

```js
<html>
  <head>
    <title>vue get example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
    // a simple vue.$get plug-in that is just an abstraction
    // for vue.$el.querySelectorAll
    var vueGet = {
        install : function(Vue){
            Vue.prototype.$get = function(what){
                return this.$el.querySelectorAll(what);
            };
        }
    };
    // using it to get a collection of elements
    Vue.use(vueGet);
    var app = new Vue({
        el: '#demo',
        template:'<div><div class="mess">Hello World</div><div class="mess">Hello Mars</div></div>'
    });
    var mess = app.$get('.mess');
    console.log(mess[0].innerText); // 'Hello World'
    console.log(mess[1].innerText); // 'Hello Mars'
  
  </script>
  </body>
</html>
```

So far these vue get method examples are just very complex additions to do something that I can all ready do without it. Still maybe there is a way to go about making a vue get method that really does bring something that I can nit just do right out of the gate with vuejs by itself. One thing that comes to mind is a simple http client that just makes get requests, now that might be something sense vue does not have any http client built in, so lets look into that as an option.

## 3 - A vue get method that is a simple http client that just makes you guessed it get requests.

So now for a vue get method that makes http get requests. One might think that an http client should be built into vuejs itself like with other frameworks like angular. I am not so sure if that is a good idea though, I like that with vuejs the framework is left in a somewhat more minimal state. One reason why is that in some projects I might not want or need an html client at all, and with other projects I might want an http client, but I only really need it to make get requests.

```js
var vueGet = {
    install: function (Vue) {
        Vue.prototype.$get = function (url, cb) {
            url = url || '/';
            cb = cb || function () {};
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    cb.call(xhr, null, this.response, xhr);
                }
                if (this.readyState === 4 && this.status === !200) {
                    cb.call(xhr, new Error('non 200 status'), this.response, xhr);
                };
            }
            xhr.send();
            return xhr;
        };
    }
};
// using it to get a collection of elements
Vue.use(vueGet);
new Vue({
    el: '#demo',
    template: '<textarea cols="120" rows="30">{{ html }}</textarea>',
    data: {
        html: ''
    },
    mounted: function () {
        var app = this;
        app.$get('https://dustinpfister.github.io/', function (err, html, xhr) {
            if (err) {
                app.$data.html = '<p>Error getting HTML</p>'
            } else {
                app.$data.html = html;
            }
        });
    }
});
```

There are all kinds of additional features I could add to this kind of vue get method plug-in of course. It would be nice that it would return promises rather than just using the old call back only syntax. That is the thing about http clients though, there are a lot of theme out there and it is something that I can never seem to get just right.

Still depending on the project a http client that is not all that different from this might work just fine. I want to just make get requests and I would like for the http client to work on a wide range of browsers, so some simple solution that makes use of XMLHttpRequest might work just fine in that case.

## 4 - Conclusion

So there is no vue get method built into vuejs, well of course there is not. It is up to you the developer to make that method whatever you want it to be. Having a simple get method can be so many different things, I have not even scratched the surface of what it could be.

Say I am making a game that involves the use of a gird, in that case maybe I want the vue get method to get a cell reference in that grid. 

Also maybe I would like to have a vue get method that is actually more than feature pack together into one package. That is the case with frameworks like express after all. The get method in express can be used to get an app setting, but it can also be used to define what middleware should fire for incoming get requests for a certain url pattern to a website.

So vue get can be what you want it to be, or depending on the project, what you need it to be.