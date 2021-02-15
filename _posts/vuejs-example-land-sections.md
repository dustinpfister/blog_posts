---
title: Land sections vuejs example
date: 2021-02-02 13:28:00
tags: [vuejs]
layout: post
categories: vuejs
id: 794
updated: 2021-02-15 09:25:27
version: 1.13
---

One of my many canvas examples in the works is a game prototype that I am calling just simply Mr Sun. So far I just have a general idea of the kind of game that I would like to make, but many of the core logic features are still not together. The general idea at least is that there is a sun object that is surrounded by world section objects, and the player can move the sun object around inside of this circle of world objects. When moving the sun that changes the distance between the sun and any given world section and that in turn can effect each world land section object in a different way.

So I thought I would make a simple [vuejs examples](/2021/02/04/vuejs-example/) of the basic idea of the game, and have a few menus to switch between. The focus of this vuejs example will be to not make the game a canvas project, but more of a front end project in general where I am using vuejs as a framework to pull everything together.

<!-- more -->

## 1 - A utils lib

For this vuejs example I have a main vuejs library that contains a few methods that I might be using across vue components and other javaScript files. As of this writing I just have a distance formula that I am using to find the distance between the sun, and a given land section.

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
               itemIndex: indexArr[i] || 0
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
                grid: createGrid(maps[i])
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
                cell.itemIndex = dat.cellAction;
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

```js
(function(){
 
    Vue.component('sections-info', {
        props: ['sections'],
        template: '<div class="menu_item">'+
            '<table>' +
               '<tr> <th>index</th> <th>distance</th> <th>per</th> <th>pos</th> </tr>'+
               '<tr v-for="sec, i in sections" >'+
                  '<td>{{i}}</td>'+
                  '<td>{{ sec.distance.toFixed(2) }}</td>'+
                  '<td>{{ sec.per.toFixed(2) }}</td>' +
                  '<td>{{ Math.round(sec.x) + \', \' + Math.round(sec.y) }}</td>' +
               '</tr>'+
            '</table>'+
        '</div>'
    });
 
    Vue.component('menu-sections-table', {
        props: ['currentMenu', 'sun', 'sections'],
        template: '<div v-if="currentMenu === \'sections-table\'">'+
            '<sections-info v-bind:sections="sections"></sections-info>'+
        '</div>'
    });
}());
```

## 3 - The mixin folder

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

### 4.1 - sections-ui-grid

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
            var color = ['blue', 'red', 'yellow', 'green'];
            return 'position:absolute;'+
                'left:'+Math.floor(32 * cell.x)+'px;'+
                'top:'+Math.floor(32 * cell.y)+'px;'+
                'background:'+color[cell.itemIndex]+';'+
                'width:32px;height:32px;';
        },
        // what to do if a cell is clicked
        clickCell: function(cell){
            this.$emit('click-cell', cell)
        }
    }
});
```

### 4.2 - sections-ui-select

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

### 4.3 - sun-base

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

### 4.4 - sun-ui-canvas

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
            this.$props.sections.forEach(function(sun){
                ctx.fillStyle = 'blue';
                ctx.beginPath();
                ctx.arc(sun.x, sun.y, sun.r, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }
});
```

## 5 - The html

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
    <!-- libs outside of vuejs -->
    <script src="./lib/utils.js"></script>
    <!-- mixins -->
    <script src="./mixin/sun-methods.js"></script>
    <!-- components -->
    <script src="./comp/sun-base.js"></script>
    <script src="./comp/sun-ui-canvas.js"></script>
    <script src="./comp/sections-ui-select.js"></script>
    <script src="./comp/sections-ui-grid.js"></script>
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

If all goes well a simple largely text only, or with just simple canvas graphics only type of game should still be fun if I do this right. Then it is just a matter of using what I worked out here in an actually full canvas game.
