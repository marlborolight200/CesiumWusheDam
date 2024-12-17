
import * as Proj4js from './Proj4js'
import * as Cesium from 'cesium'
var viewer=null;
var scene=null;
var CoordinateOverlay=null;

export function setInputAction(cviewer){
    viewer=cviewer;
    scene = viewer.scene;
    CoordinateOverlay = CreateElementHoverDiv();
    CoordinateOverlay.style.color = 'white';
    CoordinateOverlay.style.fontSize = "12px";
    var screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    screenSpaceEventHandler.setInputAction(defaultMouseOver, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
}
function mousePositionToCartesianFeature(mousePosition) {
    //於地形上
    var pick = viewer.camera.getPickRay(mousePosition);
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

function defaultMouseOver(movement) {
    
    var cartesianFeature = mousePositionToCartesianFeature(movement.endPosition);

    var cartographicLocation = cartesianToCartographicLocation(cartesianFeature.cartesian);
    //滑鼠位置
    var model_height = cartographicLocation.height;
    const p97 = Proj4js.WGS1984toTWD(cartographicLocation.longitude, cartographicLocation.latitude, '97')
    var innerHTML = "";
    innerHTML +=
        (cartesianFeature.type == "scene" ? "<h6>模型</h6>" : "<h6>地形</h6>") +
        "經度: " + cartographicLocation.longitude.toFixed(6) + "<br/>" +
        "緯度: " + cartographicLocation.latitude.toFixed(6) + "<br/>" +
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
    // CoordinateOverlay.style.top=movement.endPosition.y.toFixed(0)+'px'
    // CoordinateOverlay.style.left=movement.endPosition.x.toFixed(0)+'px'
    CoordinateOverlay.style.top = (movement.endPosition.y + 20) + 'px';
    CoordinateOverlay.style.left = (movement.endPosition.x + 10) + 'px';
}

function CreateElementHoverDiv() {
    var Div = document.createElement('div');
    viewer.container.appendChild(Div);
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


