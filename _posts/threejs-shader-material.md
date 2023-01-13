---
title: The shader material in threejs and getting started with a little GLSL
date: 2023-01-13 09:41:00
tags: [three.js]
layout: post
categories: three.js
id: 1023
updated: 2023-01-13 10:26:22
version: 1.1
---

The [Shader material](https://threejs.org/docs/#api/en/materials/ShaderMaterial) in threejs is one way to go about getting started with custom shaders in threejs, the other general option would be to look into the [raw shader material](https://threejs.org/docs/#api/en/materials/RawShaderMaterial). The main difference between the two has to do with built-in uniforms and attributes when it comes to the starting state of the GLSL \( [OpenGL Shader Language](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) \) code. For this reason it might be best to start out with the Shader material rather than the raw shdaer material as there are some built in values that I will not have to worry about setting up myself when it comes to the raw shader material. Yet again it is a bit of a toss up with that as if one wants to learn a thing or two about GLSL alone then the raw material might prove to be a better starting point actually.

In any case the Shader material is what I am starting with, and that will be the main topic of this post today. Using the shader material alone is simple enough, but what is not so simple is coming up with custom GLSL code to use with this material. However one has to start somewhere so this post will start out with some very simply hello world style examples, before moving on into one or more real examples when it comes to the topic of custom shaders.

<!-- more -->

## The Shader Material in threejs


## 1 - 

### 1.1 - Custom Shader hello world with gl_Position and gl_FragColor

To create an instance of the Shader material I will need to pass an object that contains three properties.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const shader_basic = {};
// unifrom values for basic shader
shader_basic.uniforms = {
    diffuse: { value: new THREE.Color(0x1a1a1a) }
};
// vertex shader for basic shader
shader_basic.vertexShader = [
    'void main() {',
    '    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '}'
].join('\n');
// fragment shader for hatching shader
shader_basic.fragmentShader = [
    'uniform vec3 diffuse;',
    'void main() {',
    '    gl_FragColor = vec4( diffuse, 1.0 );',
    '}'
].join('\n');
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(shader_basic.uniforms),
    vertexShader: shader_basic.vertexShader,
    fragmentShader: shader_basic.fragmentShader
});
material1.uniforms.diffuse.value = new THREE.Color(0,1,0);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.TorusGeometry( 3, 1, 100, 100);
geo.rotateX(Math.PI * 0.5);
const mesh = new THREE.Mesh(geo, material1);
mesh.position.y = 1;
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```
