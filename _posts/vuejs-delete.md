---
title: vue delete method to delete object properties and update the view
date: 2019-05-11 21:23:00
tags: [vuejs]
layout: post
categories: vuejs
id: 441
updated: 2021-02-24 09:33:33
version: 1.12
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
So that is the basic idea at least of the vue dlete method, I pass the property of the data object I want to delete, and then a key as the second argument. The object property will then be deleted, and the view will render. There are a number of other ways that the delete method can be used to delete and object property from the data object thoyg, so lets look at a few more examples of this one.

## 3 - Delete and add items to a list

So how about a full copy and past example of the vuejs delete method as well as a whole buch of other vuejs features. Here I have a very simple list example where I am using the vue delete method to delete names on a list when the name is given in a text input element and a delete button is pressed.

So this example makes use of [vue el](/2019/05/06/vuejs-el/) to attach to a hard coded html element by an id attribute, I am also making use of the [vue template option](/2019/05/07/vuejs-template/) to define additional html code that will be appended to the hard coded html element that I am attaching to. In this template I am using the [vue for](/2019/05/21/vuejs-for/) directive to repeat an element for each item in a collection, in this case an array of names. I am also using another important directive that a vuejs developer should be aware of called vue model that is what I need to use when working with text input elements and the data object. There are many otheer vuejs features being used such as the methods option, and [vue on](/2019/11/14/vuejs-on/) directive.

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