---
title: The vue extend global api method in vuejs
date: 2019-05-09 13:07:00
tags: [vuejs]
layout: post
categories: vuejs
id: 439
updated: 2021-02-18 12:15:44
version: 1.19
---

The [vue extend](https://vuejs.org/v2/api/#Vue-extend) method can be used to extend the base Vue class constructor function and return a custom constructor of vuejs that is a sub class of Vue. It is similar to but still very much different from the [vue component](/2019/05/16/vuejs-component/) method that is more of an asset management method rather than a method that will create a custom vuejs constructor all together.

So then the Vue extend method can be used to make custom constructors of Vue that have templates, base data, and methods for one or more instances of something in a project. For example if I am making some kind of idle game that involves a page where I have two or more assets that are making money for me then the Vue extend method might be a good option for making an Asset class for that aspect of the game. To help elaborate with this it would be best to check out some examples of the vue extend global api method, so lets hop to it.

<!-- more -->

## 1 - Vue extend and what to know before hand

This is a post on the vuejs global api method vue extend, it is not a getting started post on vuejs, html, or javaScript. I assume that you have at least some experience when it comes to making web applications with javaScript, and are just in the process of getting up to speed with using vuejs as a way to do so when it comes to the use of front end frameworks rather than just vanilla javaScript.

### 1.1 - A Basic Example of Vue.extend

First off how about a very basic example of the Vue.extend method, that is just a hello world example.

```html
<html>
  <head>
    <title>Vue extend example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  <div id="app"></div>
  <script>
// a 'Basic' subclass of Vue created with Vue.extend
var Basic = Vue.extend({
        // template for an asset
        template: '<div>' +
            '<h1>Basic Subclass Example</h1>' +
            '<p>{{ mess }}</p>'+
        '</div>',
        // data
        data: function () {
            return {
                mess: 'Hello World'
            }
        }
    });
// create an instance of 'Basic' and mount it
var vm = new Basic();
vm.$mount('#app');
  </script>
  </body>
</html>
```

## 2 - Vue extend blog post Example

Say I have a project in which I want to display the title, and date information of a blog post. I would like to abstract away a template, and data object schema away into a nice neat little package, and then use that where and when I want to in a page. One way to go about doing just that would be with vue extend.

```html
<html>
  <head>
    <title>Vue extend example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  
  <div id="post"></div>
  
  <script>
var Post = Vue.extend({
    template: '<ul>'+
        '<li><h2>{{ title }}</h2></li><li>published: {{ date.publish }}</li>'+
        '<li>updated: {{ date.update }}</li>'+
       '</ul>',
    data: function () {
        return {
            title: 'untitled',
            date: {
                publish: '2000/01/01',
                update: '2000/01/01'
            }
        }
    }
});
  
  new Post().$mount('#post');
  
  
  </script>
  </body>
</html>
```

Here I am just using string literals for starters but that of course can change to something more that pulls this info from a back end or so forth. The important thing to note here is that I am giving a function for data rather than an object. The reason why that is important is to provide an independent function level variable scope for each instance made with the constructor that returned by vue extend. Here it is had to see why this matters, but in other examples it will be clear as to why it matters.

## 3 - Vue extend and closure

The reason why the data option must be a function when making a custom constructor with the vue extend method is so that there is a closure over the data. I will not be getting into closures in javaScript in detail here, but if you do not know much about them it is a good idea to work out some examples of your own with closures as to get a sense of why they are important. I have a [post on closures](/2019/02/22/js-javascript-closure/) as well if interested.

```html
<html>
  <head>
    <title>Vue extend closure example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  
  <div id="count1"></div>
  <div id="count2"></div>
  
  <script>
var Count = Vue.extend({
    template: '<div><input type=\"button\" v-on:click=\"n++\" value=\"Step\"> {{n}} </div>',
    data: function () {
        return {
            n:0
        }
    }
});
  
  new Count().$mount('#count1');
  new Count().$mount('#count2');
  
  
  </script>
  </body>
</html>
```

Here I have an example of vue extend that makes a Count constructor. When I do so each instance of it has its own independent count, the reason why is because of closure, otherwise both instances would be referencing the same data object and I do not want that.

## 4 - An Asset constructor example with an update method

It is time to something that is a little fun for a change, so for this example of the vue extend method I made a sub class of vuejs that is for an Asset that might eventually be part of an idle game. The idea here is having two or more assets that generate money that can then be used to buy additional assets, as well as upgrade existing ones. 

So I would want an interface for each instance of this asset sub class created with vue extend, and it should also display the current state of the asset is terms of the rate at which money is being made, how much money, and a progress bar until the next sum of money is gained. So it will have to have a template, a data object, and methods to update the state of the asset as well as upgrade it.

```html
<html>
  <head>
    <title>Vue extend example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
  
  <div id="asset-1"></div>
  <div id="asset-2"></div>
  
  <script>
var Asset = Vue.extend({
        // template for an asset
        template: '<div style="background:grey;padding:5px;">' +
        '<h2>{{ name }}</h2>' +
        '<div style="width:320px;height:20px;background:black;">' +
        '<div id="pbar" style="width:100px;height:20px;background:lime;"></div>' +
        '</div>' +
        '<h3>money: ${{ money.toFixed(2) }}</h3>'+ 
        '<p>level: {{ level.current }} next level: {{ level.nextCost.toFixed(2) }} rate: {{ rate.amount.toFixed(2) }}</p>' +
        '<input type="button" value="upgrade" v-on:click="upgrade">' +
        '</div>',
        // data
        data: function () {
            return {
                name: 'House 1',
                money: 0,
                lastTick: new Date(),
                per: 0,
                rate: {
                    amount: 10,
                    powAmount: 2,
                    baseAmount: 10,
                    time: 3000
                },
                level: {
                    current: 1,
                    nextCost: 100
                }
            }
        },
        // on create call upgrade for the first time
        created: function () {
            this.upgrade();
        },
        // methods
        methods: {
            // update method to be called in the main app loop
            update: function () {
                var now = new Date(),
                time = now - this.$data.lastTick;
                per = time / this.$data.rate.time;
                per = per > 1 ? 1 : per;
                if (per === 1) {
                    this.$data.money += this.$data.rate.amount;
                    this.$data.lastTick = now;
                    this.$data.per = 0;
                }
                this.$el.querySelector('#pbar').style.width = Math.floor(per * 320) + 'px';
            },
            // upgrade method
            upgrade: function () {
                var data = this.$data;
                if (data.money >= data.level.nextCost) {
                    data.money -= data.level.nextCost;
                    data.level.current += 1;
                    data.level.nextCost = 100 + Math.pow(data.rate.powAmount + 1, data.level.current);
                }
                data.rate.amount = data.rate.baseAmount + Math.pow(data.rate.powAmount, data.level.current);
            }
        }
    });
// slow house asset
var a = new Asset({
        data: {
            name: 'Slow House',
            rate: {
                time: 20000,
                baseAmount: 100,
                powAmount: 3
            }
        }
    }).$mount('#asset-1');
// fast house asset
var a2 = new Asset({
        data: {
            name: 'Fast House',
            rate: {
                time: 500,
                powAmount: 1.25
            }
        }
    }).$mount('#asset-2');
// app loop
var loop = function () {
    setTimeout(loop, 1000 / 30);
    a.update();
    a2.update();
};
loop();
  </script>
  </body>
</html>
```

In the update method I am using the vue el property to do a query search for the element that will be used for the progress bar. Once I have a reference to that div I am using the style api to change the width of the inner div that is used to display the amount of progress that has been made in making the next sum of money. This could have been done a number of other ways such as using a canvas element.

This example also uses the [created life cycle hook](/2019/05/24/vuejs-lifecycle-create/) where I can define some logic that is to fire after the data object is created, but before the vue is mounted to the mount point element. In this hook I am just calling the upgrade method for the first time to make sure that the rate amount is set by the formula that is used to set it rather than the hard coded default value.

When I go to use the Asset sub class I give it an options object with some values that will change how that asset works compared to others. I created a slow house that takes longer to pay out, but when it does it pays out more money. In addition to the slow house I also made a fast house that pays out faster, but with less money. I also made some tweaks that change the upgrade costs.

## 5 - Conclusion

So the vue extend can be used to create custom sub classes of the main Vue constructor in vuejs. These custom constructors can be given templates, methods, hooks, and other options that define what the custom sub class of vuejs is all about. So the vue extend method can come into play with all kinds of projects where I might want more that one instance of a custom kind of Vue constructor, but it might not always be a replacement for components, and plug ins that work a little differently in vuejs.