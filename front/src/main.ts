import { createApp } from 'vue'
import App from './App.vue'

import gateway from './state/gateway.ts';
import statePlugin from "./state/statePlugin.ts";

const app = createApp(App);
app.use(statePlugin, gateway);
app.mount('#app')
