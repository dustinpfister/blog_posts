---
title: vue observable
date: 2020-10-05 10:01:00
tags: [vuejs]
layout: post
categories: vuejs
id: 716
updated: 2021-02-28 09:41:08
version: 1.16
---

When making a vuejs project there might end up being situations in which I might want to make an object observable, or reactive. When it comes to making a [vue data object](/2019/05/18/vuejs-data/) such an object is observable to begin with at least when it comes to the top level of the object. However this might not always end up being the case when it comes to nested objects in the data object, and it is also not the case when it comes to an object that is outside of a vuejs instance compleatly.

In some situations I might have to do something to make sure that nested objects in the data object become observable when I add them to the data object. When it comes to those kinds of situations I might want to go with the [vue set](/2019/05/08/vuejs-set/) method. However what if I want to make a plain old object outside of a vuejs instance completely observable? Well one way is the use the [vue observable](https://vuejs.org/v2/api/#Vue-observable) Global API method.

So this will be a quick post on using the vue observable global API method, and in the process of doing so I guess I will end up touching base the the subject of [reactivity using vuejs](https://vuejs.org/v2/guide/reactivity.html) also. There is also taking a moment to get into the vanilla javaScript feature that is used to make reactive objects possible when it comes to understanding getters and setters in plain old javaScript by itself.

<!-- more -->

## 1 - Basic vuejs observable example

In this section I will be going over a basic example of the vue observable global API method. This example involves using the [vue render](/2019/05/12/vuejs-render/) option as a way to create and update a vue rather than a simple [vue template](/2019/05/07/vuejs-template/). If you are not familiar with creating a render method let alone a static template in vuejs then you will want to brush up on that before hand.

So say I have a state object that is just a plain old object outside of a vuejs instance, and it is this object that I am using as a state for the project rater than the vue data object. If I do not make this state object observable then the vue will not just update each time a change is made to the object. However this can easily be fixed by just calling the Vue.observable method and passing the state object as the first argument for this method. Now when I make changes to the state object in one of my methods in the vuejs instance the change to the state object will cause the vue to render again.

```html
<html>
  <head>
    <title>vue on example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo"></div>
    <script>
var state = Vue.observable({
    count: 0
});
 
var vm = new Vue({
    el:'#demo',
    render : function(createElement){
       return createElement('input', {
            attrs: {
                type: 'button',
                value: 'count: ' + state.count
            },
            on: {
                click: this.click
            }
        });
    },
    methods: {
       click : function(){
           state.count += 1;
       }
    }
});
 
    </script>
  </body>
</html>
```

So then that is the basic idea of the Vue.observable method, it is just a way to go about making any javaScript object observabule. When such a task is done changes to that object will update the view in which the object is used. However this might not always be the best way to go about doing things as it strikes me as a kind of temperaty duct tape like solution. When it comes to creating a project with vuejs I might have some kind of vanilla javaScript module that will create and update a state object, but often such a module will have a main create method that I can call in a function that I use with the vue data option.

## 2 - Getters and setters under the hood.

The trick about reactive objects in vuejs is that [javaScript getters and setters](/2020/10/07/js-javascript-getter/) are used in order to make objects observable. It might be a good idea to take a moment to play around with them a little on thire own to get a better sense of how they work.

The Object.definePropery method can be used as a way to create getters and setters for an object property. This native javaScript method is worth looking into if you have not done so all ready becuase it is not just used to create getters and setters for an object, it can also be used to set objects as enumerable or not for example. In the body of a setter it is possible to not just set what the value of the property should be with some javaScript code, it is also possible to fire some additional methods that should fire each time the object property is set. One of these additional methods can be something that updates a vue for the object for example which is more or less what is going on inside vuejs.

```js

var createReactive = function (obj, onSet) {
    obj = obj || {};
    onSet = onSet || function () {};
    var newObj = {};
    Object.defineProperty(newObj, 'locals', {
        enumerable: false,
        value: {}
    });
    Object.keys(obj).forEach(function (key) {
        Object.defineProperty(newObj, key, {
            enumerable: true,
            get: function () {
                return this.locals[key];
            },
            set: function (newValue) {
                this.locals[key] = newValue;
                onSet(newObj);
            }
        });
        newObj[key] = obj[key];
    });
    return newObj;
};
var render = function (obj) {
    console.log(obj);
};
var a = createReactive({
        n: 42
    }, render);
console.log(a.n);
```

What is nice about using something like vuejs is that I can hind all of this kind of stuff away into an external file resource, and I can just focus more on what really matters in a project. I do like to create projects from the ground up with just native javaScript by itself, however doing so is time consuming, and it does not allways result in a better final product anway.

## 3 - conclusion

So the vue observable method is there for quickly turning a plain old external object into a reactive one. Often the use of the method is not need though at least I can not say I am using the method that often thus far. In most cases I use the vue data object option as a way to create a state for the vuejs instance, and each time that is the case the object becomes observable to begin with. It is only in cases where things are not working as expected with reactivity that the vue observable method might have to be used in order to get that feature of vuejs to work with a project.