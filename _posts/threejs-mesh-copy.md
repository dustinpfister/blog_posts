---
title: Copy a mesh in threejs
date: 2019-12-18 17:31:00
tags: [three.js]
layout: post
categories: three.js
id: 583
updated: 2023-03-06 11:40:18
version: 1.41
---

When I am working on [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) demos and simple project examples I will often get into a situation in which I might want to copy a [mesh object](/2018/05/04/threejs-mesh/). When doing so there is the idea of just copying the own properties of the mesh object, but often I will also need clones of all the child objects as well, there is also the [geometry](/2021/04/22/threejs-buffer-geometry/), and [material](/2018/04/30/threejs-materials/) that is used by the mesh that I might want to clone while I am at it.

The process of copying an object in general can be tricky business, as such I have wrote a few posts on this when it comes to [cloning objects with lodash methods](/2017/10/02/lodash_clone/) as well as native javaScript by itself such as with my post on [copying an array](/2020/09/03/js-array-copy/) with just vanilla javaScript array prototype methods. When doing so there are two general ways of thinking about the process of copying an object, shallow cloning, and deep cloning. Shallow cloning is creating an new object where it is more or less just the properties of the object itself that are copied, and not anything when it comes to nested objects that are values of the source object. Deep cloning then is then the general term for getting into the subject of what should and should not be copied when it comes to looping over all the nested properties of an object. Things can prove to get a little complex with that in some situations though, for example some objects I might want to copy, while others I might just want to reference.

If I am making a threejs project and I want to shallow copy of a mesh object then I just need to use the [clone method of a mesh](https://threejs.org/docs/#api/en/objects/Mesh.clone) instance. Once I have a shallow copy it is then a question of what additional steps I might want to take when it comes to cloning additional nested objects of the mesh object. This will then be a post on the mesh clone method, and while I am at it also address some of the issues that might come up when making copies of mesh objects, and cloning objects in general. While I am at it it might touch base on a few other topics here and there, but that will be the focal point today.

<!-- more -->

<iframe class="youtube_video" src="https://www.youtube.com/embed/ErhvuGKkDAM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## What to know first before getting into copying a mesh

This is a post on the clone method of a THREE.Mesh class instance in threejs that can be used to copy the mesh, and the children of it as well. As such you should have at least some background when it comes to the basics of [getting started with threejs](/2018/04/04/threejs-getting-started/), and client side javaScript in general. If not chances are you might not gain much of anything from reading this. I will not be getting into depth with the basics of threejs and javaScript here, but I will write about a few things that you might want to read about more if you have not do so all ready.

### The Object3d class

Mesh objects are just one example of a kind of object that is based off of the [object3d class](/2018/04/23/threejs-object3d/). With that said there is not just making a copy of a mesh object, but also getting into how to go about making copies of object3d based objects in general. There is also a lot to be aware of when it comes to object3d based objects such as the fact that they can have one or more children. Also there are a lot of methods in the class that can prove to be useful when addressing things that happen when cloning objects. For example there is the [traverse method](/2021/06/03/threejs-object3d-traverse/) that is a good way to loop over not just the children of an object, but the children of children, and the object itself and apply custom logic that is used to clone or reference materials and geometry as needed.

### Source code is up on Github

The source code examples that I am writing about in this post can be [found on Github in my test threejs repository](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-mesh-copy). This repo is also where I park the source code examples that I write about in my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter big time with three.js

When I first write this post I was using version r111 of threejs, and the last time I edited this post I was using r146 when I came around to doing a little editing. I can not say much has changed with the mesh clone method at least between these two versions, however a lot has changed to many other threejs features, and these changes can often result in code breaking. always be mindful of the version of threejs that you are using, and the version that was used when a code example was authored and published to the web.

## 1 - Some Basic examples of the Mesh Clone method

To start out this post I will be going over a number of basic getting started type examples of the clone method of the mesh class.

### 1.1 - Mesh copy basic example

To copy a mesh in threejs all I need to do is just call the clone method of a mesh object instance, and what will be returned is a copy of that mesh. It is just important to know what a copy of a mesh object is and what it is not. The resulting copy is a copy of things like the position and rotation of the mesh, but not the state of the geometry that it is using, or whatever might be going on with the materials that are being used. 

Here I have a simple example where I am creating an original mesh with the THREE.Mesh constructor, and then creating a bunch of copies with the clone method of that Mesh instance.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH original
//-------- ----------
const original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(original);
//-------- ----------
// Mesh cloned a bunch of times from original
//-------- ----------
let i = 0;
while (i < 10) {
    const mesh = original.clone();
    // changes made to position and rotation to not effect original
    const rad = Math.PI * 2 * (i / 10);
    const x = Math.cos(rad) * 3;
    const z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 3, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

This results in a bunch of mesh objects placed around the original mesh object, I am also having each of the new mesh objects face the position of the original mesh object. So each copy can have its own position, and rotation, but they still share the same reference to the same objects when it comes to geometry and materials.

### 1.2 - Mesh copy will not copy the material used, so changes to the original material will effect the clones.

When copying a Mesh it is the Mesh that will be copied, but not the material that the mesh is using. This is what I would expect to happen, but never the less I should write a quick section about this. If I take the above simple example of the mesh clone method and make use of the standard material rather than the normal material I can set a color value for the material when it comes to making the original. When I go to make clones of the original mesh properties that have to do with the mesh itself will of course be copied, so I can give new positions and rotations for example that will not effect the original and bis versa. However if I make a change to the material that will effect all mesh object as that is not being cloned.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH original
//-------- ----------
const original = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        new THREE.MeshNormalMaterial());
scene.add(original);
//-------- ----------
// Mesh cloned a bunch of times from original
//-------- ----------
let i = 0;
while (i < 10) {
    const mesh = original.clone();
    // changes made to position and rotation to not effect original
    const rad = Math.PI * 2 * (i / 10);
    const x = Math.cos(rad) * 3;
    const z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(5, 3, 5);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

So when I change the color of the material used in the original mesh to green from red, that will result in all the mesh objects that are cloned from that mesh to change to green. If this is a desired effect then there is no problem, if it is not a desired effect then there are a number of ways to address this. One way would be to just drop the use of the mesh clone method and just make new Mesh objects along with geometries all together. However for this example I made use of the clone method of the material base class to create and return a new material to one of the copies of the original mesh which also has a desired outcome when it comes to this sort of thing.

### 1.3 - Changes to the geometry will effect all the copies of the mesh also

The clone method of a mesh will just clone the mesh object and not the material, or the geometry. So just like with the material used by all clones, any change to the geometry of the original or any clone will also effect all copies. For example if I again have a situation in which I make a whole bunch of copies from an original mesh object, and then do something like change the material index values of the geometry used by the original that in turn will effect all the copies also.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 4, 2);
scene.add(sun);
//-------- ----------
// MESH original
//-------- ----------
const original = new THREE.Mesh(
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
//-------- ----------
// Mesh cloned a bunch of times from original
//-------- ----------
let i = 0;
while (i < 10) {
    const mesh = original.clone();
    // changes made to position and rotation to not effect original
    const rad = Math.PI * 2 * (i / 10);
    const x = Math.cos(rad) * 3;
    const z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(original.position);
    scene.add(mesh);
    i += 1;
}
//-------- ----------
// GEOMETRY CHNAGE
//-------- ----------
// a change to the original geometry will effect all the clones
original.geometry.groups.forEach(function (face, i) {
    face.materialIndex = i % original.material.length;
});
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(10, 6, 10);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 2 - Using a create helper to create stand alone mesh objects with there own geometry and material

Using the clone method might be the way that I would want to go about creating a whole much of copies of some kind of main mesh object because doing so results in just copying the mesh and the children of the mesh. This results in a more efficient way of creating a whole bunch of mesh objects that all share the same geometry and materials. Often it might just be mesh objects level property values that I will want to change up a little here and there, so this kind of approach will not result in a problem. However in some cases I will want each mesh to have its own geometry and material values. So when it comes to this kind of situation I often just drop the use of the mesh clone method all together and just create stand alone mesh objects one at a time, as well as stand alone geometry, and material objects for each mesh.

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);
//-------- ----------
// HELPERS
//-------- ----------
const createBox = function(w, h, d){
    return new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
            color: 'red'
        }));
};
//-------- ----------
// GROUP
//-------- ----------
const group = new THREE.Group();
scene.add(group);
const mainBox = createBox(1, 1, 1);
group.add(mainBox);
// Mesh cloned a bunch of times from original
let i = 0;
while (i < 10) {
    const s = 0.25 + 0.25 * ( Math.random() * 5 );
    const mesh = createBox(s, s, s);
    // changes made to position and rotation to not effect original
    const rad = Math.PI * 2 * (i / 10);
    const x = Math.cos(rad) * 3;
    const z = Math.sin(rad) * 3;
    mesh.position.set(x, 0, z);
    mesh.lookAt(mainBox.position);
    group.add(mesh);
    i += 1;
}
// changing the color of the main box ONLY EFFECTS THE MAIN BOX
mainBox.material.color.setRGB(0, 1, 0);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## 3 - Children of a cloned mesh object

One thing about the mesh clone method is that it will clone the mesh objects of the children, but it will just clone the mesh objects themselfs and not any other addtional nested objects such as the material and geometry. So in this section I will be writing about a few source code examples that have to do with this specfic topic.

### 3.1 - Cloning a mesh object with children

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);
//-------- ----------
// HELPERS
//-------- ----------
const createBox = function(w, h, d){
    return new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
            color: 'red'
        })
    );
};
//-------- ----------
// MESH and CHILDREN OF MESH
//-------- ----------
// mesh
const mesh_main = createBox(1, 1, 1);
scene.add(mesh_main);
// adding children
let i = 0, len = 10;
while (i < len) {
    const mesh = createBox(1, 1, 1);
    const rad = Math.PI * 2 * (i / len);
    mesh.position.set(Math.cos(rad) * 2.5, 0, Math.sin(rad) * 2.5);
    mesh.lookAt(mesh_main.position);
    mesh_main.add(mesh);
    i += 1;
}
// clone of mesh_main
const mesh_main_2 = mesh_main.clone();
mesh_main_2.position.set(-5, 0, -5);
scene.add(mesh_main_2);
// clone of mesh_main
const mesh_main_3 = mesh_main.clone();
mesh_main_3.position.set(5, 0, -5);
scene.add(mesh_main_3);
// updating object3d props of the children of one clone will not effect another
const mesh = mesh_main_2.children[5];
mesh.position.y = 2;
// however doing somehting to the material or geometry will effect
// all coresponding children
mesh.material.color.setRGB(0,1,0);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

### 3.2 - Cloning the material and geometry

```js
//-------- ----------
// SCENE
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
scene.add(new THREE.GridHelper(10, 10));
//-------- ----------
// LIGHT
//-------- ----------
const sun = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 40, 40),
        new THREE.MeshBasicMaterial());
sun.add(new THREE.PointLight(0xffffff, 1));
sun.position.set(8, 3, 0);
scene.add(sun);
//-------- ----------
// HELPERS
//-------- ----------
// create a single box
const createBox = function(w, h, d){
    return new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({
            color: 'red'
        })
    );
};
// create a box parent
const createBoxParent = () => {
    // mesh
    const mesh_main = createBox(1, 1, 1);
    scene.add(mesh_main);
    // adding children
    let i = 0, len = 10;
    while (i < len) {
        const mesh = createBox(1, 1, 1);
        const rad = Math.PI * 2 * (i / len);
        mesh.position.set(Math.cos(rad) * 2.5, 0, Math.sin(rad) * 2.5);
        mesh.lookAt(mesh_main.position);
        mesh_main.add(mesh);
        i += 1;
    }
    return mesh_main;
};
// copy a box parent
const copyBoxParent = (mesh_main) => {
    // clone of mesh_main
    const mesh_main_2 = mesh_main.clone();
    mesh_main_2.traverse( (obj) => {
        if(obj.type === 'Mesh'){
            obj.material = obj.material.clone();
            obj.geometry = obj.geometry.clone();
        }
    });
    return mesh_main_2;
};
//-------- ----------
// MESH and CHILDREN OF MESH
//-------- ----------
const mesh_main = createBoxParent();
const mesh_main_2 = copyBoxParent(mesh_main);
mesh_main_2.position.set(-5, 0, -5);
scene.add(mesh_main_2);
// now I can update not just object3d probs but so thing with
// the material and geometry without effecting source object
const mesh = mesh_main_2.children[5];
mesh.position.y = 2;
mesh.material.color.setRGB(0,1,0);
//-------- ----------
// RENDER
//-------- ----------
camera.position.set(8, 5, 8);
camera.lookAt(0, 0, 0);
renderer.render(scene, camera);
```

## Conclusion

So then the Mesh clone method will indeed clone a mesh object, and also any children it might have. However that is it, the method will not deep clone everything when it comes to what might be going on with the geometry and material. When I get some more time to work on this one I think I could stand to work out a few more examples on this topic. There is what the Mesh clone method does, and there is what the Mesh clone method does not do.

