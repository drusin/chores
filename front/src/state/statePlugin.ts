// plugins/myStorePlugin.ts
import type { App } from 'vue';
import type { Gateway, StateApi } from "../types.ts";
import state from "./state.ts";

let stateInstance: StateApi | null = null;

export function getState(): StateApi {
    if (!stateInstance) {
        throw new Error('State has not been initialized. Did you forget to call app.use()?');
    }
    return stateInstance;
}

export default {
    install(_app: App, gateway: Gateway) {
        stateInstance = state(gateway);
    }
};
