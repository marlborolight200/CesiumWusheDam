<template>
    <div class="row">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal"
                                data-bs-target="#exampleModal">
                                圖層套疊
                            </button>
                            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                                aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">圖層套疊測試</h5>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <ul class="list-group">
                                                <li class="list-group-item" v-for="item in LayerItems">
                                                    <div data-mdb-input-init class="form-outline">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            v-bind:id="item.IonID"
                                                            v-on:click.native="loadIonResource($event)">
                                                        <label class="form-check-label" v-bind:for="item.IonID">
                                                            {{ item.name }}
                                                        </label>
                                                        <input type="number" min="0" max="100" step="10" 
                                                            v-bind:id="item.IonID + 't'" class="form-control w-25"
                                                             placeholder="透明度" v-on:change="SetLayerTransparent($event)"/>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                            <!-- <button type="button" class="btn btn-primary" onclick="alert('a')">Save
                                                changes</button> -->
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="btn btn-outline-primary" href="#" id="navbarDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                下拉選單
                            </a>
                            <!-- <button type="button" class="btn btn-primary" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                下拉選單
                            </button> -->
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li>
                                    <hr class="dropdown-divider">
                                </li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </li>
                        <!-- <li class="nav-item">
                            <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li> -->
                    </ul>
                    <!-- <form class="d-flex">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form> -->
                </div>
            </div>
        </nav>
    </div>
    <div class="row">
        <div class="jumbotron card card-block">
            <cesiumDiv ref="cesiumDivRef"></cesiumDiv>
            <!-- <script src="https://cesium.com/downloads/cesiumjs/releases/1.124/Build/Cesium/Cesium.js"></script> -->
            <!-- <link href="https://cesium.com/downloads/cesiumjs/releases/1.124/Build/Cesium/Widgets/widgets.css"
                    rel="stylesheet"> -->
            <!-- <script type="module" src="./src/cesiumJS.js"></script> -->
            <!-- <script src="JS/distanceMeasure.js"></script> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import cesiumDiv from './CesiumContainer.vue'
import LayerItems from '@/json/IonLayers.json'
const cesiumDivRef = ref(null);
 
function loadIonResource(IoID) {
    cesiumDivRef.value.loadIonResource(IoID)
}
function SetLayerTransparent(IoID) {
    cesiumDivRef.value.SetLayerTransparent(IoID)
}
</script>
