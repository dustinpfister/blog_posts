---
title: Points in threejs
date: 2023-02-23 08:44:00
tags: [three.js]
layout: post
categories: three.js
id: 1029
updated: 2023-07-06 10:07:41
version: 1.11
---

When it comes to adding content to a scene for the most part one will want to make use of Mesh objects, and with that geometry and materials that work well with such objects. However when it comes to first starting out learning how to make custom geometry, and for other various reasons one might want to make use of an alternative such as [THREE.Points](https://threejs.org/docs/#api/en/objects/Points). The THREE.Points class is a way to create a content object that will work well with a geometry that might just have a position attribute and nothing else. 

The [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) is the first and foremost attribute that one will want to work out when making a custom geometry as it is the actual points in space. So often I might start out using THREE.Points when making a custom geometry as the first steps is just figuring out the position and order of the points in space. Once I have the position attribute worked out well I can then move on to working out the various other attributes that will get the geometry to work well with Mesh Objects.

There are a number of other reasons why one might want to use the THREE.Points class. One thing that I find myself using it for all the time is to get a visual idea of what is going on with the state of a Curve Path for example. In any case in this post I will be writing about a general overview of the THREE.Points class, and while I am at it write about a lot of other things that will come up in the process such as position attributes of buffer geometry objects.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/TKm7mpvuj4I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The THREE.Points class and what to know first

This is a blog post on the THREE.Points class and a whole bunch of related topics in the javaScript library known as threejs. There is a whole lot more that you should know before hand before reading a post such as this that have the do with the basics of threejs, and also client side javaScript in general. I will of course not be getting into detail about what all of this is here in this post, as with any or my other posts on threejs. I have all ready wrote blog posts on [getting started with threejs](/2018/04/04/threejs-getting-started/) and [javaScript in general](/2018/11/27/js-getting-started/) a long time ago that I do get around to edit now and then so you can check those out if you are still very new. I will however take a moment to wrote about a few things that you might want to get solid before reading this post though.

### Read more on Buffer Geometry

The THREE.Points class is a great way to get started with making custom [buffer geometry objects](/2021/04/22/threejs-buffer-geometry/), the class of which one might want to read a whole lot more about. I say that because when it comes to making a custom geometry work well with THREE.Mesh there is not just working out a position attribute, but also [normals](/2021/06/08/threejs-buffer-geometry-attributes-normals), and [uv attribute](/2021/06/09/threejs-buffer-geometry-attributes-uv/) as well in order to get everything looking okay when it just comes to a simple static model. 

However when it comes to THREE.Points it is just the position attribute alone that is of interest which does help to simply things. Again if I just want to work out a simple static model that will work okay with THREE.Points at least. There are additional attributes that I might want to add on top of these such as a color attribute, and also there is still getting into morph attributes with these kinds of geometry objects when it comes to looking into how to animate things.

### Source Code examples are up on Github

The source code exmaples that I write about in this post can be found in the [corresponding for post folder](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-points) in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs). This is also where I park the source code for my [many other blog posts](/categories/three-js/) that I have wrote thus far as well. On top of the latest revisions of the examples that might in some cases be newer then what I have here I also have notes and todo lists for any future edits on this post. With that said if you think something needs to change or be added in a post such as that and you are on Github that would be a good place to make a pull request.

### Version Numbers matter

When I first wrote this blog post I was using [r146 of threejs](https://github.com/dustinpfister/test_threejs/blob/master/views/demos/r146/README.md) and I am using three.min.js rather than three.module.js. There is a lot that will be changing up ahead when it comes to future revisions of threejs, also if you are all ready using JSM over old script tags these examples will not work all ready. Because threejs is a fast moving project where things are always being removed or changed it is a very good idea to always be mindful of what revision of threejs is being used and how when studying source code examples on the open web.

## 1 - Some basic examples of THREE.Points

To start out this post in this section I will be getting a few basic examples out of the way. The general idea here with THREE.Points is very similar to that of THREE.Mesh in that I need to create a geometry, and then pass that geometry as the first argument when calling the THREE.Points constructor function. However when it comes to passing a material as the second argument I can not make use of any of the materials that are made for mesh objects. Aside from that once I have a points objects I can add that object to my main scene object, just like that of any other Object3d class based object.

### 1.1 - Just using a THREE.BoxGeometry

Just like with all my other posts on threejs I have to start somewhere, and for this basic example of the THREE.Points class I will be starting out with a very basic hello world type example of THREE.Points. Just like with any other threejs example I need to start out with a scene object, camera, and renderer. Once I have the usual set of objects I can then create a THREE.Points object and add that to the scene. When it comes to doing so I need a geometry and for this first example I am just making a box geometry wit the built in THREE.BoxGeometry constructor and passing that as the first argument when calling THREE.Points.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// OBJECTS
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2);
const points = new THREE.Points(geo);
scene.add(points);
scene.add( new THREE.GridHelper( 10,10 ) );
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(2, 2, 4);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

After I create my Points object and add that to the scene I then position my camera and call the render method of the webgl renderer passing the scene object, and the camera to render the current state of this scene. The end result is then eight points in the canvas, or at least that is what it looks like anyway, in reality it is much more when it comes to the state of the position attribute. More on this in this section as I at least touch base on the position attribute of buffer geometry objects, and I think I should also have a more advnaced section in this post on this subject as well.

### 1.2 - Using a Plane Geometry and Edges Geometry

For this next basic demo I will be making use of a PlaneGeometry, and also demo what happens when using Edge Geometry to create a another geometry from the plane geometry. This time I am adjusting the size of the plane geometry to 10 by 10, but I am also passing 10 by 10 when it comes to the segments as well which results in a kind of grid like layout compared to the default values for the number of segments that are 1 by 1. However I am making two points objects in this demo one of which makes use of the plane geometry alone, and another that makes use of an edge geometry created from that plane geometry.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo_plane = new THREE.PlaneGeometry(10, 10, 10, 10);
geo_plane.rotateX(Math.PI * 1.5);
const geo_edges = new THREE.EdgesGeometry(geo_plane);
// ---------- ----------
// OBJECTS
// ---------- ----------
const points_plane = new THREE.Points(geo_plane);
points_plane.position.y = -3;
scene.add(points_plane);
const points_edges = new THREE.Points(geo_edges);
points_edges.position.y = 3;
scene.add(points_edges);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 1.3 - The Points Material

One of the draw backs with using THREE.Points is that I can not use the various mesh materials as this is a Points object rather than a Mesh object. When it comes to material options with points there is just one option which is the [THREE.PointsMaterial](/2018/05/12/threejs-points-material/). As with any material there is knowing what there is to work with when it comes to the [base material class](https://threejs.org/docs/#api/en/materials/Material) such as the [transparent and opacity options](/2021/04/21/threejs-materials-transparent/). 

There are a few options on top of the base material class when it comes to what the Points Material adds on top of it. For the most part the two main options of interest are size and color. With that said in this demo I am just creating two materials, one of which I am setting the color to red, and also setting some values for opacity as well. The other material I am setting to a lime color, with a smaller size. I am then creating two points objects that make use of two geometries for the sake of comparison.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo_plane = new THREE.PlaneGeometry(10, 10, 10, 10);
geo_plane.rotateX(Math.PI * 1.5);
const geo_edges = new THREE.EdgesGeometry(geo_plane);
// ---------- ----------
// MATERIAL
// ---------- ----------
const material_points_1 = new THREE.PointsMaterial({color: 0xff0000, size: 0.75, transparent: true, opacity: 0.025});
const material_points_2 = new THREE.PointsMaterial({color: 0x00ff00, size: 0.25});
// ---------- ----------
// OBJECTS
// ---------- ----------
const points_plane = new THREE.Points(geo_plane, material_points_1);
points_plane.position.y = -3;
scene.add(points_plane);
const points_edges = new THREE.Points(geo_edges, material_points_2);
points_edges.position.y = 3;
scene.add(points_edges);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

There are a lot more features to write about when it comes to the points material, as well as base material class features that will still work with the points material. However this is very much the basic section, much of what there is to cover with that will need to be explored in another section, or whole other post.


### 1.4 - Starting out with the position attribute

Now that I have covered a lot of basic hello world type examples of THREE.Points I think I should have at least one basic example involving the position attribute of a buffer geometry. Nothing to advanced yet as this is still very much a basic section, but I think I should at least mention a thing or two about the position attribute here. As I covered in the very first example in this section, it looks like there are eight points in a geometry created with the THREE.BoxGeometry class. However if you take the time to inspect the Box geometries position attribute you will find that there are actually 24 points. Getting into depth as to why that is might prove to be a bot to much for a basic example, however I think that I should at least have a little code example that shows that this is indeed the case.

So then for this example I once again create a Box Geometry, with the same set of arguments as in the first basic example. However now I am going to use the get attribute method of the buffer geometry class to get a reference to the position attribute of the geometry. If one takes a look at the count of the position attribute they will find that the count of points is indeed 24 if the segments argument are left to the default as I am doing in this example. I can then use this count value as a way to know how many points there are to loop over when making say a while loop to do so. In such situations I can use buffer attribute methods such as getX or setX to get and set values for each axis of each point in the position attribute. For this example I just want to change the x values to make it clear that there are in fact way more points then eight in the geometry.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geometry = new THREE.BoxGeometry(1, 1, 1);
const att_pos = geometry.getAttribute('position');
console.log(att_pos.count) // 24
let i = 0;
while(i < att_pos.count){
    const a1 = i / att_pos.count;
    const x2 = -10 + 20 * a1;
    att_pos.setX(i, x2);
    i += 1;
}
// ---------- ----------
// POINTS
// ---------- ----------
const points = new THREE.Points(geometry, new THREE.PointsMaterial({size: 0.5}));
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 8, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

## 2 - The set from points method

For this section I am going to be writing at least a thing or two about the [set from points method of the buffer geometry](/2023/01/05/threejs-buffer-geometry-set-from-points/) class. I think that it is a good idea to have at least a few demos that make use of this feature when it comes to writing a post o TREE.Points as I would say it is a closely related topic. The general idea of the set from points method is that it is a quick way to create a buffer geometry from an array of [Vector3 objects](/2018/04/15/threejs-vector3/). So one can create an array of points in space my making a whole bunch of Vector3 objects, pushing each of them to an array, and then just simply pass this array to the set from points method. The end result will then be a geometry with a position attribute crated from this array of vector3 objects. A geometry such as this will not work so well when used with mesh objects, but when it comes to lines and points it will work just fine.

### 2.1 - Getting Started with Set from Points and THREE.Points

In order to get started with the set from points method I first need an array of Vector3 objects. To help with with this example and every additional example I will be making in this section I have a helper function that will just return an array such as this by passing a count of points that I want and a function where I can pass some logic to apply to each point that will be pushed into the array of points. I then also have a helper function where I pass an array of vector3 objects and get a geometry that is created from that array of vecotr3 objects by making use of this set from points method. Once I have the geometry I can then create the THREE.Points object by just passing the returned geometry as always.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// create a count of THREE.Vector3 objects with a given for point method
const createV3Array = (count, forPoint) => {
    count = count === undefined ? 100 : count;
    forPoint = forPoint || function(v, i, count){};
    const v3_array = [];
    let i = 0;
    while(i < count){
        const v = new THREE.Vector3();
        forPoint(v, i, count);
        v3_array.push(v);
        i += 1;
    };
    return v3_array;
};
// create a geometry from an array of Vector3 objects with setFromPoints method
const createGeometryFromV3Array = (v3_array) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(v3_array);
    return geometry;
};
// ---------- ----------
// GEOMETRY
// ---------- ----------
// simple circle example of v3_array
const v3_array = createV3Array(20, function(v, i, count){
    const a1 = i / count;
    const radian = Math.PI * 2 * a1;
    v.x = Math.cos(radian) * 5;
    v.z = Math.sin(radian) * 5;
});
const geometry = createGeometryFromV3Array(v3_array);
// ---------- ----------
// POINTS
// ---------- ----------
const points = new THREE.Points(geometry);
scene.add(points);
// ---------- ----------
// RENDER
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
renderer.render(scene, camera);
```

### 2.2 - updating points over time

The set from points method works great for creating a geometry to begin with, but it is not the best tool for updating a geometry over and over again. I have updated geometry this way I have found that I run into loss of context problems. I have not looking into the source code of how the set from points method works, but it might work in a way in which the size of the position attribute can be changed each time it is called which might not always be such a good thing away. In thing that it is often better to just think in terms of a fixed number of points and then update the state of those points as needed over time.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// HELPERS
// ---------- ----------
// create a count of THREE.Vector3 objects with a given for point method
const createV3Array = (count, forPoint) => {
    count = count === undefined ? 100 : count;
    forPoint = forPoint || function(v, i, count){};
    const v3_array = [];
    let i = 0;
    while(i < count){
        const v = new THREE.Vector3();
        forPoint(v, i, count);
        v3_array.push(v);
        i += 1;
    };
    return v3_array;
};
// create a geometry from an array of Vector3 objects with setFromPoints method
const createGeometryFromV3Array = (v3_array) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(v3_array);
    return geometry;
};
// update a geometry
const updateGeometryWithV3Array = (geometry, v3_array) => {
    const att_pos = geometry.getAttribute('position');
    let i = 0;
    while(i < att_pos.count){
        const v = v3_array[i];
        att_pos.setXYZ(i, v.x, v.y, v.z);
        i += 1;
    }
    att_pos.needsUpdate = true;
};
// ---------- ----------
// GEOMETRY
// ---------- ----------
const forPoint = {};
forPoint.circle = (radius) => {
    return (v, i, count) => {
        const a1 = i / count;
        const radian = Math.PI * 2 * a1;
        v.x = Math.cos(radian) * radius;
        v.z = Math.sin(radian) * radius;
    };
};
// ---------- ----------
// GEOMETRY
// ---------- ----------
// simple circle example of v3_array
const geometry = createGeometryFromV3Array( createV3Array(20) );
// ---------- ----------
// POINTS
// ---------- ----------
const points = new THREE.Points(geometry);
scene.add(points);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(12, 6, 12);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 120;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
   const a1 = frame / frameMax;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;

   const radius = 1 + 4 * a2;
   const v3_array = createV3Array(20, forPoint.circle(radius) );
   updateGeometryWithV3Array(geometry, v3_array);
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
```

## 5 - Animaiton loop examples

For each of my blog posts on threejs I like to make at least one if not more short little demo videos to embed into the content of the post to help get a better visual idea of what the over all blog post is about. So for this section I will be writing about what I have together thus far for these kinds of source code examples.

### 5.1 - Morph attriburtes anc vertex color

I would like for my first video for this post to make use of morph attributes and vertex colors. With that said I worked out this quick demo based on the source code from one of the [official threejs examples on morph attributes](https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html). This is a pretty cool demo in which the geometry of a box geometry is being mutated into a sphere like shape and then back again by adding a position key to the morph attributes property of the box geometry that will contain an array. There is then creating an attribute that will be the new set of position values to morph to.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// GEOMETRY
// base on this: https://github.com/mrdoob/three.js/blob/master/examples/webgl_morphtargets.html
// ---------- ----------
const geo = new THREE.BoxGeometry(2, 2, 2, 8, 8, 8);
geo.morphAttributes.position = [];
const pos = geo.attributes.position;
const data_pos = [];
const data_color = [];
for ( let i = 0; i < pos.count; i ++ ) {
    const x = pos.getX( i );
    const y = pos.getY( i );
    const z = pos.getZ( i );
    data_pos.push(
        x * Math.sqrt( 1 - ( y * y / 2 ) - ( z * z / 2 ) + ( y * y * z * z / 3 ) ),
        y * Math.sqrt( 1 - ( z * z / 2 ) - ( x * x / 2 ) + ( z * z * x * x / 3 ) ),
        z * Math.sqrt( 1 - ( x * x / 2 ) - ( y * y / 2 ) + ( x * x * y * y / 3 ) )
    );
    const a1 = i / pos.count;
    const r = a1;
    const g = a1 % 0.25 / 0.25;
    const b = a1 % 0.5 / 0.5;;
    data_color.push(r, g, b);
}
geo.morphAttributes.position[ 0 ] = new THREE.Float32BufferAttribute( data_pos, 3 );
geo.setAttribute('color', new THREE.Float32BufferAttribute( data_color, 3 ));
// ---------- ----------
// MATERIAL, POINTS
// ---------- ----------
const material = new THREE.PointsMaterial({ size: 0.2, vertexColors: true });
const points = new THREE.Points(geo, material);
scene.add(points);
points.morphTargetInfluences[ 0 ] = 1;
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
camera.position.set(3, 3, 3);
camera.lookAt(0,0,0);
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
    points.morphTargetInfluences[ 0 ] = a2;
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
```

## Conclusion

That will be it for now then when it comes to a general overview of THREE.Points in threejs. That is until the nest time I come around to do a little editing on this post when and if I get around to it. I would like to refine and expand a whole lot more on a wide range of other things that I did not get the time to do so with. However maybe much of that would be better done in additional posts on the subjects of points in threejs.
