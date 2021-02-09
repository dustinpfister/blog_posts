---
title: A vuejs example of a simple image edit app
date: 2020-07-27 16:57:00
tags: [vuejs]
layout: post
categories: vuejs
id: 687
updated: 2021-02-09 16:50:44
version: 1.5
---

It has been a long time sense I wrote a post on [vuejs](https://vuejs.org/v2/guide/), so I thought I would make a vuejs example post to help expand that collection. For this [vuejs example](/2021/02/04/vuejs-example/) the idea of a simple image editor application came to mind as just one of many ideas that might prove to be fun. So maybe something like that is in order when it comes to expanding on what can be done with vuejs. After all once I cover all the basics the only thing to do from that point forward is to start to create some actual projects one one type or another.

<!-- more -->

## 1 - The main.js file for this Vuejs powered image editor

First off here is the main vuejs instance that will make use of some compoents that I worked out for this example. For the main vue instance I went with a simple static template rather than a render function. However in the template I am using some components that are making use of render functions when it comes to drawing the current state of the image grid.

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

## 2 - The grid div component

```js
Vue.component('image-div-grid', {
    props: ['img'],
    render: function(createElement){
        var img = this.$props.img,
        vm = this,
        divs = [];
        console.log('render');
        img.data.forEach(function(px, i){
            var x = i % img.width,
            y = Math.floor(i / img.width),
            color = img.palette[px];
            var px = createElement('div', {
                attrs: {
                    id: 'px_' + x + '_' + y,
                    class: 'image-div-grid-px',
                    style: 'left:' + ( x * img.pxSize ) + 'px;top:'+ ( y * img.pxSize ) +';background:' + color + ';'
                },
                on:{
                    click: vm.pxClick
                }
            });
            divs.push(px);
        });
        return createElement('div', {
            attrs: {
                class: 'image-div-grid ui-div',
                style: 'width:' + (img.width * img.pxSize) + 'px;height:' + (img.height * img.pxSize) + 'px;'
            }
        }, divs);
    },
    methods: {
        pxClick: function(e){
            var div = e.target,
            idArr = div.id.split('_')
            console.log(idArr);
            this.$emit('px-click', idArr[1], idArr[2]);
            this.$forceUpdate();
        }
    }
});
```

## 3 - The Color picker component

```js
Vue.component('image-color-pick', {
    props: ['img'],
    render: function(createElement){
        var img = this.$props.img,
        vm = this,
        divs = [];
        img.palette.forEach(function(color, i){
            var x = i % 2,
            y = Math.floor(i / 2);
            var px = createElement('div', {
                attrs: {
                    id: 'color_' + i,
                    class: 'image-color-pick-div',
                    style: vm.styleStr(img, i, x, y, color)
                },
                on:{
                    click: vm.colorClick
                }
            });
            divs.push(px);
        });
        return createElement('div', {
            attrs: {
                class: 'image-color-pick ui-div',
                style: 'width:' + (2 * 32) + 'px;height:' + (6 * 32) + 'px;'
            }
        }, divs);
    },
    methods: {
        styleStr: function(img, i, x, y, color){
            var str = 'left:' + ( x * 32 ) + 'px;top:'+ ( y * 32 ) +';background:' + color + ';';
            if(Number(img.colorIndex) === Number(i)){
                str += 'outline:3px solid #afafaf;z-index:1;'
            }else{
                str += 'z-index:0;'
            }
            return str;
        },
        colorClick: function(e){
            var div = e.target,
            idArr = div.id.split('_')
            this.$emit('color-click', idArr[1]);
        }
    }
});
```

## 3 - The html and css files

```css
.wrap_main{
  background:gray;
}
.ui-div{
  position:relative;
  display:inline-block;
  margin:20px;
}
.image-div-grid{
    background-image:
      linear-gradient(45deg, #bbb 25%, transparent 25%), 
      linear-gradient(135deg, #bbb 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, #bbb 75%),
      linear-gradient(135deg, transparent 75%, #bbb 75%);
    background-size:25px 25px; /* Must be a square */
    background-position:0 0, 12.5px 0, 12.5px -12.5px, 0px 12.5px; /* Must be half of one side of the square */
}
.image-div-grid-px{
  position:absolute;
  width:32px;
  height:32px;
}
.image-color-pick{

}
.image-color-pick-div{
  position:absolute;
  width:32px;
  height:32px;
}
```

```html
<html>
  <head>
    <title>vue example</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="comp/image-div-grid.js"></script>
    <script src="comp/image-color-pick.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```


## 4 - Conclusion

I did not get around to finishing everything that i wanted to do with this vuejs example as of this writing. I am not happy with the way things pan out, and will get around to writing the example over again at some point when I get more time to work on this one. I have been getting around to editing some of this vuejs content of mine, and if I keep up with it I should come back to this one again at some point in the future.