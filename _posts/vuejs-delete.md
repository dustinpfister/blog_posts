---
title: vue delete method to delete object properties and update the view
date: 2019-05-11 21:23:00
tags: [vuejs]
layout: post
categories: vuejs
id: 441
updated: 2020-07-28 16:14:32
version: 1.8
---

If for some reason I want to delete an object property in a vuejs data object, the view might not update when doing so. There is the force update method that can be used to update a view if necessary. However there is the built in [Vue delete](https://vuejs.org/v2/api/#Vue-delete) method as well that can also be used to delete an object property and update the view in one shot. So then with that said this will be a quick post on the use of vuejs delete in a client side javaScript environment using vue.js as a framework.

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