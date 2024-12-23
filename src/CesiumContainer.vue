<template>
  <div ref="cesiumDiv" class="cesiumDiv"></div>
</template>

<script setup>
// Wushe Reservoir
// window.CESIUM_BASE_URL = 'CesiumWusheDam'
import { onMounted, ref, shallowRef } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as CesiumMouseOver  from './JS/CesiumMouseOver'

const cesiumDiv = ref()
const viewer = shallowRef()
const cesium3DTilesetCollection = shallowRef()
async function loadIonResource(event) {
  try {
    var IonID = '';
    if (typeof event === 'string') {
      IonID = event;
    } else {
      IonID = event.currentTarget.id;
    }

    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(IonID.slice(3, IonID.length));
    tileset.id = IonID.slice(3, IonID.length);
    // tileset.style = new Cesium.Cesium3DTileStyle({
    //     color : "color('#FFFFFF', 0.2)", //white, alpha = 0.2
    //     show : true
    // });
    const item = findTilesetIndex(tileset.id);
    if (item != null) {
      cesium3DTilesetCollection.value.remove(item)
      // document.querySelector("#" + IonID).checked = false
    } else {
      cesium3DTilesetCollection.value.add(tileset);
      viewer.value.flyTo(tileset);
      // document.querySelector("#" + IonID).checked=true;
    }

    // console.log(cesium3DTilesetCollection.value)


    // document.querySelector("#" + IonID).checked = !document.querySelector("#" + IonID).checked
  } catch (error) {
    console.log(error);
  }
}

function findTilesetIndex(tilesetID) {
  for (var i = 0; i < cesium3DTilesetCollection.value.length; i++) {
    if (cesium3DTilesetCollection.value.get(i).id === tilesetID) { return cesium3DTilesetCollection.value.get(i); }
  }
  return null;
}

function SetLayerTransparent(event) {

  const cesium3DTileset = findTilesetIndex(event.currentTarget.id.slice(3, event.currentTarget.id.length - 1))
  if (cesium3DTileset == null) { return }
  console.log(event.currentTarget.value)
  cesium3DTileset.style = new Cesium.Cesium3DTileStyle({
    color: "color('#FFFFFF', " + event.currentTarget.value / 100 + ")", //white, alpha = 0.2
    show: true
  });
  // console.log(event.currentTarget.value / 100)
}

defineExpose({
  loadIonResource, SetLayerTransparent,
});

async function loadTerrain() {
  const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207);
  viewer.value.scene.primitives.add(tileset);

}
onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNzgwZTEyYy1kZmY4LTQ1YzItYmNiYi02NTAyY2RhZThlYTUiLCJpZCI6NzcwOSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU5MjQ1MjQ2MH0.8u2-_RDVWD2Ne_11zQ07wA_gyCMUB50bcRKTmd9szEY';
  viewer.value = new Cesium.Viewer(cesiumDiv.value)
  viewer.value.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(120.370197, 23.203426, 1000)
  })
  var scene = viewer.value.scene;
  cesium3DTilesetCollection.value = scene.primitives.add(
    new Cesium.PrimitiveCollection()
  ); //3D 模型

  loadTerrain();
  // loadIonResource('Ion16193');
  
  // 加入游標hover事件
  const MouseOver = new CesiumMouseOver.CesiumMouseOver(viewer.value);
  const MouseOverSetInputAction =MouseOver.setInputAction();

})



</script>

<style scoped>
/* body {
  margin: 0px;
  padding: 9px;
  box-sizing: border-box;
} */

.cesiumDiv {
  height:99vh;
  width: 100vw;
}
</style>
