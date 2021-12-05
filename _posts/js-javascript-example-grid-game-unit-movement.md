---
title: grid game unit movement javaScript example
date: 2020-08-11 09:40:00
tags: [js]
layout: post
categories: js
id: 694
updated: 2021-12-05 16:45:36
version: 1.46
---

So this week I started working on a new canvas example prototype, and the very first minor release of the prototype thus far strikes me as something good to write about as a simple stand alone [javaScript example](/2021/04/02/js-javascript-example/) post. Thus far it is just a simple example of having a grid, and having a player unit move around in the grid when a player clicks on a given cell location. The basic idea that I have together thus far with it could be taken in a whole range of different directions when it comes to making it into something that is more of a game beyond that of what I have in mind for the canvas example prototype. So I thought I would copy and past the source code over to another location and maintain it as just a simple starting point for a grid type game that involves moving a unit around a simple grid.

I have made many projects in the past that involve the use of a [grid in one form or another such as my grid defense canvas example](/2019/11/27/canvas-example-grid-defense/), I also have another canvas example when it comes to [creating and drawing grids in general](/2019/11/07/canvas-example-grid/) with canvas. Shortly after I wrote this post for the first time I made another [example where the aim is to make a grid module](/2021/08/20/js-javascript-example-grid-module/) that can be used over and over again from one project to another rather than making a custom solution for a single project or examples such as the case with this example that I am writing about here. The problem with that as I see it s far is that making a grid module is something that I never seem to get just right, so I need to keep making new ones. So maybe some times it is a good idea to just create a custom grid module on a project by project basis rather than trying to make some kind of magic grid module that will work well in every possible project.

However in this one I have an idea that I have not done yet with grids, and would like to move forward with it. Also in this post I am touching base on a lot of other topics when it comes to starting a foundation to which I will build on top of when it comes to making a real project rather than just yet another simple javaScript code example. This is a cycle that I would very much like to break at some point in my life.

It may seem as a very simple, trivial example, and for a veteran javaScript developer I suppose it is. However there are still many topics that are covered when it comes to just getting to this simple starting point, and also even when it comes to being an experienced javaScript developer there is the topic of how to go about structuring a complex projects that might at one point in the future consist of thousands of lines of code. This is a topic that I still strugle with even though I have many years of experience thus far. So then this should prove to be a nice little starting point for a simple game that involves a player controlled unit, so lets take a look at the source code.


<!-- more -->

<div id="canvas-app"style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script>var utils={};utils.distance=function(x1,y1,x2,y2){return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2))};utils.angleToPoint=function(x1,y1,x2,y2,scale){scale=scale===undefined?Math.PI*2:scale;var aTan=Math.atan2(y1-y2,x1-x2);return(aTan+Math.PI)/(Math.PI*2)*scale};utils.getCanvasRelative=function(e){var canvas=e.target,bx=canvas.getBoundingClientRect();return{x:Math.floor((e.touches?e.touches[0].clientX:e.clientX)-bx.left),y:Math.floor((e.touches?e.touches[0].clientY:e.clientY)-bx.top),bx:bx}};utils.deepCloneJSON=function(obj){try{return JSON.parse(JSON.stringify(obj))}catch(e){console.log(e.message);console.log(obj);return{}}};var mapMod=function(){var createCells=function(map){var cells=[];var len=map.w*map.h,i=0;while(i<len){cells.push({i:i,x:i%map.w,y:Math.floor(i/map.w),walkable:true,closed:false,data:{},unit:null});i+=1}return cells};var api={};api.create=function(opt){opt=opt||{};var map={w:opt.w||9,h:opt.h||7,cellSize:32,margin:{x:opt.marginX==undefined?5:opt.marginX,y:opt.marginY==undefined?5:opt.marginY},cells:[]};map.cells=opt.cells||createCells(map);return map};api.get=function(map,xi,y){if(arguments.length===2){return map.cells[xi]}if(xi<0||y<0||xi>=map.w||y>=map.h){return false}return map.cells[y*map.w+xi]};api.getCellByPointer=function(map,x,y){var cx=Math.floor((x-map.margin.x)/map.cellSize),cy=Math.floor((y-map.margin.y)/map.cellSize);return api.get(map,cx,cy)};var sortOpen=function(opened){return opened.sort(function(nodeA,nodeB){if(nodeA.weight<nodeB.weight){return 1}if(nodeA.weight>nodeB.weight){return-1}return 0})};var setWeight=function(endNode,neighbor){return utils.distance(endNode.x,endNode.y,neighbor.x,neighbor.y)};var buildPath=function(node){var path=[];while(node.parent){path.push([node.x,node.y]);node=node.parent}return path};var forNeighbors=function(grid,node,endNode,opened){var neighbors=mapMod.getNeighbors(grid,node);var ni=0,nl=neighbors.length;while(ni<nl){var neighbor=neighbors[ni];if(neighbor.closed){ni+=1;continue}neighbor.weight=setWeight(endNode,neighbor);if(!neighbor.opened){neighbor.parent=node;opened.push(neighbor);neighbor.opened=true}ni+=1}};api.getPath=function(grid,sx,sy,ex,ey){var grid=utils.deepCloneJSON(grid),nodes=api.chunk(grid),path=[],opened=[],node;var startNode=nodes[sy][sx];endNode=nodes[ey][ex];opened.push(startNode);startNode.opened=true;startNode.weight=0;while(opened.length>0){node=opened.pop();node.closed=true;if(node===endNode){return buildPath(node)}forNeighbors(grid,node,endNode,opened);sortOpen(opened)}return[]};api.chunk=function(grid){var arr=[],row,i=0;while(i<grid.cells.length){row=grid.cells.slice(i,i+grid.w);arr.push(row);i+=grid.w}return arr};api.isInBounds=function(grid,x,y){return x>=0&&x<grid.w&&(y>=0&&y<grid.h)};api.isWalkable=function(grid,x,y){if(api.isInBounds(grid,x,y)){return api.get(grid,x,y).walkable}return false};api.getNeighbors=function(grid,node){var x=node.x,y=node.y,neighbors=[];if(api.isWalkable(grid,x,y-1)){neighbors.push(mapMod.get(grid,x,y-1))}if(api.isWalkable(grid,x,y+1)){neighbors.push(mapMod.get(grid,x,y+1))}if(api.isWalkable(grid,x-1,y)){neighbors.push(mapMod.get(grid,x-1,y))}if(api.isWalkable(grid,x+1,y)){neighbors.push(mapMod.get(grid,x+1,y))}return neighbors};return api}();var gameMod=function(){var createBaseUnit=function(){return{maxHP:100,maxCellsPerTurn:0,HP:100,weaponIndex:0,sheetIndex:0,type:null,moveCells:[],currentCellIndex:null,active:false}};var createPlayerUnit=function(){var player=createBaseUnit();player.type="player";player.active=true;player.maxCellsPerTurn=3;player.sheetIndex=2;return player};var createEnemyUnit=function(){var enemy=createBaseUnit();enemy.type="enemy";enemy.active=true;enemy.maxCellsPerTurn=2;enemy.sheetIndex=3;return enemy};var createWallUnit=function(){var wall=createBaseUnit();wall.type="wall";wall.active=true;wall.sheetIndex=1;return wall};var placeUnit=function(game,unit,x,y){var map=game.maps[game.mapIndex];var newCell=mapMod.get(map,x,y);if(newCell){if(unit.currentCellIndex!=null){var oldCell=map.cells[unit.currentCellIndex];oldCell.walkable=true;map.cells[unit.currentCellIndex].unit=null}newCell.walkable=false;unit.currentCellIndex=newCell.i;map.cells[unit.currentCellIndex].unit=unit}};var placePlayer=function(game){var map=game.maps[game.mapIndex],toMap=game.toMap,toCell=null,i=map.cells.length;if(toMap.x!=null&&toMap.y!=null){toCell=mapMod.get(map,toMap.x,toMap.y)}if(toCell){if(!toCell.unit){placeUnit(game,game.player,toCell.x,toCell.y);game.toMap=getToMap(game);return}}while(i--){var cell=map.cells[i];if(cell.unit===null){placeUnit(game,game.player,cell.x,cell.y);game.toMap=getToMap(game);return}}};var moveUnit=function(game,unit){if(unit.moveCells.length>0){var ci=unit.moveCells.shift();var moveToCell=mapMod.get(game.maps[game.mapIndex],ci);if(!moveToCell.unit){placeUnit(game,unit,moveToCell.x,moveToCell.y)}if(unit.type==="player"){game.toMap=getToMap(game)}}};var getCellsByUnitType=function(map,type){return map.cells.reduce(function(acc,cell){if(cell.unit){if(cell.unit.type===type){acc.push(cell)}}return acc},[])};var setupGame=function(game,mapStrings){var playerPlaced=false,startMapIndex=0;game.mapIndex=0;game.maps=game.maps.map(function(map,mi){var mapStr=mapStrings[mi]||"";game.mapIndex=mi;map.cells=map.cells.map(function(cell,ci){var cellIndex=parseInt(mapStr[ci]||"0"),x=ci%map.w,y=Math.floor(ci/map.w);if(cellIndex===1){var wall=createWallUnit();placeUnit(game,wall,x,y)}if(cellIndex===2){playerPlaced=true;startMapIndex=mi;placeUnit(game,game.player,x,y)}if(cellIndex===3){var enemy=createEnemyUnit();placeUnit(game,enemy,x,y)}return cell});return map});if(!playerPlaced){placePlayer(game)}game.mapIndex=startMapIndex;game.toMap=getToMap(game)};var api={};api.create=function(opt){opt=opt||{};var mapStrings=opt.maps||["2"];var game={mode:"map",maps:[],mapIndex:0,mapWorldWidth:3,toMap:{index:null,x:null,y:null},player:createPlayerUnit()};mapStrings.forEach(function(){game.maps.push(mapMod.create({marginX:opt.marginX===undefined?32:opt.marginX,marginY:opt.marginY===undefined?32:opt.marginY,w:opt.w===undefined?4:opt.w,h:opt.h===undefined?4:opt.h}))});setupGame(game,mapStrings);return game};var getToIndex=function(game){var toIndex=null,p=game.player,map=game.maps[game.mapIndex],pCell=api.getPlayerCell(game),mwx=game.mapIndex%game.mapWorldWidth,mwy=Math.floor(game.mapIndex/game.mapWorldWidth);if(pCell.x===0){var x=mwx-1;x=x<0?game.mapWorldWidth-1:x;toIndex=mwy*game.mapWorldWidth+x}if(pCell.x===map.w-1){var x=mwx+1;x=x>=game.mapWorldWidth?0:x;toIndex=mwy*game.mapWorldWidth+x}if(pCell.y===0){var y=mwy-1;y=y<0?game.maps.length/game.mapWorldWidth-1:y;toIndex=y*game.mapWorldWidth+mwx}if(pCell.y===map.h-1){var y=mwy+1;y=y>=game.maps.length/game.mapWorldWidth?0:y;toIndex=y*game.mapWorldWidth+mwx}return toIndex};var isAtCorner=function(game,cell){var map=game.maps[game.mapIndex],w=map.w-1,h=map.h-1;return cell.x===0&&cell.y===0||cell.x===w&&cell.y===h||cell.x===0&&cell.y===h||cell.x===w&&cell.y===0};var getToMap=function(game){var toMap={};var map=game.maps[game.mapIndex];var pCell=api.getPlayerCell(game);var mi=toMap.index=getToIndex(game);if(isAtCorner(game,pCell)){if(pCell.y===map.h-1){toMap.x=pCell.x;toMap.y=0}else{toMap.x=pCell.x;toMap.y=map.h-1}}else{toMap.x=pCell.x===0?map.w-1:pCell.x;toMap.y=pCell.y===0?map.h-1:pCell.y;toMap.x=pCell.x===map.w-1?0:toMap.x;toMap.y=pCell.y===map.h-1?0:toMap.y}return toMap};api.update=function(game,secs){var map=game.maps[game.mapIndex];moveUnit(game,game.player);var eCells=getCellsByUnitType(map,"enemy");eCells.forEach(function(eCell){moveUnit(game,eCell.unit)})};api.getPlayerCell=function(game){var p=game.player,map=game.maps[game.mapIndex];return map.cells[p.currentCellIndex]};var getMovePath=function(game,startCell,targetCell){var map=game.maps[game.mapIndex],unit=startCell.unit||null;var path=mapMod.getPath(map,startCell.x,startCell.y,targetCell.x,targetCell.y);if(unit){path=path.reverse().slice(0,unit.maxCellsPerTurn)}return path};var getMoveCells=function(game,startCell,targetCell){var map=game.maps[game.mapIndex];return getMovePath(game,startCell,targetCell).map(function(pos){var cell=mapMod.get(map,pos[0],pos[1]);return cell.i})};var getEnemeyMoveCells=function(game,eCell){var pCell=api.getPlayerCell(game),map=game.maps[game.mapIndex];var pCellNeighbors=mapMod.getNeighbors(map,pCell).filter(function(cell){return cell.walkable});var mtcOptions=pCellNeighbors.map(function(cell){return getMoveCells(game,eCell,cell)}).filter(function(mtcOptions){return mtcOptions.length>0});return mtcOptions[0]||[]};api.playerPointer=function(game,x,y){var cell=mapMod.getCellByPointer(game.maps[game.mapIndex],x,y),map=game.maps[game.mapIndex],pCell=api.getPlayerCell(game);if(cell){if(cell===pCell&&game.toMap.index!=null){game.mapIndex=game.toMap.index;game.toMap=getToMap(game);pCell.unit=null;pCell.walkable=true;game.player.currentCellIndex=null;placePlayer(game)}else{game.player.moveCells=getMoveCells(game,pCell,cell);moveUnit(game,game.player);var eCells=getCellsByUnitType(map,"enemy");eCells.forEach(function(eCell){eCell.unit.moveCells=getEnemeyMoveCells(game,eCell);console.log(eCell.unit.moveCells)})}}};return api}();var draw=function(){var api={};var unitColors=["green","gray","blue","red"];var drawCell=function(sm,cell){var map=sm.game.maps[sm.game.mapIndex];var ctx=sm.ctx;var cs=map.cellSize;var x=map.margin.x+cell.x*cs;var y=map.margin.y+cell.y*cs;ctx.fillStyle="green";if(!cell.walkable){ctx.fillStyle="gray"}if(cell.unit){ctx.fillStyle=unitColors[cell.unit.sheetIndex]}ctx.beginPath();ctx.rect(x,y,32,32);ctx.fill();ctx.stroke()};api.back=function(sm){var canvas=sm.canvas,ctx=sm.ctx;ctx.fillStyle="black";ctx.fillRect(0,0,canvas.width,canvas.height)};api.map=function(sm){var map=sm.game.maps[sm.game.mapIndex],i=0,len=map.cells.length;while(i<len){drawCell(sm,map.cells[i]);i+=1}};api.info=function(sm){var ctx=sm.ctx,pos=sm.input.pos,pCell=gameMod.getPlayerCell(sm.game),canvas=sm.canvas;ctx.fillStyle="white";ctx.font="10px courier";ctx.textBaseline="top";ctx.fillText("pos: "+pos.x+","+pos.y,5,5);ctx.fillText("player pos: "+pCell.x+","+pCell.y,5,15);var tm=sm.game.toMap;ctx.fillText("toMap: mi:"+tm.index+", x: "+tm.x+", y: "+tm.y,5,25);ctx.fillText("v"+sm.ver,1,canvas.height-11)};return api}();(function(){var canvas=document.createElement("canvas"),ctx=canvas.getContext("2d"),container=document.getElementById("canvas-app")||document.body;container.appendChild(canvas);canvas.width=320;canvas.height=240;ctx.translate(.5,.5);canvas.onselectstart=function(){return false};var sm={ver:"0.6.0",fps:12,lt:new Date,game:gameMod.create({marginX:14,marginY:7,w:9,h:7,maps:["111111111"+"100000000"+"103030000"+"100000000"+"100000000"+"100000000"+"100000001","111111111"+"000000000"+"000000300"+"000000000"+"000000000"+"000000000"+"100100000","111111111"+"000000001"+"000000301"+"000000001"+"000000301"+"000000001"+"000000301","100000001"+"103000001"+"100000000"+"100000001"+"100000001"+"103000001"+"100000001","100100000"+"100111010"+"020001010"+"100101030"+"100100111"+"100100000"+"100100000","000000001"+"000000001"+"000000031"+"000111111"+"111100031"+"000000001"+"000000001","100000001"+"100000001"+"100000001"+"103000000"+"100000000"+"103030000"+"111111111","100100000"+"100000000"+"100000000"+"000000000"+"000000000"+"000000300"+"111111111","000000001"+"000000001"+"000000001"+"000000301"+"000000001"+"000000301"+"111111111"]}),canvas:canvas,ctx:ctx,input:{pointerDown:false,pos:{x:0,y:0}}};var pointerHanders={start:function(sm,e){var pos=sm.input.pos=utils.getCanvasRelative(e);if(e.type==="touchstart"){e.preventDefault()}sm.input.pointerDown=true;gameMod.playerPointer(sm.game,pos.x,pos.y)},move:function(sm,e){sm.input.pos=utils.getCanvasRelative(e)},end:function(sm,e){sm.input.pointerDown=false}};var createPointerHandler=function(sm,type){return function(e){pointerHanders[type](sm,e)}};canvas.addEventListener("touchstart",createPointerHandler(sm,"start"));canvas.addEventListener("touchmove",createPointerHandler(sm,"move"));canvas.addEventListener("touchend",createPointerHandler(sm,"end"));canvas.addEventListener("mousedown",createPointerHandler(sm,"start"));canvas.addEventListener("mousemove",createPointerHandler(sm,"move"));canvas.addEventListener("mouseup",createPointerHandler(sm,"end"));var loop=function(){var now=new Date,secs=(now-sm.lt)/1e3;requestAnimationFrame(loop);if(secs>=1/sm.fps){gameMod.update(sm.game);draw.back(sm);draw.map(sm);draw.info(sm);sm.lt=now}};loop()})();
</script>


## 1 - Getting started and the utility module of this grid unti movement javaScript example

This is a post on a simple client side javaScript example, so then it should go without saying that this is not a [getting started with javaScript](/2018/11/27/js-getting-started/) type post. I assume that you have at least some background with the basics of javaScript as well as other client side web development languages which include HTML and CSS. With that out of the way in this section I will be going over just the utilities module of the example leaving the other various files for later sections of this post.

### Full source code is also on Github

If you are on Github and wondering if there is a location on Github where I am parking the source code that I am write about in this post there such a place will be found [here in my test vjs repository](https://github.com/dustinpfister/test_vjs/tree/master/for_post/js-javascript-example-grid-game-unit-movement). This is also where I pack the source code examples for my [many other posts on native javaScript](/categories/js/) features and examples.

### 1.1 - The utility module

So first off here is a utility module that has some stand alone static methods that I am going to be using in one or more additional modules moving forward with the rest of the code. This is just a standard practice of sorts when it comes to making any kind of [canvas example](/2020/03/23/canvas-example/), or complex javaScript project. A popular javaScript library that can be described as a general unity library would of course be [lodash](/2019/02/15/lodash/), however with these javaScript example posts I like to do everything from the ground up, making my own custom cut libraries. I have another [utilities library javaScript](/2021/08/06/js-javascript-example-utils/) example post in which it get into detail about making this kind of module that is packed with all kinds of usual suspect type methods that I will often park in a file such as this. However I often do make custom versions of this kind of library on a project by project, and example by example type basis.

One method that I have at the ready is a typical distance formula function. Thus far I am using this function in my map module now when it comes to figuring what the weight should be when preforming path detection. Moe on that later on in the post when it comes to the section on the map module.

In this javaScript example I have a simple gird where when a cell location is clicked a player object will move in the direction of that location by one cell at a time. So I have a angle to point method that can be used to get a direction from one position to another that will be used in my main game module. This method makes use of the [Math.atan2](/2019/03/19/js-math-atan2) method which is useful for these kinds of situations that have to do with angles. I have also made yet another [javaScript example where I am making an angles module](/2021/04/16/js-javascript-example-angles-module/) that is based of a library on angles that I like called just [simply angles.js](https://www.npmjs.com/package/angles). 

Another method that I have here is useful for getting a canvas relative rather than window relative location when it comes to pointer events. I will not be getting into this subject in detail as I have [wrote a post on this topic before hand](/2020/03/04/canvas-get-point-relative-to-canvas/), so if you want to learn more about this you can check that out if interested. In this javaScript example I will be using this method when it comes to my crude yet functional state machine in my main.js file that ties everything together. I will be getting into that module more so later in this post when it comes to the section on the main javaScript file of the example where I am using the method when working with event handlers.

I then also have a crude yet effecting deep clone method that makes use of JSON to quickly deep clone objects. Thus far I am just using this in my map module as a way to quickly create a copy of a grid, and then use this copy of a grid to preform path detection. I can not recommend that this is a good solution for all situations in which one will need to deep clone objects though. For more on this topic you might want to check out my post on the [lodash clone deep method](/2017/11/13/lodash_clonedeep).

```js
// UTILS
var utils = {};
// distance
utils.distance = function (x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
};

// angle from one point to another
utils.angleToPoint = function (x1, y1, x2, y2, scale) {
    scale = scale === undefined ? Math.PI * 2 : scale;
    var aTan = Math.atan2(y1 - y2, x1 - x2);
    return (aTan + Math.PI) / (Math.PI * 2) * scale;
};
// get a point relative to a canvas element rather than window
utils.getCanvasRelative = function (e) {
    var canvas = e.target,
    bx = canvas.getBoundingClientRect();
    return {
        x: Math.floor((e.touches ? e.touches[0].clientX : e.clientX) - bx.left),
        y: Math.floor((e.touches ? e.touches[0].clientY : e.clientY) - bx.top),
        bx: bx
    };
};
// deep clone using JSON
utils.deepCloneJSON = function (obj) {
    try{
       return JSON.parse(JSON.stringify(obj));
    }catch(e){
        console.log(e.message);
        console.log(obj);
        return {};
    }
};
```

## 2 - The map module that will be used to create the grid.

In order to get this example working I will need a grid in which to place the player object that will move on each grid location click. I could just have everything together in one module when it comes to a game project like this, but I am thinking ahead with this one and have decided to pull this part of the example into its own map module. For now I am going to be trying my best to keep this map module as simple as I can, however I am still going to want to add things like path detection so it is not going to be all that simple. With that said it has a few public methods that I may or may not expand on event more is I keep working on this project, but I am not sure there is much more I would want to add with this module at least. 

There is of course a create method that I will be calling in my game module that I will be getting to in a later section in this post. When it comes to creating even a simple grid module there are all kinds of formats for the grid object that come to mind. Some developers might prefer some kind of format that involves an array of arrays, but as of late I prefer a solution that involves a single array and then using a formula to get or set the proper cell location.

After the create public method I have two methods that can be used to get a cell location in the map. One is just the basic get method that can get a cell by an index value, or an x and y cell location. The other method is what I will be using to get a cell location by way of a canvas relative pixel location.

In addition with a basic core set of methods to create and work with a map object, I have also added a number of methods that have to do with match detection. This code that I have for this is based off of what it is that I have worked out for my [post on path detection](/2019/08/27/js-path-find/). So now not only can I create a map, and get references to cells by a index or pixel location, but I can also get paths from one cell position to another. With that said by default all cells have a walkable property that by default is set to true. When it comes to my game module that will make use of this map module that is where I will want to set the walkable value of cells true and false as needed.

```js
var mapMod = (function () {
    // create Cells helper
    var createCells = function (map) {
        var cells = [];
        var len = map.w * map.h,
        i = 0;
        while (i < len) {
            cells.push({
                i: i,
                x: i % map.w,
                y: Math.floor(i / map.w),
                walkable: true,
                closed: false,
                data: {},
                unit: null // reference to current unit here or null if empty
            });
            i += 1;
        }
        return cells;
    };
    // PUBLIC API
    var api = {};
    // create a new map object
    api.create = function (opt) {
        opt = opt || {};
        var map = {
            w: opt.w || 9,
            h: opt.h || 7,
            cellSize: 32,
            margin: {
                x: opt.marginX == undefined ? 5 : opt.marginX,
                y: opt.marginY == undefined ? 5 : opt.marginY
            },
            cells: []
        };
        map.cells = opt.cells || createCells(map);
        return map;
    };
    // return a cell at the given position, or false for out of bounds values
    api.get = function (map, xi, y) {
        if(arguments.length === 2){
            return map.cells[xi];
        }
        if (xi < 0 || y < 0 || xi >= map.w || y >= map.h) {
            return false;
        }
        return map.cells[y * map.w + xi];
    };
    // get a cell in the current map by way of
    // a canvas relative x and y pixel pos
    api.getCellByPointer = function (map, x, y) {
        var cx = Math.floor((x - map.margin.x) / map.cellSize),
        cy = Math.floor((y - map.margin.y) / map.cellSize);
        return api.get(map, cx, cy)
    };

/***
PATHS
***/

    // sort a list of open nodes
    var sortOpen = function (opened) {
        return opened.sort(function (nodeA, nodeB) {
            if (nodeA.weight < nodeB.weight) {
                return 1;
            }
            if (nodeA.weight > nodeB.weight) {
                return -1;
            }
            return 0;
        });
    };
    // set weight for a node
    var setWeight = function (endNode, neighbor) {
        return utils.distance(endNode.x, endNode.y, neighbor.x, neighbor.y);
    };
    // build a path based an parent property
    var buildPath = function (node) {
        var path = [];
        while (node.parent) {
            path.push([node.x, node.y]);
            node = node.parent;
        }
        //path.push([node.x, node.y]);
        return path;
    };
    // for Each Neighbor for the given grid, node, and open list
    var forNeighbors = function (grid, node, endNode, opened) {
        //var neighbors = grid.getNeighbors(node);
        var neighbors = mapMod.getNeighbors(grid, node);
        var ni = 0,
        nl = neighbors.length;
        while (ni < nl) {
            var neighbor = neighbors[ni];
            // if the neighbor is closed continue looping
            if (neighbor.closed) {
                ni += 1;
                continue;
            }
            // set weight for the neighbor
            neighbor.weight = setWeight(endNode, neighbor);
            // if the node is not opened
            if (!neighbor.opened) {
                neighbor.parent = node;
                opened.push(neighbor);
                neighbor.opened = true;
            }
            ni += 1;
        }
    };
    // get a path
    api.getPath = function (grid, sx, sy, ex, ey) {
        // copy the given grid
        //var grid = Grid.fromMatrix(givenGrid.nodes),
        var grid = utils.deepCloneJSON(grid),
        //var grid = utils.deepClone(grid, {
        //    forRecursive: function(){ return {} }
        //}),
        nodes = api.chunk(grid),
        path = [],
        opened = [],
        node;
        // set startNode and End Node to copy of grid
        var startNode = nodes[sy][sx];
        endNode = nodes[ey][ex];
        // push start Node to open list
        opened.push(startNode);
        startNode.opened = true;
        startNode.weight = 0;
        // start walking
        while (opened.length > 0) {
            // pop out next Node from open list
            node = opened.pop();
            node.closed = true;
            // if the node is the end node
            if (node === endNode) {
                return buildPath(node);
            }
            // loop current neighbors
            forNeighbors(grid, node, endNode, opened);
            // sort the list of nodes be weight value to end node
            sortOpen(opened);
        }
        // return an empty array if we get here (can not get to end node)
        return [];
    };
    // get a chunk form of a grid
    api.chunk = function (grid) {
        var arr = [],
        row,
        i = 0;
        while (i < grid.cells.length) {
            row = grid.cells.slice(i, i + grid.w);
            arr.push(row);
            i += grid.w;
        }
        return arr;
    };
    // return true if the given x and y position is in bounds
    api.isInBounds = function (grid, x, y) {
        return (x >= 0 && x < grid.w) && (y >= 0 && y < grid.h);
    };
    // is the given cell location walkable?
    api.isWalkable = function (grid, x, y) {
        if (api.isInBounds(grid, x, y)) {
            return api.get(grid, x, y).walkable; //grid.nodes[y][x].walkable;
        }
        return false;
    };
    // get the four Neighbors of a node
    api.getNeighbors = function (grid, node) {
        var x = node.x,
        y = node.y,
        neighbors = [];
        if (api.isWalkable(grid, x, y - 1)) {
            //neighbors.push(this.nodes[y - 1][x]);
            neighbors.push(mapMod.get(grid, x, y - 1));
        }
        if (api.isWalkable(grid, x, y + 1)) {
            //neighbors.push(this.nodes[y + 1][x]);
            neighbors.push(mapMod.get(grid, x, y + 1));
        }
        if (api.isWalkable(grid, x - 1, y)) {
            //neighbors.push(this.nodes[y][x - 1]);
            neighbors.push(mapMod.get(grid, x - 1, y));
        }
        if (api.isWalkable(grid, x + 1, y)) {
            //neighbors.push(this.nodes[y][x + 1]);
            neighbors.push(mapMod.get(grid, x + 1, y));
        }
        return neighbors;
    };
    // return the public API
    return api;
}
    ());
```

## 3 - The game module

In this javaScript example the main module will be the state machine object that I will be getting to later in this post. However the game module is still a major component that will contain everything that has to do with the state of the game, rather than the application as a whole. This means the state of the map as well as the units that will be located in the map as well.

Here in the game module I have a create method that will be used to create a new game state that will contain at least one instance of a map object for starters, and helper methods that can be used to create the player object. So the game module is the main state object for the state of the actual game in terms of the state of the map, and any display objects that might be in the map, or out of it actually. For now it is just the player object, as well as just simple wall units that I am concern with, and in time as I develop this project much of the code here will be pulled into another module that has to do with object pools, and units in general when and if I get to it.

So for now I have all of my unit methods and various related helper functions at the top of this game module helper. I then have a create base unit helper that is used to create a unit object with all properties that the unit of any kind should have. As of revision 3 the only real properties of interest with a unit would be the sheetIndex, and currentCellIndex properties.

With path detection now added to the map module as revision 3 of the example the place unit method will not set the walkable property of a cell to true when a unit is located in the cell, as well as set the value back to false when moving the unit to a new cell location. Because of this and any additional factors of concern moving forward the place unit method should always be used when moving any unit from one location to another or placing a new unit into a map.

```js
var gameMod = (function () {
/********** **********
     UNITS
*********** *********/
    // create a base unit
    var createBaseUnit = function () {
        return {
            // current unit stats
            maxHP: 100,           // max number of hit points for the unit
            maxCellsPerTurn: 0,   // the max number of cells a unit can move
            // current values
            HP: 100,
            weaponIndex: 0,
            sheetIndex: 0,
            type: null,
            moveCells: [], // array of cells to move
            currentCellIndex: null,
            active: false
        }
    };
    // create a player unit
    var createPlayerUnit = function () {
        var player = createBaseUnit();
        player.type = 'player';
        player.active = true;
        player.maxCellsPerTurn = 3;
        player.sheetIndex = 2; // player sheet
        return player;
    };    // create a player unit
    var createEnemyUnit = function () {
        var enemy = createBaseUnit();
        enemy.type = 'enemy';
        enemy.active = true;
        enemy.maxCellsPerTurn = 2;
        enemy.sheetIndex = 3;
        return enemy;
    };
    // create a player unit
    var createWallUnit = function () {
        var wall = createBaseUnit();
        wall.type = 'wall';
        wall.active = true;
        wall.sheetIndex = 1;
        return wall;
    };
    // place a unit at the given location
    var placeUnit = function (game, unit, x, y) {
        var map = game.maps[game.mapIndex];
        var newCell = mapMod.get(map, x, y);
        if (newCell) {
            // any old cellIndex that may need to have walkable
            // set back to true?
            if (unit.currentCellIndex != null) {
                var oldCell = map.cells[unit.currentCellIndex];
                oldCell.walkable = true;
                // set unit ref back to null
                map.cells[unit.currentCellIndex].unit = null;
            }
            // set new cell to not walkable as a unit is now located here
            newCell.walkable = false;
            // set current cell index for the unit
            unit.currentCellIndex = newCell.i;
            // place a ref to the unit in the map cell
            map.cells[unit.currentCellIndex].unit = unit; // map ref to unit
        }
    };
    // place player helper
    var placePlayer = function(game){
        var map = game.maps[game.mapIndex],
        toMap = game.toMap,
        toCell = null,
        i = map.cells.length;
        // get a toCell ref if we have a pos in game.toMap
        if(toMap.x != null && toMap.y != null){
            toCell = mapMod.get(map, toMap.x, toMap.y);
        }
        // if we have a toCell
        if(toCell){
            if(!toCell.unit){
                placeUnit(game, game.player, toCell.x, toCell.y);
                game.toMap = getToMap(game);
                return;
            }
        }
        // if we get this far just find a spot
        while(i--){
            var cell = map.cells[i];
            if(cell.unit === null){
                placeUnit(game, game.player, cell.x, cell.y);
                game.toMap = getToMap(game);
                return;
            }
        }
    };
    // move a unit by way of any cell index values in unit.moveCells
    var moveUnit = function(game, unit){
        if(unit.moveCells.length > 0){
            var ci = unit.moveCells.shift();
            var moveToCell = mapMod.get(game.maps[game.mapIndex], ci);
            // if no unit at the move to cell
            if(!moveToCell.unit){
                placeUnit(game, unit, moveToCell.x, moveToCell.y);
            }
            // !!! might not hurt to do this for all units
            // also this might not belong here but where this method
            // is called for the player unit maybe
            if(unit.type === 'player'){
                game.toMap = getToMap(game);
            }
        }
    };
/********** **********
     MAP HELPERS
*********** *********/
// get an array of cell objects by a given unit type string
var getCellsByUnitType = function(map, type){
    return map.cells.reduce(function(acc, cell){
        if(cell.unit){
            if(cell.unit.type === type){
                acc.push(cell);
            }
        }
        return acc;
    },[]);
};
/********** **********
     SETUP GAME
*********** *********/
    // setUp game helper with game object, and given maps
    var setupGame = function (game, mapStrings) {
        var playerPlaced = false,
        startMapIndex = 0;
        game.mapIndex = 0;
        game.maps = game.maps.map(function(map, mi){
            var mapStr = mapStrings[mi] || '';
            game.mapIndex = mi;
            map.cells = map.cells.map(function(cell, ci){
                var cellIndex = parseInt(mapStr[ci] || '0'),
                x = ci % map.w,
                y = Math.floor(ci / map.w);
                // wall block
                if(cellIndex === 1){
                    var wall = createWallUnit();
                    placeUnit(game, wall, x, y);
                }
                // player
                if(cellIndex === 2){
                    playerPlaced = true;
                    startMapIndex = mi;
                    placeUnit(game, game.player, x, y);
                }
                // player
                if(cellIndex === 3){
                    var enemy = createEnemyUnit();
                    placeUnit(game, enemy, x, y);
                }
                return cell;
            });
            return map;
        });
        // if player is not palced then place the player unit
        // at a null cell
        if(!playerPlaced){
            placePlayer(game);
        }
        game.mapIndex = startMapIndex;
        game.toMap = getToMap(game);
    };
/********** **********
     PUBLIC API
*********** *********/
    var api = {};
    // create a new game state
    api.create = function (opt) {
        opt = opt || {};
        var mapStrings = opt.maps || ['2'];
        var game = {
            mode: 'map',
            maps: [],
            mapIndex: 0,
            mapWorldWidth: 3, // used to find toIndex
            toMap: {
                index: null,
                x: null,
                y: null
            },
            player: createPlayerUnit()
        };
        mapStrings.forEach(function(){
            game.maps.push(mapMod.create({
                marginX: opt.marginX === undefined ? 32 : opt.marginX,
                marginY: opt.marginY === undefined ? 32 : opt.marginY,
                w:  opt.w === undefined ? 4 : opt.w,
                h:  opt.h === undefined ? 4 : opt.h
            }));
        });
        setupGame(game, mapStrings);
        return game;
    };
    // get to index helper
    var getToIndex = function(game){
        var toIndex = null,
        p = game.player,
        map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game),
        mwx = game.mapIndex % game.mapWorldWidth,                 // map world x and y
        mwy = Math.floor(game.mapIndex / game.mapWorldWidth );   
        // if player cell x equals 0 ( left side )
        if(pCell.x === 0){
            var x = mwx - 1;
            x = x < 0 ? game.mapWorldWidth - 1 : x;
            toIndex = mwy * game.mapWorldWidth + x;
        }
        // if player cell x equals map.w - 1 ( right side )
        if(pCell.x === map.w - 1){
            var x = mwx + 1;
            x = x >= game.mapWorldWidth ? 0 : x;
            toIndex = mwy * game.mapWorldWidth + x;
        }
        // if player cell y equals 0 ( top side )
        if(pCell.y === 0){
            var y = mwy - 1;
            y = y < 0 ? game.maps.length / game.mapWorldWidth - 1 : y;
            toIndex = y * game.mapWorldWidth + mwx;
        }
        // if player cell y map.h - 1 ( bottom side )
        if(pCell.y === map.h - 1){
            var y = mwy + 1;
            y = y >= game.maps.length / game.mapWorldWidth ? 0 : y;
            toIndex = y * game.mapWorldWidth + mwx;
        }
        return toIndex;
    };
    // is at corner
    var isAtCorner = function(game, cell){
        var map = game.maps[game.mapIndex],
        w = map.w - 1,
        h = map.h - 1;
        return (cell.x === 0 && cell.y === 0) || 
            (cell.x === w && cell.y === h) || 
            (cell.x === 0 && cell.y === h) || 
            (cell.x === w && cell.y === 0);
    };
    // get to map object
    var getToMap = function(game){
        var toMap = {};
        var map = game.maps[game.mapIndex];
        var pCell = api.getPlayerCell(game);
        var mi = toMap.index = getToIndex(game);
        // at corner?
        if(isAtCorner(game, pCell)){
           if(pCell.y === map.h - 1){
               toMap.x = pCell.x;
               toMap.y = 0;
           }else{
               toMap.x = pCell.x;
               toMap.y = map.h - 1;
           }
        }else{
            // not at corner
            toMap.x = pCell.x === 0 ? map.w - 1 : pCell.x;
            toMap.y = pCell.y === 0 ? map.h - 1 : pCell.y;
            toMap.x = pCell.x === map.w - 1 ? 0 : toMap.x;
            toMap.y = pCell.y === map.h - 1 ? 0 : toMap.y;
        }
        return toMap;
    };
    // update a game object
    api.update = function (game, secs) {
var map = game.maps[game.mapIndex]
        //var p = game.player,
        //pCell = api.getPlayerCell(game);
        // move player unit
        moveUnit(game, game.player);
                var eCells = getCellsByUnitType(map, 'enemy');
                eCells.forEach(function(eCell){
                    moveUnit(game, eCell.unit);
                });
/*
        if(p.moveCells.length > 0){
            var ci = p.moveCells.shift();
            var moveToCell = mapMod.get(game.maps[game.mapIndex], ci);
            placeUnit(game, game.player, moveToCell.x, moveToCell.y);
            game.toMap = getToMap(game);
        }
*/
    };
    // get player cell
    api.getPlayerCell = function(game){
        var p = game.player,
        map = game.maps[game.mapIndex];
        return map.cells[p.currentCellIndex];
    };
 
    // get an array of cells to move pased on a units
    // maxCellsPerTurn value and the given target cell location
/*
    var getMovePath = function(game, unit, targetCell){
        // get current map
        var map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        // get the raw path to that target cell
        var path = mapMod.getPath(map, pCell.x, pCell.y, targetCell.x, targetCell.y);
        // get a slice of the raw path up to unit.maxCellsPerTurn
        path = path.reverse().slice(0, unit.maxCellsPerTurn);
        // return the path
        return path;
    };
*/
    var getMovePath = function(game, startCell, targetCell){
        // get current map
        var map = game.maps[game.mapIndex],
        unit = startCell.unit || null;
        // get the raw path to that target cell
        var path = mapMod.getPath(map, startCell.x, startCell.y, targetCell.x, targetCell.y);
        // get a slice of the raw path up to unit.maxCellsPerTurn
        if(unit){
            path = path.reverse().slice(0, unit.maxCellsPerTurn);
        }
        // return the path
        return path;
    };
 
    // get an arary of cell index values
/*
    var getMoveCells = function(game, unit, targetCell){
        var map = game.maps[game.mapIndex];
        return getMovePath(game, unit, targetCell).map(function(pos){
            var cell = mapMod.get(map, pos[0], pos[1]);
            return cell.i;
        });
    };
*/
    var getMoveCells = function(game, startCell, targetCell){
        var map = game.maps[game.mapIndex];
        return getMovePath(game, startCell, targetCell).map(function(pos){
            var cell = mapMod.get(map, pos[0], pos[1]);
            return cell.i;
        });
    };
    // get enemy move cells options
    var getEnemeyMoveCells = function(game, eCell){
        var pCell = api.getPlayerCell(game),
        map = game.maps[game.mapIndex];
        // get neighbor cells of the player unit
        var pCellNeighbors = mapMod.getNeighbors(map, pCell).filter(function(cell){
            return cell.walkable;
        });
        // get an array of path options 
        var mtcOptions = pCellNeighbors.map(function(cell){
            return getMoveCells(game, eCell, cell)
        }).filter(function(mtcOptions){
            return mtcOptions.length > 0;
        });
        // rteurn first path or empty array
        return mtcOptions[0] || [];
    };
    // preform what needs to happen for a player pointer event for the given pixel positon
    api.playerPointer = function(game, x, y){
        var cell = mapMod.getCellByPointer(game.maps[game.mapIndex], x, y),
        map = game.maps[game.mapIndex],
        pCell = api.getPlayerCell(game);
        if (cell) {
            // if player cell is clicked and there is a toIndex value
            if(cell === pCell && game.toMap.index != null){
                game.mapIndex = game.toMap.index;
                game.toMap = getToMap(game);
                pCell.unit = null;
                pCell.walkable = true;
                game.player.currentCellIndex = null;
                placePlayer(game);
            }else{
                // set moveCells
                //game.player.moveCells = getMoveCells(game, game.player, cell);
                game.player.moveCells = getMoveCells(game, pCell, cell);
                // move for first time so that the we are getting up to date cells
                // for figuring enemey paths
                moveUnit(game, game.player);
                // set moveCells for enemies
                var eCells = getCellsByUnitType(map, 'enemy');
                eCells.forEach(function(eCell){
                    eCell.unit.moveCells = getEnemeyMoveCells(game, eCell);
                    console.log(eCell.unit.moveCells);
                });
            }
        }
    };
    // return the public API
    return api;
}
    ());
```

## 4 - The draw module

So now that I have all the modules that can be used to create a main game object state, I am going to want to have a way to create a view for this state object. So I will then need module that can be used to draw to a canvas element which will be this draw.js file. With this example this far I just have a few draw methods one of which is to just draw a simple static background, another is to draw the state of the map as a whole, and I have another that just draws some basic state info.

```js
var draw = (function () {
    // public api
    var api = {};
    // unit colors
    var unitColors = ['green', 'gray', 'blue', 'red'];
/********** **********
     HELPERS
*********** *********/
// draw a cell helper
var drawCell = function(sm, cell){
    var map = sm.game.maps[sm.game.mapIndex];
    var ctx = sm.ctx;
    var cs = map.cellSize;
    var x = map.margin.x + cell.x * cs;
    var y = map.margin.y + cell.y * cs;
    // draw base cell
    ctx.fillStyle = 'green';
    if(!cell.walkable){
        ctx.fillStyle = 'gray';
    }
    // if we have a unit
    if (cell.unit) {
        ctx.fillStyle = unitColors[cell.unit.sheetIndex];
    }
    ctx.beginPath();
    ctx.rect(x, y, 32, 32);
    ctx.fill();
    ctx.stroke();
};
/********** **********
     PUBLIC API
*********** *********/
    // draw background
    api.back = function (sm) {
        var canvas = sm.canvas,
        ctx = sm.ctx;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    // draw the map
    api.map = function (sm) {
        var map = sm.game.maps[sm.game.mapIndex],
        i = 0,
        len = map.cells.length;
        while (i < len) {
            drawCell(sm, map.cells[i]);
            i += 1;
        }
    };
    // draw info
    api.info = function (sm) {
        var ctx = sm.ctx,
        pos = sm.input.pos,
        pCell = gameMod.getPlayerCell(sm.game),
        canvas = sm.canvas;
        // text style
        ctx.fillStyle = 'white';
        ctx.font = '10px courier';
        ctx.textBaseline = 'top';
        // draw current pointer position
        ctx.fillText('pos: ' + pos.x + ',' + pos.y, 5, 5);
        // player cell pos
        ctx.fillText('player pos: ' + pCell.x + ',' + pCell.y, 5, 15);
        //ctx.fillText('toIndex: ' + sm.game.toIndex, 5, 25);
        var tm = sm.game.toMap;
        ctx.fillText('toMap: mi:' + tm.index + ', x: ' + tm.x + ', y: ' + tm.y, 5, 25);
        // version number
        ctx.fillText('v' + sm.ver, 1, canvas.height - 11);
    };
    // return the public api to draw variable
    return api;
}
    ());
```

## 5 - The main.js file and the start of a State machine

So now it is time to get to my main.js file for this javaScript example where I will make use of all the modules that I have put together for this example. Here I create the canvas element that I will be using, and set up a simple state machine object that for the same of this example is not really much of a state machine but just a place holder for such a thing. Also here in the main.js file I have my main application loop that is typically for any of my canvas examples.

```js
(function () {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('canvas-app') || document.body;
    container.appendChild(canvas);
    canvas.width = 320;
    canvas.height = 240;
    ctx.translate(0.5, 0.5);
 
    // disable default action for onselectstart
    canvas.onselectstart = function () { return false; }
 
    var sm = {
        ver: '0.6.0',
        fps: 12,
        lt: new Date(),
        game: gameMod.create({
            marginX : 14,
            marginY : 7,
            w: 9,
            h: 7,
            maps: [
                // TOP
                '111111111' + 
                '100000000' + 
                '103030000' + 
                '100000000' + 
                '100000000' + 
                '100000000' + 
                '100000001',
 
                '111111111' +
                '000000000' +
                '000000300' + 
                '000000000' + 
                '000000000' +
                '000000000' +
                '100100000',
 
                '111111111' +
                '000000001' +
                '000000301' +
                '000000001' +
                '000000301' +
                '000000001' +
                '000000301',
                
                // middle
                '100000001' +
                '103000001' + 
                '100000000' + 
                '100000001' + 
                '100000001' + 
                '103000001' + 
                '100000001',
 
                '100100000' +
                '100111010' +
                '020001010' +
                '100101030' +
                '100100111' +
                '100100000' +
                '100100000',
 
                '000000001' +
                '000000001' +
                '000000031' +
                '000111111' +
                '111100031' +
                '000000001' +
                '000000001',
                
                // bottom   
                '100000001' + 
                '100000001' + 
                '100000001' + 
                '103000000' + 
                '100000000' + 
                '103030000' + 
                '111111111',
 
                '100100000' + 
                '100000000' + 
                '100000000' + 
                '000000000' + 
                '000000000' + 
                '000000300' + 
                '111111111',
 
                '000000001' + 
                '000000001' + 
                '000000001' + 
                '000000301' + 
                '000000001' + 
                '000000301' + 
                '111111111'
                
            ]
        }),
        canvas: canvas,
        ctx: ctx,
        input: {
            pointerDown: false,
            pos: {
                x: 0,
                y: 0
            }
        }
    };
    var pointerHanders = {
        start: function (sm, e) {
            var pos = sm.input.pos = utils.getCanvasRelative(e);
            if(e.type === 'touchstart'){
                e.preventDefault();
            }
            sm.input.pointerDown = true;
            // call player pointer method in gameMod
            gameMod.playerPointer(sm.game, pos.x, pos.y);
        },
        move: function (sm, e) {
            sm.input.pos = utils.getCanvasRelative(e);
        },
        end: function (sm, e) {
            sm.input.pointerDown = false;
        }
    };
    var createPointerHandler = function (sm, type) {
        return function (e) {
            pointerHanders[type](sm, e);
        };
    };
    canvas.addEventListener('touchstart', createPointerHandler(sm, 'start'));
    canvas.addEventListener('touchmove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('touchend', createPointerHandler(sm, 'end'));
    canvas.addEventListener('mousedown', createPointerHandler(sm, 'start'));
    canvas.addEventListener('mousemove', createPointerHandler(sm, 'move'));
    canvas.addEventListener('mouseup', createPointerHandler(sm, 'end'));
    // loop with frame capping set by sm.fps value
    var loop = function () {
        var now = new Date(),
        secs = (now - sm.lt) / 1000;
        requestAnimationFrame(loop);
        if(secs >= 1 / sm.fps){
            gameMod.update(sm.game);
            draw.back(sm);
            draw.map(sm);
            draw.info(sm);
            sm.lt = now;
        }
    };
    loop();
}
    ());
```

## 6 - Conclusion

So for now I have a decent starting point for a game, but there are all ready thins that I might choose to do differently when it comes to this basic starting point. Like many javaScript projects that make use of canvas I have a main update loop that is calling requestAnimationFrame over and over again. I decided to keep that, but the thought did occur that I might want to make this project completely event driven rather than having an update loop fire all the time. Also when it comes to keeping it there are many little subtle improvements that are needed that I have not got to yet, but have done in other projects.

Still for now I just wanted to get this the point where I am just moving a player object around in a grid, and that is it. I had it set in my mind as to what the first step is, and I completed that. There are going to be additional steps that involve making various invisible improvements that do not really change the behavior, or looks an feel of the project but that was not what I wanted to get done for the moment.