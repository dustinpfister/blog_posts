---
title: Mutating a point in the geometry created with the plane geometry constrictor with threejs
date: 2021-06-11 13:32:00
tags: [three.js]
layout: post
categories: three.js
id: 887
updated: 2022-04-21 12:02:37
version: 1.30
---

There is still a great deal more to learn when it comes to the [buffer geometry](https://threejs.org/docs/#api/en/core/BufferGeometry) class in [threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), not just with the various prototype methods of the class, but also playing around with the various attributes when it comes to learning how to go about making custom geometry. When making a custom geometry there are a few attributes to be aware of, but the first and foremost attribute that comes to mind for me at least would be the positions attribute.

So in this post I will be going over the current state of a [threejs example](/2021/02/19/threejs-examples/) where I am just mutating the position attribute of a plane geometry as a way to start to learn how to mess around with the values of a simple starting geometry in threejs. I do not aim to do anything to advanced here because I have found that there is a lot to be aware of when it comes to just moving a single point in a geometry, as it is often not just a mater of changing the position of a single vertex and one might assume. In some cases I have to move a few points actually, and also I have found that I run into problems with lighting that will require adjusting values in the normal attribute of the buffer geometry instance as well.

<!-- more -->

## Mutating the positions of a plane geometry and what to know first

This is a post that has to do with changing the values of the position attribute in a plane geometry in the javaScript library know as threejs. So then this is a somewhat advanced post that has to do with a subject that one might get around to after logging a fair about of time [learning the basics of the library first](/2018/04/04/threejs-getting-started/). What I mean by that is after working out a simple hello world style rotating cube type example there is the question of what comes to mind when it comes to getting into advanced topics with threejs. There is no single answer to that kind of question but one answer might be to look into the buffer geometry class more which is what this post is about.

I assume that you have at least some background with threejs, and client side javaScript alone at this point. I will not be getting into every little detail about what you show know before hand here then. However I do often use this first section as a place to outline some things that you might want to read up more on before constituting to read the rest of the post.

### Read up more on the THREE.PlaneGeometry constructor in general

In this post I am just playing around with the position attribute of a geometry created with the [THREE.PlaneGeometry constructor which might be worth checking out](/2019/06/05/threejs-plane/) in general. The plane geometry constructor is a good starting place to learn how to do all kinds of things with a geometry as it is a fairly simple kind of geometry. However there is still a lot to be aware of when it comes to things like the [group array, and material index values](/2018/05/14/threejs-mesh-material-index/) when using an array of materials for example.

### Read up more on buffer geometry in general

Before getting into working on examples like this it might also be a good idea to read up more on the [buffer geometry](/2021/04/22/threejs-buffer-geometry/) class in general as there are a lot to be aware of with this one. Also it is important to know the differences between the [position](/2021/06/07/threejs-buffer-geometry-attributes-position/), [normal](/2021/06/08/threejs-buffer-geometry-attributes-normals/), and [uv](/2021/06/09/threejs-buffer-geometry-attributes-uv/) attributes of a geometry. When it comes to the subject of this post it would be the position, and normal attributes that will be the most important to learn the basic of first.

### Version Numbers matter

When I first made this threejs example I was using threejs r127 which as a late version as of early 2021. The last time I came around to do a little editing with this post I found that the example is also working fine with r135 of threejs. However changes are made to the public API of threejs all the time that can lead to code breaking changes, so always be mindful of what version of threejs you are using on your end.

### The source code examples in this post are also on Github

The source code examples of this post can be found in [my test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-plane-mutate).

## 1 - The plane mutation example as it currently stands

So then here is the source code of my plane geometry mutation threejs example as it was when I first started this post. For a better revision of this example you might want to skip over to the next section, as for now I am keeping this here for the sake of just writing about what the first steps with this where. The idea that I had in mind here is to just work out a module, or even just a single method that I can use to just adjust the y position of a given vertex in the plane geometry just for the sake of starting out with something very simple with this. 

I have this adjust plane point helper method then, and in the body of the function I am getting a reference to the position property of a geometry that I pass to it as the first argument. This function then adjusts the y value of a given vertex index to a given y value, and then sets the needs update boolean of the position attribute. That alone will of course change the position of a given vertex, however there is more to it than just that. If I use a material like the normal material or any material that will respond to light things will not look just right, and the main reason why that would be is because I just changed position values and did not change anything when it comes to the normal attribute values.

As of this writing I am just changing the direction of the corresponding normal value, but just to a value that is pointing in a single fixed direction. The next step that I might want to get to with this example when and if I get to it would be to take a better look at what is going on with the normal values, and see about working out a way to adjust those to the way that they should be also for the given state if a position attribute array.


```js
// SCENE, LIGHT, CAMERA, RENDERER, and CONTROLS
var scene = new THREE.Scene();
var light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(3, 3, 3);
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
// ADJUST PLANE POINT HELPER
var adjustPlanePoint = function (geo, vertIndex, yAdjust) {
    // get position and normal
    var position = geo.getAttribute('position');
    var normal = geo.getAttribute('normal');
    var i = vertIndex * 3;
    // ADJUSTING POSITION ( Y Only for now )
    position.array[i + 1] = yAdjust;
    position.needsUpdate = true;
    // ADJUSTING NORMAL
    var v = new THREE.Vector3(1, 1, 1).normalize();
    normal.array[i] = v.x;
    normal.array[i + 1] = v.y;
    normal.array[i + 2] = v.z;
    normal.needsUpdate = true;
};
// MESH
var geo = new THREE.PlaneGeometry(1, 1, 2, 2);
geo.rotateX(Math.PI * 1.5);
var plane = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({
            color: 0xffffff
        }));
scene.add(plane);
// LOOP
var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0
};
var update = function (secs, per, bias, state) {
    adjustPlanePoint(geo, 1, 0.75 - 1.00 * bias);
    adjustPlanePoint(geo, 0, 0 + 0.75 * bias);
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

This example is working okay at least thus far when it comes to a simple plane geometry mutation type example, however there is a bit more work to do on this one when and if I can get around to it. I am in a good place thus far when it comes to adjusting the position values at least, however I will want to see if I can work out something when it comes to setting the normal values also. 

There is also the question of the uv attribute also, which I may or may not want to adjust also when it comes to this sort of thing. That attribute has to do with offsets when it comes to using a texture, and when it comes to that the default values that are created with the plane geometry constructor might still work okay for the direction I want to go with this.

## 2 - The new and improved revision that uses compute vertex normals, the vertex normals helper, and data textures.

When I came around to edit this post in April of 2022 I made a number of improvements that needed to happen with this. Maybe the best change at this point was the choice to use the compute vertex normals method of the instance of the buffer geometry after changing the positions attribute values. In the older revision of this example I was thinking in terms of having to manual update the values of the normal attribute, and although in some cases I might have to do that, as far as this example is concerned that is not called for it would seem. Still there is the question of knowing what the current state is of the normals attribute of a buffer geometry and with that said that is another change that I made with this when it comes to making use of the [THREE.VertexNormalsHelper constructor](https://threejs.org/docs/#examples/en/helpers/VertexNormalsHelper).

The THREE.VertexNormalsHelper is another example of something in threejs that might not be built into the core of threejs itself, but can be added by way of an additional file on top of that of threejs itself. In other words this is another external file that I am using on top of threejs in addition to the orbit controls that I am all ready using, so that is three javaScript files now not including the additional code in my main javaScript file.

```js
// SCENE, LIGHT, CAMERA, RENDERER, and CONTROLS
var scene = new THREE.Scene();
var light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 3, 0);
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
// ADJUST PLANE POINT HELPER
var adjustPlanePoint = function (geo, vertIndex, yAdjust) {
    // get position and normal
    var position = geo.getAttribute('position');
    var normal = geo.getAttribute('normal');
    var i = vertIndex * 3;
    // ADJUSTING POSITION ( Y Only for now )
    position.array[i + 1] = yAdjust;
    position.needsUpdate = true;
    // ADJUSTING NORMALS USING computeVertexNormals method
    geo.computeVertexNormals();
};
// MESH
var geo = new THREE.PlaneGeometry(1, 1, 2, 2);
geo.rotateX(Math.PI * 1.5);
document.getElementById('demo').appendChild(renderer.domElement);
// USING THREE DATA TEXTURE To CREATE A RAW DATA TEXTURE
// Using the seeded random method of the MathUtils object
var width = 16, height = 16;
var size = width * height;
var data = new Uint8Array( 4 * size );
for ( let i = 0; i < size; i ++ ) {
    var stride = i * 4;
    var v = Math.floor( THREE.MathUtils.seededRandom() * 255 );
    data[ stride ] = v;
    data[ stride + 1 ] = v;
    data[ stride + 2 ] = v;
    data[ stride + 3 ] = 255;
}
var texture = new THREE.DataTexture( data, width, height );
texture.needsUpdate = true;
var plane = new THREE.Mesh(
        geo,
        new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture }));
scene.add(plane);
// USING THE THREE.VertexNormalsHelper method
const helper = new THREE.VertexNormalsHelper( plane, 2, 0x00ff00, 1 );
scene.add(helper);
// LOOP
var lt = new Date(),
state = {
    frame: 0,
    maxFrame: 90,
    per: 0,
    bias: 0
};
var update = function (secs, per, bias, state) {
    adjustPlanePoint(geo, 1, 0.75 - 1.00 * bias);
    adjustPlanePoint(geo, 0, 0 + 0.75 * bias);
    helper.update();
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

So on top of the use of the compute vertex normals method, and the additional helper that shows what the current state of the normals array is another change that I made at this point was to add a texture for the color map of the material that I am using for the mesh object. There are a number of ways to create textures with a little javaScript code in threejs, often I like to go with the [canvas texture constructor](/2018/04/17/threejs-canvas-texture/) as a way to create textures using canvas elements and the 2d drawing context. However another option to work with when it comes to this sort of thing would be [data textures](/2022/04/15/threejs-data-texture/) which is what I have when with here.

When it comes to making the texture that is used for the plane geometry I am also making use of another note worthy method in the core of the threejs library which is the [seeded random method of the math utils object](/2022/04/11/threejs-math-utils/).

## Conclusion

I will have to come back to this example sooner or later when it comes to working on getting a better grasp on the various things to be aware of when mutating the position attribute of a buffer geometry class. A plane geometry created with the built in THREE.PlaneGeometry constructor just strikes me as a good starting point when it comes to starting to learn the basics of this sort of thing. 

It would be nice if I could just move a single point and be done with it, however the process is not always just that simple it would seem. In some cases I will not just want to just change the position of a vertex, but the position of a few vertices, and also there is updating the values of the normals also so that light will look the way that it should with the new position values.

