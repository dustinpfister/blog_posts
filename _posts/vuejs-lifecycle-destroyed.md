---
title: vue destroyed lifecycle hook
date: 2020-08-03 13:55:00
tags: [vuejs]
layout: post
categories: vuejs
id: 691
updated: 2021-02-25 09:26:15
version: 1.7
---

The [vue destroyed](https://vuejs.org/v2/api/#destroyed) life cycle hook will fired when a vue instance is destroyed. Such an event can happen by calling the destroy instance method of a vuejs instance. So far I can not say that this is something that I do in actual projects but I am sure that if I make enough vuejs examples I might end up in a situation in which I might have to do this with vue instances.

There are several other life cycle hooks that are worth mentioning also such as the [create](/2019/05/24/vuejs-lifecycle-create/), [mounted](/2019/05/25/vuejs-lifecycle-mounted/), and [updated](/2019/11/11/vuejs-lifecycle-updated/) hooks. The destroyed life cycle hook is yet another one of these hooks, so it makes sense that I should write one where I am focusing on the destroyed hook on top of those to continue with writing on life cycle hooks of vuejs.

<!-- more -->

## 1 - Basic Vue destroyed hook example

So the basic idea of the destroyed hook is that it is the last hook of interest the the full range of lice cycle hooks there are to work with in a vuejs instance. When this hook is called that is it for the vuejs instance, so it makes sense to preform any file work that should be done before all is lost and the vm is completely destroyed.

The [destroy instance method](/2019/06/01/vuejs-destroy/) can be used as a way to trigger the begging of the end for a vuejs instance. Once the destroy method is called the before destroy hook will be called followed by the destroyed hook. So say I have a simple vuejs instance that just displays a simple interface that can be used to step a count property value in the data object. Once I am done just stepping this data object I can then call a purge method that wil destroy the vm. This will then fire the destroy hook where I set the inner html of the container element to the last value of the count property in the data object.

```html
<html>
  <head>
    <title>vue destroyed lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
new Vue({
    el: '#demo',
    template: '<div>' +
    '<p>count: {{c}}</p>' +
    '<input type=\"button\" value=\"step\" v-on:click=\"step\">' +
    '<input type=\"button\" value=\"purge\" v-on:click=\"done\"></div>',
    destroyed: function () {
        // make the innerhtml of DEMO div just the count value
        this.$el.innerHTML = this.$data.c;
    },
    data: {
        c: 0
    },
    methods: {
        step: function () {
            this.c += 1;
        },
        done: function () {
            // start destroy
            this.$destroy();
        }
    }
});
  </script>
  </body>
</html>
```

So this might not be the most compelling example of the vuejs destroyed life cycle hook in action, but the aim here was a basic example of the use of a hook after all and basic examples to tend to be not so compelling. The goal here was just to demonstrate the basic idea of the vue destroyed hook after all and that is what this is.

However a real example might not be that much more advanced then this. Say I have a game where there is a main vuejs instance that will spawn additional vuejs instances that are used to generate game money. One option for each of these child instances is for the asset to be sold, so then the destroyed instance would be a greate place to add the amount of money that the child instance is worth to a value in the data object of the main instance.

## 2 - Conclusion

I have been neglecting my content on vuejs, so to help get me in gear for changing that I thought I would write a quick post on the destroyed life cycle hook as a way to continue expanding on vuejs. 

So that is it for not on the vuejs destroyed life cycle hook. I am trying to gear myself into spending a little more time on expanding my content on vuejs, as well as updating, editing, and expand my content on vuejs including this post also. With that said it is only a matter of time until I get around to this post, so hopefully I will expand this more then with a few additional examples of the destroyed life cycle hook as well as link to some additional posts on full examples that make use of this hook.