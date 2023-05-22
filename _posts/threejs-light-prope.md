---
title: Light Probes in Threejs
date: 2019-05-28 20:36:00
tags: [three.js]
layout: post
categories: three.js
id: 463
updated: 2023-05-22 11:40:57
version: 1.26
---

When [threejs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene) version r104 was introduced a new light probe feature was added to the core of the library. At the time that I started this post there was not much in terms of documentation at the threejs website, but there is an [official example](https://github.com/mrdoob/three.js/blob/master/examples/webgl_lightprobe.html) in the github repository as well as another assets of interest that are helpful for gaining a sense as to how to go about using these features. So I played around with the light probe in threejs, and as such I should take a moment to write a quick post on the subject of light probes.

<!-- more -->

## Light Probes and what to know before hand

This is an advanced post on three.js and a new feature that was introduced in revision 104 of this javaScript library. This is not a [getting started post on threejs](/2018/04/04/threejs-getting-started/), or [javaScript in general](/2018/11/27/js-getting-started/) for that matter. So it would be a good idea to start with some basics before getting into light probes and other advanced three.js topics if you are new to three.js.

From what I have gathered so far it seems that light probes are a way to pull in light from a given point and then use that in conjunction with environment maps that can be used with a mesh. They can allow for some interesting effects when it comes to backgrounds and reflections of that background in a mesh.

### Know the basics of light and materials in threejs first

Another thing that you should have solid before messing around with light probes is to first know a thing or two about working with light in a threejs project. There is going to need to be a light source of course and when it comes to that there are a few options. However for post projects my first go to option for a [light source is a point light](/2019/06/02/threejs-point-light/) which is what I will be using in this example. There are also the very [basics of materials](/2018/04/30/threejs-materials/) that are worth mentioning also when it comes to light sources and that is that not all materials will respond to light sources. Just like light sources there are a few options when it comes to materials that will respond to one or more light sources, but for this example I will be going with the standard material which is one such option.

### Know a think or two about cube textures

The example that I worked out makes use of what is called a [cube texture](/2018/04/22/threejs-cube-texture/), and when it comes to this subject that also in turn deserves a whole other post, or more when it comes to what these kinds of textures are all about. One use case is to use this kind of texture for what is called a skybox, and that is what I will be using for the environment map of the standard material of a sphere in this example.

### An additional file that can be found in the examples folder needs to be added

In addition to knowing the basics of threejs and javaScript, using at least revision 104 plus of threejs, knowing the basics of light and light sensitive materials, and cube textures there is one more additional little thing to know before getting into the use of light probes. There is one more additional asset that you will need to get this example working. That asset can be found in the three.js repository and is called [LightProbeGenerator.js](https://github.com/mrdoob/three.js/blob/master/examples/js/lights/LightProbeGenerator.js) which can be found in the examples folder of the main threejs repository along with many other useful external files that can be used on top of the threejs library by itself. 

This file will need to be linked to along with three.js in the html of a project making use of the new light probe feature. last i check when editing this post to make sure things are still working for r127 there are now to methods that are added with this file. One if the fromCubeTexture method, and the other is a fromCubeRenderTarget method. In this example I am using the  fromCubeTexture and I have not yet looked into what the other method is all about just yet.

## Source code examples are also on Github

I also have the source code exmaple that I am writing about here [up on my Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-light-probe). This is also where I park the source code exmaples for my [many other blog posts on threejs](/categories/three-js/) as well.

### Version Numbers matter

To use this feature you will need revision 104 or later of threejs, as this is a new feature that was introduced in that revision. If you are using and older version of threejs the code example here will of course break, and the only practical way to get it to work would be to just use a later version. As of the last time I came around to do some editing of this post I started a more up to date r146 demo of this feature, but sense I can not say that this is something that I use often I did not get around to compleating it. However the situaiton is simular in that there are features built into threejs, but also some addtional ad on files that you will likley also want to use that can be found in the threejs Github repo.


## 1 - Light probe example in threejs r104

I tried to make the official example in the repository a little more simple to follow, but could only get away with crunching things down so much. The basic thing to do is create the light probe by calling the [THREE.LightProbe constructor](https://threejs.org/docs/#api/en/lights/LightProbe) with the new keyword. Once you have that it can be added to the scene, and positioned somewhere just like a point light or anything to that effect.

The copy method can then be used with the THREE.LightProbeGenerator constructor that at this time seems to only work with cube textures, at least that is the only method at time that I wrote this anyway. So then in this example I am using the cube texture loader to load skybox image assets.

```js
//-------- ----------
// SCENE, CAMERA RENDERER
//-------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
camera.position.set(25, 25, 25);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
renderer.setSize(640, 480, false);
renderer.gammaOutput = true;
renderer.gammaFactor = 2.2; // approximate sRGB
( document.getElementById('demo') || document.body ).appendChild(renderer.domElement);
//-------- ----------
// LIGHT
//-------- ----------
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(0, 50, 0);
scene.add(pointLight);
//-------- ----------
// LIGHT PROBE
//-------- ----------
const lightProbe = new THREE.LightProbe();
scene.add(lightProbe);
//-------- ----------
// MESH
//-------- ----------
const mesh = new THREE.Mesh(
    new THREE.SphereBufferGeometry(20, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0x0000af,
        metalness: 0,
        roughness: 0,
        envMapIntensity: 1
    }));
scene.add(mesh);
//-------- ----------
// LOOP
//-------- ----------
let frame = 0;
const maxFrame = 250;
const loop = function () {
    setTimeout(loop, 33);
    const per = frame / maxFrame;
    const bias = 1 - Math.abs(0.5 - per) / 0.5;
    frame += 1;
    frame %= maxFrame;
    // Change Light Probe intensity
    lightProbe.intensity = bias;
    // Change the light probe position
    const radian = Math.PI * 2 * per;
    pointLight.position.set(
        Math.cos(radian) * 50,
        Math.sin(radian) * 50,
        0);
    renderer.render(scene, camera);
};
//-------- ----------
// LOAD CUBE TEXTURE, START LOOP
//-------- ----------
new THREE.CubeTextureLoader()
.setPath('/img/cube/skybox/')
.load(
    [ 'px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg' ],
    function (cubeTexture) {
        cubeTexture.encoding = THREE.sRGBEncoding;
        // use the cube texture for the background
        scene.background = cubeTexture;
        // set the env map for the mesh to the cube texture
        mesh.material.envMap = cubeTexture;
        // Using the lightProbe copy method with LightPropeGen
        lightProbe.copy(new THREE.LightProbeGenerator.fromCubeTexture(cubeTexture));
        // start the loop
        loop();
    }
);
```

Playing around with the intensity property of the light probe can then be used as a way to get an idea of what kind of effect a light probe has on an object that makes use of the cube texture as an environment map. The light prob itself does not emit any light of its own, which is why I still needed to add the point light for this example. What is really going on here is that the light probe is having an impact on how light that is moving throw the 3d space effects the cube texture.

## Conclusion

That is it for now then when it comes to light probes in threejs, I do get around to editing my content now and then and it would be nice to make a few moire examples of this, some of which might prove to be a little more simple.

When it comes to what i really want to do with threejs at this point I can not say that I am using light probes that often, or at all actually. However I guess that these are just the kinds of things that one will get around to now or then when it comes to learning about every little detail about the library.

