---
title: Lerping the points of a geometry from one to another
date: 2022-07-01 15:10:00
tags: [three.js]
layout: post
categories: three.js
id: 994
updated: 2022-10-04 09:09:04
version: 1.21
---

Not to long ago I wrote a blog post on the [lerp method of the Vector3 class](/2022/05/17/threejs-vector3-lerp/) in [threejs](https://threejs.org/docs/index.html#api/en/math/Vector3). This lerp method of the Vector3 class can be used to transition the state of one vector to another by way of giving a point to transition to and an alpha value between 0 and 1 that is the magnitude to move the point. Lately I thought about using this as a way to lerp the points of a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of one geometry back and forth from one geometry to another. So then todays post will be on a [threejs example](/2021/02/19/threejs-examples/) in which I am working out a crude yet effective proof of concept of this idea of lerping the state of a geometry between two states.

So in other words I am thinking in terms of having two geometries with similar, and ideally identical count of vertcies in the position attribute. On top of having more or less the same count of vertices the order of the vertices is also of importance I have found as if that is not the case this can result in a less than desired outcome.

<!-- more -->

## Lerping two geometries, and what to know first

This is a post on an advanced topic of threejs that has to do with the position attributes of buffer geometry instances, and one way to go about transitioning between the two. In other words threre is creating two geometries both with a similar count of points and lerping all the points from one state to another for another geometry that is the geometry used for a mesh object.

<iframe class="youtube_video" src="https://www.youtube.com/embed/atEMaHaAVjA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### There are many other ways to create a kind of animated model

If you feel that this topic might be a little to advance for you now, there is taking a step back and thinking more in terms of creating animations by just moving mesh objects around. This is how I first started out with this sort of thing a long time ago now with my [guy one model](/2021/04/29/threejs-examples-guy-one/) that I made a few years back now at this point.
### The source code in this post can also be found on Github

The source code examples that I am writing about here can be [found on github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-lerp-geo/).

### Version Numbers matter

When I first wrote this post I was using r140 of threejs and the examples where working fine on my end with that revision.

## 1 - The general idea of this lerping of position arrays

So then the core of this idea is to just have a function that I can use to pass a geometry that I want to change, and then two geometries that are the state that I want to start at that can be called something like geoA, and the state that I want to change to that would then be geoB. The last argument would then be the alpha value to use between these two states that is a value between and including 0 and 1.

So inside the body of the lerp geometry function I use the get attribute function of the buffer geometry class to get the position attributes of geoA and GeoB I can then just loop over the position attribute of the geometry I want to update and use the Vector3 class to create two points in space for both geoA and geoB. I then just use the lerp method of the vector3 that I created for geoA to lerp it from that state to the state of geoB using the lerp method of the Vector3 class. I can now set the state of the vertex for the geometry that I am updating.

When updating the state of a position attribute of a geometry I need to set the needs update boolean of the position attribute to true. After that there is also thinking in terms of other attributes that may also need to be updated as a result of the change of the state of the position attribute. I have found that I do want to at least make sure the the normals attribute is also updated to make sure that lighting looks the way it should with the new position state. In some cases I might need to work out a custom solution for this, however often just using the [compute vertex normals](/2022/04/22/threejs-buffer-geometry-compute-vertex-normals/) method of the buffer geometry will work fine.

```js
(function () {
    // LERP GEO FUNCTION
    var lerpGeo = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // pos, and new pos
        let pos = geo.getAttribute('position');
        // positions for a and b
        let posA = geoA.getAttribute('position');
        let posB = geoB.getAttribute('position');
        // loop over pos and lerp between posA and posB
        var i = 0, len = pos.array.length;
        while(i < len){
            // creating Vector3 instances for current posA and PosB vertices
            var v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            var v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            // lerping between v and v2 with given alpha value
            v.lerp(v2, alpha);
            // set pos vertex to state of v
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;      
            i += 3;
        }
        // the needs update bool of pos should be set true
        // and I will also need to update normals
        pos.needsUpdate = true;
        geo.computeVertexNormals();
    };
    // SCENE
    var scene = new THREE.Scene();
    scene.add(new THREE.GridHelper(20, 20));
    scene.background = new THREE.Color('black');
    var camera = new THREE.PerspectiveCamera(50, 4 / 3, 0.1, 1000);
    camera.position.set(2, 1, 2);
    camera.lookAt(0, 0, 0);
    scene.add(camera);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    // LIGHT
    var dl = new THREE.DirectionalLight(0xffffff, 1);
    dl.position.set(2, 1, 3);
    scene.add(dl);
    scene.add( new THREE.AmbientLight(0xafafaf, 0.25) );
    // GEO AND MESH
    var g0 = new THREE.ConeGeometry(1, 1, 20, 18);
    var g1 = new THREE.SphereGeometry(1, 20, 20);
    console.log( g0.getAttribute('position').count ); // trying to get simular counts
    console.log( g1.getAttribute('position').count );
    var mesh = new THREE.Mesh(g0.clone(), new THREE.MeshStandardMaterial({ side: THREE.DoubleSide}));
    scene.add(mesh);
    // CONTROL
    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // APP LOOP
    var frame = 0, frameMax = 300;
    var loop = function () {
        requestAnimationFrame(loop);
        renderer.render(scene, camera);
        var per = frame / frameMax,
        bias = 1 - Math.abs( per - 0.5) / 0.5;
        lerpGeo(mesh.geometry, g0, g1, bias);
        frame += 1;
        frame %= frameMax;
    };
    loop();
}
    ());
```

Now that I have my lerp geo helper functionI just need to test it out with a little more javaScript code that has to do with setting up a basic scene and having two two geometries to update the state of the geometry of a mesh object. For this first little demo of the hel0er functionI am using a cone geometry and a sphere geometry as the two geometries that I would like to lerp back and forth between.

I then have a main app loop function in which I will render the current state of the scene object, and also call my lerp geo helper function to change the state of the geometry. The result is an interesting looking effect where all the points of a cone geometry are lerping from the state of the cone geometry to a sphere and back again.

## Conclusion

That is one way to make some animation of sorts, however there are also a lot of other ways of doing this sort of thing some of which might prove to be a better choice. I have done a little reading on animation clips in threejs and thus far have found that may be the best route to go when it comes to really working out a real model of sorts for one or more projects. 
I have been putting of getting into how to go about getting started with bones and animation clips for a while. For one thing I have run into some technical problems getting even the official threejs examples working on my preferred platform for getting work done, but that would not ally for more popular platforms that most people use. Anyway for the moment I have been looking into all kinds of various other ways to go about updating the state of a geometry beyond that of making ringed models in blender. When it comes to this there is just working out solutions like what I made here to just mutate the position attributes of geometries.

Sense I first wrote this post I have made one additional threejs example that makes use of what I worked out here called my [weird face on threejs example](/2022/07/08/threejs-examples-weird-face-one/). In this threejs example I am using the lerp geometry method to animation the mouth of the crude model of a face.
