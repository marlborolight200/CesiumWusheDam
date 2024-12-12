<template>
  <div ref="cesiumDiv" class="cesiumDiv"></div>
</template>

<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import Proj4js from 'proj4';

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
  console.log(event.currentTarget.value / 100)
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

  const T67 = "+title=TWD67 +proj=tmerc +towgs84=-752,-358,-179,-.0000011698,.0000018398,.0000009822,.00002329 +lat_0=0 +lon_0=121 +x_0=250000 +y_0=0 +k=0.9999 +ellps=aust_SA +units=m +no_defs";
  const T97 = "+title=TWD97 +proj=tmerc +lat_0=0 +lon_0=121 +k=0.9999 +x_0=250000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
  const EPSG4326="+proj=longlat +datum=WGS84 +no_defs +type=crs";
  function TransCoord(x, y, projSource, projDest) {
    proj4(firstProjection,secondProjection,[-122.305887, 58.9465872]);
    var result;
    if (Proj4js) {
      var p = new Proj4js.Point(parseFloat(x), parseFloat(y));
      Proj4js.transform(projSource, projDest, p);
      result = {
        x: p.x,
        y: p.y
      };
    }
    return result;
  }
  function WGS1984toTWD(x, y, type) {
    if (type == 67) {
      return Proj4js(EPSG4326,T67,[x, y]);
    }
    return Proj4js(EPSG4326,T97,[x, y]);
  }


  function CreateElementHoverDiv() {
    var Div = document.createElement('div');
    viewer.value.container.appendChild(Div);
    Div.id = 'hoverDiv';
    Div.className = 'backdrop';
    Div.style.display = 'none';
    Div.style.position = 'absolute';
    Div.style.top = '10px';
    Div.style.left = '0';
    Div.style['pointer-events'] = 'none';
    Div.style.padding = '3px';
    Div.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    Div.style.borderRadius = '3px';
    return Div;
  }
  var CoordinateOverlay = CreateElementHoverDiv();
  CoordinateOverlay.style.color = 'white';
  CoordinateOverlay.style.fontSize = "12px";
  var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.value.scene.canvas);
  screenSpaceEventHandler.setInputAction(function (movement) {
    var cartesianFeature = mousePositionToCartesianFeature(movement.endPosition);
    var cartographicLocation = cartesianToCartographicLocation(cartesianFeature.cartesian);
    //滑鼠位置
    var model_height = cartographicLocation.height;
    const p97 = WGS1984toTWD(cartographicLocation.longitude, cartographicLocation.latitude, '97')
    var innerHTML = "";
    innerHTML +=
      (cartesianFeature.type == "scene" ? "<h6>模型</h6>" : "<h6>地形</h6>") +
      "經度: " + cartographicLocation.longitude.toFixed(6) + "<br/>" +
      "緯度: " + cartographicLocation.latitude.toFixed(6) + "<br/>"+
      "TWD97_X: " + p97[0].toFixed(2) + "<br/>" +
      "TWD97_Y: " + p97[1].toFixed(2) + "<br/>";

    // if (cartesianFeature.type == "scene") {
    //   innerHTML += "地物高程:" + model_height.toFixed(2) + "公尺";
    // }
    // else {
    //   innerHTML += "海拔高程:" + cartographicLocation.height.toFixed(2) + "公尺";
    // }
    CoordinateOverlay.style.display = 'block';
    CoordinateOverlay.innerHTML = innerHTML;
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  function mousePositionToCartesianFeature(mousePosition) {
    //於地形上
    var pick = viewer.value.camera.getPickRay(mousePosition);
    var globe_cartesian = scene.globe.pick(pick, scene);
    if (globe_cartesian != undefined) {
      //var cartographic = Cesium.Cartographic.fromCartesian(globe_cartesian);
      //var latitude = Cesium.Math.toDegrees(cartographic.latitude);
      //var longitude = Cesium.Math.toDegrees(cartographic.longitude);
      //var height = cartographic.height;

      //var cartographicLocation = cartesianToCartographicLocation(globe_cartesian);
      //var cartographic = cartographicLocation[0];
      //var longitude = cartographicLocation[1];
      //var latitude = cartographicLocation[2];
      //var height = cartographicLocation[3];

      return {
        cartesian: globe_cartesian,
        type: "globe",
        feature: null
      };

      return [globe_cartesian, "globe", null];
    }

    return undefined;
  }
  //笛卡爾座標轉經緯度
  function cartesianToCartographicLocation(cartesian) {
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian); //radians
    var longitude = Cesium.Math.toDegrees(cartographic.longitude);
    var latitude = Cesium.Math.toDegrees(cartographic.latitude);
    var height = cartographic.height;

    return {
      cartographic: cartographic,
      longitude: longitude,
      latitude: latitude,
      height: height
    };
  }

})



</script>

<style scoped>
/* body {
  margin: 0px;
  padding: 9px;
  box-sizing: border-box;
} */

.cesiumDiv {
  height: 97vh;
  width: 97vw;
}
</style>
