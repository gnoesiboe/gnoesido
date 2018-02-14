// @flow

import type { Action } from './../action/types';
import {
    UPDATE_TODO,
    ADD_TODO,
    DELETE_TODO,
    DELETE_PROJECT
} from '../action/types';
import type { UpdateTodoAction, AddTodoAction, DeleteTodoAction, DeleteProjectAction } from '../action/types';
import type { Todo } from '../model/type/Todo';
import { createTodoFromAddTodoAction } from '../model/factory/todoFactory';

export type TodosReducerState = Array<Todo>;

function _handleUpdateTodoAction(currentState: TodosReducerState, action: UpdateTodoAction): TodosReducerState {
    return currentState.map((currentTodo: Todo) : Todo => {
        if (currentTodo.id ===  action.id) {
            return {
                ...currentTodo,
                checked:  action.checked,
                title:  action.title,
                projectId: action.projectId,
                active: action.active,
                startsAt: action.startsAt
            };
        } else {
            return { ...currentTodo };
        }
    });
}

function _handleAddTodoAction(currentState: TodosReducerState, action: AddTodoAction): TodosReducerState {
    return  [
        ...currentState,
        createTodoFromAddTodoAction(action)
    ];
}

function _handleDeleteTodoAction(currentState: TodosReducerState, action: DeleteTodoAction): TodosReducerState {
    return currentState.filter((item: Todo) => {
        return item.id !== action.id;
    });
}

function _handleDeleteProjectAction(currentState : TodosReducerState, action : DeleteProjectAction) : TodosReducerState {
    return currentState.filter((item: Todo) => {
        return item.projectId !== action.id;
    });
}

export function todosReducer(currentState: TodosReducerState = [], action: UpdateTodoAction | Action) : TodosReducerState {
    switch (action.type) {
        case UPDATE_TODO:
            // $ExpectError
            var updateAction: UpdateTodoAction = (action: Action);
            return _handleUpdateTodoAction(currentState, updateAction);

        case ADD_TODO:
            // $ExpectError
            var addAction: AddTodoAction = (action: Action);
            return _handleAddTodoAction(currentState, addAction);

        case DELETE_TODO:
            // $ExpectError
            var deleteAction : DeleteTodoAction = (action: Action);
            return _handleDeleteTodoAction(currentState, deleteAction);

        case DELETE_PROJECT:
            // $ExpectError
            var deleteProjectAction : DeleteProjectAction = (action: Action);
            return _handleDeleteProjectAction(currentState, deleteProjectAction);

        default:
            return currentState;
    }
}
