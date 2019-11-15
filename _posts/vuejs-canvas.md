---
title: Vue canvas topics including getting started scaling and more
date: 2019-11-15 16:02:00
tags: [vuejs]
layout: post
categories: vuejs
id: 564
updated: 2019-11-15 17:23:30
version: 1.7
---

I would like to expand and update my collection of posts on canvas here, but maybe I should also do the same for my vuejs content also. So for today maybe it would be a smart move to write a post on using [vuejs, and canvas elements](https://alligator.io/vuejs/vue-html5-canvas/). Oddly enough that is a rock i have not flipped over just yet. I really like vuejs a lot compared to other modern front end frameworks, and I sure like canvas a whole lot to, so lets get to some examples where we are combining two totally awesome things lime peanut butter and chocolate.

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

So far so good that canvas ends up being the logical pixel resolution I set in the data object as expected. However what if I where to change that resolution? Do ing so might work but I would need to redraw what I worked out in the mounted hook. Still this is a simple starting point, so lets progress into something more advanced.

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

So now on top of the vue bind directive I am also now using the [vue on](/2019/11/14/vuejs-on/) directive to do some event attachment.

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