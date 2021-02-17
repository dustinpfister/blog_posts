---
title: The vuejs model directive
date: 2020-07-28 20:49:00
tags: [vuejs]
layout: post
categories: vuejs
id: 688
updated: 2021-02-17 12:24:09
version: 1.7
---

This will be a quick post on the [vuejs model](https://vuejs.org/v2/api/#v-model) directive that might need to be used now and then when doing something with input elements in a template. The model directive may not need to always be used when working out an interface in a template but I have found that I need to use it with input, select, and text area tags. The vue model directive will make it so that you have [two way bindings](https://vuejs.org/v2/guide/forms.html) between input tags, and a value in the data object of a vue instance. So that when something changes in the data object, that change will effect the value of an input tag, and that if the user changes the value in the input tag that will change the value in the data object.

<!-- more -->

## 1 - vue model basic example

So lets start out with just a very simple example of the vue model directive that will help to show what the deal is with the v-model directive in vuejs. Here I have a Vue instance a script tag that will mount to a hard coded html element my way of the vue el option. When it mounts the mount life cycle hook will fire and call an add method that will add the value of the a, and b properties in the data object to get the value of c. 

This add method will also always fire when there is a change to the data object because of the updated hook. In my template I am making it so that there is a two way binding between input tags in the template, and corresponding values in the data object that I want to change when the user updates the value of the input tags. The way that I go about do that here in this example is by making use of the v-model directive in the input tags. I just make the value of this v-model directive the data object property that I want to have bound to the value of the input tag.

```html
<html>
  <head>
    <title>vue model</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="app"></div>
  <script>
new Vue({
    el: '#app',
    template: '<div><input type="text" v-model="a"> + ' +
    '<input type="text" v-model="b" > = <span v-text="c" ></span></div>',
    data: {
        a: 1,
        b: 3,
        c: 0
    },
    mounted: function () {
        this.add();
    },
    updated: function () {
        this.add();
    },
    methods: {
        check: function(num){
            var int = parseInt(num);
            if(String(int) === 'NaN'){
               int = 0;
            }
            return int;
        },
        add: function () {
            var a = this.check(this.a),
            b = this.check(this.b);
            this.c = a + b;
        }
    }
});
  </script>
  </body>
</html>
```

So when this example is up and running when I make to a change to any of the values in the input tags that in turn will update the data object value for the value that the input tag is bound to. This will result in an update hook being fired, which in turn will call the add method, which will update the value of the c data object property.

## 2 - Conclusion

So the Vue module directive is what needs to be used to make a two way binding between the value property of various HTML elements that are used to get user input, and the data object of a vue.js instance. I use it all the time in any template that requires the use of it.
