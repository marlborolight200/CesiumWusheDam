<template>
  <div ref="earth" class="earth"></div>
</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import * as Cesium from 'cesium'

import 'cesium/Build/Cesium/Widgets/widgets.css'

const earth = ref()
const viewer = shallowRef()
const cesium3DTilesetCollection = shallowRef()
async function loadIonResource(IonID) {
  try {
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(IonID.substr(3, IonID.length - 3));

    // tileset.style = new Cesium.Cesium3DTileStyle({
    //     color : "color('#FFFFFF', 0.2)", //white, alpha = 0.2
    //     show : true
    // });
    cesium3DTilesetCollection.value.add(tileset);
    viewer.value.flyTo(tileset);
    document.querySelector("#" + IonID).checked = !document.querySelector("#" + IonID).checked
  } catch (error) {
    console.log(error);
  }
}
async function loadTerrain() {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
  viewer.value.scene.primitives.add(tileset);

}
function changeStyle(alpha) {
  var cesium3DTileset = cesium3DTilesetCollection.get(0);
  cesium3DTileset.style = new Cesium.Cesium3DTileStyle({
    color: "color('#FFFFFF', " + alpha + ")", //white, alpha = 0.2
    show: true
  });
}

onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNzgwZTEyYy1kZmY4LTQ1YzItYmNiYi02NTAyY2RhZThlYTUiLCJpZCI6NzcwOSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU5MjQ1MjQ2MH0.8u2-_RDVWD2Ne_11zQ07wA_gyCMUB50bcRKTmd9szEY';
  viewer.value = new Cesium.Viewer(earth.value)
  viewer.value.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(120, 31.8, 100000)
  })
  var scene = viewer.value.scene;
  cesium3DTilesetCollection.value = scene.primitives.add(
    new Cesium.PrimitiveCollection()
  ); //3D 模型


  loadTerrain();
  loadIonResource('Ion16193');
})
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.earth {
  height: 100vh;
  width: 100vw;
}
</style>
