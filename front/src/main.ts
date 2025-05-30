import { createApp } from 'vue'
import App from './App.vue'

import gateway from './gateway';
import createState from './state';

createApp(App, { state: createState(gateway) }).mount('#app')
