---
title: The Edges Geometry in threejs
date: 2021-05-31 12:01:00
tags: [three.js]
layout: post
categories: three.js
id: 878
updated: 2021-05-31 12:27:52
version: 1.7
---

The [edges geometry](https://threejs.org/docs/#api/en/geometries/EdgesGeometry) constructor in [three.js](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene) is yet another useful little feature of threejs that can be a handy tool when I just want to view the edges of a geometry. I became aware of how this constructor can be useful when I took a second look into how to o about working with [wire frames when updating my post on that subject](/2019/12/19/threejs-wireframe/) in three.js. When it comes to wite frame mode that works more or less as expected, however it will work by showing all the triangles of a geometry, not just the edges of a geometry as a line, or collection of line segments. So when it comes to creating another kind of wire frame mode that is just the edges of a geometry this constructor can help with that when used with the line constructor. However I think that this constructor deserves a quick post on its own, so here it is.

<!-- more -->

## 1 - The Edges geometry constructor and what to know first.

## 2 - Basic edges geometry example

To create an edges geometry I will first want a geometry by which to get the edges from that will be passed to the THREE.EdgesGeometry constructor. So for this basic example I started out with just a simple THREE.BoxGeometry and then pass that as the first and only argument to the THREE.EdgesGeometry constructor. I then took the returned geometry from THREE.EdgesGeometry and used that as the geometry for an instance of THREE.LineSegements, and I went with the THREE.LineBasicMaterial for that instance of line segments. I can then add the Line Segments instance to a scene object, and then set up my camera and renderer just like with any other three.js project.

```js
(function () {
    // box geometry and...
    var boxGeo = new THREE.BoxGeometry(1, 1, 1),
    // AN EDGE GEOMETRY CREATED FROM IT
    edgeGeo = new THREE.EdgesGeometry(boxGeo),
    line = new THREE.LineSegments(
            edgeGeo,
            new THREE.LineBasicMaterial({
                color: new THREE.Color('white')
            }));
    // Scene, camera renderer
    var scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');
    scene.add(line);
    var camera = new THREE.PerspectiveCamera(45, 4 / 3, .5, 100);
    camera.position.set(1.25, 1.75, 1.25);
    camera.lookAt(0, 0, 0);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(640, 480);
    document.getElementById('demo').appendChild(renderer.domElement);
    renderer.render(scene, camera);
}
    ());
```

The result of this is then a box that looks like it is in a kind of wire frame mode, however it looks different from a Mesh object that just has its material set to wire frame mode. There may be a few other ways to get this kind of effect, such as doing something with textures and alpha maps, but that kind of approach will also have a few down sides that I have not found solutions for just yet.
## 3 - Conclusion

So then the use of an instance of an Edges Geometry constructor will result in another way to go about getting something that looks like a kind of wire frame, and if you ask me it looks good. However there are still some draw backs, on of which is that I can not seem to set the line width to anything other than one. Another way to go about having a kind of wire frame type look would be to try to work something out with some textures, but so far I can not say that I have found anything that works as well as I would like it to when it comes to that kind of approach. So I think that maybe the best way to go about getting a kind of wire frame mode with thick lines might be to think in terms of using the cylinder geometry, sphere geometry, and create a collection of mesh objects but maybe getting into that sort of thing would be a matter for a whole other post.


