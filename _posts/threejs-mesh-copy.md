---
title: Copy a mesh in threejs
date: 2019-12-18 17:31:00
tags: [three.js]
layout: post
categories: three.js
id: 583
updated: 2021-06-03 11:31:45
version: 1.25
---

When I am working on [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) demos and simple project examples I will often get into a situation in which I might want to copy a mesh object. When doing so there is the idea of just copied the own properties of the mesh object, but then there is also the question of nested properties of the mesh object such as child objects that have been attached, the geometry of the mesh, and materials.

The process of copying an object in javaScript can be tricky business, as such I have wrote a few posts on this when it comes to [cloning objects with lodash methods](/2017/10/02/lodash_clone/) as well as native javaScript by itself such as with my post on [copying an array](/2020/09/03/js-array-copy/) with just vanilla javaScript by itself. When doing so there are two general ways of thinking about the process of copying an object, shallow cloning, and deep cloning. Shallow cloning is creating an new object where it is more or less just the properties of the object itself that are copied, and not anything when it comes to nested objects that are values of the source object. Deep cloning then is then the general term for getting into the subject of what should and should not be copied when it comes to looping over all the nested properties of an object.

However if I am making a threejs project and I want to copy a mesh object then I just need to use the [clone method of a mesh](https://threejs.org/docs/#api/en/objects/Mesh.clone) instance. This is a way to go about making a copy of a mesh object however it will not fully deep clone the object. What I mean by this is that the method will create a new copy of the mesh object itself, and it will also do the same for any and all children attached to the mesh object. However it will not deep clone any other attracted objects when it comes to materials and geometry for example. This is more or less how I would want such a method to work anyway, however it is still important to know what the method will, and will not do for me.

So then this will be a quick post on the mesh clone method in threejs that can be used as a way to create copies of a mesh object in threejs. While I am at it it might touch base on a few other topics here and there, but that will be the focal point today.

<!-- more -->

## 1 - What to know first before getting into copying a mesh

This is a post on the clone method of a THREE.Mesh class instance in three.js that can be used to copy the mesh and the children of it also. As such you should have at least some background when it comes to the basics of getting started with three.js, and client side javaScript in general. If not chances are you might not gain much of anything from reading this.

### 1.1 - Version Numbers matter big time with three.js

When I first write this post I was using version r111 of three.js, and the last time I edited this post I was using r127 when I came around to doing a little editing. I can not say much has changed with the mesh clone method at least between these two versions, however a lot has changed to many other threejs features, and these changes can often result in code breaking. always be mindful of the version of threejs that you are using, and the version that was used when a code example was authored and published to the web.

## 2 - Mesh copy basic example

To copy a mesh in threejs all I need to do is just call the clone method of a mesh object instance, and what will be returned is a copy of that mesh. It is just important to know what a copy of a mesh object is and what it is not. The resulting copy is a copy of things like the position and rotation of the mesh, but not the state of the geometry that it is using, or whatever might be going on with the materials that are being used. 

Here I have a simple example where I am creating an original mesh with the THREE.Mesh constructor, and then creating a bunch of copies with the clone method of that Mesh instance.

```js
// SCENE
var scene = new THREE.Scene();
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(5, 3, 5);
camera.lookAt(0, 0, 0);
// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480);
// MESH original
var original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(original);
// Mesh cloned a bunch of times from original
var i = 0, mesh, rad, x, z;
while (i < 10) {
    mesh = original.clone();
    // changes made to position and rotation to not effect original
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
renderer.render(scene, camera);
```

This results in a bunch of mesh objects placed around the original mesh object, I am also having each of the new mesh objects face the position of the original mesh object. So each copy can have its own position, and rotation, but they still share the same reference to the same objects when it comes to geometry and materials.

## 3 - Mesh copy will not copy the material used, so changes to the original material will effect the clones.

When copying a Mesh it is the Mesh that will be copied, but not the material that the mesh is using. This is what I would expect to happen, but never the less I should write a quick section about this away.

If I take the above simple example of the mesh clone method and make use of the standard material rather than the normal material I can set a color value for the material when it comes to making the original. When I go to make clones of the original mesh properties that have to do with the mesh itself will of course be copied, so I can give new positions and rotations for example that will not effect the original and bis versa. However if I make a change to the material that will effect all mesh object as that is not being cloned.

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 6, 10);
camera.lookAt(0, 0, 0);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480);
 
// MESH original
var original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
       // Now using the Standard material
        new THREE.MeshStandardMaterial({
            color: 'red'
        }));
scene.add(original);
 
// add a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);
 
// Mesh cloned a bunch of times from original
var i = 0, mesh, rad, x, z;
while (i < 10) {
    mesh = original.clone();
    // changes made to position and rotation to not effect original
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
 
// a change to the color of the original will effect all the clones also
original.material.color.setRGB(0, 1, 0);
 
renderer.render(scene, camera);
```

So when I change the color of the material used in the original mesh to green from red, that will result in all the mesh objects that are cloned from that mesh to change to that color. The same will happen to the original when I change the color that way. If this is a desired effect then there is no problem, if it is not a desired effect then there are a number of ways to address this. One way would be to just drop the use of the mesh clone method and just make new Mesh objects along with geometries all together. However I am sure that there are other ways of making it so each mesh has its own independent material while still using the same geometry.

## 4 - Changes to the geometry will effect all the copies of the mesh also

The clone method of a mesh will just clone the mesh object and not the material, or the geometry. So just like with the material used by all clones, any change to the geometry of the original or any clone will also effect all copies. For example if I again have a situation in which I make a whole bunch of copies from an original mesh object, and then do something like change the material index values of the geometry used by the original that in turn will effect all the copies also.

```js
// SCENE
var scene = new THREE.Scene();
 
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(10, 6, 10);
camera.lookAt(0, 0, 0);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480);
 
// MESH original
var original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        // Now using an array of materials
        [
            new THREE.MeshStandardMaterial({
                color: 'red'
            }),
            new THREE.MeshStandardMaterial({
                color: 'lime'
            }),
            new THREE.MeshStandardMaterial({
                color: 'blue'
            })
        ]);
scene.add(original);
 
// add a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 4, 2);
scene.add(sun);
 
// Mesh cloned a bunch of times from original
var i = 0, mesh, rad, x, z;
while (i < 10) {
    mesh = original.clone();
    // changes made to position and rotation to not effect original
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
 
// a change to the original geometry will effect all the clones
original.geometry.groups.forEach(function (face, i) {
    face.materialIndex = i % original.material.length;
});
 
renderer.render(scene, camera);
```

## 5 - Using a create helper to create stand alone mesh objects with there own geometry and material

Using the clone method might be the way that I would want to go about creating a whole much of copies of some kind of main mesh object because doing so results in just copied the mesh and the children of the mesh.

```js
// SCENE
var scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
 
var group = new THREE.Group();
scene.add(group);
 
var createBox = function(w, h, d){
    var box = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
            color: 'red'
        }));
    return box;
};
var mainBox = createBox(1, 1, 1);
group.add(mainBox);
 
// Mesh cloned a bunch of times from original
var i = 0, mesh, rad, s, x, z;
while (i < 10) {
    s = 0.25 + 0.25 * ( Math.random() * 5 );
    mesh = createBox(s, s, s);
    // changes made to position and rotation to not effect original
    rad = Math.PI * 2 * (i / 10);
    x = Math.cos(rad) * 3;
    z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(mainBox.position);
    group.add(mesh);
    i += 1;
}
 
// changing the color of the main box ONLY EFFECTS THE MAIN BOX
mainBox.material.color.setRGB(0, 1, 0);
 
// CAMERA
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
// add a light source
var sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);
 
// RENDER
var renderer = new THREE.WebGLRenderer();
document.getElementById('demo').appendChild(renderer.domElement);
renderer.setSize(640, 480);
 
renderer.render(scene, camera);
```

## 6 - Conclusion

So then the Mesh clone method will indeed clone a mesh object, and also any children it might have. However that is it, the method will not deep clone everything when it comes to what might be going on with the geometry and material. When I get some more time to work on this one I think I could stand to work out a few more examples on this topic. There is what the Mesh clone method does, and there is what the Mesh clone method does not do.

