---
title: Setting the position of objects in threejs
date: 2022-04-04 10:46:00
tags: [three.js]
layout: post
categories: three.js
id: 975
updated: 2022-04-04 11:10:42
version: 1.8
---

The [position property of the Object3d class in threejs](https://threejs.org/docs/index.html#api/en/core/Object3D.position) will hold an instance of the [Vector3 class](/2018/04/15/threejs-vector3/), and setting the values of this will set the position of an object on interest. Sense [the Object3d class](/2018/04/23/threejs-object3d/) is a base class of many objects in threejs such as [Mesh objects](/2018/05/04/threejs-mesh/) and [Cameras](/2018/04/06/threejs-camera/) just to name a few, once one learns how to set the position of one object that learn how to set the position of just about almost everything in threejs at least when it comes to objects. The [position property of an instance of Buffer geometry](/2021/06/07/threejs-buffer-geometry-attributes-position/) is a whole other topic of concern, but many of the basic ideas are the same when it comes to the values that have to do with position.

<!-- more -->

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

It would be a good idea to [look into the Vector3 class more](/2018/04/15/threejs-vector3/) at some point if you have not done so, as like that of the Object3d class it will come up a lot. For example in this basic example n instance of Vector3 can be used as a value to give to the Object3d.lookAt method. Here I am making a clone of the position property of the mesh and then using the add method of the copy of the Vector3 instance to translate the position for the camera to look at making it a position that is slightly lower than the actually position of the mesh object.