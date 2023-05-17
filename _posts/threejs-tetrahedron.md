---
title: Pyramid AKA Tetrahedron Geometry in threejs.
date: 2022-12-02 08:23:00
tags: [three.js]
layout: post
categories: three.js
id: 1016
updated: 2023-05-17 08:30:15
version: 1.11
---

When looking into the built in Geometry Classes in [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) for the first time there are a few that can be used to make a Pyramid Type Geometry. Both the Cone Geometry, and the Cylinder Geometry classes can be used to do so if one gives a certain set of arguments when calling them. There is however also a built in Tetrahedron Geometry Class that can also be used to do this bu just simply calling it and giving a radius that will also result in a Pyramid shape as well. However one might run into some problems with this sort of thing when it comes to rotation of the result, and there are also a few additional reasons why one might want to make some kind of custom geometry for this sort of thing as well. So in this post I will be writing about this built in Tetrahedron Geometry Class, but also an array of alternative ways to create this kind of geometry including some custom ways to do so while I am at it.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/2-B_dzUrN8w" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Tetrahedron Geometry class and what to know first

This is a post on using the Tetrahedron Geometry class, other built in Geometry classes, as well as some custom ways to create a Pyramid Geometry in threejs. This is not a [getting started type post on threejs](/2018/04/04/threejs-getting-started/), or client side javaScript in general. Also it would be best to look elsewhere when it comes to [formal math that has to do with things like what a Regular Tetrahedron is compared to other possibility's](https://en.wikipedia.org/wiki/Tetrahedron) with this sort of shape, or maybe I should say [Polyhedron](https://en.wikipedia.org/wiki/Polyhedron) for that matter.

### Read More on Buffer Geometry

You might want to read more on [buffer geometry in general](/2021/04/22/threejs-buffer-geometry/) while you are at it. There are a whole lot of other options when it comes to built in functions for quickly creating geometry by just calling a function and passing some arguments. However there is also looking into how to go about making a custom geometry from the ground up with a little javaScript code as well.

### Source Code is on Github

The source code exmaples that I am writing about in this post can also be [found in my test threejs reposatory](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-tetrahedron).


### Version Numbers matter

When I first wrote this post I was using r146 of threejs.


## 1 - Some basic Pyramid Geometry examples

For this first section I will be starting out with some simple project examples where I create Pyramid Geometry in several kinds of ways. There is using the Tetrahedron Geometry class to do so, however in some cases it might be better to use the cone of cylinder geometry to make this kind of geometry quickly and move on actually. The Tetrahedron Geometry class works okay, but one thing that I have found is that it is hard to quickly change what the front side of the geometry is using the rotate methods of the buffer geometry class which is not a problem that I have using the Cone geometry class. Still I will be writing about each of the options here when it comes to the built in classes are and write a thing or two about the pros and cons.

### 1.1 - Using the Tetrahedron Geometry Class to create a Pyramid

The [Tetrahedron Geometry Class](https://threejs.org/docs/index.html#api/en/geometries/TetrahedronGeometry) can be used to create a Pyramid Geometry by just calling the constructor, passing a radius as the first argument and that is all. There is then a second argument that can be used to increase the number of points in the geometry which turns it into another way to create a kind of geometry that starts to end up looking like a kind of sphere if you give a value high enough for it. Anyway for the most part this gets the job done just fine, but one thing that I have ran into is that there are no arguments for setting the starting rotation of the geometry. This can be fixed by making use of the rotation methods of the buffer geometry class but thus far I have not found any quick clean values for doing so like what I have figured out with the other options for doing so.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// Tetrahedron Geometry
// ---------- ----------
const geo = new THREE.TetrahedronGeometry(1, 0);
const mesh_material = new THREE.MeshNormalMaterial();
const mesh = new THREE.Mesh(geo, mesh_material);
scene.add(mesh);
scene.add(new THREE.GridHelper(10, 10));
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(3.25, 2.25, 3).normalize().multiplyScalar(2);
camera.lookAt(mesh.position);
renderer.render(scene, camera);
```

There is also having an interest with this kind of Geometry Class for reasons that might have to do with the nature of the geometry in terms of things like what a Regular Tetrahedron is compared to other terms. That is to have some kind of geometry class where I have just 4 indexed points in the geometry and have a way to quickly change the nature of these four points to create other kinds of Tetrahedrons beyond that of just a Regular Tetrahedron. Again this class falls short when it comes to that sort of thing as the geometry is not indexed and has 12 points in the position attribute and there is no way to create a Tetrahedron other than a Regular one. However I think I understand some reasons why, but getting into all of that will of course be a matter for a more advanced section in this post.

### 1.2 - Using the Cone Geometry Class to create a Pyramid

If I just care about how things look, and do not care at all about things like the state of the index property of the buffer geometry, number of points in the position attribute, or anything that might prove to be a little technical, then my first go to solution for this sort of thing might actually be the [Cone Geometry](/2019/07/31/threejs-cone/) class. If I give the proper arguments I can end up with a Tetrahedron shape that also might be more or less Regular. Also because this works by giving a radius for the base, and then a length, this naturally allows for Tetrahedrons other than that of a Regular kind.

Another thing that I really kind about this one is that I can quickly rotate the cone in such a way that the front side of the geometry will point in the direction that I want when using the [object3d look at method](/2021/05/13/threejs-object3d-lookat/). That is that by default if I call the look at method the point of the cone will not face that direction, but this is easily fixed with a single call of the rotateX method.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// Cone Geometry set up to result in a kind of Tetrahedron
// ---------- ----------
const geo = new THREE.ConeGeometry(0.75, 1, 3, 1, true);
geo.rotateX(Math.PI * 0.5);
// ---------- ----------
// OBJECTS
// ---------- ----------
const mesh_material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
});
const mesh = new THREE.Mesh(geo, mesh_material);
scene.add(mesh);
const points = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.25
}));
mesh.add(points);
mesh.position.set(0, 0, 0);
mesh.lookAt(10, 0, 0);
scene.add(new THREE.GridHelper(10, 10));
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
// loop
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

### 1.3 - Using the Cylinder Geometry Class to create a Pyramid

The [Cylinder Geometry](/2022/08/12/threejs-cylinder-geometry/) is yet another option for quickly making a Pyramid like shape. The first two arguments control the radius of the top and bottom caps of the geometry. So then by setting one of them to 0, and the other to a desired radius for the bottom of the Pyramid I can end up with a shape that is just like what I would get with the Cone Geometry. Also just like with the cone geometry I can set the values for additional arguments that have to do with the number of radial and length sections which will again  result in a kind of Pyramid like shape.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CYlinder Geometry set up to result in a kind of Tetrahedron
// ---------- ----------
const geo = new THREE.CylinderGeometry(0, 1, 2, 3, 1, true);
geo.rotateX(Math.PI * 0.5);
// ---------- ----------
// MESH AND POINTS
// ---------- ----------
const mesh_material = new THREE.MeshNormalMaterial({
    side: THREE.DoubleSide
});
const mesh = new THREE.Mesh(geo, mesh_material);
scene.add(mesh);
const points = new THREE.Points(geo, new THREE.PointsMaterial({
    size: 0.25
}));
mesh.add(points);
mesh.position.set(0, 0, 0);
mesh.lookAt(10, 0, 0);
scene.add(new THREE.GridHelper(10, 10));
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

## 2 - Tetrahedron Geometry and the position attribute

Now that I have the basic section out of the way it is time to get into some not so basic examples then. In this section I am working out some code that has to do with some subjects that have to do with the nature of the position attribute of the Tetrahedron Geometry class. If you do not know what the position attribute is then it would be a very good idea to [read by post on the position attribute in general](/2021/06/07/threejs-buffer-geometry-attributes-position/). However if you want me to save you a click real quick it is the attribite of a buffer geometry that has to do with the actual points in space, rather than the directions of the vector normals, the offset values that have to do with uv mapping, of any other kinds of geometry attribute that one might run into when leaning a thing or two about buffer geometry in threejs.

### 2.1 - The count of points is 12 rather than 4 because it is NOT indexed

A tetrahedron is formally defined as a polyhedron composed of four triangular faces, six straight edges, and *four vertex corners*. So then one might expect that the count of the position attribute would be 4. but it is 12. Also I have found that many of the built in geometry classes have an index, with some exceptions, and the Tetrahedron Geometry is one of them as the value of the index property of the geometry is null. I think that I can understand why this is though, and it might have to do not so much with the position attribute, but rather the normal attribute. I could create an index as well as a custom position attribute that has 4 points, which is exactly what I am doing for this example actually. However by doing so I also restrict the usable size of the normal attribute to just four points which will result in a not so desired outcome for the look of the geometry when using the normal mesh material, or just about any mesh material for that matter actually with maybe just a few exceptions where the state of the normal attribute is not of dire concern apart form just knowing what side the front side is.

Anyway the goal with this example was to not so much care about the look, but rather to have a geometry with 4 points, and only 4 points in the position attribute and to create an index for them.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// CHECKING OUT THE POSITION ATTRIBUTE
// ---------- ----------
const geo = new THREE.TetrahedronGeometry(1, 0);
// getting position attribute
const pos = geo.getAttribute('position');
// it has a count of 12 becuase it is not indexed
console.log(pos.count); // 12 ?!
console.log(geo.index); // null
// ---------- ----------
// NEW GEOMETRY WITH A POS COUNT OF 4, WITH INDEX
// ---------- ----------
const geo2 = new THREE.BufferGeometry();
const posB = new THREE.BufferAttribute(pos.array.slice(0, 4 * 3), 3);
geo2.setAttribute('position', posB);
// making an index for it
const data = new Uint8Array([1, 2, 0, 3, 1, 0, 2, 3, 0, 1, 3, 2]);
const index = new THREE.BufferAttribute(data, 1)
    geo2.setIndex(index);
geo2.computeVertexNormals();
console.log(geo2.getAttribute('position').count); // 4
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
mesh1.position.set(-2, 0, 0);
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geo2, new THREE.MeshNormalMaterial());
scene.add(mesh2);
// vertex helpers
scene.add(new THREE.VertexNormalsHelper(mesh1));
scene.add(new THREE.VertexNormalsHelper(mesh2));
scene.add(new THREE.GridHelper(10, 10));
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 3, 5);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

### 2.2 - Regular Tetrahedron test using Vector3 distance to method

If I start to do a deep dive into this sort of thing I am going to want to have a helper method that will return true of the given geometry fits the strict formal definition of a Regular Tetrahedron otherwise return false. So in this example I made that kind of function by making use of the vector3 distance to method to find out of the length of all the edges equal each other. before it even gets to that point though it will check of the count of the position attribute of 4 and return false for that as well. I might need to refine this sort of thing a little moving forward, but the crude idea thus far seems to work.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// create 4 count helper
const create4Count = (radius) => {
    const geo_source = new THREE.TetrahedronGeometry(radius === undefined ? 1 : radius, 0);
    const pos = geo_source.getAttribute('position');
    const geo = new THREE.BufferGeometry();
    const posB = new THREE.BufferAttribute(pos.array.slice(0, 4 * 3), 3);
    geo.setAttribute('position', posB);
    const data = new Uint8Array([1, 2, 0, 3, 1, 0, 2, 3, 0, 1, 3, 2]);
    const index = new THREE.BufferAttribute(data, 1);
    geo.setIndex(index);
    geo.computeVertexNormals();
    return geo;
}
// test helper
const testTetrahedron = (geo) => {
    const pos = geo.getAttribute('position');
    // if count is not 4 then false
    if (pos.count != 4) {
        return false;
    }
    let i_p = 0;
    // check lengths of all edges
    const points = [];
    while (i_p < pos.count) {
        points.push(new THREE.Vector3(pos.getX(i_p), pos.getY(i_p), pos.getZ(i_p)))
        i_p += 1;
    }
    let point_indices = [[0, 1], [1, 2], [2, 3], [3, 1], [0, 2], [0, 3]];
    let n;
    let i2 = 0;
    while (i2 < point_indices.length) {
        const a = point_indices[i2]
            const d = points[a[0]].distanceTo(points[a[1]]);
        if (n === undefined) {
            n = d;
        } else {
            if (d != n) {
                // return false if any edge does not equal another
                return false;
            }
        }
        i2 += 1;
    }
    // if we make it this far, then true
    return true;
};
// ---------- ----------
// CUSTOM GEOMETRY MADE FROM THREE.TetrahedronGeometry
// ---------- ----------
const geo = create4Count(2);
console.log(testTetrahedron(geo)); // true
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, new THREE.MeshNormalMaterial());
scene.add(mesh1);
scene.add(new THREE.GridHelper(10, 10));
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(1, 2, 3);
camera.lookAt(0, 0, 0);
const loop = () => {
    requestAnimationFrame(loop);
    renderer.render(scene, camera);
};
loop();
```

## 3 - Animation loop example

I would like to make at least one of not more animation loop examples for this blog post. For this loop example I just made a Tetrahedron Geometry rotate around inside a sphere and that is about it just for the sake of having a place holder for this sort of thing. One thing that I did for this example though is come up with a style that is like that of the geometry browser used in the threejs docs website. In the source code of the geometry browser I have found that it is not just a mesh object, but rather a group that contains a mesh object and a line segments object as children of the group. This allows for using a mesh material as well as a line material which can then be used to highlight the faces of the geometry nicely.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = THREE.WebGL1Renderer ? new THREE.WebGL1Renderer() : new THREE.WebGLRenderer;
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
const appendLine = (mesh, color, lw, opacity) => {
    const line_material = new THREE.LineBasicMaterial({
            color: color || 0xffffff,
            linewidth: lw === undefined ? 6 : lw,
            transparent: true,
            opacity: opacity === undefined ? 1 : opacity
        });
    const line = new THREE.LineSegments(mesh.geometry, line_material);
    mesh.add(line)
};
// ---------- ----------
// Tetrahedron Geometry
// ---------- ----------
const geo = new THREE.TetrahedronGeometry(3, 0);
// ---------- ----------
// MESH
// ---------- ----------
const mesh_material1 = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        flatShading: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.50
    });
const mesh_material2 = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        flatShading: true,
        transparent: true,
        opacity: 0.25
    });
const mesh = new THREE.Mesh(geo, mesh_material1);
scene.add(mesh);
appendLine(mesh);
// sphere mesh
const mesh_sphere = new THREE.Mesh(new THREE.SphereGeometry(3.0, 30, 30), mesh_material2);
scene.add(mesh_sphere);
appendLine(mesh_sphere, 0xffffff, 3, 0.2);
scene.add(new THREE.GridHelper(10, 10));
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1.0);
dl.position.set(3, 1, 2);
scene.add(dl);
const al = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(al);
// ---------- ----------
// CONTROLS
// ---------- ----------
const controls = new THREE.OrbitControls(camera, renderer.domElement);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30; // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 800;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function (frame, frameMax) {
    const a1 = frame / frameMax;
    mesh.rotation.y = Math.PI * 2 * a1;
    mesh.rotation.z = Math.PI * 4 * a1;
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / FPS_UPDATE) {
        // update, render
        update(Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

## Conclusion

So there are a number of ways to make a Pyramid like geometry using the built in geometry classes. Just about all of them will work fine if I am in a situation in which I just care about how things look. However if I care about things like the state of the position attribute or a wide range of other factors I might need to write some custom JavaScript code for this sort of thing actually.


