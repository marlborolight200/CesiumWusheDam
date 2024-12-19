<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="item in LayerItems.LayerItems">
            <div data-mdb-input-init class="form-outline">
                <input class="form-check-input" type="checkbox" value="" v-bind:id="item.IonID"
                    v-on:click.native="loadIonResource($event)">
                <label class="form-check-label" v-bind:for="item.IonID">
                    {{ item.name }}
                </label>
                <input type="number" min="0" max="100" step="10" v-bind:id="item.IonID + 't'" class="form-control w-25"
                    placeholder="透明度" v-on:change="setLayerTransparent($event)" />
            </div>
        </li>
    </ul>
</template>

<script setup>
import LayerItems from './JSON/IonLayers.json'
// const emit = defineEmits(['loadIonResource', 'SetLayerTransparent'])
// onMounted(() => {
//     console.log(emit['loadIonResource'])
// })

const props = defineProps({
    // stat: Object,
    // index: Number,
    // segments: Number,
    loadIonResource:{type: Function,required: true,},
    setLayerTransparent: {type: Function,required: true,}
})
</script>
