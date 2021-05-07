---
title: Backyard Scene threejs example
date: 2021-05-07 14:02:00
tags: [three.js]
layout: post
categories: three.js
id: 862
updated: 2021-05-07 14:15:48
version: 1.2
---

For yet another [threejs example](/2021/02/19/threejs-examples/) post I made this backyard scene example that I should write at least one post on just because I put a little time into making it. I stooped working on it because the example was starting to turn into a black hole of a project where it just stared eating up my time, but I had to clear idea what the end game was when it comes to working on it. Still what I wanted to do is have at least one or more three.js examples where I am starting to create something that is starting to look like some kind of finished scene of some kind just for the heck of it. With that goal in mind I guess this project was a success, but now I think I need to put a little more time into what the final product is with an actual three.js project example before even getting started.

<!-- more -->


## 2 - The canvas texture module

```js
(function (canvasTextureMod) {
    // create a canvas texture with a draw method and size
    canvasTextureMod.createCanvasTexture = function (draw, size) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = size || 64;
        canvas.height = size || 64;
        draw(ctx, canvas);
        return new THREE.CanvasTexture(canvas);
    };
 
    var randomGridDraw = function (ctx, canvas, colorsArray, minValue, maxValue) {
        var i = 0,
        r1,
        r,
        g,
        b,
        x,
        y,
        len = canvas.width * canvas.height;
        while (i < len) {
            x = i % canvas.width;
            y = Math.floor(i / canvas.width);
            r1 = minValue + Math.floor((maxValue - minValue) * Math.random());
            r = colorsArray[0] === 'r1' ? r1 : colorsArray[0];
            g = colorsArray[1] === 'r1' ? r1 : colorsArray[1];
            b = colorsArray[2] === 'r1' ? r1 : colorsArray[2];
            ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
            ctx.fillRect(x, y, 1, 1);
            i += 1;
        }
    };
 
    // create random gird texture
    canvasTextureMod.randomGrid = function (colorsArray, size, valueMin, valueMax) {
        colorsArray = colorsArray === undefined ? ['r1', 'r1', 'r1'] : colorsArray;
        size = size || 32;
        valueMin = valueMin === undefined ? 64 : valueMin;
        valueMax = valueMax === undefined ? 128 : valueMax;
        return canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            randomGridDraw(ctx, canvas, colorsArray, valueMin, valueMax);
        }, size);
    };
    // create a basic square texture
    canvasTextureMod.basicSquare = function (colorsArray, size, lineSize, lineStyle, minValue, maxValue) {
        colorsArray = colorsArray === undefined ? ['r1', 'r1', 'r1'] : colorsArray;
        size = size || 32;
        return canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            // draw random grid texture
            randomGridDraw(ctx, canvas, colorsArray, minValue || 0, maxValue === undefined ? 64 : maxValue);
            // draw lines
            ctx.strokeStyle = lineStyle || 'white';
            ctx.lineWidth = lineSize || 3;
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.stroke();
        }, size);
    };
}
    (this['canvasTextureMod'] = {}));
```

## 3 - The guy module

```js
(function (GuyMod) {
    // material used for the legs
    var material_leg = new THREE.MeshStandardMaterial({
            color: 0x0000ff,
            emissive: 0x00001a
        }),
    // material used for the arms
    material_arm = new THREE.MeshStandardMaterial({
            color: 0xaf0000,
            emissive: 0x001a00
        });
    // material used for the body
    material_body = new THREE.MeshStandardMaterial({
            color: 0xff0000,
            emissive: 0x001a00
        });
    // array of materials used for the head
    var faceTexture = canvasTextureMod.createCanvasTexture(function (ctx, canvas) {
            // face color
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // eyes
            ctx.fillStyle = 'black';
            ctx.fillRect(16, 16, 8, 8);
            ctx.fillRect(64 - 24, 16, 8, 8);
            // mouth
            ctx.fillRect(32 - 8, 40, 16, 16);
            // nose
            ctx.fillStyle = 'gray';
            ctx.fillRect(32 - 4, 20, 8, 13);
 
        });
    materials_head = [
        // 0 default material
        new THREE.MeshStandardMaterial({
            color: 0xffff00,
            emissive: 0x1a1a00
        }),
        // 1 used for the face
        new THREE.MeshStandardMaterial({
            map: faceTexture
        })
    ];
    // the guy constructor
    GuyMod.create = function () {
        var guy = {};
        // a group that will hold all mesh objects
        guy.group = new THREE.Group();
        // HEAD
        guy.head = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                materials_head);
        guy.head.position.y = 1.6;
        // set material index
        guy.head.geometry.groups.forEach(function (face) {
            // set all to zero by default
            face.materialIndex = 0;
        });
        guy.head.geometry.groups[4].materialIndex = 1;
        // one side of face set to face material
        //this.head.geometry.groups[8].materialIndex = 1;
        //this.head.geometry.groups[9].materialIndex = 1;
        guy.head.castShadow = true;
        guy.group.add(guy.head);
        // BODY
        guy.body = new THREE.Mesh(
                new THREE.BoxGeometry(1, 2, 1),
                material_body);
        guy.body.castShadow = true;
        guy.group.add(guy.body);
        // RIGHT ARM
        guy.arm_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        guy.arm_right.geometry.translate(0,  - .5, 0);
        guy.arm_right.position.x = 1;
        guy.arm_right.position.y = .75;
        guy.arm_right.castShadow = true;
        guy.group.add(guy.arm_right);
        // LEFT ARM
        guy.arm_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 1.5, .5),
                material_arm);
        guy.arm_left.geometry.translate(0,  - .5, 0);
        guy.arm_left.position.x = -1;
        guy.arm_left.position.y = .75;
        guy.arm_left.castShadow = true;
        guy.group.add(guy.arm_left);
        // RIGHT LEG
        guy.leg_right = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        guy.leg_right.geometry.translate(0, -1, 0);
        guy.leg_right.position.x = .35;
        guy.leg_right.position.y = -1.1;
        guy.leg_right.castShadow = true;
        guy.group.add(guy.leg_right);
        // LEFT LEG
        guy.leg_left = new THREE.Mesh(
                new THREE.BoxGeometry(.5, 2, .5),
                material_leg);
        guy.leg_left.geometry.translate(0, -1, 0);
        guy.leg_left.position.x =  - .35;
        guy.leg_left.position.y = -1.1;
        guy.leg_left.castShadow = true;
        guy.group.add(guy.leg_left);
        // retun the guy object
        return guy;
    };
    // move the arm of give id ('arm_right' or 'arm_left');
    // x and z should be a value between 0, and 1
    GuyMod.moveArm = function (guy, armId, x, z) {
        var arm = guy[armId];
        z = Math.PI / 2 * z;
        if (armId === 'arm_left') {
            z -= z * 2;
        }
        arm.rotation.set(Math.PI * 2 * x, 0, z);
    };
    // rotate head around
    // per is 0 to 1
    GuyMod.moveHead = function (guy, per) {
        guy.head.rotation.set(0, Math.PI * 2 * per, 0);
    };
    // move legs in respect to a walk cycle
    // where per is between 0, and 1.
    GuyMod.moveLegs = function (guy, per) {
        per %= 1;
        var bias = Math.abs(.5 - per) / .5;
        guy.leg_left.rotation.set(.75 - bias * 1.5, 0, 0);
        guy.leg_right.rotation.set( - .75 + bias * 1.5, 0, 0);
    };
    // walk
    GuyMod.walk = function (guy, per, swings) {
        per = per === undefined ? 0 : per;
        swings = swings === undefined ? 1 : swings;
        var r = Math.PI * 2 * per;
        var armPer = Math.cos(r * swings) + 1 / 2;
        GuyMod.moveArm(guy, 'arm_right',  - .1 + .2 * armPer, 0);
        GuyMod.moveArm(guy, 'arm_left', .1 - .2 * armPer, 0);
        GuyMod.moveLegs(guy, per * swings);
    };
    // return the Guy Class
    //return Guy;
}
    (this['GuyMod'] = {}));
```

## 4 - Hamster wheel

```js
(function (WheelMod) {
 
    var material = new THREE.MeshStandardMaterial({
            //color: 0x00ffff,
            map: canvasTextureMod.basicSquare(['r1', 'r1', 'r1'], 64, 6, 'black', 128, 255),
            //transparent: true,
            //opacity: 0.6
        });
 
    // create a base for the given wheel object
    var createBase = function (wheel) {
        wheel.base = new THREE.Group();
        wheel.group.add(wheel.base);
        // BASE
        var parts = [{
                len: 1,
                rx: Math.PI / 2,
                rz: 0,
                px: 0,
                py: 0,
                pz: 0.5
            }, {
                len: 4,
                rx: 0,
                rz: Math.PI / 4,
                px: 1.4,
                py: -1.4,
                pz: 0.9
            }, {
                len: 6,
                rx: 0,
                rz: Math.PI / 2,
                px: 0,
                py: -2.8,
                pz: 0.9
            }, {
                len: 2,
                rx: Math.PI / 2,
                rz: 0,
                px: -2.9,
                py: -2.8,
                pz: 0
            }
        ];
        var self = wheel;
        parts.forEach(function (part) {
            var i = 0,
            len = 2;
            while (i < len) {
                var neg = 1;
                if (i === 1) {
                    neg = -1;
                }
                var cy = new THREE.Mesh(
                        new THREE.CylinderGeometry(.125, .125, part.len),
                        material);
                cy.rotation.x = part.rx;
                cy.rotation.z = part.rz;
                cy.position.set(
                    part.px,
                    part.py,
                    part.pz * neg - 2 * i);
                self.base.add(cy);
                i += 1;
            }
        });
    };
 
    // create the wheel with rims and tubes connected between them
    var createWheel = function (wheel) {
        wheel.wheel = new THREE.Group();
        wheel.group.add(wheel.wheel);
        var geo = new THREE.TorusGeometry(2, .125, 20, 20);
        // RIMS
        var ct = 2,
        rim,
        i = 0;
        while (i < ct) {
            rim = new THREE.Mesh(
                    geo,
                    material);
            rim.position.set(0, 0, -2 + 2 * i);
            wheel.wheel.add(rim);
            var bar = new THREE.Mesh(
                    new THREE.CylinderGeometry(.125, .125, 4),
                    material);
            bar.position.set(0, 0, -2 + 2 * i);
            wheel.wheel.add(bar);
            i += 1;
        }
        var ct = 15,
        rim,
        i = 0;
        while (i < ct) {
            var r = Math.PI * 2 / ct * i;
            // TUBES connecting rims
            var cy = new THREE.Mesh(
                    new THREE.CylinderGeometry(.125, .125, 2),
                    material);
            cy.rotation.x = Math.PI / 2;
            cy.position.x = Math.cos(r) * 2;
            cy.position.y = Math.sin(r) * 2;
            cy.position.z = -1;
            wheel.wheel.add(cy);
            i += 1;
        }
    };
 
    // the Wheel constructor
    WheelMod.create = function () {
        var wheel = {};
        // a group that will hold all mesh objects
        wheel.group = new THREE.Group();
        createWheel(wheel);
        createBase(wheel);
        return wheel;
    };
 
}
    (this['WheelMod'] = {}));
```

## 5 - House

```js
(function (HouseMod) {
 
    // default materials
    var materials_default = {
        base: new THREE.MeshStandardMaterial({
            //color: 0xff0000,
            map: canvasTextureMod.randomGrid(['r1', '0', '0'], 64, 128, 255),
            side: THREE.DoubleSide
        }),
        tri: new THREE.MeshStandardMaterial({
            //color: 0xaf0000,
            map: canvasTextureMod.randomGrid(['r1', '0', '0'], 64, 128, 255),
            side: THREE.DoubleSide
        }),
        roof: new THREE.MeshStandardMaterial({
            //color: 0x404040,
            map: canvasTextureMod.randomGrid(['r1', 'r1', 'r1'], 64, 64, 128),
            side: THREE.DoubleSide
        })
    };
 
    // create a triangle part of the house
    var HouseTriangle = function (materials) {
        materials = materials || materials_default;
        var geometry = new THREE.BufferGeometry();
        var vertices = new Float32Array([
                    -1, 0, 0,
                    0.5, 1.5, 0,
                    2, 0, 0
                ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        geometry.computeVertexNormals(); // compute vertex normals
        geometry.addGroup(0, 3, 0); // just one group
        return new THREE.Mesh(
            geometry,
            materials.tri);
    };
 
    // create and return a house
    HouseMod.create = function (materials) {
        materials = materials || materials_default;
        // mian house group
        var house = new THREE.Group();
 
        // base of house is just a BOX
        var base = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 4), materials.base);
        house.add(base);
 
        // house triangle parts
        var tri1 = HouseTriangle(materials);
        tri1.position.set(-0.5, 1, 2);
        house.add(tri1);
        var tri2 = HouseTriangle(materials);
        tri2.position.set(-0.5, 1, -2);
        house.add(tri2);
 
        // roof
        var roof1 = new THREE.Mesh(
                new THREE.PlaneGeometry(2.84, 4.5),
                materials.roof);
        roof1.position.set(-1, 1.51, 0);
        roof1.rotation.set(Math.PI * 0.5, Math.PI * 0.25, 0);
        house.add(roof1);
        var roof2 = new THREE.Mesh(
                new THREE.PlaneGeometry(2.84, 4.5),
                materials.roof);
        roof2.position.set(1, 1.51, 0);
        roof2.rotation.set(Math.PI * 0.5, Math.PI * -0.25, 0);
        house.add(roof2);
 
        return house;
    };
 
}
    (this['HouseMod'] = {}));
```

## 6 - Main javaScript file

```js
var scene = new THREE.Scene();
scene.background = new THREE.Color(0x00ffff);
 
// HOUSE
var house = HouseMod.create();
house.position.set(-2, 1.05, 0);
scene.add(house);
 
// GROUND
var materials = {
    ground: [
        new THREE.MeshStandardMaterial({
            color: 0x00ff00,
            map: canvasTextureMod.randomGrid(['0', 'r1', '0'], 96, 96, 220),
            side: THREE.DoubleSide
        }),
        new THREE.MeshStandardMaterial({
            color: 0xffaa00,
            map: canvasTextureMod.randomGrid(['r1', 'r1', '0'], 64, 96, 220),
            side: THREE.DoubleSide
        })
    ]
};
var ground = new THREE.Mesh(new THREE.BoxGeometry(14, 14, 1.25), materials.ground);
ground.position.set(0, -0.575, 0);
ground.rotation.set(-Math.PI / 2, 0, 0);
ground.geometry.groups.forEach(function (face) {
    face.materialIndex = 1;
});
ground.geometry.groups[4].materialIndex = 0;
scene.add(ground);
 
// WHEEL
var wheel = WheelMod.create();
wheel.group.scale.set(0.5, 0.5, 0.5);
wheel.group.position.set(2, 1.5, 2);
scene.add(wheel.group);
// GUY
var guy = GuyMod.create();
guy.group.scale.set(0.25, 0.25, 0.25);
guy.group.position.set(0, 0.8, 5.5);
scene.add(guy.group);
 
// sun
var sunTexture = canvasTextureMod.randomGrid(['r1', 'r1', '0']);
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(1, 20, 20),
        new THREE.MeshStandardMaterial({
            emissive: 'white',
            emissiveMap: sunTexture
        }));
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(0, 8, 0);
scene.add(sun);
 
// add AmbientLight
var ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.3;
scene.add(ambientLight);
 
// CAMERA
var camera = new THREE.PerspectiveCamera(50, 640 / 480, 1, 1000);
//camera.position.set(14, 6, 14);

 
camera.position.set(-15, 10, 25);
camera.lookAt(guy.group.position);
 
guy.group.add(camera);
 
// RENDERER
var renderer = new THREE.WebGLRenderer();
//renderer.width = 640;
renderer.domElement.width = 640;
renderer.domElement.height = 480;
renderer.setViewport(0, 0, 640, 480);
var container = document.getElementById('demo');
container.appendChild(renderer.domElement);
var full = false;
var toggleFull = function (canvas) {
    var canvas = renderer.domElement;
    full = !full;
    container.style.position = 'static';
    container.style.width = '640px';
    container.style.height = '480px';
    canvas.style.width = '640px';
    canvas.style.height = '480px';
    if (full) {
        canvas.style.width = 'auto';
        canvas.style.height = window.innerHeight + 'px';
        canvas.style.margin = 'auto';
        container.style.position = 'fixed';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.background = 'black';
        container.style.left = '0px';
        container.style.top = '0px';
    }
};
// press f for full screen
window.addEventListener('keydown', function (e) {
    if (e.key === 'f') {
        toggleFull();
    }
});
 
// CONTROLS
//var controls = new THREE.OrbitControls(camera, renderer.domElement);
//controls.autoRotate = true;
 
// Loop in which the directional light position changes
var frame = 0,
maxFrame = 100;
 
var state = {
    second: {
        per: 0,
        r: 0
    },
    minute: {
        per: 0,
        r: 0
    },
    day: {
        per: 0,
        r: 0
    }
};
 
var getDayPer = function (now) {
    return now.getHours() / 24 +
    now.getMinutes() / 1440 +
    now.getSeconds() / 86400 +
    now.getMilliseconds() / 86400000;
};
 
// update minute object
var updateMinute = function (state, now) {
    var ms = now.getMilliseconds() / 1000;
    state.minute.per = (now.getSeconds() + ms) / 60;
    state.minute.r = Math.PI * 2 * state.minute.per;
};
 
var updateDay = function (state, now) {
    state.day.per = getDayPer(now);
    state.day.r = Math.PI * 2 * state.day.per + Math.PI * 1.5;
};
 
var loop = function () {
    setTimeout(loop, 33);
 
    var now = new Date();
    //var now = new Date(2021, 1, 1, 6, 0);
 
    state.second.per = now.getMilliseconds() / 1000;
    state.second.r = Math.PI * 2 * state.second.per + Math.PI * 1.5;
    updateMinute(state, now);
    updateDay(state, now);
 
    // sun
    var r = state.day.r;
    var sunBias = 1 - Math.abs(state.minute.per - 0.5) / 0.5;
    sun.position.set(Math.cos(r) * 10, Math.sin(r) * 10, 4 - 8 * sunBias);
    ambientLight.intensity = (1 - (Math.abs(state.day.per - 0.5) / 0.5)) * 0.1;
 
    // wheel
    wheel.wheel.rotation.z = state.second.r; //msper;
 
    // guy
    GuyMod.walk(guy, state.minute.per, 32);
    var r = Math.PI * 2 - state.minute.r;
    guy.group.position.set(Math.cos(r) * 5, 0.8, Math.sin(r) * 5);
    guy.group.lookAt(Math.cos(r - 0.5) * 5, 0.8, Math.sin(r - 0.5) * 5);
 
    //controls.update();
 
    frame = (frame + 1) % maxFrame;
    renderer.render(scene, camera);
};
 
// WHAT TO DO WHEN CUBE TEXTURE IS LOADED
 
var cubeTextureLoaded = function (cubeTexture) {
    if (cubeTexture) {
        cubeTexture.encoding = THREE.sRGBEncoding;
        scene.background = cubeTexture;
    } else {
        var texture = canvasTextureMod.basicSquare(['r1', 'r1', 'r1'], 128, 6, 'black', 32, 64).image;
        cubeTexture = new THREE.CubeTexture(new Array(6).fill(texture));
        cubeTexture.needsUpdate = true;
        scene.background = cubeTexture;
    }
    loop();
};
// LOAD CUBE TEXTURE
var loadfail = false;
new THREE.CubeTextureLoader()
.setPath('/img/cube/milky/')
.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'],
    cubeTextureLoaded,
    function () {},
    function (e, b) {
    if (!loadfail) {
        loadfail = true;
        cubeTextureLoaded()
    }
});
```

## 7 - Conclusion

