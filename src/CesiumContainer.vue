<template>
  <div ref="cesiumDiv" class="cesiumDiv"></div>
</template>

<script setup>
// Wushe Reservoir
// window.CESIUM_BASE_URL = 'CesiumWusheDam'
import { onMounted, ref, shallowRef } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import * as CesiumMouseOver from './JS/CesiumMouseOver'

const props = defineProps({
  // stat: Object,
  // index: Number,
  // segments: Number,
  CesiumImageLayers: { type: Array, default: [] }
})

const cesiumDiv = ref()
const viewer = shallowRef()
const cesium3DTilesetCollection = shallowRef()
async function loadIonResource(event) {
  try {
    var IonID = '';
    // var tileset = null;
    if (typeof event === 'string') {
      IonID = event;
    } else {
      IonID = event.currentTarget.id;
    }
    const checked = document.getElementById(IonID).checked;
    try {
      switch (event.currentTarget.getAttribute("CesiumAssetsType")) {
        case "Imagery":
          const layer = props.CesiumImageLayers.find((item) => item.Name == IonID);
          if (layer == null) { return; }
          //layer.prototype.id=IonID.slice(3, IonID.length);
          if (viewer.value.scene.imageryLayers.contains(layer.Layer)) {
            // viewer.value.imageryLayers.raiseToTop(layer);
            if (checked) {
              // viewer.value.imageryLayers.raiseToTop(layer);
            } else {
              viewer.value.scene.imageryLayers.remove(layer.Layer, false);
            }
          } else {
            if (checked) {
              viewer.value.scene.imageryLayers.add(layer.Layer);
              viewer.value.flyTo(layer.Layer);
            } else {
              // viewer.value.imageryLayers.remove(layer, false);
            }

          }


          // const layer = await Cesium.IonImageryProvider.fromAssetId(parseInt(IonID.slice(3, IonID.length)));
          // layer.prototype.id=IonID.slice(3, IonID.length);
          // const layer = viewer.value.imageryLayers.addImageryProvider(
          //   await Cesium.IonImageryProvider.fromAssetId(parseInt(IonID.slice(3, IonID.length))),
          // );


          // viewer.value.imageryLayers.addImageryProvider(tileset);
          //       viewer.value.flyTo(tileset);
          // tileset.id = IonID.slice(3, IonID.length);
          //     const item = findTilesetIndex(tileset.id);
          //     if (item != null) {
          //       viewer.value.imageryLayers.addImageryProvider.remove(item)
          //       // document.querySelector("#" + IonID).checked = false
          //     } else {
          //       viewer.value.imageryLayers.addImageryProvider.add(tileset);
          //       viewer.value.flyTo(tileset);
          //       // document.querySelector("#" + IonID).checked=true;
          //     }

          break;
        case "Terrain":
          document.querySelectorAll("input[cesiumassetstype='Terrain']").forEach((item) => {
            item.checked = false;
          })
          if (checked) {
            event.currentTarget.checked = true;
            viewer.value.scene.setTerrain(
              new Cesium.Terrain(
                Cesium.CesiumTerrainProvider.fromIonAssetId(parseInt(IonID.slice(3, IonID.length))),
              ),
            );
          } else {
            viewer.value.scene.terrainProvider = new Cesium.EllipsoidTerrainProvider();
          }

          break;
        case "":
          break;
        default:

      }

    } catch (error2) {
      console.log(error2)
    }
  } catch (error) {
    console.log(error);
  }
}

async function loadIonResource3DTileset(event) {
  try {
    var IonID = '';
    // var tileset = null;
    if (typeof event === 'string') {
      IonID = event;
    } else {
      IonID = event.currentTarget.id;
    }
    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(IonID.slice(3, IonID.length));

    tileset.id = IonID.slice(3, IonID.length);
    const item = findTilesetIndex(tileset.id);
    if (item != null) {
      cesium3DTilesetCollection.value.remove(item)
    } else {
      cesium3DTilesetCollection.value.add(tileset);
      viewer.value.flyTo(tileset);
    }
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
  const layer = props.CesiumImageLayers.find((item) => item.Name == event.currentTarget.id.slice(0, event.currentTarget.id.length - 1));
  if (layer == null) { return }
  // console.log(event.currentTarget.value)
  layer.Layer.alpha =event.currentTarget.value / 100;
}

function SetLayerTransparent3DTileset(event) {
  const cesium3DTileset = findTilesetIndex(event.currentTarget.id.slice(3, event.currentTarget.id.length - 1))
  if (cesium3DTileset == null) { return }
  // console.log(event.currentTarget.value)
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
  // Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNzgwZTEyYy1kZmY4LTQ1YzItYmNiYi02NTAyY2RhZThlYTUiLCJpZCI6NzcwOSwic2NvcGVzIjpbImFzciIsImdjIl0sImlhdCI6MTU5MjQ1MjQ2MH0.8u2-_RDVWD2Ne_11zQ07wA_gyCMUB50bcRKTmd9szEY';
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0NzAzZDc1NS1mOTNhLTQ3ZmEtOGM3Ny05OWYzMDI2NWNlZDIiLCJpZCI6MjEzNzE3LCJpYXQiOjE3MTUxNTMyNTN9.V8jjqVMeAHjW0XfP3VFKwKuAZHxnYRC43HwCAq_UBvU';
  viewer.value = new Cesium.Viewer(cesiumDiv.value)
  viewer.value.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(120.370197, 23.203426, 1000)
  })
  var scene = viewer.value.scene;
  cesium3DTilesetCollection.value = scene.primitives.add(
    new Cesium.PrimitiveCollection()
  ); //3D 模型

  // loadTerrain();
  // loadIonResource('Ion16193');

  // 加入游標hover事件
  const MouseOver = new CesiumMouseOver.CesiumMouseOver(viewer.value);
  const MouseOverSetInputAction = MouseOver.setInputAction();

  // props.CesiumImageLayers = []

  document.querySelectorAll("input.form-check-input").forEach(async (item) => {
    if (item.getAttribute('CesiumAssetsType') == "Imagery") {
      const temp = Object();
      temp.Layer = new Cesium.ImageryLayer(await Cesium.IonImageryProvider.fromAssetId(parseInt(item.id.slice(3, item.id.length))));
      temp.Name = item.id;
      props.CesiumImageLayers.push(temp);
    }
  })
  // setTimeout(()=>{console.log(props.CesiumImageLayers)},1000)

})



</script>

<style scoped>
/* body {
  margin: 0px;
  padding: 9px;
  box-sizing: border-box;
} */

.cesiumDiv {
  height: 99vh;
  width: 100vw;
}
</style>
