// @flow

import type { GlobalStateType } from '../store/globalStateType';
import store from 'store';

export function save(state: GlobalStateType): void {
    store.set('state', state);
}
