---
title: Light Probes in Threejs
date: 2019-05-28 20:36:00
tags: [three.js]
layout: post
categories: three.js
id: 463
updated: 2019-05-28 21:41:35
version: 1.4
---

So in threejs r104 light probes have been introduced. As of this writing there is not much in terms of documentation at the three.js website, but there is an [official example](https://github.com/mrdoob/three.js/blob/master/examples/webgl_lightprobe.html) in the github repo as well as another asset of interest in the repo that are being used with this new three.js feature. So I played around with this in three.js, and as such I should take a moment to wrote a quick post on light probes in three.js.

<!-- more -->

## 1 - Light Probes and what to know before hand

This is an advanced post on three.js and a new feature that was introduced in revision 104 of this javaScript project. This is not a getting started post on three.js, or javaScript in general, so it would be a good idea to start with some basics before geting into light probes and other advanced three.js topics if you are new to three.js.

From what I have gathered so far it seems that light probes are a way to pull in light from a given point and then use that in conjunction with environment maps that can be used with a mesh. They can allow for some interesting effects when it comes to backgrounds and reflections of that background in a mesh.

### 1 - Revision 104+ of three.js as well as one additional assets needed

To use this feature you will need revision 104 or later of three.js, as this is a new feature that was introduced in that revision. If you are using and older version of three.js the code example here will break. In addition there is at least one more additional asset that you will need to get this example working. That asset can be found in the three.js repo and is called [LightProbeGenerator.js](https://github.com/mrdoob/three.js/blob/master/examples/js/lights/LightProbeGenerator.js). This file will need to be linked to along with three.js in the html of a project making use of the new light probe feature.

## 2 - Light probe example in threejs r104

I tried to simply the official example in the repo, but could only get away with crunching things down so much. The basic thig to do is create the light probe by calling the THREE.LightProbe constructor with the new keyword. Once you have that it can be added to the scene, and positioned somewhere just like a point light or anything to that effect.

The copy method can then be used with the THREE.LightProbeGenerator constructor that at this time seems to only work with cube textures at least that is the only method at this time it would seem.

```js
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(320, 240);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2; // approximate sRGB
document.getElementById('demo').appendChild(renderer.domElement);
 
var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 50, 0)
scene.add(pointLight);
 
// LIGHT PROBE
var lightProbe = new THREE.LightProbe();
lightProbe.position.set(0,25,0);
scene.add(lightProbe);
 
new THREE.CubeTextureLoader()
.setPath('/img/cube/skybox/')
.load(
    [
        'px.jpg',
        'nx.jpg',
        'py.jpg',
        'ny.jpg',
        'pz.jpg',
        'nz.jpg'
    ],
    function (cubeTexture) {
        cubeTexture.encoding = THREE.sRGBEncoding;
        scene.background = cubeTexture;
 
        // Using the lightProbe copy method with LightPropeGen
        lightProbe.copy(new THREE.LightProbeGenerator.fromCubeTexture(cubeTexture));
 
        var mesh = new THREE.Mesh(
            new THREE.SphereBufferGeometry(20, 32, 32),
            new THREE.MeshStandardMaterial({
                color: 0x0000af,
                metalness: 0,
                roughness: 0,
                envMap: cubeTexture,
                envMapIntensity: 1
            }));
        scene.add(mesh);
        var frame = 0,
        maxFrame = 250;
        var loop = function () {
            setTimeout(loop, 33);
            var per = frame / maxFrame,
            bias = 1 - Math.abs(0.5 - per) / 0.5;
            frame += 1;
            frame %= maxFrame;
 
            // Change Light Probe intensity
            lightProbe.intensity = bias;
 
            renderer.render(scene, camera);
        };
        loop();
});
```

Playing around with the intensity property of the light probe can then be used as a way to get an idea of what kind of effect a light probe has on an object that makes use of the cube texture as an environment map.