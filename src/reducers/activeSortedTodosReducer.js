// @flow

import {
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    MOVE_TODO
} from '../action/types';
import type {
    Action,
    AddTodoAction,
    UpdateTodoAction,
    DeleteTodoAction,
    MoveTodoAction
} from '../action/types';
import { arrayMove } from 'react-sortable-hoc';

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

function _handleMoveTodoAction(currentState: ActiveSortedTodosReducerState, action: MoveTodoAction): ActiveSortedTodosReducerState {
    if (action.active === false) {
        return currentState;
    }

    return arrayMove(currentState, action.oldIndex, action.newIndex);
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

        case MOVE_TODO:
            // $ExpectError
            var moveTodoAction : MoveTodoAction = (action: Action);
            return _handleMoveTodoAction(currentState, moveTodoAction);

        default:
            return currentState;
    }
}
