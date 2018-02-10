// @flow

import type { Action, ActivateNextProjectAction, ActivatePreviousProjectAction } from '../action/types';
import { ACTIVATE_NEXT_PROJECT, ACTIVATE_PREVIOUS_PROJECT } from '../action/types';

export type Current = $ReadOnly<{
    list: string,
    todo: ?string
}>;

const _initialState : Current = {
    list: 'active',
    todo: null
};

function _handleActivateNextProjectAction(currentState: Current, action: ActivateNextProjectAction): Current {
    return {
        ...currentState,
        list: action.list,
        todo: action.todo
    };
}

function _handleActivatePreviousProjectAction(currentState: Current, action: ActivatePreviousProjectAction): Current {
    return {
        ...currentState,
        list: action.list,
        todo: action.todo
    };
}

export function currentReducer(currentState: Current = _initialState, action: Action) : Current {
    switch (action.type) {
        case ACTIVATE_NEXT_PROJECT:
            // $ExpectError
            var activateNextAction : ActivateNextAction = (action: Action);
            return _handleActivateNextProjectAction(currentState, activateNextAction);

        case ACTIVATE_PREVIOUS_PROJECT:
            // $ExpectError
            var activatePreviousAction : ActivatePreviousAction = (action : Action);
            return _handleActivatePreviousProjectAction(currentState, activatePreviousAction);

        default:
            return currentState;
    }
}
