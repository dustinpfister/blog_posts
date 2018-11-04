---
title: Setting Drag in phaser ce
date: 2018-10-30 21:10:00
tags: [js,phaser]
layout: post
categories: phaser
id: 317
updated: 2018-11-04 07:59:30
version: 1.19
---

For many projects using [phaser ce](https://photonstorm.github.io/phaser-ce/index.html) there will come a time now and then where it will be necessary to set some air resistance or drag for physics enabled display objects. In this post I will be coving the use of the body.drag property of the arcade physics engine in phaser ce, as a way to set drag for a physics body.

<!-- more -->

## 1 - What to know before continuing.

In this post I am writing about an example that I made that makes use of drag using the built in arcade physics engine in phaser ce. This is not a getting started post on the arcade physics engine, or phaser in general. There are many aspects of the phaser ce game framework that are used in this post, and I will not be covering all of them. The drag property is an instance of [Phaser.Point](/2018/11/03/phaser-point/) so I can use the set method or user the x and y properties to set the values for drag.

### 1.1 - This is a phaser ce 2.x post

In this post I am using phaser community edition 2.11.1 of [phaser](https://phaser.io/).

## 2 - A Cannon ball example using drag

For an example of using drag in phaser ce I thought a simple game prototype that is the beginnings of a cannon launch type game. You know one of those many games that have come out over the years that involve shooting something at a certain angle, and starting velocity. Where the object is typically to get what it is that is begging launched as far of a distance as possible. As such making a prototype of that kind of game might prove to be a good example of not just using drag, but other aspects of physics as well such as gravity, and velocity.

### 2.1 - The update Drag method

Here I have a method that I worked out that will be used to update drag on each frame tick. There are a few methods that will be called before this is used, so when calling this method in the update method of the game state it will not be grabbing at undefined values for the cannon ball and so forth. 

I could just set drag in a way in which it is just fixed, always coming from one direction. The nice thing about game development is that all that really matters is how game play turns out, and realism is not always that important, unless for some reason it is. Still I decided that if I am going to make a post in which I am writing about drag I should make some complex example that updates drag on each tick, changing the direction of drag as the ball changes direction.

```js
var updateDrag = function (game) {
 
    var ball = game.data.ball,
    disp = game.data.disp,
    angle = ball.body.angle / Math.PI * 180,
    speed = ball.body.speed,
    drag,
 
    // drag percent formula
    dragPer = .5 + .5 * (speed / 250);
 
    // cap dragPer
    if (dragPer > 1) {
        dragPer = 1;
    }
 
    // set drag
    drag = dragPer * 40;
    ball.body.drag.set(
        Math.cos(angle) * drag,
        Math.sin(angle) * drag);
    // seting drag differently if on the floor
    if (ball.body.onFloor()) {
        ball.body.drag.set(drag, 0);
    }
 
    // updating display text
    disp.text = 'drag: ' + drag.toFixed(2) + ', velocityX: ' + ball.body.velocity.x.toFixed(2);
 
};
```

So I get the current body angle of the ball via Sprite.body.angle, and use that with its speed via Sprite.body.speed to set the drag of the ball. However in the event that the ball is rolling along the floor I do make sure that the drag is coming directly from the right using the onFloor method to find out if that should happen or not.

### 2.2 - The launchBall method

So in this project when a cannon sprite is clicked it will cause the ball to launch from the cannon. So I will need a launchBall handler that will fire when the canon is clicked or when whatever cause the cannon to fire when making a user interface.

So then in this method I set the position of the ball to the position of the cannon, revive the ball if it is in a dead state, have the camera follow the ball, and set the velocity of the ball based on certain values that are set before hand elsewhere.

```js
var launchBall = function (game) {
 
    var launch = game.data.launch,
    ball = game.data.ball,
    gfx = launch.gfx,
    cannon = launch.cannon,
    power;
 
    // only do something if launch is not active
    if (!launch.active) {
 
        // set active
        launch.active = true;
 
        // set ball to position of the cannon
        ball.x = cannon.centerX;
        ball.y = cannon.centerY;
 
        // revive the ball
        ball.revive();
 
        // have camera follow the ball
        game.camera.follow(ball);
 
        // launch power used to set velocity
        power = launch.distance / 200 * launch.maxPower;
 
        // velocity
        ball.body.velocity.set(
            Math.cos(launch.angle) * power,
            Math.sin(launch.angle) * power);
 
    }
 
};
```

### 2.3 - Make The launch pad sprite

This is a method that makes a sprite that just serves as part of the user interface.

```js
var mkLaunchPad = function (game) {
 
    var launch = game.data.launch;
 
    launch.pad = game.add.graphics();
    launch.pad.clear();
    launch.pad.beginFill(0xff0000, .2);
    launch.pad.drawRect(0, 0, 240, 240);
    launch.pad.inputEnabled = true;
    launch.pad.events.onInputDown.add(function (gfx, pt) {
        //game.input.onDown.add(function (pt) {
        var angle = launch.cannon.position.angle(pt.position),
        distance = launch.cannon.position.distance(pt.position);
 
        launch.angle = angle;
 
        distance = Phaser.Math.clamp(distance, 0, 200);
 
        launch.distance = distance;
 
        drawLaunchLines(game);
 
        console.log(launch.angle);
 
    });
 
};
```

### 2.4 - make the Cannon sprite

Here I have a method that creates the cannon sprite. The way I have the user interface designed for this example the ball will launch when the cannon is clicked to the cannon sprite is input enabled.

```js
var mkCannonSprite = function (game) {
 
    var launch = game.data.launch,
    cannon = game.add.sprite(10, game.world.height - 32 - 10, 'sheet-cannon', 0);
 
    // enable input for the cannon sprite
    cannon.inputEnabled = true;
    cannon.events.onInputDown.add(function () {
        launchBall(game);
    });
    launch.cannon = cannon;
 
};
```

### 2.5 - Make the Ball Sprite

So then I need to make the ball sprite as well. Here I enable physics for the ball sprite, and set gravity, and bounce for the sprite as well.

```js
var mkBallSprite = function (game) {
 
    var ball = game.data.ball = game.add.sprite(0, 0, 'sheet-ball', 0);
    ball.anchor.set(0.5, 0.5);
    ball.kill();
 
    // enable physics
    game.physics.enable(ball);
 
    // ball collides with only down bounds
    ball.body.collideWorldBounds = true;
    game.physics.arcade.checkCollision.down = true;
    game.physics.arcade.checkCollision.up = false;
    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;

    // gravity
    ball.body.gravity.set(0, 100);
 
    // bounce
    ball.body.bounce.set(.4, .4);
 
};
```

### 2.6 - Make a Graphics Object for drawing lines

So I will want to draw some lines so I know the current direction and angle that I will be launching the ball, so I will want to make a graphics object for that.

```js
var mkGFX = function (game) {
 
    var launch = game.data.launch;
    var gfx = game.add.graphics();
    gfx.fixedToCamera = true;
    launch.gfx = gfx;
 
};
```

#### 2.6.1 - Draw Grid Lines

This draw method will be used with the graphics object when the ball is launched. It draws grid lines so that I know that the ball is in motion, otherwise it will just be a black background.

```js
var drawGridLines = function (game) {
 
    var launch = game.data.launch,
    ball = game.data.ball,
    gfx = launch.gfx;
 
    var sx = -ball.x % 32,
    sy = Math.abs(ball.y - game.height) % 32;
 
    gfx.clear();
    gfx.lineStyle(3, 0x00ff00, .4);
 
    var cy = 0;
    while (cy < 8) {
        gfx.moveTo(0, sy + 32 * cy);
        gfx.lineTo(320, sy + 32 * cy);
        cy += 1;
    }
 
    var cx = 0;
    while (cx < 11) {
        gfx.moveTo(sx + 32 * cx, 0);
        gfx.lineTo(sx + 32 * cx, 240);
        cx += 1;
    }
 
};
```

#### 2.6.2 - Draw Launch Lines

This draw method draws lines that show me the current direction and angle that the ball will be launched.

```js
var drawLaunchLines = function (game) {
 
    var launch = game.data.launch,
    cannon = launch.cannon,
    gfx = launch.gfx;
 
    gfx.clear();
 
    gfx.lineStyle(3, 0x00ff00, 1);
 
    // angle line
    gfx.moveTo(cannon.centerX, cannon.centerY);
    gfx.lineTo(cannon.centerX + Math.cos(launch.angle) * 200, cannon.centerY + Math.sin(launch.angle) * 200);
 
    // distance line
    var x = cannon.centerX + Math.cos(launch.angle) * launch.distance,
    y = cannon.centerY + Math.sin(launch.angle) * launch.distance;
    gfx.moveTo(x, y);
    gfx.lineTo(x + Math.cos(launch.angle - Math.PI / 2) * 32, y + Math.sin(launch.angle - Math.PI / 2) * 32);
 
};
```

### 2.7 - Create the launch Object

This method sets up and object that contains properties for the state of the launched ball including the angle and distance values that will be used to set initial velocity of the ball.

```js
var createLauncher = function (game, cannon) {
 
    var launch = game.data.launch = {};
 
    mkLaunchPad(game);
 
    launch.angle = 0;
    launch.distance = 0;
    launch.active = false;
    launch.maxPower = 500;
 
    // no bounds for camera
    game.camera.bounds = null;
 
    mkCannonSprite(game);
    mkGFX(game);
    mkBallSprite(game);
 
};
```

### 2.8 - Create Sprite Sheets

So I will need to create some sprite sheets to use with the sprites as well. For simple examples like this I often use a canvas solution rather than bothering with external assets.

```js
var createBallSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.strokeStyle = 'white';
    ctx.fillStyle = '#8f0000';
    ctx.beginPath();
    ctx.arc(16.5, 16.5, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    game.cache.addSpriteSheet('sheet-ball', null, canvas, 32, 32, 1, 0, 0);
};
```

```js
var createCannonSheet = function (game) {
    var canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 32;
    canvas.height = 32;
    ctx.fillStyle = '#8f0000';
    ctx.fillRect(0, 0, 32, 32);
    game.cache.addSpriteSheet('sheet-cannon', null, canvas, 32, 32, 1, 0, 0);
};
```

### 2.9 - Phaser.Game

```js
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');
 
game.state.add('ball-bounce', {
 
    create: function () {
 
        game.data = {};
 
        createBallSheet(game);
        createCannonSheet(game);
        createLauncher(game);
        drawLaunchLines(game);
 
        // create display text
        var disp = game.data.disp = game.add.text(0, 0, '', {
                fill: 'white',
                font: '10px courier'
            });
        disp.fixedToCamera = true;
 
    },
 
    update: function () {
 
        var launch = game.data.launch;
 
        if (launch.active) {
 
            drawGridLines(game);
 
        }
 
        updateDrag(game);
 
    }
 
});
 
game.state.start('ball-bounce');
```