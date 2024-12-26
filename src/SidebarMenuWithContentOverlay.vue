<script setup>
import { onMounted, ref } from 'vue'
import LayerItem from './LayerItem.vue'
import cesiumDiv from './CesiumContainer.vue'

const cesiumDivRef = ref(null);
const loadIonResource = (IoID) => {
    cesiumDivRef.value.loadIonResource(IoID)
}
const SetLayerTransparent = (IoID) => {
    cesiumDivRef.value.SetLayerTransparent(IoID)
}
const loadWMTSResource= (IoID) => {
    cesiumDivRef.value.loadWMTSResource(IoID)
}
const SetLayerTransparentWMTS= (IoID) => {
    cesiumDivRef.value.SetLayerTransparentWMTS(IoID)
}
onMounted(() => {
    // InsertMenuBtnToCesiumToolbar()
})


function InsertMenuBtnToCesiumToolbar() {
    const cesiumHelpBtn = document.querySelector("span.cesium-navigationHelpButton-wrapper");
    const strH = '<button id="cSideBarToggle" class="cesium-button cesium-toolbar-button" data-bs-toggle="offcanvas" data-bs target="#offcanvas" role="button"><i class="bi bi-toggles fs-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" title="Show Menu"></i></button>'
    const container = document.createElement('div');
    container.innerHTML = strH;
    document.querySelector("div.cesium-viewer-toolbar").insertBefore(container.firstElementChild, cesiumHelpBtn);
}

function highlightBtn() {
    const newspaperSpinning = [
        { transform: "scale(1)" },
        { transform: " scale(0.5)" },
    ];

    const newspaperTiming = {
        duration: 600,
        iterations: 3,
    };
    const dom = document.getElementById('cSideBarToggle');
    dom.animate(newspaperSpinning, newspaperTiming);
}

function toggleMenuIcon($event) {
    $event.currentTarget.classList.toggle("change");
    document.getElementById("offcanvas").classList.toggle("show")
}

// defineExpose({
//     loadIonResource, SetLayerTransparent,
// });
</script>

<style lang="css" scoped>
.MenuIconContainer {
    display: inline-block;
    cursor: pointer;
    position: absolute;
    top: 30px;
    left: 0px;
    z-index: 9999;
    background-color: white;
    padding-left: 6px;
    padding-right: 6px;
}

.change {
    cursor: pointer;
    position: absolute;
    top: 30px;
    left: 25%;
    background-color: transparent;
    z-index: 9999;
    padding-left: 6px;
    padding-right: 6px;
}

.MenuIconbar1,
.MenuIconbar2,
.MenuIconbar3 {
    width: 35px;
    height: 5px;
    background-color: #333;
    margin: 6px 0;
    transition: 0.4s;
}

.change .MenuIconbar1 {
    transform: translate(0, 11px) rotate(-45deg);
    background-color: white;
}

.change .MenuIconbar2 {
    opacity: 0;
    background-color: white;
}

.change .MenuIconbar3 {
    transform: translate(0, -11px) rotate(45deg);
    background-color: white;
}
</style>

<template>
    <div class="MenuIconContainer" v-on:click="toggleMenuIcon($event)">
        <div class="MenuIconbar1"></div>
        <div class="MenuIconbar2"></div>
        <div class="MenuIconbar3"></div>
    </div>
    <div class="offcanvas offcanvas-start w-25" tabindex="-1" id="offcanvas" data-bs-keyboard="false" aria-modal="false"
        data-bs-backdrop="static">

        <div class="offcanvas-header">
            <h6 class="offcanvas-title d-none d-sm-block" id="offcanvas">霧社水庫</h6>

            <!-- <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"
                v-on:click="highlightBtn()"></button> -->
        </div>
        <div class="offcanvas-body px-0">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                <!-- <li class="nav-item">
                    <a href="#" class="nav-link text-truncate">
                        <i class="fs-5 bi-house"></i><span class="ms-1 d-none d-sm-inline">Home</span>
                    </a>
                </li>
                <li>
                    <a href="#submenu1" data-bs-toggle="collapse" class="nav-link text-truncate">
                        <i class="fs-5 bi-speedometer2"></i><span class="ms-1 d-none d-sm-inline">Dashboard</span> </a>
                </li>
                <li>
                    <a href="#" class="nav-link text-truncate">
                        <i class="fs-5 bi-table"></i><span class="ms-1 d-none d-sm-inline">Orders</span></a>
                </li> -->
                <li class="dropdown w-100">
                    <a href="#" class="nav-link dropdown-toggle  text-truncate" id="dropdown" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fs-5 bi-water"></i><span class="ms-1 d-none d-sm-inline">歷年水深DTM</span>
                    </a>
                    <LayerItem :load-ion-resource="loadIonResource" :set-layer-transparent="SetLayerTransparent"
                        :data-type="'IonLayers'">
                    </LayerItem>
                </li>
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle  text-truncate" id="dropdown" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fs-5 bi-fan"></i><span class="ms-1 d-none d-sm-inline">出水口</span>
                    </a>
                    <LayerItem :load-ion-resource="loadIonResource" :set-layer-transparent="SetLayerTransparent"
                        :data-type="'Drain'">
                    </LayerItem>
                </li>
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle  text-truncate" id="dropdown" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fs-5 bi-fan"></i><span class="ms-1 d-none d-sm-inline">通用版電子圖資</span>
                    </a>
                    <LayerItem :load-w-m-t-s-resource="loadWMTSResource" :set-layer-transparent="SetLayerTransparentWMTS"
                        :data-type="'NLSC'">
                    </LayerItem>
                </li>
            </ul>
        </div>
    </div>
    <div class="jumbotron card card-block">
        <cesiumDiv ref="cesiumDivRef"></cesiumDiv>
    </div>
</template>