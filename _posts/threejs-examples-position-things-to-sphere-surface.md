---
title: Position Other Mesh Objects onto the surface of a Sphere Three.js example
date: 2021-05-14 13:40:00
tags: [three.js]
layout: post
categories: three.js
id: 867
updated: 2022-12-22 13:00:53
version: 1.30
---

This [threejs example](/2021/02/19/threejs-examples/) post will have to do with positioning a mesh object on the the surface of another mesh object that makes use of a sphere geometry. There are a lot of ways to go about doing this sort of thing, such as using [group objects](/2018/05/16/threejs-grouping-mesh-objects/), Vector3 class methods, the Raycaster class, and even the attributes of buffer geometries.

The first version \( r0 \) of this example made use of a module that creates uses the first option that I mentioned which making use of group objects. The Basic idea with this is I have a group object that I then add the child object to that I want to position to the sphere. I then position the child object away from the origin of the group by a distance that is equal to the radius of the sphere. I then add the group as a child of the sphere, and then rotate the group as a way to change the position of the mesh object on the sphere surface. This might be a crude way to go about doing it, but never the less it gives a desired end result all the same.

When it comes to R1 of this example I went with the use of the apply Euler method along with several other vector3 class methods. thus far I have to say that I like this way of doing it far more than the nested group solution that I started out with. Still it may have its limitations compared to other alternatives such as the Raycaster class.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/QSdjTqOvJVY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


##  This Sphere Surface Mesh Placement example and what to know first before getting into

This is a post on a threejs project example that is a module that I can use to position a mesh object onto the surface of the sphere. This is then a post that is on a somewhat advance topic, and is then not any kind of post that has to do with the [basics of getting started with threejs](/2018/04/04/threejs-getting-started/). I will not be getting into basic things about threejs and javaScript in general in this post, but I do still often write about a few things you might want to read up more on in these opening sections.

### Check out the Vector3 class

There are a lot of useful methods in the vector3 class that can be used to help with this sort of thing. One such method is the [set from spherical coords method](/2022/02/04/threejs-vector3-set-from-spherical-coords/) of vector3, but there is also the [apply Euler](/2021/06/18/threejs-vector3-apply-euler/) method that can be used with a collection of other methods in the class also. When it comes to Vector3 objects there is not just adjusting the direction of a vector but also changing the magnitude of the vector as well. So there is also the normalize and multiply scalar methods of the vector3 class that are very helpful when it comes to the over all theme of this post.

### Raycaster is worth looking into also

The [raycaster class](/2021/05/18/threejs-raycaster/) could also be used as a way to get a position on the surface of a sphere. A Raycaster might prove to be a little overkill when it comes to a sphere, but it would prove to be more flexible when it comes to geometry in general beyond just that of a sphere. This simply fact is why it might be the best option in the long run when it comes to getting position values on the surface of mesh objects in general. In this example I might be dealing with just a sphere, but there is also dealing with sphere like geometry that has all kinds of features that can be descried as mountains and valleys.

### Source code is also on Github

The latest source code for this example can also be found in my [test threejs repository on Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-examples-position-things-to-sphere-surface).

### Version Numbers matter with three.js

When I first wrote this post I was using three.js version r127 which was a late version of three.js at of April of 2021, and the last time I edited this post I was using r146. Always be mindful of the dates of posts, as well as the dates at which I have last updated them. many code breaking changes are introduced to three.js that will case code examples such as the ones I have outline here to stop working. I do make an effort to update my content and the code examples in them now and then, but I have a whole lot of other posts on three.js and other categories that are also in need of some editing.

## 1 - Using the Raycaster method, along with Vector2 methods ( r2 )

For R2 of this threejs example I started a method that can be used to make use of a raycaster as a way to get a Vector3 object that can then be used to set the position. For the most part this way of setting position works very well, and also allows for flexibility when it comes to getting positions on geometry in general beyond that of sphere objects. However I have found that I run into problems with raycaster with certain angles which presents a problem. I have found a duck tape style solution though which involves just avoiding using values that cause this problem when setting angle values.

```js
/*  sphere-pos.js - r2 - from threejs-examples-position-things-to-sphere-surface
 *  
 *    * getPositionOnSphere method that will give a Vector3
 *    * positionToSphere method calls getPositionOnSphere to get position
 *    * positionToSphere method gets radius by using computeBoundingSphere while getPositionOnSphere takes a radius argument
 *    * getRaycasterPositionOnSphere method started
 */
(function (api) {
    //-------- ----------
    // HELPERS
    //-------- ----------
    const getRadius = (sphereMesh) => {
        // get geometry of the sphere mesh
        var sGeo = sphereMesh.geometry;
        // computer bounding sphere for geometry of the sphere mesh
        sGeo.computeBoundingSphere();
        // use radius value of Sphere instance at 
        // boundingSphere of the geometry of sphereMesh
        return sGeo.boundingSphere.radius;
    };
    //-------- ----------
    // Position an Object to a sphere mesh
    //-------- ----------
    // for a given sphere mesh, position a given object to it
    api.positionToSphere1 = function(sphereMesh, obj, lat, long, alt){
        var radius = getRadius(sphereMesh);
        const pos = api.getPositionOnSphere(sphereMesh, radius, lat, long, alt);
        obj.position.copy(pos);
    };
    //-------- ----------
    // Get A Vector3
    //-------- ----------
    // get position by raycaster
    api.getRaycasterPositionOnSphere = function(sphereMesh, radius, deg1, deg2, alt){
        // defaults for lat, long, and alt
        deg1 = deg1 === undefined ? 0 : deg1;
        deg2 = deg2 === undefined ? 0 : deg2;
        alt = alt === undefined ? 0 : alt;
        // orign for raycaster
        const angle1 = Math.PI / 180 * deg1;
        const angle2 = Math.PI / 180 * deg2;
        // using applyEuler and multiplyScalar to set origin for rayster
        const origin = new THREE.Vector3(1, 0, 0);
        origin.applyEuler( new THREE.Euler( 0, angle1, angle2) ).multiplyScalar(radius);
        // direction for raycaster
        // using vector3 clone, lerp, negate, and normalize methods to get a dir
        const dir = origin.clone().lerp(sphereMesh.position, 0.5).negate().normalize();
        // create and set raycaster
        const raycaster = new THREE.Raycaster();
        raycaster.set( origin, dir );
        const arr = raycaster.intersectObjects([ sphereMesh ]);
        if(arr.length === 1){
            // copy position
            const pos = arr[0].point;
            return pos.setLength( pos.length() + alt )
        }
        return new THREE.Vector3();
    };
    // for a given sphere mesh, get a Vector3 object on the surface
    api.getPositionOnSphere = function(sphereMesh, radius, lat, long, alt){
        // defaults for lat, long, and alt
        lat = lat === undefined ? 0 : lat;
        long = long === undefined ? 0 : long;
        alt = alt === undefined ? 0 : alt;
        // position mesh to position of sphereMesh, and translate
        // from there using lat, long, alt, and radius of sphereMesh
        // using the copy, add, and apply Euler methods of the Vector3 class
        var v1 = new THREE.Vector3(0, radius + alt, 0);
        var x = Math.PI * lat;
        var z = Math.PI * 2 * long;
        var e1 = new THREE.Euler(x, 0, z);
        return sphereMesh.position.clone().add(v1).applyEuler(e1);
    };
}
    (this['SphereWrap'] = {}));
```

### 1.1 - New loop demo using the raycaster method

Once again I have a loop example in which I am testing out the new features of this revision of the set to sphere surface module.


```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
//scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') ||  document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshNormalMaterial({wireframe: true})
);
scene.add(sphere1);
const box1 =  new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshNormalMaterial()
);
scene.add(box1);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
frame = 0;
const maxFrame = 800,
fps = 30;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        const p = per * 6 % 1,
        b = 1 - Math.abs(0.5 - p) / 0.5;
        // using the new raycaster method
        const deg1 = 360 * per;
        const deg2 = -89.9 + 180 * b;
        const v3 = SphereWrap.getRaycasterPositionOnSphere(sphere1, 2, deg1, deg2, 0.25);
        box1.position.copy(v3);
        box1.lookAt(sphere1.position);
        // render, step frame
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
```

## 2 - Using Vector3 Copy, add, and Apply Euler methods with the radius of the Sphere class instance of the Sphere Geometry ( r1 )

When I first wrote this blog post I was writing about the first version of the example that I now call r0 that was a solution involving the use of groups as a way to get a desired end result. With r1 of the example I am now making use of a collection of vector3 class methods along with the radius property of the sphere class as a way to get a desired end result. The main Vector3 class method of interest here is the apply Euler method that will preform a change of the direction of the vector by way of a given Euler class object.

Sense I am taking a whole new approach to this sort of thing with this revision I made some major changes from the ground up, and for now the sphere wrap module now just has a single public method. This single method now is the position to sphere method where I pass a mesh that has sphere geometry as the first argument, then the object I want to position to the sphere as the second argument. After that I can give lat and long values in 0 to 1 number form, along with an altitude arguyemt as the final argument when calling the method.

```js
/*  sphere-pos.js - r1 - from threejs-examples-position-things-to-sphere-surface
 *  
 */
(function (api) {
    // position a mesh to a sphere mesh with a given lat, long, and alt
    api.positionToSphere = function(sphereMesh, mesh, lat, long, alt){
        // defaults for lat, long, and alt
        lat = lat === undefined ? 0 : lat;
        long = long === undefined ? 0 : long;
        alt = alt === undefined ? 0 : alt;
        // get geometry of the sphere mesh
        var sGeo = sphereMesh.geometry;
        // computer bounding sphere for geometry of the sphere mesh
        sGeo.computeBoundingSphere();
        // use radius value of Sphere instance at 
        // boundingSphere of the geometry of sphereMesh
        var radius = sGeo.boundingSphere.radius;
        // position mesh to position of sphereMesh, and translate
        // from there using lat, long, alt, and radius of sphereMesh
        // using the copy, add, and apply Euler methods of the Vector3 class
        var v1 = new THREE.Vector3(0, radius + alt, 0);
        var x = Math.PI * lat;
        var z = Math.PI * 2 * long;
        var e1 = new THREE.Euler(x, 0, z)
        mesh.position.copy(sphereMesh.position).add(v1).applyEuler(e1);
    };
}
    (this['SphereWrap'] = {}));
```

### 2.2 - Demo of r1

When creating a project with this module I can now just create mesh objects however I like when it comes to the mesh that is the sphere an any number of other mesh objects that i would like to place on the surface of the sphere. For this demo I just make a single mesh with a sphere geometry, and one other mesh using the box geometry. In the body of the app loop function I am then using the position of sphere method, and then the look at method of the object3d class as a way to set rotation of the object that I am placing on the sphere.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 3.0, 3.0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') ||  document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(1, 30, 30),
    new THREE.MeshNormalMaterial({wireframe: true})
);
scene.add(sphere1);
const box1 =  new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshNormalMaterial()
);
scene.add(box1);
//-------- ----------
// LOOP
//-------- ----------
let lt = new Date(),
frame = 0;
const maxFrame = 100,
fps = 30;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // position to sphere
        const p = per * 6 % 1,
        b = 1 - Math.abs(0.5 - p) / 0.5;
        SphereWrap.positionToSphere(sphere1, box1, 0.75 - 0.5 * b, per, 0.25);
        // using lookAt method to set box rotation
        box1.lookAt(sphere1.position);
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
```

## 3 - The first version of this example ( r0 )

In this section I will be going over the source code of this sphere warp module that creates an instance of a special group that contains a sphere as a child, along with another group that contains object wrap groups. Each object wrap group then contains a Mesh Object. The system is a little convoluted, and I am sure than in time I might be able to find or more elegant solution for this sort of thing, however when  it just comes to how things look the module seems to work as I expect it to.
The main create wrap method is what I will be using in the main javaScript file of a project that uses this module to create an instance of this sphere wrap group. The value that is returned by the create wrap method is an instance of the THREE.Group class which is of course based on object3d. So the object that is returned by the create method can just be directly passed to the add method of the scene object when I use this module. I then park any additional data that I will be using with my other methods in the user data object of this main wrap method and any other groups and mesh objects as needed.

To add a Mesh object to be placed on the surface of the sphere I will want to use the add object to wrap method for this. When calling this method the first value I pass is the wrap object I want to add an object for, followed by a name for this object. By default the method will add a cube mesh object, but I can also pass my own mesh object as a third value for this method. When calling the app object to wrap method the mesh object will be added as a child of an object wrap group and then this group will be added to a surface group. The values of the object wrap group and the mesh object itself are then what are mutated to change the position of the mesh object so it is positioned onto the surface of the sphere.

```js
/*  sphere-pos.js - r0 - from threejs-examples-position-things-to-sphere-surface
 *  
 */
(function (api) {
    // create wrap method
    api.createWrap = function () {
        // create a wrap group
        var wrap = new THREE.Group();
        // add a sphere to the wrap
        var sphere = new THREE.Mesh(
                new THREE.SphereGeometry(1, 40, 40),
                new THREE.MeshNormalMaterial({
                    wireframe: true
                }));
        wrap.userData.sphere = sphere;
        wrap.add(sphere);
        // create a surface group and add to wrap
        var surface = new THREE.Group();
        wrap.userData.surface = surface;
        wrap.add(surface);
        return wrap;
    };
    // set to lat and long helper
    api.setObjToLatLong = function (wrap, childName, latPer, longPer, dist) {
        var childWrap = wrap.getObjectByName('objwrap_' + childName),
        child = childWrap.children[0]; //wrap.getObjectByName(childName),
        // set lat
        var radian = Math.PI * -0.5 + Math.PI * latPer,
        x = Math.cos(radian) * dist,
        y = Math.sin(radian) * dist;
        child.position.set(x, y, 0);
        // set long
        childWrap.rotation.y = Math.PI * 2 * longPer;
        // look at origin of wrap
        var v = new THREE.Vector3();
        wrap.getWorldPosition(v);
        child.lookAt(v);
    };
    // Add an Object to a Sphere Wrap Group
    api.addObjectToWrap = function (wrap, objectName, obj) {
        // create an obj
        obj = obj || new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 0.5),
                new THREE.MeshNormalMaterial({
                    wireframe: false
                }));
        obj.name = objectName;
        var objWrap = new THREE.Group();
        objWrap.name = 'objwrap_' + objectName;
        objWrap.add(obj);
        // obj wrap user data object
        var ud = objWrap.userData;
        ud.latPer = 0;
        ud.longPer = 0;
        var radius = wrap.userData.sphere.geometry.parameters.radius;
        ud.dist = radius + 0.25;
        // add the objWrap group to the surface group
        wrap.userData.surface.add(objWrap);
        //set position for the first time
        api.setObjToLatLong(wrap, objectName, ud.latPer, ud.longPer, ud.dist);
    };
}
    (this['SphereWrap'] = {}));
```

I then also have my set object to lat and long method that is what I can use to set the position of the mesh relative to a location on the surface of the sphere. When calling this method I pass the wrap object as the first object followed by the name of the object I want to set the position for. I can then set a latitude and longitude values in the form of numbers between 0 and 1. I then also have an additional argument that can be used to adjust the distance from the center of the sphere.

### 3.1 - Time to test this module out

In this section I will now be going over one demo of this module to test things out and make sure that everything is working as it should before toying with the idea of using this module in additional examples. In this demo of the sphere wrap module I set up an instance of a scene object, and then also set up my camera and renderer as well as an an animation loop method like many other such three.js examples.

I then added to instances of this sphere wrap group in this demo just for the sake of exercising the use case of having more than one of these in a scene. In the first one I added to mesh objects to the surface that are the default cube objects, but i also added one that is an instance of cone geometry. When doing so I needed to adjust the geometry so that it is facing the desired direction. This is because I have the mesh objects always looking down at the center of the sphere, so one way or another I need to adjust for that.

```js
//-------- ----------
// SCENE, CAMERA, RENDERER
//-------- ----------
const scene = new THREE.Scene();
scene.add(new THREE.GridHelper(10, 10));
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 0.1, 1000);
camera.position.set(3.0, 3.0, 3.0);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// MESH OBJECTS
//-------- ----------
// add wrap the the scene, and some cube objects
const wrap = SphereWrap.createWrap();
scene.add(wrap);
SphereWrap.addObjectToWrap(wrap, 'cube');
SphereWrap.addObjectToWrap(wrap, 'cube2');
// adding a cone rather than the default cube
// some times I might want to rotate the geometry when doing so
// rather than Object3d as I will always have that looking at the origin of the
// sphere wrap group
const cone = new THREE.Mesh(
        new THREE.ConeGeometry(0.25, 0.5, 30, 30),
        new THREE.MeshNormalMaterial({
            wireframe: true
        }));
cone.geometry.rotateX(Math.PI * 1.5);
SphereWrap.addObjectToWrap(wrap, 'cone', cone);
//-------- ----------
// LOOP
//-------- ----------
// dist and lat log values
let dist = 1.25, // radius + half of mesh height
latPer = 0.75, // 0 - 1
longPer = 0.5; // 0 - 1
// loop
let lt = new Date(),
frame = 0;
const maxFrame = 600,
fps = 30;
const loop = function () {
    const now = new Date(),
    per = frame / maxFrame,
    bias = 1 - Math.abs(per - 0.5) / 0.5,
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if (secs > 1 / fps) {
        // setting lat and long for 'cube'
        latPer = 0.25 + Math.sin(Math.PI * bias) * 0.25;
        longPer = per;
        SphereWrap.setObjToLatLong(wrap, 'cube', latPer, longPer, dist);
        // rotating cube2
        const obj = wrap.getObjectByName('cube2');
        obj.geometry.rotateZ(Math.PI / 180 * 20 * secs);
        // cone
        SphereWrap.setObjToLatLong(wrap, 'cone', 1 - 0.25 * bias, 1 - 1 * per, dist);
        // whole group
        wrap.position.x = 1 - 2 * bias;
        wrap.position.z = Math.sin(Math.PI * 2 * bias) * 2;
        renderer.render(scene, camera);
        frame += fps * secs;
        frame %= maxFrame;
        lt = now;
    }
}
loop();
```

In the main animation loop of this demo I am moving the objects in the surface of one of the sphere wrap instances, and also moving the sphere wrap group itself. It would seem that everything is working they way that it should thus far with this the objects on the surface move as they should along the surface of the sphere, and the whole group moves when I change those values.

## Conclusion

I learned a lot about three.js while working on this example, and a whole lot of other examples that I worked on this week. There are still a few methods and properties of classes like the object3d class that I have just not been using that much thus far, but now have a better understand of the class and why I some times need to use methods like the get world position method of the object 3d class. As such much of what I have worked out here will apply to future edits of other three.js posts, and examples when it comes to addressing some problems that I have discovered with some of my older work.

When writing the source code for this example I ended up exercising a few methods and features of threejs that are worth writing about also that can apply to a great many other things. For example there is using the [look at method of the object3d class](/2021/05/13/threejs-object3d-lookat/) to get a mesh object to look at the center of the sphere. However when doing so I want the mesh to look at the actual center of the sphere rather than the location relative to world space so I am also using the get world position method of the object3d class to do so. However because I am always having the mesh objects look at the center of the sphere I will also want to make sure that the geometries of the mesh objects are always looking up away from the sphere, or in any other direction that I might want apart from the downward direction. So to help with this there are methods to work with when it comes to an instance of Buffer Geometry to change the orientation of the geometry independent from that of the mesh object.


