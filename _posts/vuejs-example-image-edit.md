---
title: A vuejs example of a simple image edit app
date: 2020-07-27 16:57:00
tags: [vuejs]
layout: post
categories: vuejs
id: 687
updated: 2021-02-12 11:56:29
version: 1.10
---

It has been a long time sense I wrote a post on [vuejs](https://vuejs.org/v2/guide/), so I thought I would make a vuejs example post to help expand that collection. For this [vuejs example](/2021/02/04/vuejs-example/) the idea of a simple image editor application came to mind as just one of many ideas that might prove to be fun. So maybe something like that is in order when it comes to expanding on what can be done with vuejs. After all once I cover all the basics the only thing to do from that point forward is to start to create some actual projects one one type or another.

The general idea I have for this image editor application is to not make any kind of major project out of it that will be a full blown image manipulation program. All I want to do is just have a way to make my own image asset standard, and have a simple little tool that can be used to create and edit such a standard.

<!-- more -->

## 1 - The main.js file for this Vuejs powered image editor

First off here is the main vuejs instance that will make use of some components that I worked out for this example. For the main vue instance I went with a simple static template rather than a render function. However in the template I am using some components that are making use of render functions when it comes to drawing the current state of the image grid.

```js
var vm = new Vue({
    el: '#app',
    template: '<div class="wrap_main">'+
        '<div style="text-align:center;">'+
            '<image-color-pick v-bind:img="imgs[currentImage]" v-on:color-click="colorClickHandler"></image-color-pick>'+
            '<image-div-grid v-bind:img="imgs[currentImage]" v-on:px-click="pxClickHandler"></image-div-grid>'+
        '</div>' +
        '<div style="text-align:center;">'+
        '<image-text-pixmap v-bind:imgs="imgs" v-on:load-json="load"></image-text-pixmap>'+
        '</div>' +
    '</div>',
    data: function(){
        var data = {
           currentImage: 0,
           imgs : [IMG()]
        };
        return data;
    },
    methods: {
        // set the current image pix pos to the current image color index
        pSet: function(x, y){
            var dat = this.$data;
            var img = dat.imgs[dat.currentImage];
            var pxIndex = y * img.width + Number(x);
            img.data[pxIndex] = Number(img.colorIndex);
            // force update all children
            this.$children.forEach(function(child){
                if(child.updateText){
                    child.updateText();
                }
            });
        },
        pxClickHandler: function(x, y){
            this.pSet(x, y);
        },
        colorClickHandler: function(index){
            var dat = this.$data;
            var img = dat.imgs[dat.currentImage];
            img.colorIndex = index;
        },
        load: function(json){
            var pixmapObj = JSON.parse(json);
            var imgs = IMG.createIMGSFromPixmap(pixmapObj);
            //console.log(imgs);
            this.$data.imgs = Vue.observable(imgs);
//this.$data.imgs = imgs;
        }
    }
});
```

## 2 - The grid div component

I wanted to break this project down into a few components as a way to make things a little more fine grain. If I keep working on this I will most likely end up with a lot of components actually, but one that I am really going to want for this image editor is a components that will draw the current state of the current image.

```js
Vue.component('image-div-grid', {
    props: ['img'],
    render: function(createElement){
        var img = this.$props.img,
        vm = this,
        divs = [];
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
            idArr = div.id.split('_');
            this.$emit('px-click', idArr[1], idArr[2]);
            this.$forceUpdate();
        }
    }
});
```

## 3 - The Color picker component

I will want to have another component that will be used to set the current color to draw with when I click a div element in the image div grid component.

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

## 3 - The json component

I will then want an additional component that I can use to save and load the state of an animation. There are a number of things that I can do when it comes to this, but for now I just want a text area element that I can use to copy and paste the JSON to and from.

```js
Vue.component('image-text-pixmap', {
    props: ['imgs'],
    data: function(){
        return {
            json: '',
            vaild: false,
            mess: ''
        };
    },
    template: '<div class="ui-div">'+
        '<h3>Pixmap JSON</h3>'+
        '<p v-bind:style="messStyle()">vaild: {{ vaild }}, mess: {{ mess }}</p>' +
        '<button v-on:click="load">load</button><br>'+
        '<textarea cols="70" rows="15" v-text="json" v-on:keyup="keyup"></textarea>'+
    '</div>',
    mounted: function(){
        this.updateText();
    },
    methods: {
        messStyle: function(){
            if(this.$data.valid){
                return 'color:lime;'
            }
            return 'color:red;'
        },
        // vaidate the JSON
        validate: function(){
            var dat = this.$data;
            dat.valid = false;
            try{
                // the json should parse okay
                var obj = JSON.parse(this.$data.json);
                dat.valid = true;
                dat.mess = 'JSON looks good';
                // look for fractions of a frame
                var i = 0,
                aniKeys = Object.keys(obj.ani),
                len = aniKeys.length;
                while(i < len){
                    var key = aniKeys[i];
                    var ani = obj.ani[key]
                    var size = ani.w * ani.h;
                    var frames = ani.data.length / size
                    if(frames % 1 != 0){
                        dat.valid = false;
                        dat.mess = 'Fraction of a frame frameCount=' + frames;
                        break;
                    }
                    i += 1;
                }
            }catch(e){
                dat.mess = 'Error parsing JSON';
            }
        },
        // what to do on a keyup event
        keyup: function(e){
            this.$data.json = e.target.value;
            this.validate();
        },
        // emit a 'load-json' event
        load: function(){
            var dat = this.$data;
            this.validate();
            if(dat.valid){
                this.$emit('load-json', dat.json);
            }
        },
        // update textarea
        updateText : function(){
            var pixmap = IMG.createPixmap({
                w: 8,
                h: 8,
                palette: this.$props.imgs[0].palette,
                imgs: this.$props.imgs
            });
            this.$data.json = JSON.stringify(pixmap);
            //!!! I should not have to do this, but it seems like I have to
            this.$el.querySelectorAll('textarea')[0].value = this.$data.json;
            this.validate();
        }
    }
});
```

## 4 - The html and css files

I am then just going to want a little css and html for this and then all should be well.

```css
.wrap_main{
  background:#2f2f2f;
}
.ui-div{
  position:relative;
  display:inline-block;
  background:#8f8f8f;
  margin:20px;
  outline:2px solid white;
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
    <script src="lib/img.js"></script>
    <script src="comp/image-div-grid.js"></script>
    <script src="comp/image-color-pick.js"></script>
    <script src="comp/image-text-pixmap.js"></script>
    <script src="main.js"></script>
  </body>
</html>
```


## 5 - Conclusion

I did not get around to finishing everything that i wanted to do with this vuejs example as of this writing. I am not happy with the way things pan out, and will get around to writing the example over again at some point when I get more time to work on this one. I have been getting around to editing some of this vuejs content of mine, and if I keep up with it I should come back to this one again at some point in the future.