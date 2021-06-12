---
title: Color in threejs
date: 2021-05-03 12:32:00
tags: [three.js]
layout: post
categories: three.js
id: 858
updated: 2021-06-12 11:37:52
version: 1.28
---

When it comes ton[threejs](https://threejs.org/) it looks like I never got around to writing a quick post about some examples of the [THREE.Color](https://threejs.org/docs/#api/en/math/Color) constructor. This constructor can be used to create a THREE.Color class object instance that represents a specific color that can then be used to set the background color of a scene, the fog color, or the color of various properties of a material. 

What is nice about the THREE.Color class is that the class is packed with a number of features that allow for me to create a color in a number of different ways, including just passing three numbers for red, green and blue between 0 and 1 as arguments when calling the constructor function. Regardless of how I create the color what is returned is an instance of THREE.Color, rather than a string value for a color, and as such there is a red, green, and blue property of the object. There are also a great number of prototype methods that have to do with mutating these values, or returning values based off the state of these properties. For example there is a get hex method that will return a hex string value of the color, and a set RGB method that will change the value of the color by r, g, and b values.

So in this post I will be going over a number of typical use case examples of the THREE.Color constructor, and will also likely touch base on a number of other topics while in the process of doing so.

<!-- more -->

## 1 - THREE.Color and what to know first

This is a post on the THREE.Color constructor in three.js that is used to create an object that represents a certain color that can be used for various other features in threejs. This is not a post on the [basics of getting started with three.js](/2018/04/04/threejs-getting-started/), and client side javaScript in general, so I assume that you have at least some background, and just want to learn more about color in three.js. Still in this section I will be going over a few key details that you might want to be aware of before hand if you are nit all ready.

### 1.1 - A Transparent effect is a whole other can of worms

When it comes to working with color in a general client side javaScript environment there are ways of having an alpha channel for a color. In the THREE.Color class there are just properties for red, green, and blue, but not for an alpha channel. If is of course possible to make [materials transparent](/2021/04/21/threejs-materials-transparent/), but doing so involves setting the transparency boolean for the material to true. Then it is the opacity property of a material that will act as the alpha channel value. 

### 1.2 - Version Numbers matter with three.js

When I first wrote this post I was using r127 of three.js which was a late version of three.js in April of 2021. Code breaking changes are made to three.js all the time, so be sure to always check the version of three.js that you are using relative to the dates of the code examples that you are looking at on the open web.

## 2 - Basic color example involving setting the color property of a material

So first things first how about a basic use case example of the THREE.Color constructor where I am just setting the regular color property of a material of a cube created with the Box geometry constructor. When setting the color value of a material it is important to take into consideration what kind of material it is to begin with. In this example I am using the Standard material which is a kind of material that will respond to a light source. So when using this kind of material, and setting a color for it, I need to also add a light to the scene. However if I was using the basic material I would not have to bother with a light, and the color property of that material is used to just set what the basic solid color of the material is.

In this example I am also using the THREE.Color constructor to set the color of the Point Light that I am using for a light source for the box that is skinned with the standard material. When I create a color for a point light I typically will want to keep it white like in this example, but if I make the color of the mesh while I can set the color of the point light to something else. Another cool thing to get into is having an array of point lights, and set different colors to each of them and place them in different areas of a scene, but that might all be a little to much for now. I wanted to keep this example relative basic.

```js
// creating a box mesh with the Box Geometry constructor,
// and the normal material
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 0, 0)
        }));
 
// creating a scene
var scene = new THREE.Scene();
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1.2, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
renderer.render(scene, camera);
```

So in this example it is just the color property of the standard material that I am setting a solid color for. However when it comes to the standard material it is not just the color property that is of interest as there is also the emissve property also that I can set with the THREE.Color class. So lets look at a few more examples that have to do with the standard material and using the THREE.Color constructor.

## 3 - Setting Color and Emissive Color with THREE.Color

Another property of interest when it comes to setting the color values of a material that responds to light is the emissive property. This property is a color that will be used always regardless if there is a light source or not.

```js
// creating a scene
var scene = new THREE.Scene();
 
// Box With a material that uses a color, and emissive color
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: new THREE.Color(1, 1, 1),
            emissiveIntensity: 0.8,
            emissive: new THREE.Color(1, 0, 0)
        }));
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
renderer.render(scene, camera);
```

## 4 - Background and Fog

Another use case example of the THREE.Color constructor would be to set the background color and or a fog color. When doing so I typically will want to make the background color the same as the fog color, and I will also want to use the fog color for the color property of materials also. So it would make sense to have some kind of global, or constant local variable that is a fog color variable and set the color for that once with the THREE.Color Constructor. Then use that values for the scene.background property, as well as the value to pass to THREE.fogExp2 to create the value for scene.fog, and to use the color for mesh materials.

```js
// creating a scene
var scene = new THREE.Scene();
var fogColor = new THREE.Color(0, 1, 0);
scene.background = fogColor;
scene.fog = new THREE.FogExp2(fogColor, 0.4);
 
// Box With a material that uses a color, and emissive color
var box = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshStandardMaterial({
            color: fogColor,
            emissiveIntensity: 0.8,
            emissive: new THREE.Color(1, 0, 0)
        }));
 
// add the box mesh to the scene
scene.add(box);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(0, 0, 1);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 100,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        box.position.set(0, 0, -1 - 4 * bias);
        box.rotation.set(0, Math.PI * 2 * per, Math.PI * 4 * per);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
 
};
loop();
```

In this example I am now making use of a loop that make used of the [requestiAnimationFrame method](/2018/03/13/js-request-animation-frame/) to call the render function of the web gl render over and over again. Each time I do so I update some things when it comes to the position and rotation of the box object. The effect is then that the box will disappear as it moves away from the camera and will gradually appear again as it comes back in range of the camera. When doing so I am using th set method of the [vector3](/2018/04/15/threejs-vector3/) instance when it comes to the position of the box, and a similar set method for the [Euler instance](/2021/04/28/threejs-euler/) when it comes to setting rotation. These classes are also worth checking out in detail if you have not done so before hand.

## 5 - Random Color example

Now for a random color example, for this I made a few helper method one of which is of course a random color helper. In there I just need to call Math.random for red, green and blue values of the THREE.Color Constructor. At least that is all I need to do in order to have a full range of possibles when it comes to random colors.

I also have a similar method when it comes to creating a random position to pace a box object, with this one I am creating an instance of Vector3 and then using the instance of vector three as an argument to be passed to the Vector3 copy method later in the source code when creating a group of box objects.

```js
var randomColor = function () {
    var r = Math.random(),
    g = Math.random(),
    b = Math.random();
    return new THREE.Color(r, g, b);
};
var randomPosition = function () {
    var x = -3 + 4 * Math.random(),
    y = -1 + 2 * Math.random(),
    z = 2 + Math.random() * 5 * -1;
    return new THREE.Vector3(x, y, z);
};
 
// creating a scene
var scene = new THREE.Scene();
 
// creating a group of mesh object with random colors
var group = new THREE.Group();
var i = 0,
len = 15;
while (i < len) {
    var box = new THREE.Mesh(
            new THREE.BoxGeometry(0.5, 0.5, 0.5),
            new THREE.MeshStandardMaterial({
                color: randomColor(),
                emissiveIntensity: 0.8,
                emissive: randomColor()
            }));
    box.position.copy(randomPosition());
    group.add(box);
    i += 1;
}
scene.add(group);
 
// ADD A LIGHT BECUASE THIS IS THE STANDARD MATERIAL
var light = new THREE.PointLight(new THREE.Color(1, 1, 1));
light.position.set(1, 3, 2);
scene.add(light);
 
// camera
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);
// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(640, 480);
document.getElementById('demo').appendChild(renderer.domElement);
 
var lt = new Date(),
frame = 0,
maxFrame = 200,
fps = 30;
var loop = function () {
    var now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        group.children.forEach(function (box) {
            box.rotation.set(0, Math.PI * 2 * per, Math.PI * 4 * per);
        });
        group.rotation.y = Math.PI * 2 * per;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
 
};
loop();
```

When it comes to some kind of simple random color example such as this there are a great number of things that I might want to change when it comes to creating random colors. However for the most part it might be just playing around with the expressions that are used to create a color.

## 6 - Conclusion

Well I think that might be it for now at least when it comes to the THREE.Color constructor in three.js until I get around to editing this post. There is not just setting solid color values though when it comes to everything that has to do with color in three.js though. There is a great deal more to write about when it comes to color and the various types of texture maps there are to work with when ti comes to creating a material for example. With an alpha map for example I want to set the colors of the various pixels to colors that are gray scale rather than solid colors as gray scale colors are what are used to set levels of transparency for the alpha map. WHen creating a texture for a mesh I might often use a canvas element, so setting the color values for the texture might not make use of the THREE.Color constrictor but that is never the less one of many additional little details that have to do with color in three.js.

