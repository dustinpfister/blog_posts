---
title: Land sections vuejs example
date: 2021-02-02 13:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 794
updated: 2021-02-02 13:36:25
version: 1.2
---

One of my many canavs examples in the works is a game prototype that I am calling just simply Mr Sun. So far I just have a general idea of the kind of game that I would like to make, but many of the core logic features are still not togeather. So I thought I would make a simple vuejs example of the basic idea of the game, and have a few menus to switch between. The focus of this vuejs example will be to not make the game a canvas project, but more of a front end project in general where I am using vuejs as a framework to pull everything togeather.

<!-- more -->

## 1 - A utils lib

```js
var utils = {};
 
utils.pi2 = Math.PI * 2;
 
// get a distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
```

## 1 - The main menu.js file and vue instance

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