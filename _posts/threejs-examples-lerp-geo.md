---
title: Lerping the points of a geometry from one to another
date: 2022-07-01 15:10:00
tags: [three.js]
layout: post
categories: three.js
id: 994
updated: 2022-07-02 12:28:35
version: 1.6
---

Not to long ago I wrote a blog post on the [lerp method of the Vector3 class](/2022/05/17/threejs-vector3-lerp/) in [threejs](https://threejs.org/docs/index.html#api/en/math/Vector3). This lerp method of the Vector3 class can be used to transition the state of one vector to another by way of giving a point to transition to and an alpha value between 0 and 1 that is the magnitude to move the point. Lately I thought about using this as a way to lerp the points of a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) of one geometry back and forth from one geometry to another.

So in other words I am thinking in terms of having two geometries with similar, and ideally identical count of vertcies in the position attribute. On top of having more or less the same count of vertices the order of the vertices is also of importance I have found as if that is not the case this can result in a less than desired outcome.

<!-- more -->

## Lerping two geometries, and what to know first

This is a post on an advanced topic of threejs that has to do with the position attributes of buffer geometry instances, and one way to go about transitioning between the two. 

<iframe class="youtube_video" src="https://www.youtube.com/embed/atEMaHaAVjA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### There are many other ways to create a kind of animated model

If you feel that this topic might be a little to advance for you now, there is taking a step back and thinking more in terms of creating animations by just moving mesh objects around. This is how I first started out with this sort of thing a long time ago now with my [guy one model](/2021/04/29/threejs-examples-guy-one/) that I made a few years back now at this point.

## 1 - The general idea of this lerping of position arrays

So then the core of this idea is to just have a function that I can use to pass a geometry that I want to change, and then two geometries that are the state that I want to start at that can be called something like geoA, and the state that I want to change to that would then be geoB. The last argument would then be the alpha value to use between these two states.

```js
(function () {
    // LERP GEO FUNCTION
    var lerpGeo = function(geo, geoA, geoB, alpha){
        alpha = alpha || 0;
        // pos, and new pos
        let pos = geo.getAttribute('position');
        let norm = geo.getAttribute('normal');
        // positions for a and b
        let posA = geoA.getAttribute('position');
        let posB = geoB.getAttribute('position');
        // normals for a and b
        let normA = geoA.getAttribute('normal');
        let normB = geoB.getAttribute('normal');
        var i = 0, len = pos.array.length;
        while(i < len){
            // update position
            var v = new THREE.Vector3(posA.array[i], posA.array[i + 1], posA.array[i + 2]);
            var v2 = new THREE.Vector3(posB.array[i], posB.array[i + 1], posB.array[i + 2]);
            v.lerp(v2, alpha);
            pos.array[i] = v.x;
            pos.array[i + 1] = v.y;
            pos.array[i + 2] = v.z;      
            i += 3;
        }
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

## Conclusion

That is one way to make some animation of sorts, not the way as there is a whole lot of other things to write about when it comes to covering some ground with animation in threejs. I have done a little reading on animation clips in threejs and thus far have found that may be the best route to go when it comes to really working out a real model of sorts for one or more projects.

