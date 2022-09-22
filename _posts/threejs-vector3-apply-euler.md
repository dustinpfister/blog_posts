---
title: Apply Euler angles to a Vector3 in threejs
date: 2021-06-18 09:19:00
tags: [three.js]
layout: post
categories: three.js
id: 892
updated: 2022-09-22 15:56:26
version: 1.35
---

When it comes to moving and rotating objects around in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are two general classed that come to mind [THREE.Vector3](https://threejs.org/docs/#api/en/math/Vector3), and [THREE.Euler](https://threejs.org/docs/#api/en/math/Euler). The Vector3 class has to do with creating an object that represents a Vector in Vector space, and as such the Vector3 class is great for working with a set of numbers that have to do with a specific position in space. 

However a Vector can also be though of as a way to go about having a direction in space when it comes to the distance of the vector from the origin. In fact Vectors are often descried as being a direction and a magnitude, that is a normalized set of values between 0 and one for each axis that is then raised to what is often called a euclidean distance from the origin. There is another way of thinking about this though, such as having angels using the Euler class and using that as a way to set the position, or direction and magnitude of a Vector if you prefer.

So in this post I will be looking at the Vector3.applyEuler method and how it can be combined with various other Vector3 prototype methods to accomplish some various tasks.

<!-- more -->

## Applying a Euler angle to a Vector and what to know first

This is a post on the Apply Euler method in the Vector3 class and any additional subjects that might come up when it comes to using this method. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or [javaScript in general](/2018/11/27/js-getting-started/) so I assume that you are beyond the basic hello world type project when it comes to using threejs. However on top of that there are a few things that you should have fairly solid at this point, so in this section I will be quickly going over what those things are.

### There is a great deal more to be aware of when it comes to the eEctor3 class

It might be a good idea to take a second look at the [Vector3 class in general](/2018/04/15/threejs-vector3/) and look over what there is to work with when it comes to the various prototype methods beyond that of the apply Euler method. In the examples that I am going over in this post I am not just using the apply Euler method, but a few other Vector3 class methods that have to do with [normalizing a Vector3 instance](/2021/06/14/threejs-vector3-normalize/) to a Vector3 that is a unit vector of a length of 1 for example. So it might make sense to look into the class more if you still find something like that a little confusing.

### Check out the Euler class in general

In order to use the apply [Euler method](/2021/04/28/threejs-euler/) of the Vector3 class it should go without saying that an instance of the Euler class will be needed. This is then another class that is worth checking out in detail if you have not done so all ready, it is similar to that of Vector3, but is has to do with a collation of three angles.

### Version Numbers matter with threejs

When I wrote this post I was using r127 of threejs. I have made a habit of making sure that I always mentioning what version I was using when writing a post like this because of code breaking changes that are made to the library often.

## 1 - Basic Vector3.applyEuler example

So then lets start out with a basic example of this apply user Vector3 method to gain a scene as to how it works. Here I have an example where I have a create cube helper method that will create and return a Mesh object that uses the Box geometry, and the Mesh normal material. The intention is that I will be creating one or more cubes with this method and using Euler and Vector3 class instances along with the apply Euler Vector3 prototype method as a way to set the position of this cube in a scene.

When positioning the cube I create an Instance of the Euler class that I will be using as the argument value for the apply Euler method. For this example I am using the [THREE.MathUtils.getToRad](https://threejs.org/docs/#api/en/math/MathUtils.degToRad) convenience method to convert a degree value to a radian value that is used with the Euler class. For now I am creating a Euler class instance where I have a 45 degree angle for the y value of the Euler class, and I am just leaving the other values at 0.

Next I want to create a new Instance of the THREE.Vector3 class and here is where things get a little tricky. I want to make sure that the length of the Vector3 instance is not zero. The default values for a Vector3 are 0,0,0 and if that is the case applying any Euler value to the vector will not change anything when it comes to the direction of the vector because everything is 0. So for now I am just setting the starting position of the vector at some kind of starting direction such as any positive number on the x axis. I can now call the apply euler method off of the vector, and apply the Euler instance to the vector.

```js

(function () {
    //-------- ----------
    // HELPERS
    //-------- ----------
    const createCube = function(){
        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        return cube;
    };
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // MESH
    //-------- ----------
    // creating a cube and adding it to the scene
    const cube = createCube();
    scene.add(cube);
    // USING THE APPLY EULER Vector3 METHOD
    const e = new THREE.Euler(
        THREE.MathUtils.degToRad(0),
        THREE.MathUtils.degToRad(45), 
        THREE.MathUtils.degToRad(0));
    const v = new THREE.Vector3(2, 0, 0).applyEuler(e);
    cube.position.copy(v);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

Now there is doing something with that Vector3 class instance to say set the position of a cube mesh object. When it comes to this the position property of a mesh object is also an instance of Vector3, and as such I can use the copy method of the position property of the mesh to copy the values of this stand alone vector3 to the position property. The result then is that the position of the cube is set to the position of the vector to which I have applied the EUler instance to and I have expected results. The cube is now 45 degrees from the starting position of the vector, and it would seem that the Vector still has the same length that I have set for it.

## 2 - Animation example

So now that I have a basic example of this worked out, I often like to make at least one or more examples that involve an animation loop function using something like request animation frame, or some other means to do so. This will allow for me to use the apply Euler method over and over again with a range of values to get a better sense of what the apply Euler method does, and why it can prove to be a useful tool when working out various things that have to do with the movement of objects in space.

This example then involves the use of a vector from angles helper method in which I can pass values for the various angles along with a length, and a start vector as a way to create and return a Vector3 instance created with these arguments.

```js

(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // simple create cube helper
    const createCube = function () {
        const cube = new THREE.Mesh(
                new THREE.BoxGeometry(1, 1, 1),
                new THREE.MeshNormalMaterial());
        return cube;
    };
    // vector fro angles helper
    const vectorFromAngles = function (a, b, c, len, startVec) {
        len = len === undefined ? 1 : len;
        startVec = startVec === undefined ? new THREE.Vector3(1, 0, 0) : startVec;
        const e = new THREE.Euler(
                THREE.MathUtils.degToRad(a),
                THREE.MathUtils.degToRad(b),
                THREE.MathUtils.degToRad(c));
        const v = startVec.applyEuler(e).normalize();
        return v.multiplyScalar(len);
    };
    //-------- ----------
    // MESH
    //-------- ----------
    var cube = createCube();
    scene.add(cube);
    // USING MY VECTOR FROM ANGLES METHOD
    var v = vectorFromAngles(90, 0, 0, 1);
    cube.position.copy(v);
    //-------- ----------
    // LOOP
    //-------- ----------
    var lt = new Date(),
    a = 0,
    b = 0,
    c = 0,
    fps = 30;
    var loop = function () {
        var now = new Date(),
        secs = (now - lt) / 1000;
        requestAnimationFrame(loop);
        if (secs > 1 / fps) {
            b += 90 * secs;
            b %= 360;
            var v = vectorFromAngles(a, b, c, 1.5);
            cube.position.copy(v);
            lt = now;
            renderer.render(scene, camera);
        }
    };
    loop();
}());
```

The result is then having the cube move around in a circle around the origin of the scene as expected. So then it is possible to create all kinds of helper methods like this that might come in handy when it comes to creating Vectors than can be applied to a mesh object, or used fr any other purpose that might come up.

## 3 - Using apply euler to update the position attribute of a geometry

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    ( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
    // ---------- ----------
    // HELPERS
    // ---------- ----------
    // Vector3 array from geometry
    const Vector3ArrayFromGeometry = (geometry) => {
        const pos = geometry.getAttribute('position');
        let i = 0;
        const len = pos.count, v3Array = [];
        while(i < len){
            const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
            v3Array.push(v);
            i += 1;
        }
        return v3Array;
    };
    // lerp two vector3 arrays
    const Vector3ArrayLerp = (v3Array_1, v3Array_2, alpha) => {
        return v3Array_1.map((v, i) => {
            return v.clone().lerp( v3Array_2[i], alpha )
        });
    };
    const Vector3ArrayToTyped = (v3Array) => {
        let i = 0, len = v3Array.length, vertArray = [];
        while(i < len){
            let v = v3Array[i];
            vertArray.push(v.x, v.y, v.z);
            i += 1;
        }
        return new THREE.Float32BufferAttribute(vertArray, 3)
    };
    // update geo helper
    const updateGeo = (geometry, toV3array, alpha) => {
        const v3array3 = Vector3ArrayLerp(v3array1, toV3array, alpha);
        const pos = sphere.geometry.getAttribute('position');
        const typed = Vector3ArrayToTyped(v3array3);
        typed.array.forEach((n, i)=>{
            pos.array[i] = n;
        });
        pos.needsUpdate = true;
    };
    // ---------- ----------
    // MESH
    // ---------- ----------
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 60, 60),
        new THREE.MeshNormalMaterial({
            side: THREE.DoubleSide
        })
    );
    scene.add(sphere);
    const angleEffect = function(v, i, arr) {
        const unitLength = 0.5 + 4.5 * Math.random();
        const e = new THREE.Euler();
        if(v.x >= 0){
             e.x = Math.PI / 180 * 90;
             e.y = Math.PI / 180 * 20 * Math.random();
        }else{
             e.x = Math.PI / 180 * 90 * -1;
             e.y = Math.PI / 180 * 20 * Math.random() * -1;
        }
        return v.clone().normalize().applyEuler(e).multiplyScalar(unitLength)
    }
    const v3array1 = Vector3ArrayFromGeometry(sphere.geometry);
    const v3array2 = v3array1.map(angleEffect);
    // ---------- ----------
    // ANIMATION LOOP
    // ---------- ----------
    const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
    FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
    FRAME_MAX = 120;
    let secs = 0,
    frame = 0,
    lt = new Date();
    // update
    const update = function(frame, frameMax){
         let p = frame / frameMax;
         let b = 1 - Math.abs(0.5 - p) / 0.5;
         updateGeo(sphere.geometry, v3array2, b)
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
}());
```

## Conclusion

It would seem like there is at times a lot of over lap between the Vector3 class and the Euler class, and there is a lot of similarities between the two. I remember that when I was first getting started wit threejs that I would often confuse the two, but it is a good idea to work out the confusion. When it comes to Vector3 instances I am dealing with three properties that have to do with an x, y, and z, values and these values often have to do with a position in space. However they can be used for many other things such as ratios that have to do with these values that can then be applied to another Vector3 instance, or a Euler instance. With a Euler class instance it is a similar situation when it comes to the property values, however now I am dealing with radian values that represent angles.

