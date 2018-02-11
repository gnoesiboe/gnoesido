// @flow

import type {
    Action,
    ActivateNextProjectAction,
    ActivatePreviousProjectAction,
    ActivateNextTodoAction,
    ActivatePreviousTodoAction
} from '../action/types';
import {
    ACTIVATE_NEXT_PROJECT,
    ACTIVATE_PREVIOUS_PROJECT,
    ACTIVATE_NEXT_TODO,
    ACTIVATE_PREVIOUS_TODO
} from '../action/types';

export type Current = $ReadOnly<{
    list: string,
    todoIndex: number
}>;

const _initialState : Current = {
    list: 'active',
    todoIndex: 0
};

function _handleActivateNextProjectAction(currentState: Current, action: ActivateNextProjectAction): Current {
    return {
        ...currentState,
        list: action.list
    };
}

function _handleActivatePreviousProjectAction(currentState: Current, action: ActivatePreviousProjectAction): Current {
    return {
        ...currentState,
        list: action.list
    };
}

function _handleActivateNextTodoAction(currentState: Current, action: ActivateNextTodoAction): Current {
    return {
        ...currentState,
        todoIndex: action.todoIndex
    };
}

function _handleActivatePreviousTodoAction(currentState: Current, action: ActivatePreviousTodoAction): Current {
    return {
        ...currentState,
        todoIndex: action.todoIndex
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

        case ACTIVATE_NEXT_TODO:
            // $ExpectError
            var activateNextTodoAction : ActivateNextTodoAction = (action: Action);
            return _handleActivateNextTodoAction(currentState, activateNextTodoAction);

        case ACTIVATE_PREVIOUS_TODO:
            // $ExpectError
            var activatePreviousTodoAction : ActivatePreviousTodoAction = (action: Action);
            return _handleActivatePreviousTodoAction(currentState, activatePreviousTodoAction);

        default:
            return currentState;
    }
}
