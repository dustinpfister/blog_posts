---
title: Emissive maps in threejs
date: 2021-06-22 13:12:00
tags: [three.js]
layout: post
categories: three.js
id: 894
updated: 2021-06-22 14:09:18
version: 1.26
---

There are a lot of texture maps that can be used with the various materials in[threejs](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene), such as using a basic color map with the basic material, or an alpha map to adjust transparency of a material based on the state of a texture. I am not sure if I will every get around to writing posts on every kind of map there is to be aware of in threejs, but there are some that really stand out for me more than others and one of these map options is an [emissive map](https://stackoverflow.com/questions/23717512/three-js-emissive-material-maps). Emissive maps are kind of cool because they allow for a kind of glow effect for a material that will always be in effect regardless of what the situation might be with lighting.

When I am working with a material that will respond to a light source such as the standard material, there is the color property of the material that can be used to set a base color for the material. This color property will work a little different with the standard material compared to other materials like the basic material in that the color will only show up when there is some light in effect. So then there should be some kind of color property that will work with the standard material in the same way as the color property in the basic material in that it can be used to set a color that will always show up regardless of what the situation is with lighting. This color property of interest is the emissive property that can be used in conjunction with the color property to set a color that will always show up.

However there is not just thinking in terms of simple solid colors for objects, there is also getting into textures. With the basic material there is using the map property as a way to set a simple color map, and such a property is also there when it comes to the standard material, but again as with color it will only show up if there is light. This is where the emissive map comes into play, it is a way to set what areas of a texture are effected by an emissive color and intensity.

<!-- more -->

## 1 - Emissive maps and what to know first

There is a great deal that one should be aware of before getting into emissive maps in threejs. Of course it should go without saying that you should know at least a thing or two about [the very basics of staring a threejs project](/2018/04/04/threejs-getting-started/), and how to work with client side javaScript in general. So I will not be getting into every little detail about what should be known before hand, but I can take a moment to mention at least a few things that you might want to read up on first.

### 1.1 - The texture loader and canvas textures.

The emissive map is a kind of texture map for a material, and in order to use any of these texture maps you will need, well, a texture. A texture can be loaded in with something like the three.js built in [texture loader](/2021/06/21/threejs-texture-loader/), or if you have another means to load image files they can be passed as an argument to the THREE.Texture constructor. When it comes to creating a texture with a little javaScript code one way to go about doing so would be to make use of [canvas elements](/2018/04/17/threejs-canvas-texture/), and the 2d drawing context as a way to create textures that way.

### 1.2 - Read up more on materials to know your options

There are a number of options when it comes to [materials](/2018/04/30/threejs-materials/) that support the emissive map feature, for these examples I will be sticking mainly to the [standard material](/2021/04/27/threejs-standard-material/). The standard material is a great general purpose material and for that reason it is more os less my first go to material and not just because it supports emissive maps.

### 1.3 - Color maps, and lighting.

In order to really know what emissive maps are about you are going to want to play around with lighting, and also the color property and color maps that are effected by lighting. When it comes to what the options are with lighting there are again a range of options just like that of many other kinds of objects in threejs. For the most part thought I like to go with [ambient light](/2018/11/02/threejs-ambientlight/) and [point lights](/2019/06/02/threejs-point-light/) as a way to set an over all base about of light for all surfaces, and to also make use of something  where distance an direction have some effect on surfaces.

### 1.4 - Version numbers matter

When I wrote this post for the first time I was using r127 of threejs which was a late version of threejs that was released in early 2021.

## 2 - Basic emissive map example

In this section I will be writing about a quick basic example of an emissive map where I am creating the emissive map with a canvas element rather than loading an external texture. So for this example I have a create canvas texture helper that I can call and then pass a function that will be by draw function that will be called to create the texture with the 2d drawing context.

I then have my create emiisve map helper that will create and return the texture that I want to use for an emissive map using my create canvas texture helper. For this basic example I am just creating a square around the edge of the canvas element to define the outer edge of the texture as the emissive area.

I also have one more helper function for this example and that is one that will create and return a mesh object that will make use of a material that has an emissive map created with the other above helper functions. I am calling the create emissive map as a way to create and return the texture that I want to use for the emissive map. In addition to this there are a few more properties that are worth taking about for the material. One of which is the emissive intensity property that can be used to adjust the intensity of the emissive glow effect. There is then also adjusting what the solid emissive, and regular color values are. In any case the emisisve color is the color that will be the glow effect, and as such it should be just about any desired color other than the default black.

```js
var createCanvasTexture = function (draw) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
    draw(ctx, canvas);
    return new THREE.CanvasTexture(canvas);
};
 
var createEmissiveMap = function(){
    var COLOR_EMISSIVE_MAP_FRONT = new THREE.Color(1, 1, 1);
    return createCanvasTexture(function (ctx, canvas) {
        ctx.strokeStyle = COLOR_EMISSIVE_MAP_FRONT.getStyle();
        ctx.strokeRect(1, 1, canvas.width - 1, canvas.height - 1);
    });
};
 
var createEmissiveCube = function(){
    return new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            emissiveIntensity: 1,
            emissive: new THREE.Color(1, 0, 0),
            emissiveMap: createEmissiveMap()
        }));
};
 
// scene
var scene = new THREE.Scene();
 
// mesh
var box = createEmissiveCube();
scene.add(box);
 
// light
var light = new THREE.PointLight(new THREE.Color(1, 1, 1), 1);
light.position.set(8, 6, 2);
scene.add(light);
 
// camera, render
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

The end result of this then is a cube where the sides are lit up a little because of the presence of the light source in the form of a point light. However regardless of what the lighting situation is with a side all the areas effected by the emissive map are glowing a little with the color that I set with the emissive property.

## 3 - Conclusion

That will be it for now when it comes to emissive maps, I wanted to write at least something about them for now at least so this should work for the moment. There might be a great deal more to write about with this subject but I think for the most part a great deal of it has to do with other aspects of the threejs library beyond just that of the emissive map property of a material that supports this.

