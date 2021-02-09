---
title: vue before create lifecycle hook
date: 2019-05-26 12:26:00
tags: [vuejs]
layout: post
categories: vuejs
id: 460
updated: 2021-02-09 09:16:15
version: 1.6
---

The [vue before create](https://vuejs.org/v2/api/#beforeCreate) lifecycle hook is the first of many hooks that fire throughout the lifecycle of a vuejs instance. It is in this hook that I would go about doing anything that I might want to happen before the data object is created in for a vuejs instance, and it is also the very first hook that fires in the lifecycle process of a vuejs class instance. After the before create hook there is the create hook, then the mounted hook, along with a few others such as the update hook.

<!-- more -->

## 1 - Vue before create basic example

The vue create hook is the very first hook that fires, just before the created hook that will come after. Both the before create, and created hooks will fire synchronously so anything that might involve heavy lifting that is not delayed somehow, might cause this to hang a bot as a result.

In the body of the before create method the vue data object will be undefined, as this is not available until the created hook fires.

So here is some javaScript of a basic vue before create hook example in vuejs
```js
new Vue({
    el: '#demo-lifecycle-before-create',
    template: '<p>n: {{ n }}</p>',
    data: {
        n: 42
    },
    beforeCreate: function () {
        // the data object is not yet created
        console.log(this.$data); // undefined
    },
    created: function () {
        // the data object is not created
        console.log(this.$data.n); // 42
    }
});
```

And some hard coded html

```html
<html>
  <head>
    <title>vue before create lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo-lifecycle-before-create"></div>
  <script src="basic.js"></script>
  </body>
</html>
```

So this is a hook that I do not think I would use often, because there is not much to work with at this point, still if for some reason I want to do something before the data object of the vue class instance is even created for whatever the reason this is one way to go about doing just that.

## 2 - Hard coded object vue before create example

So here is another example that comes to mind. Although there is not much that can be done during the before create hook of the vue lifecycle, one thing that can be done is to append a plain old object to the vue instance.

So in this example I am creating a hard coded data object for the vue instance in the before create hook. The thing about the vue data object is that it contains the current state of a vuejs project model, but not any kind f hard coded initial state. So maybe the before Create hook would be a good place to create such an object, maybe not, In any case that is what I am doing here.

```js
new Vue({
    el: '#demo-lifecycle-before-create',
    template: '<div><span>n:{{ n }} </span><br><span> mess: {{ mess }}</span></div>',
    data: {
        n: null,
        mess: ''
    },
    // default create hook
    beforeCreate: ()=> {
        // define hard coded data object
        this.hardData = {
            n: 21,
            mess: 'hard coded data is used'
        };
    },
    // create hook
    created: function () {
        var self = this;
        // fetch data
        fetch('/data')
        .then((res)=> {
            return res.json();
        })
        .then((data)=> {
            // if all goes well use that
            self.$data.n = data.n;
            self.$data.mess = 'Got data from back end';
        })
        .catch ((e)=> {
            // else use hard data
            self.$data.n = self.hardData.n;
            self.$data.mess = self.hardData.mess + ' : ' + e.message;
        });
    }
});
```

## 3 - Conclusion

I can not say that I use the before create hook that often when working out actual projects thus far. Most of the time I am just using the created, mounted, and updated hooks. Still I am sure there will be times now and then where I will want to use this before create hook now and then when doing so is called for. If I do end up with some real life examples of the before create hook I will be sure to update this post with that example. In any case this hook might be a good starting point whenit comes to just learning about vuejs life cycle hooks for the first time, it is the first in line when it comes to a linear progression for sorts with this it would seem.

