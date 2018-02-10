// @flow

import type { Action } from '../action/types';

export type Current = {
    list: string
};

const _initialState : Current = {
    list: 'active'
}

export function currentReducer(currentState: Current = _initialState, action: Action) : Current {
    return currentState;
}
