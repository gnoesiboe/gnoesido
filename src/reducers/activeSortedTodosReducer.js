// @flow

import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO
} from '../action/types';
import type {
    Action,
    AddTodoAction,
    UpdateTodoAction,
    DeleteTodoAction
} from '../action/types';

export type ActiveSortedTodosReducerState = Array<string>;

function _handleAddTodoAction(currentState: ActiveSortedTodosReducerState, action: AddTodoAction): ActiveSortedTodosReducerState {
    if (!action.active) {
        return currentState;
    }

    return [ ...currentState, action.id];
}

function _handleUpdateTodoAction(currentState: ActiveSortedTodosReducerState, action: UpdateTodoAction): ActiveSortedTodosReducerState {
    if (action.active === action.previousActive) {
        return currentState;
    }

    if (action.active === true) {
        // item was added to 'active'

        return [
            ...currentState,
            action.id
        ];
    }

    if (action.previousActive === true) {
        // item was removed from 'active'

        return currentState.filter((todoId: string) => todoId !== action.id);
    }

    return currentState;
}

function _handleDeleteTodoAction(currentState: ActiveSortedTodosReducerState, action: DeleteTodoAction): ActiveSortedTodosReducerState {
    return currentState.filter((todoId: string) => todoId !== action.id);
}

export function activeSortedTodosReducer(currentState: ActiveSortedTodosReducerState = [], action: Action) : ActiveSortedTodosReducerState {
    switch (action.type) {
        case ADD_TODO:
            // $ExpectError
            var addTodoAction : AddTodoAction = (action: Action);
            return _handleAddTodoAction(currentState, addTodoAction);

        case UPDATE_TODO:
            // $ExpectError
            var updateTodoAction : UpdateTodoAction = (action: Action);
            return _handleUpdateTodoAction(currentState, updateTodoAction);

        case DELETE_TODO:
            // $ExpectError
            var deleteTodoAction : DeleteTodoAction = (action: Action);
            return _handleDeleteTodoAction(currentState, deleteTodoAction);

        default:
            return currentState;
    }
}
