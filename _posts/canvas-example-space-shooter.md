---
title: Canvas Examples a Space Shooter game
date: 2019-08-21 19:41:00
tags: [js, canvas]
layout: post
categories: canvas
id: 527
updated: 2019-08-21 19:49:34
version: 1.2
---

So this post might be the first of several [canvas examples](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial), this one will be on a space shooter game. This is a project that I threw together in just a few hours, so it is not really a complete game at the time of this writing at least. Still I have some fun with this one, and I might get around to putting more time into this one at some point.

<!-- more -->

## 1 - The Canvas Example

### 1.1 - The html file of the canvas example

```html
<html>
    <head>
        <title>canvas example space shooter</title>
    </head>
    <body>
        <canvas id="the-canvas" width="320" height="240"></canvas>
        <script src="disp-obj-helpers.js"></script>
        <script src="disp-obj-class-base.js"></script>
        <script src="disp-obj-class-ship.js"></script>
        <script src="main.js"></script>
    </body>
</html>
```

### 1.2 - The helpers file

```js
var disp = disp || {};
 
// apply canvas bounds to given display object with the given canvas
disp.applyBounds = function (obj, canvas) {
    var w = obj.w || 16,
    h = obj.h || 16;
    if (obj.x < -w) {
        obj.x = canvas.width + w - Math.abs(obj.x) % (canvas.width + w);
    }
    if (obj.x > canvas.width + w) {
        obj.x = obj.x % (canvas.width + w);
    }
    if (obj.y < -h) {
        obj.y = canvas.height + h - Math.abs(obj.y) % (canvas.height + h);
    }
    if (obj.y > canvas.height + h) {
        obj.y = obj.y % (canvas.height + h);
    }
};
 
// move a display Obj with the current heading and pps relative to the
// given amount of time in ms
disp.moveObj = function (obj, t) {
    var s = t / 1000;
    var delta = obj.pps * s;
    obj.x += Math.cos(obj.heading) * delta;
    obj.y += Math.sin(obj.heading) * delta;
};
 
// distance
disp.distance = function (obj1, obj2) {
    return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
};
```

### 1.2 - The Base Display Object Class

```js
var disp = disp || {};
// Base Display Object
disp.BaseObj = function (opt) {
    opt = opt || {};
    this.x = opt.x === undefined ? 0: opt.x;
    this.y = opt.y === undefined ? 0: opt.y;
    this.w = opt.w === undefined ? 16: opt.w;
    this.h = opt.h === undefined ? 16: opt.h;
    this.heading = opt.heading === undefined ? 0: opt.heading;
    this.pps = opt.pps === undefined ? 0: opt.pps;
};
// update method
disp.BaseObj.prototype.update = function (t) {
    t = t === undefined ? 0 : t;
    disp.moveObj(this, t);
    disp.applyBounds(this, canvas);
};
// Base draw to a canvas method
disp.BaseObj.prototype.draw = function (ctx) {
    var hw = this.w / 2,
    hh = this.h / 2;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.strokeRect(-hw, -hh, this.w, this.h);
    ctx.restore();
};
```

### 1.3 - The Ship Display Object Class

```js
var disp = disp || {};
// Ship Class
disp.Ship = function (opt) {
    opt = opt || {};
    // use Base Constructor first
    Object.assign(this, new disp.BaseObj(opt));
    // Ship props
    this.shotMax = opt.shotMax === undefined ? 5 : opt.shotMax; ;
    this.shotLife = opt.shotLife === undefined ? 1500 : opt.shotLife;
    this.shotDelay = opt.shotDelay === undefined ? 350 : opt.shotDelay;
    this.shotPPS = opt.shotPPS === undefined ? 256 : opt.shotPPS;
    this.shotDamage = opt.shotDamage === undefined ? 1 : opt.shotDamage;
    this.maxHP = opt.maxHP === undefined ? 10 : opt.maxHP;
    // internals
    this.shots = [];
    this.shotTime = 0;
    this.HP = this.maxHP;
};
// inherit from BaseObj
disp.Ship.prototype = new disp.BaseObj();
// ship update
disp.Ship.prototype.update = function (t, shipPool) {
    // apply BaseObj update first
    disp.BaseObj.prototype.update.call(this, t);
    // update shots
    this.updateShots(t, shipPool);
};
disp.Ship.prototype.hit = function (shot) {
    this.HP -= shot.damage;
    this.HP = this.HP < 0 ? 0 : this.HP;
    console.log('hit!', this.HP);
};
// update shots
disp.Ship.prototype.updateShots = function (t, shipPool) {
    this.shotTime += t;
    var s = t / 1000;
    // create new shots
    var newShots = this.shotTime / this.shotDelay;
    if (newShots >= 1) {
        this.shotTime = this.shotTime % this.shotDelay;
        if (this.shots.length < this.shotMax) {
            this.shots.push({
                x: this.x,
                y: this.y,
                heading: this.heading,
                pps: this.pps + 128,
                life: this.shotLife,
                damage: 1
            });
        }
    }
    // update shots
    this.shots.forEach(function (shot) {
        disp.moveObj(shot, t);
        shot.life -= t;
        disp.applyBounds(shot, canvas);
        if (shipPool) {
            shipPool.forEach(function (ship) {
                if (disp.distance(ship, shot) <= ship.w) {
                    ship.hit(shot);
                    shot.life = 0;
                }
            });
        }
    });
    // purge old shots
    var i = this.shots.length;
    while (i--) {
        var shot = this.shots[i];
        if (shot.life <= 0) {
            this.shots.splice(i, 1);
        }
    }
};
// draw The Ship to a canvas context
disp.Ship.prototype.draw = function (ctx, shipStyle, shotStyle) {
    var hw = this.w / 2,
    hh = this.h / 2;
    // draw ship
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading);
    ctx.beginPath();
    ctx.moveTo(16, 0);
    ctx.lineTo(-8, 8);
    ctx.lineTo(-8, -8);
    ctx.closePath();
    ctx.strokeStyle = shipStyle || 'white';
    ctx.stroke();
    ctx.restore();
    // draw shots
    ctx.fillStyle = shotStyle || 'white';
    this.shots.forEach(function (shot) {
        ctx.fillRect(shot.x - 2, shot.y - 2, 4, 4);
    });
};
```

### 1.4 - The main.js file

```js
var canvas = document.getElementById('the-canvas'),
ctx = canvas.getContext('2d');
var lt = new Date();
var enemies = [];
// player ship
var ship = new disp.Ship({
        x: 16,
        y: 120,
        pps: 32,
        heading: Math.PI / 180 * 0
    });
// make enemies
var makeEnemies = function (count, canvas) {
    var e,
    enemies = [];
    count = count || 1;
    while (count--) {
        e = new disp.Ship({
                x: Math.floor(canvas.width * Math.random()),
                y: Math.floor(canvas.height * Math.random()),
                pps: 16,
                heading: Math.PI * 2 * Math.random(),
                shotDelay: 1000
            });
        enemies.push(e);
    };
    return enemies;
};
// purge
var purgeEnemies = function (enemies) {
    var i = enemies.length;
    while (i--) {
        var enemy = enemies[i];
        if (enemy.HP === 0) {
            enemies.splice(i, 1);
        }
    }
};
// Main Update
var update = function () {
    var now = new Date(),
    t = now - lt;
    ship.update(t, enemies);
    enemies.forEach(function (enemy) {
        enemy.update(t, [ship]);
    });
    purgeEnemies(enemies);
    lt = now;
};
// Main Draw
var draw = function () {
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 3;
    // clear
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw player
    ship.draw(ctx, 'blue', 'blue');
    // draw enemies
    enemies.forEach(function (enemy) {
        enemy.draw(ctx, 'red', 'red');
    });
};
// Main APP loop
var loop = function () {
    requestAnimationFrame(loop);
    update();
    draw();
};
enemies = makeEnemies(3, canvas);
loop();
// EVENTS
canvas.addEventListener('click', function (e) {
    var bx = e.target.getBoundingClientRect(),
    x = e.clientX - bx.left,
    y = e.clientY - bx.top,
    cx = canvas.width / 2,
    cy = canvas.height / 2,
    a = Math.PI + Math.atan2(cy - y, cx - x);
    ship.heading = a;
    console.log(x, y, a.toFixed(2));
});
```