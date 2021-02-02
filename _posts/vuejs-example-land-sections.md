---
title: Land sections vuejs example
date: 2021-02-02 13:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 794
updated: 2021-02-02 14:35:44
version: 1.10
---

One of my many canavs examples in the works is a game prototype that I am calling just simply Mr Sun. So far I just have a general idea of the kind of game that I would like to make, but many of the core logic features are still not togeather. The general idea at least is that there is a sun object that is surroudned by world section objects, and the player can move the sun object around inside of this sircle of world objects. When moving the sun that changes the distance between the sun and any given world section and that in turn can effect each world land section object in a diferent way.


So I thought I would make a simple vuejs example of the basic idea of the game, and have a few menus to switch between. The focus of this vuejs example will be to not make the game a canvas project, but more of a front end project in general where I am using vuejs as a framework to pull everything togeather.

<!-- more -->

## 1 - A utils lib

For this vuejs example I have a main vuejs library that contains a few methods that I might be useing accross vue components and other javaScript files. As of this writing I just have a distance formula that I am using to find the distance between the sun, and a given land section.

```js
var utils = {};
 
utils.pi2 = Math.PI * 2;
 
// get a distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

## 1 - The main menu.js file and vue instance

I then have a main vuejs instance as I do with all of my vuejs examples thus far as ushual. That is that this is the main vuejs instance that I will be attaching to the hard coded html with using the vue el option. This is based off of what I worked out with my other vuejs example where I worked out a basic menu system. So the basic idea of this is that I have this main vue.js instance that renders a navagation bar that can be used to chnage what the current menu is. Then a component added in one of the many addituiona files that add menus is used to redner the rest of the view. This allows me to create a collection of menus each of which provide a user interface to work with an aspect of the game state.

```js
(function(){
 
    var SUN_RADIUS = 16,
    CENTERX = 0,
    CENTERY = 0,
    SECTION_DIST = 100;
 
    var createSections = function(){
        var i = 0,
        radian,
        sections = [];
        while(i < 12){
            radian = utils.pi2 * (i / 12);
            sections.push({
                x: CENTERX + Math.cos(radian) * SECTION_DIST,
                y: CENTERY + Math.sin(radian) * SECTION_DIST,
                distance: 0,
                per: 0
            });
            i += 1;
        }
        return sections;
    };
 
    var vm = new Vue({
        el: '#app',
        render: function(createElement){
            var vm = this;
            var children = [];
            // create menu buttons
            var menuButtons = [];
            vm.$data.menus.forEach(function(menuName){
                menuButtons.push(createElement('input', {
                    attrs:{
                        id:'button_changemenu_' + menuName,
                        type:'button',
                        value: menuName
                    },
                    on: {
                        'click': vm.click
                    }
                }));
            });
            children.push(createElement('div', {class:'navbar'}, menuButtons));
            // create menus
            var menus = [];
            vm.$data.menus.forEach(function(menuName){
                menus.push(createElement('menu-' + menuName, {
                    props:{
                       currentMenu: vm.$data.currentMenu,
                       sun: vm.$data.sun,
                       sections: vm.$data.sections
                    },
                    on: {
                        'set-sunpos-ad': vm.setSunPosAD
                    }
                }));
            });
            children.push(createElement('div', {class:'wrap_menu'}, menus));
            return createElement('div', {class:'wrap_main'}, children);
        },
        data: {
            menus: ['home', 'sun', 'sections'],
            sections: createSections(),
            currentMenu: 'sections',
            sun: {
               x: CENTERX,
               y: CENTERY,
               r: SUN_RADIUS,
               a: 0,     // angle from center point (0,0)
               dist: 0,
               MAXDIST: SECTION_DIST
            }
        },
        mounted: function(){
            this.setSunPosAD(Math.PI / 180 * 20, 50);
            this.updateSections();
        },
        methods: {
            // a button was clicked
            click: function (e) {
                var button_el = e.target,
                dat = this.$data,
                idArr = button_el.id.split('_');
                console.log(idArr);
                if(idArr[1] === 'changemenu'){
                    dat.currentMenu = idArr[2];
                }
            },
            // set sun position with the given angle and dist
            setSunPosAD: function(a, d){
                var sun = this.$data.sun;
                sun.dist = d;
                sun.dist = sun.dist < 0 ? 0 : sun.dist;
                sun.dist = sun.dist > sun.MAXDIST ? sun.MAXDIST : sun.dist;
                sun.a = a;
                sun.x = Math.round(CENTERX + Math.cos(sun.a) * sun.dist);
                sun.y = Math.round(CENTERY + Math.sin(sun.a) * sun.dist);
                this.updateSections();
            },
            // update sections based on current sun position
            updateSections: function(){
                var dat = this.$data,
                sun = dat.sun;
                dat.sections = dat.sections.map(function(section){
                    section.distance = utils.distance(section.x, section.y, sun.x, sun.y);
                    section.per = section.distance / (SECTION_DIST * 2);
                    return section;
                });
            }
        }
    });
 
}());
```

## 2 - The menus thus far

So then the main vuejs instance will render a navagation bar, and whatever the current menu is. So then I should take a moment to go over these menus as they currently stand.

### 2.1 - simple home menu

I have a simple home section that I might do away with in future edits of this vuejs example if I do not find something more usfuls to do with it. For now I am just using it as a place to redner basic information about the state of the game.

```js
Vue.component('menu-home', {
  props: ['currentMenu', 'sun'],
  data: function () {
    return {
    };
  },
  template: '<div v-if="currentMenu === \'home\'">'+
      '<h1>Mr Sun Land Sections: </h1>'+
      '<p>Sun Position: {{ sun.x }}, {{ sun.y }}</p>'+
      '<p>Sun Distance from center: {{ sun.dist }} </p>'+
      '<p>Sun Angle from center: {{ (sun.a / (Math.PI * 2) * 360).toFixed(2) }} (degrees). </p>'+
  '</div>'
});
```

### 2.2 - The sun menu

I have a main sun menu where I am just providing an interface to change the position of the sun object relative to the other world sections.

```js

(function(){
 
    // common set of methods
    var methods = {
        setA: function(e){
             this.setPos(Math.PI / 180 * e.target.value, this.$props.sun.dist);
        },
        setD: function(e){
             this.setPos(this.$props.sun.a, e.target.value);
        },
        center: function(e){
            this.$emit('set-sunpos-ad', 0, 0);
        },
        setPos: function(a, d){
            this.$emit('set-sunpos-ad', Number(a), Number(d));
        }
    };
 
    // sun-info component
    Vue.component('sun-info',{
        props: ['sun'],
        template: '<div> position: {{ sun.x }}, {{ sun.y}} </div>'
    });
 
    // text input ui
    Vue.component('sun-ui-pos',{
        props: ['sun'],
        template: '<div>'+
            '<p>Angle: <input type="text" v-bind:value="sun.a / (Math.PI * 2) * 360" v-on:keyup="setA"></p>'+
            '<p>Distance: <input type="text" v-bind:value="sun.dist" v-on:keyup="setD"></p>'+
            '<p><input type="button" value="center" v-on:click="center"></p>'+
        '</div>',
        methods: methods
    });
 
    // main menu-sun component
    Vue.component('menu-sun', {
        props: ['currentMenu', 'sun'],
        data: function () {
            return {};
        },
        render: function(createElement){
            var children = [];
            var vm = this;
            if(this.$props.currentMenu === 'sun'){
                // push sun info
                children.push( createElement('sun-info', {props: this.$props}) );
                // push sun-ui-pos
                children.push( createElement('sun-ui-pos', {
                    props: this.$props, 
                    on: {
                        'set-sunpos-ad': function(a, b){
                            vm.setPos(a, b);
                        }
                    }
                 }));
            }
            return createElement('div', children);
        },
        methods: methods
    });
}());
```

### 2.3 - The sections menu

I then have an additional sections menu where I can view infor about each section.

```js
(function(){
 
    Vue.component('sections-info', {
        props: ['sections'],
        template: '<div>'+
            '<ul>' +
               '<li v-for="sec, i in sections" >section: {{i}}, dist: {{ sec.distance.toFixed(2) }}, per: {{ sec.per.toFixed(2) }}</li>'+
            '</ul>'+
        '</div>'
    });

    Vue.component('menu-sections', {
        props: ['currentMenu', 'sun', 'sections'],
        template: '<div v-if="currentMenu === \'sections\'">'+
            '<sections-info v-bind:sections="sections"></sections-info>'+
        '</div>'
    });
}());
```

## 3 - The html

I then just need a little html and css to pull this all togeather.


The html:
```html
<html>
  <head>
    <title>vue example of an idle game</title>
    <script src="/js/vuejs/2.6.10/vue.js"></script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app"></div>
    <script src="./lib/utils.js"></script>
    <script src="./menus/home.js"></script>
    <script src="./menus/sun.js"></script>
    <script src="./menus/sections.js"></script>
    <script src="./menu.js"></script>
  </body>
</html>
```

The css file:

```css
.wrap_main{
}
.wrap_menu{
  padding:10px;
  background:#afafaf;
}
.navbar{
  padding:5px;
  text-align:center;
  background:gray;
}
```

## 4 - Conclusion

The basic idea that I had in mind for this vuejs example is up and running all ready, but there is much more work to do in order to get this working the way that I really had in mind. I would like to start adding a lot of features that will help me to get the core logic of the game, and all the features that I want working. This might prove to be a good move for this idea that I had in mind for a game in the sense that I am putting aside everything that has to do with graphics for the most part and am focusing more so on just working out the rules and machanics of the game.

If all goes well a simple largly text only, or with just simple canvas graphics only type of game should still be fun if I do this right. Then it is just a matter of using what I worked out here in an actualy full canvas game.
