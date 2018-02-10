// @flow

import type { Action, ActivateNextAction, ActivatePreviousAction } from '../action/types';
import { ACTIVATE_NEXT, ACTIVATE_PREVIOUS } from '../action/types';

export type Current = $ReadOnly<{
    list: string,
    todo: ?string
}>;

const _initialState : Current = {
    list: 'active',
    todo: null
};

function _handleActivateNextAction(currentState: Current, action: ActivateNextAction): Current {
    return {
        ...currentState,
        list: action.list,
        todo: action.todo
    };
}

function _handleActivatePreviousAction(currentState: Current, action: ActivatePreviousAction): Current {
    return {
        ...currentState,
        list: action.list,
        todo: action.todo
    };
}

export function currentReducer(currentState: Current = _initialState, action: Action) : Current {
    switch (action.type) {
        case ACTIVATE_NEXT:
            // $ExpectError
            var activateNextAction : ActivateNextAction = (action: Action);
            return _handleActivateNextAction(currentState, activateNextAction);

        case ACTIVATE_PREVIOUS:
            // $ExpectError
            var activatePreviousAction : ActivatePreviousAction = (action : Action);
            return _handleActivatePreviousAction(currentState, activatePreviousAction);

        default:
            return currentState;
    }
}
