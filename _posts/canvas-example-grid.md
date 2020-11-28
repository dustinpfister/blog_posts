---
title: Canvas grid example view and model
date: 2019-11-07 17:33:00
tags: [canvas]
categories: canvas
layout: post
id: 558
updated: 2020-11-28 17:17:00
version: 1.33
---

Time for yet another [canvas example](/2020/03/23/canvas-example/), this time I am thinking just a basic [canvas grid](https://medium.com/@xon5/flexible-canvas-grid-without-blurred-lines-907fcadf5bfc) example. A grid is something that will come up all the time when it comes to all kinds of canvas projects, mainly games, but other projects as well such as drawing apps and so forth.

When it comes to grids there is drawing them, and then there is having a model of sorts that contains the values of the grid that is to be rendered to the canvas. I would say that it is very much a good idea to keep these things independent from each other by having one module that serves as a way to create a grid object, and another that is used to draw all of cells of this grid to a canvas element. So we will want at least three javaScriopt files, or modules if we have everything together as a single package. One module for creating a grid, another module for drawing the grid, and some additional code that will make use of these two other modules.

The state of the grid can be a state object that has a property that contains cell objects for each cell, tile, gird location, or whatever you call it for each such instance in the grid. Another approach is to just have a width and height for the count of cells, and a cell size value and think of all cell locations in an abstract sense. That is that there are only cell objects for certain locations sort of speak. Either way I would want a way to create some kind of state object, or module for this grid, and a way to render the grid to the canvas as two independent modules.

In this example I will be starting out with a very simple Grid class example, and a single drawing method that just draws the grid lines of an instance of that grid class.

<!-- more -->

<div id="canvas-app" style="width:320px;height:240px;margin-left:auto;margin-right:auto;"></div>
<script src="/js/canvas-examples/grid/0.0.0/pkg.js"></script>

## 1 - A good start for a grid module, maybe

There are many ways to go about getting started with a grid module, and there are also a whole bunch of issues that will come up when getting into the depth of such a project. Still one has to start somewhere, and this canvas example is just that.

### 1.1 - The grid module

First off I have a grid module that I can use to create and mutate a grid object. This gird object will consist of an array of cell objects where each cell will contain and index property as well as an x and y value that is the position of the cell in the grid.

```js
var gridMod = (function(){
 
    var createGrid = function (opt) {
        opt = opt || {};
        var grid = {
            ver : opt.ver || ''
        };
        grid.canvas = opt.canvas || {width: 640, height: 480};
        grid.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
        grid.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
        grid.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
        grid.width = opt.width || 4;
        grid.height = opt.height || 2;
        // create cells
        grid.cells = createBaseCellsArray(grid.width, grid.height);
        grid.bounds = createBoundsObject(grid, grid.canvas);
        return grid;
    };
 
    // set cell objects for each cell in the grid
    var createBaseCellsArray = function (width, height) {
        var cells = [],
        i = 0,
        len = width * height;
        while (i < len) {
            cells.push({
                i: i,
                y: Math.floor(i / width),
                x: i % width
            });
            i += 1;
        }
        return cells;
    };
 
    // PUBLIC API
    var api = {};
 
    // create a grid object
    api.create = createGrid;
 
    // Bounds
    var createBoundsObject = function(grid){
        var xMax = grid.cellSize,
        yMax = grid.cellSize;
        return {
            xMax: xMax,
            yMax: yMax,
            xMin: xMax + ((grid.cellSize * grid.width) - (grid.canvas.width - grid.cellSize * 2)) * -1,
            yMin: yMax + ((grid.cellSize * grid.height) - (grid.canvas.height - grid.cellSize * 2)) * -1
        };
    };
    api.applyBounds = function(grid, bounds){
        bounds = bounds || grid.bounds;
        grid.xOffset = grid.xOffset > bounds.xMax ? bounds.xMax : grid.xOffset;
        grid.xOffset = grid.xOffset < bounds.xMin ? bounds.xMin : grid.xOffset;
        grid.yOffset = grid.yOffset > bounds.yMax ? bounds.yMax : grid.yOffset;
        grid.yOffset = grid.yOffset < bounds.yMin ? bounds.yMin : grid.yOffset;
    };
    api.onEdge = function(grid){
        var bounds = createBoundsObject(grid);
        if(grid.xOffset >= bounds.xMax || 
        grid.xOffset <= bounds.xMin || 
        grid.yOffset >= bounds.yMax || 
        grid.yOffset <= bounds.yMin){
            return true;
        }
        return false;
    };
 
    // move map method
    api.moveMap = function(grid, secs, radian, pps){
        secs = secs === undefined ? 0 : secs;
        radian = radian === undefined ? 0 : radian;
        pps = pps === undefined ? 0 : pps;
 
        var deltaX = Math.cos(radian) * pps * secs;
        var deltaY = Math.sin(radian) * pps * secs;
 
        grid.xOffset += deltaX;
        grid.yOffset += deltaY;
 
    };
 
    return api;
 
}());
```

### 1.2 - The draw module

I am then going to want to have a file that I can used to draw a grid object to a canvas element. There might be a few draw methods that I would want to add to a module such as this, just for the grid alone, not taking into account other parts of the project to which I would want methods to help with the process of rendering things to a canvas element.

So then for now the main method of interest here is the draw cells method, for this I am just looping over the cell objects, and using the properties to just draw a square at the proper location in the canvas element.

```js
var draw = {};

// draw Cell Lines
draw.cells = function (ctx, grid, style) {
    var ci = 0,
    cell,
    cLen = grid.cells.length;
    ctx.strokeStyle = style || 'red';
    while (ci < cLen) {
        cell = grid.cells[ci];
        ctx.strokeRect(
            cell.x * grid.cellSize + grid.xOffset + 0.5,
            cell.y * grid.cellSize + grid.yOffset + 0.5,
            grid.cellSize, grid.cellSize)
        ci += 1;
    }
};
 
// background
draw.back = function(ctx, canvas){
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};
 
// draw info
draw.info = function(ctx, grid){
    ctx.fillStyle = 'white';
    ctx.textBaseline  = 'top';
    ctx.font = '10px arial';
    ctx.fillText('offset: ' + grid.xOffset.toFixed(2) + ' , ' + grid.yOffset.toFixed(2), 5, 5);
};
 
// version
draw.ver = function(ctx, grid){
    ctx.fillStyle = 'white';
    ctx.textBaseline  = 'top';
    ctx.font = '10px arial';
    ctx.fillText('v' + grid.ver, 5, grid.canvas.height - 15);
};
```

### 1.3 - Main.js

Now that I have my grid module, and another module that I can use to draw the grid to a canvas I am now just going to want a little additional code that will make use of these two modules. In this main.js file I will be creating and injecting a canvas element, and setting up a basic app loop.

```js
var canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
container = document.getElementById('canvas-app') || document.body;
container.appendChild(canvas);
canvas.width = 320;
canvas.height = 240;
ctx.translate(0.5, 0.5);
 
var grid = gridMod.create({
    ver: '0.0.0',
    canvas: canvas,
    width: 16,
    height: 8
});
 
var lt = new Date(),
radian = Math.PI * 1.75;
var loop = function () {
 
    var now = new Date(),
    secs = (now - lt) / 1000;
 
    requestAnimationFrame(loop);
 
    gridMod.moveMap(grid, secs, radian, -128);
    gridMod.applyBounds(grid);
    if(gridMod.onEdge(grid)){
        radian = Math.PI * 2 * Math.random();
    }
 
    draw.back(ctx, canvas);
    draw.cells(ctx, grid);
    draw.info(ctx, grid);
    draw.ver(ctx, grid);
 
    lt = new Date();
 
};

loop();
```

So far so good, but there are at least a few more features I should pack on top of this in order to start to turn it into something that I could actually use in a project. However there might only be so much more to add to the grid module actually in terms of public methods. In a real project I would not just have a simple app loop, but a state machine that would contain a lot of the additional features that I would want in a project.

## 2 - Canvas grid example with draw grid lines method and basic Grid constructor

So in this section I will start out with a very basic Grid Constructor that will serve as a way to pull away the data state of the Grid away from the logic that is used to render that grid. In addition I will just have one draw method that will render the grid lines of the Grid. All other canvas examples in this post will just be improvements, additions, or just simply changes to this basic Canvas Grid example.

### 2.1 - The html file

Here I have the html file that I am using for the example. In the html I just have a single div element that I am using as a container for the canvas example where I will be creating a canvas element with javaScript and then injecting it.

```html
<html>
    <head>
        <title>canvas grid</title>
    </head>
    <body>
        <div id="gamearea"></div>
        <script src="main.js"></script>
    </body>
</html>
```

The html file also has a single script tag that links to an external main.js file where I will have all the javaScript code for the example in this section. Any additional sections in this post will just be different renditions of this main.js file.

### 2.2 - The Grid constructor in main.js

So I start off my main javaScript file for this Canvas Grid example with a basic Grid constructor. This constructor does not have anything going on with the prototype object at least in this example at least.

```js
// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
};
```

So for now the constructor just creates a standard object that just contains some values that outline the values of a grid such as the x and y offset values of the upper left corner of the gird in the canvas matrix. The cellSize of each grid cell or tile f you prefer, and the width and height of the gird in cell count rather than pixel size.

### 2.3 - The Draw Grid Lines Method

After I define the Gird constructor I write my first draw method that can be used to draw the current state of an instance of my Grid constructor. For now this draw method just renders the lines of the gird, a method that I might want to have when ot comes to using something like this in an actual project.

There are many ways to go about writing this kind of method, for this example I decided to go with the two loops kind of approach that seems to be common when it comes to this kind of thing. You might think that it is possible to have just one loop wrapped up into a single separate method and then just call that method twice with deferent arguments. You would be right about that and I will be getting to that in a latter section in this post, however doing so might make things more complicated then they need to be.

```js
// draw grid lines method
var drawGridLines = function (ctx, grid, style) {
    var x,
    y,
    cx = 0,
    cy = 0;
    ctx.strokeStyle = style || 'red';
    while (cy < grid.cellHeight + 1) {
        y = cy * grid.cellSize + grid.yOffset + 0.5;
        x = grid.xOffset + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        x = grid.xOffset + grid.cellSize * grid.cellWidth + 0.5;
        ctx.lineTo(x, y);
        ctx.stroke();
        cy += 1;
    }
    while (cx < grid.cellWidth + 1) {
        y = grid.yOffset + 0.5;
        x = cx * grid.cellSize + grid.xOffset + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, y);
        y = grid.yOffset + grid.cellSize * grid.cellHeight + 0.5;
        ctx.lineTo(x, y);
        ctx.stroke();
        cx += 1;
    }
};
```

The draw grid lines method seems to work okay, but there is the question of drawing more than just grid lines for the canvas Grid. Doing so might require some more work on the Grid constructor, and the introduction of cell objects though, and for now I would like to keep this basic example of a Canvas Grid clean and simple.


### 2.4 - Setup

So now for the setup of the canvas element, and to make use of what I worked out here. I start out by creating a canvas element and setting that to a variable that I also used to get a reference to the 2d drawing context. I then append that canvas element to the container element which in this case is a div element in the HTML.

I then call my Grid constructor using the new keyword,and pass some options for the grid. I then save a reference to the grid instance and use that to draw the gird lines by passing that to my draw grid lines method along with the drawing context and a style to use when stroking the grid lines.

```js
// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;
 
    // creating a grid instance
    var grid = new Grid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        });
 
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    // draw grid lines
    drawGridLines(ctx, grid, 'orange');
}
    ());
```

When this example is up in running in my browser it results in a simple grid being rendered in the canvas. I can change the options that I pass to the gird constructor and that changes the state of this grid.

Not much to get excited over at this point, however in this section the aim is to just start out with a very simple canvas grid example. At this point the Grid constructor is just simply that a constructor function without any methods added to the prototype just yet. Also although my draw grid lines method is working okay I am not sure if I am happy with it, I might like replace that with something else. So lets look at some additional revisions of this in the additional sections in this post.

## 3 - An attempt at a draw grid axis method

So as I mentioned in the previous section on the basic canvas grid example it is of course possible to create a sort of draw grid axis lines method that would then be called twice. Just a method could be called twice in the body of the draw grid lines method.

```js
// Draw a grid Axis
var drawGridAxis = function (ctx, grid, axis, style) {
    axis = axis || 'y';
    var otherAxis = axis === 'y' ? 'x' : 'y',
    ca = 0,
    caOffset = grid[axis + 'Offset'],
    oaOffset = grid[otherAxis + 'Offset'],
    caLen = grid['cell' + (axis === 'y' ? 'Height' : 'Width')],
    oaLen = grid['cell' + (axis === 'y' ? 'Width' : 'Height')],
    a1,
    a2;
    ctx.strokeStyle = style || 'green';
    while (ca < caLen + 1) {
        a1 = ca * grid.cellSize + caOffset + 0.5;
        a2 = oaOffset + 0.5;
        ctx.beginPath();
        if (axis === 'y') {
            ctx.moveTo(a2, a1);
        } else {
            ctx.moveTo(a1, a2)
        }
        a2 = oaOffset + grid.cellSize * oaLen + 0.5;
        if (axis === 'y') {
            ctx.lineTo(a2, a1);
        } else {
            ctx.lineTo(a1, a2)
        }
        ctx.stroke();
        ca += 1;
    }
};
 
// Now by drawGridLines method just calls 
// drawGridLines twice
var drawGridLines = function(ctx, grid, style){
    drawGridAxis(ctx, grid, 'y', style);
    drawGridAxis(ctx, grid, 'x', style);
};
```

This satisfies a desire to find a way to keep from repeating the same code, but it also results in a more complicated way of doing the same thing. So maybe there is yet another way to go about doing this that will be a bit more concise, I hate making things more complicated than they need to be. I can get into adding some more features to my Grid constrictor such as cells, and then just loop threw that array of cells as a way of drawing grid lines, and also any additional drawing for the background of each cell.

## 4 - Draw Canvas Grid Cells method and first Grid Constructor Prototype method

So now lets make a more advanced version of the Gird constructor that introduces at least one prototype method. In addition I think it is time to have a cells array as part of the Grid constructor as well. This gird cells array will be a collection of objects, and each object can contain values like the cell position in the grid, and also an index value for a type of background for the cell. So I can just loop over this array and use that data in the drawing method, to draw grid lines as well as backgrounds.

The single prototype method will be used to build the cells array, and will be called with the constructor, but it could also be used after the instance is created to rebuild the cells of the grid.

In addition to creating a prototype method for the Grid constructor in this section I will also be going over a draw Cell lines method that will be yet another way to draw the lines of a grid, however in some respects this might be a better way of doing so, and the other draw methods that I have outlined so far may not be necessary. There is more than one way to solve a problem, and if I am going to have a cells array for my Grid constructor this might be the preferred way to go about drawing canvas Grid lines.

### 4.1 - The Canvas Grid Constructor

So here is the updated Grid constructor, things are more or less the same only now I am calling a set cells method in the body of the constructor, and of course I have that method in the prototype object of the Grid constructor.

I made it so that the set cells method can accept a single argument that is a function that will be called for each cell in the Grid. I am not sure if I really want or even need that feature though I could always just do an [Array.prototype.forEach](/2019/02/16/js-javascript-foreach/) call over the cells array as it is a public property of a Grid constructor instance. This might be getting off topic for this section at least, as here I just want a slightly more advanced version of the grid constructor that introduces cells, and a single prototype method that creates that array of cells.

```js
// GRID
var Grid = function (opt) {
    opt = opt || {};
    this.xOffset = opt.xOffset === undefined ? 5 : opt.xOffset;
    this.yOffset = opt.yOffset === undefined ? 5 : opt.yOffset;
    this.cellSize = opt.cellSize === undefined ? 32 : opt.cellSize;
    this.cellWidth = opt.cellWidth || 7;
    this.cellHeight = opt.cellHeight || 6;
    // set cells for the grid
    this.setCells();
};
 
// set cell objects for each cell in the grid
Grid.prototype.setCells = function (forCell) {
    this.cells = [];
    var ci = 0,
    cellObj,
    cLen = this.cellWidth * this.cellHeight;
    forCell = forCell || function () {};
    while (ci < cLen) {
        cellObj = {
            i: ci,
            y: Math.floor(ci / this.cellWidth),
            x: ci % this.cellWidth,
            backgroundIndex: 0
        };
        forCell(cellObj);
        this.cells.push(cellObj);
        ci += 1;
    }
};
```

I have decided to go with a single linear array design rather than an array of arrays design. Having to choose between one or the other ends u being a rabbit hole of sorts for me that I wish to avoid by just simply choosing this kind of approach of that other general option that I see often.

### 4.2 - The Draw Canvas Grid Cell Lines method

Here I have the draw canvas grid lines method that is yet another way of going about drawing grid lines in canvas with javaScript. This might be a better way though considering that I can do so with just a single loop without making things more complicated as I did the the previous sections.

```js
// draw Cell Lines
var drawCellLines = function (ctx, grid, style) {
    var ci = 0,
    cell,
    cLen = grid.cells.length;
    ctx.strokeStyle = style || 'red';
    while (ci < cLen) {
        cell = grid.cells[ci];
        ctx.strokeRect(
            cell.x * grid.cellSize + grid.xOffset + 0.5,
            cell.y * grid.cellSize + grid.yOffset + 0.5,
            grid.cellSize, grid.cellSize)
        ci += 1;
    }
};
```

This method should maybe be keep separate from any additional draw methods such as one that draws the backgrounds of each cell in the grid. This will help to keep things more fine grain, and also I might only want to draw grid lines alone for the grid, or I might want to draw the grid lines after drawing the backgrounds.

### 4.3 - Draw the canvas grid cell backgrounds

So now on top of having a draw method that draws the grid lines I now have a methods that will draw the backgrounds also. This method works more or less the same way, only now I am using the draw image method, and I am passing a reference to a tile sheet in the from of an image or another canvas element. This of course makes use of the background index value that I added to the cell objects.

```js
// draw cell backgrounds
var drawCellBackgrounds = function (ctx, grid, sheet) {
    var ci = 0,
    cell,
    cLen = grid.cells.length;
    while (ci < cLen) {
        cell = grid.cells[ci];
        ctx.drawImage(
            sheet,
            // source
            cell.backgroundIndex * grid.cellSize + 0.5,
            -0.5,
            grid.cellSize, grid.cellSize,
            // placement
            cell.x * grid.cellSize + grid.xOffset + 0.5,
            cell.y * grid.cellSize + grid.yOffset + 0.5,
            grid.cellSize, grid.cellSize)
        ci += 1;
    }
};
```

I will not be getting into the draw image method in depth here but the first argument is of course a reference to the sheet that I will be using to draw the backgrounds, and then there are values for the source position as well as width in height when it comes to getting the tile in the tile sheet, followed by the same set of values for drawing it to the canvas.

### 4.4 - Using the new Grid Constructor and draw methods

So then once again I just need to use everything I worked out. This time I am still using the same options as before, but now I am also creating a sprite sheet as a canvas element rather than loading an extremal image, and using the canvas as the tile sheet when calling the draw cell backgrounds method. 

I also set some background index properties of cell objects to something other than the default zero value. For this sheet I just have two cell values, but in a real project there would of course be many more.

```js
// SETUP CANVAS
(function () {
    // create and append canvas element, and get 2d context
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    container = document.getElementById('gamearea') || document.body;
    container.appendChild(canvas);
    // set width and height
    canvas.width = 320;
    canvas.height = 240;
 
    // creating a grid instance
    var grid = new Grid({
            xOffset: 15,
            yOffset: 25,
            cellSize: 32,
            cellWidth: 9
        });
 
    // create a sheet
    var sheet = document.createElement('canvas'),
    ctx_sheet = sheet.getContext('2d');
    sheet.width = 64;
    sheet.height = 32;
    ctx_sheet.fillStyle = 'orange';
    ctx_sheet.fillRect(0, 0, sheet.width, sheet.height);
    ctx_sheet.fillStyle = 'green';
    ctx_sheet.fillRect(grid.cellSize, 0, grid.cellSize, grid.cellSize);
 
    // setting some cells to a background index
    // other that the default 0
    grid.cells[10].backgroundIndex = 1;
    grid.cells[18].backgroundIndex = 1;
    grid.cells[19].backgroundIndex = 1;
    grid.cells[20].backgroundIndex = 1;
    grid.cells[28].backgroundIndex = 1;
 
    // fill black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
 
    // draw backgrounds
    drawCellBackgrounds(ctx, grid, sheet);
    // draw grid lines
    drawCellLines(ctx, grid, 'grey');
 
}
    ());
```

When this example is working I see what I would expect I have orange tiles as the default background, and then green tiles for each one that I have set to a value of one. I then have gray grid lines over this.

## 5 - Conclusion

This is my no means the end all be all solution for creating a canvas grid there are many different ways of going about doing this, such is the nature of programing in general of course. I was considering making more of a functional approach to this for example where there would be a method that just creates a plain old object that can then be passed to all kinds f methods that act on that object. In any case I might use what is written here in additional posts on canvas examples that make used of a grid to do something interesting.