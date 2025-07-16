import { createApp } from 'vue'
import App from './App.vue'

import gateway from './state/gateway.ts';
import { init as initState } from "./state/statePlugin.ts";
import { init as initTranslations } from "./translations/translationsPlugin.ts";
import '/globals.css';

initState(gateway);
initTranslations();

const app = createApp(App);
app.mount('#app')
