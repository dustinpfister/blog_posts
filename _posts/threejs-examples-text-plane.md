---
title: Text Plane Module threejs example
date: 2022-10-14 13:25:00
tags: [three.js]
layout: post
categories: three.js
id: 1009
updated: 2022-10-16 11:42:47
version: 1.19
---

I am always thinking in terms of what more I can do when it comes to making javaScript modules built on top of threejs that I can use in my [various video projects that I make for these blog posts](https://github.com/dustinpfister/videoground-blog-posts). One such idea is to make an improved way to go about adding text content to a scene object as I am not happy with my current solution for doing so. There are a number of ways of doing this sort of thing I am sure, but I was thinking in terms of making a module centered around the idea of having one or more mesh objects that use a plane geometry and canvas textures as a way of displaying text content in a scene.

The process of doing this sort of thing will then prove to be a little involved then. On top of the text plane module itself I will also want to have at least some kind of canvas module such as the one that I made for my post on canvas textures. With that said because I want to just get up and running with the text plane module I will have to just go with what I worked out when it comes to that sort of thunk so far and get to work on the text plane module. However speaking of the text plane module there is a lot that I will need to do with text, such as End of Line conversion, wrapping text, and using the various 2d canvas drawing methods to render that text to a canvas element.

This will then be yet another one of my [threejs examples](/2021/02/19/threejs-examples/) where I am writing about a module or some kind of project that is built on top threejs. This time it will have a lot to do with using canvas elements to create textures, and also a whole lot about working with text content.

<!-- more -->


## The text Plane threejs module example and what to know first

This is a post in which I am writing about the state of a javaScript module that I made that creates textures from text content using canvas elements that can then be used to skin a plane geometry. This is then a little bit of an advanced project type post in which I am assuming that you all ready have a fair amount of background with threejs and client side javaScript in general. Also this is not at all a [getting started type post with canvas elements](/2017/05/17/canvas-getting-started/) as well so I assume that you have at least a little background working with those elements as well.

### read up more on canvas and data textures

In this post I am making use of [canvas textures](/2018/04/17/threejs-canvas-texture) as a way to display text with the plane geometry of a mesh object. There is a lot to cover when it comes to just getting started with canvas elements alone, as well as using canvas elements to create textures in threejs. There are also other ways of creating textures with javaScript code in threejs such as [data textures](/2022/04/15/threejs-data-texture/) which allow for creating textures with raw color data.

### source code is up on Github

The source code for the text plane module, the canvas module I am working on top of, as well as all the demos can be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-text-plane).

### version numbers matter

When I first started this example I was using r140 of threejs.

## 1 - The first version of the text plane module \( r0 \) as well as r1 of of my canvas module, and demos

In this section I am writing about r0 of the text plane module where I manage to all ready get the core idea of what I wanted working which is great. The module allows for me to quickly create a mesh object with the plane geometry constructor and the basic material with the map option set to the current state of a canvas texture that I can update as needed. I can then create an array of text lines from a raw text source, and then use that with an update lines method to have scrolling text in a canvas element that I can then use to create and update a texture that is used with the plane geometry.

On top of writing about the text plane module itself, I will also want to write about the canvas module that I am working on top of as well as at least one of not more demos.

### 1.A - The canvas module \( r1 \)

I am using r1 of my canvas module that I write about in greater detail in my blog post on canvas textures. The main thing about this module is to just have a way to abstract away methods that I use to draw to the 2d context away into a module. There are two built in examples of this in the module itself with the square and rnd built in methods. However I did not want to go nuts with built in draw methods as much of that will be customized in the various additional modules that I will make that will work on top of this, such a the text plane module that this blog post is all about.

The two main public methods here are the create method, and the update method. The create method will create and return a new canvas object that will contain a reference to a canvas element, a 2d drawing context and also one or two textures depending on the update mode. You see I am a little torn between using canvas textures and data textures when it comes to creating texture with JavaScript code rather than external image assets. So I made this module in such a way that I can just update a canvas texture, or both a canvas texture and a data texture. Doing both is expensive so that is why I have update modes where if I am in a situation in which canvas alone is fine I can just update the canvas texture only and save overhead.

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

The create lines helper is what I call once to create a fixed set of objects that I update as needed in order to display text content. The smooth y helper is the method that i use to update these lines to display a long volume of text. I then also have the built in draw function that I use for the draw option when creating the canvas object with my canvas javaScript module that I wrote about above. That about covers all the private helper functions now I just need to wrote a thing or two about the public methods of this thing.

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

The create canvas object method is what will call the create method of my canvas module to create the object that is returned that contains references to a canvas element as well as everything else that is included in such an object such as the state object that will hold the line objects used for rendering text to the canvas. This create canvas object public function is what I will want to call directly if I want to create a canvas object by itself to use with something other than a plane. For example say that I want to use the texture property of the canvas object to use as a texture for the background of a whole scene. I can create just the texture object with this method and then set the value of scene.background to the texture.

I then have a create plane method that will create a canvas object and append that to the user data object of the mesh object, and a mesh object will be what is returned by this. This allows be to quickly create and set up a mesh object complete with the canvas object, geometry, and a material with the map value set to the texture or data texture property of the canvas object depending on the update mode.

The create text lines public method is what I will want to call in order to convert plain old text into an array of sub strings that can then work well with the line objects of the state object of the canvas object.

I then also have a move lines method that is what I am current using to update the state of the lines of the state object of the canvas object.

### 1.1 - First demo of the text plane module \( r0 \)

Now that I wrote about the canvas and text plane modules I will now want to have at least one if not more demos of this for the sake of making sure that it is working the way that I would like it to. For this demo the aim is not to do anything fancy I will just want to create a mesh object with the canvas object, plane, and material all set up for my by calling that create plane method. I will then just want to create an array of text lines to use with it and the use that array of text lines with the move lines method in an update loop.

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
// MESH
//-------- ----------
const plane = TextPlane.createPlane({
    w: 7, h: 5,
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

So far so good, it would seem that I have the general idea of what I would like working. Now I might want to test out at least a few more things before moving on to making my next revision of this module. There is the idea of testing this out with other mesh objects, as well as doing things like mutating the position attribute of a plane and a whole bunch of other things.

### 1.2 - Using a Sphere by calling the create canvas object method rather than create plane

When I make a module like this often I will just have a create method and an update method, however for this module I know that I am going to want to have at least two create methods. There is the create plane method that will create and return a mesh object with everything set up for me and ready to go. However what if I want to try a mesh object with the sphere Geometry rather than plane geometry, or what if I want to use the canvas texture with some other material or map of a material? That is then why I have the create canvas method as an alternative to just always calling the create plane method.

Here in this example I am creating just the canvas object and then using it with a mesh object in which I am using a sphere geometry rather than that of plane geometry.

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
const canObj = TextPlane.createCanObj({
    rows: 12, size: 512,
    palette: ['rgba(0,255,255,0.2)', 'black', 'black']
});
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 80, 80),
    new THREE.MeshBasicMaterial({
        map: canObj.texture
    })
);
scene.add(mesh);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\n\nThe main idea that I had with this involved just plane geometry.\n\nHowever I am going to want to have two create methods for this module, one of which I can use to create just a canvas object rather than a mesh. There are a lot of reasons why, one of which would be to use the texture of the canvas object with a whole other mesh object with geometry other than that of a plane. \n\n'
const textLines = TextPlane.createTextLines(text2, 30);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 0.75, 1.25);
camera.lookAt(0, 0, 0);
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
    TextPlane.moveTextLines(canObj.state.lines, textLines, b * 0.4, 0, 30);
    // update canvas
    canvasMod.update(canObj);
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

### 1.3 - Using a custom draw method for one or more new canvas objects

One major thing that I would like to do is to not just have text moving over a solid color background, but over some other kind of texture. This could be the texture that is all ready used for a model or texture that I create with other  canvas objects as I am doing here.

The generate idea is to create a canvas object with the text plane module, but use it to just update the canvas element and use that canvas element with the draw image method of the 2d context of other canvas elements. I then use a final canvas element that uses textures from a canvas that is used to create a background, and then the texture that is used for text to draw over it. This final canvas element is then  what I will use to create and update a texture that in turn is used for the map property of a material of a mesh object.

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
// canvas object 1 will be used for text
const canObj1 = TextPlane.createCanObj({
    rows: 12, size: 256,
    palette: ['rgba(0,0,0,0)', 'black', 'black']
});
// canvas object 2 will use the 'rnd' built in draw method
// as a way to create a background a little more interesting
// than just a static background
let canObj2 = canvasMod.create({
    draw: 'rnd',
    size: 256,
    update_mode: 'canvas',
    state: {
        gSize: 16
    },
    palette: ['red', 'lime', 'cyan', 'purple', 'orange', 'green', 'blue']
});
// canvas object 3 will be the final background use for the material
let canObj3 = canvasMod.create({
    draw: function(canObj, ctx, canvas, state){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 0.3;
        ctx.drawImage(canObj2.canvas, 0, 0);
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.translate(128, 128);
        let d = state.rStart + state.rDelta * state.rAlpha;
        ctx.rotate(Math.PI / 180 * d);
        ctx.drawImage(canObj1.canvas, -128, -128);
        ctx.restore();
    },
    size: 256,
    update_mode: 'canvas',
    state: {
        rStart: -90,
        rDelta: 180,
        rAlpha: 0
    },
    palette: ['black', 'white']
});
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3.75, 2),
    new THREE.MeshBasicMaterial({
        map: canObj3.texture,
        transparent: true
    })
);
mesh.position.set(0, 1, 0);
scene.add(mesh);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\n888888888-888888888-88***\n\n\nThis is the custom draw method demo.\n\nThe idea here is that the canvas object that I am using for the text is just being used to update the canvas element. I then use that canvas element with the draw image method when drawing to another canvas element that is actauly used to to skin a geometry of a mesh object. \n\n'
const textLines = TextPlane.createTextLines(text2, 22);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(0, 1, 2);
camera.lookAt(0, 1, 0);
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
    TextPlane.moveTextLines(canObj1.state.lines, textLines, b * 0.5, 0, 30);
    // update canvas
    canvasMod.update(canObj1);
    //canvasMod.update(canObj2); // background can be animated or static
    canObj3.state.rAlpha = b;
    canvasMod.update(canObj3);
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

### 1.4 - One last r0 demo of the plane text module that has to do with mutation of plane geometry

One last demo of r0 of the plane texture module threejs example until I get around to making an r1 of the module I think. This time I will be making an example that not only uses the text plane module, but also involves some additional code that will mutate the position attribute of the geometry of the mesh that I am using the canvas object with. You see as of r0 I do not have any options for setting the width and height segment counts when it comes to using the create plane method. In future revisions I thing I will be changing that and adding options for that. One major reason why is because I think I will like to make this module not just update the state of a texture to use with the map option of a material use with the mesh object, but also update the state of buffer attribute values such as the position attribute.

In future revisions I have plans to make a more advanced system where I do not just make use of a built in draw function for updating texture, but also make use of built in code that has to do with mutation of geometry also. However for now I have to just do these sorts of things by making one or more helper function in example code that will be the first steps in the direction of making one or more options for update geometry as well as material of a plane.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.75, 0.75, 0.75);
scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(75, 320 / 240, .025, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// HELPERS
//-------- ----------
const setLinesStyle = (lines, lw, fs, f) => {
   lines.forEach((lObj)=>{
       lObj.lw = lw;
       lObj.fs = fs + 'px';
       lObj.f = f;
   });
};
// update position attribute
const updatePlaneGeoPosition = (plane, alpha, opt) => {
    opt = opt || {};
    opt.m = opt.m || new THREE.Vector3(6, 4, 0.2);
    opt.xWaves = opt.xWaves === undefined ? 8 : opt.xWaves;
    opt.yWaves = opt.yWaves === undefined ? 0.5 : opt.yWaves;
    const geo = plane.geometry;
    const pos = geo.getAttribute('position');
    let i = 0;
    const w = geo.parameters.widthSegments + 1;
    const h = geo.parameters.heightSegments + 1;
    while(i < pos.count){
        const x = i % w;
        const y = Math.floor(i / w);
        const px = x / ( w - 1 ) * opt.m.x - ( w - 1 ) *  opt.m.x / 2 / (w - 1 ) ;
        const py = y / ( h - 1 ) * opt.m.y * -1 + ( h - 1 ) *  opt.m.y / 2 / (h - 1);
        //let pz = 0;
        //let pz = Math.sin(i / pos.count * 8 * Math.PI * 2) * 0.2;
        //let pz = Math.sin(i / pos.count * 8 * (Math.PI * (x * 0.6 / w)) * 2) * 0.2;
        let xWaves = opt.xWaves * alpha;
        let yWaves = Math.PI * 2 * (y / h) * opt.yWaves;
        let pz = Math.sin(x / w * xWaves * ( Math.PI + yWaves) * 2) * opt.m.z;
        pos.setXYZ(i, px, py, pz);
        i += 1;
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
};
//-------- ----------
// CANVAS OBJECT
//-------- ----------
// canvas object 1 will be used for text
const canObj1 = TextPlane.createCanObj({
    rows: 12, size: 256,
    palette: ['rgba(0,0,0,0)', '#8f8f8f', '#ffffff']
});
setLinesStyle( canObj1.state.lines, 1, 31, 'arial');
// canvas object 2 will use the 'rnd' built in draw method
// as a way to create a background a little more interesting
// than just a static background
let canObj2 = canvasMod.create({
    draw: 'rnd',
    size: 256,
    update_mode: 'canvas',
    state: {
        gSize: 16
    },
    palette: ['red', 'lime', 'cyan', 'purple', 'orange', 'green', 'blue']
});
// canvas object 3 will be the final background use for the material
let canObj3 = canvasMod.create({
    draw: function(canObj, ctx, canvas, state){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw down the back canvas
        ctx.globalAlpha = 1;
        ctx.drawImage(canObj2.canvas, 0, 0);
        // black overlay
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        // draw the text
        ctx.globalAlpha = 1;
        ctx.drawImage(canObj1.canvas, 0, 0);
    },
    size: 256,
    update_mode: 'canvas',
    state: {
    },
    palette: ['black', 'white']
});
//-------- ----------
// MESH
//-------- ----------
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(3.75, 2, 20, 20),
    new THREE.MeshBasicMaterial({
        map: canObj3.texture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6
    })
);
plane.position.set(0, 0, 0);
scene.add(plane);
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(30, 30, 30),
    new THREE.MeshBasicMaterial({
         wireframe: true
    })
);
scene.add(sphere);
//-------- ----------
// TEXT and textLines
//-------- ----------
const text2 = '\n\n\n\n\nThe idea with this demo is to make an example where I am not just using the text plane module but also some additional code that has to do with mutating the position attribute of the buffer geometry instance that is created with the plane geometry constructor. \n\n\nThis is then something that I will want to back into future revisions maybe as I would like to turn the project into something that is not just used to create a texture, but also update the geometry of the mesh object that is used to display the texture as well. \n\n\nHowever for now this is something that I will have to just do with example code until I fine a good way to abstract it away into the module. \n';
const textLines = TextPlane.createTextLines(text2, 17);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 7);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 12, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    let a = frame / frameMax;
    let b = 1 - Math.abs(0.5 - a) / 0.5;
    // UPDATE
    updatePlaneGeoPosition(plane, a, {
        xWaves : 8 * b,
        yWaves: 0.15 * a,
        m: new THREE.Vector3(10 + 2 * b,6 + 4 * b,1.5)
    });
    TextPlane.moveTextLines(canObj1.state.lines, textLines, b * 1, 0, 40);
    // update canvas
    canvasMod.update(canObj1);
    canvasMod.update(canObj2);
    canvasMod.update(canObj3);
    // camera
    camera.position.x = 3 - 6 * b;
    camera.lookAt(0, 0, 0);
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

I will want to make at least one if not more revisions of this module, but even if I do not get around to it I think I have the general idea that I had in mind working all ready. i just simply wanted to have a way to take some text, create an array of sub strings that are formatted to fix into the size of a canvas element, and then also have a way to scroll that content and all ready I am able to do just that.

I have some ideas for future revisions of this module of course, and if you really want to find out what that is there is checking gout the todo lost in the Github folder. I might however in time might even want to work out yet even another system based off of what I have worked out here, but with 3d text rather than plane geometry and canvas elements. However that would be a better for a whole other post and project if I ever get around to that one.

