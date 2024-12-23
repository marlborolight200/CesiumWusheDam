import { createApp } from 'vue'
import App from './SidebarMenuWithContentOverlay.vue'
import { Tooltip, Toast, Popover } from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
Object.defineProperty(globalThis, 'CESIUM_BASE_URL', {
  value: `/${import.meta.env.VITE_CESIUM_LIBS_PATH}/`
})

createApp(App).mount('#App')
