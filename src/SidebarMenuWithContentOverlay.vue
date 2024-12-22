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

onMounted(() => {
    // document.querySelector('#dismiss, .overlay').onclick=(()=>{
    //     document.querySelector('#sidebar').classList.remove('active');
    //     // hide overlay
    //     document.querySelector('.overlay').classList.remove('active');
    // });

    // document.querySelector('#sidebarCollapse').onclick=(()=>{
    //     document.querySelector('#sidebar').classList.add('active');
    //     // fade in the overlay
    //     document.querySelector('.overlay').classList.add('active');
    //     //document.querySelector('.collapse.in').classList.toggle('in');
    //     //document.querySelector('a[aria-expanded=true]').attributes('aria-expanded', 'false');
    // });
})
</script>
<style>
.btnNavBar {
    position: absolute;
    top: 5px;
    left: 80px;
    z-index: 1000;
}
</style>
<!-- <style lang="css" scoped>
.wrapper {
    display: block;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    /* top layer */
    z-index: 9999;
}

.overlay {
    display: none;
    position: fixed;
    /* full screen */
    width: 100vw;
    height: 100vh;
    /* transparent black */
    background: rgba(0, 0, 0, 0.7);
    /* middle layer, i.e. appears below the sidebar */
    z-index: 998;
    opacity: 0;
    /* animate the transition */
    transition: all 0.5s ease-in-out;
}

/* display .overlay when it has the .active class */
.overlay.active {
    display: block;
    opacity: 1;
}

#dismiss {
    width: 35px;
    height: 35px;
    position: absolute;
    /* top right corner of the sidebar */
    top: 10px;
    right: 10px;
}
</style> -->

<template>
    <div class="offcanvas offcanvas-start w-25" tabindex="-1" id="offcanvas" data-bs-keyboard="false"
        data-bs-backdrop="false">
        <div class="offcanvas-header">
            <h6 class="offcanvas-title d-none d-sm-block" id="offcanvas">Menu</h6>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body px-0">
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-start" id="menu">
                <li class="nav-item">
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
                </li>
                <li class="dropdown">
                    <a href="#" class="nav-link dropdown-toggle  text-truncate" id="dropdown" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fs-5 bi-bootstrap"></i><span class="ms-1 d-none d-sm-inline">圖層套疊</span>
                    </a>
                    <LayerItem :load-ion-resource="loadIonResource" :set-layer-transparent="SetLayerTransparent">
                    </LayerItem>
                </li>
                <li>
                    <a href="#" class="nav-link text-truncate">
                        <i class="fs-5 bi-grid"></i><span class="ms-1 d-none d-sm-inline">Products</span></a>
                </li>
                <li>
                    <a href="#" class="nav-link text-truncate">
                        <i class="fs-5 bi-people"></i><span class="ms-1 d-none d-sm-inline">Customers</span> </a>
                </li>
            </ul>
        </div>
    </div>
    <div class="container-fluid">
        <button class="btnNavBar" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" role="button">
            <i class="bi bi-sliders fs-4" data-bs-toggle="offcanvas" data-bs-target="#offcanvas"></i>
        </button>
        <cesiumDiv ref="cesiumDivRef"></cesiumDiv>
    </div>
</template>