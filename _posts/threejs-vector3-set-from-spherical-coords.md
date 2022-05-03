---
title: Vector3 set from spherical coords method
date: 2022-02-04 11:09:00
tags: [three.js]
layout: post
categories: three.js
id: 957
updated: 2022-05-03 11:02:21
version: 1.19
---

When it comes to working out all kinds of simple hello world type project examples using threejs for the sake of learning the basics of threejs, or just gaining a more solid understanding of the library regardless of experience, the Vector three Class might come up often when doing so. There is a [whole lot to write about when it comes to the Vector3 class](/2018/04/15/threejs-vector3/) such as things like [normalizing an instance of Vector3](/2021/06/14/threejs-vector3-normalize/), or getting the [distance between two instances of a Vector3 object](/2021/06/15/threejs-vector3-distance-to/). 

One this that often want to do when making any kind of project with three.js is to position an object in terms of a spherical set of values in terms of a radius, and then two angles that have to do with coronets similar to that of latitude and longitude. Thus far I have made one [threejs project example that had to do with creating a module that is centered around the single purpose of positioning an object3d based object of one kind or another to the surface of a sphere](/2021/05/14/threejs-examples-position-things-to-sphere-surface/). That examples has to do not just with setting a position, but also setting a desired value for the rotation of an object3d based object such as a mesh or camera. The system I made for that example does seem for the most part to work okay, but I still think that there are more ways of doing the same thing, some of which might prove to be better for one reason or another. With that said while I was taking a second look at the Vector3 documentation I have found that there is a prototype method in the vector3 class that has to do with setting the values of a verctor3 instance using a radius, and two angles in radian values called [Vector3.setFromSphericalCoords](https://threejs.org/docs/#api/en/math/Vector3.setFromSphericalCoords). So then this method might also prove to be a helper fool for working out some kind of system like the one I made for the threejs project example example post, but to know for sure I have to make at least a few quick demos.

<!-- more -->


## The basics of the set from spherical coords method and what else to know first

In this section I will be starting out with a very basic example of just using the method directly with a few other threejs features. I assume that you know at least a thing or two when it comes to [getting started with a front end javaScript project](/2018/11/27/js-getting-started/), if not getting into things of that nature is outside the scope of this post. 

Also all though I will be trying to keep the examples here fairly simple with threejs, there is still an awful lot to take in when it comes to everything there is to work with in the library. I have mentioned the Vector3 class of which I am writing a post about just one method in this class, there is then a wide range of other classes in the library that are major Classes to be aware of also. Such as Euler, and Object3d, just to name a hand full.

<iframe class="youtube_video" src="https://www.youtube.com/embed/lEAAAfVRaVU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### - Version Numbers matter

The version of threejs that I was using for this example was r127. Because of feedback that I have received about various things I have made a habit of always taking note of what version of threejs I was using when I made the examples in a blog post on threejs. The reason why is because threejs is a very fast moving library in terms of development, and code breaking changes are often made in each new revision.

### A Very basic example of the setFromSphericalCoords Vector3 method

For a very simple getting started type example of this method there is just calling the setFromSphericalCoords method off of an instance of Vector3, passing some arguments and see if I get a desired outcome with the values. The first argument that I want to pass to this method is the radius for the sphere, the second and third and then the angles that I want to use. The angle values that are used for this method, like many methods in javaScript will expect a radian value, not a degree value for the angles. Conversion is fairly easy when it comes to just doing a quick expression, but there is also a number of useful methods in the [MathUtils object of threejs](https://threejs.org/docs/#api/en/math/MathUtils) for making this kinds of conversions also.

```js
(function () {
    var v = new THREE.Vector3(0,0,0);
    var phi = THREE.MathUtils.degToRad(54.74),
    theta = THREE.MathUtils.degToRad(45);
    v.setFromSphericalCoords(10, phi, theta);
    var p = document.createElement('p');
    p.innerText = v.x.toFixed(2) + ', ' + v.y.toFixed(2) + ',' + v.z.toFixed(2);
    document.body.appendChild(p);
}
    ());
```

## 1 - Basic Scene example

So now that I am getting some values that look good there is now the question of starting to use this set from spherical coords method in at least one if not more basic scene examples. For this example of a basic threejs scene I am just going to be using this spherical coords method to position a mesh. I will not be doing anything fancy when it comes to light and animation so for the single method object that I will be positioning I will be using the [THREE.SphereGeomrty](/2021/05/26/threejs-sphere/) constructor with the [THREE.MeshBasicMaterial](/2018/05/05/threejs-basic-material/) which is the typical go to material for any scene in which I am not doing anything with light.

When it comes to mesh object, camera object, or any object that is based off of the Object3d class in threejs there is the position property of such an object. The value of this position property is an instance of the Vector3 class, as such at any moment I can just call the setFromSphericalCoords method and pass the values that I want to set the position of the object by a radius and two angles. In this example I am doing just that with the camera, as well as a single mesh object of a sphere.

```js
(function () {
 
    // scene
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('black');
 
    // camera
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, .5, 1000);
    //camera.position.set(-17, 10, -17);
    camera.position.setFromSphericalCoords(
        25,
        THREE.MathUtils.degToRad(70),
        THREE.MathUtils.degToRad(225)
    );
    camera.lookAt(0, 0, 0);
    scene.add(camera);
 
    // render
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    var container = document.getElementById('demo');
    container.appendChild(renderer.domElement);

    // A Mesh with a Sphere for geometry and using the Standard Material
    var mesh = new THREE.Mesh(
        new THREE.SphereGeometry(3, 30, 30),
        new THREE.MeshBasicMaterial({
            color: new THREE.Color('red'),
            wireframe: true
        })
    );
    scene.add(mesh);
 
    // USING setFromSphericalCoords to set position of the Mesh
    var radius = 10,
    phi = THREE.MathUtils.degToRad(90),
    theta = THREE.MathUtils.degToRad(270);
    mesh.position.setFromSphericalCoords(radius, phi, theta);
 
    // render
    renderer.render(scene, camera);
 
}
    ());
```

## Conclusion

That will be it for now when it comes to this set from spherical coords method for now at least until I come around to do a bot more editing of this post. I may get around to doing that later thins month but I would not hold by breath on that I have a [whole lot of other posts on threejs](/categories/three-js/) that I have wrote over the years, and many of them need a great deal of editing also. This is a subject that I do seem to keep coming back to now and then though So I am sure that there is more to add on this when I get around to it.
