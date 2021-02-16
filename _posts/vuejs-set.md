---
title: vue set for setting reactive properties in vuejs
date: 2019-05-08 20:46:00
tags: [vuejs]
layout: post
categories: vuejs
id: 438
updated: 2021-02-16 17:23:34
version: 1.10
---

The [vue set](https://vuejs.org/v2/api/#Vue-set) global api method in vuejs can be used to set a property of a reactive object. In other words it is a way to add a property to an object in the data of a Vue constructor instance, and have the view update when a change happens to that property. Many times this should happen automatically, but in some cases it might not when it comes to nested objects.

The thing about this is that many frameworks have a method like this, because sometimes you can not just simply add a property to an object, or doing so is not a good idea at times. Sometimes some additional things need to happen on top of just simply setting a properly of an object, such as setting up something to watch that property of changes, and then do something when a change occurs.

<!-- more -->

## 1 - vue set example

For a quick example of vue set, I put something together that makes use of a property in the data object but only if it is there. So in the example there is a root property in the data option object that is also an object, this is impotent because there is no way to add root properties to the data object with vue set. However vue set can be used to add properties to an object that is nested in the data object.

```html
<html>
  <head>
    <title>vue set example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  
  <p id="foo">{{ u.mess ? u.mess : 'no mess' }}</p>

  <script>
  var vm = new Vue({
    el:'#foo',
    data: {
    u:{}
    }
  });
  
  // set mess property and trigger update of the view
  Vue.set(vm.u,'mess', 'bar')
  
  </script>
  </body>
</html>
```

When I use the vue set method to set the value of the mess property of the u object in the data object the message bar is displayed as expected. If I where to just add the property directly the message will not display, because it is not reactive. This is the whole reason why there is the vue set method in the global api of vuejs, it is a way to add properties to a reactive object after the fact.

### 1.1 - Using force update as an alternative to making properties reactive

Another option is to use the vue force update method to force the vue to render again. This is a way to manually render the view again rather than have it update each time a value chances. With some projects I might want to have things work that way where the view does not always update each time I change a value in the state, but for the most part I would want that to happen.

```js
  var vm = new Vue({
    el:'#foo',
    data: {
    u:{}
    }
  });
  
  // force update can be used as an alternative
  // to making a property reactive
  vm.$data.u.mess = 'bar';
  vm.$forceUpdate();
```

In any case those are the two options make the property reactive if it is not to begin with, or use the force update method now and then where needed to render the view again when doing so is called for.

## 2 - A word on setters

The vue set method works by making use of a native javaScript feature known as a setter. There is also another native feature in javaScript called a getter also. If you are not familor with getters and setters in native javaScript it might be a good idea to play around with a few simple examples of these native javaScript features in order to get a better idea of how live objects work in vuejs.

```js

var app = {
    set n(val){
        this.container.innerText = val;
    },
    container: document.getElementById('foo')
};
 
setInterval(function(){
    app.n = Math.floor( Math.random() * 6 );
},1000);
```

## 3 - Conclusion

So that is it for now when it omes to the vue set method.
