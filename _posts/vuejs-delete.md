---
title: vue delete method to delete object properties and update the view
date: 2019-05-11 21:23:00
tags: [vuejs]
layout: post
categories: vuejs
id: 441
updated: 2021-02-24 11:39:22
version: 1.18
---

If for some reason I want to delete an object property in a vuejs data object, the view might not update when doing so. There is the force update method that can be used to update a view if necessary that migt help in these kinds of situations. However there is the built in [Vue delete](https://vuejs.org/v2/api/#Vue-delete) method as well that can also be used to delete an object property and update the view in one shot. 

There might be a bunch of other things to bring up when it comes to deleting something in a vuejs instance. Come to think of it I often think that it might be a good idea to not delete anything to begin with, and as an alternative use the same resources over and over again. So then with that said this will be a quick post on the use of vuejs delete in a client side javaScript environment using vue.js as a framework, and write about some other related topics in the process of doing so.

<!-- more -->

## 1 - Vue delete with just the javaScript delete keyword

The way to go about deleting an object property with native javaScript is to use the delete keyword. If I really want to I can use that as a way to delete an object key of the data object of a view, but the view will not update to reflect that. However I can use the force update method to update the view afterwards to do so.

```html
<html>
  <head>
    <title>vue el example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <ul class="foo">
    <li id="bar" >{{ obj }}</li>
  </ul>
  <script>
  
  var vm = new Vue({
    el:'#bar',
    data: {
        obj: {foo:'bar', baz:'chew'}
    }
  });
  
  // delete will not update the view
  // so force update must be used to
  // render the change
  delete vm.obj.baz
  vm.$forceUpdate();
  
  </script>
  </body>
</html>
```

Although a solution like this might work there is the built in vue delete method that can be used to both delete the object key, and update the view in one shot.

## 2 - Vue delete global method

One way to use the delete method is as a global method of Vue. When using the delete method this was the delete method is called off of the main Vue global. Once I call it I then pass the object that I want to delete something from as the first argument, and then the index, or key name in the object that I want to delete.

```js
  
  var vm = new Vue({
    el:'#bar',
    data: {
        obj: {foo:'bar', baz:'chew'}
    }
  });
  
  // The Vue delete global method can be used to
  // delete an object key and update the view
  Vue.delete(vm.obj, 'baz');
```
So that is the basic idea at least of the vue delete method, I pass the property of the data object I want to delete, and then a key as the second argument. The object property will then be deleted, and the view will render. There are a number of other ways that the delete method can be used to delete an object property from the data object though, so lets look at a few more examples of this one.

## 3 - Delete and add items to a list

So how about a full copy and past example of the vuejs delete method as well as a whole buch of other vuejs features. Here I have a very simple list example where I am using the vue delete method to delete names on a list when the name is given in a text input element and a delete button is pressed.

So this example makes use of [vue el](/2019/05/06/vuejs-el/) to attach to a hard coded html element by an id attribute, I am also making use of the [vue template option](/2019/05/07/vuejs-template/) to define additional html code that will be appended to the hard coded html element that I am attaching to. In this template I am using the [vue for](/2019/05/21/vuejs-for/) directive to repeat an element for each item in a collection, in this case an array of names. I am also using another important directive that a vuejs developer should be aware of called vue model that is what I need to use when working with text input elements and the data object. There are many other vuejs features being used such as the methods option, and [vue on](/2019/11/14/vuejs-on/) directive.

```html
<html>
  <head>
    <title>vue el example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <script>
var vm = new Vue({
        el: '#app',
        template: '<div><ul><li v-for="fn in names" v-text="fn"></li></ul>' +
        '<input type="text" v-model="name">' +
        '<input type="button" value="delete" v-on:click="del">' +
        '<input type="button" value="add" v-on:click="add"></div>',
        data: {
            names: ['dustin', 'john', 'emme'],
            name: 'dustin'
        },
        methods: {
            del: function () {
                var vm = this;
                vm.$delete(this.names, this.names.findIndex(function (n) {
                        return n === vm.name;
                    }));
                vm.names.sort();
            },
            add: function () {
                var vm = this;
                if (!vm.names.some(function (n) {
                        return n === vm.name;
                    })) {
                    vm.names.push(vm.name);
                    vm.names.sort();
                }
            }
        }
    });
vm.names.sort();
  </script>
  </body>
</html>
```

## 4 - Do you really even need to delete to begin with? Check out Object pools.

One thing to keep in mind when making a project that involves deleteing an objet is to stop and ask yourself if you really even need to delete an object to begin with. In some situstions maybe you just do and as such there needs to be a process to delete an object in a way that will work without problems. However there is the idea of just flaging an object as not being currently active, and then ise that flag as a way to not redner anything for the object, or use that object to update something.

Think about how a file system works on a hard drive for a moment, when you go do delete a file does the data dissapear? Nope the area on the hard drive where the data for that file is just ends up being flag as empty space. As such when it comes to writing new data to the file system that are of the disk can now be used for something else. So it is possible to create vuejs projects that follow a simular kind of dynamic where I create a set number of objects, and have an active flag for each object that serves as a way to know if the object is being used or not.

```html
<html>
  <head>
    <title>vue el example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <script>
new Vue({
    el: '#app',
    template: '<div>'+
        '<input type="text" v-model="messText" v-on:keyup.enter="useNext"> ' +
        '<button v-on:click="useNext">Add</button> ' +
        '<button v-on:click="del">Delete</button> ' +
        '<div v-for="obj in pool">' +
            '<p v-if="obj.active">{{obj.mess}}</p>' +
        '</div>' +
    '</div>',
    data: {
        messText: 'Hello World',
        pool: []
    },
    created: function(){
        this.$data.pool = this.createPool(5);
        this.useNext('Hello World');
        this.useNext('This is an object pool');
    },
    methods: {
        // the 'delete' method just sets an active flag to false
        // the object is still there it can just be used for something
        // else now
        del: function(){
            var obj = this.getNextActiveState(true);
            if(obj){
                obj.active = false;
            }
        },
        useNext: function(mess){
            var obj = this.getNextActiveState(false);
            if(obj){
                obj.active = true;
                if(typeof mess === 'string'){
                   obj.mess = mess || this.$data.messText;
                }else{
                    obj.mess = this.$data.messText;
                }
            }
        },
        getNextActiveState: function(state){
            state = state === undefined ? false: state;
            var i = 0,
            obj,
            len = this.$data.pool.length;
            while(i < len){
                obj = this.$data.pool[i];
                if(obj.active === state){
                    return obj;
                }
                i += 1;
            }
            return false;
        },
        createPool: function(size){
            var i = 0,
            pool = [];
            while(i < size){
                pool.push({
                    active: false,
                    mess: 'none'
                });
                i += 1;
            }
            return pool;
        }
    }
});
  </script>
  </body>
</html>
```

So then in this example each time I click the add button I then get an object with an active flag set to false, and set the mess prop of that object to what I have in the text input element and set the active flag of the object to true. In the template I am then using the [v-for directive](/2019/05/21/vuejs-for/) to create a div for each object in the pool, but the object only has its mess property displayed if the active flag in true thanks to the [v-if directive](/2019/05/22/vuejs-if/).

The delete method of the vue instance does not actually delete an object it just sets the active flag back to false. At which point the object can in turn be used for something new.

## 5 - Conclusion

So there are a number of options when it comes to deleting an object from the data object of a vue instance. However it might be a good idea to stop and think if I really need to delete something from the data object to begin with. So far when it comes to working on actual projects with vuejs I am not deleting things often. Often I prefer to create a fixed stack of objects for something right away, and then just use various vuejs and native javaScript features to reuse that same fixed stack of objects over and over again.

When it comes to my collection of canvas examples I have one [canvas example centered around the idea of an object pool](/2020/07/20/canvas-example-object-pool/). This is a fixed set of objects that have display object like properties such as x, y, width, and height for example. In my object pool example I do not create and delete display objects, rather i create a fixed number of objects for a pool, and then just mutate the properties of those objects as needed. When it comes to a project where I am using Vuejs as a central front end framework I often find myself doing something along those lines. I just create a set number of objects and then just mutate the properties of those objects as needed. I can use directives like f-if, and filters along with native javaScript features like Array.filter to change what it is the is displayed in a template, or what is used to update the value of something else.
