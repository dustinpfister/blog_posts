---
title: Vue canvas topics including getting started scaling and more
date: 2019-11-15 10:48:00
tags: [vuejs]
layout: post
categories: vuejs
id: 564
updated: 2021-02-20 17:32:17
version: 1.16
---

For today maybe it would be a smart move to write a post on using [vuejs, and canvas elements](https://alligator.io/vuejs/vue-html5-canvas/) in the template of vuejs instances. Oddly enough that is a rock I have not flipped over just yet as I continue to play around with vuejs as a way to go about making a client side javaScript project. 

When it comes to the canvas element alone I have made a collection of [canvas examples](/2020/03/23/canvas-example/) that I work on a little more now and then, and also expand with new examples on occasion. Canvas elements are great, they really are a part of fun and intertsing javaScript and they can be used to do just about everything when it comes to web based games, and animation like projects. With my canvas examples though I am not using any kind of framework each time I create a new example. A lot of people seem to think that kind of approce is how to really go about learning how to use something. Maybe there is a degree of truth to that, but a prive is payed for sure, projects will take a lot longer. So it is a nice break from doing everything from the ground up by making a few examples where I am using vuejs at least as a way to help keep things a little more structured, and save a bit of time maybe.

Vuejs is just a general front end framework, and the use of vuejs by itself might not be the best choice when it comes to getting up and running with canvas right away. However there are a number of ways of adding canvas support, or using a canvas library of one kind or another with vuejs. However in this post I will just be using vuejs alone, and starting to just play around with some canvas elements in the temaple.

In this post I will be starting out with just some very basic examples of vuejs, and using one or more canvas elements in the template. There are things like scaling, and getting the position of a mouse click that I think I should also cover while I am at it. I really like vuejs a lot compared to other modern front end frameworks, and I sure like canvas a whole lot to, so lets get to some examples where we are combining two totally awesome things like peanut butter and chocolate.

<!-- more -->


## 1 - vue canvas basic example

This basic example of canvas and vuejs involves just mounting to a single container div, and having a single canvas element as the [template](/2019/05/07/vuejs-template/). In the template I am using the [vue bind](/2019/05/31/vuejs-bind/) directive to bind width and height properties in the [vue data](/2019/05/18/vuejs-data/) object. I then have a single [mounted life cycle hook](/2019/05/25/vuejs-lifecycle-mounted/) that will draw to the canvas when the vue instance is mounted to the container element.

```html
<html>
  <head>
    <title>vue canvas example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
  </head>
  <body>
    <div id="demo"></div>
    <script>
new Vue({
    el:'#demo',
    template: '<canvas v-bind:width="width" v-bind:height="height"></canvas>',
    data: {
        width: 320,
        height: 240
    },
    // using the mounted lifecycle hook
    mounted: function(){
        // get canvas and context
        var canvas = this.$el,
        ctx = canvas.getContext('2d');
        // draw something
        ctx.fillStyle = '#00afaf';
        ctx.fillRect(0,0,canvas.width, canvas.height);
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font='30px arial';
        ctx.fillText('Hello Vue Canvas!', canvas.width / 2, canvas.height / 2);
    }
});
    </script>
  </body>
</html>
```

So far so good that canvas ends up being the logical pixel resolution I set in the data object as expected. However what if I where to change that resolution? Doing so might work but I would need to redraw what I worked out in the mounted hook. Still this is a simple starting point, so lets progress into something more advanced.

## 2 - vue canvas and scaling the canvas element

So now I took the rendering logic that I first worked out in the mounted hook, and transfered it to its own method in the [methods option object](/2019/05/20/vuejs-method/). I am now creating references to the canvas and 2d drawing context the mounted hook, but now calling my new draw method in the method object to draw the content. In addition I now also have my new [updated life cycle hook](/2019/11/11/vuejs-lifecycle-updated/) that will call that draw method each time the state updates.

```js
var vm = new Vue({
        el: '#demo',
        template: '<canvas v-bind:width="width" v-bind:height="height"></canvas>',
        data: {
            width: 320,
            height: 240,
            canvas: null,
            ctx: null
        },
        // get canvas, context, and draw for the first time
        // lifecycle hook
        mounted: function () {
            // get canvas and context
            this.$data.canvas = this.$el;
            this.$data.ctx = this.$el.getContext('2d');
            this.draw();
        },
        // draw on updated hook
        updated: function () {
            this.draw();
        },
        // single draw method
        methods: {
            draw: function () {
                var canvas = this.$data.canvas,
                ctx = this.$data.ctx;
                var px = Math.floor(canvas.width / 10);
                // draw something
                ctx.fillStyle = '#00afaf';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#ffffff';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = px + 'px arial';
                ctx.fillText('Hello Vue Canvas!', canvas.width / 2, canvas.height / 2);
            }
        }
    });
// change size of canvas
vm.$data.width = 800;
vm.$data.height = 600;
```

When I change the logical pixel resolution I get the desired behavior, the resolution changes, and the content I have will be drawn. So there is drawing to the canvas for the first time, and then there is drawing to the canvas whenever something changes in the data object. Now there is just starting out with some user input.

## 3 - Adding click and touch support

So now on top of the vue bind directive I am also now using the [vue on](/2019/11/14/vuejs-on/) directive to do some event attachment. I am using the same method for both mouse clicks, and touch start events. When it comes to maybe turning this into some kind of real project it would be something that would work well with that kind of treatment of both mouse and touch events.

The click method in the methods object is what is called for every mouse click and touch start event. I am using a [ternary operator](/2019/02/02/js-operator-precedence/) to address the differences between mouse and touch events where just the first touch object is what will be seen as an equivalent to a mouse click. The get bounding client rect of the target element which in this case is the canvas is what I used to offset the x and y values so that they are relative to the canvas element, and not the windows object of the browser.

```js
new Vue({
    el: '#demo',
    template: '<canvas ' +
    'v-bind:width="width" ' +
    'v-bind:height="height"' +
    'v-on:click="click"' +
    'v-on:touchstart="click"' +
    '></canvas>',
    data: {
        width: 320,
        height: 240,
        canvas: null,
        ctx: null,
        points: []
    },
    // on mounted
    mounted: function () {
        // get canvas and context
        this.$data.canvas = this.$el;
        this.$data.ctx = this.$el.getContext('2d');
        this.draw();
    },
    // on updated
    updated: function () {
        this.draw();
    },
    // single draw method
    methods: {
        // on click or touch
        click: function (e) {
            var bx = e.target.getBoundingClientRect();
            this.$data.points.push({
                x: (e.touches ? e.touches[0].x : e.clientX) - bx.left,
                y: (e.touches ? e.touches[0].y : e.clientY) - bx.top
            });
            if (this.$data.points.length > 10) {
                this.$data.points = this.$data.points.slice(1, 11);
            }
            this.draw();
        },
        // draw the current state
        draw: function () {
            var canvas = this.$data.canvas,
            ctx = this.$data.ctx;
            var px = Math.floor(canvas.width / 10);
            // clear
            ctx.fillStyle = '#00afaf';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#ffffff';
            // draw circles
            this.$data.points.forEach(function (pt) {
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, 5, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }
});
```

When it comes to my vanilla javaScript canvas examples I have a post where I touch base on the [get canvas relative method](/2020/03/04/canvas-get-point-relative-to-canvas/) in detail. This is a subject that I find that I have to revisit now and then as things can often get messed up when fixing things that have to do with scalling and positioning of a canvas element.

## 4 - Conclusion

I would like to expand and update my collection of posts on canvas, but maybe I should also do the same for my vuejs content also. I am not really all that fond of doing everything from the ground up each time I start a new project, so it would be nice to make use of some kind of framework when it comes to starting a project. Vuejs is a nice framework, it is not backed with all kinds of features that I am not going to use, and adding features that I want is not so hard.
 