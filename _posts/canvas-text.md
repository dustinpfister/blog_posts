---
title: Canvas text positioning and styling
date: 2019-07-26 16:42:00
tags: [canvas]
layout: post
categories: canvas
id: 509
updated: 2020-06-26 14:48:46
version: 1.34
---

So in html [canvas text](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_text) can be rendered with methods like the [fill text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText) 2d drawing context method. There is also the [stroke text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeText) method as well that can be used as a replacement of or in addition to the fill text method. There a bunch more methods and properties to the drawing context also that are of interest when working with canvas text, but those two methods are of course good starting points to say the least.

When it comes to the style of text it is sometimes nice to use the two fillText and strokeText methods together where I fill first and then stroke over with another color. This will help make sure that the text will always show up depending on what is going on behind it when rendering. There might be other ways of helping with that, but it is of course one thing that comes to mind when rendering text to a canvas element also.

There is a bit more to know about when it comes to setting the position of text, color, the font size and font family, and so forth of canvas text. There are at least a few properties, and methods that a javaScript developer should be aware of when it comes to using canvas to render text. So lets look at some quick simple examples of working with text and canvas elements for starters. The maybe move on to a few more advanced examples that really get into using canvas text in a project.

<!-- more -->

## 1 - Canvas text basic example with fillText

To use the fill text method I just need to gain a reference to a canvas element by one way or another, and also get a reference to the 2d drawing context just like any other canvas project. Once I have a reference to the drawing content I can then set a fill style for the context and then call the fill text method. When calling the fill text method I pass the string that I want to display as the first argument followed by the x and y position that I want to place the text at.

```html
<html>
    <head>
        <title>canvas text</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="basic.js"></script>
    </body>
</html>
```

```js
// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
ctx.fillStyle='red';
ctx.fillText('hello world', 10, 10);
```

There is more to cover when it comes to the text base line as well as centering text, and controlling the size and font of text. So now that we have a basic example covered we can now get to those examples as well now.

## 2 - Setting the canvas text font

There is the [canvas font](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font) 2d drawing context property that will come into play when I want to set the font size, and font-family of the text. I do so by setting the font property to a string value where I set a pixel value for the text size followed by the string 'px' to set the value in pixels. After that I can use a space followed by the web safe font I would like to use for the text such as courier.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
ctx.fillStyle='red';
ctx.font = '20px courier';
ctx.fillText('hello world', 0, 20);
```

## 3 - Setting Canvas text color with fillStyle and strokeStyle.

The canvas text color can be set a number of ways. There is the fill style and stroke style properties that can be used to set the text color depending on what methods are being used to draw the text. There is also the values that are used for these properties and other canvas drawing context methods that have an impact on canvas text color such as the [global alpha](/2019/10/11/canvas-alpha/) property.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 270;
 
var mess = 'Hello World';
 
ctx.font = '50px arial';
ctx.lineWidth = 3;
ctx.translate(-0.5, -0.5);
 
// just using fillStyle and fillText
ctx.fillStyle='red';
ctx.fillText(mess, 0, 50);
 
// just using strokeStyle and strokeText
ctx.strokeStyle='red';
ctx.strokeText(mess, 0, 100);
 
// using fillStyle and strokeStyle
ctx.fillStyle='red';
ctx.strokeStyle='black';
ctx.fillText(mess, 0, 150);
ctx.strokeText(mess, 0, 150);
 
// using Global alpha for transparency
ctx.globalAlpha = 0.2;
ctx.strokeStyle='red';
ctx.strokeText(mess, 0, 200);
ctx.globalAlpha = 1;
 
// using RGBA color style values for transparency
ctx.strokeStyle='rgba(255,0,0,0.2)';
ctx.strokeText(mess, 0, 250);
```

## 3 - The text base line property

When working with text in the 2d canvas drawing context the [canvas text base line](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline) property can be used to set the vertical alignment of text when setting the position of a fill text method call. I generally like to set the base line of text to the top property so that the very top of the text is where the y position is that I set when drawing text with the fill text method. However There are also a number of other options when it comes to setting the base line of text in canvas.

```js
// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
// some variables for the example
// baseY is used to position a baseline
// and is also the same y value that will
// be used for the fill text method
var mess = 'Hello',
baseY = 10,
stepX = 30;
 
// drawing a line across the canvas
// with a y value of baseY
ctx.strokeStyle = 'blue';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(0, baseY);
ctx.lineTo(canvas.width, baseY);
ctx.stroke();
 
// looping over all values for baseLine to
// compare the differences.
ctx.fillStyle = 'red';
[
    'alphabetic',
    'bottom',
    'hanging',
    'ideographic',
    'middle',
    'top'
].forEach(function (baseLineValue, index) {
    ctx.textBaseline = baseLineValue;
    ctx.fillText(mess, stepX * index, baseY);
});
```

## 4 - The canvas text align property

The text baseline property is what I would want to use in a canvas project to set the vertical alignment of text. However there is also the question of horizontal alignment also, and for this there is the [text align](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign) property of the 2d drawing context. For this property there are values such as left right and center that can be used to set how text is to be rendered relative to the x value that is given when using a method like fill text..

```js
// get the canvas, context and set size
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 640;
canvas.height = 150;
 
ctx.fillStyle = 'back';
ctx.fillRect(0, 0, canvas.width, canvas.height);
 
ctx.fillStyle = 'white';
ctx.font = '120px arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('Hello World', canvas.width / 2, canvas.height / 2);
```

## 5 - Measure text

If I need to measure text metrics there is the [measure text](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/measureText) context method. Calling the method and passing a text example will return an object that contains values such as width that is the pixel with of the text with the current text settings.

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 40;

var mess = 'Hello World',
m,
dx = 0;

ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle='red';
ctx.font = '20px courier';
ctx.textBaseline = 'top';
ctx.textAlign='left';
m = ctx.measureText(mess);
dx = m.width;
ctx.fillText('hello world', canvas.width - dx, 10);
```

## 6 - Wrap canvas text

So a common problem that seems to come up a lot with canvas text is being able to wrap text. There is not canvas built in wrap text method that I know of, but the measure text method of the d2 drawing context could be used to make one.

A method could be used to directly draw the text to the canvas, or another method could be used to create an arry of lines. In other words a method that is given a drawing context and then some text, and then splits that text into an array of strings. The array of strings can then be drawn to the canvas by just looping over the array of strings, stepping the y distance for each line.

```js
var wrapText = function (ctx, text, sx, sy, w) {
    var words = text.match(/\w+/g),
    word,
    lines = [],
    currentLine = '',
    len = words.length,
    wordIndex = 0,
    x = sx,
    y = sy,
    m;
    while (wordIndex < len) {
        word = words[wordIndex];
        m = ctx.measureText(word + ' ');
        x += m.width;
        if (x + m.width < w) {
            currentLine += word + ' ';
            if (wordIndex === len - 1) {
                lines.push(currentLine);
            }
        } else {
            x = sx;
            lines.push(currentLine);
            currentLine = word + ' ';
        }
        wordIndex += 1;
    }
    return lines;
};
 
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
var text = 'So then this is some text that is a little long so it might need to be wraped';
 
ctx.font = '30px courier';
var lines = wrapText(ctx, text,0,0,canvas.width);
 
ctx.fillStyle = 'red';
ctx.textBaseline = 'top';
console.log(lines);
lines.forEach(function(line,i){
    console.log(line);
    ctx.fillText(line, 0, 40 * i)
});
```

## 7 - Canvas text example called text circles

Now that I have all the boring basic stuff out of the way it is time to have some fun and get creative working with canvas text. In this section I worked out a canvas text example that makes use of a module that can be used to create an kind of text circle object. This text circle object has its radius set by the width of the text that is given to it when it is made with a public method. I can then draw the object also with a draw method also given via the modules public api.

### 7.1 - The text circles module

Here is the text circle module that I worked out for this canvas text example. I have one private method that is used to set the measure and radius properties of a text circle object based on the text given as well as other options such as font size and spacing.

```js
var tc = (function () {
 
    // PRIVATE HELPER
 
    // set the measure and radius of a text circle
    var setMeasueAndRadius = function (tcObj) {
        tcObj.ctx.save();
        tcObj.ctx.font = tcObj.fontSize + 'px ' + tcObj.fontFamily;
        tcObj.m = tcObj.ctx.measureText(tcObj.text);
        console.log(tcObj.ctx.font, tcObj.m.width);
        tcObj.r = Math.ceil(tcObj.m.width / 2) + tcObj.space;
        tcObj.ctx.restore();
    };
 
    // PUBLIC API
    return {
 
        createTextCircleObject: function (opt) {
            opt = opt || {};
            var tcObj = {};
            tcObj.ctx = opt.ctx || document.createElement('canvas').getContext('2d');
            tcObj.text = opt.text || 'text circle';
            tcObj.fontSize = opt.fontSize || 10;
            tcObj.fontFamily = opt.fontFamily || 'arial';
            tcObj.x = opt.x === undefined ? 0 : opt.x;
            tcObj.y = opt.y === undefined ? 0 : opt.y;
            tcObj.h = opt.h === undefined ? 0 : opt.h;
            tcObj.space = opt.space || 0;
            tcObj.textStyles = opt.textStyles || ['red', 'black'];
            tcObj.circleStyles = opt.circleStyles || ['white', 'black'];
            setMeasueAndRadius(tcObj);
            return tcObj;
        },
 
        draw: function (ctx, tcObj) {
            var styles = [];
            ctx.save();
            ctx.translate(tcObj.x, tcObj.y);
            ctx.rotate(tcObj.h);
            // draw circle
            ctx.lineWidth = 3;
            styles = tcObj.circleStyles || [];
            ctx.fillStyle = styles[0] || 'red';
            ctx.strokeStyle = styles[1] || 'black';
            ctx.beginPath();
            ctx.arc(0, 0, tcObj.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            // draw text
            ctx.lineWidth = 1;
            ctx.font = tcObj.fontSize + 'px ' + tcObj.fontFamily;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            styles = tcObj.textStyles || [];
            ctx.fillStyle = styles[0] || 'red';
            ctx.strokeStyle = styles[1] || 'black';
            ctx.fillText(tcObj.text, 0, 0);
            ctx.strokeText(tcObj.text, 0, 0);
            ctx.restore();
        }
 
    };
 
}
    ());
```


### 7.2 - The modules in action

Now to see this in action with a main html file that links to my text circles module, and makes use of it to create some of these text circle objects. I link to my text circles module with a script tag, and then work out the rest of this example in an additional script tag in the html.

I start out with the example by getting a reference to a canvas element, and drawing context just like I do with any other canvas example. In then however create an array of text circle objects by using map with an array of words and calling my create text circle method in the body of the function that I pass to array map.

```html
<html>
    <head>
        <title>canvas text</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="text_circles.js"></script>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
 
var textCircles = ['wow', 'so this is', 'a little cool'].map(function (text) {
    var w = canvas.width,
    h = canvas.height,
    qw = w / 4,
    qh = h / 4;
    return tc.createTextCircleObject({
        ctx: ctx,
        x: qw - qw + Math.floor(w * Math.random()),
        y: qh - qh + Math.floor(h * Math.random()),
        h: Math.PI * 2 * Math.random(),
        text: text,
        fontSize: 10 + Math.floor(20 * Math.random()),
        space: 10
    })
});
textCircles.push(tc.createTextCircleObject({
        ctx: ctx,
        x: canvas.width / 2,
        y: canvas.height / 2,
        h: Math.PI / 180 * -45,
        text: 'This is fun!',
        circleStyles: ['rgba(255,255,255,0.5)', 'rgba(0,0,0,0.8)'],
        fontSize: 30,
        space: 10
    }));
 
ctx.fillStyle = 'blue';
ctx.fillRect(0, 0, canvas.width, canvas.height);
textCircles.forEach(function (tcObj) {
    tc.draw(ctx, tcObj);
});
 
        </script>
    </body>
</html>
```

## 8 - Wave text canvas text example

Now to get into yet another fun canvas example using canvas text. This example will involve making a module that will create and object that contains an array of objects for each character in a given string. The main object will also contain other properties that are used to update the state of that array of characters. This will allow for making methods that change the state of the properties of the objects in the array of chars so that cool things can be done with canvas text, such as having text wave.

### 8.1 - The text wave module

Here I have the main text wave module that will return a public API that can be used to create a wave text object, as well as update, and draw the object.

```js

var textWave = (function () {
    var makeCharsArray = function (obj) {
        var deltaWidth = (obj.fontSize + obj.spacing),
        halfWidth = obj.str.length * deltaWidth / 2;
        return obj.str.split('').map(function (ch, i) {
            return {
                x: i * deltaWidth - halfWidth + obj.fontSize / 2,
                y: obj.fontSize / 2 * -1,
                ch: ch
            };
        });
    };
    var waveChars = function (obj) {
        var per = obj.frame / obj.maxFrame;
        obj.chars.map(function (c, i) {
            var r = i / obj.chars.length * (Math.PI * 2) + Math.PI * 2 * per;
            c.y = Math.cos(r) * obj.fontSize - obj.fontSize / 2;
            return c;
        });
    };
    return {
        // create a wiggle text object
        createObject: function (opt) {
            opt = opt || {};
            var obj = {
                str: opt.str || 'wiggle',
                spacing: opt.spacing === undefined ? 0 : opt.spacing,
                fontSize: opt.fontSize || 10,
                cx: opt.cx === undefined ? 0 : opt.cx,
                cy: opt.cy === undefined ? 0 : opt.cy,
                frame: 0,
                maxFrame: 50,
                fps: 60,
                lt: new Date(),
                chars: []
            };
            obj.chars = makeCharsArray(obj);
            return obj
        },
        // update that object
        updateObject: function (obj, now) {
            // now date must be given
            now = now || obj.lt;
            var t = now - obj.lt,
            sec = t / 1000,
            deltaFrame = Math.floor(obj.fps * sec);
            if (deltaFrame >= 1) {
                obj.frame += deltaFrame;
                obj.frame %= obj.maxFrame;
                obj.lt = now;
            }
            waveChars(obj);
        },
        // draw that object
        draw: function (ctx, obj) {
            ctx.save();
            ctx.translate(obj.cx, obj.cy);
            ctx.fillStyle = '#00ffff';
            ctx.font = obj.fontSize + 'px courier';
            ctx.textBaseline = 'top';
            ctx.textAlign = 'center';
            obj.chars.forEach(function (c) {
                ctx.fillText(c.ch, c.x, c.y);
            });
            ctx.restore();
        }
    };
}
    ());
```

### 8.2 - Demo of text wave

Now for some html and additional javaScript that will make use of the module that I worked out.

```html
<html>
    <head>
        <title>canvas text</title>
    </head>
    <body>
        <canvas id="the-canvas"></canvas>
        <script src="text_wave.js"></script>
        <script>
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
canvas.width = 320;
canvas.height = 240;
var tw = textWave.createObject({
        str: 'hello world',
        fontSize: 20,
        spacing: 5,
        cx: canvas.width / 2,
        cy: canvas.height / 2
    });
var loop = function () {
    requestAnimationFrame(loop);
    textWave.updateObject(tw, new Date());
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    textWave.draw(ctx, tw);
};
loop();
        </script>
    </body>
</html>
```

The result of this when it is up and running is the text hello world moving up and down in a wave like pattern. Which is a cool little effect that is just scratching the surface with what can be done with canvas, text, and a little javaScript code.

## 9 - Conclusion

So hopefully this post has helped to shine some light on the whole canvas text situation. Drawing text in canvas is not so hard once you get the hang of it, but it was a little weird at first as things will not work out of the box the same was as what I am used to with plain old HTML. Because canvas is very much an html element another option with text is that I could just use some other type of element outside of the canvas element, but that would be cheating.