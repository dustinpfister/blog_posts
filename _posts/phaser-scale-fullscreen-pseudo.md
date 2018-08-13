---
title: Pseudo full screen in phaser using that scale manager
date: 2018-08-13 17:06:00
tags: [js,phaser,games]
layout: post
categories: phaser
id: 258
updated: 2018-08-13 18:22:50
version: 1.10
---

Toggling full screen when making a [phaser](http://phaser.io) project can end up becoming a bit of a rabbit hole, at least that has been my experience with it. Never the less, I think I have worked out some solutions that seem to work okay. With the phaser Scale manager it is possible to make a request to set actual full screen mode in the browser, and with some browsers this works fine without any problems. However on some browsers it will not work, so there might be a desire of a back up plan, one that involves just simply scaling up the game to the full size of the browser window. Doing so with phaser is a little involved, but in the post I will be writing about toggling a kind of pseudo full screen mode in phaser.

<!-- more -->

## 1 - what to know about before continuing

This is an advanced post on phaser, the javaScript powered game frame work used to make web based games. In this post I will be writing about many different aspects of the framework, and web development that I will not be covering in detail. However if you have at least some background with phaser, and javaScript you might find this post useful.

## 1.1 - The Scale Manager

In the post I am using the Phaser Scale Manager. As the name implies this is the component of phaser that is of interest when it comes to Scaling a game, or toggling full screen. This manager has many properties, and methods, but I will only be covering some of the most relevant aspects of the Scale manager in this post. If you want to read more about that scale manager there is always the [phaser ce docs](https://photonstorm.github.io/phaser-ce/Phaser.ScaleManager.html) on the subject.


## 2 - An example of pseudo full screen

For an example of pseudo full screen, fake full screen, or just simply game canvas scaling I will be making a simple phaser example. This example will just be a basic image of something like just a circle, in a real project this will of course be the view port of a game, but for the scope of just scaling it should work just fine. When I click the canvas of this project the canvas will scale up to the size of the browser window, and when I click it again it will go back to the old location in the layout of a page. 

This can be archived by removing the canvas from the layouts container element, and then placing it in a fixed position div. Then when it is toggled back, it will be removed from the fixed div, and back to the original container. As you might guess the fixed div is placed above all other content on the page, and is scaled to fit the whole of the window.

### 2.1 - The index.html file

So the html file of this project represents what would be a layout of some kind. When I have a game placed in a web site it will often just be a small section of that page, along with other content. So My html file contains that container, as well as links to phaser, and my main.js file that will contain everything else.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Phaser Demos</title>
        <link rel="stylesheet" href="/css/style_vanilla.css">
    </head>
    <body style="margin:0px;padding:0px">
 
        <div style="margin-left:15px;margin-right:15px;">
            <div style="position:relative;width:100%;height:100px;background:#af0000;"></div>
            <div style="position:relative;background:#00af00;padding:20px;">
                <div id="gamearea"></div>
            </div>
        </div>
 
        <script src="/js/phaser.min.js"></script>
        <script src="./main.js"></script>
    </body>
</html>
```

What it does not have is the fixed position div element. This is something that I think should be generated in my code in order to help make the project a little more portable.

### 2.2 - The main.js file

In my main.js file I create my instance of Phaser.Game, and create a single state called resize. In this state I create a single simple display object that represents what would be the contents of a game. I am disabling scrollTo as I do with most of my phaser projects, and then I create, and append the fixed div I mentioned earlier.

Then I add a handler for any kind of onDown event that will be used to toggle the scale. This works by first checking which scale mode is currently active. If it is NO_SCALE then I will want to have the scale mode change to SHOW_ALL, and scale up the canvas. If it is All ready set to the SHOW_All ScaleMode then I will want to put it back to normal.

When scaling the canvas up I will want to set the windowConstraints bottom value to 'visual', if I do not do this then the canvas might scale relative to the layout of the page which I do not want. The pageAlignHorizontally, and pageAlignVertically properties should also be set to true from there default false values. These properties are important because I am using the SHOW_all scale mode that will preserve aspect ration as it scales, so I will want the result centered.

Next I set the target scale by setting the game.scale.width, and game.scale.height properties to the values I want to scale to, in this case it is window.innerWidth, and window.innerHeight. I then also set the size of the fixed div as well to make sure that it is the same area as the window.

I then use the Phaser.Canvas.removeFromDom method to remove the canvas from the dom. The canvas element will still be at game.canvas, it will just no longer be appended to the container, as I want to place it in the fixed div I made, which is of couse what I do next with the appnedChild method. Once that is all done I set the scale mode to SHOW_All. This will also trigger a refresh for the scale manager, so I do not have to call that method manually.

```js
game.state.add('resize', {
 
    create: function () {
 
        // just a circle
        var bx = game.add.graphics(160, 120);
        bx.beginFill(0x008f00);
        bx.drawCircle(0, 0, 240);
        bx.endFill();
        game.stage.backgroundColor = '#2a2a2a';
 
        // disable scrollTo
        game.scale.compatibility.scrollTo = false;
 
        // inject a fixed position DIV for SCALE
        var fixDiv = document.createElement('div');
        fixDiv.style.position = 'fixed';
        fixDiv.style.top = '0px';
        fixDiv.style.left = '0px';
 
        // setFiex to be called when toggling to pseudo full screen
        // or when the window is resized
        var setFixed = function () {
            game.scale.width = window.innerWidth;
            game.scale.height = window.innerHeight;
            fixDiv.style.width = game.scale.width + 'px';
            fixDiv.style.Height = game.scale.height + 'px';
        };
 
        // call setFixed on window resize
        window.addEventListener('resize', function () {setFixed();});
 
        // append to body
        document.body.appendChild(fixDiv);
 
        // on input down toggle full screen
        game.input.onDown.add(function () {
 
            // IF scale mode is NO_SCALE then toggle to SHOW_ALL
            if (game.scale.scaleMode === Phaser.ScaleManager.NO_SCALE) {
 
                // set window constraints to 'visual' for both right, and bottom
                game.scale.windowConstraints.bottom = 'visual';
 
                // I will want the scaled canvas to align horizontally/Vertically
                game.scale.pageAlignHorizontally = true;
                game.scale.pageAlignVertically = true;
 
                // set
                setFixed();
 
                // remove from dom
                Phaser.Canvas.removeFromDOM(game.canvas);
 
                // append to fixDIV
                fixDiv.appendChild(game.canvas);
 
                // set scale mode to 'SHOW_ALL'
                game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
 
            } else {
 
                // ELSE if scale mode is not NO_SCALE toggle back
 
                // set window constraints back to default
                game.scale.windowConstraints.bottom = '';
 
                // I will want to set these back to there defaults
                game.scale.pageAlignHorizontally = false;
                game.scale.pageAlignVertically = false;
 
                // remove from dom
                Phaser.Canvas.removeFromDOM(game.canvas);
 
                // append back to game.parent
                document.getElementById(game.parent).appendChild(game.canvas);
 
                // set scale back to NO_SCALE
                game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
 
            }
 
        });
 
    }
 
});
 
game.state.start('resize');
```

The process of putting things back is kind of a reversal of the same process as before. I once again use the Phaser.Canvas.removeFromDom method to remove the canvas from the dom, but I now place it back in the container that is in the layout of the page.

## 3 - Conclusion

This project along with just about everything else that I make is a work in progress. I might want to do a great deal more with this to make it more robust, but the basic idea is there. The canvas just needs to be removed from the container in the page layout, and then placed in a new container that is fixed to the browser window, scaled to the size of the window, and hopefully has a zIndex that is above all other content on the page. Once that canvas is in it's new container I just need to set the scale mode that I want, and the size of the scale, alonge with any other relevant properties set in the scale manager.

I hope you found this post helpful, if so you might want to check out my many other posts on phaser. Thank you for reading.
