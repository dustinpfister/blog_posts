---
title: Compute Vertex Normals for Buffer Geometry in threejs
date: 2022-04-22 10:22:00
tags: [three.js]
layout: post
categories: three.js
id: 980
updated: 2022-05-22 12:22:53
version: 1.15
---

The process of creating a [custom buffer geometry](/2021/04/22/threejs-buffer-geometry/), or mutating a built in geometry in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) might be a little involved, but still there is only so much to be aware of to get started. The first step might be to work out the [positions attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) which is the values for the actual points in space. However after that when it is also a good idea to work out what the deal should be with the [normals attribute](/2021/06/08/threejs-buffer-geometry-attributes-normals/). In some cases I might have to work this out manually, however in most cases just calling the compute vertex normals method will work just fine, which is what this post is about today.


<!-- more -->

## The compute vertex normals method and what to know first

This is a post centered around a single method of the [buffer geometry class](https://threejs.org/docs/#api/en/core/BufferGeometry) in the popular javaScript library known as three.js. This is not a post that is a general overview of the buffer geometry class in general, or a [getting started type post with threejs](/2018/04/04/threejs-getting-started/), javaScript and any other additional skills that are needed before hand. So I assume that you have at least a little background when it comes to the core set of skills that are needed in order to gain something of value from reading this.

<iframe class="youtube_video" src="https://www.youtube.com/embed/yApc9lnw53o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### The source code examples in this post are on Github

The source code examples that I write about here in this post can be found in the for post folder of my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-buffer-geometry-compute-vertex-normals). This is also where I am parking the source code for my many other post on threejs, as well as many more draft demos that I also have parked there.

### Version numbers matter with threejs

The version of threejs that I was using when I first wrote this post was r135. I have got myself into the habit of also making sire I write down what version of threejs that I am uisng when writing a post on a threejs example or two. Code breaking changes are made to the library often.

## 1 - Basic compute vertex normals method example

When working with one of the built in geometry constructors the normals are worked out for me as that is part of making a comprehensive geometry constructor function. However when making a custom geometry from the ground up I will of course have to make attribute one way or another. For this basic example of the compute vertex normals method I am then just making a very simple geometry of a single triangle, and then calling the compute vertex normals method of the buffer geometry as a way to go about creating the normals attribute.

```js
(function () {
     // SCENE, CAMERA, RENDERER, and LIGHT
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.5, 1000);
    camera.position.set(2, 2, 2);
    camera.lookAt(0,0,0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(3, 0, 3);
    scene.add(dl);
    scene.add(new THREE.AmbientLight(0xffffff, 0.1));
    // GEOMETRY
    var geometry = new THREE.BufferGeometry();
    var vertices = new Float32Array([
                -1.0, 0.0, 0.0,
                1.5, 0.0, 0.0,
                1.0, 1.0, 0.0
            ]);
    // create position property
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // COMPUTE VERTEX NORMALS FOR THE GEMOERTY
    geometry.computeVertexNormals();
    // MESH with GEOMETRY, and STANDARD MATERIAL
    var custom = new THREE.Mesh(
            geometry,
            new THREE.MeshStandardMaterial({
                color: 0xff0000,
                side: THREE.DoubleSide
            }));
    scene.add(custom);
    // RENDER
    renderer.render(scene, camera);
}
    ());
```

So now that I have a normals attribute with this geometry I can now use a [light source](/2022/02/25/threejs-light/) and see the material when using a material like that of the [standard material](/2021/04/27/threejs-standard-material/) with a light source. Although that might be the case there is still one additional attribute that I will need to add to the geometry in order for this to be a done deal in terms of the core set of attributes that are needed which would be the uv attribute. However for the sake of this post I think I should first cover a few more examples that focus more so on the state of this normals attribute and how to know what the state of it is.

## 2 - The THREE.VertexNormalsHelper

In order to really get an idea of what is going on with the state of the normals array of a geometry it might be best to make use of the THREE.VertexNormalsHelper that can be added to an example by way of one additional javaScript file that can be found in the threejs repository. There is a whole lot to work with when it comes to the core of the threejs library alone, but there are also a number of additional files in to form of helpers, loaders and controls. For this example I am not just making use of the vertex normals helper, but also the [orbit controls](/2018/04/13/threejs-orbit-controls/) that can also be added by way of an additional javaScript file as well.

Here I have two plane geometries both of what I am mutating over time in the same way, but with one I am calling the compute vertex normals method and with the other I am not. On top of that I am also using the vertex normals helper to show what the deal is with the state of the normals for each geometry. It is also possible to see that there is indeed a clear differences with the textures.

```js
// SCENE, LIGHT, CAMERA, RENDERER, and CONTROLS
var scene = new THREE.Scene();
var light = new THREE.PointLight(0xffffff, 1);
light.position.set(7, 3, 0);
scene.add(light);
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
camera.add(light);
scene.add(camera);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
var controls = new THREE.OrbitControls(camera, renderer.domElement);
document.getElementById('demo').appendChild(renderer.domElement);
// ADJUST PLANE POINT HELPER
var adjustPlanePoint = function (geo, vertIndex, yAdjust) {
    // get position and normal
    var position = geo.getAttribute('position');
    var normal = geo.getAttribute('normal');
    var i = vertIndex * 3;
    // ADJUSTING POSITION ( Y Only for now )
    position.array[i + 1] = yAdjust;
    position.needsUpdate = true;
};
// update a geo
var updatePlaneGeo = function(geo, bias, computeNormals){
    computeNormals = computeNormals || false;
    adjustPlanePoint(geo, 0, 0 + 0.75 * bias);
    adjustPlanePoint(geo, 1, 0.75 - 1.00 * bias);
    adjustPlanePoint(geo, 2, 0.1);
    adjustPlanePoint(geo, 8, -0.4 * bias);
    // ADJUSTING NORMALS USING computeVertexNormals method
    if(computeNormals){
        geo.computeVertexNormals();
    }
};
// create a data texture
var createDataTexture = function (pr, pg, pb) {
    // USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
    // Using the seeded random method of the MathUtils object
    var width = 16,
    height = 16;
    var size = width * height;
    var data = new Uint8Array(4 * size);
    for (let i = 0; i < size; i++) {
        var stride = i * 4;
        var v = Math.floor(THREE.MathUtils.seededRandom() * 255);
        data[stride] = v * pr;
        data[stride + 1] = v * pg;
        data[stride + 2] = v * pb;
        data[stride + 3] = 255;
    }
    var texture = new THREE.DataTexture(data, width, height);
    texture.needsUpdate = true;
    return texture;
};
// MESH
var geo1 = new THREE.PlaneGeometry(1, 1, 2, 2);
geo1.rotateX(Math.PI * 1.5);
var plane1 = new THREE.Mesh(
        geo1,
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: createDataTexture(0,1,0),
            side: THREE.DoubleSide
        }));
scene.add(plane1);
var geo2 = new THREE.PlaneGeometry(1, 1, 2, 2);
geo2.rotateX(Math.PI * 1.5);
var plane2 = new THREE.Mesh(
        geo2,
        new THREE.MeshStandardMaterial({
            color: 0xffffff,
            map: createDataTexture(0,1,1),
            side: THREE.DoubleSide
        }));
plane2.position.x = -1.1;
scene.add(plane2);
// USING THE THREE.VertexNormalsHelper method
const helper1 = new THREE.VertexNormalsHelper(plane1, 2, 0x00ff00, 1);
scene.add(helper1);
const helper2 = new THREE.VertexNormalsHelper(plane2, 2, 0x00ffff, 1);
scene.add(helper2);
// LOOP
var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0
};
var update = function (secs, per, bias, state) {
    updatePlaneGeo(geo1, bias, true);
    updatePlaneGeo(geo2, bias, false);
    helper1.update();
};
var loop = function () {
    var now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    state.per = state.frame / state.maxFrame;
    state.bias = 1 - Math.abs(state.per - 0.5) / 0.5;
    update(secs, state.per, state.bias, state);
    renderer.render(scene, camera);
    state.frame += 4 * secs;
    state.frame %= state.maxFrame;
    lt = now;
};
loop();
```

This is a hacked over source code example of what I worked out for my [threejs example on mutation of plane geometry](/2021/06/11/threejs-examples-plane-mutate/) that I will likely comes back to at some point again. There are a lot of other threejs features as well as client side javaScript features that I am making use of in this example that I should also write about for a sec here as well. When it comes to creating a quick texture with javaScript code I am making use of a [data texture](/2022/04/15/threejs-data-texture/) to do so, which is one of several options for doing so on top of other options like making use of [canvas textures](/2018/04/17/threejs-canvas-texture/).

## Conclusion

The compute vertex normals method will work just fine for most cases as a way to create, or update the normals attribute of a buffer geometry instance. However there are some cases in which I might need to manually edit these values also, so I can not just call this method and be done with it all the time.

The general though process that I have when making a geometry is that first I need to just work out the positions attribute, then I need to get the normals attribute working as it should. However there is then the question of what the next step is after the positions and normals attribute are looking good. With that said I would say that the next thing I would want to figure out would be the [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) which is important when it comes to working out what the offsets of textures should be. There are some additional things after that as well though such as what the deal should be when it comes to [groups, and material index values](/2018/05/14/threejs-mesh-material-index/) when using an array of materials to skin a mesh object rather than juts one.