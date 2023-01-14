---
title: The shader material in threejs and getting started with a little GLSL
date: 2023-01-13 09:41:00
tags: [three.js]
layout: post
categories: three.js
id: 1023
updated: 2023-01-14 14:20:05
version: 1.13
---

The [Shader material](https://threejs.org/docs/#api/en/materials/ShaderMaterial) in threejs is one way to go about getting started with custom shaders in threejs, the other general option would be to look into the [raw shader material](https://threejs.org/docs/#api/en/materials/RawShaderMaterial). The main difference between the two has to do with built-in uniforms and attributes when it comes to the starting state of the GLSL \( [openGL Shader Language](https://en.wikipedia.org/wiki/OpenGL_Shading_Language) \) code. For this reason it might be best to start out with the Shader material rather than the raw shader material as there are some built in values that I will not have to worry about setting up myself when it comes to the raw shader material. Yet again it is a bit of a toss up with that as if one wants to learn a thing or two about GLSL alone then the raw material might prove to be a better starting point actually.

In any case the Shader material is what I am starting with, and that will be the main topic of this post today. Using the shader material alone is simple enough, but what is not so simple is coming up with custom GLSL code to use with this material. However one has to start somewhere so this post will start out with some very simply hello world style examples, before moving on into one or more real examples when it comes to the topic of custom shaders.

<!-- more -->

<iframe class="youtube_video"  src="https://www.youtube.com/embed/i8jd1kiNNPk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## The Shader Material in threejs and what to know first

This is a post on getting started with making custom GLSL shaders in threejs by way of the THREE.ShaderMaterial class as well as many other core threejs features. This is then not in any way a kind of [getting started post with threejs](/2018/04/04/threejs-getting-started/), [client side javaScript](/2018/11/27/js-getting-started/), and many other skills that are needed before hand. Also on top of the usual set of skills that are needed for doing just about anything with threejs there is one new additional skill that one is going to need to start to scratch the surface with at least. As I mentioned in the opening of this post GLSL is what is used to write the code for these custom shaders. I will then not be getting into great detail about everything that you should know before hand here. However I do as aways use this first opening section to outline some things that you might want to read up more on before reading the rest of this post.

### Start to learn at least a thing or two about GLSL

If you want to write custom shaders you will want to learn at least a little GLSL, and getting into every little thing about that may be outside the scope of this post. Also I am still very new to this specific language anyway, so I would need to study more myself in order to start writing a collection of posts on this language anyway. There is however learning just enough GLSL to start effectively hacking over shaders that have all ready been written though and that is more or less what I am doing in this post.

Still there is the question of what is the Modzilla Developer Network equivalent site for GLSL? That is indeed a good question and thus far I can not say that I have found that. Thus far I have found the [khronos group pages](https://www.khronos.org/opengles/sdk/docs/manglsl/docbook4/) to be somewhat helpful, however thus far I have been mainly just looking at the code that is used in the core of threejs itself as an example of core features of this language by looking at the [source code files that compose the THREE.ShaderChunk library](https://github.com/mrdoob/three.js/tree/r146/src/renderers/shaders/ShaderChunk) as well as just working with this Object in the process of creating a custom shader. Working closely with this object just strikes me as what the THREE.ShaderMaterial is all about as there is also the THREE.RawShaderMaterial class which seems to be what one will want to use when it comes to doing everything from the ground up with GLSL.

### There is learning a thing or two about the built in materials first of course

If you are still new to threejs, and also even if you do have a fair amount of experience there is still just sticking with the [built in materials](/2018/04/30/threejs-materials/) and moving on with life. Many of the material options will work just fine for just about all typical use case examples. However there are some situations that call for writing a custom shader as doing so with with built in materials will have to involve some kind of very complex trickery using canvas textures, so complex that it might be better to ditch that idea and just write a little GLSL code.

### Be aware of features that have to do with buffer geometry

There is a lot to be aware of when it comes to the state of [buffer geometry](/2021/04/22/threejs-buffer-geometry/) as well of course. Once again this is very much an advanced post on threejs so I assume you know what a [position attribute](/2021/06/07/threejs-buffer-geometry-attributes-position/) is, as well as many other such attributes both standard, and not so standard. There is not just getting into making custom shaders, but also custom attributes of geometry as well after all. In some cases I might want to create shaders that will make use of a color attribute, or one or more custom attributes that should be parked in the geometry.

### Source code examples are also on Github

I also have the source code examples that I am writing about here up on [my Github](https://github.com/dustinpfister/test_threejs/tree/master/views/forpost/threejs-shader-material).

### Version Numbers matter

When I was first writing this post I was using r146 of threejs.

## 1 - Basic, hello world exmaples of THREE.ShaderMaterial in threejs

There is a lot to take in when it comes to even just simply getting started with the THREE.ShaderMaterial. However this is to be expected as this is without question one of the most, if not the most advanced topics there is when it comes to threejs. I have been working with threejs on and off for years and even I still find this to be a little intense for me, however I started taking a swing or two at it now and then because there is not much that remains when it comes to more ground to cover with threejs for me.

Anyway not just for your sake, but very much for my own sake as well, this will be a collection of very basic, getting started type examples of custom shaders in threejs by way of THREE.ShaderMaterial. This might prove to be an easier alternative to that of the THREE.RawShaderMaterial but that will only help so much of course. Still I have found that if I just want to reproduce the functionally of the [THREE.MeshBasicMatreial](/2018/05/05/threejs-basic-material/) with just the color option, that is not so hard of a starting point. With that said these examples will just be focusing one various ways to go about doing that which will just result in a solid blob of color for the object rendered in the scene. Everything else should be something that I get to in more advanced sections.

### 1.1 - Custom Shader hello world with gl_Position and gl_FragColor

To create an instance of the Shader material I will need to pass an object that contains three properties, unifroms, vertexShader, and fragmentShader. The uniforms property contains a set of values that will be the same for for all vertices, for this getting started example I am dealing with just one uniform value that is a diffuse color. Each value of the uniforms object should itself be an object and the value property of this nested object is how to go about setting a value for the uniform value. The vertexShader and fragmentShader properties should both contain string values, and each string value should contain GLSL code for the vertex and fragment shaders that will provide the custom rendering logic.

The vertex shader runs first and the main job of this shader is to set the value of gl\_Position. After the vertex shader there is the fragment shader there is the fragment shader which is what is used to set what the color should be for each pixel location. The main job of this fragment shader then is to set what the color should be for the gl\_FragColor value.

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

So then the end result of this custom shader is that I have just a solid blob of color in the location of the mesh object that contains a Torus geometry. This is then just a very complex way to go about getting the same effect as just using the basic material and setting the color option to what I want for the solid diffuse color value. However there is of course expanding on this to do somersetting else that can not be done with the basic material, or any other material for that matter. It is just that this seems like a good starting point for me when it comes to getting into doing this sort of thing. However before getting into more advanced examples of this kind of custom material I will want to cover at least a few more options when it comes to just a basic getting started type point for this sort of thing.

### 1.2 - THREE.ShaderChunk

Although a big part of getting into this sort of thing is to write at least a little custom GLSL code, there are a lot of tools built into the core of threejs to help speed things along when using the THREE.ShaderMaterial class. One feature of threejs that I think I should cover right away that I have found is the THREE.ShaderChunk object. In this shader chunk object there is a meshbasic\_vert, and meshbasic\_frag properties that as you might guess contains GLSL code for the vertex shader, and fragment shader of the mesh basic material. So then another way to create a Shader material hello world would be to just use those values for the shaders.

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
// SHADER OBJECT - Using THREE.ShaderChunk for the vertex and fragment shaders
// ---------- ----------
const shdaer_basic =  {
    // just a default diffuse color of cyan for uniforms
    uniforms: { 
        diffuse: { value: new THREE.Color(0.5, 1, 1) }
    },
    // just using the same code from 'MeshBasicMaterial' for
    // vertex and fragment shaders
    vertexShader: THREE.ShaderChunk[ 'meshbasic_vert' ],
    fragmentShader: THREE.ShaderChunk[ 'meshbasic_frag' ],
};
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material = new THREE.ShaderMaterial(shdaer_basic);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.BoxGeometry( 2, 2, 2);
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

That makes things for more concise, but it also totally defeats the purpose of bothering with the shader material because I could just use the basic material. Again the goal here is to just be aware fo what there is to work with to just get started with this sort of thing, and the THREE.ShaderChunk is just one thing to be aware of. Also in some cases I might want to start with functionality that is not all to different from that of the basic material, [phong material](/2022/12/29/threejs-phong-material/), [normal material](/2021/06/23/threejs-normal-material/) and so forth. It is just that typically I will not want to do something like this, but rather start with the actual code rather than a reference to it as a start point.

### 1.3 - Full code from THREE.ShaderChunk example

So then in the last basic example I made use of the THREE.ShaderChunk object to create a material that is more or less about the same as the basic material. However I did so by just simply referencing the GLSL code. In this example I am doing the same thing, but now I am passing the GLSL code into the actually code of the example, rather than just referencing what is there.

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
// SHADER OBJECT - Using GLSL code from THREE.ShaderChunk
// ---------- ----------
const shdaer_basic =  {
    // just a default diffuse color of cyan for uniforms
    uniforms: { 
        diffuse: { value: new THREE.Color(1, 1, 1) }
    },
    // just using the same code from 'MeshBasicMaterial' for
    // vertex and fragment shaders but now I am puling the actual shader code in
    vertexShader: [
        '#include <common>',
        '#include <uv_pars_vertex>', 
        '#include <uv2_pars_vertex>', 
        '#include <envmap_pars_vertex>', 
        '#include <color_pars_vertex>', 
        '#include <fog_pars_vertex>',
        '#include <morphtarget_pars_vertex>', 
        '#include <skinning_pars_vertex>',
        '#include <logdepthbuf_pars_vertex>', 
        '#include <clipping_planes_pars_vertex>', 
        'void main() {',
        '    #include <uv_vertex>', 
        '    #include <uv2_vertex>', 
        '    #include <color_vertex>', 
        '    #include <morphcolor_vertex>',
        '    #if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )', 
        '        #include <beginnormal_vertex>',
        '        #include <morphnormal_vertex>', 
        '        #include <skinbase_vertex>',
        '        #include <skinnormal_vertex>', 
        '        #include <defaultnormal_vertex>', 
        '    #endif',
        '    #include <begin_vertex>', 
        '    #include <morphtarget_vertex>', 
        '    #include <skinning_vertex>',
        '    #include <project_vertex>', 
        '    #include <logdepthbuf_vertex>', 
        '    #include <clipping_planes_vertex>', 
        '    #include <worldpos_vertex>',
        '    #include <envmap_vertex>',
        '    #include <fog_vertex>',
        '}'
    ].join('\n'),
    fragmentShader: [
        'uniform vec3 diffuse;',
        'uniform float opacity;',
        '#ifndef FLAT_SHADED',
        '    varying vec3 vNormal;',
        '#endif',
        '#include <common>',
        '#include <dithering_pars_fragment>',
        '#include <color_pars_fragment>',
        '#include <uv_pars_fragment>',
        '#include <uv2_pars_fragment>',
        '#include <map_pars_fragment>',
        '#include <alphamap_pars_fragment>',
        '#include <alphatest_pars_fragment>',
        '#include <aomap_pars_fragment>',
        '#include <lightmap_pars_fragment>',
        '#include <envmap_common_pars_fragment>',
        '#include <envmap_pars_fragment>',
        '#include <fog_pars_fragment>',
        '#include <specularmap_pars_fragment>',
        '#include <logdepthbuf_pars_fragment>',
        '#include <clipping_planes_pars_fragment>',
        'void main() {',
        '    #include <clipping_planes_fragment>',
        '    vec4 diffuseColor = vec4( diffuse, opacity );',
        '    #include <logdepthbuf_fragment>',
        '    #include <map_fragment>',
        '    #include <color_fragment>',
        '    #include <alphamap_fragment>',
        '    #include <alphatest_fragment>',
        '    #include <specularmap_fragment>',
        '    ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );',
        '    #ifdef USE_LIGHTMAP',
        '        vec4 lightMapTexel = texture2D( lightMap, vUv2 );',
        '        reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;',
        '    #else',
        '        reflectedLight.indirectDiffuse += vec3( 1.0 );',
        '    #endif',
        '    #include <aomap_fragment>',
        '    reflectedLight.indirectDiffuse *= diffuseColor.rgb;',
        '    vec3 outgoingLight = reflectedLight.indirectDiffuse;',
        '    #include <envmap_fragment>',
        '    #include <output_fragment>',
        '    #include <tonemapping_fragment>',
        '    #include <encodings_fragment>',
        '    #include <fog_fragment>',
        '    #include <premultiplied_alpha_fragment>',
        '    #include <dithering_fragment>',
        '}'
    ].join('\n')
};
//console.log(THREE.ShaderChunk[ 'meshbasic_frag' ])
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material = new THREE.ShaderMaterial(shdaer_basic);
console.log(material.vertexShader);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.BoxGeometry( 2, 2, 2);
const mesh = new THREE.Mesh(geo, material);
scene.add(mesh);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

Notice all the include statements that begin with a hashtag, followed by a name for what is some additional GLSL code? This is a way to include one or more parts of the THREE.ShaderChunk object in the GLSL code. So say that I quickly just want to add alpha map functionally to a material of mine. I could go threw the time consuming process of trying how to go about writing something like that from the ground up with GLSL code, but why other with that when I can just include what is baked into threejs to begin with?

This is still just a very complex way of just reproducing the functionally of the basic material, but the goal here was not to make a custom material to begin with, but rather to just get started with this. With these three examples I am not somewhat ready to start to move on to some real examples in which I am just hacking over and expanding from one of these kinds of start points.

## 2 - Using Vertex Colors and a Base color to set frac color

In the basic section of this post I wrote a whole bunch of examples that do more or less the same thing, but in some very different ways. They all had to do with just simply drawing a single color for each pixel that is the same end result of just using the Mesh basic material with the color option. That's okay considering that the goal in that section was to just get started, but not create some kind of final product. 

However in this section though the goal is to create an actual final result by making use of core threejs GLSL code to work with to create the same starting set of features there are to work with in the mesh basic material. Then hack over things a bit from there to create a material the will render a geometry by way of a ratio between a single solid base color, and whatever is going in in terms of any color attribute in the geometry that is used for what is called vertex coloring. For those of you not in the know with this one, vertex coloring is a way to define a color for each vertex in the position attribute of a buffer geometry. It is a nice quick way to have something other than a solid blob of color, that does not require light sources, or textures, but does require a color attribute in the geometry.

### 2.1 - Vertex and Base Color shader material example

The first thing that I did when making this example is create a geometry using one of the built in geometry constructor functions. Then I would just get a reference to the position attribute of the geometry, and use the count value to know how many items I need for the color attribute that I will create for the geometry. For that I just worked out some quick code to create the color attribute by making an array and pushing values for the red, green, and blue color channels for each vertex. I then confirmed that everything is working okay by making use of the basic material with the vertexColors Boolean set to true. So now the next step is to just get the same result with the shader material by just using the same GLSL code as the basic material, but just commenting out everything that does not have to do with the features that I want.

I really like the process of creating an array of strings for each line of GLSL code as this allows me to comment out lines of code one by one to get a quick idea of what I want to keep, and what might be unneeded bloat for what I want to do. Starting with the example in the basic section that has all the include statements I start to do just that until I have just the core features along that I want working. After that I started to go threw each of those include statements and just took a look at what the GLSL code is for each of them in the THREE.ShaderChunk object. Then I just replaced the includes with the actually GLSL lines, but with one exception which is the common lib.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(0, 5, 10);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// SHADER OBJECT - a custom shader that uses vertex colors along with a base color
// ---------- ----------
const shader_basevert =  {
    uniforms: { 
        uBaseColor: { value: new THREE.Color(0,0,0) },
        uBaseVertRatio: { value: new THREE.Vector2(0.50,0.50) },
        opacity: { value: 1.0 }
    },
    vertexShader: [
        '#include <common>',
        'varying vec3 vColor;',
        'void main() {',
        '    vColor = vec3( 1.0 );',
        '    vColor *= color;',
        '    vec3 transformed = vec3( position );',
        '    vec4 mvPosition = vec4( transformed, 1.0 );',
        '    mvPosition = modelViewMatrix * mvPosition;',
        '    gl_Position = projectionMatrix * mvPosition;',
        '}'
    ].join('\n'),
    fragmentShader: [
        'uniform vec3 uBaseColor;',
        'uniform float opacity;',
        'uniform vec2 uBaseVertRatio;',
        '#include <common>',
        'varying vec3 vColor;',
        'void main() {',
        '    vec4 color = vec4(uBaseColor, 1.0);',
        '    color *= uBaseVertRatio.x;',
        '    color += vec4(vColor, 1.0) * uBaseVertRatio.y;',
        '    gl_FragColor = vec4( color.rgb, opacity );',
        '}'
    ].join('\n')
};
//console.log(THREE.ShaderChunk[ 'common' ])
// ---------- ----------
// HELPER
// ---------- ----------
const MeshBaseAndVertexMaterial = (opt) => {
    opt = opt || {};
    const mat = new THREE.ShaderMaterial({
        uniforms: THREE.UniformsUtils.clone(shader_basevert.uniforms),
        vertexShader: shader_basevert.vertexShader,
        fragmentShader: shader_basevert.fragmentShader
    });
    mat.vertexColors = true;
    mat.transparent = true;
    if(opt.uBaseColor){
        mat.uniforms.uBaseColor.value = new THREE.Color(opt.uBaseColor);
    }
    if(opt.uBaseVertRatio){
         mat.uniforms.uBaseVertRatio.value = opt.uBaseVertRatio;
    }
    mat.uniforms.opacity.value = opt.opacity === undefined ? 1 : opt.opacity;
    return mat;
};
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = MeshBaseAndVertexMaterial({
    uBaseColor: 0x888888,
    uBaseVertRatio: new THREE.Vector2(0.1, 0.9),
    opacity: 0.75 });
const material2 = MeshBaseAndVertexMaterial({
    uBaseColor: 0xff00ff,
    opacity: 0.5 });
// ---------- ----------
// GEOMETRY
// ---------- ----------
const geo = new THREE.SphereGeometry( 3, 60, 60 );
// adding a color attribute
const len = geo.getAttribute('position').count;
const color_array = [];
let i = 0;
while(i < len){
   const a1 = i / len;
   const a2 = 1 - Math.abs(0.5 - a1) / 0.5;
   color_array.push(0, a2, 1 - a2);
   i += 1;
}
const color_attribute = new THREE.BufferAttribute(new Float32Array(color_array), 3);
geo.setAttribute('color', color_attribute)
// ---------- ----------
// MESH
// ---------- ----------
const mesh1 = new THREE.Mesh(geo, material1);
mesh1.position.x = 3.2;
scene.add(mesh1);
const mesh2 = new THREE.Mesh(geo, material2);
mesh2.position.x = -3.2;
scene.add(mesh2);
// ---------- ----------
// RENDER
// ---------- ----------
renderer.render(scene, camera);
```

After a while I found what lines are used to add the vertex coloring feature, along with other core features that have to do with just the plain old diffuse color feature, and opacity. So then I ended up with just a few lines as I commented out, and removed lines that have to do with all kinds of features like alpha maps and so forth. Turns out that the mesh basic material is not so basic as there is a whole to to work with still. Anyway once I had just the features that I wanted from the basic feature I found ways to further reduce the complexity even more with this as all I want to do with this example at least is to color each fragment by way of a ratio between vertex coloring and a single uniform base color.

The end result is then just what I wanted for this example at least. I can set a base color, and a ratio in the form of a THREE.Vector2 object, to set the ratio between the base color and what is going on with vertex coloring as a way to render the geometry.

## 3 - A crosshatching example

One of the first real examples of a custom shader material that I have made thus far is actually a hacked over version of one [that I found on line](https://codepen.io/EvanBacon/pen/xgEBPX). That is that I just did some quick google work to find a shader that does more or less what I wanted and found something that was close at least. I then hacked over it a lot, removing code that I did not want or need for the simple black and white look that I wanted and ended up with this.

```js
// ---------- ----------
// SCENE, CAMERA, RENDERER
// ---------- ----------
const scene = new THREE.Scene();
scene.background = new THREE.Color(0.2,0.2, 0.2);
//scene.add( new THREE.GridHelper(10, 10) );
const camera = new THREE.PerspectiveCamera(50, 32 / 24, 0.1, 1000);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);
const renderer = new THREE.WebGL1Renderer();
renderer.setSize(640, 480, false);
(document.getElementById('demo') || document.body).appendChild(renderer.domElement);
// ---------- ----------
// LIGHT
// ---------- ----------
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0.8, 1, 0.5);
scene.add(dl);
// ---------- ----------
// SHADER OBJECT
// ---------- ----------
// based on what as found at: https://codepen.io/EvanBacon/pen/xgEBPX
// by EvanBacon ( https://codepen.io/EvanBacon , https://twitter.com/baconbrix )
// * made it so that there are just two colors
// * figured out how to make the lines thicker
// * figured out how to mutate color
const shader_hatch = {};
// unifrom values for hatching shader
shader_hatch.uniforms = {
    uDirLightPos: { type: 'v3', value: new THREE.Vector3() },
    uDirLightColor: { type: 'c', value: new THREE.Color(0xeeeeee) },
    uAmbientLightColor: { type: 'c', value: new THREE.Color(0x050505) },
    uBaseColor: { type: 'c', value: new THREE.Color(0xffffff) },
    uLineColor1: { type: 'c', value: new THREE.Color(0x000000) }
};
// vertex shader for hatching shader
shader_hatch.vertexShader = [
    'varying vec3 vNormal;',
    'void main() {',
    '     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',
    '     vNormal = normalize( normalMatrix * normal );',
    '}'
].join('\n');
// fragment shader for hatching shader
shader_hatch.fragmentShader = [
    //'uniform vec3 uBaseColor;',
    'uniform vec3 uLineColor1;',
    'uniform vec3 uDirLightPos;',
    'uniform vec3 uDirLightColor;',
    'uniform vec3 uAmbientLightColor;',
    'varying vec3 vNormal;',
    'const float fSpace = 10.0;',    // added an fSpace Float
    '',
    'void main() {',
    '    float directionalLightWeighting = max( dot( vNormal, uDirLightPos ), 0.0);',
    '    vec3 lightWeighting = uAmbientLightColor + uDirLightColor * directionalLightWeighting;',
    '    float len = length(lightWeighting);',     // added a len Float
    //'    gl_FragColor = vec4( uBaseColor, 1.0 );',
    '    vec3 color = vec3(len * 0.50);', // figured out how to mutate color
    //'    color[0] = len * 0.40;',
    '    gl_FragColor = vec4(color, 1.0);',
    '    if ( len < 1.00 ) {',
    '        float n = mod(gl_FragCoord.x + gl_FragCoord.y, fSpace);', // added a n Float for each of these
    '        if ( n < 4.0 ) {', // new expression that allows for thicker lines
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.75 ) {',
    '        float n = mod(gl_FragCoord.x - gl_FragCoord.y, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.50 ) {',
    '        float n = mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '    if ( len < 0.25 ) {',
    '        float n = mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, fSpace);',
    '        if ( n < 4.0 ) {',
    '            gl_FragColor = vec4( uLineColor1, 1.0 );',
    '        }',
    '    }',
    '}'
].join('\n');
// ---------- ----------
// SHADER MATERIAL
// ---------- ----------
const material1 = new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.clone(shader_hatch.uniforms),
    vertexShader: shader_hatch.vertexShader,
    fragmentShader: shader_hatch.fragmentShader
});
material1.uniforms.uDirLightColor.value = dl.color;
material1.uniforms.uDirLightPos.value = dl.position;
//const lineColor1 = 0xff0000;
//material1.uniforms.uBaseColor.value.setHex(0xff0000);
//material1.uniforms.uLineColor1.value.setHex(lineColor1);
// ---------- ----------
// GEOMETRY, MESH
// ---------- ----------
const geo = new THREE.TorusGeometry( 3, 1, 100, 100);
geo.rotateX(Math.PI * 0.5);
const mesh = new THREE.Mesh(geo, material1);
mesh.position.y = 1;
scene.add(mesh);
// ---------- ----------
// ANIMATION LOOP
// ---------- ----------
const FPS_UPDATE = 20, // fps rate to update ( low fps for low CPU use, but choppy video )
FPS_MOVEMENT = 30;     // fps rate to move object by that is independent of frame update rate
FRAME_MAX = 300;
let secs = 0,
frame = 0,
lt = new Date();
// update
const update = function(frame, frameMax){
    const a1 = frame / frameMax;
    const v = new THREE.Vector3();
    const e = new THREE.Euler();
    e.x = Math.PI * 4 * a1;
    e.z = Math.PI * 2 * a1;
    v.set(0,1,0).applyEuler(e);
    dl.position.copy(v);
};
// loop
const loop = () => {
    const now = new Date(),
    secs = (now - lt) / 1000;
    requestAnimationFrame(loop);
    if(secs > 1 / FPS_UPDATE){
        // update, render
        update( Math.floor(frame), FRAME_MAX);
        renderer.render(scene, camera);
        // step frame
        frame += FPS_MOVEMENT * secs;
        frame %= FRAME_MAX;
        lt = now;
    }
};
loop();
```

The code that is was based on was made for a very old revision of threejs \( r57 \), so many of the changes had to do with having to just do things the way that they are done now. I also did not make use of additional shaders that where used in the example, and made a few more changes that allowed for things like thicker lines. Thus far this material works more or less the way that I would like it to, but I still would like to add at least a few more features to this such as transparency.


## Conclusion

That will be it for now at least when it comes to custom shaders in threejs, not because there is not anything more to write about, but indeed very much the opposite. I have a lot more to look into when it comes to this sort of thing myself as there is a great deal more to learn about when it comes to working with the THREE.ShaderChunk library, as well as [GLSL itself](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language). 

This was a kind of just getting started type post though, so maybe there is still only so much more to write about in terms of future edits of this post at least. However I am going to want to write additional blog posts on more examples for custom shaders, the shader chunk object, GLSL, and much more. There is just no way to do justice with this in the form of a single blog post, unless it is a real serious long form content piece that just goes on war and peace style maybe.

