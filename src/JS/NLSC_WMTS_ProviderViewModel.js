import * as Cesium from 'cesium'

const layer_nlsc_LANDSECT = new Cesium.WebMapTileServiceImageryProvider({
    url: 'https://wmts.nlsc.gov.tw/wmts',
    layer: 'LANDSECT',
    style: 'default',
    format: 'image/png',
    tileMatrixSetID: 'EPSG:3857',
    maximumLevel: 19,
});
const layer_nlsc_LANDSECT_Model = new Cesium.ProviderViewModel({
    name: '段籍圖',
    tooltip: '段籍圖Tooltip',
    category:'臺灣通用電子地圖',
    iconUrl:Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/openStreetMap.png'),
    creationFunction: () => {
        return layer_nlsc_LANDSECT
    }
})

const layer_nlsc_CITY = new Cesium.WebMapTileServiceImageryProvider({
    url: 'https://wmts.nlsc.gov.tw/wmts',
    layer: 'CITY',
    style: 'default',
    format: 'image/png',
    tileMatrixSetID: 'EPSG:3857',
    maximumLevel: 19,
});
const layer_nlsc_CITY_Model = new Cesium.ProviderViewModel({
    name: '縣市界',
    tooltip: '縣市界Tooltip',
    category:'臺灣通用電子地圖',
    iconUrl:Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/openStreetMap.png'),
    creationFunction: () => {
        return layer_nlsc_CITY
    }
})

const layer_nlsc_TOWN201809 = new Cesium.WebMapTileServiceImageryProvider({
    url: 'https://wmts.nlsc.gov.tw/wmts',
    layer: 'TOWN201809',
    style: 'default',
    format: 'image/png',
    tileMatrixSetID: 'EPSG:3857',
    maximumLevel: 19,
});
const layer_nlsc_TOWN201809_Model = new Cesium.ProviderViewModel({
    name: '鄉鎮區界',
    tooltip: '鄉鎮區界(107年9月)Tooltip',
    category:'臺灣通用電子地圖',
    iconUrl:Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/openStreetMap.png'),
    creationFunction: () => {
        return layer_nlsc_TOWN201809
    }
})

const layer_nlsc_Village = new Cesium.WebMapTileServiceImageryProvider({
    url: 'https://wmts.nlsc.gov.tw/wmts',
    layer: 'Village',
    style: 'default',
    format: 'image/png',
    tileMatrixSetID: 'EPSG:3857',
    maximumLevel: 19,
});
const layer_nlsc_Village_Model = new Cesium.ProviderViewModel({
    name: '村里界',
    tooltip: '村里界Tooltip',
    category:'臺灣通用電子地圖',
    iconUrl:Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/openStreetMap.png'),
    creationFunction: () => {
        return layer_nlsc_Village
    }
})

const layer_nlsc_MOI_CONTOUR_2 = new Cesium.WebMapTileServiceImageryProvider({
    url: 'https://wmts.nlsc.gov.tw/wmts',
    layer: 'MOI_CONTOUR_2',
    style: 'default',
    format: 'image/png',
    tileMatrixSetID: 'EPSG:3857',
    maximumLevel: 19,
});
const layer_nlsc_MOI_CONTOUR_2_Model = new Cesium.ProviderViewModel({
    name: '等高線圖',
    tooltip: '等高線圖(2010-2015)Tooltip',
    category:'臺灣通用電子地圖',
    iconUrl:Cesium.buildModuleUrl('./Widgets/Images/ImageryProviders/openStreetMap.png'),
    creationFunction: () => {
        return layer_nlsc_MOI_CONTOUR_2
    }
})

export let  NLSC_ProviderViewModel=
    [layer_nlsc_LANDSECT_Model,layer_nlsc_CITY_Model,layer_nlsc_TOWN201809_Model,layer_nlsc_Village_Model,layer_nlsc_MOI_CONTOUR_2_Model];

export let  NLSC_WMTS=
    [layer_nlsc_LANDSECT,layer_nlsc_CITY,layer_nlsc_TOWN201809,layer_nlsc_Village,layer_nlsc_MOI_CONTOUR_2];