import type { Gateway, StateApi } from "../types.ts";
import state from "./state.ts";

let stateInstance: StateApi | null = null;

export function getState(): StateApi {
    if (!stateInstance) {
        throw new Error('State has not been initialized. Did you forget to call init()?');
    }
    return stateInstance;
}

export function init(gateway: Gateway) {
    stateInstance = state(gateway);
}
