// @flow

import type { Action } from './../action/types';
import { UPDATE_TODO, ADD_TODO } from '../action/types';
import type { UpdateTodoAction, AddTodoAction } from '../action/types';
import type { Todo } from '../model/type/Todo';
import { createTodoFromAddTodoAction } from '../model/factory/todoFactory';

function _handleUpdateTodoAction(currentState: Array<Todo>, action: UpdateTodoAction): Array<Todo> {
    return currentState.map((currentTodo: Todo) : Todo => {
        if (currentTodo.id ===  action.id) {
            return {
                ...currentTodo,
                checked:  action.checked,
                title:  action.title
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

        default:
            return currentState;
    }
}
