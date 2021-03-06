---
title: The Edges Geometry in threejs
date: 2021-05-31 12:01:00
tags: [three.js]
layout: post
categories: three.js
id: 878
updated: 2021-06-01 12:17:11
version: 1.24
---

The [edges geometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry) constructor in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) is yet another useful little feature of threejs that can be a handy tool when I just want to view the edges of a geometry. I became aware of how this constructor can be useful when I took a second look into how to o about working with [wire frames when updating my post on that subject](/2019/12/19/threejs-wireframe/) in three.js. When it comes to wire frame mode that works more or less as expected, however it will work by showing all the triangles of a geometry, not just the edges of a geometry as a line, or collection of line segments. So when it comes to creating another kind of wire frame mode that is just the edges of a geometry this constructor can help with that when used with the line constructor. However I think that this constructor deserves a quick post on its own, so here it is.

<!-- more -->

## 1 - The Edges geometry constructor and what to know first.

This is a post on the THREE.EdgesGeometry constructor function in the javaScript library known as three.js. In order to gain something of value from reading this it is called for to have at least some background on these subjects as I will not be getting into the very basics of three.js and javaScript here. I will however take a moment to go over a few things that you might want to read up on more if you find this post a little to advanced still.

### 1.1 - Read up a bit more on buffer geometry in general first

The first argument for the Edges Geometry constructor should be an instance of buffer geometry from which to create edges from. In other words in order to create an Edge Geometry to use with Line Segments you first need a geometry. There are a number of options to choose from in threejs when it comes to built in geometry constructors such as the [box geometry](/2021/04/26/threejs-box-geometry/) constructor, and the [sphere geometry](/2021/05/26/threejs-sphere/) constructor. There is also loading a geometry in from an external file, or creating a custom geometry with a little javaScript code using the Buffer Geometry constructor directly.

### 1.2 - The Line segments constructor, and Line Materials

Once A geometry is passed to the Edges geometry constrictor another geometry is returned, but then in order to see anything the nest step would be to pass the resulting Edges geometry to the [Line segments](https://threejs.org/docs/#api/en/objects/LineSegments) constructor. You might all ready be somewhat familiar with the Mesh Constructor in threejs, this Line Segments constructor is somewhat similar in the sense that it is yet another object in three.js that is based off of the object3d class, and it will work with a geometry instance. However there is a restriction on what materials can be used as I can only use Line materials such as the Line basic material with an instance of line segments.

### 1.3 - The Object3d class is also worth looking into more also.

The line segments constructor that is used with the geometry that is returned by the edges geometry constrictor is based on a class known as object3d. If you have not done so take a moment to look into this class in great detail, there is a lot to know about it and it apples to a whole lot of objects in three.js. In this post it is mainly the Line Segments instance to which a knowledge of Object3d applies, but there is also the camera, and the scene object also that are other examples of objects that are based off of Object3d. There are also a wide range of other topics that branch off from object3d that are worth looking into more also, such as the Euler class that is used when it comes to the rotation property of a line segments object, and the Vector3 class that is used with the position property.

### 1.4 - Need to keep version numbers in mind with three.js

When I wrote this post I was using three.js r127 which was still a fairly late version of threejs at the time of this writing. In the future changes might be made that will case the code examples here to break, so make sure to always be aware of the version number of threejs that you are using if you run into problems.

## 2 - Basic edges geometry example

To create an edges geometry I will first want a geometry by which to get the edges from that will be passed to the THREE.EdgesGeometry constructor. So for this basic example I started out with just a simple THREE.BoxGeometry and then pass that as the first and only argument to the THREE.EdgesGeometry constructor. I then took the returned geometry from THREE.EdgesGeometry and used that as the geometry for an instance of THREE.LineSegements, and I went with the THREE.LineBasicMaterial for that instance of line segments. I can then add the Line Segments instance to a scene object, and then set up my camera and renderer just like with any other three.js project.

```js
(function () {
    // box geometry and...
    var boxGeo = new THREE.BoxGeometry(1, 1, 1),
    // AN EDGE GEOMETRY CREATED FROM IT
    edgeGeo = new THREE.EdgesGeometry(boxGeo),
    line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    // Scene, camera renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line);
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

The result of this is then a box that looks like it is in a kind of wire frame mode, however it looks different from a Mesh object that just has its material set to wire frame mode. There may be a few other ways to get this kind of effect, such as doing something with textures and alpha maps, but that kind of approach will also have a few down sides that I have not found solutions for just yet.
## 3 - A sphere example, mesh in wire frame mode, and the threshold angle argument of edges geometry

Now that I have the basic example out of the way it is time to start to look into some slightly more advanced examples of the edge geometry. One thing to look into is what the deal is with this threshold angle argument when calling the edge geometry constructor. It would seem that an edge is only created if the angle between the face normals of the adjoining faces exceeds the given threshold angle. The default value for this angle is one degree but in some situations I might want to set that higher, or lower depending on what I want to do. 

So in this example I am creating two line segments both of which are using edge geometry created from the same sphere geometry constructor. However with one of them I am setting the threshold angle to 10, while the other I am leaving at the default value of 1. In addition to this I am also throwing in a mesh object that is directly using the sphere geometry with the basic material in wire frame mode as another object to compare to.

```js
(function () {
    // sphere geometry and...
    var sphereGeo = new THREE.SphereGeometry(0.5, 15, 20);
    // AN EDGE GEOMETRY CREATED FROM IT WITH THRESHOLD ANGLE of 10
    var line1 = new THREE.LineSegments(
            new THREE.EdgesGeometry(sphereGeo, 10),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    line1.position.set(-0.75, 0, 0);
    // SAME EDGE GEOMETRY BUT WITH DEFULT THRESHOLD ANGLE
    var line2 = new THREE.LineSegments(
            new THREE.EdgesGeometry(sphereGeo, 1),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    line2.position.set(0.75, 0, 0);
 
    var mesh1 = new THREE.LineSegments(
            sphereGeo,
            new THREE.MeshBasicMaterial({
                color: new THREE.Color('gray'),
                wireframe: true
            }));
    mesh1.position.set(0, 0, -1.75);
 
    // Scene, camera renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line1);
    scene.add(line2);
    scene.add(mesh1);
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.75, 2.00, 1.75);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

## 4 - Creating and example with an animation loop

One way to go about getting a better look at the over all situation of what is going on here would be to move the camera around, or the line segments instance. In any case this will require that I set up some kind of animation loop to update the position, or rotation of the line segments instance or the camera. There are a number of ways to go about doing something like this, but I think that it might be a good idea to make use of the THREE.Clock Constructor along with the use of request animation frame. However this is a topic where I keep finding other ways to go about doing this that might be a little better for one reason or another. I do not want to get into all of that in detail here as doing so is a little off topic.

In this example I took the source code of my basic example of the edges geometry that I coved above in this post and I just added a animation loop at the end of the source code. In the body of the animation loop I call an update function and in the body of that I am just using the rotation property of the line segments instance to rotate the line segments along the y axis.

```js
(function () {
 
    // box geometry and...
    var boxGeo = new THREE.BoxGeometry(1, 1, 1),
    // AN EDGE GEOMETRY CREATED FROM IT
    edgeGeo = new THREE.EdgesGeometry(boxGeo);
    var line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
 
    // Scene, camera renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line);
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
 
    // loop
    var state = {
        clock: new THREE.Clock(),
        frame: 0,
        maxFrame: 90,
        fps: 12, // capping at 12 fps
        per: 0
    };
    var update = function (state) {
        line.rotation.y = Math.PI * 2 * state.per;
    };
    var loop = function () {
        var wSecs = performance.now() - state.clock.oldTime,
        secs;
        requestAnimationFrame(loop);
        if (wSecs > 1 / state.fps) {
            secs = state.clock.getDelta();
            state.per = state.frame / state.maxFrame;
            update(state);
            state.frame += state.fps * secs;
            state.frame %= state.maxFrame;
            renderer.render(scene, camera);
        }
    };
    // START CLOCK
    state.clock.start();
    loop();
}
    ());
```

## 4 - Conclusion

So then the use of an instance of an Edges Geometry constructor will result in another way to go about getting something that looks like a kind of wire frame, and if you ask me it looks good. However there are still some draw backs, on of which is that I can not seem to set the line width to anything other than one. Another way to go about having a kind of wire frame type look would be to try to work something out with some textures, but so far I can not say that I have found anything that works as well as I would like it to when it comes to that kind of approach. So I think that maybe the best way to go about getting a kind of wire frame mode with thick lines might be to think in terms of using the cylinder geometry, sphere geometry, and create a collection of mesh objects but maybe getting into that sort of thing would be a matter for a whole other post.


