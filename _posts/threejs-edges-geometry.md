---
title: Edges Geometry in threejs with Line Segments and other options
date: 2021-05-31 12:01:00
tags: [three.js]
layout: post
categories: three.js
id: 878
updated: 2022-09-21 15:41:21
version: 1.34
---

The [edges geometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry) constructor in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) is yet another useful little feature of threejs that can be a handy tool when I just want to view the edges of a geometry. 

I became aware of how this constructor can be useful when I took a second look into how to go about working with [wire frames when updating my post on that subject](/2019/12/19/threejs-wireframe/) in three.js. When it comes to wire frame mode that works more or less as expected, however it will work by showing all the triangles of a geometry, not just the edges of a geometry as a line, or collection of line segments. So when it comes to creating another kind of wire frame mode that is just the edges of a geometry this edges geometry constructor can help with that when used with the [line constructor](/2018/04/19/threejs-line/) in place of the use of the [mesh constructor](/2018/05/04/threejs-mesh/).

This subject then deserves at least one stand alone post on the topic then, as there are some stations in which I might want to use this in place of what is typically used.

<!-- more -->

## The Edges geometry constructor and what to know first.

This is a post on the THREE.EdgesGeometry constructor function in the javaScript library known as three.js. In order to gain something of value from reading this it is called for to have at least some background on these subjects as I will not be getting into the very basics of three.js and javaScript here. I will however take a moment to go over a few things that you might want to read up on more if you find this post a little to advanced still.

### Read up a bit more on buffer geometry in general first

The first argument for the Edges Geometry constructor should be an instance of buffer geometry from which to create edges from. In other words in order to create an Edge Geometry to use with Line Segments you first need a geometry. There are a number of options to choose from in threejs when it comes to built in geometry constructors such as the [box geometry](/2021/04/26/threejs-box-geometry/) constructor, and the [sphere geometry](/2021/05/26/threejs-sphere/) constructor. There is also loading a geometry in from an external file, or creating a custom geometry with a little javaScript code using the Buffer Geometry constructor directly.

### The Line segments constructor, and Line Materials

Once A geometry is passed to the Edges geometry constrictor another geometry is returned, but then in order to see anything the nest step would be to pass the resulting Edges geometry to the [Line segments](https://threejs.org/docs/#api/en/objects/LineSegments) constructor. You might all ready be somewhat familiar with the Mesh Constructor in threejs, this Line Segments constructor is somewhat similar in the sense that it is yet another object in three.js that is based off of the object3d class, and it will work with a geometry instance. However there is a restriction on what materials can be used as I can only use Line materials such as the Line basic material with an instance of line segments.

### The Object3d class is also worth looking into more also.

The line segments constructor that is used with the geometry that is returned by the edges geometry constrictor is based on a class known as object3d. If you have not done so take a moment to look into this class in great detail, there is a lot to know about it and it apples to a whole lot of objects in three.js. In this post it is mainly the Line Segments instance to which a knowledge of Object3d applies, but there is also the camera, and the scene object also that are other examples of objects that are based off of Object3d. There are also a wide range of other topics that branch off from object3d that are worth looking into more also, such as the Euler class that is used when it comes to the rotation property of a line segments object, and the Vector3 class that is used with the position property.

### Source code examples for this post and many others are up on Github

The source code examples for this post as well as my [many other posts on threejs](/categories/three-js/) can be found on Github in [my test threejs repo](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-edges-geometry).

### Need to keep version numbers in mind with three.js

When I first wrote this post I was using three.js r127, and the last time I cam around to do some editing I was using r140 of the library. In the future changes might be made that will cause the code examples here to break, so make sure to always be aware of the version number of threejs that you are using if you run into problems.

## 1 - Some basic Line and Edges geometry examples

To create an edges geometry I will first want a geometry by which to get the edges from that will be passed to the THREE.EdgesGeometry constructor as the first argument. So for these basic examples I start out with just a simple THREE.BoxGeometry and then pass that as the first argument to the THREE.EdgesGeometry constructor. After that there is also an additional option second argument that has to do with the angle threshold that is used to fine edges, more on that in later sections but for now the focus will be on just some basic examples where I just pass a geometry.

### 1.1 - Just passing a Box Geometry to the THREE.Line Constructor

Say that I Just want to look at some lines of the edges of a geometry, for this I might use something like the THREE.Line constructor function with the THREE.LineBasicMaterial to do so. So then there is creating an instance of buffer geometry with say the Box geometry constructor and then just pass that as the geometry to use with the Line.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // JUST USING BOX GEOMETRY WITH THREE.Line
    //-------- ----------
    const boxGeo = new THREE.BoxGeometry(1, 1, 1),
    line = new THREE.Line(
            boxGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    scene.add(line);
    //-------- ----------
    // SCENE
    //-------- ----------
    renderer.render(scene, camera);
}());
```

Although this might work it does not give me the kind of result that I was hoping for. The reason way is that although the geometry I am working with will work well for Mesh objects it might not be set up just right for Lines, or Line Segments. So then there is making use of the Edge Geometry Constructor to see if that can be used to get the kind of end result that I want.

### 1.2 - Using the Edge geometry constructor

In place of just passing the Box geometry as the first argument for the THREE.Line Constructor there is running it threw the THREE.EdgesGeometry Constructor first to get a new geometry created from the original source geometry and then pass that as the geometry to use with THREE.Line.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // EDGE GEOMETRY CREATED FROM BOX GEOMETRY BUT USING WITH THREE.Line
    //-------- ----------
    const boxGeo = new THREE.BoxGeometry(1, 1, 1),
    edgeGeo = new THREE.EdgesGeometry(boxGeo),
    line = new THREE.Line(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    scene.add(line);
    //-------- ----------
    // SCENE
    //-------- ----------
    renderer.render(scene, camera);
}());
```

This does look a little different, but it is still not just what I have in mind. There is one more then to try though and that would be to use the THREE.LineSegments constructor in place of THREE.Line.

### 1.3 - Using the THREE.LineSegments constructor with THREE.EdgeGeometry

For this last example in this basic section I am now just once again passing the result of calling the Box geometry constrictor the edges geometry constructor. However now I am just using the THREE.LineSegements constructor in place of THREE.Line. By making use of the line segments class I am now getting and end result that looks like what it is that I have had in mind with this.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // EDGE GEOMETRY CREATED FROM BOX GEOMETRY AND USING WITH THREE.LineSegments
    //-------- ----------
    const boxGeo = new THREE.BoxGeometry(1, 1, 1),
    edgeGeo = new THREE.EdgesGeometry(boxGeo),
    line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    scene.add(line);
    //-------- ----------
    // SCENE
    //-------- ----------
    renderer.render(scene, camera);
}());
```

The result of this is then a box that looks like it is in a kind of wire frame mode, however it looks different from a Mesh object that just has its material set to wire frame mode. There may be a few other ways to get this kind of effect, such as doing something with textures and alpha maps, but that kind of approach will also have a few down sides that I have not found solutions for just yet.
So although the result that is returned by the edges geometry is indeed a kind of buffer geometry. It is not a kind of geometry that will work well with Mesh, or even Line objects. In general I will want to use Line Segments with the kind of geometry that is returned by the edges geometry constructor. However maybe it will still be a good idea to look at a few more examples to get a better sense of what is going on here.

## 2 - A sphere example, mesh in wire frame mode, and the threshold angle argument of edges geometry

Now that I have the basic example out of the way it is time to start to look into some slightly more advanced examples of the edge geometry. One thing to look into is what the deal is with this threshold angle argument when calling the edge geometry constructor. It would seem that an edge is only created if the angle between the face normals of the adjoining faces exceeds the given threshold angle. The default value for this angle is one degree but in some situations I might want to set that higher, or lower depending on what I want to do. 

So in this example I am creating two line segments both of which are using edge geometry created from the same sphere geometry constructor. However with one of them I am setting the threshold angle to 10, while the other I am leaving at the default value of 1. In addition to this I am also throwing in a mesh object that is directly using the sphere geometry with the basic material in wire frame mode as another object to compare to.

```js
(function () {
    //-------- ----------
    // Scene, camera renderer
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.75, 2.00, 1.75);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // ADDING LINES AND MESH OBJECTS TO SCENE
    //-------- ----------
    // sphere geometry and...
    const sphereGeo = new THREE.SphereGeometry(0.5, 15, 20);
    // AN EDGE GEOMETRY CREATED FROM IT WITH THRESHOLD ANGLE of 10
    const line1 = new THREE.LineSegments(
            new THREE.EdgesGeometry(sphereGeo, 10),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    line1.position.set(-0.75, 0, 0);
    // SAME EDGE GEOMETRY BUT WITH DEFULT THRESHOLD ANGLE
    const line2 = new THREE.LineSegments(
            new THREE.EdgesGeometry(sphereGeo, 1),
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    line2.position.set(0.75, 0, 0);
    const mesh1 = new THREE.LineSegments(
            sphereGeo,
            new THREE.MeshBasicMaterial({
                color: new THREE.Color('gray'),
                wireframe: true
            }));
    mesh1.position.set(0, 0, -1.75);
    scene.add(line1);
    scene.add(line2);
    scene.add(mesh1);
    //-------- ----------
    // RENDER
    //-------- ----------
    renderer.render(scene, camera);
}
    ());
```

## 3 - Points and a closer look at Edge geometry Compared to Sucre Geometry

In general I will want to use the THREE.Edges Geometry with the THREE.LineSegements constructor However there is one additional constructor that I might also choose to use it with which would be the THREE.Points constructor. As the name suggests this points class is a way to go about display just the points of the position attribute of a geometry. When doing so I am restricted to just one material option which is the PointsMaterial. and when it comes to options for that materials I mainly only have color and size to set for it.

While I am at it in this section I will also be taking a closer look at the attributes of an Edge Geometry and compare it to the source geometry that I am giving it.

### 3.1 - The attributes of Edge Geometry appear to be position only

If I look at the attributes of a raw result from the THREE.SphereGeometry constrictor I have position, normal, and uv attributes with that. These three attributes are the core set of attributes that I would want to have if I am using a geometry with THREE.Mesh. When I pass this raw sphere geometry to the Edges Geometry constructor it would seem that the only attribute that an Edge Geometry has is a position attribute. This would make sense if edge geometry is intended to just be used with constructors such as THREE.LineSegements, or in this section THREE.Points. 

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // EDGE GEOMETRY CREATED FROM SPHERE GEOMETRY
    //-------- ----------
    const sphereGeo = new THREE.SphereGeometry(1, 30, 30);
    const edgeGeo = new THREE.EdgesGeometry(sphereGeo, 10);
    // The source geometry made with the TRHEE.SpgereGeometry constructor has
    // a position, normal, and uv attribute, while edges geometry will just have a 
    // position attribute
    console.log(sphereGeo.attributes); // {position: Nn, normal: Nn, uv: Nn}
    console.log(edgeGeo.attributes)    // {position: Nn}
    // edges geometry might not be good for mesh objects
    // but it is still fine for lines and points
    const points = new THREE.Points(
            edgeGeo,
            new THREE.PointsMaterial({
                color: new THREE.Color('white'),
                size: 0.05
            }));
    scene.add(points);
    //-------- ----------
    // SCENE
    //-------- ----------
    renderer.render(scene, camera);
}());
```

### 3.2 - Point Counts of the position attribute

One thing that I find strange though is that it would seem that the cont of points goes up rather than down depending on the angle threshold that I give as a second argument.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(3, 3, 3);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // EDGE GEOMETRY CREATED FROM SPHERE GEOMETRY
    //-------- ----------
    const sphereGeo = new THREE.SphereGeometry(0.75, 15, 15);
    const edgeGeo1 = new THREE.EdgesGeometry(sphereGeo, 1);
    const edgeGeo2 = new THREE.EdgesGeometry(sphereGeo, 10);
    const edgeGeo3 = new THREE.EdgesGeometry(sphereGeo, 20);
    // checking point counts for each
    console.log( sphereGeo.getAttribute('position').count ); // 256
    console.log( edgeGeo1.getAttribute('position').count ); // 870
    console.log( edgeGeo2.getAttribute('position').count ); // 750
    console.log( edgeGeo3.getAttribute('position').count ); // 150
    // making points for all
    [sphereGeo, edgeGeo1, edgeGeo2, edgeGeo3].forEach( (geo, i, arr) => {
        const points = new THREE.Points(
            geo,
            new THREE.PointsMaterial({
                color: new THREE.Color('white'),
                size: 0.1
            }));
        points.position.x = -3 + 6 * (i / arr.length)
        scene.add(points);
    });
    //-------- ----------
    // SCENE
    //-------- ----------
    renderer.render(scene, camera);
}());
```

## 4 - Creating and example with an animation loop

One way to go about getting a better look at the over all situation of what is going on here would be to move the camera around, or the line segments instance. In any case this will require that I set up some kind of animation loop to update the position, or rotation of the line segments instance or the camera. There are a number of ways to go about doing something like this, but I think that it might be a good idea to make use of the THREE.Clock Constructor along with the use of request animation frame. However this is a topic where I keep finding other ways to go about doing this that might be a little better for one reason or another. I do not want to get into all of that in detail here as doing so is a little off topic.

In this example I took the source code of my basic example of the edges geometry that I coved above in this post and I just added a animation loop at the end of the source code. In the body of the animation loop I call an update function and in the body of that I am just using the rotation property of the line segments instance to rotate the line segments along the y axis.

```js
(function () {
    //-------- ----------
    // SCENE, CAMERA, RENDERER
    //-------- ----------
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    const camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    (document.getElementById('demo') || document.body).appendChild(renderer.domElement);
    //-------- ----------
    // EDGE GEOMETRY CREATED FROM BOX GEOMETRY
    //-------- ----------
    let boxGeo = new THREE.BoxGeometry(1, 1, 1),
    edgeGeo = new THREE.EdgesGeometry(boxGeo),
    line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    scene.add(line);
    //-------- ----------
    // LOOP
    //-------- ----------
    const state = {
        clock: new THREE.Clock(),
        frame: 0,
        maxFrame: 90,
        fps: 12, // capping at 12 fps
        per: 0
    };
    const update = function (state) {
        line.rotation.y = Math.PI * 2 * state.per;
    };
    const loop = function () {
        const wSecs = performance.now() - state.clock.oldTime;
        requestAnimationFrame(loop);
        if (wSecs > 1 / state.fps) {
            let secs = state.clock.getDelta();
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

## Conclusion

So then the use of an instance of an Edges Geometry constructor will result in another way to go about getting something that looks like a kind of wire frame, and if you ask me it looks good. However there are still some draw backs, on of which is that I can not seem to set the line width to anything other than one. Another way to go about having a kind of wire frame type look would be to try to work something out with some textures, but so far I can not say that I have found anything that works as well as I would like it to when it comes to that kind of approach. So I think that maybe the best way to go about getting a kind of wire frame mode with thick lines might be to think in terms of using the cylinder geometry, sphere geometry, and create a collection of mesh objects but maybe getting into that sort of thing would be a matter for a whole other post.


