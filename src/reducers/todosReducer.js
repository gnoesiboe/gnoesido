// @flow

import type { Action } from './../action/types';
import { UPDATE_TODO } from '../action/types';
import type { UpdateTodoAction } from '../action/types';
import type { Todo } from '../model/type/Todo';

function _handleUpdateTodoAction(currentState: Array<Todo>, action: Action | UpdateTodoAction): Array<Todo> {

    // $ExpectError
    var updateAction: UpdateTodoAction = (action: Action);

    if (!action.type === 'UpdateTodoAction') {
        return currentState;
    }

    return currentState.map((currentTodo: Todo) : Todo => {
        if (currentTodo.id ===  updateAction.id) {
            return {
                ...currentTodo,
                checked:  updateAction.checked,
                title:  updateAction.title
            };
        } else {
            return { ...currentTodo };
        }
    });
}

export function todosReducer(currentState: Array<Todo> = [], action: UpdateTodoAction | Action) : Array<Todo> {
    switch (action.type) {
        case UPDATE_TODO:
            return _handleUpdateTodoAction(currentState, action);

        default:
            return currentState;
    }
}
