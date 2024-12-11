import { createApp } from 'vue'

import cesiumContainer from './CesiumContainer.vue'

Object.defineProperty(globalThis, 'CESIUM_BASE_URL', {
  value: `/${import.meta.env.VITE_CESIUM_LIBS_PATH}/`
})

createApp(cesiumContainer).mount('#cesiumContainer')
