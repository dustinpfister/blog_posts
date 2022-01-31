---
title: Source Layer javaScript tool example
date: 2022-01-31 14:15:00
tags: [js]
layout: post
categories: js
id: 956
updated: 2022-01-31 14:46:26
version: 1.6
---

For a final new [javaScript example](/2021/04/02/js-javascript-example/) for this month at least I made what might prove to be the first of several tool type project examples. What I mean by this is that I might often want to create some kind of project where the aim is to create some kind of resource such as a sprite sheet, world map, or maybe just some kind of image asset actually. I do not care so take the time to create a full blown image editor from the ground up mind you when it comes to that I have come to enjoy just using GIMP and moving on with my life. However often it might make sense to create some kind of custom image editor where I can open up a image file that I do not want to use directly as part of the image project, but to just serve as a source for a drawing that I will create in another canvas layer on top of this source layer.

<!-- more -->

## 1 - The source layer module

The main event of this javaScript example is then the source layer module that I made, later in this post I will be going over some addtional code that will have to do with making use of this to create a basic pain program.

```js
var sourceLayer = (function(){
    // public api
    var api = {
       ver: 'r3'
    };
    // hard coded values
    var ON_IMAGE_LOAD = function(source){};
    var ON_UPDATE = function(source){};
    var UI_HTML = '<span>Background:</span><br><br>' +
                'image: <input id=\"ui-background-image\" type=\"file\"><br><br>' +
                'mode: <select id=\"input-background-mode\">' +
                    '<option value=\"center\">Center</option>' +
                    '<option value=\"custom\">Custom</option>' +
                    '<option value=\"stretch\">Stretch</option>' +
                '</select><br><br>' +
                '<div id="bgui-zoom" ><input id=\"ui-background-zoom\" type=\"range\" value=\"1\" min=\"0\" max=\"4\" step=\"0.05\">' +
                '<span>Zoom</span><br></div>' +
                '<div id="bgui-rotation" >'+
                     '<input id=\"ui-background-rotation\" type=\"range\" value=\"0\" min=\"0\" max=\"1\" step=\"0.01\">' +
                     '<span>Rotation</span><br>' +
                '</div>' +
                '<div id="bgui-pos" >dx: <input id=\"ui-background-dx\" type=\"text\" size="4"> '+
                'dy: <input id=\"ui-background-dy\" type=\"text\" size="4"> <br></div>' +
                '<div id="bgui-size" >dw: <input id=\"ui-background-dw\" type=\"text\" size="4"> ' +
                'dh: <input id=\"ui-background-dh\" type=\"text\" size="4"> <br></div>';
    // back ground modes
    var MODES = {};

    // use full image mode helper
    var useFullImageSource = function(source){
        source.sx = 0;
        source.sy = 0;
        if(source.image){
            source.sw = source.image.width;
            source.sh = source.image.height;
        }
    };

    var useCenterPos = function(source){
        source.dx = source.canvas.width / 2;
        source.dy = source.canvas.height / 2;
    };

    var useSourceSize = function(source){
        source.dw = source.sw;
        source.dh = source.sh;
    }

    // center mode
    MODES.center = {
        controls: ['zoom', 'rotation'],
        init: function(source){
            useFullImageSource(source);
            useCenterPos(source);
            useSourceSize(source);
        },
        update: function(source){}
    };
    // custom mode
    MODES.custom = {
        controls: ['zoom', 'rotation', 'pos', 'size'],
        init: function(source){
            useFullImageSource(source);
            useCenterPos(source);
            useSourceSize(source);
        },
        update: function(source){}
    };
    // stretch mode
    MODES.stretch = {
        controls: [],
        init: function(source){
            useFullImageSource(source);
            useCenterPos(source);
            // set destanation width and height to canvas width and height
            source.dw = source.canvas.width;
            source.dh = source.canvas.width;
            // zoom is not used and should always be 1
            source.zoom = 1;
        },
        update: function(source){
            source.zoom = 1;
        }
    };
    // get element helper
    var get = function(q){
        return document.querySelector(q);
    };
    // resolve a string to an element object, or just return what should be a element object
    var resolveElRef = function(elRef){
        if(typeof elRef === 'object' && elRef != null){
            return elRef
        }
        if(typeof elRef === 'string'){
            return document.querySelector(elRef);
        }
        return null
    };
    // draw place holder image when no image is loaded
    var drawPlaceHolder = function(ctx, x, y, w, h){
        ctx.fillStyle = 'black';
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.rect(x ,y, w, h);
        ctx.fill();
        ctx.stroke();
        ctx.stroke();
    };
    // draw the current state of a source object to the context of the source object
    var draw = function(source){
        var canvas = source.canvas,
        ctx = source.ctx;
        // clear source layer
        ctx.clearRect(-1, -1 , canvas.width + 2, canvas.height + 2);
        // draw source image to layer with current settings
        ctx.save();
        ctx.translate(source.dx, source.dy);
        ctx.rotate(source.radian);
        var w = source.dw * source.zoom,
        h = source.dh * source.zoom,
        x = w / 2 * -1,
        y = h / 2 * -1;
        if(source.image){
            ctx.drawImage(source.image, source.sx, source.sy, source.sw, source.sh, x, y, w, h);
        }else{
           drawPlaceHolder(ctx, x, y, w, h);
        }
        ctx.restore();
    };
    // update a source object
    var update = function(source){
        var modeObj = MODES[source.mode];
        if(source.image){
            modeObj.update(source);
        }
    };
    // main method used to create a source object
    api.create = function(opt){
        opt = opt || {};
        var source = {
            mode: 'center',
            canvas: null,
            ctx: null,
            zoom: 1,
            radian: 0,
            image: null,
            sx: 0, sy: 0, sw: 100, sh: 100, dx: 0, dy: 0, dw: 100, dh: 100,
            onImageLoad: opt.onImageLoad || ON_IMAGE_LOAD,
            onUpdate: opt.onUpdate || ON_UPDATE
        };
        var canvas = source.canvas = resolveElRef(opt.canvas);
        if(canvas){
            canvas.width = opt.width;
            canvas.height = opt.height;
            source.ctx = canvas.getContext('2d');
            // values for placeholder
            source.dx = canvas.width / 2;
            source.dy = canvas.height / 2;
            source.dw = 320;
            source.dh = 240;
        }
        // call init foe the current mode, for first time
        var modeObj = MODES[source.mode];
        modeObj.init.call(source, source);
        // draw and return
        draw(source);
        return source;

    };
    // for each control helper
    var forEachControl = function(source, el, ifOn, ifOff){
        var modeObj = MODES[source.mode];
        ['zoom', 'rotation', 'pos', 'size'].forEach(function(key){      
            var controlEl = el.querySelector('#bgui-' + key);
            if(modeObj.controls.some(function(modeKey){
                return key === modeKey;
            })){
                ifOn(source, controlEl, el, key);
            }else{
                ifOff(source, controlEl, el, key);
            } 
        });   
    };
    // display controls for just the current mode
    var displayControlsForMode = function(source, el){
        forEachControl(source, el, 
            function(source, controlEl){
                controlEl.style.visibility = 'visible';
            },
            function(source, controlEl){
                controlEl.style.visibility = 'hidden';
            }
        );
    };
    // update control values to source object
    var UpdateControlValuesForMode = function(source, el){
        get('#ui-background-zoom').value = source.zoom;
        get('#ui-background-rotation').value = source.radian / (Math.PI * 2)
        get('#ui-background-dx').value = source.dx;
        get('#ui-background-dy').value = source.dy;
        get('#ui-background-dw').value = source.dw;
        get('#ui-background-dh').value = source.dh;
    };
    // create a text input hander for props like dx dy dw and dh
    var createTextInputHander = function(source, el, key){
        return function(e){
            source[key] = e.target.value;
            update(source);
            draw(source);
            displayControlsForMode(source, el);
            UpdateControlValuesForMode(source, el);
        };
    };
    // create an HTML User Interface for the given source object and append it to the given mount point
    api.createSourceUI = function(source, mountEl){
        var el = resolveElRef(mountEl);
        el.innerHTML = UI_HTML;
        // handlers
        sourceLayer.appendImageHandler(source, '#ui-background-image');
        sourceLayer.appendZoomHandler(source, '#ui-background-zoom');
        sourceLayer.appendRotationHandler(source, '#ui-background-rotation');
        // change mode
        get('#input-background-mode').addEventListener('change', function(e){
            source.mode = e.target.value;
            var modeObj = MODES[source.mode];
            modeObj.init.call(source, source);
            update(source);
            draw(source);
            displayControlsForMode(source, el);
            UpdateControlValuesForMode(source, el);
        });
        get('#ui-background-dx').addEventListener('input', createTextInputHander(source, el, 'dx'));
        get('#ui-background-dy').addEventListener('input', createTextInputHander(source, el, 'dy'));
        get('#ui-background-dw').addEventListener('input', createTextInputHander(source, el, 'dw'));
        get('#ui-background-dh').addEventListener('input', createTextInputHander(source, el, 'dh'));
        displayControlsForMode(source, el);
        UpdateControlValuesForMode(source);
    };
    // append image hander
    api.appendImageHandler = function(source, fileEl){
        var fileEl = resolveElRef(fileEl);
        fileEl.addEventListener('change', function(e){
            var files = e.target.files,
            file = files[0];
            var reader = new FileReader();
            reader.addEventListener('load', function () {
                var img = source.image = new Image();
                img.src = reader.result;
                img.addEventListener('load', function(){
                    source.onImageLoad.call(source, source);
                    var modeObj = MODES[source.mode];
                    modeObj.init.call(source, source);
                    update(source);
                    draw(source);
                    UpdateControlValuesForMode(source);
                    source.onUpdate.call(source, source);
                });
            }, false);
            if (file) {
                reader.readAsDataURL(file);
            }
        });
    };
    // zoom hander
    api.appendZoomHandler = function(source, fileEl){
        var fileEl = resolveElRef(fileEl);
        fileEl.addEventListener('input', function(e){
            source.zoom = e.target.value
            draw(source);
            source.onUpdate.call(source, source);
        });
    };
    // rotation
    api.appendRotationHandler = function(source, fileEl){
        var fileEl = resolveElRef(fileEl);
        fileEl.addEventListener('input', function(e){
            source.radian = Math.PI * 2 * (parseFloat(e.target.value) / 1);
            draw(source);
            source.onUpdate.call(source, source);
        });
    };
    // return the public API
    return api;
}());
```

## 2 - Demo app that is a basic art program

Now that I have the source layer module worked out I will want to make a demo the makes use of this source layer module to create an over all tool. For this javaScript example the over all tool is a basic art program, and when it comes to this I do not care to create some kind of full blown image manipulation program of course, just something with a very crude set of features that I would want to start something that I would then continue to work on in such a program.

### 2.1 - The main javaScript file

For this over all example I just have all the additional javaScrit code that I am using in a single additional javaScript file apart from the source layer module that I include in the hard coded html.

```js
var get = function(q){
    return document.querySelector(q);
};
 
// source layer set up
var source = sourceLayer.create({
   canvas: '#canvas-source',
   width: 640, height: 480,
   onUpdate: function(source){
   }
});
sourceLayer.createSourceUI(source, '#ui-background');
 
// out
get('#ui-out').innerText = 'version: ' + sourceLayer.ver;
 
// draw layer
var canvas = get('#canvas-draw'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 480;
var sm = {
    canvas: canvas,
    ctx: ctx,
    down: false,
    size: 0.5,    // 0.25 to 20 with a 0.25 step
    tool: 'brush',
    color: '#000000'
};
 
var paintAt = function(sm, pos){
    var ctx = sm.ctx;
    if(sm.tool === 'brush'){
        ctx.beginPath();
        ctx.fillStyle = sm.color;
        ctx.arc(pos.x, pos.y, sm.size, 0, Math.PI * 2);
        ctx.fill();
    }
    if(sm.tool === 'eraser'){
        ctx.save();
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, sm.size, 0, Math.PI * 2);
        ctx.clip();
        ctx.clearRect(pos.x - sm.size, pos.y - sm.size, sm.size * 2, sm.size * 2);
        ctx.restore();
    }
};
 
// get position helper
var getPos = function(e){
    var bx = e.target.getBoundingClientRect(),
    pos = {};
    if(e.touches){
        pos.x = e.touches[0].clientX;
        pos.y = e.touches[0].clientY;
    }else{
        pos.x = e.clientX;
        pos.y = e.clientY;
    }
    pos.x = pos.x - bx.left;
    pos.y = pos.y - bx.top;
    return pos;
};
 
var pointerDown = function(e){
    sm.down = true;
    paintAt(sm, getPos(e));
};
var pointerMove = function(e){
    if(sm.down){
        paintAt(sm, getPos(e));
    }
};
var pointerUp = function(e){
    sm.down = false;
};
var pointerOut = function(e){
    sm.down = false;
};
 
canvas.addEventListener('mousedown', pointerDown);
canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mouseup', pointerUp);
 
canvas.addEventListener('touchstart', pointerDown);
canvas.addEventListener('touchmove', pointerMove);
canvas.addEventListener('touchend', pointerUp);
 
canvas.addEventListener('pointerout', pointerOut);
 
// clear button
get('#ui-draw-clear').addEventListener('click', function(){
   sm.ctx.clearRect(-1, -1, sm.canvas.width + 2, sm.canvas.height + 2);
});
// tool select
get('#ui-draw-tool').addEventListener('input', function(e){
    console.log(e.target.value);
    sm.tool = e.target.value;
});
// color select
get('#ui-draw-color').addEventListener('input', function(e){
    sm.color = e.target.value;
});
sm.color = get('#ui-draw-color').value;
// size select
var sizeUpdate = function(){
    var size = parseFloat( get('#ui-draw-size').value );
    sm.size = size;
    get('#ui-draw-size-disp').innerText = size;
};
get('#ui-draw-size').addEventListener('input', function(e){
    sizeUpdate();
});
sizeUpdate();
```

### 2.2 - The html file

I then have some html that will work with the main javaScript file.

```html
<html>
    <head>
        <title>Source Layer</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <!-- canvas -->
        <div id="area-canvas">
            <canvas id="canvas-source" class="canvas-layer"></canvas>
            <canvas id="canvas-draw"  class="canvas-layer"></canvas>
        </div>
        <!-- UI -->
            <!-- out -->
            <div id="ui-out" class="ui">
            </div>
            <!-- background -->
            <div id="ui-background" class="ui">
            </div>
            <div id="ui-draw" class="ui">
                <span>Draw:</span><br><br>
                <input id="ui-draw-clear" type="button" value="clear"><br>
                <select id="ui-draw-tool">
                    <option value="brush">Brush</option>
                    <option value="eraser">Eraser</option>
                </select><br>
                <input id="ui-draw-color" type="color" value="#000000"><br>
                <input id="ui-draw-size" type="range" value="3.00" min="0.25" max="20" step="0.25">
                <span id="ui-draw-size-disp"></span><br>
            </div>
        <script src="js/source-layer.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
```

## 3 - Conclusion

For this example I just wanted to make a simple source layer module as a way to pull a basic feature out of another javaScript prototype that I was working on that had to do with a source layer. So in other words I was working on another project that is like this one only it was another kind of drawing program that has to do with creating a set of points.
