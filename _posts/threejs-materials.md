---
title: An overview of materials in three.js
date: 2018-04-30 09:14:00
tags: [js,three.js]
layout: post
categories: three.js
id: 181
updated: 2021-07-03 09:48:00
version: 1.30
---

In [three.js](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) there are a few materials to choose from to help skin a mesh object that all share the same [Material base class](https://threejs.org/docs/index.html#api/en/materials/Material). There are also additional materials for rendering lines, points, shadows, and sprites that stand out from the various materials that are used to change the look of solid mesh objects.

There are materials that will respond to a light source, and then there are materials that will not. When it comes to materials that respond to light some will preform a little better than others, but will result in a different look compared to others that are a little more resource heavy. When it comes to mesh materials that will not respond to a light source there are materials like the basic mesh material that is a good choice when it comes to just having a simple color map for the mesh. There are a few other materials that render textures based on the state of the normal property of the geometry used, or based on the depth in terms of a distance from the camera.

This post will serve as a general overview of the mesh materials in general in three.js then as a starting point for learning what the options are with this. I will give a very basic overview of the base Material class, and get into some of the differences between materials used with a Mesh, as well as the other kinds of materials. I will of course not be getting into every key little detail with each of them, some of these will deserve a full post explaining them in further detail, and I will link to those posts from here as I write them.

<!-- more -->

## 1 - What to know

This is not my [getting started post on three.js](/2018/04/04/threejs-getting-started/), if you are new to three.js you might choose to start with a post in which the basic of the library are covered. This is a post on three.js in which I assume you have basic knowledge of how to make a three.js project, and now only seek to have a deeper understanding of materials to work with when it comes to creating mesh objects.

### 1.1 - The Material base Class

All materials inherit from the [Material base class](https://threejs.org/docs/index.html#api/materials/Material). This base class contains a lot of properties some of which are superseded by prosperities in a certain material. I will not be getting into the Base class in detail here, as I still need to write more demos with many of the properties. Also This post is going to be pretty lengthly to begin with anyway. However I think I should at least cover some of the most important properties to be aware of in the base material class that I have dealt with thus far.

### 1.2 - The color, and emissive properties of materials

Many materials have a way to set a solid color property for the material, but how this works will change a little from one material to another. For example the basic material will not do anything with light, so when a solid color is set for the basic material that will just be the solid color for all the faces of the geometry used in the mesh. So then one might assume that will be the case in all other materials, but that is not true. The color property in the standard material is more or less the same thing, but it works in conjunction with what is going on when it comes to light in a scene. So if I set a solid color for an instance of a standard material, but do not add light to a scene, then I will not see anything. So when it comes to the standard materials there is another property that comes into play called the emissive property. It is this emissive property that I use to set a color that will always show up not matter what when it comes to what might be going on with light.

### 1.3 - The Material.side property

When dealing with a material that will be used on a mesh in which faces will be viewed from both sides, the side property of the material base class may be of interest.

```js
var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide
});
```
As you might guess this will make it so the material is used on both sides of the faces used in a mesh. By default it is the THREE.FrontSide constant, there is also a THREE.BackSide constant as well.

### 1.4 - Material.transparent, and Material.opacity

These two properties have to do with the opacity of the material. The transparent property expects a boolean value, which will turn transparency on or off depending on the value. If it is set true, and you do not see any opacity effect it could be because the default value for material.opacity is 1 which means fully opaque. Set the opacity property to a value between 0 and 1 to set the opacity of the material of transparency is enabled.

```js
var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: .4
});
```

### 1.5 - Version number matters with three.js

Three.js is a project in which the version number matters a whole lot as older posts on three.js often contain examples that will break on newer revisions and vise versa. When I first started writing this post I was using [three.js 0.91.0 (r91)](https://github.com/mrdoob/three.js/tree/r91), and the last time I came around to do some editing I was using r127.

## 2 - Mesh Materials

The most used materials should be the ones that are used with a Mesh to bring style to the faces of a shape. This will be a brief overview of all of these materials and what makes each of theme special.

### 2.1 - Mesh Basic Material

The [basic material](https://threejs.org/docs/index.html#api/materials/MeshBasicMaterial) is as the name suggests, it is the kind of material that I would use if I do not aim to do anything special with shading, shadows and so forth. The basic material will not respond to a light source, and the faces will be filled with a solid color, or a given texture.


```js
// CUBE
scene.add(new THREE.Mesh(
 
    // box GEOMETRY
    new THREE.BoxGeometry(1, 1, 1),
 
    // basic MATERIAL
    new THREE.MeshBasicMaterial({
        color: 0xff0000
    })
 
));
```

This comes in handy when I just want to quickly add some solid color to a mesh, or do something involving just a color map.

### 2.2 - Mesh Depth Material

This is another basic material that is not used for anything advanced involving a light source, and shadows. The [depth material](/2021/05/04/threejs-depth-material/) can be used to show some depth to a mesh, rather than just having a solid color painted on each face like with the basic material without a texture map.

```js
// CUBE
scene.add(new THREE.Mesh(
 
    // box GEOMETRY
    new THREE.BoxGeometry(1, 1, 1),
 
    // Depth MATERIAL
    new THREE.MeshDepthMaterial()
 
));
```

Depth is based off the near, and far plane of the camera when can be set when creating the camera, and can also be changed in a loop by calling a special update method. White areas indicate that an area of the mesh is closer to the camera, while darker areas indicate that the area of the mesh is farther away.

There does not appear to be much to write about in terms of other properties to know about with this one aside from the fact that the depth packing encoding can be changed from the default which is basic depth packing. The only other constant seems to be rgba packing.

```js
var material = new THREE.MeshDepthMaterial({
 
    depthPacking: THREE.RGBADepthPacking
 
});
```

### 2.3 - The Lambert material

Read my [full post](/2018/04/08/threejs-lambert-material/) on the Lambert material

This is the first material I started working with when getting into the use of lights and shadows. In some ways the [Lambert material](https://threejs.org/docs/index.html#api/materials/MeshLambertMaterial) is a good choice for a reflective material as the algorithm used for reflecting light is more efficient compared to the other options, although I might not say that it is th best looking compared to the alternatives.

```js
// Cube
var cube = new THREE.Mesh(
    new THREE.BoxGeometry(100, 100, 100),
    new THREE.MeshLambertMaterial({
        color: 0xff0000,
        emissive: 0x3a3a3a
    })
);
cube.position.set(0, 100, 0);
scene.add(cube);
```

the main thing to understand here is when just setting a solid color, the color that is set with the color property is actually the color that will show up when a white light source shines on it. The emissive property is what is used to set a solid color that is to show up no matter what, which differs from you might be used to with the basic material that you might have started with like I did.

### 2.4 - Mesh Normal Material

The [normal material](/2021/06/23/threejs-normal-material/) has to do with [vector normals](https://en.wikipedia.org/wiki/Normal_%28geometry%29) that exist in the [normal attribute of a buffer geometry instance](/2021/06/08/threejs-buffer-geometry-attributes-normals/) that is used with the mesh object. Coloring of the shape is based on the direction of the vector normals then, but the material does not take into account anything that is going on with light in a scene unlike other materials that make use of the normal attribute of the geometry.

```js
var cube = new THREE.Mesh(
 
    geometry,
 
    // Material
    new THREE.MeshNormalMaterial()
);
scene.add(cube);
```

I will not be getting into normals in detail here as that is a matter for another post. However I will mention that there is a useful helper method o get a sense of what is going on with the vector normals of a geometry.

```js
var helper = new THREE.VertexNormalsHelper(cube, 2, 0x00ff00, 1);
scene.add(helper);
```

That should help give you an idea of what is going on, and how the shape is being colored.

### 2.5 - Mesh Phong Material

The [phong material](https://threejs.org/docs/index.html#api/materials/MeshPhongMaterial) is another option for a material that will respond to a light source. Unlike the Lambert material this is a better option for specular highlights making it a good choice for any kind of surface that should be shiny like metal or varnished wood.

```js
// Sphere
scene.add(new THREE.Mesh(
 
    // Sphere GEOMETRY
    new THREE.SphereGeometry(1, 20, 20),
 
    // phong MATERIAL
    new THREE.MeshPhongMaterial({
        color: 0xff0000,
        emissive: 0x2a0000,
 
        shininess: 10,
        specular: 0xffffff
    })
 
));
 
// SPOTLIGHT
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(1.25, 1.25, 1.25);
scene.add(spotLight);
```

To get this material working great It might be best to use some kind of directional light source such as a spotlight. The specular property can be used to set the color of the shine, by default it is a very dark gray.

### 2.6 - Mesh Standard Material

The [standard material](/2021/04/27/threejs-standard-material/) might be the best option for most surfaces if a more realistic rather than speedy rendering is desired when it comes to doing something with light. The standard material will also work with a wide range of various texture maps, and is somewhat of an industry standard, thus the name standard material. I tend to like to go with this material as it is generally a great all around material that results in a decent look when it comes to working on a final result.

Because this material supports light it is called for to use this material with a light source in order for anything to be seen when it comes to the color and map attributes of the material. If a light source is not going to be used it is still possible to have something to see with this material it is just that values need to be set with the emissive and emissive map properties rather than color and map alone witch is the case with the basic material.

Unlike the phong material this material does not support specular highlights, but it would appear that is the only feature lost of interest compared to phong.

```js
// Sphere
scene.add(new THREE.Mesh(
    // box GEOMETRY
    new THREE.SphereGeometry(1, 20, 20),
 
    // phong MATERIAL
    new THREE.MeshStandardMaterial({
    color: 0xff0000,
    emissive: 0x2a0000
})));
```

### 2.7 - Mesh Physical and toon Materials

Another two materials in three.js that can be used with a mesh are the [Physical](https://threejs.org/docs/index.html#api/materials/MeshPhysicalMaterial), and [Toon](https://threejs.org/docs/index.html#api/materials/MeshToonMaterial) materials. Both of these materials are like that of the standard material, and phong materials respectfully, but with additional features. The physical material is like the standard material but gives a greater deal of control over reflectivity, while the toon material is just like phong only with toon shading.

## 3 - The Points Material

There is one Material in three.js that can be used to set display just points in a geometry which can come in handy some times.

```js
    var pointsGeometry = new THREE.Geometry();
    var i = 0;
    while (i < 500) {
 
        var star = new THREE.Vector3();
        star.set(
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45),
            THREE.Math.randFloatSpread(45));
 
        pointsGeometry.vertices.push(star);
 
        i += 1;
 
    }
 
    scene.add(new THREE.Points(pointsGeometry, new THREE.PointsMaterial({color: 0x00afaf})));
```

For more on Points and the points material I have [written a post](/2018/05/12/threejs-points-material/) on the subject, it's fun to just play with points in space when you have some time.

## 4 - Conclusion

So far I have just only scratched the surface when it comes to materials. There is a great deal more to write about when it comes to th finer points of each mesh material. In addition there is more to say about the base material class, and other matters with materials such as using an array of materials with a mesh.

I might give three.js another month at least, and in that time I might come around to updating this post as well as many others as I write more demos.
