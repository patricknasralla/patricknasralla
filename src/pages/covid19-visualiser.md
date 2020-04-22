---
title: A 3D visualisation of global COVID-19 cases.
date: 2020-03-20
type: project
titleImage: ../assets/img/covid_visualiser.jpg
tags: ['coronavirius', 'React', 'ThreeJS']
---

## You can see the finished project here: **<a href="https://covid19visualiser.com" target="_blank">covid19visualiser.com</a>**.

<br />
<br />
<br />

COVID-19 is global. It has changed society in the space of a short few weeks. Because of this, there is a global effort to track data in order for us to effectively plan policy. Statistics such as reported cases and number of deaths allow us to monitor the spread of infection. We can also use these stats to measure the effectiveness of an individual country's strategy compared to others.

The way that you can visually represent something like the global spread of disease is to me an interesting challenge. When I started thinking about making a COVID-19 visualisation in late February 2020, there were one or two projects already out there. Most were static representations of global case data (either from Johns Hopkins University or the WHO datasets). These were fascinating and gave deep insight into an individual country's figures on a day to day basis. But none of these gave the viewer an impression of change over time of the global spread of the disease. <!-- I think this needs a little work... -->

My goal with this project was to create a visualisation that gave viewers an immediate idea of where and how fast the disease was spreading. To do this effectively, I decided on the following design parameters:

- Show movement, not numbers.
- Remain accurate to the data.
- As the total number of cases increases in a country it should take up a larger "area of spread" on the globe as transmission becomes more common.
- The colour palette should evoke pre-existing ideas about disease.
- The application should function on low power phones.

The visualisation uses React, Three.js and custom GLSL shaders to display the data using the GPU under WebGL. The data itself comes from the [Johns Hopkins Center for Systems Science and Engineering COVID-19 global dataset](https://github.com/CSSEGISandData/COVID-19). This has country-level data of cases and deaths globally and state/province level data for larger countries including the US and Canada.

Each particle on the globe takes the closest four locations from the data (from the dataset's lat/long values). It then calculates weights based on the distance from each of those points. A translation away from the surface is then applied to the particle based on the log<sub>10</sub> number of cases at each of the four locations. The beauty of this system is that, as the case number increases at a location, it recruits more and more particles around it and "spreads" further across the country. The weight calculations are static and so are performed outside of the client. They are then served as static data to reduce processing time (this is especially important for phones). Running the translations on over 200,000 points at 60fps occurs on the GPU and this means that even slow phones can run the visualisation.

Finally, [This well-known image of the virus](https://global.unitednations.entermediadb.net/assets/mediadb/services/module/asset/downloads/preset/Libraries/Production+Library/31-01-20-coronavirus-digital-image-cdc1.jpg/image770x420cropped.jpg) was the inspiration for the colour palette.

Personally, I think that the final result meets the above self-imposed criteria, and I'm rather proud of it. I also received this lovely comment on the Three.js forums that I'd like to share:

> ...I have the feeling that if I were looking at a presentation of the COVID-19 virus in action in a Petri dish, the look and feel of a timeline would be quite similar to your presentation of the virus attacking the Globe. And thus a reasonable question might be: are we living in a fractal? :wink:
>
> What you are doing is transforming the data from quantities to qualities — from numeric characters to expressions of motion, touching and multiplying. In turn these representations are much better at conveying feelings of anguish, stress or caring. And there are a lot of people — the majority? — in the world for whom feelings are more important than numbers...

Anyway. What follows now is an in depth look at the technical aspects of the project. I'd like to document some problems that arose during development, and my solutions to these in the hope that others will find them useful...

## Resolution and data representation.

[Three.js](https://threejs.org/) is an incredible framework for creating (primarily) WebGL based browser experiences. It allows you to skip a lot of the complicated and time-consuming boilerplate involved with writing raw WebGL/OpenGL code. This means that you can quickly and easily make 3D experiments once you've learnt a bit of the Three.js ecosystem. That being said, Three.js doesn't simplify shader-code or GPU programming but rather creates a wrapper to hide some of the more difficult aspects. This is also not a Three.js tutorial, there are plenty of great introductions to the framework if you want to learn more, [like this one](https://discoverthreejs.com/).

Having made the decision to display the data as a particle sphere. The first issue encountered is that of resolution between the points. Simply put, if you have too few particles to represent the data, the cases become blurred between countries, and you lose accuracy. Conversely, the more particles you have, the more processing per frame. This was the first issue: to have the resolution required for the data you need an icosphere with 7 subdivisions, or 163,842 vertices. That roughly translates to a point every 100 km on the earth's surface. On top of that, if you're taking each point and translating it by the weighted value of the 4 closest data locations, you're talking 655,368 calculations per frame. In my experience (although I'm sure there are ways of optimising this) Three.js starts to slow down at 5 subdivisions on my dev machine. This is because the calculation occurs on the CPU and position data is then sent to the GPU for rendering. What we actually want is to perform all the point translation calculations on the GPU.

Deciding which calculations to send to the GPU was the first task. To function, the visualisation need to perform the following:

1. Map each data location to the surface of a sphere based on Lat/Long coordinates
2. Create an array of "weights" for each vertex/particle of the icosphere based on the distance of the vertex from the 4 closest data locations.
3. For each point, translate the point away from the center by some function of the number of cases and weight for all 4 closest data locations.

Task one is a simple case of projecting lat and long values from the data onto a sphere of radius "r":

```javascript
function getPositionVectorsFromData(csvData, radius = 1) {
  const coordinateList = [];

  csvData.forEach(row => {
    const lat = Number(row.Lat);
    const long = Number(row.Long);
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (long + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    coordinateList.push(new Vector3(x, y, z));
  });

  return coordinateList;
}
```

Task two is more involved. For each vertex on the sphere, you find the closest 4 projected positions from the data locations. You then need to set a "weight" (a normalised value to multiply the number of cases by) based on some function of the distance of the point from the location. I went for an inverse square falloff but found that I had to linearly increase the distance for a visually pleasing effect:

```javascript
function calculateBoneWeights(vertex, dataLocations) {
  // find closest 4 positions
  const distanceList = [];

  dataLocations.forEach((position, index) => {
    // consider using distanceToSquared...
    const distance = vertex.distanceTo(position);
    distanceList.push({
      index,
      distance,
    });
  });

  distanceList.sort((a, b) => a.distance - b.distance);
  const activePositions = distanceList.slice(0, 4);

  // calculate weights
  activePositions.forEach(position => {
    
    // set a cutoff for far away values
    // (to stop values passing through sphere)
    if (position.distance > 0.4) position.weight = 0.0;
    else {
      
      // normalise remaining distances to value between 0 and 50
      // for a visually distinctive inverse square falloff
      const calcDistance = (position.distance / 0.4) * 50;
      
      // weight = normalised inverse square of normalised distance
      position.weight = 1 / (calcDistance * calcDistance + 1);
    }
  });
  return activePositions;
}
```

Of these three tasks, only the third needs to be recalculated each frame. The first and second are static arrays. This means it makes most sense to move task three to the GPU first. The third calculation needs values from the first two on a per vertex basis. These can be sent to the shader as attributes or uniforms (although more on that later):

```glsl
attribute vec4 locationIndices;
attribute vec4 locationWeights;
uniform vec4[] data;

void main() {
  vec3 pNormal = normalize(position);

  // get current dataValues
  float vx = data[locationIndcies].x;
  float vy = data[locationIndcies].y;
  float vz = data[locationIndcies].z;
  float vw = data[locationIndcies].w;

  // for each of the 4 closest locations determine
  // the amount of displacement
  float displacement = 0.0;
  displacement += vx * locationWeights.x;
  displacement += vy * locationWeights.y;
  displacement += vz * locationWeights.z;
  displacement += vw * locationWeights.w;

  // displace the vertex by displacement in direction of normal
  vec3 displacedPosition = position +
    (pNormal * displacement * 0.05);
// hide-start
  // view transforms
  vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );
  float adjustedPointSize = (
    size * pixelRatio * (displacement * 0.25 + 0.9)) *
    (containerHeight * 0.005);
  gl_PointSize = adjustedPointSize * ( 1.0 / (-mvPosition.z));
  gl_Position = projectionMatrix * mvPosition;
// hide-ends
}
```

If we update the vec4 data for every time the day changes this works well... on some machines. The problem arises with the `glsl§uniform vec4[] data;` line. The number of uniforms that you can send to the shader is hardware dependent. Irrespective of this, having a hard limit on the amount of data you can send to a shader is not a good thing. There's a workaround though...

## Sending data to shaders as a data-texture.

One way of passing large amounts of data to a shader is via a `sampler2D` uniform. The shader can then look up a value by coordinates representing columns and rows of data. In our case, we have date and location for our x and y coordinates, respectively. Three.js has a `DataTexture` class that allows you to create textures from JS typed arrays.

It should therefore be a simple task to convert the case data values into a texture for the shader. Unfortunately, it isn't quite as simple as one would hope. The issue is that WebGL 1.0 only allows textures consisting of `Uint8` values. WebGL 2.0 allows any number type to be passed but given that we are aiming for phone compatibility, that's not yet safe to use.

We therefore have to convert our data to fit in an RGBA value. The good news is that this gives us a total of 8 x 4 bits to work with: ideal given that we're converting from `Float32`! The bad news is that we need a way of converting to and from a floating-point number to an integer.

For my purposes, rounding is unimportant as the change caused by an 0.000000x error is imperceptible in the visualisation. I therefore implemented the data texture creation as follows:

```javascript
function parseDataToTextureData(data) {
  // this has been simplified for this example...
  const { totalDays, totalLocations } = data; 

  // instantiate TypedArray
  const textureData = new Uint8Array(
    totalDays * totalLocations * 4
    );

  // hide-start
  // set first entry of array to 0 so that viz starts without cases
  for (let i = 0; i < totalLocations * 4; i++) {
    textureData[i] = 0;
  }
  // hide-end

  // create ArrayBuffer and DataView for bitwise operations.
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);

  // hide-start
  // save the previous key's name just in case there are missing records
  let prevKey = null;
  // hide-end

  // populate textureData
  keys.forEach((key, i) => {
    data.forEach((location, j) => {
      const caseNumber = Number(location[key]);
      let logFloatValue;
      let highPIntValue;
      if (caseNumber !== 0) {
        logFloatValue = Math.log10(caseNumber + 1);
        highPIntValue = Math.floor(logFloatValue * 100000000);
      }
      view.setUint32(0, highPIntValue);

      const stride = totalLocations * 4 + i * 
        data.length * 4 + j * 4;
      
      textureData[stride] = !highPIntValue ? 
        0 : 
        view.getUint8(0);
      textureData[stride + 1] = !highPIntValue ?
        0 :
        view.getUint8(1);
      textureData[stride + 3] = !highPIntValue ?
        0 :
        view.getUint8(2);
      textureData[stride + 4] = !highPIntValue ?
        0 :
        view.getUint8(3);
    });
  });

  return [textureData, totalDays, totalLocations];
}
```

As you can see, we use JS's built in `ArrayBuffer` and `DataView` classes to take the case value and convert it from a `Float32` to four `Uint8` values. The double `forEach` loop means that we produce a texture with time along the x-axis and locations along the y-axis.

Significant case numbers range from 1 to 10,000+. We therefore need to take a log<sub>10</sub> value in order to represent the numbers meaningfully on our visualisation. We also need to account for locations with 0 cases and not transform those to `NaN`. Unfortunately, taking the log<sub>10</sub> of case number gives us a decimal value. Because we can only transfer a `Uint`, I multiply the calculated value by 100000000 and cut off the remainder. Like I mentioned earlier, rounding/accuracy errors in my representation are not significant because we aren't looking at the numbers specifically, so I am fine with this compromise. Were we to need more accuracy, we could determine the position of the floating-point and multiply by a varying amount. I chose not to do this for speed of calculation.

This gives us an `Uint8Array` of 4 times the number of points. We convert it to a texture using the `DataTexture` class in Three.js which can be passed as a uniform to the shader:

```javascript
const dataTexture = new DataTexture(
  textureData,
  totalLocations,
  totalDays,
  RGBAFormat,
  UnsignedByteType,
);
```

Now we have our data texture in the shader, we need to convert the values back to something meaningful. Luckily, it's just a case of multiplying by the byte's position and then dividing by the number we used in the conversion:

```glsl
uniform sampler2D data;

/* ... */

// highlight-start
float getCasesValueFromTexture(vec2 coords) {
  vec4 value = texture2D(data, coords);
  float combined = (
    value.w * 256. +
    value.z * 256. * 256. +
    value.y * 256. * 256. * 256. +
    value.x * 256. * 256. * 256. * 256.
  );
  return combined / 100000000.;
}
// highlight-end

void main() {
  vec3 pNormal = normalize(position);

  // get current data coords
  // (note +0.5 to center lookup in middle of texture coord 
  // fix for nVidia cards)
  vec2 dataCoordX = vec2((locationIndices.x + 0.5)/totalLocations, 
    (day + 0.5)/totalDays);
  vec2 dataCoordY = vec2((locationIndices.y + 0.5)/totalLocations, 
    (day + 0.5)/totalDays);
  vec2 dataCoordZ = vec2((locationIndices.z + 0.5)/totalLocations, 
    (day + 0.5)/totalDays);
  vec2 dataCoordW = vec2((locationIndices.w + 0.5)/totalLocations, 
    (day + 0.5)/totalDays);

  // highlight-start
  // get current dataValues
  float vx = getCasesValueFromTexture(dataCoordX);
  float vy = getCasesValueFromTexture(dataCoordY);
  float vz = getCasesValueFromTexture(dataCoordZ);
  float vw = getCasesValueFromTexture(dataCoordW);
  // highlight-end

  // for each of the 4 closest locations determine 
  // the amount of displacement
  float displacement = 0.0;
  displacement += vx * locationWeights.x;
  displacement += vy * locationWeights.y;
  displacement += vz * locationWeights.z;
  displacement += vw * locationWeights.w;

  // displace the vertex by displacement in direction of normal
  vec3 displacedPosition = position + 
    (pNormal * displacement * 0.05);
  // hide-start
  vec4 mvPosition = modelViewMatrix * vec4( displacedPosition, 1.0 );
  float adjustedPointSize = (size * pixelRatio * (displacement * 0.25 + 0.9)) * (containerHeight * 0.005);
  gl_PointSize = adjustedPointSize * ( 1.0 / (-mvPosition.z));
  gl_Position = projectionMatrix * mvPosition;
  // hide-end
}
```

One quick note. The `DataView` class takes an "Endianness" parameter when getting values. This defaults to big-endian which is unusual. Hence, the "reverse" order of the coords when re-hydrating.

Testing this shader code was also a significant undertaking. However, I'll leave that for an upcoming tutorial.

## Compression of static data.

Given that the visualiser runs client-side, we need to end with as small a final package as possible. The easiest way of achieving this is to perform all calculations on the client. Unfortunately, on slower phones, the weight calculations were taking over a minute to perform in testing. Because weights and locations were static. It seemed sensible to perform those offline, and upload the actual values as static files. Initially, I thought that saving the output as JSON would be fine but unfortunately, the weights and locations file came in at about 20Mb of data! Running gzip compression managed to halve the size of the files for an overall package size of 11Mb. This was still unfeasibly large for mobile connections. I used a number of approaches to minimise file size. I also learnt a little about compression in the process.

Firstly, because a number of the particles existed over oceans and global poles. It was simple to remove any points that were never involved in the visualisation when calculating weights:

```javascript
function getVertexData(locations) {
  const placementGeometry = new IcosahedronGeometry(1, 7);
  const positions = [];
  const locationIndices = [];
  const locationWeights = [];
  
  for (let i = 0; i < placementGeometry.vertices.length; i++) {
    const positionWeights = calculateBoneWeights( // highlight-line
      placementGeometry.vertices[i],
      locations
    );
    
    if (!!positionWeights) { // highlight-line
      positions.push(i);
      positionWeights.forEach(position => {
        locationIndices.push(position.index);
        locationWeights.push(position.weight);
      });
    }
  }
  
  /* ... */
  
  function calculateBoneWeights(vertex, countryVectors) {
  
    /* ... */
        
    // highlight-start
    if (activePositions.every(position => position.weight === 0)) 
      return null
    // highlight-end

    return activePositions;
  }
}
```

This step lowered the total number of vertices from 163,842 to 133,758. A small but not insignificant improvement, this lowered the uncompressed file size by 3Mb.

I gained a much larger improvement by shifting away from JSON and to binary files. These are much more compressible but harder to work with. Because we're working with typed arrays here, though, it's relatively simple to convert them for compression. I used [Pako](https://github.com/nodeca/pako) (a js port of the zlib library) for the compression itself and wrote a quick function to make sure the data was of the correct type for compression:

```javascript
import { deflate } from "pako";

export function compressForFile(typedArray) {
  const dataView = new DataView(typedArray.buffer);
  const dataToCompress = new Uint8Array(dataView.buffer);
  return deflate(dataToCompress);
}
```

Once we had compressed the files, it was just a case of decompression and converting in the client:

```javascript
import React, { useState, useEffect } from 'react';
import { inflate } from "pako";

export const App = () => {
  
  /* ... */

  const [locationWeightData, setLocationWeightData] = useState(null);
  
  /* ... */
  
  // highlight-start
  useEffect(() => {
    fetch('data/locationWeightData.bin')
      .then(response => response.arrayBuffer())
      .then(buffer => {
        const recoveredBuffer = inflate(buffer);
        const data = new Float32Array(recoveredBuffer.buffer);
        setLocationWeightData(data);
      })
  // highlight-end
      
      /* ... */
     
  });
  
  /* ... */

}
```

Performing this conversion and compression reduced the package size from 11Mb to 1.8Mb total. This, to me is a viable size for mobile and shifts most processing to the GPU so things run blazing-fast!

## Closing thoughts.

As a doctor, I find that data is only as useful as its interpretation. How that is put across is far more valuable than the data itself a lot of the time. When explaining things to a patient, if we tell everything all at once, we end up with an incomprehensible mess. But, if we use the data to tell an aspect of the story well, it enhances our explanation and makes it easier to digest. My aim with this visualisation was to have the data tell the story of exponential spread. If we can understand this then the restrictions placed upon society might be seen in a better light.

As a developer, I have learnt a lot from this project. I hope in the coming weeks to put together a few more in-depth tutorials explaining the processes used here in more detail. I'm also keen to get feedback and learn if there's anything that ~~could~~ should be improved so please drop me a message if you found this useful or found something incorrect!

Finally, you can find the full source code for this project on Github here: <a href="https://github.com/patricknasralla/covid19_3D_visualisation" target="_blank">https://github.com/patricknasralla/covid19_3D_visualisation</a>