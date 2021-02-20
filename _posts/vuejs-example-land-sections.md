---
title: Land sections vuejs example
date: 2021-02-02 13:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 794
updated: 2021-02-20 16:22:47
version: 1.23
---

One of my many [canvas examples](/2020/03/23/canvas-example/) in the works is a game prototype that I am calling just simply Mr Sun. So far I just have a general idea of the kind of game that I would like to make, but many of the core logic features are still not together. The general idea at least is that there is a sun object that is surrounded by world section objects, and the player can move the sun object around inside of this circle of world objects. When moving the sun that changes the distance between the sun and any given world section and that in turn can effect each world land section object in a different way.

Tyhe basic idea then is simple enough, but what has proved to not be so simple is what to do when it comes to building on top of that simple general idea. There is a lot that comes to mind when it comes to adding features that will result in an interesting game that people might want to play. There are in fact maybe a few to many ideas actaully, but I am thinking it might be fun to take it in some kind of snadbox or god game type direction maybe.

So I thought I would make a simple [vuejs examples](/2021/02/04/vuejs-example/) of the basic idea of the game, and have a few menus to switch between. The focus of this vuejs example will be to not make the game a canvas project, but more of a front end project in general where I am using vuejs as a framework to pull everything together.

<!-- more -->

## 1 - A utils lib

For this vuejs example I have a main vuejs library that contains a few methods that I might be using across vue components and other javaScript files. This is a kind of file that I find myself making for many of my examples and not just with vuejs. Each time I work on an actual project of one kind or another there ways seems to be a need for some kind of general utility library like lodash. However I often prefer to make a custom cut form of such a library where I just have methods that I am actually going to use in the project. So this utils.js file is then just such a library.

As of this writing in this file I have a distance formula that I am using to find the distance between the sun, and a given land section, however it is also a function that I might use all over the place if this project does continue to grow.

I also have some typical methods that I often use in many of my [canvas examples](/2020/03/23/canvas-example/) such as this create canvas and get canvas relative methods that I use to just create a canvas method and also to help get a canvas rather than window relative pointer object position.

```js
var utils = {};
 
utils.pi2 = Math.PI * 2;
 
// mathematical modulo
utils.mod = function(x, m) {
    return (x % m + m) % m;
};
 
// get a distance between two points
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};
 
// create a canvas element
utils.createCanvas = function(opt){
    opt = opt || {};
    opt.container = opt.container || document.getElementById('canvas-app') || document.body;
    opt.canvas = document.createElement('canvas');
    opt.ctx = opt.canvas.getContext('2d');
    // assign the 'canvas_example' className
    opt.canvas.className = 'canvas_example';
    // set native width
    opt.canvas.width = opt.width === undefined ? 320 : opt.width;
    opt.canvas.height = opt.height === undefined ? 240 : opt.height;
    // translate by 0.5, 0.5
    opt.ctx.translate(0.5, 0.5);
    // disable default action for onselectstart
    opt.canvas.onselectstart = function () { return false; }
    opt.canvas.style.imageRendering = 'pixelated';
    opt.ctx.imageSmoothingEnabled = false;
    // append canvas to container
    opt.container.appendChild(opt.canvas);
    return opt;
};
 
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect(),
    pos = {
        x: (e.changedTouches ? e.changedTouches[0].clientX : e.clientX) - bx.left,
        y: (e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - bx.top,
        bx: bx
    };
    // ajust for native canvas matrix size
    pos.x = Math.floor((pos.x / canvas.scrollWidth) * canvas.width);
    pos.y = Math.floor((pos.y / canvas.scrollHeight) * canvas.height);
    // prevent default
    e.preventDefault();
    return pos;
};
```

## 1 - The main menu.js file and vue instance

I then have a main vuejs instance as I do with all of my vuejs examples thus far as usual. That is that this is the main vuejs instance that I will be attaching to the hard coded html with using the vue el option. This is based off of what I worked out with my other vuejs example where I worked out a basic menu system. So the basic idea of this is that I have this main vue.js instance that renders a navigation bar that can be used to change what the current menu is. Then a component added in one of the many additional files that add menus is used to render the rest of the view. This allows me to create a collection of menus each of which provide a user interface to work with an aspect of the game state.

```js
(function(){
 
    var CENTERX = 160,
    CENTERY = 120,
    SECTION_DIST = 100,
    SECTION_RADIUS = 16,
    SECTION_TEMP_KELVIN_MIN = 0,    // Think in kelvin when it comes to a standard unit for temp
    SECTION_TEMP_KELVIN_MAX = 5778,
    SUN_RADIUS = 16,
    SUN_MAXDIST = SECTION_DIST - SUN_RADIUS - SECTION_RADIUS;
 
    var maps = [
        '0,0,0,0,0,0,0,0,0,0,' +
        '0,0,0,0,0,0,0,0,0,0,' +
        '0,0,0,0,0,0,0,0,0,0,' +
        '0,0,0,0,0,0,0,0,0,2,' +
        '0,0,0,0,0,0,0,0,0,2,' +
        '0,0,0,0,0,0,0,0,2,2,' +
        '0,0,0,0,0,0,0,2,2,3',
        '0,0,2,0,0,0,0,2,2,2,' +
        '0,2,3,2,0,0,0,2,2,2,' +
        '0,0,3,0,0,0,2,2,2,2,' +
        '0,0,0,0,0,0,2,2,2,2,' +
        '2,0,0,0,0,0,2,2,2,2,' +
        '2,2,0,0,0,0,2,2,2,2,' +
        '3,2,2,0,0,0,0,2,2,2',
        '2,2,2,2,2,2,2,2,2,2,' +
        '2,2,2,2,2,2,2,2,2,2,' +
        '2,2,2,2,2,2,2,2,2,2,' +
        '2,2,2,2,2,2,2,2,2,2,' +
        '2,2,2,2,2,2,2,2,2,2,' +
        '2,2,2,2,2,2,2,2,2,2,' +
        '2,2,2,2,2,2,2,2,2,2',
        '2,0,0,0,0,0,0,0,0,0,' +
        '2,0,0,0,0,0,0,0,0,0,' +
        '2,0,0,0,0,0,0,0,0,0,' +
        '2,2,0,0,0,0,0,0,0,0,' +
        '2,2,0,0,0,0,0,0,0,0,' +
        '2,2,0,0,0,0,0,0,0,0,' +
        '2,2,2,0,0,0,0,0,0,0'
 
    ];
 
    var createGrid = function(indexString){
        indexString = indexString || '';
        var grid = {
            w: 10,
            h: 7,
            cells: []
        },
        i = 0,
        len = grid.w * grid.h,
        indexArr = indexString.split(',')
        while(i < len){
            grid.cells.push({
               i: i,
               x: i % grid.w,
               y: Math.floor(i / grid.w),
               tileIndex: indexArr[i] || 0
            });
            i += 1;
        }
        return grid;
    };
 
    // create sections array
    var createSections = function(){
        var i = 0,
        radian,
        sections = [];
        while(i < 12){
            radian = utils.pi2 * (i / 12);
            sections.push({
                i: i,
                x: CENTERX + Math.cos(radian) * SECTION_DIST,
                y: CENTERY + Math.sin(radian) * SECTION_DIST,
                r: SECTION_RADIUS,
                distance: 0,
                per: 0,
                sheetIndex: 0,
                temp: {
                    per: 0,
                    kelvin: 0,
                    displayUnit: 'fahrenheit',
                    displayTemp: 0
                },
                grid: createGrid(maps[i])
            });
            i += 1;
        }
        return sections;
    };
 
    var updateSections = function(data){
        var sun = data.sun;
        data.sections = data.sections.map(function(section){
            // set section percent based on distance to sun
            setSectionPer(section, sun);
            // set section temp
            setSectionTemp(section);
            // set sheet index based on section temp
            section.sheetIndex = 0;
            if(section.temp.kelvin >= 274){
                section.sheetIndex = 1;
            }
            if(section.temp.kelvin >= 327){
                section.sheetIndex = 2;
            }
            return section;
        });
    };
 
    // set Section Temp helper
    var setSectionTemp = function(section){
        var temp = section.temp,
        per = Math.log( 1 + section.per) / Math.log( 2 + 36000 * (1 - section.per));
        temp.kelvin = SECTION_TEMP_KELVIN_MIN + per * SECTION_TEMP_KELVIN_MAX;
        temp.per = temp.kelvin / SECTION_TEMP_KELVIN_MAX;
        // display unit defaults to kelvin
        temp.displayTemp = temp.kelvin
        if(temp.displayUnit = 'fahrenheit'){
            temp.displayTemp = (temp.kelvin - 273.15) * 9 / 5 + 32;
        }
    };
 
    // set Section Per helper
    var setSectionPer = function(section, sun){
        section.distance = utils.distance(section.x, section.y, sun.x, sun.y);
        var maxDist = section.distance - section.r - sun.r;
        section.distance = section.distance > maxDist ? maxDist : section.distance;
        section.per = 1 - section.distance / (SECTION_DIST * 2);
        section.per = section.per > 1 ? 1 : section.per;
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
            menus: ['home', 'sun', 'sections', 'sections-table'],
            sections: createSections(),
            currentMenu: 'sections',
            sun: {
               cx: CENTERX,
               cy: CENTERY,
               x: CENTERX,
               y: CENTERY,
               r: SUN_RADIUS,
               a: 0,     // angle from center point (0,0)
               dist: 0,
               MAXDIST: SUN_MAXDIST
            }
        },
        mounted: function(){
            //this.setSunPosAD(Math.PI / 180 * 0, 70);
            //this.updateSections();
 
            updateSections(this.$data);
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
                //this.updateSections();
                updateSections(this.$data);
            }
        }
    });
 
}());
```

## 2 - The menus thus far

So then the main vuejs instance will render a navigation bar, and whatever the current menu is. So then I should take a moment to go over these menus as they currently stand.

### 2.1 - simple home menu

I have a simple home section that I might do away with in future edits of this vuejs example if I do not find something more useful to do with it. For now I am just using it as a place to render basic information about the state of the game.

```js
Vue.component('menu-home', {
  props: ['currentMenu', 'sun'],
  data: function () {
    return {
    };
  },
  template: '<div v-if="currentMenu === \'home\'">'+
      '<div class="menu_item">'+
      '<h1>Mr Sun Land Sections: </h1>'+
      '<p>Sun Position: {{ sun.x }}, {{ sun.y }}</p>'+
      '<p>Sun Distance from center: {{ sun.dist }} </p>'+
      '<p>Sun Angle from center: {{ (sun.a / (Math.PI * 2) * 360).toFixed(2) }} (degrees). </p>'+
      '</div>'+
  '</div>'
});
```

### 2.2 - The sun menu

I have a main sun menu where I am just providing an interface to change the position of the sun object relative to the other world sections.

```js
// main menu-sun component
Vue.component('menu-sun', {
    props: ['currentMenu', 'sun', 'sections'],
    data: function () {
        return {};
    },
    render: function(createElement){
        var children = [];
        var vm = this;
        if(this.$props.currentMenu === 'sun'){
            // push sun info
            children.push( createElement('sun-info', {props: this.$props}) );
            children.push( createElement('sun-ui-canvas', {
                props: this.$props,
                on: {
                    'set-sunpos-ad': function(a, b){
                        vm.setPos(a, b);
                    }
                }
             }));
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
    }
});
```

### 2.3 - The sections menu

I then have an additional sections menu where I can view info about each section.

```js
Vue.component('sections-ui-cellaction', {
    props: ['cellAction'],
    template: '<div class="menu_item">'+
        '<h3>Cell Action Select</h3>' +
        '<p> Current Index: {{ cellAction }} </p>' +
        '<p>' + 
            '<button v-on:click="$emit(\'set-cellaction\',0)" >Water</button>' +
            '<button v-on:click="$emit(\'set-cellaction\',2)" >Sand</button>' +
            '<button v-on:click="$emit(\'set-cellaction\',3)" >Grass</button>' +
        '</p>' +
    '</div>'
});
 
Vue.component('menu-sections', {
    props: ['currentMenu', 'sun', 'sections'],
    data: function(){
        return {
            currentSectionIndex: 0,
            section: this.$props.sections[0],
            cellAction: 0
        }
    },
    template: '<div v-if="currentMenu === \'sections\'">' +
        '<sections-ui-select v-bind:section="section" v-on:step-section="step" ></sections-ui-select>' +
        '<sections-ui-cellaction v-bind:cellAction="cellAction" v-on:set-cellaction="setCellAction" ></sections-ui-cellaction>' +
        '<sections-ui-grid v-bind:section="section" v-on:click-cell="clickCell" ></sections-ui-grid>' +
    '</div>',
    methods: {
        step: function(deltaIndex){
            var dat = this.$data;
            dat.currentSectionIndex += deltaIndex;
            dat.currentSectionIndex = utils.mod(dat.currentSectionIndex, this.$props.sections.length);
            dat.section = this.$props.sections[dat.currentSectionIndex];
        },
        clickCell: function(cell){
            var dat = this.$data;
            if(dat.cellAction >= 0){
                cell.tileIndex = dat.cellAction;
            }
        },
        setCellAction: function(actionIndex){
            console.log(actionIndex);
            this.$data.cellAction = actionIndex;
        }
    }
});
```

### 2.4 - The sections table menu

The whole point of this example is to work out a simple form of a game that I would like to actually be a major canvas game with great graphics and so forth. In this form of the game the focus is not the final product but a side project where I am working out the core logic of what the game should be. So I would like to have a menu that will display the current state of all of the land sections as a way to vue what is going on with various properties of these land section objects.

```js
Vue.component('menu-sections-table', {
    props: ['currentMenu', 'sun', 'sections'],
    template: '<div v-if="currentMenu === \'sections-table\'">'+
        '<sun-ui-pos ' +
            'v-bind:currentMenu="$props.currentMenu" ' + 
            'v-bind:sun="$props.sun" ' +
            'v-bind:sections="$props.sections" ' +
            'v-on:set-sunpos-ad="sunpos"></sun-ui-pos>'+
        '<sections-info-table v-bind:sections="sections"></sections-info-table>'+
    '</div>',
    methods:{
        sunpos: function(a, b){
            this.setPos(a, b)
        }
    }
});
```

## 3 - The mixin folder

I have a mixin folder where I have objects that contain vuejs features that I would like to have across all vuejs instances. For now this is just a set of methods that have to do with setting the position of the sun object but if I continue working on this project it is possible that this folder might grow with additional global mixins that I will want for this example.

It is also possible that some of the methods here might be added to the utils library, a whole new vanilla javaScript library, or just removed completely if I find that the method is not needed. However it would seem that I might want to have a place to park methods that I want to have to use across all components and as such this is the dumping ground for them.

### 3.1 - Sun methods

For now I just have some methods that have to do with setting the position of the sun object.

```js
Vue.mixin({methods : {
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
}});
```

## 4 - The components

For this vuejs example I have made a number of components that I have pulled into there own files in a comp folder in the root of the example folder. These are a whole bunch of components that are used in each of the menus for various things like moving the position of the sun object with a canvas element, but then there are others that do the same thing only with direct text input of an angle and distance from a center point.

### 4.1 - sections-info-table

In the sections menu I have a sections grid component that displays the current state of a land section object.

```js
Vue.component('sections-info-table', {
    props: ['sections'],
    template: '<div class="menu_item">'+
        '<table>' +
           '<tr> <th>index</th> <th>distance</th> <th>per</th> <th>pos</th> <th>temp</th> </tr>'+
           '<tr v-for="sec, i in sections" >'+
              '<td>{{i}}</td>'+
              '<td>{{ sec.distance.toFixed(2) }}</td>'+
              '<td>{{ sec.per.toFixed(2) }}</td>' +
              '<td>{{ Math.round(sec.x) + \', \' + Math.round(sec.y) }}</td>' +
              '<td>{{ Math.round(sec.temp.displayTemp)  }} {{ sec.temp.displayUnit }} ( {{ sec.temp.kelvin.toFixed(2) }} kelvin) {{ Math.round(sec.temp.per * 100) }}%</td>' +
           '</tr>'+
        '</table>'+
    '</div>'
});
```

### 4.2 - sections-ui-grid

In the sections menu I have a sections grid component that displays the current state of a land section object.

```js
Vue.component('sections-ui-grid', {
    props: ['section'],
    data: function(){
        return {
           gridHeight: Math.round(this.$props.section.grid.h * 32),
           gridWidth: Math.round(this.$props.section.grid.w * 32)
        };
    },
    template: '<div class="menu_item">'+
        '<div v-bind:style="\'margin-left:auto;margin-right:auto;position:relative;'+
        'height:\'+gridHeight+\'px;width:\'+gridWidth+\'px;\'">'+
            '<div class="cell" v-for="cell in section.grid.cells" v-bind:style="setStyle(cell)" v-on:click="clickCell(cell)"></div>' +
        '</div>'+
    '</div>',
    methods: {
        // set a style for a cell
        setStyle: function(cell){
            var sheets = [
                ['cyan', 'blue', '#0000ff', '#008f8f'],
                ['blue', 'red', 'yellow', 'green'],
                ['red', 'red', 'brown', 'black']
            ];
            var color = sheets[this.$props.section.sheetIndex];
            return 'position:absolute;'+
                'left:'+Math.floor(32 * cell.x)+'px;'+
                'top:'+Math.floor(32 * cell.y)+'px;'+
                'background:'+color[cell.tileIndex]+';'+
                'width:32px;height:32px;';
        },
        // what to do if a cell is clicked
        clickCell: function(cell){
            this.$emit('click-cell', cell)
        }
    }
});
```

### 4.3 - sections-ui-select

In the sections menu I am going to want to have a way to select a current land section object. This current land section object can then be worked with using other components in the sections menu.

```js
// ui for selecting the current section index to work on
Vue.component('sections-ui-select', {
    props: ['section'],
    template: '<div class="menu_item">'+
        '<h3>Select current world section</h3>'+
        '<div><p>#{{ section.i }}, distance: {{ section.distance.toFixed(2) }}</p></div>' +
        '<div><button v-on:click="prev">prev</button> | '+
        '<button v-on:click="next">next</button></div>'+
    '</div>',
    methods: {
        next: function(){
            this.$emit('step-section', 1);
        },
        prev: function(){
            this.$emit('step-section', -1);
        }
    }
});
```

### 4.4 - sun-base

Here I have a file with some base components for the sun menu. I have one that is used to just display basic info about the sun object, and another than can be used to set the position of the sun with direct text input.

```js
// sun-info component
Vue.component('sun-info',{
    props: ['sun'],
    template: '<div class="menu_item"><h3>Sun Info</h3><p>position: {{ sun.x }}, {{ sun.y}}</p></div>'
});
 
// text input ui
Vue.component('sun-ui-pos',{
    props: ['sun'],
    template: '<div class="menu_item">'+
        '<h3>Change Sun Position</h3>'+
        '<p>Angle: <input type="text" v-bind:value="sun.a / (Math.PI * 2) * 360" v-on:keyup="setA"></p>'+
        '<p>Distance: <input type="text" v-bind:value="sun.dist" v-on:keyup="setD"></p>'+
        '<p><input type="button" value="center" v-on:click="center"></p>'+
    '</div>'
});
```

### 4.5 - sun-ui-canvas

The is a component that I am using in the sun menu that is used to display the current position of the sun relative to the land section objects using a canvas element. The component can also be used as a way to set the position of the sun by clicking and dragging the sun object around in the canvas element.

```js
Vue.component('sun-ui-canvas',{
    props: ['sun', 'sections'],
    data: function(){
        return {
           down: false,
           canvasObj: null,
           canvas: null,
           ctx: null
        };
    },
    template: '<div class="menu_item">'+
        '<h3>Sun Position canvas</h3>'+
        '<p>mousedown: {{ down }}<p>' +
        '<div id="canvas-app-sun-pos"></div>' +
    '</div>',
    mounted: function(){
        var vm = this;
        var dat = vm.$data,
        sun = vm.$props.sun;
        dat.canvasObj = utils.createCanvas({
            container: document.getElementById('canvas-app-sun-pos'),
            width: 320,
            height: 240
        });
        dat.canvas = dat.canvasObj.canvas;
        dat.ctx = dat.canvasObj.ctx;
 
        var pointerDown = function(){
           dat.down = true;
        };
        var pointerUp = function(){
           dat.down = false;
        };
        var pointerMove = function(e){
           e.preventDefault();
           if(dat.down){
               var pos = utils.getCanvasRelative(e),
               a = Math.atan2(sun.cy - pos.y, sun.cx - pos.x) + Math.PI,
               d = utils.distance(pos.x, pos.y, sun.cx, sun.cy);
               vm.$emit('set-sunpos-ad', Number(a), Number(d));
           }
        };
 
        dat.canvas.addEventListener('mousedown', pointerDown);
        dat.canvas.addEventListener('mouseup', pointerUp);
        dat.canvas.addEventListener('mousemove', pointerMove);
        dat.canvas.addEventListener('touchstart', pointerDown);
        dat.canvas.addEventListener('touchend', pointerUp);
        dat.canvas.addEventListener('touchmove', pointerMove);
        vm.draw();
    },
    watch: {
        sun: {
            deep: true,
            handler(newValue, oldValue) {
                this.draw();
            }
        }
    },
    methods: {
        draw : function(){
            var dat = this.$data,
            ctx = dat.ctx,
            sun = this.$props.sun;
            // background
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, dat.canvas.width, dat.canvas.height);
            // small dot in center
            ctx.fillStyle = 'white';
            ctx.beginPath();
            ctx.arc(sun.cx, sun.cy, 2, 0, Math.PI * 2);
            ctx.fill();
            // sun
            ctx.fillStyle = 'yellow';
            ctx.beginPath();
            ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
            ctx.fill();
            // draw sections
            this.$props.sections.forEach(function(section){
                ctx.fillStyle = 'cyan';
                if(section.sheetIndex === 1){
                    ctx.fillStyle = 'blue';
                }
                if(section.sheetIndex === 2){
                    ctx.fillStyle = 'red';
                }
                ctx.beginPath();
                ctx.arc(section.x, section.y, section.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }
});
```

## 5 - The html

I then just need a little html and css to pull this all together. In the html file I of course need to have a script tag that links to vuejs, however I also need script tags for my utils lib, the mixins, and all the additional components that I will be using. In addition I am also using a link element to link to an extremal css file where I have all my css classes that I will be using for the various templates.


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
    <!-- libs outside of vuejs -->
    <script src="./lib/utils.js"></script>
    <!-- mixins -->
    <script src="./mixin/sun-methods.js"></script>
    <!-- components -->
    <script src="./comp/sun-base.js"></script>
    <script src="./comp/sun-ui-canvas.js"></script>
    <script src="./comp/sections-ui-select.js"></script>
    <script src="./comp/sections-ui-grid.js"></script>
    <script src="./comp/sections-info-table.js"></script>
    <!-- menus -->
    <script src="./menus/home.js"></script>
    <script src="./menus/sun.js"></script>
    <script src="./menus/sections.js"></script>
    <script src="./menus/sections-table.js"></script>
    <!-- main menu -->
    <script src="./menu.js"></script>
  </body>
</html>
```

The css file:

```css
table{
  width:100%;
}
td{
  background:#8f8f8f;
  text-align:center;
}
.cell{
  outline:1px solid white;
}
.menu_item{
  padding:10px;
  margin:10px;
  background:#4f4f4f;
  text-align:center;
}
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

## 6 - Conclusion

The basic idea that I had in mind for this vuejs example is up and running all ready, but there is much more work to do in order to get this working the way that I really had in mind. I would like to start adding a lot of features that will help me to get the core logic of the game, and all the features that I want working. This might prove to be a good move for this idea that I had in mind for a game in the sense that I am putting aside everything that has to do with graphics for the most part and am focusing more so on just working out the rules and mechanics of the game.

If all goes well a simple largely text only, or with just simple canvas graphics only type of game should still be fun if I do this right. Then it is just a matter of using what I worked out here in an actual full canvas game with a 2d view with lots of half way decent art, and animations.
