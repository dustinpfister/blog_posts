---
title: Weird Walk One threejs example
date: 2022-04-18 12:06:00
tags: [three.js]
layout: post
categories: three.js
id: 979
updated: 2022-12-15 18:00:47
version: 1.33
---

This post on threejs will be on a [threejs project example ](/2021/02/19/threejs-examples/) that is a simple idea for a weird walk animation module. This is just one of several ideas that have come to me that might prove to be a quick fun project for a weird little walking guy model that is composed of a few [mesh objects](/2018/05/04/threejs-mesh/) that come together to from a [group of objects](/2018/05/16/threejs-grouping-mesh-objects/). This is not the first project idea like this, one of the oldest examples of this kind of model is my [guy one](/2021/04/29/threejs-examples-guy-one/) threejs example that I made a few years back, and I have many others actually at this point.


The walk cycle that I had in mind is just having two mesh objects for legs, and using the [scale property](/2021/05/11/threejs-object3d-scale/) of the object3d class to set the scale of just the height of the mesh objects from its full scale to zero and back again. So it would be a weird walk cycle where the legs just move directly up and down which would not at all look natural of course, but that is the intention to begin with actually.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/pQ8dM1a6yhQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Weird walk guy threejs example and what to know first

This is a post in which I am writing about a simple threejs project example of a weird walk guy module. This is a javaScript module that will create and return an instance of THREE.Group that I can then add to an over all threejs [scene object](/2018/05/03/threejs-scene/). I also add a few methods that help with the process of updating the state of this group of objects. This is not the first example of this kind of module that I have made using threejs, and I also do not think it will be the last for at least a little while longer at least. In any case this is not a [post for people that are new to threejs](/2018/04/04/threejs-getting-started/), let alone client side JavaScript in general. I will not be getting into detail with things that you should know before hand here, however I will bring up at least some things to read more about in this section. 

### Read more about the Object3d class

There is [reading more about the object3d class](/2018/04/23/threejs-object3d/) in general as having a solid understanding of what there is to work with is needed in order to make this kind of project. The object3d class is a base class for Groups, Mesh Objects, Cameras and any kind of object that would be added to a scene object as a child. Speaking of scene objects the object3d class is also a base class of whole scene objects as well. Anyway major features of the object3d class include the position and rotation properties of the objects 3d class that are use to set the local position and rotation of objects. It is mainly this kind of feature that I am using to make crude models of objects.

### There is also using blender and loading DAE files as a way to make models

I have come to like making models like this, but there is the more professional way of doing this kind of thing. That world be to make something in blender and then export it to a format like DAE. This DAE file can then be loaded into a threejs project by making use of [the DAE loader](/2021/04/30/threejs-dae-collada-loader/).

### The source code examples in this post are on Github

The source code examples that I am writing about in this post as well as with many others can be found in my [test threejs repository on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-weird-walk-one). This is also where I park the source code for my [many other posts on threejs as well](/categories/three-js/).

### Version numbers matter

When I first made this example I was using r135 of threejs, and the last time I came around to do some editing I was using r146. If the code examples here are breaking for you on your end that would be the first thing I would check. The threejs library is still a project that moves very fast in terms of its development and maintenance so code breaking changes happen often.


## 1 - The weird guy module \( r0 \) and basic demo

In this first section of the post I will be going over the JavaScript module that I am using to create and return a THREE.Group instance that I can then use in a scene object of one or more demos that make use of the module. Speaking of that I will also be going over the source code of one such demo to start out with while I am at it. When it comes to this first revision of the module the goal is to jst have the leg movement effect that I want, and to not do anything major with the arms.

### The weird guy module \( r0 \)

The weird guy module that I made will return a few public methods, the main method of interest when it comes to using this would be the create method. In a threejs project where I make use of this I will call this method as a way to make an instance of this weird guy model. I will then want at least one if not more methods that help with changing the state of this weird guy model one of which can be used to set the walk cycle state of the guy. So for now this will have just these two public methods one to create and another to update the state of the model that is just a walk cycle.

```js
// ********** **********
// WEIRD GUY MODULE - r0 - from threeks-examples-weird-walk-one
// ********** **********
(function(api){
    const materials = [
        new THREE.MeshStandardMaterial( { emissive: 0x9a8800, emissiveIntensity: 0.5, wireframe:false } ),
        new THREE.MeshStandardMaterial( { emissive: 0x00aaff, emissiveIntensity: 0.5 } ),
        new THREE.MeshStandardMaterial( { emissive: 0xffffff, emissiveIntensity: 0.5 } ),
        new THREE.MeshStandardMaterial( { emissive: 0x1a1a1a, emissiveIntensity: 0.5 } )
    ];
    // create a new weird guy
    api.create = function(opt){
        opt = opt || {};
        const guy = new THREE.Group();
        guy.name = opt.guyID || 'guy';
        // BODY
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1.5, 1),
            materials[0]
        );
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
                new THREE.BoxGeometry(0.25, 1.5, 0.25),
                materials[0]
            );
            arm.geometry.translate( 0, 0.75, 0 );
            arm.name = guy.name + '_' + nameStr;
            arm.position.set(-0.625 + 1.25 * i, 0.0, 0);
            body.add(arm);
        });
        // ADD PELVIS
        const pelvis = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.5, 1),
            materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.0, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 1),
                materials[1]
            );
            leg.name = guy.name + '_' + nameStr;
            leg.position.set(-0.25 + 0.5 * i, -1, 0);
            pelvis.add(leg);
        });
        return guy;
    };
    // setWalk
    api.setWalk = function(guy, walkPer){
        const leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2')
        // set scale of legs
        leg1.scale.y = walkPer;
        leg2.scale.y = 1 - walkPer;
        // adjust position of legs
        leg1.position.y = -1.0 + 0.75 * (1 - walkPer);
        leg2.position.y = -1.0 + 0.75 * walkPer;   
    };
}( this['weirdGuy'] = {}));
```

### 1.1 - Basic demo of the weird guy module

Now to have at least one basic demo of this werid walk module that I have made just for the sake of making sure that I have the basic idea of what I want up and running. For this I create my usual scene object, camera, and renderer like with any other threejs project. On top of that I am also using a light source for this demo as I want to add light on top of the emissive values of the materials I am using to help show depth better. 

I just call the create method to create and return a new group object that is the model that I can then add as a child of the scene object. After that is all set and done I can then call the set walk method in the body of my update loop that I am using to update and render the state of the model.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 1.75, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(0.1, 1.0, 0);
    scene.add(dl);
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy.setWalk(guy, 0);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let frame = 0,
    lt = new Date();
    const maxFrame = 60;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            const per = frame / maxFrame * 5 % 1,
            bias = Math.abs(0.5 - per) / 0.5;
            // walk
            weirdGuy.setWalk(guy, bias);
            // arms
            const arm1 = guy.getObjectByName(guy.name + '_arm1'),
            arm2 = guy.getObjectByName(guy.name + '_arm2');
            arm1.rotation.x = Math.PI / 180 * (180 - 20 + 40 * bias);
            arm2.rotation.x = Math.PI / 180 * (180 + 20 - 40 * bias);
            // rotate
            const per2 = frame / maxFrame * 1 % 1,
            bias2 = Math.abs(0.5 - per2) / 0.5;
            guy.rotation.y = -0.5 + 2.5 * bias2;
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

The end result here is then just a very simple walk cycle of my weird little guy model, and thus far this is more or less what I had in mind. When it comes to working on this at least a little more there is only so much more to do then such as what more needs to happen with the arms and face to make it look more interesting. There will then need to be at least a few more demos of this, and while I am at it maybe at least a few revisions of the weird guy model with that as well as I will want to least a few more features beyond just the simple walk cycle.

## 2 - The weird guy module \( r1 \) Moving the arms, ground mesh, and data textures

I was off to a good start with the first form of this weird guy module, as well as the additional code that I was using to make a short demo of what I made. However I think that I should put at least a little more time into this one before moving on to the next thing. There is just a little more that I would like to see done with this example, and that is to also have moment for the arms, and also a better demo where the weird guy is walking along on a repeating background.

### The weird guy module \( r1 \) with set arms method and data textures

So with this new version of the weird guy module I added an additional public method that has to do with setting the rotation values of the arms. Also while I was at it I made it so that the arms are composed of two mesh objects rater than just one. 
The one additional thing that I changed that is a good step forward is that I made use of [data textures](/2022/04/15/threejs-data-texture/) as a way to have some texture for the built in materials that I am using for the weird guy. When it comes to creating the data texture I made use of one of the [math utils methods called seeded random](/2022/04/11/threejs-math-utils/) that allows for me to make random like textures that will be the same each time I reload the page.

```js
// ********** **********
// WEIRD GUY MODULE - r1 - from threeks-examples-weird-walk-one
// * adding a setArms method
// * data textures
// ********** **********
(function(api){
    // DATA TEXTURE FOR MATERIALS
    const width = 20, height = 100;
    const size = width * height;
    const data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        const stride = i * 4;
        const v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
        data[ stride ] = v;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = v;
        data[ stride + 3 ] = 255;
    }
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    // MATERIALS
    const materials = [
        new THREE.MeshStandardMaterial( { map: texture, emissive: 0x9a8800, emissiveIntensity: 0.9, wireframe:false } ),
        new THREE.MeshStandardMaterial( { map: texture, emissive: 0x00aaff, emissiveIntensity: 0.4 } ),
        new THREE.MeshStandardMaterial( { map: texture, emissive: 0xffffff, emissiveIntensity: 0.8 } ),
        new THREE.MeshStandardMaterial( { map: texture, emissive: 0x1a1a1a, emissiveIntensity: 0.1 } )
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
            new THREE.BoxGeometry(1, 0.5, 1),
            materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.0, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 1),
                materials[1]
            );
            leg.name = guy.name + '_' + nameStr;
            leg.position.set(-0.25 + 0.5 * i, -1, 0);
            pelvis.add(leg);
        });
        return guy;
    };
    // setWalk
    api.setWalk = function(guy, walkPer){
        const leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2')
        // set scale of legs
        leg1.scale.y = walkPer;
        leg2.scale.y = 1 - walkPer;
        // adjust position of legs
        leg1.position.y = -1.0 + 0.75 * (1 - walkPer);
        leg2.position.y = -1.0 + 0.75 * walkPer;   
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
}( this['weirdGuy'] = {} ));
```

### 2.1 - The demo with ground mesh and additional code for changing the state of the weird guy

So now it is time to test out this new weird guy module to see how things look. With that said when it comes to the demo for this new weird guy module I made a ground mesh, and I also made it so I am using [data textures](/2022/04/15/threejs-data-texture/) as a way to add some texture to the ground mesh. In place of using the [math utils seeded random method](/2022/04/11/threejs-math-utils/) I chose to make a texture that repeats better.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('cyan');
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(5, 5, 5);
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
    const width = 20, height = 100;
    const size = width * height;
    const data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        const stride = i * 4;
        const x = i % width;
        const y = Math.floor(i / width);
        const v = y % 2 === 0 ? 255 - 200 * (x / width) : 55 + 200 * (x / width);
        data[ stride ] = 0;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = 0;
        data[ stride + 3 ] = 255;
    }
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    const ground = new THREE.Mesh( new THREE.BoxGeometry(20, 1, 100), new THREE.MeshStandardMaterial({
        map: texture
    }) );
    ground.position.y = -0.5;
    scene.add(ground);
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy.create({
        guyID: 'mrguy1'
    });
    guy.position.y = 2.75;
    scene.add(guy);
    weirdGuy.setWalk(guy, 0);
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
            weirdGuy.setWalk(guy, v.bias);
            // setting arms
            const v1 = getFrameValues(frame, maxFrame, 10);
            const v2 = getFrameValues(frame, maxFrame, 80);
            const a2 = 360 - (80 + 20 * v2.bias);
            weirdGuy.setArm(guy, 1, 185 - 10 * v1.bias, a2 );
            weirdGuy.setArm(guy, 2, 175 + 10 * v1.bias, a2 );
            // body rotation
            v = getFrameValues(frame, maxFrame, 1);
            const body = guy.getObjectByName(guy.name + '_body');
            body.rotation.y = -0.5 + 1 * v.bias;
            // update camera
            v = getFrameValues(frame, maxFrame, 1);
            camera.position.copy(guy.position).add(new THREE.Vector3(4, 2, 4));
            const a = new THREE.Vector3(0, 0, 0);
            guy.getWorldPosition(a);
            camera.lookAt(a.add(new THREE.Vector3( 1 - 2 * v.bias, -1, 0)));
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

So now I have something that looks pretty cool I have the little guy moving along a plane, or rather I have a plane moving in such a way that it looks like that. In any case what it is that I wanted to have working in terms of the moment of the arms is looking okay, but I still think that I do not have this done just the way that I would like it to be. I might want to have more going on when it comes to update the look on the little guys face, and also have a better set of textures for the over all look of the model.

## 3 - Revision 2 of the weird guy walk module

In revision 2 of the weird walk one module I removed the built in data textures in favor of leaving the creation of textures to an outside option that might be data textures or some other resource such as canvas textures, or external image assets. I also added an option to pass a custom collection of materials when calling the create option, leaving the built in materials as just a hard coded default option without any texture. Other improvements have to do with an additional update method that will help with the process of transitioning into and out of a walk cycle to a standing state.

```js
//-------- ----------
// WEIRD GUY MODULE - r2 - from threeks-examples-weird-walk-one
// * removed data textures
// * materials create option
// * walk trans update method
// * get guy name, and wrap radian helpers
//-------- ----------
(function(api){
    //-------- ----------
    // MATERIALS
    //-------- ----------
    const MATERIALS = [
        new THREE.MeshPhongMaterial( { color: 0x9a8800} ), // body
        new THREE.MeshPhongMaterial( { color: 0x00aaff} ), // legs
        new THREE.MeshPhongMaterial( { color: 0xffffff} ), // eyes1
        new THREE.MeshPhongMaterial( { color: 0x1a1a1a} ), // eyes2
        new THREE.MeshPhongMaterial( { color: 0xaa0000} )  // mouh
    ];
    //-------- ----------
    // HELPERS
    //-------- ----------
    // return the next default guy name string (guy1, guy2, ...)
    const genGuyName = (function(){
        let n = 1;
        return function(){
            const id = 'guy' + n;
            n += 1;
            return id;
        };
    }());
    // wrap radaian
    const wrapRadian = (r) => {
        return THREE.MathUtils.euclideanModulo(r, Math.PI * 2);
    };
    //-------- ----------
    // CREATE A NEW WEIRD GUY OBJECT
    //-------- ----------
    // create a new weird guy
    api.create = function(opt){
        opt = opt || {};
        opt.materials = opt.materials || MATERIALS;
        const guy = new THREE.Group();
        guy.name = opt.guyID || genGuyName();
        // BODY
        const body = new THREE.Mesh(
            new THREE.BoxGeometry(1, 2.0, 1),
            opt.materials[0]
        );
        body.position.y = 0.25;
        body.name = guy.name + '_body';
        guy.add(body);
        // EYES
        ['eye1', 'eye2'].forEach(function(nameStr, i){
            const eye = new THREE.Mesh(
                new THREE.SphereGeometry(0.2, 30, 30),
                opt.materials[2]
            );
            eye.name = guy.name + '_' + nameStr;
            eye.position.set(-0.2 + 0.4 * i, 0.2, 0.5);
            const innerEye = new THREE.Mesh(
                new THREE.SphereGeometry(0.1, 30, 30),
                opt.materials[3]
            );
            innerEye.position.set(0, 0, 0.125);
            eye.add(innerEye);
            body.add(eye);
        });
        // ADD MOUTH
        const mouth = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.125, 0.25),
            opt.materials[4]
        );
        mouth.name = guy.name + '_mouth';
        mouth.position.set(0, -0.3, 0.5);
        body.add(mouth);
        // ADD ARMS
        ['arm1', 'arm2'].forEach(function(nameStr, i){
            const arm = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                opt.materials[0]
            );
            arm.geometry.translate( 0, 0.5, 0 );
            arm.name = guy.name + '_' + nameStr;
            arm.position.set(-0.625 + 1.25 * i, 0.5, 0);
            const tri = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.0, 0.25),
                opt.materials[0]
            );
            tri.geometry.translate( 0, 0.5, 0 );
            tri.name = guy.name + '_' + nameStr + '_tri';
            tri.position.set(0, 1, 0);
            arm.add(tri); 
            body.add(arm);
        });
        // ADD PELVIS
        const pelvis = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.5, 1),
            opt.materials[1]
        );
        pelvis.name = guy.name + '_pelvis';
        pelvis.position.set(0, -1.0, 0);
        guy.add(pelvis);
        // ADD LEGS
        ['leg1', 'leg2'].forEach(function(nameStr, i){
            const leg = new THREE.Mesh(
                new THREE.BoxGeometry(0.25, 1.5, 1),
                opt.materials[1]
            );
            leg.name = guy.name + '_' + nameStr;
            leg.position.set(-0.25 + 0.5 * i, -1, 0);
            pelvis.add(leg);
        });
        // call set arm for first time
        api.setArm(guy, 1, 0, 0);
        api.setArm(guy, 2, 0, 0);
        return guy;
    };
    //-------- ----------
    // UPDATE A WEIRD GUY OBJECT
    //-------- ----------
    // setWalk
    api.setWalk = function(guy, walkPer){
        const leg1 = guy.getObjectByName(guy.name + '_leg1'),
        leg2 = guy.getObjectByName(guy.name + '_leg2')
        // set scale of legs
        leg1.scale.y = walkPer;
        leg2.scale.y = 1 - walkPer;
        // adjust position of legs
        leg1.position.y = -1.0 + 0.75 * (1 - walkPer);
        leg2.position.y = -1.0 + 0.75 * walkPer;
    };
    api.transLegs = (guy, a_walkstart, a2) => {
        const leg1 = guy.getObjectByName(guy.name + '_leg1');
        const leg2 = guy.getObjectByName(guy.name + '_leg2');
        // set from last walk state using a1 alpha
        api.setWalk(guy, a_walkstart);
        const d1 = 1 - leg1.scale.y;
        const d2 = 1 - leg2.scale.y;
        leg1.scale.y = leg1.scale.y + d1 * a2;
        leg2.scale.y = leg2.scale.y + d2 * a2;
        leg1.position.y = -1 * leg1.scale.y;
        leg2.position.y = -1 * leg2.scale.y;; 
    };
    // set arms method
    api.setArm = function(guy, armNum, a1, a2){
        armNum = armNum === undefined ? 1 : armNum;
        armNum = armNum <= 0 ? 1: armNum;
        a1 = a1 === undefined ? 0 : a1;
        a2 = a2 === undefined ? 0 : a2;
        const arm = guy.getObjectByName(guy.name + '_arm' + armNum);
        arm.rotation.x = wrapRadian( Math.PI - Math.PI / 180 * a1 );
        // set tri rotation
        arm.children[0].rotation.x = wrapRadian( Math.PI / 180 * a2 * -1 );
    };
}( this['weirdGuy'] = {} ));
```

### 3.1 - Another basic example of the module \( r2 \)

Yet another basic example just for the sake of making sure things work okay with this new module. I made some slight changes with the set arm method, so for the most part it was just tesing out that this works nice.


```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(4, 3, 4);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(0.1, 1.0, 0);
    scene.add(dl);
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy.create({});
    scene.add(guy);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let frame = 0,
    lt = new Date();
    const maxFrame = 60;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            const per = frame / maxFrame * 5 % 1,
            bias = 1 - Math.abs(0.5 - per) / 0.5;
            // Set walk will just move the legs
            weirdGuy.setWalk(guy, bias);
            // using set arm method to swing the arms
            weirdGuy.setArm(guy, 1, -20 + 40 * bias, 0);
            weirdGuy.setArm(guy, 2, 20 - 40 * bias, 0);
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

### 3.2 - Can now transition into and out of a walk cycle \( r2 \)

The major additional for this revision of the module was an additional update method that I can use in video projects to transition from a standing state into a walking state, and back again. So I made this example where I have a number of states one of which is a walk state, along with transition in and out stats and a rest state. It would seem that this new update method is working just fine then.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(4, 3, 4);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(3, 1.0, 0.5);
    scene.add(dl);
    const al = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(al);
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy.create({});
    scene.add(guy);
    //-------- ----------
    // STATE
    //-------- ----------
    const state = {
       mode: 'walk',
       n: 0, d: 80, // used to get walk alpha
       c: 0
    };
    // walk update method
    state.walk = function(state){
        const a1 = state.n / state.d;
        const a2 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
        weirdGuy.setWalk(guy, a2);
        state.n += 1;
        state.n %= state.d;
        state.c += 1;
        if(state.c >= 90){
            state.mode = 'walk_trans_out';
            state.c = 0;
        }
    };
    state.walk_trans_out = function(state){
        const a1 = state.n / state.d;
        const a2 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
        weirdGuy.transLegs(guy, a2, state.c / 30);
        state.c += 1;
        if(state.c >= 30){
            state.mode = 'rest';
            state.c = 0;
        }
    };
    state.rest = function(state){
        weirdGuy.transLegs(guy, 0, 1);
        state.c += 1;
        if(state.c >= 90){
            state.mode = 'walk_trans_in';
            state.c = 0;
        }
    };
    state.walk_trans_in = function(state){
        const a1 = state.n / state.d;
        const a2 = 1 - Math.abs(0.5 - a1 * 4 % 1) / 0.5;
        weirdGuy.transLegs(guy, a2, 1 - state.c / 30);
        state.c += 1;
        if(state.c >= 30){
            state.mode = 'walk';
            state.c = 0;
        }
    };
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let lt = new Date();
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            state[state.mode](state);
            // draw
            renderer.render(scene, camera);
            //frame += 20 * secs;
            //frame %= maxFrame;
            lt = now;
        }
    };
    loop();
}
    ());
```


### 3.3 - Can still use textures, just need to create them outside of the module \( r2 \)

I remove the built in data textures that I had in older revisions as I have a number of other modules for creating textures that I would rather use in projects to create the textures that I would use with a project like this. So in this example I am still using textures it is just that I have to certain them in my demo code here. In a real final video project that I might make using this project I have a number of projects for creating texture with data textures, canvas textures, or just simply loading external static images that I would use to create the textures.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, and RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 8 / 9, 0.05, 100);
    camera.position.set(4, 3, 4);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    const renderer = new THREE.WebGL1Renderer();
    renderer.setSize(640, 480, false);
    (document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(3, 1.0, 0.5);
    scene.add(dl);
    //-------- ----------
    // DATA TEXTURE FOR MATERIALS
    //-------- ----------
    const width = 80, height = 80;
    const size = width * height;
    const data = new Uint8Array( 4 * size );
    for ( let i = 0; i < size; i ++ ) {
        const stride = i * 4;
        const v = 150 + Math.floor( THREE.MathUtils.seededRandom() * 105 );
        data[ stride ] = v;
        data[ stride + 1 ] = v;
        data[ stride + 2 ] = v;
        data[ stride + 3 ] = 255;
    }
    const texture = new THREE.DataTexture( data, width, height );
    texture.needsUpdate = true;
    //-------- ----------
    // CISTOM MATERIALS
    //-------- ----------
    const MATERIALS = [
        new THREE.MeshPhongMaterial( { map: texture, color: 0xffff00} ),
        new THREE.MeshPhongMaterial( { map: texture, color: 0x00afff} ),
        new THREE.MeshPhongMaterial( { color: 0xffffff} ),
        new THREE.MeshPhongMaterial( { color: 0x000000} ),
        new THREE.MeshPhongMaterial( { color: 0xff0000} )
    ];
    //-------- ----------
    // WEIRD GUY INSTANCE
    //-------- ----------
    const guy = weirdGuy.create({
        materials: MATERIALS
    });
    scene.add(guy);
    //-------- ----------
    // ANIMATION LOOP
    //-------- ----------
    let frame = 0,
    lt = new Date();
    const maxFrame = 60;
    const loop = function () {
        const now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / 24) {
            const per = frame / maxFrame * 5 % 1,
            bias = 1 - Math.abs(0.5 - per) / 0.5;
            // Set walk will just move the legs
            weirdGuy.setWalk(guy, bias);
            // using set arm method to swing the arms
            weirdGuy.setArm(guy, 1, -20 + 40 * bias, 0);
            weirdGuy.setArm(guy, 2, 20 - 40 * bias, 0);
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

This is not the first kind of example that I have made that is like this, maybe the oldest example of this sort of thing would be my guy one model that I first made a few years ago now. i have made a lot of other projects that are also like this one, but have not really got into using these to make some kind of final product. That might change moving forward, especially if I do start working on threejs related stuff alone when it comes to what kind of direction I take with this website. I have found myself stuck in a pattern of coming up with ideas just for the sake of having something to write about and that is something that I would like to stop in favor of doing the inversion of that. Making projects that are cool by themselves and then maybe writing about them a little.

When it comes to this specific example though I think the nest step is maybe working out at least a few more demos that make use of the module, and also maybe expand the model a little more. When it comes to the walk cycle I think I have things set and down, but I might want at least one more walk cycle method that I can use to transition from a walk state to a standing state, and maybe a few more methods that have to do with the movement of arms, and also the expression of the face. Aside from that I think I just about have a final done deal with much about what this idea was at least for what that is worth.

