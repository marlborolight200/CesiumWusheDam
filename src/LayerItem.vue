<template>
    <!-- <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdown">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul> -->


    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdown">
        <li v-for="item in LayerItems[dataType]">
            <div class="border border-dark text-center px-1 m-1">
                <div class="form-check form-switch mx-auto" >
                    <input class="form-check-input" type="checkbox" role="switch" value="" v-bind:id="item.IonID" v-bind:title="'圖資類型:'+item.type" v-bind:CesiumAssetsType="item.type"
                        v-on:change.native="loadIonResource($event)">
                    <label class="form-check-label" v-bind:for="item.IonID">
                        {{ item.name }}
                    </label>

                </div>
                <div v-if="item.type">
                    <label v-bind:for="item.IonID + 't'" class="form-label"></label>
                    <input  v-bind:title="'設定 ' + item.name + ' 透明度'" type="range" class="form-range"
                        min="0" max="100" step="10" value="100" v-bind:id="item.IonID + 't'"
                        v-on:change.native="setLayerTransparent($event)">
                </div>
            </div>

        </li>
    </ul>
</template>

<script setup>
import { onMounted } from 'vue'
import LayerItems from './json/DtmLayers.json'
// const emit = defineEmits(['loadIonResource', 'SetLayerTransparent'])
// onMounted(() => {
//     console.log(emit['loadIonResource'])
// })

const props = defineProps({
    // stat: Object,
    // index: Number,
    // segments: Number,
    loadIonResource: { type: Function, required: true, },
    setLayerTransparent: { type: Function, required: true, },
    dataType: { type: String },
    CesiumImageLayers:{type:Array}
})

onMounted(() => {
    // document.querySelectorAll("input.form-check-input").forEach((item,idx)=>{
    //     item.onchange=()=>{
    //         props.loadIonResource(item.id);
    //     }
    // })
})
</script>
