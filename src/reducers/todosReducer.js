// @flow

import {
    UPDATE_TODO,
    ADD_TODO,
    DELETE_TODO,
    DELETE_PROJECT,
    ACTIVATE_TODOS_THAT_START_TODAY
} from '../action/types';
import type {
    UpdateTodoAction,
    AddTodoAction,
    DeleteTodoAction,
    DeleteProjectAction,
    ActivateTodosThatStartToday,
    Action
} from '../action/types';
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

function _handleActivateTodosThatStartToday(currentState : TodosReducerState, action : ActivateTodosThatStartToday): TodosReducerState {
    return currentState.map((todo : Todo) => {
        if (action.ids.indexOf(todo.id) !== -1) {
            return {
                ...todo,
                active: true
            };
        }

        return todo;
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

        case ACTIVATE_TODOS_THAT_START_TODAY:

            // $ExpectError
            var activateAction : ActivateTodosThatStartToday = (action : Action);
            return _handleActivateTodosThatStartToday(currentState, activateAction);

        default:
            return currentState;
    }
}
