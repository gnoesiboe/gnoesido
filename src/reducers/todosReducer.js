// @flow

import type { Action } from './../action/types';
import { UPDATE_TODO, ADD_TODO, DELETE_TODO } from '../action/types';
import type { UpdateTodoAction, AddTodoAction, DeleteTodoAction } from '../action/types';
import type { Todo } from '../model/type/Todo';
import { createTodoFromAddTodoAction } from '../model/factory/todoFactory';

function _handleUpdateTodoAction(currentState: Array<Todo>, action: UpdateTodoAction): Array<Todo> {
    return currentState.map((currentTodo: Todo) : Todo => {
        if (currentTodo.id ===  action.id) {
            return {
                ...currentTodo,
                checked:  action.checked,
                title:  action.title,
                projectId: action.projectId,
                active: action.active
            };
        } else {
            return { ...currentTodo };
        }
    });
}

function _handleAddTodoAction(currentState: Array<Todo>, action: AddTodoAction): Array<Todo> {
    return  [
        ...currentState,
        createTodoFromAddTodoAction(action)
    ];
}

function _handleDeleteTodoAction(currentState: Array<Todo>, action: DeleteTodoAction): Array<Todo> {
    return currentState.filter((item: Todo) => {
        return item.id !== action.id;
    });
}

export function todosReducer(currentState: Array<Todo> = [], action: UpdateTodoAction | Action) : Array<Todo> {
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

        default:
            return currentState;
    }
}
