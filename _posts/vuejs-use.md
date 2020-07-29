---
title: vue use method for using and making vuejs plugins
date: 2019-05-13 11:43:00
tags: [vuejs]
layout: post
categories: vuejs
id: 443
updated: 2020-07-29 11:29:46
version: 1.10
---

So the [vue use](https://vuejs.org/v2/api/#Vue-use) global api method in vue.js is there to use plugins designed for vue.js. Vue.js can do a lot by itself, but chances are you are going to want to use at at least a few plugins as late versions of the framework even miss things like an http client. It seems like vue.js is following a more minimal approach with its design, pulling many features out of the framework itself, and leaving it up to the developer how to go about adding that feature.

<!-- more -->

## 1 - Vue use basic plugin example

In order to use the vue use method there first needs to be a plugin to use with the method. This is typically something that will be stored in an external javaScript file and declare a global variable. That global variable should be an Object, and this object should at a minimum have an install property. The install property should be a function, and this function will receive Vue and an optional options object as arguments. Inside the body of this install function the plugin will append any instance methods, directives, and so forth that ads functionality to vuejs.

Here I have a very basic example of a vuejs plugin that can be used with the vue use global method. This plugin just adds a single vue instance method that just returns a string when called.

```js
var basic ={
    // a Vue.js plug in must have an install property
    // that is a function. Vue and an optional options
    // object will be passed
    install: function (Vue, opt){
        // can define instance methods this way
        Vue.prototype.$foo = function (){
            return 'foobar';
        }
    }
};

```

When we have a plugin then it is just a matter of including the plug in in a page with a script tag. When the plugin is available in can the be added to vue by just calling the vue use method and passing the object that has the install function in it to as the first argument. 

```html
<html>
  <head>
    <title>vue use example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <h1 id="bar">{{mess}}</h1>
  <script src="./plugin_basic.js"></script>
  <script>
  
  // use the basic plugin
  Vue.use(basic);
  
  var vm = new Vue({
    el:'#bar',
    data: {
      mess: 'bar'
    }
  });
  
  vm.mess = vm.$foo();
  
  
  </script>
  </body>
</html>
```

Once the plugin is installed I can then use that instance method that it added to the Vue class prototype. So then this is just a silly basic hello world example, but lets look at some more examples that actually do something useful.

## 2 - Simple http get request example

One of the features that is not built into vuejs at least when it comes to late 2.x versions is an http client. In this section I will be showing how to make a quick simple http client that just makes get requests using [XMLHttpRequest](/2018/03/28/js-xmlhttprequest/).

```js
// Simple http get request client for vuejs
var httpGet = (function (){
    var api = {
        get: function (opt) {
            opt = opt || {};
            opt.url = opt.url || '/';
            opt.beforeSend = opt.beforeSend || function (xhr) {};
            opt.onDone = opt.onDone || function (res) {
                console.log(res);
            }
            opt.onError = opt.onError || function () {
                console.log(this);
            }
            var xhr = new XMLHttpRequest();
            xhr.open('GET', opt.url);
            opt.beforeSend.call(this, xhr);
            xhr.onreadystatechange = function (){
                if (this.readyState === 4 && this.status === 200){
                    opt.onDone.call(this, this.response);
                }
                if (this.readyState === 4 && this.status === !200){
                    opt.onError.call(this, this);
                };
            }
            xhr.send();
        }
    };
 
    // must have an install method for Vue.use
    api.install = function (Vue, opt){
        Vue.prototype.$httpGet = function (getOpt) {
            api.get(getOpt);
        }
    };
 
    return api;
 
}
    ());
```

This results in a simple javaScript module that if I want to I can use with just plain old vanillajavaScript by itself to make get requests. However it also of course has an install method that adds an $httpGetVue class prototype instance method to Vue when used with the vue use global api method of Vue.

So then I can use it to add a method to Vue that can be used to make simple get requests.

```html
<html>
  <head>
    <title>vue use example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <code id="bar">{{mess}}</code>
  <script src="./plugin_http_get.js"></script>
  <script>
  
  Vue.use(httpGet);
  
  var vm = new Vue({
    el:'#bar',
    data: {
      mess: 'bar'
    }
  });
  
  vm.$httpGet({
  
    url:'/',
    onDone: function(res){
      console.log(res);
      vm.mess = res;
    }
  
  })
  
  
  </script>
  </body>
</html>
```

Of course when it comes to writing this kind of module there are all kinds of things that can be added to it, such as adding support for more than just get requests, making use of promises rather than callbacks and so forth. It might make better sense to just use an http client that is all ready written, rather than making your own. However the idea here is that an http client is something that should maybe not be baled into a font end framework. 

In some projects a simple client like this that just makes get requests might work okay, in other projects maybe not, in any case it is up to you how to go about adding this functionality to a project that involves the use of vuejs in the client system of the project.