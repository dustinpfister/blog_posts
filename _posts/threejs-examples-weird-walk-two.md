---
title: Weird Walk Two threejs example
date: 2022-04-25 12:24:00
tags: [three.js]
layout: post
categories: three.js
id: 981
updated: 2022-12-13 09:04:09
version: 1.23
---

Last week I started a [weird walk guy threejs example](/2022/04/18/threejs-examples-weird-walk-one/), and as such this week I think I will make another [threejs example](/2021/02/19/threejs-examples/) where I just a continue with that example. However of course I will be taking this idea into a new direction with how I create and move legs. With the first weird walk I was thinking that it would be cool to just have to mesh objects for legs, and have just one axis of each leg scale up and down as a kind of crude yet amusing walk cycle. For this example I am thinking more in terms with something that is a walk cycle where the legs are two or more mesh objects that rotate at certain pivot locations. However as with the first weird walk cycle example I do so in a very weird way in which the thighs of the weird walk guy move forward from the rest of the body very far so the look is in no way natural. So in other words when it comes to this weird walk guy example, just like with the first example, I am going in a kind of weird for the sake of weird kind of direction.

This time I made some changes that have to do with how I go about adding textures to a module that I make this way my making another file that helps me with the process of making [data textures](/2022/04/15/threejs-data-texture/). This is however the kind of change that I might do with the weird walk one module as well though which it comes to maybe doing more to revise the source code with that example. So for the most part what stands alone here is what is added in terms of additional mesh objects and code that is used to update those mesh objects.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/2zV9b-XOo8g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## This weird walk two example and what to know first

This is a post on a project example that makes use of threejs, and consists of several javaScript files to create a crude yet effective informal model with a weird walk cycle. This is not in any way a post on the [topic of getting started with threejs](/2018/04/04/threejs-getting-started/) as well as any additional skills that are required before hand in order to get something of value from reading this. In fact I assume that you have at fair amount of experience with threejs and JavaScript in general. However I do like to make use of these opening sections of posts to write about at least a few things that you might want to read up more on before reading the rest of this post regardless of experence.

### I have many other threejs examples like this one

This is not the first example that I have made that is like this, in fact I have made a few informal models as I have come to call them. The first one that I have made would be my [guy one module](/2021/04/29/threejs-examples-guy-one/) that I made many years ago now. I have mentioned that this is indeed a weird walk one, but sense I wrote this post for the first time I also made a [weird walk three project](/2022/05/24/threejs-examples-weird-walk-three/) as well.

### The source code of this example is on Github

I have the source code of this example parked on [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-walk-two).

### Version numbers matter

When I first started writing this post I was using r135 of threejs with the source code examples, and the last time I came around to do some editing I was using r146. I was able to get this example up and ruining fine with that revision of threejs, but I am sure that it will end up breaking at some point in the future. I do take the time to come around and do a little editing of each if these threejs posts, but it might be a while until I come around again.


## 1 - The first revision of weird walk two \( r0 \)

In this section I will be going over the source code of the first and at time time of this writing, the only revision of this weird walk module. I can not say that I have any interest in making any future revisions of this module as I have many other examples that are of greater interest. So future edits of this post might just have to do with making additional demos of this first revision. 

The goal with this was to just start with what I all ready worked out with the first weird walk one example, but now I just want to have a slightly different walk cycle. Also while I am at it make a javaScript file that has more to do with creating textures with the data texture constructor rather than that if the canvas texture constructor.

### The data textures module

Here I have the source code for the data textures module that I will be using to create textures for the weird walk guy, as well as additional mesh objects that I create in the main javaScript example for this. This module consists of a few public methods one of which will return a texture created from the given color channel data array in the form of a [unit8array](/2020/04/02/js-uint8array/). The other methods are various ways of going about creating that kind of an array that is used to create the textures. I have a for each pixel method that where I can given a function in which I can define logic that is to be used to create the red, green, blue, and alpha values for each color channel of each pixel. I then have additional options for creating textures with this, but the general idea is the same, one way or another crate a texture by way of the THREE.DataTexture constructor.

```js
// ********** **********
// data textures
// module for creating data textures
// ********** **********
(function (api) {
    // mk data texture helper
    api.mkDataTexture = function (data, w) {
        data = data || [];
        w = w || 0;
        const width = w,
        height = data.length / 4 / w;
        const texture = new THREE.DataTexture(data, width, height);
        texture.needsUpdate = true;
        return texture;
    };
    // create a data texture with a method that will be called for each pix
    api.forEachPix = function (w, h, forEach) {
        const width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        const size = width * height;
        const data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            const stride = i * 4;
            const x = i % width;
            const y = Math.floor(i / width);
            let obj = forEach(x, y, w, h, i, stride, data);
            obj = obj || {};
            data[stride] = obj.r || 0;
            data[stride + 1] = obj.g || 0;
            data[stride + 2] = obj.b || 0;
            data[stride + 3] = obj.a === undefined ? 255: obj.a;
        }
        return api.mkDataTexture(data, width)
    };
    // from px data method
    api.fromPXDATA = function(pxData, width, palette){
        palette = palette || [
            [0,0,0,255],
            [255,255,255,255]
        ];
        const height = Math.floor(pxData.length / width);
        return api.forEachPix(width, height, function(x, y, w, h, i){
            const obj = {};
            const colorIndex = pxData[i];
            const color = palette[colorIndex];
            obj.r = color[0];
            obj.g = color[1];
            obj.b = color[2];
            obj.a = color[3];
            return obj;
        });
    };
    // simple gray scale seeded random texture
    api.seededRandom = function (w, h) {
        const width = w === undefined ? 5 : w,
        height = h === undefined ? 5 : h;
        const size = width * height;
        const data = new Uint8Array(4 * size);
        for (let i = 0; i < size; i++) {
            const stride = i * 4;
            const v = Math.floor(THREE.MathUtils.seededRandom() * 255);
            data[stride] = v;
            data[stride + 1] = v;
            data[stride + 2] = v;
            data[stride + 3] = 255;
        }
        return api.mkDataTexture(data, width);
    };
}( this['datatex'] = {} ));
```

### The weird guy two module \( r0 \)

Now that I have the texture module out of the way I can now write about the weird guy two module that makes use of this data texture module to create the textures for the various materials that are used to skin the various parts of the guy. At the top of the module I am using the [seeded random method of the math utils object](/2022/04/11/threejs-math-utils/) as a way to create just a texture with random variations of black and write for each pixel. This is what I use to just add some kind of texture other than that of just a solid color which strokes me as just a kind of place holder type thing for some kind of better option for a texture, but for some things this might still work well.

```js
// ********** **********
// WEIRD GUY TWO MODULE - r0 - from threejs-examples-weird-walk-two
// 
// ********** **********
(function(api){
    // simple random texture
    const textureRND = datatex.seededRandom(10, 10);
    const pxData = [
        1,1,1,1,
        1,0,0,1,
        1,0,0,1,
        1,1,1,1
    ];
    const width = 4;
    const palette = [
        [0,0,0,255],
        [255,255,255,255]
    ];
    const texturePants = datatex.fromPXDATA(pxData, width, palette);
    // MATERIALS
    const materials = [
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0x9a8800, emissiveIntensity: 0.9, wireframe:false } ),
        new THREE.MeshStandardMaterial( { map: texturePants, emissive: 0x00aaff, emissiveIntensity: 0.4 } ),
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0xffffff, emissiveIntensity: 0.8 } ),
        new THREE.MeshStandardMaterial( { map: textureRND, emissive: 0x1a1a1a, emissiveIntensity: 0.1 } )
    ];
    // create a new weird guy
    api.create = function(opt){
        opt = opt || {};
        const guy = new THREE.Group();
        guy.name = opt.guyID || 'guy';
        // BODY
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2.0, 1),
            materials[0]
        );
        body.position.y = 0.25;
        body.name = guy.name + '_body';
        guy.add(body);
        // EYES
        ['eye1', 'eye2'].forEach(function(nameStr, i){
            const eye = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 30, 30),
                materials[2]
            );
            eye.name = guy.name + '_' + nameStr;
            eye.position.set(-0.2 + 0.4 * i, 0.2, 0.5);
            const innerEye = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 30, 30),
                materials[3]
            );
            innerEye.position.set(0, 0, 0.125);
            eye.add(innerEye);
            body.add(eye);
        });
        // ADD MOUTH
        const mouth = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.125, 0.25),
            materials[3]
        );
        mouth.name = guy.name + '_mouth';
        mouth.position.set(0, -0.3, 0.5);
        body.add(mouth);
        // ADD ARMS
        ['arm1', 'arm2'].forEach(function(nameStr, i){
            const arm = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                materials[0]
            );
            arm.geometry.translate( 0, 0.5, 0 );
            arm.name = guy.name + '_' + nameStr;
            arm.position.set(-0.625 + 1.25 * i, 0.5, 0);
            const tri = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                materials[0]
            );
            tri.geometry.translate( 0, 0.5, 0 );
            tri.name = guy.name + '_' + nameStr + '_tri';
            tri.position.set(0, 1, 0);
            tri.rotation.set(-1, 0, 0);
            arm.add(tri); 
            body.add(arm);
        });
        // ADD PELVIS
        const pelvis = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1.0, 1),
            materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.25, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            // leg group pivot group
            const leg = new THREE.Group();
            leg.name = guy.name + '_' + nameStr;
            // thigh
            const thigh = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 3.0, 0.5),
                materials[1]
            );
            thigh.position.set(-0.37 + 0.75 * i, 0, 2.0);
            thigh.rotation.set(Math.PI * 0.5, 0, 0);
            // caff
            const caff = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 0.5),
                materials[1]
            );
            caff.rotation.x = Math.PI * 1.5;
            caff.position.y = 1.25;
            caff.position.z = 1;
            thigh.add(caff);
            leg.add(thigh);
            pelvis.add(leg);
        });
        return guy;
    };
    // setWalk
    api.setWalk = function(guy, walkPer){
        const leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2');
        leg1.rotation.x = Math.PI * (-0.05 + 0.1 * walkPer);
        leg2.rotation.x = Math.PI * (0.05 - 0.1 * walkPer);
    };
    // set arms method
    api.setArm = function(guy, armNum, a1, a2){
        armNum = armNum === undefined ? 1 : armNum;
        armNum = armNum <= 0 ? 1: armNum;
        a1 = a1 === undefined ? 0 : a1;
        a2 = a2 === undefined ? 0 : a2;
        const arm = guy.getObjectByName(guy.name + '_arm' + armNum);
        arm.rotation.x = Math.PI / 180 * a1;
        // set tri rotation
        arm.children[0].rotation.x = Math.PI / 180 * a2;
    };
}( this['weirdGuy2'] = {} ));
```

### 1.1 - A demo of weird walk two \( r0 \)

I have my data textures file, and I now also have my weird guy module that I can use to create an instance of this guy module that will have a weird and amusing walk cycle. So now I just need a little additional javaScript code that will create a simple animation loop in which I am using at least one instance of this guy module. On top of using the weird guy two module to create an instance of the weird walk guy I also am making use of the for each pixel method of the data texture module to create a custom texture for the ground mesh that I am also using in the scene.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(7, 7, 7);
    camera.lookAt(0, 1.5, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 1);
    scene.add(dl);
    //-------- ----------
    // HELPER METHODS
    //-------- ----------
    // give frame, maxframe, and count to get values like per, bias, ect
    const getFrameValues = function(frame, maxFrame, count){
        count = count === undefined ? 1 : count;
        const values = {
            frame: frame, 
            maxFrame: maxFrame
        };
        values.per = frame / maxFrame * count % 1;
        values.bias = 1 - Math.abs(0.5 - values.per) / 0.5;
        return values;
    };
    //-------- ----------
    // GROUND MESH
    //-------- ----------
    const texture = datatex.forEachPix(20, 100, function(x, y, w, h, i){
        const obj = {};
        const v = y % 2 === 0 ? 255 - 200 * (x / w) : 55 + 200 * (x / w);
        obj.r = v;
        obj.b = v;
        return obj;
    });
    const ground = new THREE.Mesh( new THREE.BoxGeometry(20, 1, 100), new THREE.MeshStandardMaterial({
        map: texture
    }) );
    ground.position.y = -1.0;
    scene.add(ground);
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy2.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy2.setWalk(guy, 0);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let frame = 0, lt = new Date();
    const maxFrame = 300;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            // update guy position over mesh
            let v = getFrameValues(frame, maxFrame, 1);
            guy.position.z = -10 + 20 * v.per;
            // set walk
            v = getFrameValues(frame, maxFrame, 40);
            weirdGuy2.setWalk(guy, v.bias);
            // setting arms
            const v1 = getFrameValues(frame, maxFrame, 10);
            const v2 = getFrameValues(frame, maxFrame, 80);
            const a2 = 360 - (80 + 20 * v2.bias);
            weirdGuy2.setArm(guy, 1, 185 - 10 * v1.bias, a2 );
            weirdGuy2.setArm(guy, 2, 175 + 10 * v1.bias, a2 );
            // body rotation
            v = getFrameValues(frame, maxFrame, 1);
            const body = guy.getObjectByName(guy.name + '_body');
            body.rotation.y = -0.5 + 1 * v.bias;
            // update camera
            v = getFrameValues(frame, maxFrame, 1);
            camera.position.copy(guy.position).add(new THREE.Vector3(5, 3, 5));
            const a = new THREE.Vector3(0, 0, 0);
            guy.getWorldPosition(a);
            camera.lookAt(a.add(new THREE.Vector3( 0, -1.0, 2.0)));
            // draw
            renderer.render(scene, camera);
            frame += 20 * secs;
            frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```

## Conclusion

I am not sure what the future of this example might be if any actually. I have a whole lot of other threejs examples that i would like to work on more when it comes to making updated revision of the module that is used along with additional demos of the modules and videos for them. With that said I can not say that weird walk two is at the top of the list and that the first weird walk example, as well as the third one have higher priority when it comes to revision. Still I did have a basic general idea with this one that is kind of cool, so who knows what the future may hold when it comes to the nest time I come around to edit this post a little.



