---
title: vue updated lifecycle hook
date: 2019-11-11 15:21:00
tags: [vuejs]
layout: post
categories: vuejs
id: 560
updated: 2021-02-19 11:04:59
version: 1.14
---

The [vue update](https://vuejs.org/v2/api/#updated) life cycle hook is one of several hooks that can be used to define logic that is to be executed at various stages of the vue instance life cycle. The vue update hook will fire after the before update hook when a reactive property data state of the vue instance has changed, or the force update method is called.

So the vue updated hook can be useful for firing some methods or doing anything that needs to be done when a reactive data property changes. In addition there are many other hooks beyond the updated and before update hooks such as the [created](/2019/05/24/vuejs-lifecycle-create/), and [mounted](/2019/05/25/vuejs-lifecycle-mounted/) hooks which are the other typical hooks that I find myself using the most often. So lets look at some examples of these kinds of hooks and why they might come in handy when working out a javaScript project with vuejs as a fron end framework.

<!-- more -->

## 1 - vue update basics

Lets start out with a basic example of the vue updated life cycle hook. Here I am using the updated hook to call an additional method that will update the value of another variable when the pow variable is updated by way of user input.

This is also a basic example of the before update hook also that I am using to enforce some rules about that value that is given by way of user input. The example uses a value that is given via the input element to figure a power of two where the power is that value given in the input element. So I use the before update hook to check the value, and default to zero or one thousand twenty three in the event of errors. They after the before update hook the updated hook fires and I figure the current power of two and set it to the n property of the data object.

```html
<html>
  <head>
    <title>vue updated lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script>
new Vue({
    el: '#demo',
    template: '<div><p>2^{{ pow }} = {{ n }}</p><input type="text" v-model:value="pow"></div>',
    data: {
        pow: 0,
        n: 0
    },
    // before figure
    beforeUpdate: function () {
        var data = this.$data;
        data.pow = Number(data.pow);
        if (data.pow + '' === 'NaN' || data.pow < 0) {
            data.pow = 0;
        }
        if (data.pow > 1023) {
            data.pow = 1023;
        }
    },
    // good to figure
    updated: function () {
        this.figure()
    },
    methods: {
        figure: function () {
            this.$data.n = Math.pow(2, this.$data.pow);
        }
    }
});

  </script>
  </body>
</html>
```

## 2 - Basic Array example

Now for a basic example of the updated hook that makes use of an array in the data object. In the array I have a bunch of work objects where each object repersents some kind of work that was prefromed that is worth a certin about of money. Clicking a start a work button will create a new work object for the array, but this will only continue until a max work value is reached. There is then a process works button that will process the array of work objects selling each for an amount of money to which each object is worth. However I am also using the updated hook as a way to check the array of work objects to see if the max has been reached at which point that will also result in the process works method being called.

```js
new Vue({
    el: '#demo',
    template: '<div style="background:gray;padding:10px;">' +
        '<h3>Money: {{ money }}</h3>'+
        '<h3> works:</h3>' +
        '<button v-on:click="startAWork">Start a Work</button> ' +
        '<button v-on:click="processWorks">Process Works</button>' +
        '<div style="background:#afafaf;padding:10px;margin:10px;">' +
            '<div v-for="w in works" >id: {{w.id}}, worth: {{ w.worth }}</div>' +
        '</div>' +
    '</div>',
    data: {
        money: 0,
        count: 0,
        maxWorks: 10,
        works: []   // a log of work objects
    },
    // THE UPDATED HOOK
    updated: function () {
        var dat = this.$data;
        // process the works if we hit the max
        if(dat.works.length == dat.maxWorks){
            this.processWorks();
        }
    },
    methods: {
        // process the array of work objects
        processWorks: function(){
            var dat = this.$data;
            dat.works.forEach(function(w){
                dat.money += w.worth;
            });
            dat.works = [];
        },
        // start a work object
        startAWork: function () {
            var dat = this.$data;
            if(dat.works.length < dat.maxWorks){
                var w = {
                    id: dat.count,
                    worth: 1
                };
                dat.count += 1;
                dat.works.push(w);
            }
        }
    }
});
```

The use of an array in a data object goes hand in hand with the v-for directive when working out a simple static temaple for an example such as this.

However the main event here is the updated hook, it is a good place to check something each time the data object updates. However some times a chnage to the data object will not trigger an updated hook. The main reason why that might be is becuase a nested value in the data object is not reactive. So maybe we should take a moment to look at a few more examples that make use of the updated hook to get a better sense of how to address isshues where the updated hook is not working as exspected.

## 3 - vue updated array example and force update

In this section I will be going over an example that is again the beginnings of a simple idle game. this will just start adding money to a variable each time a tick method is called outside the vue instance with setInterval. In addition there is also a work button that will add more money and a higher rate, but will do so manually. However it will not happen right away only after each time the data object is updated will a log array of objects be tabulated and added to main money property of the data object.

This example involves the use of an array as a data object property. The tricky thing about arrays as data properties is that adding and removing elements will not trigger an update of the vue, so a force update is needed.

So lets start off with the html.

```html
<html>
  <head>
    <title>vue updated lifecycle example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="demo"></div>
  <script src="array.js"></script>
  </body>
</html>
```

Here is the javaScript of the example

```js
var app = new Vue({
        el: '#demo',
        template: '<div>' +
        '<p>money: {{ money }}</p>' +
        '<p> ticks: {{ ticks }} works: {{ works }} </p>' +
        '<input type="button" value="work" v-on:click="work" >' +
        '</div>',
        data: {
            money: 0,
            ticks: 0,
            works: 0,
            log: []
        },
        // what to do on an update
        updated: function () {
            var data = this.$data;
            if (data.log.length === 1) {
                data.money += data.log[0].money;
                data[data.log[0].type] += 1;
            }
            if (data.log.length > 1) {
                data.money += data.log.reduce(function (acc, obj) {
                    acc = typeof acc === 'object' ? Number(acc.money) : acc;
                    return acc + Number(obj.money);
                });
                data.log.forEach(function (obj) {
                    data[obj.type] += 1;
                });
            }
            if (data.log.length >= 1) {
                data.log = [];
            }
        },
        methods: {
            tick: function () {
                var obj = {
                    type: 'ticks',
                    money: 1
                };
                this.$data.log.push(obj);
                this.$forceUpdate();
            },
            work: function () {
                var obj = {
                    type: 'works',
                    money: 25
                };
                this.$data.log.push(obj);
            }
        }
    });
 
setInterval(function () {
    app.tick();
}, 1000);
```

## 4 - Conclusion

The the vue update hook can be useful for defining some logic that will fire each time a reactive data object updates, or in the event that something is not reactive when the force update method is called. There are many other hooks that fire over the course of a vue instances life span such as the created hook that will fire once the vue instance is created buy not mounted to html, and then there is of course a hook for that also. Hooks come in handy when working out a custom vue constructor of component, I use them all the time where and when needed.