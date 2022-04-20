---
title: Setting the position of objects in threejs
date: 2022-04-04 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 975
updated: 2022-04-20 14:42:54
version: 1.21
---

The [position property of the Object3d class in threejs](https://threejs.org/docs/index.html#api/en/core/Object3D.position) will hold an instance of the [Vector3 class](/2018/04/15/threejs-vector3/), and setting the values of this will set the position of an object on interest. Sense [the Object3d class](/2018/04/23/threejs-object3d/) is a base class of many objects in threejs such as [Mesh objects](/2018/05/04/threejs-mesh/) and [Cameras](/2018/04/06/threejs-camera/) just to name a few, once one learns how to set the position of one object that learn how to set the position of just about almost everything in threejs at least when it comes to objects. The [position property of an instance of Buffer geometry](/2021/06/07/threejs-buffer-geometry-attributes-position/) is a whole other topic of concern, but many of the basic ideas are the same when it comes to the values that have to do with position.

<!-- more -->

## The position property of the object3d class and what to know first

This is a post on just the position property of the object3d class in the javaScript library known as threejs. So then this is not any kind of [how to get started with threejs kind of a post](/2018/04/04/threejs-getting-started/) as well as with any additional skills that are also required before hand that have to do with client side web development in general. There are a whole lot of other topics that will branch off from the position property such as things that have to do with the Vector3 class to which the position property is an instance of with respect to the value of the property. Also There is not just setting position but also orientation of objects so I might also need to touch base on the rotation property also in this post.

<iframe class="youtube_video"  src="https://www.youtube.com/embed/iqTSfkGX3no" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Be mindful of version numbers with threejs

When I first wrote this post I was using r135 of threejs.

### The Source code example in this post are on github

The source code examples that I am writing about in this post [can be found on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-object3d-position). This is also the repository where I am parking all the other source code examples for the [many other posts on threejs](/categories/three-js/) that I have wrote thus far over the years.

## 1 - Basic example of the position property of Object3d

To start things off here is a basic example of the position property that involves just setting the position of a single mesh object, and a camera both of which are based off of the Object3d class. As with any threejs example I set up my scene object, camera, and renderer and when doing so I also often add a Grid helper to the scene as well if it is going to just be some simple example like this. I then create a single mesh object using th Box geometry constrictor and the normal material and add that to the scene object. Now that I have a scene and a few objects in the scene such as the mesh object and the camera, I can use the position property of these objects to set the position of them in the scene.

The set method of the Vector3 instance would be one way to go about setting the value of the position of something such as the mesh object. With this method I can just call the set method off of the instance of Vector3 at the position property of say the mesh object and pass number literals for a desired fixed position of the mesh object, and sense this is a basic example I can also do the same for the camera as well.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 20);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // adding a mesh object
    var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
    scene.add(mesh);
    // SETTING POSITION OF THE MESH OBJECT
    mesh.position.set(-3, 0.5, 1);
    // SETTNG POSITION OF THE CAMERA
    camera.position.set(8, 4, 0);
    // setting Rotation of the camera using clone, and add Vector3 methods off 
    camera.lookAt( mesh.position.clone().add( new THREE.Vector3(0,-2,0) ) );
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

It would be a good idea to [look into the Vector3 class more](/2018/04/15/threejs-vector3/) at some point if you have not done so, as like that of the Object3d class it will come up a lot. For example in this basic example n instance of Vector3 can be used as a value to give to the [Object3d.lookAt method](/2021/05/13/threejs-object3d-lookat/). Here I am making a clone of the position property of the mesh and then using the add method of the copy of the Vector3 instance to translate the position for the camera to look at making it a position that is slightly lower than the actually position of the mesh object.

## 2 - Setting the position of a parent and child

There is not just setting the position of a single object, but also all the children of a parent object as well as the parent object as a whole. In other words the add method of the scene object is not just a method of the scene object, but yet another method of the Object3d class to which the scene object is another example of an object that is based off of the object 3d class. Yes the scene object also has a position property and if desired that can be used as a way to change the position of a whole scene relative to what is often called world space. However for now when it comes to this section I will be going over an example that make use of the [THREE.Group constructor](/2018/05/16/threejs-grouping-mesh-objects/) as a way to have a parent and child kind of situation with the position of objects.

```js
(function () {
    // SCENE TYPE OBJECT, CAMERA TYPE OBJECT, and RENDERER
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(9, 9));
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 100);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // CREATING A GROUP WITH CHILDREN
    var group = new THREE.Group();
    var i = 0, len = 30, radian, radius, x, y, z;
    while(i < len){
        var mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshNormalMaterial());
        radian = Math.PI * 2 * 4 / len * i;
        radius = 1;
        x = Math.cos(radian) * radius;
        y = 10 / 2 * -1 + 10 * ( i / len);
        z = Math.sin(radian) * radius;
        // SETTING THE POSITION OF JUST THIS MESH
        mesh.position.set(x, y, z);
        group.add(mesh);
        i += 1;
    }
    scene.add(group);
 
    // SETTING POSITION OF THE GROUP
    group.position.set(-5,0,-5)
 
    // POSITON AND ROTATION OF CAMERA
    camera.position.set(8, 8, 8);
    camera.lookAt(0, 1, 0);
 
    // render static scene
    renderer.render(scene, camera);
}
    ());
```

In this example I am creating a group and then I am created and positioning a whole bunch of mesh objects and adding them as children for the group. When adding a child object to a group the position of each child object will be relative to the parent object, and not that of world space. There are methods in the Object3d class to help get a world space relative position rather than a group relative position, namely [the get world position method ](https://threejs.org/docs/#api/en/core/Object3D.getWorldPosition), but for now there is just being mindful of the situation with parent and child objects.

## 3 - Conclusion

The position property of the Object3d class is one feature of threejs that I find myself using all the time in projects, as the name suggests it is how to go about setting the current position of something in an over all project. The rotation property and the look at method of the object3d class is also of interest of course when it comes to setting the orientation of objects as well. There are also a whole lot of other features in threejs that are closely related to the position property also that I should maybe mention in this conclusion section when it comes to fuhrer reading topics related to this. One such feature that comes to mind right away is the [Raycaster class](/2021/05/18/threejs-raycaster/). If you are wondering how to go about getting a position on the surface of the geometry of a mesh object this raycaster class is a very helpful toll for that kind of thing.
