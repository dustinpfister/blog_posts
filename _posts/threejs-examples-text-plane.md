---
title: Text Plane Module threejs example
date: 2022-10-14 13:25:00
tags: [three.js]
layout: post
categories: three.js
id: 1009
updated: 2022-10-14 17:34:54
version: 1.11
---

I am always thinking in terms of what more I can do when it comes to making javaScript modules built on top of threejs that I can use in my [various video projects that I make for these blog posts](https://github.com/dustinpfister/videoground-blog-posts). One such idea is to make an improved way to go about adding text content to a scene object as I am not happy with my current solution for doing so. There are a number of ways of doing this sort of thing I am sure, but I was thinking in terms of making a module centered around the idea of having one or more mesh objects that use a plane geometry and canvas textures as a way of displaying text content in a scene.

The process of doing this sort of thing will then prove to be a little involved then. On top of the text plane module itself I will also want to have at least some kind of canvas module such as the one that I made for my post on canvas textures. With that said because I want to just get up and running with the text plane module I will have to just go with what I worked out when it comes to that sort of thunk so far and get to work on the text plane module. However speaking of the text plane module there is a lot that I will need to do with text, such as End of Line conversion, wrapping text, and using the various 2d canvas drawing methods to render that text to a canvas element.

This will then be yet another one of my [threejs examples](/2021/02/19/threejs-examples/) where I am writing about a module or some kind of project that is built on top threejs. This time it will have a lot to do with using canvas elements to create textures, and also a whole lot about working with text content.

<!-- more -->


## The text Plane threejs module example and what to know first

This is a post in which I am writing about the state of a javaScript module that I made that creates textures from text content using canvas elements that can then be used to skin a plane geometry. This is then a little bit of an advanced project type post in which I am assuming that you all ready have a fair amount of background with threejs and client side javaScript in general. Also this is not at all a [getting started type post with canvas elements](/2017/05/17/canvas-getting-started/) as well so I assume that you have at least a little background working with those elements as well.

### source code is up on Github

The source code for the text plane module, the canvas module I am working on top of, as well as all the demos can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-text-plane).

### version numbers matter

When I first started this example I was using r140 of threejs.

## 1 - The first version of the text plane module (\ r0\) as well as r1 of of my canvas module, and demos

In this section I am writing about r0 of the text plane module where I manage to all ready get the core idea of what I wanted working which is great. The module allows for me to quickly create a mesh object with the plane geometry constructor and the basic material with the map option set to the current state of a canvas texture that I can update as needed.

### 1.A - The canvas module \( r1 \)

I am using r1 of my canvas module that I write about in greater detail in my blog post on canvas textures.

```js
// canvas.js - r1 - from threejs-canvas-texture
(function(api){
    //-------- ----------
    // built in draw methods
    //-------- ----------
    const DRAW = {};
    // square draw method
    DRAW.square = (canObj, ctx, canvas, state) => {
        const squares = state.squares || [ {
            lw: 1,
            fi: 0,
            si: 1,
            rect: [ 0.5, 0.5, canvas.width - 1, canvas.height - 1 ] } ];
        let i = 0;
        const len = squares.length;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        while(i < len){
            const sq = squares[i];
            ctx.lineWidth = sq.lw === undefined ? 1 : sq.lw;
            ctx.fillStyle = canObj.palette[ sq.fi === undefined ? 0 : sq.fi];
            ctx.strokeStyle = canObj.palette[ sq.si === undefined ? 1 : sq.si ];
            ctx.beginPath();
            ctx.rect.apply(ctx, sq.rect);
            ctx.fill();
            ctx.stroke();
            i += 1;
        }
    };
    // random using palette colors
    DRAW.rnd = (canObj, ctx, canvas, state) => {
        let i = 0;
        const gSize =  state.gSize === undefined ? 5 : state.gSize;
        const len = gSize * gSize;
        const pxSize = canObj.size / gSize;
        ctx.clearRect(0,0, canvas.width, canvas.height);
        while(i < len){
            const ci = Math.floor( canObj.palette.length * Math.random() );
            const x = i % gSize;
            const y = Math.floor(i / gSize);
            ctx.fillStyle = canObj.palette[ci];
            ctx.fillRect(0.5 + x * pxSize, 0.5 + y * pxSize, pxSize, pxSize);
            i += 1;
        }
    };
    //-------- ----------
    // HELEPRS
    //-------- ----------
    // parse draw option helper
    const parseDrawOption = (opt) => {
        // if opt.draw is false for any reason return DRAW.square
        if(!opt.draw){
            return DRAW.square;
        }
        // if a string is given assume it is a key for a built in draw method
        if(typeof opt.draw === 'string'){
            return DRAW[opt.draw];
        }
        // assume we where given a custom function
        return opt.draw;
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // to data texture method
    api.toDataTexture = (canObj) => {
        const canvasData = canObj.texture.image.getContext('2d').getImageData(0, 0, canObj.size, canObj.size);
        const texture_data = new THREE.DataTexture(canvasData.data, canObj.size, canObj.size );
        texture_data.needsUpdate = true;
        return texture_data;
    };
    // create and return a canvas texture
    api.create = function (opt) {
        opt = opt || {};
        // create canvas, get context, set size
        const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        opt.size = opt.size === undefined ? 16 : opt.size;
        canvas.width = opt.size;
        canvas.height = opt.size;
        // create canvas object
        const canObj = {
            texture: null,
            texture_data: null,
            update_mode: opt.update_mode || 'dual',
            size: opt.size,
            canvas: canvas, ctx: ctx,
            palette: opt.palette || ['black', 'white'],
            state: opt.state || {},
            draw: parseDrawOption(opt)
        };
        // create texture object
        canObj.texture = new THREE.CanvasTexture(canvas);
        canObj.texture_data = api.toDataTexture(canObj);
        api.update(canObj);
        return canObj;
    };
    // update
    const UPDATE = {};
    // update canvas only update mode
    UPDATE.canvas = (canObj) => {
        // update canvas texture
        canObj.draw.call(canObj, canObj, canObj.ctx, canObj.canvas, canObj.state);
        canObj.texture.needsUpdate = true;
    };
    // update canvas AND data texture AKA 'dual' mode ( default for r1 )
    UPDATE.dual = (canObj) => {
        UPDATE.canvas(canObj);
        // update data texture
        const canvasData = canObj.texture.image.getContext('2d').getImageData(0, 0, canObj.size, canObj.size);
        const data = canObj.texture_data.image.data;
        const len = data.length;
        let i = 0;
        while(i < len){
            data[i] = canvasData.data[i];
            i += 1;
        }
        canObj.texture_data.flipY = true; // need to do this even though it should be the default in r140
        canObj.texture_data.center = new THREE.Vector2(0.5, 0.5);
        canObj.texture_data.needsUpdate = true;
    };
    api.update = (canObj) => {
        UPDATE[canObj.update_mode](canObj);
    };
}( this['canvasMod'] = {} ));
```

### 1.B - The text Plane Module \( r0 \)

Now for the text plane module that I can use to create a canvas object with the canvas module and use that as a way to update the textures that I can use for the map option of the material that I use for a mesh that uses the plane geometry. There is a lot to wrote about with this module in terms of both private helper functions as well as the current set of public methods that I will be using when making one or more demos, as well as actual projects that will make use of this module.

At the top of the module I have a few private helper functions that I am using, one of which is a warp text method that is based off what what I have from my [blog post on regular expressions](/2019/03/20/js-regex/), which in turn was based on what i found at [stack overflow here](https://stackoverflow.com/questions/14484787/wrap-text-in-javascript). This warp text method works somewhat okay, but with one little problem that has to do with really long words that might go beyond the max width that I want. I found a way to deal with that in my create text lines public method that I will be getting to a little later here.
Yet another concern that I have when dealing with text is that often I will be dealing with text content with a mix of End of Line patterns that are used. That is that often I will have content that will use the windows patter, and then others that will use the Unit pattern. Also often I have text content that is a mix of the two actually and this is in part because I am a bit of a Windows and Linux kind of person what keeps switching between different editors and I do not always do the best job converting end of line patterns. This is not such a big deal if I just have a little helper function that will convert all of these patterns to just one standard before splitting the text into an array of strings and that is what my End of line Convert helper function is all about.

Another helper that I have is a [vanilla javaScript alternative to the lodash chunk method](/2017/09/13/lodash-chunk/), in fact the method is copied from my post on that subject. This is a method that I am also using in my create text lines public methods to help address that problem with long words not wrapping.

The cerate lines helper is what I call once to create a fixed set of objects that I update as needed in order to display text content. The smooth y helper is the method that i use to update these lines to display a long volume of text. I then also have the built in draw function that I use for the draw option when creating the canvas object with my canvas javaScript module that I wrote about above. That about covers all the private helper functions now I just need to wrote a thing or two about the public methods of this thing.

```js
// canvas.js - r1 - from threejs-canvas-texture
(function(api){
    //-------- ----------
    // HELPERS
    //-------- ----------
    // wrap text method
    // https://stackoverflow.com/questions/14484787/wrap-text-in-javascript
    // https://dustinpfister.github.io/2019/03/20/js-regex/
    const wrapText = function (str, width) {
        const patt = new RegExp('(?![^\\n]{1,' + width + ')([^\\n]{1,' + width + '})\\s', 'g');
        return str.replace(patt, '$1\n');
    };
    // EOL CONVERSION - replace all /r/n and /r with /n
    const EOLConvert = (text) => {
        return text.replace(/\r\n/g,'\n').replace(/\r/g,'\n')
    }
    // VANILLA JAVASCRIPT LODASH CHUNK ALTERTAIVE
    // https://dustinpfister.github.io/2017/09/13/lodash-chunk/
    const chunk = function (arr, size) {
        const chunkedArr = [];
        arr = arr || [];
        size = size === undefined ? 1 : size;
        for (let i = 0; i < arr.length; i += size) {
            chunkedArr.push(arr.slice(i, i + size));
        }
        return chunkedArr;
    };
    // create an array of text objects to use with the drawText method
    // this is a reusable set of objects
    const createLines = (canObj, rows) => {
        let i = 0;
        const lines = [];
        while(i < rows){
            lines.push({
                text: '',
                x: 10, y:0,
                lw: 1, 
                fc: canObj.palette[1],
                sc: canObj.palette[2],
                a: 'left', f: 'arial', fs: '20px', bl: 'top'
            });
            i += 1;
        }
        return lines;
    };
    // smooth move of lines on the Y
    const smoothY = (lines, alpha, sy, dy) => {
        let i = 0;
        const len = lines.length;
        while(i < len){
            const li = lines[i];
            li.y = sy + dy * i - dy * alpha * 1;
            i += 1;
        }
    };
    // The custom draw text method to be used with canvas.js
    const drawText = (canObj, ctx, canvas, state) => {
        ctx.fillStyle = canObj.palette[0];
        // clear rect then fill so that I can have a transparent background if I want
        ctx.clearRect(0,0,canvas.width, canvas.height)
        ctx.fillRect(0,0, canvas.width, canvas.height);
        state.lines.forEach((li)=>{
            ctx.lineWidth = li.lw;
            ctx.textAlign = li.a;
            ctx.textBaseline = li.bl;
            ctx.font = li.fs + ' ' + li.f;
            ctx.fillStyle = li.fc;
            ctx.strokeStyle = li.sc;
            ctx.fillText(li.text, li.x, li.y);
            ctx.strokeText(li.text, li.x, li.y);
        });
    };
    //-------- ----------
    // PUBLIC API
    //-------- ----------
    // create just a canvas object that will work
    // for a material. I will want to call this if I want to
    // use the resulting texture with a mesh object other than a plane
    // of as a background or something to that effect
    api.createCanObj = (opt) => {
        opt = opt || {};
        let canObj = canvasMod.create({
            draw: drawText,
            size: opt.size === undefined ? 512 : opt.size,
            update_mode: opt.update_mode || 'canvas',
            state: {
                lines: []
            },
            palette: opt.palette || ['#080808', '#8a8a8a', '#ffffff']
        });
        canObj.state.lines = createLines(canObj,  opt.rows === undefined ? 9 : opt.rows );
        return canObj;
    };
    // make plane helper function
    //api.makePlane = (texture, w, h) => {
    api.createPlane = (opt) => {
        opt = opt || {};
        const canObj = api.createCanObj(opt);
        // create plane
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(opt.w, opt.h, 1, 1),
            new THREE.MeshBasicMaterial({
                map: canObj.updateMode === 'dual' ? canObj.texture_data : canObj.texture,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 1
            })
        );
        plane.userData.canObj = canObj;
        // return the new plane
        return plane;
    };
    // create text lines
    api.createTextLines = (text, cols) => {
        let arr = wrapText(EOLConvert(text), cols).split('\n');
        // need to break down lines that are at or above cols
        arr = arr.map((a)=>{
            if(a.length >= cols){
                return chunk(a.split(''), cols).map((b)=>{ return b.join('')})
            }
            return a;
        }).flat()
        return arr;
    };
    // Just move the given text lines
    api.moveTextLines = (lines, textLines, alpha, sy, dy) => {
        linesLen = lines.length;
        const tli = Math.floor( textLines.length * alpha);
        textLines.slice(tli, tli + linesLen).forEach( (text, i) => {
            lines[i].text = text;
        });
        smoothY(lines, alpha * textLines.length % 1, sy, dy);
    };
}( this['TextPlane'] = {} ));
```

### 1.1 - First demo of the text plane module \( r0 \)

Now that I wrote about the canvas and text plane modules I will now want to have at least one if not more demos of this for the sake of making sure that it is working the way that I would like it to.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.75, 0.75, 0.75);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 20);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// CANVAS OBJECT
//-------- ----------
//let canObj2 = TextPlane.createCanObj({
//    update_mode: 'canvas',
//    rows: 5, size: 256, palette: ['rgba(0,255,255,0.25)', 'black', 'black']
//})
//-------- ----------
// MESH
//-------- ----------
//let plane = TextPlane.makePlane(canObj2.texture, 7, 5);
const plane = TextPlane.createPlane({
    w: 7, h: 5,
    //update_mode: 'dual', // Might not need data textures
    rows: 10, size: 256, palette: ['rgba(0,255,255,0.2)', 'black', 'black']
});
plane.position.set(0, 2.5, 0);
scene.add(plane);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\nThis is just a little demo of my text plane module thus far. \n\nIt is all ready working okay, or at least it seems to be working well thus far. I am sure there may be at least one or two bugs still maybe,this is just r0 of the module after all. \n\nIf all goes well I am sure that I will start using this in a lof of my video projects as a way to add text content to an over all scene. \n'
const textLines = TextPlane.createTextLines(text2, 22);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 600;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    // UPDATE
    TextPlane.moveTextLines(plane.userData.canObj.state.lines, textLines, b, 0, 30);
    // update canvas
    canvasMod.update(plane.userData.canObj);
    // update camera
    camera.position.set(-4 * b, 1, 5);
    camera.lookAt(0, 1.5, 0);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

## Conclusion

I will want to make at least one if not more revisions of this module, but even if I do not get around to it I think I have the general idea that i had in mind working all ready.