---
title: A vuejs example of a simple image edit app
date: 2020-07-27 16:57:00
tags: [vuejs]
layout: post
categories: vuejs
id: 687
updated: 2021-02-09 16:45:39
version: 1.4
---

It has been a long time sense I wrote a post on [vuejs](https://vuejs.org/v2/guide/), so I thought I would make a vuejs example post to help expand that collection. For this [vuejs example](/2021/02/04/vuejs-example/) the idea of a simple image editor application that will create a json version of the image that I draw with it came to mind. So maybe something like that is in order when it comes to expanding on what can be done with vuejs. After all once I cover all the basics the only thing to do from that point forward is to start to create some actual projects one one type or another.

<!-- more -->

## 1 - The main.js file for this Vuejs powered image editor

First off here is the main vuejs instance that will make use of some compoents that I worked out for this example.

```js
new Vue({
    el: '#app',
    template: '<div class="wrap_main">'+
        '<image-color-pick v-bind:img="imgs[currentImage]" v-on:color-click="colorClickHandler"></image-color-pick>'+
        '<image-div-grid v-bind:img="imgs[currentImage]" v-on:px-click="pxClickHandler"></image-div-grid>'+
    '</div>',
    data: function(){
        return {
           currentImage: 0,
           imgs : [{
               width: 8,
               height: 8,
               pxSize: 32,
               palette: [false, 'white', 'black', 'red', 'lime', 'blue'],
               colorIndex: 0,
               data: [
                   5,0,0,0,0,0,0,5,
                   0,0,0,0,0,0,0,0,
                   0,0,2,0,0,2,0,0,
                   0,0,2,0,0,2,0,0,
                   0,0,0,0,0,0,0,0,
                   0,0,2,0,0,2,0,0,
                   0,0,0,2,2,0,0,0,
                   5,0,0,0,0,0,0,5
               ]
           }]
        }
    },
    methods: {
        // set the current image pix pos to the current image color index
        pSet: function(x, y){
            var dat = this.$data;
            var img = dat.imgs[dat.currentImage];
            var pxIndex = y * img.width + Number(x);
            img.data[pxIndex] = img.colorIndex;
        },
        pxClickHandler: function(x, y){
            this.pSet(x, y);
        },
        colorClickHandler: function(index){
            var dat = this.$data;
            var img = dat.imgs[dat.currentImage];
            img.colorIndex = index;
        }
    }
});
```

##

## 2 - Conclusion

I did not get around to finishing everything that i wanted to do with this vuejs example as of this writing. I am not happy with the way things pan out, and will get around to writing the example over again at some point when I get more time to work on this one. I have been getting around to editing some of this vuejs content of mine, and if I keep up with it I should come back to this one again at some point in the future.