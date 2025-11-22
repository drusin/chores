import { createApp } from 'vue'
import App from './App.vue'

import gateway from './state/gateway.ts';
import { browserGateway } from './browserBackend/browserGateway.ts';
import { init as initState } from "./state/statePlugin.ts";
import { init as initTranslations } from "./translations/translationsPlugin.ts";
import '/globals.css';

const selectedGateway = import.meta.env.VITE_USE_BROWSER_BACKEND === 'true' ? browserGateway : gateway;

initState(selectedGateway);
initTranslations();

const app = createApp(App);
app.mount('#app')
