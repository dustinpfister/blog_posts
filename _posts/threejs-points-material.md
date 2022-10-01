---
title: The Points material as well as creating Points from Vector3 arrays in three.js
date: 2018-05-12 10:55:00
tags: [js,three.js]
layout: post
categories: three.js
id: 186
updated: 2022-10-01 12:53:30
version: 1.35
---

The use of the [Vector3](/2018/04/15/threejs-vector3/) class instances in [three.js](https://threejs.org/) is a major part of the process of doing much of anything in three.js. There is not just the geometry used with a material to compose a mesh object when it comes to vectors, the position property in the Object3d class is an instance of Vector3. This position property is used to set the position of mesh objects, cameras, and a whole lot of other objects.

However what if I just want to work with a collection of vectors, and have some kind of way of just displaying some points in space rather than lines, or a solid object. Maybe there is a few ways of going about doing that actually such as just observing the position property of a mesh as a point in space, and just using built in geometry constructors for the mesh such as the Sphere geometry constructor to just serve as some geometry to surround this point of interest. When I think about it for a moment maybe that kind of approach would be a good idea actually. However there is also the [Points Constructor](https://threejs.org/docs/#api/en/objects/Points) that can be used with the Special [Points Material](https://threejs.org/docs/#api/en/materials/PointsMaterial) that is put in place just for this purpose of just drawing some points in space.

There is always at least a few different ways of going about doing something, I can not say that I bother with the points material that much when it comes to working on actual projects. So in this post I will of course be going over a few examples of the Points Constructor, but I will also be going over some other examples of this sort of thing involving collections of points in space.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/s3PRFISZtAA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The points material and What to know before getting started

This is a post on three.js, a javaScript library that is used to work with objects in a 3d space. It is not a getting stared post on three.js, or javaScript in general, so if you are new to three.js you might want to start with my [getting started post](/2018/04/04/threejs-getting-started/) on the subject. I then assume that you have at least some experience making three.js demos, and are now at thins point only interested in making a certain kind of demo where you are just dealing with a collection of points. The process of doing so is not all that different from what you might all ready be familial with when it comes to working with the Mesh constructor.

So although I will not be getting into detail about the basics of three.js here, let alone everything else that you should be up to speed with before reading this. In this section I will be briefly be going over a few things that you should know, or many read up a bit more on before continuing with the Points Constructor and the Points material.

### Source code examples are up on Github

The source code examples that I am writing about in this post can also be found in my [test threejs repo on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-points-material).

### Version Numbers matter with three.js

When I first wrote this post back in May of 2018 I was using version r91 of three.js, and the last time I got around to editing this post I was using r140. Sense then a number of code breaking changes have happened when it comes to using the geometry constructor rather than the Buffer Geometry constructor. The old Geometry constructor has been removed from three.js as of version r125, so the examples here have been updated to work with the buffer geometry constructor as well as versions other chances that have happened sense then.

### The Buffer Geometry Constructor

Although built in geometries can be used with the Points material, more often than not I think that main reason why developers might be looking into the points material and the Points constructor is to get into making custom geometries. So it would make sense to also look into the [Buffer Geometry constructor](/2021/04/22/threejs-buffer-geometry/) at some point, maybe before or around the same time as starting to work with the Points Martial.

### Basic THREE.Mesh Example

The [Mesh](/2018/05/04/threejs-mesh/) is something that binds everything together into a single package of sorts, and it has properties and methods that are appropriate for it. In the above example I am just using the Box geometry constructor as a way to just go about quickly creating a geometry, and I am using that geometry with the [basic material](/2018/05/05/threejs-basic-material/) as a way to go about skinning that geometry. However when it comes to using the THREE.Points constructor in place of THREE.Mesh, I need to create a custom instance of Buffer Geometry.

```js
scene.add(
    new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        })
    )
);
```

## 1 - The basics of Points and the Point material vs Mesh Constructors, and basic Three.Points Constructor example

If you have made at least a few basic three.js demos you might be at the point where you understand that at least part of the process is to create and add a [Mesh](/2018/05/04/threejs-mesh/) object and add that object to a scene object. That scene object is then passed to a renderer along with a camera to create a render instance that can then be used to draw to a canvas element. This Mesh Object is composed of a Geometry, and at least one material to be used when rendering that Geometry. 

The THREE.Points class is then just a different kind of Mesh that is used to just draw points of a geometry in the position attribute. One thing about this Points constructor is that it can just me used just like with Mesh objects in that I can just pass any buffer geometry to it. However the main different from that comes with the material to use with the Points Constructor which is a situation in which I just have the points material to work with.

### 1.1 - A Basic THREE.PointsMaterial example passing a Sphere Geometry with calling THREE.Points

The points constructor is like that Mesh constructor only it is just the position attribute of a Buffer Geometry instance that will be mainly what is used in rendering. This geometry that I give the THREE.Points constructor could be a custom geometry like the one on the documentation page of the THREE.Points constrictor on the three.js website. However it can also be one of the geometries that is created and returned by one of the Built in geometry constructors such as the THREE.SphereGeomerty constructor.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
    // geometry
    var geometry = new THREE.SphereGeometry(1, 10, 60);
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    var pt = new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.025
            }));
    scene.add(pt);
    // camera and renderer
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000); // camera
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer(); // render
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

So in other words the points constructor is just a more primitive kind of mesh, that can only be used with a special points material, but aside from that an instance of THREE.Points is very similar to that of THREE.Mesh instances. Just like the that of A mesh and Instance of Points is based on the Object3d class, so when it comes to positioning and rotating the Points instance all of that is more or less the same as Mesh. Also it is still and instance of buffer geometry that is passed as the first argument, that can be created by using the Buffer Geometry constructor directly, or by using one of the built in constructors, it is just that many of the attributes that would be used in the Mesh constructor are ignored.

### 1.2 - Buffer Geometry from Array of Vector3 class instances

Although I might often want to just pass a buffer geometry that I all ready have to the Points constructor In many cases I might have an array of Vector3 class instances that I would like to create a buffer geometry from. I will then want to use the buffer geometry that is created from this array of Vector3 class instances with the Points Constructor. 

The general process of doing this would be to create a typed array from the array of vector3 class instances that I can then use with the set attribute method of the Buffer geometry class to create the position attribute for the geometry. However that would be the hard way of doing so with this, a less complex way of getting this done would be to make use of the set from points method of the buffer geometry class.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // POINTS
    //-------- ----------
    // ARRAY of VECTOR3 CLASS INSTANCES
    const v3Array = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(1, 0, 0),
        new THREE.Vector3(0, 1, 0),
        new THREE.Vector3(0, 0, 1),
        new THREE.Vector3(2, 0, 0),
        new THREE.Vector3(0, 2, 0),
        new THREE.Vector3(0, 0, 2),
        new THREE.Vector3(3, 0, 0),
        new THREE.Vector3(0, 3, 0),
        new THREE.Vector3(0, 0, 3)
    ];
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            new THREE.BufferGeometry().setFromPoints(v3Array),
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.25
            })));
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

The nice thing about Points is that it is just the position attribute that I care about with this. When it comes to mesh objects there is also the normal, and uv attributes that I would want to set up. However this is a post on the points material so I will not be getting into any of that here. However I do in any case see the position attribute as the first attribute of interest in creating a custom geometry so this is always a good starting point.

### 1.3 - Array of Vector3 class instances from Buffer Geometry 

Okay so I covered an example in which I create a buffer geometry from an array of vector3 class instances. However what if I want to create an array of Vector3 objects, use the power of the various methods to work with in that class to mutate the values of the vector3 objects, and then convert that to a geometry? One way to do this is to loop over the array of the position attribute, when doing so I can use the count value to know what the number of points is. For each point then I can use the getX, getY, and getZ methods if the Buffer Attribute class to get the various values that I can then in turn use to create my array of vector3 objects.

Once I have my array of vector3 class instances I can loop over them and use methods like normalize, applyEuler, and multiplyScalar just to name a few to mutate the values. I can then do the same as before with the methods I covered before hand to crate a buffer geometry instance from this array of mutated vector3 objects.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Buffer Geometry from v3Array
    const Vector3ArrayToGeometry = (v3Array) => {
        return new THREE.BufferGeometry().setFromPoints(v3Array);
    };
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
    //-------- ----------
    // POINTS
    //-------- ----------
    // Geometry created with the Torus Geometry Constructor
    const geometry = new THREE.TorusGeometry(2, 0.75, 30, 60);
    geometry.rotateX(Math.PI / 180 * 90);
    // array of Vector3 class instances
    const v3Array = Vector3ArrayFromGeometry(geometry);
    // do somehting to the v3 array
    v3Array.forEach((v) => {
        const vd = new THREE.Vector3();
        vd.copy(v).normalize().multiplyScalar(0.75 * THREE.MathUtils.seededRandom())
        v.add(vd);
    });
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            Vector3ArrayToGeometry(v3Array),
            new THREE.PointsMaterial({
                color: 0x00afaf,
                size: 0.125
            })));
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

## 2 - The Points Material and creating a custom geometry with the Buffer Geometry Constructor, and Rand Float Spread

Now that I have covered the basics of the TREE.Point constructor, and how it compares to the Mesh Constructor it is now time to start to look at a few more examples of the Points constructor and of course the Points material. One not so hard yet interesting example that comes to mind with this would be to just have a whole bunch of random points in a given range.

In this example I am using the THREE.Math.randFloatSpread function to create values between zero and a given max range. I then will want to create an instance of the Buffer Geometry constructor, and create a position attribute for the geometry. The array or points will then be passed to the set attribute method of the buffer geometry instance. After that it is just a matter of passing the instance of buffer geometry to the THREE.Point constructor as the value for the first argument, followed by an instance of the Points material.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    // geometry
    var i = 0,
    verts = [];
    while (i < 500) {
        var pt = new THREE.Vector3();
        pt.set(
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45));
        verts.push(pt.x, pt.y, pt.z);
        i += 1;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    scene.add(
        new THREE.Points(
            geometry,
            new THREE.PointsMaterial({
                color: 0x00afaf
            })));
 
    // renderer and camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(50, 50, 50);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

## 3 - A spiral example of THREE.Points and THREE.PointsMatreial

The next step with this is starting to experiment with creating custom geometries, and just looking at the state of the points alone.  With that said there is starting to work out expressions for creating the array of values to be used just for the position attribute of an instance of Buffer Geometry. The full process of making a geometry instance that will work well with THREE.Mesh is a little involves, and working out the position array is just one part of the process. However when it comes to just using the THREE.Points constructor and the Points material I can just focus on the points in space, and that is all. In this example I was paying around with some expressions that result in the formation of a spiral like pattern of points.

```js
(function () {
    // scene
    var scene = new THREE.Scene();
 
    // geometry
    var i = 0,
    iMax = 50,
    rotationCount = 4,
    vert,
    vertices = [],
    per,
    r;
    while (i < iMax) {
        // percent
        per = i / iMax;
        // radian
        r = Math.PI * 2 * rotationCount * per;
        r %= Math.PI * 2;
        // current vertex
        vert = new THREE.Vector3();
        vert.x = Math.cos(r) * (1 + 5 * per);
        vert.y = -10 + 15 * per;
        vert.z = Math.sin(r) * (1 + 5 * per);
        vertices.push(vert.x, vert.y, vert.z);
        i += 1;
    }
    var geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
 
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    var points = new THREE.Points(
            // geometry as first argument
            geometry,
            // then Material
            new THREE.PointsMaterial({
                size: .05
            }));
    scene.add(points);
 
    // camera and renderer
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
 
}
    ());
```

There is a great deal more to look into when it comes to making a solid custom geometry, however maybe one of the first things that should be worked out is the position of the vertices. Just working out that logic with the use of the Points constructor is then a good starting point, and then from there it is just a question of adding all the additional properties that are needs when it comes to drawing triangles between the points, and setting material index values as well as a uv array.

## 4 - Using Mesh objects and Mesh Materials as a way to display points

The points material will work just fine for situations in which I just want to get a basic visual representation of the points of a geometry alone. However it goes without saying that there are some draw backs with using the points material as well as the corresponding points constructor over the mesh constructor and the lengthy array of choices for materials with mesh objects. One major draw back is that I can not do anything with light, and yet another draw back is that I do not have control over the shape that will be used with each point. For example if I want to have a sphere like shape for each point and also show at least a little depth for each sphere for each point then I am going to want to go with mesh objects.

To go about creating a mesh for each point in a geometry I will want to find a way to create an array of Vector3 instances from the position property of a geometry, or use methods like getX, getY, and getZ of the position attribute along with the use of the count property of the position attribute. For this example I am doing the later of these two to create Vector3 instances as needed. And for each vector3 instance that I create I copy that Vector to the position property of a new mesh object that I am making for each point. When doing so I can use any geometry I want for each point, such as the Sphere geometry constructor, also I can use any material that I want including potions that respond to light sources.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000); // camera
    camera.position.set(2, 2, 2);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer(); // render
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // LIGHT
    //-------- ----------
    const dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2,1,-2)
    scene.add(dl);
    //-------- ----------
    // POINTS
    //-------- ----------
    const geometry = new THREE.SphereGeometry(1.28, 60, 10);
    const pos = geometry.getAttribute('position');
    let i = 0;
    const len = pos.count;
    while(i < len){
        const v = new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i))
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(0.075, 10, 10),
            new THREE.MeshPhongMaterial({
                color: 0xff0000,
                emissive: 0xffffff,
                emissiveIntensity: 0.15}))
        mesh.position.copy(v);
        scene.add(mesh);
        i += 1;
    }
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}());
```

## 5 - Animation example

Working with just the position attribute of buffer geometry along with the Points and Points Material can be kind of fun. That is once one gets past all the dull stuff to start creating interesting artful work and animations. For this example I made a little animation loop in which I take a Torus Geometry and explode it outward into all kinds of various points, and then back again.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    camera.position.set(6, 6, 6);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // HELPERS
    //-------- ----------
    // Vector3 Array to Typed Array
    const Vector3ArrayToTyped = (v3Array) => {
        let i = 0, len = v3Array.length, vertArray = [];
        while(i < len){
            let v = v3Array[i];
            vertArray.push(v.x, v.y, v.z);
            i += 1;
        }
        return new THREE.Float32BufferAttribute(vertArray, 3)
    };
    // Buffer Geometry from v3Array
    const Vector3ArrayToGeometry = (v3Array) => {
        const typedArray = Vector3ArrayToTyped(v3Array);
        const geometry = new THREE.BufferGeometry();
        return geometry.setAttribute('position', typedArray);
    };
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
    //-------- ----------
    // POINTS
    //-------- ----------
    // Geometry created with the Torus Geometry Constructor
    const geometry = new THREE.TorusGeometry(2, 0.75, 30, 60);
    geometry.rotateX(Math.PI / 180 * 90);
    // array of Vector3 class instances
    const v3Array_1 = Vector3ArrayFromGeometry(geometry);
    // do somehting to the v3 array
    const v3Array_2 = v3Array_1.map((v) => {
        const vd = new THREE.Vector3();
        vd.copy(v).normalize().multiplyScalar(2 + 3 * THREE.MathUtils.seededRandom())
        return v.clone().add(vd);
    });
    const v3Array_3 = Vector3ArrayLerp(v3Array_1, v3Array_2, 0);
    // THREE.Points INSTANCE UISNG THREE.PointsMaterial
    const points = new THREE.Points(
        Vector3ArrayToGeometry(v3Array_3),
        new THREE.PointsMaterial({
        color: 0x00afaf,
        size: 0.125
    }));
    scene.add(points);
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
        const p = frame / frameMax;
        const a = 1 - THREE.MathUtils.pingpong(p - 0.5, 1) * 2
        const v3Array = Vector3ArrayLerp(v3Array_1, v3Array_2, a);
        points.geometry.copy( Vector3ArrayToGeometry( v3Array) )
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

So the points material is an interesting alternative to the typical basic or standard material that I often use in my basic project examples that I have made thus far with working with the typical Mesh rather than points class. There should be at least one such option when it comes to just having a way to see the location of points in a geometry, and the points material seems to work fine when it comes to this. However there are a number of draw backs from using the Points class, and I think that I often will want to use a  mesh instance even in situations in which I am interested in the points, by using a geometry positions attribute as a way to set position values for a collection of mesh objects.
