// @flow

import type { GlobalStateType } from '../store/globalStateType';
import store from 'store';

export function save(id: string, state: ?GlobalStateType): void {
    store.set(id, state);
}

export function getState(id: string): GlobalStateType {
    return store.get(id);
}

export function hasStateForId(id: string): boolean {
    return store.get(id) !== undefined;
}
